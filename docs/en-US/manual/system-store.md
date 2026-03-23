# App Store <Badge type="tip" text="DPanel Version >= 1.3.0" />

### Add Third-Party App Store

> DPanel panel supports adding multiple app stores simultaneously

Create an app store through [System] - [App Store] - [Add Third-Party Store].
After creation, the [App Store] menu will be displayed in the [Compose] menu.

![compose-store-2](https://cdn.w7.cc/dpanel/compose-store-2.png?t=1)

![compose-store-3](https://cdn.w7.cc/dpanel/compose-store-4.png)

### Sync Remote Store Data

After adding an app store in the DPanel panel, the application data in the store will be saved offline to the panel container's `/dpanel/store` directory.
You can manually update the data in the remote repository to the local directory through the [Sync] function in the [App Store] list.

### Supported Types

As long as it complies with Docker Compose specifications, it can be integrated into DPanel's third-party app store.
Everyone is welcome to submit Issues to enrich the third-party app store. Currently, the following two types of stores are supported:

|Store Type|Example Address|Description|
|---|---|---|
|1panel|https://github.com/1Panel-dev/appstore|[Specification Description](https://github.com/1Panel-dev/appstore/wiki/%E5%A6%82%E4%BD%95%E6%8F%90%E4%BA%A4%E8%87%AA%E5%B7%B1%E6%83%B3%E8%A6%81%E7%9A%84%E5%BA%94%E7%94%A8)|
|1panel local|https://github.com/1Panel-dev/appstore|Allow creating stores that comply with 1panel app store locally|
|CasaOS|https://play.cuse.eu.org/Cp0204-AppStore-Play.zip|[Specification Description](https://awesome.casaos.io/content/3rd-party-app-stores/create-your-first-custom-appstore.html)|

### Search All Stores

When using multiple different app stores, it's inevitable that the same or similar applications will appear. DPanel panel provides a function to search all stores, making it easy to quickly find the applications you need.

### Self-Built Store

For some highly personalized applications, you can implement your own app store by adding a [1panel local] type store.
