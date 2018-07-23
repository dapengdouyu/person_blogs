---
title: css效果
date: 2018-07-10 11:03:53
tags: ['css','css效果','前端基础']
---
### 效果属性
- 这个效果怎么实现？
- css最出彩的部分
- box-shadow
- text-shadow
- border-radius
- background
- clip-path

### box-shadow
- 营造层次感(立体感)
- 充当没有宽度的边框
- 特殊效果
- 相当于元素的复制,可以制作一个div画出炫酷的效果
![box-shadow](box-shadow.png)
### text-shadow
- 立体感 
- 印刷品质感

### border-radius
- 圆角矩形
- 圆形
- 半圆/扇形
- 一些奇怪的角角

### background
- 纹理、图案
- 渐变
- 雪碧图动画
- 背景图尺寸适应

### clip-path
- 按路径对容器进行裁剪
- 常见几何图形
- 自定义路径
- 原容器的大小不变,可以做容器内动画

### 3d 变换
- 变换 transform
![transform](transform.jpg)
- 在3d空间中进行变换
![3d](3d.jpg)

### 问题
- 如何用一个div画xxx
    - box-shadow无限投影
    - ::before
    - ::after
- 如何产生不占空间的边框
    - outline
    - box-shadow
- 如何实现圆形元素(头像)
    - border-radius:50%;
- 如何实现ios图标的圆角
![clip-path](svg.jpg)
    - clip-path:(svg)
- 如何实现半圆、扇形等图形
    - border-radius 组合：
        - 有无边框
        - 边框粗细
        - 圆角半径
- 如何实现背景图居中显示/不重复/改变大小
    - background-position
    - background-repeat
    - background-size(cover/contain)
- 如何平移/放大一个元素
    - transform:translateX(100px)
    - transform:scale(2)
- 如何实现3D效果
    - perspective:500px;
    - transform-style:preserve-3d
    - transform:translate rotate...


