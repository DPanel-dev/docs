# Environment Variables

Environment variables in compose.yaml files are divided into two types: environment variables used in the compose.yaml file itself, or environment variables used in containers.
You can dynamically control any configuration in the yaml file through the **Environment Variables** feature, for example:

:::code-group
```yaml [Example]
services:
  nginx1:
    image: nginx:${IMAGE_VERSION}
    environment:
      PASSWORD: ${NGINX1_PASSWORD}
      USERNAME:
  nginx2:
    image: nginx:latest
    environment:
      PASSWORD: ${NGINX2_PASSWORD}
      USERNAME:
```
:::


When used for the compose.yaml file, specify the nginx1 service's image tag through `${IMAGE_VERSION}` during deployment.
When used for containers, pass through to the container interior via `${NGINX1_PASSWORD}` and `${NGINX2_PASSWORD}`.

## Define Environment Variables in .env File

Create a new .env file to assign values to environment variables:

```shell
IMAGE_VERSION=latest
NGINX1_PASSWORD=789456
NGINX2_PASSWORD=123456
USERNAME=admin
```

### Multiple Services with Same Environment Variable Name

In the example above, both services use the `${USERNAME}` environment variable. At this point, the value defined in the .env file will affect both services simultaneously.
If you want to specify them separately, you need to use the password configuration approach in the example, configuring another environment variable for each environment variable.

## How to Define in the Panel?

When creating a compose task, the panel will automatically find environment variables in the yaml and generate a list.
When creating the task, you can configure values for these environment variables.

If you add a compose task through **mount directory**, the panel will look for the .env file in the same directory and display environment variables.
The panel will perform two-way synchronization of environment variables in the .env file. No matter where you edit, it will update to the .env file or task details.

