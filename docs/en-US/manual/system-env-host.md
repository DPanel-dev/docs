# Host Management <Badge type="tip" text="DPanel Version >= 1.7.0" />

:::tip
Host management is enabled by default when managing remote Docker server endpoints through SSH.
:::

In **Multi-Server Management**, you can configure the current host's SSH permissions and operate the host's commands and files through the panel's web shell function.

## Configure Permissions

:::danger
When configuring the **local** environment **Host IP Address**, do not use `127.0.0.1` because this address represents the container itself.
:::

Configure the host's public address or LAN address. If you [Bind Host](/install/docker#bind-host) when creating the panel container,
You can use `host.dpanel.local` to access the host machine address.

## SSH and SFTP

After configuration is complete, you can connect to the host machine in the top **Console icon** or **Home** - **Host Management**.
