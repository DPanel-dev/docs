# 应用商店 <Badge type="tip" text="DPanel Version >= 1.3.0" />

### 添加第三方应用商店

> DPanel 面板支持同时添加多个应用商店

通过【系统】-【应用商店】-【添加第三方商店】创建应用商店。
创建完成后，会在【Compose】菜单中显示【应用商店】菜单。

![compose-store-2](https://cdn.w7.cc/dpanel/compose-store-2.png?t=1)

![compose-store-3](https://cdn.w7.cc/dpanel/compose-store-4.png)

### 同步远程商店数据

在 DPanel 面板中添加应用商店后，会将商店中的应用数据离线保存至面板容器的 `/dpanel/store` 目录中。
可通过【应用商店】列表中的【同步】功能，手动将远程仓库中的数据更新至本地目录。

### 支持类型

只要符合 Docker Compose 的规范，都可以接入 DPanel 的第三方应用商店中。
欢迎大家提交 Issue 丰富第三方应用商店，目前支持以下两种规范的商店：

|商店类型|示例地址|说明|
|---|---|---|
|1panel|https://github.com/1Panel-dev/appstore|[规范说明](https://github.com/1Panel-dev/appstore/wiki/%E5%A6%82%E4%BD%95%E6%8F%90%E4%BA%A4%E8%87%AA%E5%B7%B1%E6%83%B3%E8%A6%81%E7%9A%84%E5%BA%94%E7%94%A8)|
|1panel 本地|https://github.com/1Panel-dev/appstore|允许在本地创建符合 1panel 应用商店的商店|
|CasaOS|https://play.cuse.eu.org/Cp0204-AppStore-Play.zip|[规范说明](https://awesome.casaos.io/content/3rd-party-app-stores/create-your-first-custom-appstore.html)|

### 全商店搜索

在多个不同的应用商店中，难免会出现相同或相似的应用。DPanel 面板提供了检索所有商店的功能，方便快速查找所需的应用。

### 自建商店

对于一些高度个性化的应用，可通过添加【1panel 本地】类型的商店实现自己的应用商店。