# 安全入口 <Badge type="tip" text="DPanel Version >= 1.10.7" />

:::warning
安全入口仅是避免直接暴露后台的一种手段，不能替代管理员密码和 HTTPS。面板的整体安全需要多方面措施共同保障。
:::

安全入口是面板登录页之外的一层访问路径。开启后，必须先访问配置的安全入口，才能正常打开登录页并进入系统。

例如面板地址为 `http://192.168.1.10:8086`，安全入口设置为 `dpanel-login-8f3k2a`，访问面板时应先打开：

```text
http://192.168.1.10:8086/dpanel-login-8f3k2a
```

## 配置安全入口

### 安装时配置

:::tip
使用安装器首次安装面板时，可在 `TUI` 或是 `CLI` 中开启并配置安全入口
:::

安全入口通过启动时的环境变量 `DP_SYSTEM_ENTRANCE` 配置。设置为入口路径即可开启，例如：

```dotenv
DP_SYSTEM_ENTRANCE=dpanel-login-8f3k2a
```

### 系统中配置

如果你在安装时未指定 `DP_SYSTEM_ENTRANCE` 环境变量，也可以在系统中通过【系统】->【面板设置】->【用户登录配置】开启并配置安全入口。

系统中的配置可以覆盖安装或启动时的配置，也可以直接关闭安全入口。

## 查看和重置

忘记入口或无法进入面板时，执行 [`system:info`](/install/ctrl#system:info) 查看当前生效的入口：

```shell
./dpanel -f config.yaml system:info
```

使用 `system:reset` 可以生成随机入口、设置自定义入口或关闭安全入口：

```shell
./dpanel -f config.yaml system:reset --entrance
./dpanel -f config.yaml system:reset --entrance=secure-path
./dpanel -f config.yaml system:reset --entrance=none
```

容器安装和其他控制命令的调用方式请参考[面板控制命令](/install/ctrl)。
