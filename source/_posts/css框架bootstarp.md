---
title: css框架bootstarp
date: 2018-07-06 14:02:10
tags: ['前端基础','css','bootstrap']
---
### 什么是bootstrap?
- 一个css框架
- twitter出品
- 提供通用基础样式

### Bootstrap 4
- 兼容IE10+
- 使用flexbox布局
- 抛弃Nomalize.css
- `提供布局`和`reboot版本`

### Bootstrap主要做什么？
- 基础样式
- 常用组件
- js插件

### Bootstrap js组件
- 用于组件交互
- dropdown(下拉)
- modle(弹框)
- ...
- 基于jQuery
- poper.js
- bootstrap.js

#### 使用方式：
- 基于`data-*`属性
- 基于`js-api`

### bootstrap响应式布局
bootstrap在不同的分辨率下有不同的分配
![响应式](响应式.png)

### bootstrap的优缺点
- **优点：**css代码结构合理 现成的样式可以直接用
- **缺点：**定制较为繁琐 体积大

### boostrap如何实现响应式布局
- **原理：**通过media query设置不同分辨率的class
- **使用：**为不同分辨率选择不同的网格class


### bootstrap 定制方法
- 使用`css同名类`覆盖
- 修改`源码`重新构建
- 引用`scss源文件` --> 修改变量 (可以按需加载,对bootstrap的结构要了解)
