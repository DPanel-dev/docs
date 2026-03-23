# Certificate Management <Badge type="tip" text="DPanel Family == Standard Edition" />

## Manually Upload Certificate

When manually uploading a certificate, you need to add a certificate file and a private key file. You must maintain the certificate's validity period yourself.

Generally, the certificate file is a file with an extension such as `.crt` or `.pem`, formatted with `-----BEGIN CERTIFICATE-----` at the beginning and `-----END CERTIFICATE-----` at the end.

The private key file is a file with a `.key` extension, formatted with `-----BEGIN PRIVATE KEY-----` at the beginning and `-----END PRIVATE KEY-----` at the end.

## Apply for Free Certificate

Free certificates applied for through the panel will automatically maintain the certificate's validity period through scheduled tasks.

When applying for a free certificate, you can apply for multiple domains at the same time, for example: `dpanel.cc`, `*.dpanel.cc` can basically meet all subdomain usage.
You can also apply for specific subdomains, for example `demo.dpanel.cc`, `test.dpanel.cc`.

### Domain Verification

When applying for a domain certificate, domain ownership will be verified. The panel provides two verification methods.

#### Verify Through Panel Nginx

Verification through Nginx does not require adding additional domain verification resolution, but the domain must be resolved to the server IP when applying.

#### Verify Through Domain TXT Resolution

When applying for a certificate, you need to add the domain's TXT verification resolution, usually a string.

The panel also provides interfaces for some commonly used DNS services, which can automatically complete the operation of adding verification records.
Note that if adding verification records fails during application, please try again or add manually according to the console output information.

For DNS API configurations not provided by the panel, you can add interface permission variable data yourself by referring to the [acme documentation](https://github.com/acmesh-official/acme.sh/wiki/dnsapi) through the [Custom] option.
For example: fill in `dns_lua` for the service provider, and add two variables named `LUA_Key` and `LUA_Email`.
