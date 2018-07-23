---
title: HTML汇总
date: 2018-07-09 14:13:01
tags: ['HTML','HTML汇总']
---
## HTML常见元素
### head区的元素(页面相关资源、信息描述)
- meta
- title
- style
- link
- script
- base

### body区的元素
- div/section/article/aside/header/footer
- p
- span/em/strong
- table/thead/tbody/tr/td
- ul/ol/li/dl/dt/dd
- a
- form/input/select/textarea/button

### 重要元素
```html
<!-- 页面字符集 -->
 <meta charset="utf-8"> 
 <!-- 以iphone为例，如果不指定viewport的话，视图（viewport）的默认宽度为980px,加viewport来适配移动端 -->
 <meta name="viewport" content="width=device-width,iniial-scale=1.0,maximum-scale=1.0,user-scalable=no"> 
 <!-- 指定基础路径 页面中路径会以该路径为基准计算 -->
 <base href="/"> 
```
viewport实例
![viewport](viewport.jpg)
### 重要属性
- a[href,target]
- img[src,alt]
- table td[colspan,rowspan]
- form[target,method.enctype]
- input[type,value]
- button[type]
- select>option[value]
- label[for]

### 如何理解html
- html"文档"
- 描述文档的"结构"
- [有区块和大纲](http://h50.github.io)

### html版本
- HTML4/4.0.1(SGML)
- XHTML(XML)
- HTML5

[检查页面是否符合标准](http://validator.w3.org/#validate_by_upload)
![HTML版本](HTML版本.jpg)

### HTML5新增内容
- 新区块标签
    - section
    - article
    - nav
    - aside
- 表单增强
    - 日期、时间、搜索
    - 表单验证
    - Placeholder 自动聚焦
- 新增语义
    - header/footer头尾
    - section/article区域
    - nav 导航
    - aside 不重要内容
    - em/strong强调
    - i-->icon

### HTML元素分类
- 按默认样式分
    - 块级 block
    - 行内 inline
    - inline-block
- [按内容分](https://www.w3.org/TR/html5/dom.html#kinds-of-content)
![flow](flow.jpg)

### HTML元素嵌套关系
- 块级元素可以包含行内元素
- 块级元素不一定能包含块级元素,例如p
- "行内元素一般不能不含块级元素",例如a

### 为什么a>div是合法的？
- 嵌套关系来自于内容分类和Content module
- 不一定合法，根据html5文档a标签包裹块级元素时，会将a元素变成透明的，看包裹a元素的标签是块级元素还是行内元素，例如：

```html
<body>
<!-- 合法，应为body包裹a元素，是块级元素 -->
<a><div>2121221</div></a>
<!-- 不合法 -->
<p><a><div>2121221</div></a></p>
</body>
```

### HTML元素默认样式
- 默认样式的意义
- 默认样式带来的问题
- css Reset

### 问题？
- doctype的意义是什么？
     - 让浏览器以标准模式渲染
     - 让浏览器知道元素的合法性
- HTML XHTML HTML5的关系
    - HTML属于SGML
    - XHTML属于XML,是HTML进行XML严格化的结果
    - HTML5不属于SGML或XML,比XHTML宽松
- HTML5有什么变化
    - 新的语义化元素
    - 表单增强
    - 新的API(离线、音视频、图形、实时通信、本地存储、设备能力)
    - 分类和嵌套变更
- em和i有什么区别？
    - em是语义化的标签，表强调
    - i 是纯样式的标签，表斜体
    - HTML5中i不推荐使用，一般用作图标
- 语义化的意义是什么？
    - 开发者容易理解
    - 机器容易理解结构（搜索、读屏软件）
    - 有助于SEO
    - semantic microdata
- 那些元素可以自闭合
    - 表单元素input
    - 图片 img
    - br、hr
    - meta、link
- HTML和DOM的关系
    - HTML是"死"的
    - DOM是由HTML解析而来的，是活的
    - JS可以维护DOM
- property和attribute的区别
    - attribute是“死”的
    - property是“活”的
    - attribute的改变不会影响property，反之相同
```html
<!--  attribute -->
<input type="text" value="1"> //
<script>
$0.value="1"//property
$0.setAttribute("value",'23')
$0.value //1
</script>
```
- form的作用有哪些？
    - 直接提交表单
    - 使用submit/reset按钮
    - 便于浏览器保存表单
    - 第三方库可以整体提取值
    - 第三库可以进行表单验证
