# Bind Host Network

After container creation, it can be accessed through [Host's LAN IP] or [127.0.0.1] plus port.

In Docker, you can also configure macvlan or ipvlan for containers to allocate a host network IP for access.

### Enable Network Card Promiscuous Mode

##### Find the host's network card name

```shell
ifconfig
```

After executing the command, find the network card data that configures the host's IP, similar to the following data. Here `enp1s0` is the host's network card name.
In most Linux systems, the host's network card name is `eth0`.

```
enp1s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.16.1.124  netmask 255.255.255.0  broadcast 172.16.1.255
        inet6 fe80::b62e:99ff:fe6a:8e70  prefixlen 64  scopeid 0x20<link>
        ether b4:2e:99:6a:8e:70  txqueuelen 1000  (Ethernet)
        RX packets 295362  bytes 192208893 (192.2 MB)
        RX errors 0  dropped 351  overruns 0  frame 0
        TX packets 193183  bytes 148448289 (148.4 MB)
        TX errors 0  dropped 0  overruns 0  carrier 0  collisions 0
```

##### Enable Promiscuous Mode

```shell
sudo ip link set dev enp1s0 promisc on
```

### Create macvlan or ipvlan Network

Create a macvlan or ipvlan type network through [Storage & Network] - [Network Management] - [Create Network].

- The parent network card is specified as the host's network card name, in this example it is `enp1s0`.
- The subnet is configured as the host's subnet.

#### Subnet

Taking `192.168.0.0` as an example:

When using `192.168.0.0/16`, it means your netmask is `255.255.0.0`, and the available IP range is `192.168.0.1` to `192.168.255.254`.
When using `192.168.0.0/24`, it means your netmask is `255.255.255.0`, and the available IP range is `192.168.0.1` to `192.168.0.254`.

In this example, the host's IP is `172.16.1.124`, and the netmask is `255.255.255.0`, so the subnet should be configured as `172.16.1.0/24`.

Specific configuration should be decided according to the actual situation.


### Add Network for New Container

After creating a new container, add the container to the network just created through [Container Association Information] - [Join Existing Network] and specify an IP on the same network segment as the host.
The container can then be accessed through the specified IP.

Note that through this method, the container no longer needs to expose internal ports.

### Host Access Container

Through the above method, hosts in the LAN can already access container internal ports through custom IPs.
But the host cannot normally request.

The host still needs to use the container's IP in the bridge network to request.
Or add a virtual network card on the host for routing:

```shell
sudo ip link add docker-bridge link enp1s0 type macvlan mode bridge
sudo ip link set docker-bridge up
sudo ip route add 172.16.1.205 dev docker-bridge
```
