---
title: 框架中的css
date: 2018-07-06 16:23:39
tags: ['前端基础','css','框架中的css']
---
- Angular Vue React 三大框架
- Angular Vue 内置样式集成
- React 一些业界实践

## Angular
- Angular.js(1.x)
    - 没有样式集成能力
- Angular (2+)
    - 提供了样式封装能力
    - 与组件深度集成

### ShadowDOM 
- 逻辑上一个DOM
- 结构上存在子集结构
![video](video.jpg)
![开启shadow](开启shadowDom.png)

### Scoped css
- 限定了范围的css
- 无法影响外部元素
- 外部样式一般不影响内部
- 可以通过`/deep/`或`>>>`穿透

### 模拟scoped css (兼容性差)
- 方案1：随机选择器(不支持)
- 方案2：随机属性
    - `<div abcdefg>`
    - `div[abcdefg]{}`

## vue中模拟Scoped css
- 随机选择器
    - css modules
- 随机属性
    - `<div abcdefg>`
    - `div[abcdefg]{}`

## react
- 官方没有集成方案
- 社区方案众多
    - css modules
    - (babel)react-css-modules
    - [styled components](https://www.styled-components.com/)
    - styled jsx

