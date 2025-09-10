# 管理非面板创建任务

对于非面板创建的 compose 项目，通过 DPanel 面板进行管理时，你需要保证面板可以访问到相关的 compose.yaml 文件。

你可以通过挂载单个 yaml 文件或是将整个 compose 目录挂载到面板容器中。

:::tip
将整个目录挂载到面板容器中需要符合面板的目录规范，具体可以查看[通过挂载存储路径的方式创建](/manual/compose-create#mount)。
:::

## 挂载单个 Yaml

### 查找 compose 任务使用的 yaml 文件


```sehll
docker compose ls --filter name=my-compose
```

:::details 结果
```
NAME                STATUS              CONFIG FILES
my-compose          running(1)          /home/compose.yaml
```
:::


### 挂载该文件到面板容器中

将 CONFIG FILES 中的 yaml 文件挂载到面板容器中，并保持路径相同，面板即可管理该 compose 项目。

```js
docker run -d -it --name dpanel ...(省略其它参数)... \
-v /home/compose.yaml:/home/compose.yaml \   // [!code focus] 
dpanel/dpanel:latest
```

## 在面板 compose 目录中新增外部任务 yaml

在面板的 /dpanel/compose 目录中新建外部任务目录及 yaml 文件。新建目录时一定要注意要保持与外部任务名称统一。

```
/dpanel
├─ /compose
│  ├─ /my-compose   
│  │  └─ compose.yaml  # yaml 文件名只支持 compose.yaml docker-composes.yaml 
│  └─ ... 
└─ ....
```

## 删除外部任务

外部任务的 yaml 并非由面板管理，所以在删除外部任务时等同于删除该 compose 下的所有容器。
对于残余的 yaml 文件，需要手动进行删除。