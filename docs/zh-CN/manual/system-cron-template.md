# 脚本模板

> 内置脚本：https://github.com/donknap/dpanel/tree/master/docker/script

用户自定义的脚本模板位于 `/dpanel/script` 目录中，该目录包含多个子目录，每个子目录表示一组脚本模板。

```
/dpanel/script
├─ /template-1                  # template-1 脚本组
│  ├─ /script-1
│  │  └─ data.yaml
│  ├─ /script-2
│  │  └─ data.yaml
│  ├─ /script-3
│  │  └─ data.yml
│  └─ ...
└─ ....
```

### 数据定义规范

```yaml
task:
  name: container-backup
  descriptionZh: |
    生成容器快照，支持备份容器配置存储，一键恢复。
  descriptionEn: |
    Create container snapshot
  script: |
    /app/server/dpanel container:backup -f /app/server/config.yaml --name=${CONTAINER_NAME} --enable-image ${ENABLE_IMAGE}
  tag:
    - dpanel
    - run-in-dpanel
  environment:
    - name: CONTAINER_NAME
      labelZh: 容器名称
      labelEn: container name
      required: true
    - name: ENABLE_IMAGE
      labelZh: 是否备份容器镜像
      required: true
      labelEn: backup container image
      type: select
      values:
        - label: 是
          value: "1"
        - label: 否
          value: "0"
```