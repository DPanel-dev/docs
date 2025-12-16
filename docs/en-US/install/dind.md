# Docker In Docker

The Docker In Docker approach allows running a new Docker server in a container that is isolated from the outside world.

## Compose Yaml

```yaml
services:
<!--@include: ../include/yaml.md-->
    depends_on:
      - docker
  docker:
    image: docker:dind
    environment:
      DOCKER_TLS_CERTDIR: ""
    privileged: true
```