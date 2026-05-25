---
next: false
aside: false
---

# Pro Edition

### Preface

DPanel will continue to be a community-focused platform. The Pro and Community versions are not in conflict with each other; rather, they contribute to the community and ensure the long-term viability of the project.

The Pro version is a derivative of the Community version, sharing most of the code. The Professional version builds upon the Community version, developing customized functional modules (the code is located in the app/pro directory). You don't need to worry about security vulnerabilities caused by invisible code.

The Pro version merely enhances and supplements the Community version. Common, broadly based functional requirements will not be included in the Pro version. We will only enhance and upgrade some of the Community version's features, or address highly customized needs.

Thank you for your support and love.

### Purchase Notice

- The Pro edition is fully compatible with the Community edition; the difference lies in the use of different images. After purchasing the Pro edition, simply place the license file in the /dpanel directory of the panel and rebuild the panel container using the Pro edition image.
- The Pro edition version number will remain synchronized with the Community edition. The release of a new version does not necessarily mean that the Pro edition has new features.
- During the Pro edition license period, you can use the features and upgrade the version an unlimited number of times.
- The Pro edition license certificate supports offline use, but please ensure that you do not redistribute or share it. Otherwise, your rights will be forfeited and no refund will be given.

### Pricing and Features

:::tip Pro edition is 99 RMB/year. [Support and Purchase](https://afdian.com/item/56df0a88d6dd11efa8bc5254001e7c00)
:::

<div class="feature-wrap">
  <table>
    <thead>
      <tr>
        <th width="75%" >Feature</th>
        <th>Community</th>
        <th>Professional</th>
        <th>Enterprise</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Container Basic Management</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Container Copy, Commit image, Export</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Container Check upgrade, Quick upgrade</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Container Snapshot backup, recovery, migration</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Container Tag group</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Container Domain proxy, Https cert</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Container Cron, Cron script template</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Compose Basic Management</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
       <tr>
        <td>Compose AppStore，Support 1panel、casaos and local protocols</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Image Basic Management</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Image Build Support import、Dockerfile、zip、git</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Image registry</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Image proxy</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Multiple Docker servers, support docker api and ssh</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Host SSH and SFTP </td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Theme</td>
        <td>✅</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Container Import snapshot file</td>
        <td> - </td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Image remote tags，View image rootfs</td>
        <td>-</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Container rollback</td>
        <td> - </td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Container home shortcut</td>
        <td> - </td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Check upgrade with cron</td>
        <td> - </td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Theme </td>
        <td>-</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Theme console </td>
        <td>-</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>Login 2FA</td>
        <td>-</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>User Management</td>
        <td>-</td>
        <td>-</td>
        <td>✅</td>
      </tr>
    </tbody>
  </table>
</div>


### Install

:::code-group

```shell [标准版镜像]
dpanel/dpanel-pe:lite
```

```shell [Lite版镜像]
dpanel/dpanel-pe:lite
```

```shell [阿里云标准版镜像]
registry.cn-hangzhou.aliyuncs.com/dpanel/dpanel-pe:latest
```

```shell [阿里云Lite版镜像]
registry.cn-hangzhou.aliyuncs.com/dpanel/dpanel-pe:lite
```
:::

The installation method is the same as the community edition, the difference is the image. [Install with Docker](/install/docker) or [Install Script](/install/shell) to install it.

### Get License Code File

To generate a License file, you'll need to provide the panel's Code file. Download the Code file from the Home - Overview page.

Add the License file (dpanel.lic) to the DPanel mount directory.


### Preview

#### Theme

![pro-1](https://cdn.w7.cc/dpanel/pro-1.png)

#### Panel Info

![pro-1](https://cdn.w7.cc/dpanel/pro-4.png)

#### Image remote tag

![pro-3](https://cdn.w7.cc/dpanel/pro-3.png)