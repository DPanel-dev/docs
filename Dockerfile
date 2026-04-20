FROM node:24-alpine AS builder

WORKDIR /app
COPY . .
RUN apk update && apk add git && rm -rf node_modules && npm install && npm run docs:build

FROM alpine AS downloader

RUN apk add --no-cache curl jq
RUN set -eux; \
    mkdir -p /download; \
    cd /download; \
    curl -s "https://api.github.com/repos/donknap/dpanel/releases/latest" | \
    jq -r '.assets[].browser_download_url' | \
    while read url; do \
        case "$url" in \
            *dpanel-amd64.fpk|*dpanel-desktop-amd64-installer.exe) \
                echo "📥 Downloading: $(basename "$url")"; \
                curl -sL -O "$url" ;; \
        esac; \
    done

FROM nginx:1.27

COPY ./storage /usr/share/nginx/html/storage
COPY ./storage/image/dpanel.ico /usr/share/nginx/html/favicon.ico
COPY ./storage/ads.txt /usr/share/nginx/html/ads.txt
COPY ./storage/quick.sh /usr/share/nginx/html/quick.sh
COPY ./storage/quick-v1.sh /usr/share/nginx/html/quick-v1.sh
COPY ./storage/quick.ps1 /usr/share/nginx/html/quick.ps1
COPY ./storage/api /usr/share/nginx/html/api

RUN sed -i '/root.*;/a\ try_files \$uri \$uri/ \$uri.html =404;' \
  /etc/nginx/conf.d/default.conf && \
  tar czvf /usr/share/nginx/html/install.tar -C /usr/share/nginx/html/storage/install ./install.sh ./lang && \
  mkdir -p /usr/share/nginx/html/download/

COPY --from=builder /app/.vitepress/dist /usr/share/nginx/html/
COPY --from=downloader /download/* /usr/share/nginx/html/download/