---
next: false
aside: false
---

:::tip
View the complete update records, go to the repository [Release](https://github.com/donknap/dpanel/releases) page
:::

## v1.10.0

# Update Records \
Fix Container event trigger missing container information \
Fix Binary runtime unable to view Compose task directory \
Fix Websocket connection error did not kick out user data causing idling \
Fix Failed to apply for https certificate \
Fix Container snapshot restore IP address compatibility \
Fix Image list column configuration did not save state \
Fix When copying container, if image tag does not exist, use image hash \
Fix Editing add container capability did not take effect \
Fix Snapshot restore mount file restore failed \
Fix Update current docker configuration monitoring did not update data \
Fix When compiling container, switching from Host network to bridge network did not take effect \
 \
Optimize Compatible with Feinuo system \
Optimize When upgrading container, add default configuration in image \
Optimize Synchronize task directory files when deploying Compose on remote Docker environment \
Optimize Program response speed when customizing subdirectory \
Optimize Program package size and memory usage after packaging \
Optimize During certificate application, abort operation after closing floating window \
Optimize Standard Edition Nginx configuration, maximize fault tolerance, do not affect Nginx process startup \
Optimize Various data storage specifications in the panel \
Optimize Unify various data downloads in the panel \
Optimize Default connection method, using asynchronous form, does not affect normal program startup #275 \
Optimize Docker events are not stored in database, temporarily stored in memory. Prevent frequent database writes from causing data corruption risk \
Optimize Scheduled tasks first generate files then execute, multi-line scripts are more compatible \
Optimize Some display styles \
Optimize File management code and uninstall timing \
Optimize When updating container, maintain container's previous start or stop state \
Optimize Compatible with different configurations when snapshot restore \
 \
Add Comprehensively support buildkit driver when building images \
Add Avoid saving passwords and other key data in plain text in database, using rsa encryption (old data needs to be resubmitted) \
Add Remote Compose tasks can actively sync data \
Add When adding Compose tasks through Git, can select branch \
Add Panel's own usage statistics, backup, restore function \
Add Can view Nginx running logs and error logs in domain forwarding function \
Add Can extend Nginx configuration when configuring domain forwarding \
Add Update container can re-specify image \
Add Quick rebuild container function \
Add When main menu is on left, add keep expand/collapse configuration \
Add When configuring domain forwarding, can bind to non-80 443 ports \
Add After copying container, can choose not to start to avoid data pollution caused by same configuration \
Add Configure domain forwarding can be temporarily disabled without deleting configuration \
Add Import image supports oci standard format, multi-architecture platform images automatically only import current platform architecture \
Add Web shell add multi-tab \
Add When creating container, can specify not to start \
 \



## v1.9.3.1

Fix Running under Windows prompts certificate generation path is wrong \
Fix Under standard edition, https certificate generation failed #265  \
Fix Frontend interface did not hide text title after popup layer \
Fix File management has no upload, new and other buttons

## v1.9.3

Fix Complex scripts not supported in scheduled tasks \
Fix When using windows docker desktop, cannot use relative directory in Compose mount \
Fix When managing docker with ssh, error when deploying compose task \
Fix Edit container, failed to modify container name \
Fix When editing container, unable to clear configured running user \
Fix When building image using git method, specified dockerfile file and path but file not found during build #256 \
Fix When editing container, prompt cannot find image unable to get container data \
Fix Fix edit container health check error #257 \
Fix When creating compose, after copying Yaml data, environment variables are not automatically obtained \
Fix Compose edit yaml fullscreen invalid \
Fix Error calling dpanel control command in scheduled task \
Fix When adding same docker adress environment, cannot delete \
Fix Page shows Something went wrong error #259 \
Fix Add local localhost repository error, cannot use or pull \
Fix When editing container, error when configuring container ip for network without manually configured subnet \
Fix After creating container through Compose and adding domain forwarding, forwarding lost after updating compose \
Fix Compose task details page has no new file and other buttons \
 \
Optimize Unify table menu, operation menu is divided into three parts: right-click, inline in table row, top fixed follow. \
Optimize Container snapshot function, modify prompt text information. Support only backing up container configuration \
Optimize Control command other parameters, see https://dpanel.cc/install/ctrl \
Optimize Standard edition restart nginx, automatically detect whether current service is running to decide restart or reload \
Optimize When editing container, default fill with current container image address when pulling image \
Optimize When adding environment, can specify docker or podman type [#263](https://github.com/donknap/dpanel/issues/263) \
Optimize Makefile file, unify build parameters \
Optimize App store list shows resource count \
 \
Add Control command add notification command, configure email parameters in panel, can send email notification in script. \
Add Control command add simple cache data storage command, can achieve richer logic in scheduled task scripts \
Add Control command add clean system notification, events, force release memory \
Add Control command update container command, add --disable-bak parameter to not backup old container \
Add Recycle bin automatically clean data older than 15 days \
Add Add push progress when pushing image file \
Add Based on debian image dpanel/dpanel:latest-debian dpanel/dpanel:lite-debian

## v1.9.2

Fix Compose multi-environment did not share yaml file \
Fix Lite edition generates zombie processes \
Fix Edit container use default entrypoint data selection error, causing container error when editing \
Fix When editing container, recycle bin cannot restore after failure \
Fix When installing app with data using 1panel app store, missing environment variable parameters \
Fix Binary runtime docker server abnormal restart causes 100% usage \
Fix When adding docker server through ssh, may cause leak problem \
Fix [CVE-2025-66292](https://github.com/donknap/dpanel/commit/cbda0d90204e8212f2010774345c952e42069119%20%22fix%20CVE-2025-66292%22)  \
Fix When adding compose task by mounting file, did not read dpanel-override.yaml override file \
Fix Backup control command \
Fix Container forwarding ipv6 support \
Fix When installing dpanel panel through 1panel, environment variables are polluted \
Fix Cannot use relative directory when creating Compose in windows docker desktop #254 \
 \
Optimize Compatible with podman  \
Optimize Frontend list unify add right-click shortcut menu (continuous optimization) \
Optimize Create standard docker-compose.yaml file when creating compose through yaml \
Optimize Add progress display when pushing image \
Optimize Compatible with docker v29 some new features (continuous optimization) \
 \
Add Support Baota app store \
Add When installing app through app store, can quickly associate existing containers \
Add Docker environment global monitoring, real-time display of environment abnormalities \
Add Scheduled task manual trigger, container event (start, stop, create, destroy) trigger

## v1.9.1.3

Fix Statistics may cause infinite loop when there is no container data \
Fix Delete container created by command, recycle bin shows multiple entries \
Optimize Some startup cannot connect to default dockker #235 \
Optimize Customize secondary directory, standardize request address

## v1.9.1.2

Fix Multiple servers share Compose directory data details do not display Yaml content \
Fix After mounting directory Compose task modify yaml file name or extension, prompt file not found \
Fix Standard edition domain forwarding configuration forwarding http https error \
Fix Home page task data statistics error

## v1.9.1.1

Fix Standard edition apply certificate using Nginx method unsuccessful \
Fix Standard edition apply certificate or upload certificate list not display \
Fix Multiple servers share Compose directory data not displayed \
Fix View file list data in image error and directory not displayed \
Fix When pulling image, select repository invalid


## v1.9.1

Fix Home page usage statistics data occasionally disordered \
Fix Windows package exe program does not show version number \
Fix Panel settings prompt cannot find container error \
Fix Panel settings upgrade script does not show error \
Fix Windows connect remote ssh docker causes edge crash \
Fix Login page does not follow system dark style #220 \
Fix Multi docker server distinguish compose directory still prompt same name task \
Fix Compose list page title missing \
Fix Compose batch pull images last one shows empty error \
Fix Home page recycle bin value and connection error \
Fix Add app store error data.yml file not found \
Fix App store create some apps failed, did not initialize .env data \
 \
Optimize Compatible with windows platform file management \
Optimize When creating network, automatically complete gateway information #241 \
Optimize Automatically refresh display after getting usage information \
 \
Add Customize panel baseurl forwarding can configure secondary directory https://dpanel.cc/install/bind-domain \
Add Customize initialization docker timeout environment variable, avoid some platforms initialization too long causing unable to get information DP_SYSTEM_DOCKER_INIT_TIMEOUT \
Add Customize extended language pack https://dpanel.cc/install/i18n #242 \
Add Create compose task support import git repository

## v1.9.0

Fix Some environments use ssh root to manage remote docker client prompt permission denied #227 \
Fix Not completely clean up unused images \
Fix Containers using host network do not show ports in list \
Fix When editing container, health check configuration get error and modify error \
Fix Acme get certificate time error \
Fix When building image, cannot specify branch  \
Fix When editing container, configured network alias is empty #223 \
 \
Optimize Table batch operations, operation bar scrolls with table #224 \
Optimize Compose operation overall operation logic \
Optimize Compose remove deployed dpanel-c prefix \
Optimize Improve 1panel app store environment application support \
Optimize Container list multiple filter queries \
Optimize Image building \
Optimize Container recycle bin function, can quickly restore deleted containers \
Optimize Container creation method, unify using popup drawer form \
Optimize When batch updating containers, force pull image \
Optimize When unable to detect container update, do not prompt notification \
Optimize Image and container export, download directly through browser, avoid too large files freezing \
Optimize Home page and container details page container running status statistics information response speed \
 \
Add Container list, compose list, file management add right-click shortcut menu #200 \
Add Add group-add parameter when creating container \
Add Add compose task directory management function #221 \
Add Standard edition add php quick website building function (only supports Php environment created through app store) \
Add File manager add rename function #200



## v1.8.1.2

Fix Error when viewing home page and container \
Fix Error when viewing compose after adding server through ssh \
 \
Optimize Container list status color scheme \
Optimize Startup configuration, program integrates default config.yaml configuration, no need to explicitly specify -f config.yaml parameter at startup, environment variable description: https://dpanel.cc/install/params \
Optimize When starting program, judge storage directory and automatically create \
 \
Add When building image, can configure to push directly after completion


