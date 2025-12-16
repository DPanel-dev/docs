  dpanel:
    # For Lite Edition, Use dpanel/dpanel:lite
    image: dpanel/dpanel:latest 
    # Modify container name, Update the APP_NAME environment variable.
    container_name: dpanel 
    restart: always
    ports:
      # Using the Lite Edition, remove the configurations for ports 80 and 443.
      - 80:80
      - 443:443
      # Modify 8807 to change DPanel access port.
      - 8807:8080
    environment:
      # APP_NAME must be the same as container_name.
      - APP_NAME=dpanel
      - HTTP_PROXY= 
      - HTTPS_PROXY= 
      # Configure the secondary directory for DPanel access.
      - DP_SYSTEM_BASEURL=
    volumes:
      # For Windows and macOS, change the part before the colon to //var/run/docker.sock
      - /var/run/docker.sock:/var/run/docker.sock
      # Change `/home/dpanel` to the host directory you want to mount.
      - /home/dpanel:/dpanel
      # Mount the compose directory.
      # - /opt/compose:/dpanel/compose
    extra_hosts:
      - "host.dpanel.local:host-gateway"
    logging:
      driver: "json-file"
      options:
        max-size: "5m"
        max-file: "10"