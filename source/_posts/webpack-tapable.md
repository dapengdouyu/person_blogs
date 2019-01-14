---
title: webpack-tapable
copyright: true
date: 2019-01-14 14:50:58
tags: ['webpack','tapable']
---
## webpack的插件机制
webpack实现插件机制的大体方式是:
- **创建** - webpack在其内部对象上创建各种钩子；
- **注册** - 插件将自己的方法注册到对应钩子上，交给webpack；
- **调用** - webpack编译过程中，会适时地触发相应钩子，因此也就触发了插件的方法

## tapable
**Webpack**本质上是一种`事件流`的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是**Tapable**，**webpack**中最核心的负责`编译`的**Compiler**和负责`创建`**bundle**的**Compilation**都是Tapable的实例


## tapable用法
```js
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } = require("tapable");
```
![tapable (1)-2019114145412](http://b.zhangyapeng.club/tapable%20(1)-2019114145412.png)

看起来起来功能和 `EventEmit` 类似，先注册事件，然后触发事件。不过 `Tapable` 的功能要比 `EventEmit` 强大。从官方介绍中，可以看到 `Tapable` 提供了很多类型的 `Hook`，分为`同步`和`异步`两个大类(异步中又区分异步`并行`和异步`串行`)，而根据事件执行的终止条件的不同，由衍生出 `Bail`/`Waterfall`/`Loop` 类型。

![167f458ac2b1e527-2019114145946](http://b.zhangyapeng.club/167f458ac2b1e527-2019114145946.webp)
