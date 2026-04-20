#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

function log() {
    message="[DPanel Install Log]: $1 "
    echo -e "${BLUE}${message}${NC}" 2>&1 
}

INSTALL_NAME="install.tar"
INSTALL_URL="https://dpanel.cc/$INSTALL_NAME"

log "开始下载 DPanel 集成安装脚本"
log "安装包下载地址： ${INSTALL_URL}"

curl -LOk ${INSTALL_URL}
if [ ! -f ${INSTALL_NAME} ];then
	log "${RED} 下载安装包失败，请稍候重试。"
	exit 1
fi

mkdir -p ./dpanel-install && tar zxvf ${INSTALL_NAME} -C dpanel-install
if [ $? != 0 ];then
	log "下载安装包失败，请稍候重试。"
	rm -f ${INSTALL_NAME}
	exit 1
fi

cd dpanel-install && /bin/bash install.sh