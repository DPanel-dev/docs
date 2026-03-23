# Migrate Panel <Badge type="tip" text="DPanel Version >= 1.9.4" />

Through the panel's [System] - [Panel Settings] - [Usage & Backup] function, you can backup, restore, and migrate panel data.

## Backup Panel Data

:::warning
Backup data does not include the panel's own backup data.
:::

When backing up DPanel panel data, you can choose directories or perform a full data backup as needed. Backup data is stored in the **[Storage Directory]/backup/dpanel** directory.

Through scheduled tasks combined with [Backup Control Commands](/install/ctrl), you can achieve scheduled backup of panel data.

## Restore Panel Data

After uploading the panel's backup data package, you can restore it from the list. If the backup package is too large, you can manually upload it to the **[Storage Directory]/backup/dpanel** directory via SFTP.
