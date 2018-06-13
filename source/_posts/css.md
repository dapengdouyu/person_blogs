---
title: css概念与简单选择器(1)
date: 2018-06-12 15:26:21
tags: ['css','前端基础']
---
# css概念与简单选择器
## css规则
<!-- more -->
![css](./TIM截图20180612152920.jpg)
## 代码风格
```css
h1{color:red;font-size:14px;}
```
```css
h1{
    color:red;
    font-size:14px;
}
```
## 使用css
```html
<!-- 外链 -->
<!-- rel 关系意思的缩写 -->
<link rel='stylesheet' href="/path/t0/style.css"/>   
```
```css
<!-- 嵌入 -->
<style>
li{
    margin:0;
    list-style:none;
}
p{
    margin:1em 0;
}
</style>
```
```html
<!-- 内联 -->
<p style="margin:1em 0">你好</p>
```
### 注释
```css
/* 设置按钮宽度 */
.form button{
    width:240px;
}
/**
*设置默认样式
*/
body{
    margin:0;
    /* font-size:12px; */
    /* 原理是把//color整体当作属性去解析 */
    //color:#333;
}
```
# 简单选择器
>选择器用来从页面中选择元素，以给他们定义样式

## 通配选择器
```css
/* 匹配所有元素 */
*{
    box-sizing:inherit;
}
```
## 标签选择器
```css
/* 匹配所有p元素 */
p{
    margin:1em 0;
}
```
## id 选择器
```html
<p id="example">Hello world</p>

<style type="text/css">
/**
*匹配id为example的元素
*注意：id值在一个HTML中必须唯一
*/

#example{
    font-size:14px;
}
</style>
```
## 类选择器
```html
<!-- 可以给一个元素指定多个class,用空格隔开 -->
<p class="warning icon">警告信息</p>

<style type="text/css">
.warning{
    font-size:14px;
}
.icon{
    background:#f00;
}
</style>
```
# 属性选择器
拥有某个属性
```html
<input name="username" value="zhao" disabled>

<style>
input[disabled]{
    background:#eee;
    /* 光标禁用 */
    cursor:not-allowed;
}
<style>
```
某个属性的值是`password`
```html
<input name="password" value="">

<style>
input[type="password"]{
    background:red;
}
<style>
```
属性的值包含`height`
```html
     <p>
        <label>
            height:
        </label>
        <input type="text">22</input>  
    </p>

     <p>
        <label>
            weight:
        </label>
        <input type="text">22</input>  
    </p>

    <p>
        <label>
            BMI:
        </label>
        <!-- output与input对应，output是数据的展示，for属性代表值是从哪里获取的 -->
        <output for="weight height">22</output>  
    </p>
    <style>
        [for~="height"]{
            color:red;
        }
    </style>
```
属性的值以什么字段`开头`和`结尾`
```html
<p><a href="#top">回到顶部</a></p>
<style>
a[href^="#"]{
    color:red;
}
</style>
```
```html
 <p>你可以<a href="a.jpg">查看原图</a></p>
    <style>
    a[href$='.jpg']{
        color:red;
    }
    </style>
```
属性的值在任意位置都可以用`*`
```html
<i class="icon-user">用户</i>
<style>
    [class*="icon-"]{
        color:coral;
    }
</style>
```
## 伪类选择器
基于DOM之外的信息去(比如根据用户和网页的交互状态)选择元素
```html
<!-- 未访问过的连接 -->
a:link { ... } 
<!-- 已访问过的连接 -->
a:visited { ... } 
<!-- 鼠标移到连接上的样式 -->
a:hover { ... }
<!-- 鼠标在连接上按下时的样式 -->
a:active { ... }
<!-- 获得焦点时的样式 -->
a:focus { ... }
```
## 选择器组合
### 直接组合 EF
```html
<p class="warning">警告</p>
<div class="warning icon">
警告2
</div>
<style>
    p.warning{
        color:orange;
    }
</style>
```
组合形式(标签选择器在`前`)
- E[for="bar"]
- E.warning
- E#myid
- #myid.warning
- .warning[foo="bar"]

### 后代组合 E F
```html
<article>   
    <h1>你好吗？</h1>
</article>
<style>
    /* 后代选择器 */
    article p{
        color:coral
    }
    /* 亲子选择器 (直接子集)*/
    article > p{
        color:aliceblue
    }
</style>
```
### 同时为一组选择器定义样式 E,F,B
```css
body,h1,h2,h3{
    margin:0;
    padding:0;
}
```