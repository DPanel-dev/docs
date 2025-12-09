#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

CURRENT_DIR=$(
    cd "$(dirname "$0")" || exit
    pwd
)

LOG_FILE="$CURRENT_DIR/run.log"

LANG_DIR="$CURRENT_DIR/lang"
LANG_CODES=("en" "zh")
LANG_NAMES=("English" "中文(简体)")
LANG_CHOICE=2
LANG_SELECTED="zh"
LANG_FILE="$LANG_DIR/$LANG_SELECTED.sh"

IP_PUBLIC=
IP_LOCAL="127.0.0.1"
IP_REGION=""

VERSION_CODES=("se" "le" "pse" "ple" "bse" "ble" "tls")
IMAGE_CODES=("hub" "aliyun")

INSTALL_DIR="/home/dpanel"
INSTALL_PORT=8807
INSTALL_CONTAINER_NAME="dpanel"
INSTALL_IMAGE="dpanel/dpanel:lite"
INSTALL_PROXY=""
INSTALL_DNS=""
INSTALL_SOCK_FILE="/var/run/docker.sock"
INSTALL_IN_PODMAN=false
INSTALL_IPV6=n

BACKUP_CONTAINER_NAME=""

source "$LANG_FILE"

function log() {
    message="[DPanel Install Log]: $1 "
    case "$1" in
        *"$TXT_RUN_AS_ROOT"*|*"$TXT_RESULT_FAILED"*)
            echo -e "${RED}${message}${NC}" 2>&1 | tee -a "$LOG_FILE"
            ;;
        *"$TXT_SUCCESS_MESSAGE"* )
            echo -e "${GREEN}${message}${NC}" 2>&1 | tee -a "$LOG_FILE"
            ;;
        *"$TXT_IGNORE_MESSAGE"*|*"$TXT_SKIP_MESSAGE"*|*"$TXT_INSTALL_DOKCER_PODMAN"* )
            echo -e "${YELLOW}${message}${NC}" 2>&1 | tee -a "$LOG_FILE"
            ;;
        * )
            echo -e "${BLUE}${message}${NC}" 2>&1 | tee -a "$LOG_FILE"
            ;;
    esac
}

function warn() {
  message="[DPanel Install Log]: $1 "
  echo -e "${RED}${message}${NC}" 2>&1 | tee -a "$LOG_FILE"
}

function check_command() {
    local cmd_name=$1
    if ! command -v "$cmd_name" &> /dev/null; then
      log "$cmd_name $TXT_COMMAND_NOT_FOUND" 
      exit 1
    fi
}

function check_uname() {
    if [[ $(uname -a) == *"$1"* ]]; then
        echo "$1"
    fi
}

function select_lang() {
  log "$TXT_SELECT_LANGUAGE"
  for i in "${!LANG_CODES[@]}"; do
    echo "$((i + 1)). ${LANG_NAMES[$i]}"
  done
  read -p "$TXT_SELECT_LANGUAGE_CHOICE $LANG_CHOICE]: " LANG_CHOICE
  if [[ $LANG_CHOICE -ge 1 && $LANG_CHOICE -le ${#LANG_CODES[@]} ]]; then
    LANG_SELECTED=${LANG_CODES[$((LANG_CHOICE-1))]}
    LANG_FILE="$LANG_DIR/$LANG_SELECTED.sh"
  fi
  source "$LANG_FILE"
  clear
}

function check_root() {
    if [[ $EUID -ne 0 ]]; then
        log "$TXT_RUN_AS_ROOT"
        exit 1
    fi
}

function upgrade_panel() {
  log "$TXT_UPGRADE_START"

  
  if [[ "$INSTALL_IMAGE" == *lite ]]; then
    PORTS=$(docker inspect --format='{{range $p, $conf := .HostConfig.PortBindings}}{{if eq $p "8080/tcp"}}{{range $conf}}{{printf "-p %s:%s " .HostPort $p}}{{end}}{{end}}{{end}}' $INSTALL_CONTAINER_NAME)
    if [ -z "$PORTS" ]; then
      log $TXT_UPGRADE_EMPTY_PORT
      PORTS=""
    fi
  else
    PORTS=$(docker inspect --format='{{range $p, $conf := .HostConfig.PortBindings}}{{range $conf}}{{printf "-p %s:%s " .HostPort $p}}{{end}}{{end}}' $INSTALL_CONTAINER_NAME)
    if [ -z "$PORTS" ]; then
      log $TXT_UPGRADE_EMPTY_PORT
      PORTS=""
    fi
  fi

  # 获取最后显示访问的端口值
  HOST_PORT=$(docker inspect --format='{{range $p, $conf := .HostConfig.PortBindings}}{{if eq $p "8080/tcp"}}{{range $conf}}{{.HostPort}}{{end}}{{end}}{{end}}' "$INSTALL_CONTAINER_NAME")
  if [ -n "$HOST_PORT" ]; then
    INSTALL_PORT=$HOST_PORT
  fi
  
  MOUNTS=$(docker inspect --format='{{range .Mounts}}{{if eq .Type "volume"}}-v {{.Name}}:{{.Destination}} {{else if eq .Type "bind"}}-v {{.Source}}:{{.Destination}} {{end}}{{end}}' $INSTALL_CONTAINER_NAME)
  if [ -z "$MOUNTS" ]; then
    log $TXT_UPGRADE_EMPTY_MOUNT
    MOUNTS=""
  fi

  RUN_COMMAND=""

  if [ -n "$PORTS" ]; then
    RUN_COMMAND="$RUN_COMMAND $PORTS"
  fi
  
  if [ -n "$MOUNTS" ]; then
    RUN_COMMAND="$RUN_COMMAND $MOUNTS"
  fi

  if [[ -n "$INSTALL_PROXY" ]]; then
    RUN_COMMAND="$RUN_COMMAND -e HTTP_PROXY=$INSTALL_PROXY -e HTTPS_PROXY=$INSTALL_PROXY"
  else
    ENV_LIST=$(docker inspect --format '{{range .Config.Env}}{{println .}}{{end}}' "$INSTALL_CONTAINER_NAME")
    while read -r line; do
      if [[ $line == *"HTTP_PROXY="* || $line == *"HTTPS_PROXY="* ]]; then
        RUN_COMMAND="$RUN_COMMAND -e $line"
      fi
    done < <(echo "$ENV_LIST")
  fi

  if [[ -n "$INSTALL_DNS" ]]; then
    RUN_COMMAND="$RUN_COMMAND --dns $INSTALL_DNS"
  else
    DNS_LIST=$(docker inspect "$INSTALL_CONTAINER_NAME" --format '{{range .HostConfig.Dns}}{{print "--dns " . " "}}{{end}}')
    if [[ -n "$DNS_LIST" ]]; then
      RUN_COMMAND="$RUN_COMMAND $DNS_LIST"
    fi
  fi

  ENV_LIST=$(docker inspect --format '{{range .Config.Env}}{{println .}}{{end}}' "$INSTALL_CONTAINER_NAME")
  while read -r line; do
    if [[ $line == *"APP_NAME="* ]]; then
      RUN_COMMAND="$RUN_COMMAND -e $line"
    fi                      
  done < <(echo "$ENV_LIST")
  
  CONTAINER_ID=$(docker inspect --format '{{.Id}}' "$INSTALL_CONTAINER_NAME")

  RESTART_POLICY=$(docker inspect "$INSTALL_CONTAINER_NAME" --format '{{.HostConfig.RestartPolicy.Name}}')
  if [ "$RESTART_POLICY" = "on-failure" ]; then
      MAX_RETRIES=$(docker inspect "$INSTALL_CONTAINER_NAME" --format '{{.HostConfig.RestartPolicy.MaximumRetryCount}}')
      RESTART_POLICY="$RESTART_POLICY:$MAX_RETRIES"
  fi

  RUN_COMMAND="$RUN_COMMAND --restart $RESTART_POLICY"

  ADD_HOSTS=$(docker inspect "$INSTALL_CONTAINER_NAME" --format '{{range .HostConfig.ExtraHosts}}{{print "--add-host " . " "}}{{end}}')
  if [[ -n "$ADD_HOSTS" ]]; then
    RUN_COMMAND="$RUN_COMMAND $ADD_HOSTS"
  fi

  RUN_COMMAND="$RUN_COMMAND --log-driver json-file  --log-opt max-size=5m --log-opt max-file=10 "
  
  log "$TXT_UPGRADE_BACKUP $INSTALL_CONTAINER_NAME"
  BACKUP_CONTAINER_NAME="$INSTALL_CONTAINER_NAME-${CONTAINER_ID:0:12}"

  if [[ $1 == "test" || $2 == "test" ]]; then
    echo -e "docker stop $INSTALL_CONTAINER_NAME && docker rename "$INSTALL_CONTAINER_NAME" "$BACKUP_CONTAINER_NAME" \n"
    echo -e "docker run -d --pull always --name $INSTALL_CONTAINER_NAME --hostname dpanel.pod.dpanel.local $RUN_COMMAND $INSTALL_IMAGE \n"
    exit 1
  fi

  docker stop $INSTALL_CONTAINER_NAME && docker rename "$INSTALL_CONTAINER_NAME" "$BACKUP_CONTAINER_NAME"
  docker run -d --pull always --name $INSTALL_CONTAINER_NAME --hostname dpanel.pod.dpanel.local $RUN_COMMAND $INSTALL_IMAGE

  result
  exit 1
}

function install_version() {
  log "$TXT_INSTALL_VERSION"

  for i in "${!VERSION_CODES[@]}"; do
    echo "$((i + 1)). ${TXT_INSTALL_VERSION_NAME[$i]}"
  done

  read -p "$TXT_INSTALL_VERSION_CHOICE" INSTALL_VERSION
  if [[ $INSTALL_VERSION -ge 1 && $INSTALL_VERSION -le ${#VERSION_CODES[@]} ]]; then
    INSTALL_VERSION=${VERSION_CODES[$(($INSTALL_VERSION-1))]}
  else
    INSTALL_VERSION="le"
  fi

  INSTALL_IMAGE="dpanel/dpanel:latest"

  if [ "$INSTALL_VERSION" = "le" ]; then
    INSTALL_IMAGE="dpanel/dpanel:lite"
  fi

  if [ "$INSTALL_VERSION" = "bse" ]; then
    INSTALL_IMAGE="dpanel/dpanel:beta"
  fi

  if [ "$INSTALL_VERSION" = "ble" ]; then
    INSTALL_IMAGE="dpanel/dpanel:beta-lite"
  fi

  if [ "$INSTALL_VERSION" = "pse" ]; then
    INSTALL_IMAGE="dpanel/dpanel-pe:latest"
  fi

  if [ "$INSTALL_VERSION" = "ple" ]; then
    INSTALL_IMAGE="dpanel/dpanel-pe:lite"
  fi

  if [ "$INSTALL_VERSION" = "tls" ]; then
    install_tls
    return
  fi

  for i in "${!IMAGE_CODES[@]}"; do
    echo "$((i + 1)). ${TXT_INSTALL_VERSION_REGISTRY_NAME[$i]}"
  done

  read -p "$TXT_INSTALL_VERSION_REGISTRY_CHOICE" IMAGE_REGISTRY

  if [ "$IMAGE_REGISTRY" == "2" ]; then
    INSTALL_IMAGE="registry.cn-hangzhou.aliyuncs.com/${INSTALL_IMAGE}"
  fi

  log "$TXT_INSTALL_VERSION_IMAGE_SET $INSTALL_IMAGE"
}

function install_name() {
  log "$TXT_INSTALL_NAME"
  DEFAULT_NAME="dpanel"
  DO_UPGRADE="n"

  while true; do
    read -p "$TXT_INSTALL_NAME_INPUT $DEFAULT_NAME]: " INSTALL_CONTAINER_NAME
    if [[ "$INSTALL_CONTAINER_NAME" == "" ]]; then
        INSTALL_CONTAINER_NAME=$DEFAULT_NAME
    fi

    if [[ ! "$INSTALL_CONTAINER_NAME" =~ ^[_.a-zA-Z0-9-]{3,30}$ ]]; then
          log "$TXT_INSTALL_NAME_RULE"
          continue
    fi

    if docker ps -a --format '{{.Names}}' | grep -q "^${INSTALL_CONTAINER_NAME}$"; then
      log "$TXT_UPGRADE_MESSAGE"
      read -p "$TXT_UPGRADE_CHOICE" DO_UPGRADE
      if [[ "$DO_UPGRADE" =~ ^[yY]$ ]]; then
        upgrade_panel $1
      else
        continue
      fi
    fi

    log "$TXT_INSTALL_NAME_SET $INSTALL_CONTAINER_NAME"
    break
  done
}

function install_dir(){
    INSTALL_DIR="/home/${INSTALL_CONTAINER_NAME}"
    
    if read -p "$TXT_INSTALL_DIR $INSTALL_DIR]: " INSTALL_DIR;then
        if [[ "$INSTALL_DIR" != "" ]];then
            if [[ "$INSTALL_DIR" != /* ]];then
                log "$TXT_INSTALL_DIR_PROVIDE_FULL_PATH"
                install_dir
            fi
        else
          INSTALL_DIR="/home/${INSTALL_CONTAINER_NAME}"
        fi
    fi
    if mkdir -p "$INSTALL_DIR"; then
      log "$TXT_INSTALL_DIR_SET $INSTALL_DIR"
    else
      log $TXT_INSTALL_DIR_MAKE_FAILED
      install_dir
    fi
}

function install_port(){
    INSTALL_DEFAULT_PORT=$(expr $RANDOM % 55535 + 10000)

    while true; do
        read -p "$TXT_INSTALL_PORT $INSTALL_DEFAULT_PORT]: " INSTALL_PORT

        if [[ "$INSTALL_PORT" == "" ]];then
            INSTALL_PORT=$INSTALL_DEFAULT_PORT
        fi
        if ! [[ "$INSTALL_PORT" =~ ^[1-9][0-9]{0,4}$ && "$INSTALL_PORT" -le 65535 ]]; then
            log "$TXT_INSTALL_PORT_RULE"
            continue
        fi
        log "$TXT_INSTALL_PORT_SET $INSTALL_PORT"
        if [[ "$INSTALL_IMAGE" != *lite ]]; then
          log "$TXT_INSTALL_PORT_USE_80"
        fi
        log "$TXT_INSTALL_PORT_OCCUPIED"
        break
    done
}

function install_proxy() {
  if read -p "$TXT_INSTALL_PROXY: " INSTALL_PROXY;then
    if [[ -n "$INSTALL_PROXY" ]]; then  # 检查输入是否为空
        if [[ ! "$INSTALL_PROXY" =~ ^http(s)?:// ]]; then
            log "$TXT_INVALID_PROXY_NOT_HTTP"
            install_proxy
            return
        fi
        if [[ "$INSTALL_PROXY" =~ ^(http(s)?://(127\.0\.0\.1|localhost)) ]]; then
            log "$TXT_INVALID_PROXY_NOT_LOCAHOST"
            install_proxy
            return
        fi
        log "$TXT_INSTALL_PROXY_SET: $INSTALL_PROXY"
    fi
  fi
}

function install_dns() {
  if read -p "$TXT_INSTALL_DNS: " INSTALL_DNS;then
    if [[ -n "$INSTALL_DNS" ]]; then
        log "$TXT_INSTALL_DNS_SET: $INSTALL_DNS"
    fi
  fi
}

function install_sock() {
  if $INSTALL_IN_PODMAN; then
    DEFAULT_SOCK_FILE="/run/podman/podman.sock"
    INSTALL_SOCK_FILE=$DEFAULT_SOCK_FILE
  else
    DEFAULT_SOCK_FILE=$(docker context inspect $(docker context show)  --format '{{.Endpoints.docker.Host}}')
  fi
  

  log "$TXT_INSTALL_SOCK_TIPS_1 ${DEFAULT_SOCK_FILE#unix://}"
  log "$TXT_INSTALL_SOCK_TIPS_2"
  log "sudo ln -s -f ${DEFAULT_SOCK_FILE#unix://} /var/run/docker.sock"
  log "$TXT_INSTALL_SOCK_TIPS_4"
  log "$TXT_INSTALL_SOCK_TIPS_5"
  log "$TXT_INSTALL_SOCK_TIPS_6"
  log "$TXT_INSTALL_SOCK_TIPS_3"

  if read -p "$TXT_INSTALL_SOCK $INSTALL_SOCK_FILE]: " DEFAULT_SOCK_FILE;then
    if [[ -n "$DEFAULT_SOCK_FILE" ]]; then
        INSTALL_SOCK_FILE=$DEFAULT_SOCK_FILE
    fi
  fi

  log "$TXT_INSTALL_SOCK_SET: $INSTALL_SOCK_FILE"
}

function install_docker(){
  if command -v docker >/dev/null 2>&1; then
    docker_version=$(docker --version | grep -oE '[0-9]+\.[0-9]+' | head -n 1)
    major_version=${docker_version%%.*}
    minor_version=${docker_version##*.}
    if [[ $major_version -lt 20 ]]; then
      log "$TXT_INSTALL_LOW_DOCKER_VERSION"
    fi
  else
    read -p "$TXT_INSTALL_DOCKER_MESSAGE" DO_INSTALL_DOCKER
    if [ "$DO_INSTALL_DOCKER" == "n" ]; then
     exit 1
    fi

    check_command systemctl

    log "$TXT_INSTALL_DOCKER_INSTALL_ONLINE"

    if [[ "$IP_REGION" == "CN" ]]; then
      sources=(
        "https://mirrors.aliyun.com/docker-ce"
        "https://mirrors.tencent.com/docker-ce"
        "https://mirrors.163.com/docker-ce"
        "https://mirrors.cernet.edu.cn/docker-ce"
      )

      docker_install_scripts=(
        "https://get.docker.com"
        "https://testingcf.jsdelivr.net/gh/docker/docker-install@master/install.sh"
        "https://cdn.jsdelivr.net/gh/docker/docker-install@master/install.sh"
        "https://fastly.jsdelivr.net/gh/docker/docker-install@master/install.sh"
        "https://gcore.jsdelivr.net/gh/docker/docker-install@master/install.sh"
        "https://raw.githubusercontent.com/docker/docker-install/master/install.sh"
      )

      get_average_delay() {
          local source=$1
          local total_delay=0
          local iterations=2
          local timeout=2

          for ((i = 0; i < iterations; i++)); do
              delay=$(curl -o /dev/null -s -m $timeout -w "%{time_total}\n" "$source")
              if [ $? -ne 0 ]; then
                  delay=$timeout
              fi
              total_delay=$(awk "BEGIN {print $total_delay + $delay}")
          done

          average_delay=$(awk "BEGIN {print $total_delay / $iterations}")
          echo "$average_delay"
      }

      min_delay=99999999
      selected_source=""

      for source in "${sources[@]}"; do
          average_delay=$(get_average_delay "$source" &)

          if (( $(awk 'BEGIN { print '"$average_delay"' < '"$min_delay"' }') )); then
              min_delay=$average_delay
              selected_source=$source
          fi
      done
      wait

      if [ -n "$selected_source" ]; then
          log "$TXT_INSTALL_DOCKER_CHOOSE_LOWEST_LATENCY_SOURCE $selected_source，$TXT_INSTALL_DOCKER_CHOOSE_LOWEST_LATENCY_DELAY $min_delay"
          export DOWNLOAD_URL="$selected_source"

          for alt_source in "${docker_install_scripts[@]}"; do
              log "$TXT_INSTALL_DOCKER_TRY_NEXT_LINK $alt_source $TXT_DOWNLOAD_DOCKER_SCRIPT_FAIL"
              if curl -fsSL --retry 2 --retry-delay 3 --connect-timeout 5 --max-time 10 "$alt_source" -o get-docker.sh; then
                  log "$TXT_DOWNLOAD_DOCKER_SCRIPT_SUCCESS $alt_source $TXT_SUCCESSFULLY_MESSAGE"
                  break
              else
                  log "$TXT_DOWNLOAD_DOCKER_FAILED $alt_source $TXT_DOWNLOAD_DOCKER_TRY_NEXT_LINK"
              fi
          done

          if [ ! -f "get-docker.sh" ]; then
            log "$TXT_DOWNLOAD_ALL_ATTEMPTS_FAILED"
            log "bash <(curl -sSL https://linuxmirrors.cn/docker.sh)"
            exit 1
          fi

          sh get-docker.sh 2>&1 | tee -a "$LOG_FILE"

          docker_config_folder="/etc/docker"
          if [[ ! -d "$docker_config_folder" ]];then
              mkdir -p "$docker_config_folder"
          fi

          docker version >/dev/null 2>&1
          if [[ $? -ne 0 ]]; then
            log "$TXT_INSTALL_DOCKER_INSTALL_FAILED"
            exit 1
          else
            log "$TXT_INSTALL_DOCKER_INSTALL_SUCCESS"
            systemctl enable docker 2>&1 | tee -a "$LOG_FILE"
          fi
        else
          log "$TXT_INSTALL_DOCKER_CANNOT_SELECT_SOURCE"
          exit 1
        fi
    else
      log "$TXT_DOWNLOAD_REGIONS_OTHER_THAN_CHINA"
      export DOWNLOAD_URL="https://download.docker.com"
      curl -fsSL "https://get.docker.com" -o get-docker.sh
      sh get-docker.sh 2>&1 | tee -a "$LOG_FILE"

      log "$TXT_INSTALL_DOCKER_START_NOTICE"
      systemctl enable docker; systemctl daemon-reload; systemctl start docker 2>&1 | tee -a "$LOG_FILE"

      docker_config_folder="/etc/docker"
      if [[ ! -d "$docker_config_folder" ]];then
        mkdir -p "$docker_config_folder"
      fi
      docker version >/dev/null 2>&1
      if [[ $? -ne 0 ]]; then
        log "$TXT_INSTALL_DOCKER_INSTALL_FAILED"
        exit 1
      else
        log "$TXT_INSTALL_DOCKER_INSTALL_SUCCESS"
      fi
    fi
  fi
}

function install_docker_alpine() {
  if command -v docker >/dev/null 2>&1; then
    docker_version=$(docker --version | grep -oE '[0-9]+\.[0-9]+' | head -n 1)
    major_version=${docker_version%%.*}
    minor_version=${docker_version##*.}
    if [[ $major_version -lt 20 ]]; then
        log "$TXT_INSTALL_LOW_DOCKER_VERSION"
    fi
  else
    read -p "$TXT_INSTALL_DOCKER_MESSAGE" DO_INSTALL_DOCKER
    if [ "$DO_INSTALL_DOCKER" == "n" ]; then
      exit 1
    fi

    log "$TXT_INSTALL_DOCKER_INSTALL_ONLINE"
    apk add --no-cache --update docker 2>&1 | tee -a "$LOG_FILE"

    docker_config_folder="/etc/docker"
    if [[ ! -d "$docker_config_folder" ]];then
        mkdir -p "$docker_config_folder"
    fi
    log "$TXT_INSTALL_DOCKER_INSTALL_SUCCESS"
    service docker start 2>&1 | tee -a "$LOG_FILE"
    rc-update add docker 2>&1 | tee -a "$LOG_FILE"
    docker version >/dev/null 2>&1
    if [[ $? -ne 0 ]]; then
        log "$TXT_INSTALL_DOCKER_INSTALL_FAILED"
        exit 1
    fi
  fi
}

function get_ip(){
    active_interface=$(ip route get 8.8.8.8 | awk 'NR==1 {print $5}')
    if [[ -z $active_interface ]]; then
        IP_LOCAL="127.0.0.1"
    else
        IP_LOCAL=$(ip -4 addr show dev "$active_interface" | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
    fi

    IP_PUBLIC=$(curl -s https://api64.ipify.org)
    if [[ -z "$IP_PUBLIC" ]]; then
        IP_PUBLIC="N/A"
    fi
    if echo "$IP_PUBLIC" | grep -q ":"; then
        IP_PUBLIC=[${IP_PUBLIC}]
    fi

    if [[ $(curl -s ipinfo.io/country) == "CN" ]]; then
      IP_REGION="CN"
    fi
}

function install_tls() {
  while true; do
    read -p "$TXT_INSTALL_TLS_IP" TLS_IP
    if [[ "$TLS_IP" == "" ]]; then
      continue
    fi
    break
  done
  
  while true; do
    read -p "$TXT_INSTALL_TLS_ROOT_PATH" TLS_ROOT_PATH
    if [[ "$TLS_ROOT_PATH" == "" || "$TLS_ROOT_PATH" != /* ]]; then
      continue
    fi
    break
  done
  
  
  mkdir -p $TLS_ROOT_PATH
  log "$TXT_INSTALL_TLS_TIP" 
  openssl genrsa -aes256 -out ${TLS_ROOT_PATH%/}/ca-key.pem 4096
  log "$TXT_INSTALL_TLS_TIP1"
  openssl req -new -x509 -days 36500 -subj "/C=CN/ST=Beijing/L=Beijing/O=DPANEL/OU=DPANEL/CN=DPANEL" -key ${TLS_ROOT_PATH%/}/ca-key.pem -sha256 -out ${TLS_ROOT_PATH%/}/ca.pem 
  openssl genrsa -out ${TLS_ROOT_PATH%/}/server-key.pem 4096
  openssl req -subj "/CN=$TLS_IP" -sha256 -new -key ${TLS_ROOT_PATH%/}/server-key.pem -out ${TLS_ROOT_PATH%/}/server.csr
  echo subjectAltName = DNS:$TLS_IP,IP:$TLS_IP >> ${TLS_ROOT_PATH%/}/extfile.cnf
  echo extendedKeyUsage = serverAuth >> ${TLS_ROOT_PATH%/}/extfile.cnf

  log "$TXT_INSTALL_TLS_TIP1"
  openssl x509 -req -days 365 -sha256 -in ${TLS_ROOT_PATH%/}/server.csr -CA ${TLS_ROOT_PATH%/}/ca.pem -CAkey ${TLS_ROOT_PATH%/}/ca-key.pem \
  -CAcreateserial -out ${TLS_ROOT_PATH%/}/server-cert.pem -extfile ${TLS_ROOT_PATH%/}/extfile.cnf

  log "$TXT_INSTALL_TLS_TIP1"
  openssl genrsa -out ${TLS_ROOT_PATH%/}/key.pem 4096 && \
  openssl req -subj '/CN=client' -new -key ${TLS_ROOT_PATH%/}/key.pem -out ${TLS_ROOT_PATH%/}/client.csr && \
  echo extendedKeyUsage = clientAuth > ${TLS_ROOT_PATH%/}/extfile-client.cnf
  openssl x509 -req -days 365 -sha256 -in ${TLS_ROOT_PATH%/}/client.csr -CA ${TLS_ROOT_PATH%/}/ca.pem -CAkey ${TLS_ROOT_PATH%/}/ca-key.pem \
    -CAcreateserial -out ${TLS_ROOT_PATH%/}/cert.pem -extfile ${TLS_ROOT_PATH%/}/extfile-client.cnf
  chmod -v 0400 ${TLS_ROOT_PATH%/}/ca-key.pem ${TLS_ROOT_PATH%/}/key.pem ${TLS_ROOT_PATH%/}/server-key.pem && \
  chmod -v 0444 ${TLS_ROOT_PATH%/}/ca.pem ${TLS_ROOT_PATH%/}/server-cert.pem ${TLS_ROOT_PATH%/}/cert.pem
  
  log ""
  log "$TXT_RESULT_THANK_YOU_WAITING"
  log ""
  log "$TXT_INSTALL_TLS_RESULT_PATH $TLS_ROOT_PATH"
  log "$TXT_INSTALL_TLS_RESULT_PARAMS"
  log "--tlsverify --tlscacert=${TLS_ROOT_PATH%/}/ca.pem --tlscert=${TLS_ROOT_PATH%/}/server-cert.pem --tlskey=${TLS_ROOT_PATH%/}/server-key.pem -H tcp://0.0.0.0:2376"
  log ""
  log "$TXT_INSTALL_TLS_RESULT_HELP"
  log ""
  log "======================================================================="
  exit 1
}

function result(){
  if [ $? -ne 0 ]; then
    log "$TXT_RESULT_FAILED"
    if [ -n "$BACKUP_CONTAINER_NAME" ]; then
      log "$TXT_UPGRADE_BACKUP_RESUME $BACKUP_CONTAINER_NAME"
      docker rename "$BACKUP_CONTAINER_NAME" "$INSTALL_CONTAINER_NAME"
      docker start $INSTALL_CONTAINER_NAME
    fi
    exit 1
  else
    DPANEL_LOCAL_NETWORK="dpanel-local"
    if [ -n "$(docker network ls | grep $DPANEL_LOCAL_NETWORK)" ]; then
      log "$TXT_UPGRADE_JOIN_DPANEL_LOCAL $DPANEL_LOCAL_NETWORK"
      docker network connect $DPANEL_LOCAL_NETWORK $INSTALL_CONTAINER_NAME
      docker restart $INSTALL_CONTAINER_NAME
    fi
  fi
  
  log ""
  log "$TXT_RESULT_THANK_YOU_WAITING"
  log ""
  warn "$TXT_RESULT_BROWSER_ACCESS_PANEL"
  log "$TXT_RESULT_FORCE_REFRESH"
  log "$TXT_RESULT_OPEN_PORT_SECURITY_GROUP $INSTALL_PORT"
  log ""
  log "$TXT_RESULT_EXTERNAL_ADDRESS http://$IP_PUBLIC:$INSTALL_PORT"
  log "$TXT_RESULT_INTERNAL_ADDRESS http://$IP_LOCAL:$INSTALL_PORT"
  log ""
  log "$TXT_RESULT_DESKTOP_ADDRESS"
  log "$TXT_RESULT_INTERNAL_ADDRESS http://127.0.0.1:$INSTALL_PORT"
  log ""
  log "$TXT_RESULT_PROJECT_WEBSITE"
  log "$TXT_RESULT_PROJECT_REPOSITORY"
  log ""
  log "======================================================================="
}

log "$TXT_START_INSTALLATION"

function main(){
  if [ "$(check_uname alpine)" != "" ];then
    if [ "$IP_REGION" = "CN" ]; then
      sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
    fi
    apk add --no-cache --update curl grep 2>&1 
    LANG_FILE="$LANG_DIR/en.sh"
    LANG_CHOICE=1
    source "$LANG_FILE"
  fi

  if [ "${1:-}" != "test" ]; then
    check_command bash
    check_command curl
    check_command ip

    get_ip
  fi

  select_lang
  if ! command -v docker &> /dev/null && command -v podman &> /dev/null; then
    docker() {
        podman "$@"
    }
    INSTALL_IN_PODMAN=true
    log "$TXT_INSTALL_DOKCER_PODMAN"
  else
    check_root
  fi

  if [ "$(check_uname alpine)" != "" ];then 
    install_docker_alpine
  else
    install_docker
  fi
  
  install_version
  install_proxy
  install_dns
  install_name $1
  install_dir
  install_port
  install_sock
  
  DOCKER_CMD="run -d --name ${INSTALL_CONTAINER_NAME} --restart=always --hostname dpanel.pod.dpanel.local"
  if ! $INSTALL_IN_PODMAN; then 
    DOCKER_CMD="$DOCKER_CMD --add-host host.dpanel.local:host-gateway"
  fi
  DOCKER_CMD="$DOCKER_CMD -e APP_NAME=${INSTALL_CONTAINER_NAME}"
  if [[ -n "$INSTALL_PROXY" ]]; then
    DOCKER_CMD="$DOCKER_CMD -e HTTP_PROXY=$INSTALL_PROXY -e HTTPS_PROXY=$INSTALL_PROXY"
  fi

  if [[ -n "$INSTALL_DNS" ]]; then
    DOCKER_CMD="$DOCKER_CMD --dns $INSTALL_DNS"
  fi

  if [[ "$INSTALL_IPV6" =~ ^[yY]$ ]]; then
  
    docker network create dpanel-local --ipv6
  fi

  if [[ "$INSTALL_IMAGE" == *lite ]]; then
    DOCKER_CMD="$DOCKER_CMD -p ${INSTALL_PORT}:8080"
  else
    DOCKER_CMD="$DOCKER_CMD -p 80:80 -p 443:443 -p ${INSTALL_PORT}:8080"
  fi

  DOCKER_CMD="$DOCKER_CMD -v $INSTALL_SOCK_FILE:/var/run/docker.sock -v ${INSTALL_DIR}:/dpanel $INSTALL_IMAGE"

  if [[ $1 == "test" ]]; then
    echo -e "docker $DOCKER_CMD \n"
    exit 1
  fi

  DOCKER_CMD="$DOCKER_CMD --log-driver json-file  --log-opt max-size=5m --log-opt max-file=10 "
  
  docker $DOCKER_CMD

  result
}

main $1
