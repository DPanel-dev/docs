  dpanel:
    # 根据当前网络环境，选择 阿里云 或是 Hub 镜像
    # 使用 Lite 版请更改镜像地址为 dpanel/dpanel:lite
    image: dpanel/dpanel:latest
    # 修改容器名称后，请同步修改下方 APP_NAME 环境变量
    container_name: dpanel
    restart: always
    ports:
      # 使用 Lite 版时删除 80 及 443 端口映射配置
      - 80:80
      - 443:443
      # 修改 8807 更改面板访问端口
      - 8807:8080
    environment:
      # APP_NAME 必须与 container_name 一致
      - APP_NAME=dpanel
      # 配置面板代理地址
      - HTTP_PROXY= 
      - HTTPS_PROXY= 
      # 配置面板访问的二级目录
      - DP_SYSTEM_BASEURL=
    volumes:
      # windows、macOS 将冒号前更改为 //var/run/docker.sock
      - /var/run/docker.sock:/var/run/docker.sock
      # 将 /home/dpanel 更改为你想要挂载的宿主机目录，容器内路径为 /dpanel
      - /home/dpanel:/dpanel
      # 可单独绑定面板容器内的 /dpanel/compose；宿主机路径由冒号前的源目录决定
      # - /opt/compose:/dpanel/compose
    extra_hosts:
      - "host.dpanel.local:host-gateway"
    logging:
      driver: "json-file"
      options:
        max-size: "5m"
        max-file: "10"
