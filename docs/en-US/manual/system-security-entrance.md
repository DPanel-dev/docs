# Secure Entrance <Badge type="tip" text="DPanel Version >= 1.10.7" />

:::warning
The secure entrance is only one way to avoid exposing the backend directly. It does not replace the administrator password or HTTPS. Overall panel security requires multiple measures.
:::

The secure entrance is an additional access path in front of the panel sign-in page. When enabled, you must first access the configured secure entrance to open the sign-in page and enter the system normally.

For example, if the panel address is `http://192.168.1.10:8086` and the secure entrance is set to `dpanel-login-8f3k2a`, open this URL first:

```text
http://192.168.1.10:8086/dpanel-login-8f3k2a
```

## Configure the Secure Entrance

### Configure During Installation

:::tip
When installing the panel for the first time with the installer, you can enable and configure the secure entrance in the `TUI` or `CLI`.
:::

The secure entrance is configured through the `DP_SYSTEM_ENTRANCE` environment variable at startup. Set it to an entrance path to enable the secure entrance, for example:

```dotenv
DP_SYSTEM_ENTRANCE=dpanel-login-8f3k2a
```

### Configure in the System

If you did not specify the `DP_SYSTEM_ENTRANCE` environment variable during installation, you can also enable and configure the secure entrance in **System -> Panel Settings -> User Login Configuration**.

The system configuration can override the configuration set during installation or at startup, and can also disable the secure entrance.

## View and Reset

If you forget the entrance or cannot access the panel, run [`system:info`](/install/ctrl#system:info) to view the effective entrance:

```shell
./dpanel -f config.yaml system:info
```

Use `system:reset` to generate a random entrance, set a custom entrance, or disable the secure entrance:

```shell
./dpanel -f config.yaml system:reset --entrance
./dpanel -f config.yaml system:reset --entrance=secure-path
./dpanel -f config.yaml system:reset --entrance=none
```

For how to invoke commands in a container installation and for other control commands, see [Panel Control Commands](/install/ctrl).
