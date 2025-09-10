# 证书管理 <Badge type="tip" text="DPanel Family == 标准版" />

![domain-cert-1.png](https://cdn.w7.cc/dpanel/domain-cert-1.png)

## 手动上传证书

手动上传证书需要添加证书文件和私钥文件，证书的有效期需要自行维护。

一般情况下证书文件是以 .crt 或 .pem 等为扩展名的文件，格式以 "-----BEGIN CERTIFICATE-----" 开头，以 "-----END CERTIFICATE-----" 结尾。

私钥文件则是以 .key 为扩展名的文件，格式以 "-----BEGIN PRIVATE KEY-----" 开头，以 "-----END PRIVATE KEY-----" 结尾。

## 申请免费证书

通过面板申请的免费证书会通过计划任务自行维护证书的有效期。

申请免费证书时，可同时申请多个域名。比如：dpanel.cc *.dpanel.cc 基本可以满足所有的子域名使用。\
也可以针对固定的子域名申请，比如 demo.dpanel.cc test.dpanel.cc。

### 域名验证

![domain-cert-2.png](https://cdn.w7.cc/dpanel/domain-cert-2.png)

申请域名证书的时候，会验证域名的所有权，面板提供了两种验证方式。

####  通过面板 Nginx 验证

通过 Nginx 方式验证，不需要添加额外的域名的验证解析，但是需要在申请时已经将域名解析到服务器 ip 上。

#### 通过域名 TXT 解析验证

在申请证书时，需要添加域名的 TXT 验证解析，通常是一串字符串。

面板同时也提供了一些常用的 DNS 服务的接口，可以自动化的完成添加验证记录操作。\
需要注意的是，如果在申请时添加验证记录失败，请重新尝试或是根据控制台输出信息手动添加。

对于面板未提供的 DNS Api 配置，可以通过【自定义】选项，自行参考 [acme 文档](https://github.com/acmesh-official/acme.sh/wiki/dnsapi) 添加接口权限变量数据。\
比如：服务商填写：dns_lua，并填加两个变量名分别为 LUA_Key, LUA_Email。