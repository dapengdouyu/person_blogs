---
title: css动画
date: 2018-07-09 16:57:58
tags: ['css动画','css']
---
### 动画的原理
- 视觉暂留作用
- 画面逐渐变化

### 动画的作用
- 愉悦感
- 引起注意
- 反馈
- 掩饰

### css中的动画类型
- transition补间动画
- keyframe关键帧动画
- 逐帧动画 

#### 补间动画
![补间动画](补间动画.jpg)
- 位置- 平移（left/right/margin/transform）
- 方位-旋转(transform)
- 大小-缩放（transform）
- 透明度（opacity）
- 其他-`线性变换`（transform）

#### timing(easing)
 定义动画`进度`和`时间`的关系
![timing](timing.jpg)

### 关键帧动画
- 相当于多个补间动画
- 与元素状态的变化无关
- 定义更加灵活
![关键帧动画](关键帧动画.png)

### 逐帧动画
- 适用于无法补间计算的动画
- 资源较大
- 使用steps() 指定关键帧之间有多少个动画
![逐帧动画](逐帧动画.png)

### 问题
- css的动画实现方式有几种？
    - transition
    - keyframes(animation)
- 过渡动画和关键帧动画的区别
    - 过渡动画需要有状态的变化
    - 关键帧动画不需要状态的变化
    - 关键帧动画能控制更精细
- 如何实现逐帧动画
    - 使用关键帧动画
    - 去掉补间(steps)
- css动画的性能
    - 性能不坏
    - 部分情况下优于JS
    - 但是JS可以做到更好
    - 部分高危属性
        - box-shadow等




