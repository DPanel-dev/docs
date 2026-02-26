# 迁移面板 <Badge type="tip" text="DPanel Version >= 1.9.4" />

通过面板的「系统」-「面板设置」-「用量与备份」功能可以实现备份、恢复、迁移面板数据。

![system-dpanel-migrate-1.png](https://cdn.w7.cc/dpanel/system-dpanel-migrate-1.png)

## 备份面板数据

:::warning
备份数据中不包含面板自身的备份数据
:::

备份 DPanel 面板数据时，可以根据需要选择目录或是进行全量的数据备份。备份数据存储在 **[存储目录]/backup/dpanel** 目录中。

通过任务计划结合「[备份控制命令](/install/ctrl)」，可以实现定时备份面板数据。

## 恢复面板数据

上传面板的备份数据包后，可以列表中进行恢复。如果备份包过大，可以通过 SFTP 手动上传至  **[存储目录]/backup/dpanel** 目录中。