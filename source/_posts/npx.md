---
title: npx:一个npm包执行器
date: 2018-05-25 16:52:45
tags: ['node','npx']
---
最近小编在使用node的时候，发现了一个神器---npx,它只有在npm 5.2.0才有的欧

### npx是什么？
根据[zkat/npx](https://github.com/zkat/npx)的描述,你就会发现它的神奇之处,npx可以帮你执行依赖包里面的二进制文件。

#### 举个栗子：
- 举例来说，之前我们可能会写这样的命令：

```Bash
npm i -D webpack
./node_modules/.bin/webpack -v
```
如果你对 bash 比较熟，可能会写成这样
```
npm i -D webpack
`npm bin`/webpack -v
```
有了 npx，你只需要这样
```
npm i -D webpack
npx webpack -v
```
也就是说 npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！

#### npx 甚至支持运行远程仓库的可执行文件，如
```Bash
npx github:piuccio/cowsay hello
npx: 1 安装成功，用时 1.663 秒
 _______
< hello >
 -------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
### 再比如 npx http-server 可以一句话帮你开启一个静态服务器！（第一次运行会稍微慢一些）
npx 还允许我们单次执行命令而不需要安装；在某些场景下有可能我们安装了某个全局命令行工具之后一直忘了更新，导致以后使用的时候误用了老版本。而使用 npx create-react-app my-cool-new-app 来执行 create-react-app 命令时，它会正常地帮我们创建 React 应用而不会实际安装 create-react-app 命令行。
```
$ npx http-server
npx: 23 安装成功，用时 48.633 秒
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:8080
  http://192.168.5.14:8080
Hit CTRL-C to stop the server
```
