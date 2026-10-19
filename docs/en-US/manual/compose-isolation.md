# Data Isolation <Badge type="tip" text="DPanel Version >= 1.5.1" />

The panel supports multiple Docker server endpoints sharing compose task files.
After creating a compose task, this data can be deployed on each client.

It also supports configuring independent compose directories for any remote server endpoint for file data isolation.

### Enable Configuration

Enable independent directories through [multi-server management](/manual/system-env#enable-compose-path).
The directory is prefixed with `compose-` and ends with the current environment name.

For example: if the remote docker environment name is `test123`, the directory name is `compose-test123`. Its internal structure is consistent with the default compose directory.
