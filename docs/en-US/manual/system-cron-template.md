# Script Template

> Built-in scripts: https://github.com/donknap/dpanel/tree/master/docker/script

User-defined script templates are located in the `/dpanel/script` directory, which contains multiple subdirectories. Each subdirectory represents a group of script templates.

```
/dpanel/script
├─ /template-1                  # template-1 script group
│  ├─ /script-1
│  │  └─ data.yaml
│  ├─ /script-2
│  │  └─ data.yaml
│  ├─ /script-3
│  │  └─ data.yml
│  └─ ...
└─ ....
```

### Data Definition Specification

```yaml
task:
  name: container-backup
  descriptionZh: |
    u751f-u6210-u5bb9-u5668-u5feb-u7167uff0c-u652fu6301-u5907-u4efd-u5bb9-u5668-u914du7f6eu5b58-u50a8uff0c-u4e00-u952e-u6062-u590du3002
  descriptionEn: |
    Create container snapshot
  script: |
    /app/server/dpanel container:backup -f /app/server/config.yaml --name=${CONTAINER_NAME} --enable-image ${ENABLE_IMAGE}
  tag:
    - dpanel
    - run-in-dpanel
  environment:
    - name: CONTAINER_NAME
      labelZh: u5bb9-u5668-u540du79f0
      labelEn: container name
      required: true
    - name: ENABLE_IMAGE
      labelZh: u662fu5426u5907u4efdu5bb9u5668u955cu50cf
      required: true
      labelEn: backup container image
      type: select
      values:
        - label: u662f
          value: "1"
        - label: u5426
          value: "0"
```
