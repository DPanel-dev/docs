# 使用 Docker In Docker 安装

使用 Docker In Docker 的方式可以创建一个与外部完全隔离的 Docker 环境。

<!--@include: ../include/image.md-->

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
