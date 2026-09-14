$ErrorActionPreference = "Stop"
# [深度修复 4]：禁用 PowerShell 进度条渲染，防止 Invoke-WebRequest 在某些环境下卡死或极慢
$ProgressPreference = "SilentlyContinue"

# [深度修复 1]：强制启用 TLS 1.2，确保在较旧的 Windows (如 Server 2012 R2/2016) 上也能顺利连接 Docker Hub 和阿里云
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$RegistryDockerHub = "docker.io"
$RegistryDockerHubApi = "registry-1.docker.io"
$RegistryAliYun = "registry.cn-hangzhou.aliyuncs.com"
$ImageRepo = "dpanel/installer"
$InstallerTarPath = "installer/dpanel-installer"
$InstallerHomeDir = Join-Path $HOME ".dpanel/installer"
$AcceptManifest = "application/vnd.docker.distribution.manifest.v2+json"
$AcceptManifestList = "application/vnd.docker.distribution.manifest.list.v2+json"
$AcceptOciManifest = "application/vnd.oci.image.manifest.v1+json"
$AcceptOciIndex = "application/vnd.oci.image.index.v1+json"
$AcceptHeaderValue = "$AcceptManifest, $AcceptManifestList, $AcceptOciManifest, $AcceptOciIndex"

function Write-Log {
    param([string]$Message)
    [Console]::Error.WriteLine("[quick] $Message")
}

function Fail {
    param([string]$Message)
    Write-Log $Message
    exit 1
}

function Require-Command {
    param([string]$Name)
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        Fail "missing required command: $Name"
    }
}

function Prepare-InstallerHome {
    if ([string]::IsNullOrWhiteSpace($HOME)) {
        Fail "HOME is not set"
    }

    New-Item -ItemType Directory -Path $InstallerHomeDir -Force | Out-Null
}

function Remove-OldInstallers {
    Get-ChildItem -Path $InstallerHomeDir -Filter "install-*" -File -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
}

function Stop-RunningInstallers {
    foreach ($process in Get-Process -ErrorAction SilentlyContinue) {
        try {
            $processPath = $process.Path
        } catch {
            continue
        }
        if ([string]::IsNullOrWhiteSpace($processPath)) {
            continue
        }

        $processFile = [IO.Path]::GetFileName($processPath)
        $processDir = [IO.Path]::GetDirectoryName($processPath)
        $isManagedInstaller = $processFile -eq "installer.exe" -or $processFile -like "install-*.exe"
        if (-not $isManagedInstaller -or $processDir -ne $InstallerHomeDir) {
            continue
        }

        try {
            Write-Log "stopping running installer process $($process.Id)"
            Stop-Process -Id $process.Id -Force -ErrorAction Stop
            Wait-Process -Id $process.Id -Timeout 5 -ErrorAction SilentlyContinue
            if ($null -ne (Get-Process -Id $process.Id -ErrorAction SilentlyContinue)) {
                Fail "failed to stop running installer process $($process.Id)"
            }
        } catch {
            if ($null -eq (Get-Process -Id $process.Id -ErrorAction SilentlyContinue)) {
                continue
            }
            Fail "failed to stop running installer process $($process.Id): $($_.Exception.Message)"
        }
    }
}

function Get-ArchTag {
    $arch = $env:PROCESSOR_ARCHITEW6432
    if ([string]::IsNullOrWhiteSpace($arch)) {
        $arch = $env:PROCESSOR_ARCHITECTURE
    }

    switch ($arch.ToLowerInvariant()) {
        "amd64" { return "amd64" }
        "x86_64" { return "amd64" }
        "arm64" { return "arm64" }
        default { Fail "unsupported architecture: $arch" }
    }
}

function Get-RegistryManifestUrl {
    param(
        [string]$Registry,
        [string]$ImageTag
    )

    if ($Registry -eq $RegistryDockerHub) {
        return "https://$RegistryDockerHubApi/v2/$ImageRepo/manifests/$ImageTag"
    }
    return "https://$Registry/v2/$ImageRepo/manifests/$ImageTag"
}

function Get-RegistryBlobUrl {
    param(
        [string]$Registry,
        [string]$Digest
    )

    if ($Registry -eq $RegistryDockerHub) {
        return "https://$RegistryDockerHubApi/v2/$ImageRepo/blobs/$Digest"
    }
    return "https://$Registry/v2/$ImageRepo/blobs/$Digest"
}

function Get-AuthHeader {
    param([string]$Url)

    try {
        # 修改点：加入 -TimeoutSec 5，防止探测鉴权头时一直死等
        Invoke-WebRequest -Uri $Url -Headers @{ Accept = $AcceptHeaderValue } -UseBasicParsing -TimeoutSec 5 | Out-Null
        return $null
    } catch {
        if ($null -eq $_.Exception.Response) {
            return $null
        }
        return $_.Exception.Response.Headers["Www-Authenticate"]
    }
}

function Get-AuthField {
    param(
        [string]$AuthHeader,
        [string]$FieldName
    )

    if ($AuthHeader -match "$FieldName=""([^""]*)""") {
        return $matches[1]
    }
    return ""
}

function Get-RegistryToken {
    param([string]$AuthHeader)

    $realm = Get-AuthField $AuthHeader "realm"
    $service = Get-AuthField $AuthHeader "service"
    $scope = Get-AuthField $AuthHeader "scope"

    if ([string]::IsNullOrWhiteSpace($realm)) {
        Fail "failed to parse registry auth realm"
    }
    if ([string]::IsNullOrWhiteSpace($service)) {
        Fail "failed to parse registry auth service"
    }
    if ([string]::IsNullOrWhiteSpace($scope)) {
        Fail "failed to parse registry auth scope"
    }

    $tokenUrl = "{0}?service={1}&scope={2}" -f $realm, [uri]::EscapeDataString($service), [uri]::EscapeDataString($scope)
    # 修改点：加入 -TimeoutSec 5，防止请求 Token 时一直死等
    $response = Invoke-RestMethod -Uri $tokenUrl -UseBasicParsing -TimeoutSec 5
    if ([string]::IsNullOrWhiteSpace($response.token)) {
        Fail "failed to request registry token"
    }
    return $response.token
}

function Get-RequestHeaders {
    param(
        [string]$Token,
        [string]$Accept = $AcceptHeaderValue
    )

    $headers = @{
        Accept = $Accept
    }
    if (-not [string]::IsNullOrWhiteSpace($Token)) {
        $headers["Authorization"] = "Bearer $Token"
    }
    return $headers
}

function Get-RegistryTokenForImage {
    param(
        [string]$Registry,
        [string]$ImageTag
    )

    $manifestUrl = Get-RegistryManifestUrl $Registry $ImageTag
    $authHeader = Get-AuthHeader $manifestUrl
    if ([string]::IsNullOrWhiteSpace($authHeader)) {
        return ""
    }
    return Get-RegistryToken $authHeader
}

function Measure-RegistrySeconds {
    param(
        [string]$Registry,
        [string]$ImageTag
    )

    try {
        $manifestUrl = Get-RegistryManifestUrl $Registry $ImageTag
        $token = Get-RegistryTokenForImage $Registry $ImageTag
        $headers = Get-RequestHeaders $token $AcceptHeaderValue
        $watch = [System.Diagnostics.Stopwatch]::StartNew()
        # 修改点：加入 -TimeoutSec 5，这是最关键的测速点，5秒不通立刻切换
        Invoke-WebRequest -Uri $manifestUrl -Headers $headers -UseBasicParsing -TimeoutSec 5 | Out-Null
        $watch.Stop()
        return $watch.Elapsed.TotalSeconds
    } catch {
        return $null
    }
}

function Select-Registry {
    param([string]$ImageTag)

    $hubSeconds = Measure-RegistrySeconds $RegistryDockerHub $ImageTag
    $aliyunSeconds = Measure-RegistrySeconds $RegistryAliYun $ImageTag

    if ($null -ne $hubSeconds -and $null -ne $aliyunSeconds) {
        if ($hubSeconds -le $aliyunSeconds) {
            return $RegistryDockerHub
        }
        return $RegistryAliYun
    }

    if ($null -ne $aliyunSeconds) {
        return $RegistryAliYun
    }

    if ($null -ne $hubSeconds) {
        return $RegistryDockerHub
    }

    Fail "unable to reach docker.io or registry.cn-hangzhou.aliyuncs.com"
}

function Get-Manifest {
    param(
        [string]$Registry,
        [string]$ImageTag,
        [string]$Reference = $ImageTag,
        [string]$Accept = $AcceptHeaderValue
    )

    $manifestUrl = Get-RegistryManifestUrl $Registry $Reference
    $token = Get-RegistryTokenForImage $Registry $ImageTag
    $headers = Get-RequestHeaders $token $Accept
    # 修改点：拉取配置清单加入 -TimeoutSec 10（比测速长一点，增加容错）
    return Invoke-RestMethod -Uri $manifestUrl -Headers $headers -UseBasicParsing -TimeoutSec 10
}

function Resolve-Manifest {
    param(
        [string]$Registry,
        [string]$ImageTag,
        [string]$Os,
        [string]$Arch
    )

    $manifest = Get-Manifest $Registry $ImageTag
    switch ($manifest.mediaType) {
        $AcceptManifest { return $manifest }
        $AcceptOciManifest { return $manifest }
        $AcceptManifestList {
            $childManifest = $manifest.manifests | Where-Object {
                $_.annotations."vnd.docker.reference.type" -ne "attestation-manifest" -and
                $_.platform.os -eq $Os -and $_.platform.architecture -eq $Arch
            } | Select-Object -First 1
            if ($null -eq $childManifest) {
                $childManifest = $manifest.manifests | Where-Object {
                    $_.annotations."vnd.docker.reference.type" -ne "attestation-manifest" -and
                    -not ($_.platform.os -eq "unknown" -and $_.platform.architecture -eq "unknown")
                } | Select-Object -First 1
            }
            if ($null -eq $childManifest -or [string]::IsNullOrWhiteSpace($childManifest.digest)) {
                Fail "failed to resolve platform manifest digest"
            }
            return Get-Manifest $Registry $ImageTag $childManifest.digest "$AcceptManifest, $AcceptOciManifest"
        }
        $AcceptOciIndex {
            $childManifest = $manifest.manifests | Where-Object {
                $_.annotations."vnd.docker.reference.type" -ne "attestation-manifest" -and
                $_.platform.os -eq $Os -and $_.platform.architecture -eq $Arch
            } | Select-Object -First 1
            if ($null -eq $childManifest) {
                $childManifest = $manifest.manifests | Where-Object {
                    $_.annotations."vnd.docker.reference.type" -ne "attestation-manifest" -and
                    -not ($_.platform.os -eq "unknown" -and $_.platform.architecture -eq "unknown")
                } | Select-Object -First 1
            }
            if ($null -eq $childManifest -or [string]::IsNullOrWhiteSpace($childManifest.digest)) {
                Fail "failed to resolve platform manifest digest"
            }
            return Get-Manifest $Registry $ImageTag $childManifest.digest "$AcceptManifest, $AcceptOciManifest"
        }
        default {
            Fail "unsupported manifest media type: $($manifest.mediaType)"
        }
    }
}

function Download-Layer {
    param(
        [string]$Registry,
        [string]$ImageTag,
        [string]$Digest,
        [string]$OutputFile
    )

    $blobUrl = Get-RegistryBlobUrl $Registry $Digest
    $token = Get-RegistryTokenForImage $Registry $ImageTag
    $headers = @{}
    if (-not [string]::IsNullOrWhiteSpace($token)) {
        $headers["Authorization"] = "Bearer $token"
    }

    # 注意：这里下载真正的数据层（大文件）不能加短超时，保持原样
    Invoke-WebRequest -Uri $blobUrl -Headers $headers -OutFile $OutputFile -UseBasicParsing
}

function Extract-Installer {
    param(
        [string]$LayerFile,
        [string]$OutputFile,
        [string]$TempDir
    )

    $extractDir = Join-Path $TempDir "extract"
    Remove-Item -Path $extractDir -Recurse -Force -ErrorAction SilentlyContinue
    New-Item -ItemType Directory -Path $extractDir -Force | Out-Null

    & tar -xf $LayerFile -C $extractDir $InstallerTarPath 2>$null
    if ($LASTEXITCODE -ne 0) {
        & tar -xzf $LayerFile -C $extractDir $InstallerTarPath 2>$null
    }
    if ($LASTEXITCODE -ne 0) {
        return $false
    }

    $relativePath = $InstallerTarPath -replace "/", [IO.Path]::DirectorySeparatorChar
    $sourcePath = Join-Path $extractDir $relativePath
    if (-not (Test-Path $sourcePath)) {
        return $false
    }

    Move-Item -Path $sourcePath -Destination $OutputFile -Force
    return $true
}

Require-Command "tar"

$arch = Get-ArchTag
$os = "windows"
Prepare-InstallerHome
Stop-RunningInstallers
$imageTag = "windows-$arch"

# [深度修复 2]：使用 ${} 显式包裹变量名，防止 PowerShell 在内存执行 (iex) 时将 `:` 错误解析为磁盘驱动器
Write-Log "probing registries for ${ImageRepo}:${imageTag}"
$registry = Select-Registry $imageTag

# [深度修复 3]：使用进程 ID ($PID) 建立独立的临时目录，防止用户并发/双击多次运行时因目录占用导致的竞态锁死
$tempDir = Join-Path $InstallerHomeDir "tmp_$PID"
$installerPath = Join-Path $InstallerHomeDir "installer.exe"
$envPath = Join-Path $InstallerHomeDir ".env"

New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

try {
    $layerFile = Join-Path $tempDir "layer.tar"

    Write-Log "selected registry: $registry"
    
    # [深度修复 2] 同上，修复变量域隔离
    Write-Log "selected image: ${ImageRepo}:${imageTag}"

    $manifest = Resolve-Manifest $registry $imageTag $os $arch
    if ($null -eq $manifest.layers -or $manifest.layers.Count -eq 0) {
        Fail "failed to resolve image layer digest"
    }

    $firstLayer = $manifest.layers | Select-Object -First 1
    if ($null -eq $firstLayer -or [string]::IsNullOrWhiteSpace($firstLayer.digest)) {
        Fail "failed to resolve image layer digest"
    }
    $selectedDigest = $firstLayer.digest
    $storedHash = ""
    if (Test-Path $envPath) {
        foreach ($line in Get-Content -Path $envPath) {
            if ($line -match '^INSTALLER_HASH=(.*)$') {
                $storedHash = $matches[1].Trim()
                if ($storedHash.Length -ge 2) {
                    $firstChar = $storedHash.Substring(0, 1)
                    $lastChar = $storedHash.Substring($storedHash.Length - 1, 1)
                    if (($firstChar -eq '"' -and $lastChar -eq '"') -or ($firstChar -eq "'" -and $lastChar -eq "'")) {
                        $storedHash = $storedHash.Substring(1, $storedHash.Length - 2)
                    }
                }
                break
            }
        }
    }

    Remove-OldInstallers
    if ($storedHash -eq $selectedDigest -and (Test-Path $installerPath -PathType Leaf)) {
        Write-Log "using cached installer $installerPath"
    } else {
        Write-Log "downloading installer to $installerPath"
        $installed = $false
        foreach ($layer in $manifest.layers) {
            if ($null -eq $layer -or [string]::IsNullOrWhiteSpace($layer.digest)) {
                continue
            }

            Download-Layer $registry $imageTag $layer.digest $layerFile
            if (Extract-Installer $layerFile $installerPath $tempDir) {
                $installed = $true
                break
            }
        }

        if (-not $installed) {
            Fail "failed to extract $InstallerTarPath from image layers"
        }
    }

} finally {
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}

$previousHash = $env:INSTALLER_HASH
try {
    $env:INSTALLER_HASH = $selectedDigest
    & $installerPath @args
    $installerExitCode = $LASTEXITCODE
} finally {
    if ($null -eq $previousHash) {
        Remove-Item Env:INSTALLER_HASH -ErrorAction SilentlyContinue
    } else {
        $env:INSTALLER_HASH = $previousHash
    }
}
exit $installerExitCode
