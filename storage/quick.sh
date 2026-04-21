#!/usr/bin/env bash

set -euo pipefail

REGISTRY_DOCKER_HUB="docker.io"
REGISTRY_DOCKER_HUB_API="registry-1.docker.io"
REGISTRY_ALIYUN="registry.cn-hangzhou.aliyuncs.com"
IMAGE_REPO="dpanel/installer"
INSTALLER_TAR_PATH="installer/dpanel-installer"
INSTALLER_HOME_DIR="${HOME}/.dpanel/installer"
ACCEPT_MANIFEST='application/vnd.docker.distribution.manifest.v2+json'
ACCEPT_MANIFEST_LIST='application/vnd.docker.distribution.manifest.list.v2+json'
ACCEPT_OCI_MANIFEST='application/vnd.oci.image.manifest.v1+json'
ACCEPT_OCI_INDEX='application/vnd.oci.image.index.v1+json'
ACCEPT_HEADER_VALUE="${ACCEPT_MANIFEST}, ${ACCEPT_MANIFEST_LIST}, ${ACCEPT_OCI_MANIFEST}, ${ACCEPT_OCI_INDEX}"

log() {
  printf '[quick] %s\n' "$*" >&2
}

fail() {
  log "$*"
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "missing required command: $1"
}

prepare_installer_home() {
  [ -n "${HOME:-}" ] || fail "HOME is not set"
  mkdir -p "$INSTALLER_HOME_DIR"
}

cleanup_old_installers() {
  find "$INSTALLER_HOME_DIR" -maxdepth 1 -type f -name 'install-*' -exec rm -f {} +
}

digest_short_name() {
  local digest="$1"
  digest="${digest#sha256:}"
  printf '%.8s\n' "$digest"
}

detect_os() {
  case "$(uname -s)" in
    Linux) echo "linux" ;;
    Darwin) echo "darwin" ;;
    *)
      fail "unsupported operating system: $(uname -s)"
      ;;
  esac
}

detect_arch() {
  case "$(uname -m)" in
    x86_64|amd64) echo "amd64" ;;
    aarch64|arm64) echo "arm64" ;;
    armv7l|armv7|armhf|arm)
      echo "arm"
      ;;
    *)
      fail "unsupported architecture: $(uname -m)"
      ;;
  esac
}

registry_manifest_url() {
  local registry="$1"
  local image_tag="$2"
  if [ "$registry" = "$REGISTRY_DOCKER_HUB" ]; then
    printf 'https://%s/v2/%s/manifests/%s' "$REGISTRY_DOCKER_HUB_API" "$IMAGE_REPO" "$image_tag"
    return
  fi
  printf 'https://%s/v2/%s/manifests/%s' "$registry" "$IMAGE_REPO" "$image_tag"
}

registry_blob_url() {
  local registry="$1"
  local digest="$2"
  if [ "$registry" = "$REGISTRY_DOCKER_HUB" ]; then
    printf 'https://%s/v2/%s/blobs/%s' "$REGISTRY_DOCKER_HUB_API" "$IMAGE_REPO" "$digest"
    return
  fi
  printf 'https://%s/v2/%s/blobs/%s' "$registry" "$IMAGE_REPO" "$digest"
}

extract_header_value() {
  local header_file="$1"
  local header_name="$2"
  awk -F': ' -v key="$header_name" 'BEGIN { IGNORECASE=1 } $1 == key { sub("\r$", "", $2); print $2; exit }' "$header_file"
}

request_auth_header() {
  local url="$1"
  local header_file="$2"
  shift 2
  curl -sS -D "$header_file" -o /dev/null \
    "$@" \
    -H "Accept: ${ACCEPT_HEADER_VALUE}" \
    "$url" || true
  extract_header_value "$header_file" "www-authenticate"
}

parse_auth_field() {
  local auth_header="$1"
  local field_name="$2"
  printf '%s' "$auth_header" | sed -n "s/.*${field_name}=\"\\([^\"]*\\)\".*/\\1/p"
}

request_registry_token() {
  local auth_header="$1"
  shift
  local realm service scope
  realm="$(parse_auth_field "$auth_header" "realm")"
  service="$(parse_auth_field "$auth_header" "service")"
  scope="$(parse_auth_field "$auth_header" "scope")"

  [ -n "$realm" ] || fail "failed to parse registry auth realm"
  [ -n "$service" ] || fail "failed to parse registry auth service"
  [ -n "$scope" ] || fail "failed to parse registry auth scope"

  curl -fsSLG \
    "$@" \
    --data-urlencode "service=${service}" \
    --data-urlencode "scope=${scope}" \
    "$realm" | \
    sed -n 's/.*"token":"\([^"]*\)".*/\1/p'
}

fetch_with_auth() {
  local url="$1"
  local accept="$2"
  local output_file="$3"
  local registry="$4"
  local image_tag="$5"
  local token

  token="$(get_registry_token_for_image "$registry" "$image_tag")"
  if [ -n "$token" ]; then
    curl -fsSL \
      -H "Authorization: Bearer ${token}" \
      -H "Accept: ${accept}" \
      "$url" \
      -o "$output_file"
    return
  fi

  curl -fsSL \
    -H "Accept: ${accept}" \
    "$url" \
    -o "$output_file"
}

get_registry_token_for_image() {
  local registry="$1"
  local image_tag="$2"
  local manifest_url auth_header token header_file

  manifest_url="$(registry_manifest_url "$registry" "$image_tag")"
  header_file="${INSTALLER_HOME_DIR}/auth-header.txt"
  auth_header="$(request_auth_header "$manifest_url" "$header_file")"
  rm -f "$header_file"

  token=""
  if [ -n "$auth_header" ]; then
    token="$(request_registry_token "$auth_header")"
  fi

  printf '%s\n' "$token"
}

fetch_manifest() {
  local registry="$1"
  local image_tag="$2"
  local output_file="$3"
  local manifest_url

  manifest_url="$(registry_manifest_url "$registry" "$image_tag")"
  fetch_with_auth "$manifest_url" "$ACCEPT_HEADER_VALUE" "$output_file" "$registry" "$image_tag"
}

compact_json() {
  tr -d '\n\r\t ' <"$1"
}

manifest_media_type() {
  compact_json "$1" | grep -o '"mediaType":"[^"]*"' | head -n 1 | sed 's/"mediaType":"//;s/"$//'
}

manifest_list_digest() {
  local manifest_file="$1"
  local os="$2"
  local arch="$3"
  local manifests_line digest line

  manifests_line="$(compact_json "$manifest_file" | sed -n 's/.*"manifests":\[\(.*\)\].*/\1/p')"
  [ -n "$manifests_line" ] || return 1

  while IFS= read -r line; do
    case "$line" in
      *'"vnd.docker.reference.type":"attestation-manifest"'*) continue ;;
    esac
    case "$line" in
      *"\"os\":\"${os}\""* )
        case "$line" in
          *"\"architecture\":\"${arch}\""* )
            digest="$(printf '%s' "$line" | sed -n 's/.*"digest":"\([^"]*\)".*/\1/p')"
            [ -n "$digest" ] && printf '%s\n' "$digest" && return 0
            ;;
        esac
        ;;
    esac
  done <<EOF
$(printf '%s' "$manifests_line" | sed 's/},{/}|{/g' | tr '|' '\n')
EOF

  while IFS= read -r line; do
    case "$line" in
      *'"vnd.docker.reference.type":"attestation-manifest"'*) continue ;;
      *'"os":"unknown"'*'"architecture":"unknown"'*) continue ;;
    esac
    digest="$(printf '%s' "$line" | sed -n 's/.*"digest":"\([^"]*\)".*/\1/p')"
    [ -n "$digest" ] && printf '%s\n' "$digest" && return 0
  done <<EOF
$(printf '%s' "$manifests_line" | sed 's/},{/}|{/g' | tr '|' '\n')
EOF

  return 1
}

manifest_layer_digests() {
  compact_json "$1" | \
    sed -n 's/.*"layers":\[\(.*\)\].*/\1/p' | \
    grep -o '"digest":"[^"]*"' | \
    sed 's/"digest":"//;s/"$//'
}

resolve_image_manifest() {
  local registry="$1"
  local image_tag="$2"
  local os="$3"
  local arch="$4"
  local output_file="$5"
  local media_type digest

  fetch_manifest "$registry" "$image_tag" "$output_file"
  media_type="$(manifest_media_type "$output_file")"

  case "$media_type" in
    "$ACCEPT_MANIFEST"|"$ACCEPT_OCI_MANIFEST")
      return
      ;;
    "$ACCEPT_MANIFEST_LIST"|"$ACCEPT_OCI_INDEX")
      digest="$(manifest_list_digest "$output_file" "$os" "$arch")"
      [ -n "$digest" ] || fail "failed to resolve platform manifest digest"
      fetch_with_auth \
        "$(registry_manifest_url "$registry" "$digest")" \
        "${ACCEPT_MANIFEST}, ${ACCEPT_OCI_MANIFEST}" \
        "$output_file" \
        "$registry" \
        "$image_tag"
      return
      ;;
  esac

  fail "unsupported manifest media type: ${media_type:-unknown}"
}

measure_registry_seconds() {
  local registry="$1"
  local image_tag="$2"
  local manifest_url auth_header token header_file seconds

  manifest_url="$(registry_manifest_url "$registry" "$image_tag")"
  header_file="${INSTALLER_HOME_DIR}/auth-header.txt"
  auth_header="$(request_auth_header "$manifest_url" "$header_file" --connect-timeout 5 --max-time 5)"
  rm -f "$header_file"

  token=""
  if [ -n "$auth_header" ]; then
    token="$(request_registry_token "$auth_header" --connect-timeout 5 --max-time 5)"
  fi

  if [ -n "$token" ]; then
    seconds="$(curl -o /dev/null -sS --connect-timeout 5 --max-time 15 \
      -w '%{time_total}' \
      -H "Authorization: Bearer ${token}" \
      -H "Accept: ${ACCEPT_HEADER_VALUE}" \
      "$manifest_url" || true)"
  else
    seconds="$(curl -o /dev/null -sS --connect-timeout 5 --max-time 15 \
      -w '%{time_total}' \
      -H "Accept: ${ACCEPT_HEADER_VALUE}" \
      "$manifest_url" || true)"
  fi

  case "$seconds" in
    ''|0.000000) return 1 ;;
  esac
  printf '%s\n' "$seconds"
}

select_registry() {
  local image_tag="$1"
  local hub_seconds aliyun_seconds

  hub_seconds="$(measure_registry_seconds "$REGISTRY_DOCKER_HUB" "$image_tag" || true)"
  aliyun_seconds="$(measure_registry_seconds "$REGISTRY_ALIYUN" "$image_tag" || true)"

  if [ -n "$hub_seconds" ] && [ -n "$aliyun_seconds" ]; then
    if awk "BEGIN { exit !($hub_seconds <= $aliyun_seconds) }"; then
      printf '%s\n' "$REGISTRY_DOCKER_HUB"
      return
    fi
    printf '%s\n' "$REGISTRY_ALIYUN"
    return
  fi

  if [ -n "$aliyun_seconds" ]; then
    printf '%s\n' "$REGISTRY_ALIYUN"
    return
  fi

  if [ -n "$hub_seconds" ]; then
    printf '%s\n' "$REGISTRY_DOCKER_HUB"
    return
  fi

  fail "unable to reach docker.io or registry.cn-hangzhou.aliyuncs.com"
}

download_layer() {
  local registry="$1"
  local image_tag="$2"
  local digest="$3"
  local output_file="$4"
  local blob_url token

  blob_url="$(registry_blob_url "$registry" "$digest")"
  token="$(get_registry_token_for_image "$registry" "$image_tag")"

  if [ -n "$token" ]; then
    curl -fsSL \
      -H "Authorization: Bearer ${token}" \
      "$blob_url" \
      -o "$output_file"
    return
  fi

  curl -fsSL "$blob_url" -o "$output_file"
}

extract_installer() {
  local layer_file="$1"
  local output_file="$2"

  if tar -xOf "$layer_file" "$INSTALLER_TAR_PATH" >"$output_file" 2>/dev/null; then
    return
  fi

  if gzip -dc "$layer_file" | tar -xOf - "$INSTALLER_TAR_PATH" >"$output_file" 2>/dev/null; then
    return
  fi

  rm -f "$output_file"
  return 1
}

main() {
  require_command curl
  require_command gzip
  require_command tar

  local os arch image_tag registry installer_path manifest_file layer_file digests found_installer short_digest selected_digest
  os="$(detect_os)"
  arch="$(detect_arch)"
  prepare_installer_home
  image_tag="${os}-${arch}"
  log "probing registries for ${IMAGE_REPO}:${image_tag}"
  registry="$(select_registry "$image_tag")"

  manifest_file="${INSTALLER_HOME_DIR}/manifest.json"
  layer_file="${INSTALLER_HOME_DIR}/layer.tar"

  log "selected registry: ${registry}"
  log "selected image: ${IMAGE_REPO}:${image_tag}"

  resolve_image_manifest "$registry" "$image_tag" "$os" "$arch" "$manifest_file"
  digests="$(manifest_layer_digests "$manifest_file" || true)"
  [ -n "$digests" ] || fail "failed to resolve image layer digest"

  selected_digest="$(printf '%s\n' "$digests" | sed -n '1p')"
  [ -n "$selected_digest" ] || fail "failed to resolve image layer digest"
  short_digest="$(digest_short_name "$selected_digest")"
  installer_path="${INSTALLER_HOME_DIR}/install-${short_digest}"
  if [ -f "$installer_path" ]; then
    log "using cached installer ${installer_path}"
    rm -f "$manifest_file" "$layer_file"
    exec "$installer_path" "$@"
  fi

  log "downloading installer to ${installer_path}"
  cleanup_old_installers
  found_installer=""
  while IFS= read -r digest; do
    [ -n "$digest" ] || continue
    download_layer "$registry" "$image_tag" "$digest" "$layer_file"
    if extract_installer "$layer_file" "$installer_path" 2>/dev/null; then
      found_installer="1"
      break
    fi
  done <<EOF
$digests
EOF

  [ -n "$found_installer" ] || fail "failed to extract ${INSTALLER_TAR_PATH} from image layers"
  rm -f "$manifest_file" "$layer_file"
  chmod +x "$installer_path"

  exec "$installer_path" "$@"
}

main "$@"
