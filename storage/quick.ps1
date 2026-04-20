$ErrorActionPreference = "Stop"

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

function Get-ShortDigest {
    param([string]$Digest)

    $value = $Digest
    if ($value.StartsWith("sha256:")) {
        $value = $value.Substring(7)
    }
    if ($value.Length -gt 8) {
        return $value.Substring(0, 8)
    }
    return $value
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
        Invoke-WebRequest -Uri $Url -Headers @{ Accept = $AcceptHeaderValue } -UseBasicParsing | Out-Null
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
    $response = Invoke-RestMethod -Uri $tokenUrl -UseBasicParsing
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
        Invoke-WebRequest -Uri $manifestUrl -Headers $headers -UseBasicParsing | Out-Null
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
    return Invoke-RestMethod -Uri $manifestUrl -Headers $headers -UseBasicParsing
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
        Remove-Item -Path $OutputFile -Force -ErrorAction SilentlyContinue
        return $false
    }

    $relativePath = $InstallerTarPath -replace "/", [IO.Path]::DirectorySeparatorChar
    $sourcePath = Join-Path $extractDir $relativePath
    if (-not (Test-Path $sourcePath)) {
        Remove-Item -Path $OutputFile -Force -ErrorAction SilentlyContinue
        return $false
    }

    Move-Item -Path $sourcePath -Destination $OutputFile -Force
    return $true
}

Require-Command "tar"

$arch = Get-ArchTag
$os = "windows"
Prepare-InstallerHome
$imageTag = "windows-$arch"
Write-Log "probing registries for $ImageRepo:$imageTag"
$registry = Select-Registry $imageTag
$tempDir = Join-Path $InstallerHomeDir "tmp"

New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

try {
    $layerFile = Join-Path $tempDir "layer.tar"

    Write-Log "selected registry: $registry"
    Write-Log "selected image: $ImageRepo:$imageTag"
    Write-Log "downloading installer to $installerPath"

    $manifest = Resolve-Manifest $registry $imageTag $os $arch
    if ($null -eq $manifest.layers -or $manifest.layers.Count -eq 0) {
        Fail "failed to resolve image layer digest"
    }

    $firstLayer = $manifest.layers | Select-Object -First 1
    if ($null -eq $firstLayer -or [string]::IsNullOrWhiteSpace($firstLayer.digest)) {
        Fail "failed to resolve image layer digest"
    }

    $installerPath = Join-Path $InstallerHomeDir ("install-" + (Get-ShortDigest $firstLayer.digest) + ".exe")
    if (Test-Path $installerPath) {
        Remove-Item -Path (Join-Path $InstallerHomeDir "manifest.json") -Force -ErrorAction SilentlyContinue
        Remove-Item -Path $layerFile -Force -ErrorAction SilentlyContinue
        & $installerPath @args
        exit $LASTEXITCODE
    }

    Remove-OldInstallers
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

    Remove-Item -Path (Join-Path $InstallerHomeDir "manifest.json") -Force -ErrorAction SilentlyContinue
    Remove-Item -Path $layerFile -Force -ErrorAction SilentlyContinue
} finally {
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}

& $installerPath @args
