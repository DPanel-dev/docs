# Custom DPanel Image

Based on the image of DPanel, add your own runtime environment or scripts. Define the Dockerfile as follows:

### Standard Version Edition

```
FROM dpanel/dpanel:latest

# Add or copy scripts or files
# COPY source target
# Install the package using apk add

RUN apk add python3

# Run other scripts via RUN

RUN ls -al

ENTRYPOINT [ "/docker/entrypoint.sh" ]

```

### Lite Version Edition

```
FROM dpanel/dpanel:lite

# Add or copy scripts or files
# COPY source target
# Install the package using apk add

RUN apk add python3

# Run other scripts via RUN

RUN ls -al

ENTRYPOINT [ "sh", "-c", "/app/server/dpanel server:start -f /app/server/config.yaml" ]

```