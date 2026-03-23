# Pull Images

Due to certain reasons, images may not be able to be pulled when deploying Compose tasks.

You can configure [Registry Management](/manual/image-proxy) and check [Use Panel to Pull Images] when deploying Compose.
Or after configuring daemon.json, check [Use Command to Pull Images] during deployment.

Note that these two configurations are not interconnected. When you configure an acceleration address in the panel, it will not take effect in the command, and vice versa.
When deploying, you need to choose whether to use the command or the panel to pull images based on the actual situation.

![compose-pull](https://cdn.w7.cc/dpanel/compose-env-2.png?a=3)
