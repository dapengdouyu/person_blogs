---
title: nodemon
date: 2018-05-21 11:23:38
tags: ['nodemon','node']
---
## nodemon的配置详解
### nodemon 安装配置
平常我们使用node的时候，经常修改一次js代码后，都要重新node xxx 才能看到改动后的效果，调试起来十分不方便。所以我引入了nodemon模块了弥补这样缺点。

- 首先安装nodemon
```Bash
npm i -g nodemon
```
- 安装完 nodemon 后，就可以用 nodemon 来代替 node 来启动应用：
```Bash
nodemon [your node app]（相当于 node [your node app]）
```
- 还可以来指定端口号
```Bash
nodemon ./server.js localhost 8080
```
- 可以通过帮助选项
```Bash
nodemon -h 或者 nodemon -help
```
有没有感觉好麻烦呀，但是nodemon大火的原因是它的灵活配置，让我们通过`nodemon.json`文件来了解它的其他参数。
### nodemon基本配置
```json
{
    "restartable": "rs",
    "ignore": [
        ".git",
        "node_modules/**/node_modules"
    ],
    "verbose": true,
    "execMap": {
        "": "node"
        "js": "node --harmony"
    },
    "events": {
        "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
    },
    "watch": [
        "test/fixtures/",
        "test/samples/"
    ],
    "env": {
        "NODE_ENV": "development",
        "PORT": "3000"
    },
    "ext": "js json",
    "legacy-watch": false
}
```
### nodemon参数详解
- **restartable**:重启命令,默认是rs,可以改成你自己喜欢的字符串。当用nodemon启动应用的时,可以直接键入rs直接重启服务。除了字符串值外，还可以设置fasle,这个值的意思是当nodemon影响你自己的终端命令时，设置为false则不会在nodemon运行期间监听rs的重启命令。
- **ignore**: 忽略的文件后缀名或者文件夹
- **verbose**：true表示输出详细启动与重启信息
- **execMap**: 运行服务的后缀名和对应的运行命令,"js": "node --harmony" 表示用 nodemon 代替 node  --harmony 运行 js 后缀文件;"" 指 www 这些没有后缀名的文件;默认的 defaults.js 配置文件会识别一些文件：py:'python',rb:'ruby'。
- **events**:这个字段表示 `nodemon` 运行到某些状态时的一些触发事件，总共有五个状态：
    - start - 子进程（即监控的应用）启动

    - crash - 子进程崩溃，不会触发 exit

    - exit - 子进程完全退出，不是非正常的崩溃

    - restart - 子进程重启

    - config:update - nodemon 的 config 文件改变
- **watch**:监控的文件夹路径或者文件路径。
- **env**:运行环境 development 是开发环境，production 是生产环境。port 是端口号。
- **ext**:监控指定后缀名的文件，用空格间隔
- **legacy-watch**:nodemon 使用`Chokidar`作为底层监控系统，但是如果监控失效，或者提示没有需要监控的文件时，就需要使用轮询模式（polling mode），即设置 legacy-watch 为 true。
### nodemon监控和忽略文件的顺序
1. 首先 nodemon 会先读取**watch**里面需要监控的文件或文件路径，
2. 从文件中选择监控**ext**中指定的后缀名，
3. 最后去掉从**ignore**中指定的忽略文件或文件路径。

### 参考文档：
[http://www.cnblogs.com/JuFoFu/p/5140302.html](http://www.cnblogs.com/JuFoFu/p/5140302.html)







