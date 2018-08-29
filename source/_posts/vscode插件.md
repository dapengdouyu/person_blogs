---
title: vscode插件
date: 2018-08-29 14:54:02
tags: ['vscode','vscode插件']
---
## Visual Studio Code 设置同步到github的插件介绍及使用方法(Settings Sync)
今天要说的就是这个插件`Settings Sync`,一个可以在github上面通过`gist仓库`来同步用户的vscode的**配置**包括`插件`,`settings`等信息的好插件

## 为什么需要`Settings Sync`
一开始不知道怎么`备份vscode`的配置,傻乎乎的把要用的插件抄下来,还有用户settings拷贝出来.每次换了电脑或者重装系统什么的都要重新备份.虽然来回调整的概率很低,但是突然哪天需要同步设置什么的就很麻烦了~至少我是在初期经常鼓捣这个编辑器,而且办公在家和公司是不同的设备~所以觉得还是很有必要的~

1. **安装**插件并**重启VSCODE**就不用说了(`安装VSCODE Settings Sync后重新加载`)
![安装VSCODE Settings Sync后重新加载](00-400x264.png)

2. 重启后按快捷键 **alt+shift+u** (这里假设你第一次用)
    - 它会弹出一个窗口对应的是github上面的创建个人gist的页面,如果未登录请先登录github.(`github创建gist来存储设置`)
![github创建gist来存储设置](01-400x445.png)
    - 保存后会生成一个key(`请牢记token id,后面将会用到`)
![请牢记token id,后面将会用到](02-400x189.png)
3. 切回到vscode,他会有个输入区,就是存放刚才生成的key(`输入刚才生成的key`)
![输入刚才生成的key](03-400x75.png)

4. 然后理论上他就开始对你`本机的配置`进行一个`扫描上传`了.至此上传工作完成.

5. 接下来我们到另一台电脑上了`下载配置`.同样的`先安装Settings Sync插件`,并重新加载.

6. 然后按快捷键**alt+shift+d**,就应该会弹出一个输入框,请在这里输入`之前`保存下来的`key(GIST ID)`,回车后将会自动下载之前上传的配置.

7. 那么下载完成后,你这台电脑修改了相关配置再次上传就好了.是不是感觉方便多了~

8. 其他的说明,如果在输入`gist id写错`了,读取不到的情况下,大概需要`重置设置`,按`F1`,输入`sync`,这里有重置选项.试试看~ (`重置sync的gist配置信息等`)
![重置sync的gist配置信息等](04.png)

9. 如果忘记token可以到一下地址查看token
    - Win下：`C:\Users\Administrator\AppData\Roaming\Code\User`
    - Mac下：`~/Library/Application Support/Code/User/syncLocalSettings.json`
    - Linux下：`~/.config/Code/User/syncLocalSettings.json`
进入目录后，找到 `syncLocalSettings.json `这个文件，`查找token`，并替换后面复制的值，就可以顺利进行同步配置信息了。

还有些其他的功能例如`自动上传下载`等等,不是很常用,大家可以自行看看官方文档,基本的使用方法就是这样了,我写的如果有问题或者哪里不明白的可以留言- -.


-----
插件地址：
[https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)

