---
title: HTML补充知识
date: 2018-06-24 10:12:06
tags: ['前端基础','html']
---
### 全局属性
- `accesskey` & `tabindex` 与键盘按键相关。
```html
<p>
    <input type="text" accesskey="i" placeholder="Press Ctrl+Alt+I">
</p>
<p>
    <a href="http://www.baidu.com" accesskey="e" tabindex="-1">press
        <kbd>Ctrl+Alt+E</kbd>
    </a>
</p>
```
- `id`保证唯一性，`class`多用在css，`style`指定内联样式。
- `contenteditable` 页面的内容可以被编辑。`spellcheck`拼写检查
```html
 <!--contenteditable：使页面可编辑-->
    <section contenteditable spellcheck="true">
        <p>计算机基础</p>
        <p>了解浏览器的渲染原理、开发调试工具以及各种调试技巧。了解 Web 协议栈，学习掌握 HTTP 协议基础，
            理解网络、浏览器性能和安全相关的问题以及常用的优化技巧，掌握专业的前端性能优化能力。
            学习 UI 常用动画效果的算法原理和基础，掌握通过 JavaScript、CSS3、SVG 实现高性能动画的技巧。
            学习其他前端相关的数学知识、数据结构和常用算法。</p>
    </section>
```
- 语言 `lang` 指定页面的语言；`dir` 指定语言书写的方向。
```html
<div lang="zh-CN">
    <p>哈哈哈</p>
</div>
<!-- 阿拉伯语 右对齐 -->
<p dir="rtl" lang="ar">sasdasda</p>
```
- `title` 属性
```html
<abbr title="你好">hello</abbr>
```
- `hidden`属性。隐藏元素。可用性好
```html
<p hidden>你看不见我</p>
```

### 无障碍性
- 或可访问性，`Accessibility`。
- 确保`任何人`都有办法获取放在网页上的媒体内容。
- 不让身体、心理或技术上的问题成为获取信息的障碍

### Web开发者应该做的事情
- [WCAG(Web Content Accessibility Guidelines) 2.0](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [ARIA(Accessible Rich Internet Applications)](https://www.w3.org/TR/html-aria/)
```html
<!-- ARIA 属性,告诉读屏软件该标签充当什么角色 -->
<ol role="tablist">
    <li role="tab"><a href="#ch1">Chapter 1</a></li>
    <li role="tab"><a href="#ch2">Chapter 2</a></li>
    <li role="tab"><a href="#ch3">Chapter 3</a></li>
</ol>
```

#### 提升无障碍性 
- 为 `img` 提供 `alt` 属性。
-  `noscript` 当浏览器`不支持`脚本script时的替代性方案。
- `input` 和 `label` 相对应。
- `图形验证码`与``语音验证码`。
- `文字`和`背景`有足够对比度。
- `键盘`可操作。

#### 语义化 
- HTML中的元素、属性及属性值都拥有某些含义
- 开发者应该遵循语义来编写HTML

#### 为什么语义化很重要？ 
- 提升代码可读性、可维护性
- 搜索引擎优化
- 提升无障碍性

#### 扩展HTML 
- `meta` 如：如何编码、页面关键词、页面介绍、页面缩放、电话号码自动识别、360浏览器指定内核、指定IE渲染模式
```html
<!--编码-->
<meta charset="UTF-8">

<!--指定 HTTP Header-->
<meta http-equiv="content-security-policy" content="script-src 'self'">

<!--SEO 搜索引擎优化-->
<meta name="keywords" content="关键词">
<meta name="description" content="页面介绍">

<!--移动设备 Viewport-->
<meta name="viewport" content="initial-scale=1">

<!--关闭 ios 电话号码自动识别-->
<meta name="format-detection" content="telphone=no">

<!--360 浏览器指定内核-->
<meta name="renderer" content="webkit">

<!--指定 IE 渲染模式-->
<meta http-equiv="x-ua-compatible" content="IE=edge">
```
- `data-*`:`dataset`属性是一个map，其中存放`data-*`东西。
```html
<ul>
    <li data-id="1">水果1</li>
    <li data-id="2">水果2</li>
    <li data-id="3">水果3</li>
</ul>
```
- `microdata` 
    - `HTML5`中的一个规范
    - `itemscope` 属性描述的是：在此标签内的东西是一个实体。`itemtype=" " `属性描述的是：再次标签内的东西的实体类型。`itemprop=" " `属性描述的是：该实体内的具体属性是啥。
    - 在HTML 中 通过属性嵌入格式化数据
    - 提供给搜索引擎、浏览器（插件）使用
```html
    <h2>microdata</h2>
<section itemscope itemtype="http://schema.org/Person">
    Hello, my name is
    <span itemprop="name">Xiao Xiao</span>
    I am a
    <span itemprop="jobTitle">Graduate Student</span>
    at the
    <span itemprop="University">UESTC</span>
    My friends call me
    <span itemprop="additionalName">Xiao</span>
    You can visit my homepage at
    <a href="http://blog.csdn.net/sunxiaofre" itemprop="url">blog</a>
    <section itemprop="address" itemscopt itemtype="http://schema.org/PostalAddress">
        I live at
        <span itemprop="addressCountry">China</span>
        <span itemprop="addressLocality">SiChuan</span>
        <span itemprop="addressStreet">XiJie</span>
    </section>

</section>
```
- RDFa
- `JSON-LD` json类型的数据组织形式
```html
<h2>JSON-LD</h2>
    <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "Person",
            "name": "Xiao Xiao",
            "jobTitle": "Graduate Student",
            "University": "UESTC",
            "additionalName": "Xiao",
            "url": "http://blog.csdn.net/sunxiaofre",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "China",
                "addressLocality": "SiChuan",
                "addressStreet": "XiJie"
            }

        }
    </script>
```
#### 参考
- [Google Schemas](https://developers.google.com/schemas)
- [Schema.org](https://schema.org)

### HTML编程规范 
- Google Coding Style
- W3C Validator

### 工具 
- Emmet
- markdown
