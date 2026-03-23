# Create Image Through Dockerfile

:::warning
Dockerfile does not support using COPY or ADD to add external files. If you need to add files, please use [Zip or Git](/manual/image-create-zip) for building.
:::

You can quickly build custom images through a single Dockerfile file. Example:

```yaml
FROM nginx:1.27
RUN echo '<html><body><h1>Hello, DPanel!</h1></body></html>' > /usr/share/nginx/html/index.html
```

## Result

Create a container and map port 80, accessing it will display "Hello, DPanel!"
