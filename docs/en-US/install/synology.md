# Install on Synology DSM

To install or update DPanel, open **Package Center**, select **Manual Install**, and upload the `.spk` package for your NAS.

![Manual installation in Synology Package Center](https://cdn.w7.cc/dpanel/synology-1.png?t=1)

## Offline packages

- [amd64](https://github.com/donknap/dpanel/releases/latest/download/dpanel-amd64.spk)
- [arm64](https://github.com/donknap/dpanel/releases/latest/download/dpanel-arm64.spk)
- [More releases](https://github.com/donknap/dpanel/releases)

## Grant DPanel access to Docker

On DSM 7.4 and later, third-party packages cannot run as root. DPanel runs as a non-root user. After DPanel starts, sign in over SSH as an administrator and run this command to grant it access to the local Docker socket:

```sh
sudo sh -c 'chgrp dpanel /var/run/docker.sock && chmod 660 /var/run/docker.sock'
```

## Enable SSH on the NAS

![Enable the SSH service in DSM](https://cdn.w7.cc/dpanel/synology-2.png?t=1)

### Sign in over SSH and run the command

Use PowerShell on Windows or Terminal on macOS to connect to your NAS and run the command above.

![Connecting to DSM over SSH and granting Docker access](https://cdn.w7.cc/dpanel/synology-3.gif?t=1)

## Use the DSM reverse proxy

When installing DPanel, you can choose **Direct access** or **Reverse proxy**. Direct access makes the panel port reachable at the NAS IP address, so you can open `http://ip:port` directly.

For reverse proxy access, configure a reverse proxy rule in DSM. You cannot connect directly to the DPanel service port in this mode. Use the address configured under **Source** in the reverse proxy rule.

### Configure the reverse proxy

| Section | Setting |
| --- | --- |
| Source | Reverse proxy name: dpanel |
| - | Protocol: Select HTTPS if enabled; otherwise, select HTTP |
| - | Port: Set the external access port, for example, 5002 |
| Destination | Protocol: HTTP |
| - | Hostname: 127.0.0.1 |
| - | Port: The port configured during DPanel installation |
| Custom Header | Add WebSocket |
| Advanced Settings | Set the proxy read timeout to 3600 seconds |

![DSM reverse proxy settings](https://cdn.w7.cc/dpanel/synology-proxy-1.png?t=1)

![Additional DSM reverse proxy settings](https://cdn.w7.cc/dpanel/synology-proxy-2.png?t=1)

## Manage a Synology NAS as a remote host

Instead of installing the package, you can manage the NAS from an existing DPanel instance. Enable SSH on the NAS and grant the SSH account access to Docker before adding the host.

Sign in to the NAS over SSH. If the `dpanel` group does not exist, create it:

```sh
sudo synogroup --add dpanel
```

Assign the Docker socket to that group and add your SSH account to it:

```sh
sudo sh -c 'chgrp dpanel /var/run/docker.sock && chmod 660 /var/run/docker.sock'
sudo synogroup --memberadd dpanel "$(id -un)"
```

Sign out and reconnect so the group membership takes effect. Then add the NAS as an SSH host in [Multi-Server Management](../manual/system-env#ssh).
