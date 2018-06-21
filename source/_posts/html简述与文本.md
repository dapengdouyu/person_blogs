---
title: html简述与文本
date: 2018-06-21 15:22:37
tags: ['前端基础','html']
---
## HTML是什么
- HyperText Markup Language
- 使用`标签`来描述页面的`内容`和`结构`

### HTML的产生
- 1989年,TimBerners-Lee
- 共享文档需要
- 还发明了浏览器、服务器和HTTP

### Doctype的作用
- 指定HTML页面使用的标准和版本
- 浏览器根据doctype决定使用哪种渲染模式

### 渲染模式
- Quirks Mode 怪异模式 ----(`html4之前`)
- Almost Standard Mode 准标准模式----(`有些标签大小写不严格`)
- Standard Mode 标准模式---(`标签大小写严格标准`)

```html
<!-- html5 -->
<!DOCTYPE html>
<!-- 准标准模式 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<!-- 标准模式 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- 当 doctype 缺失的时候，浏览器会选择 Quirks Mode -->
```

### HTML 版本
- HTML 1.0,1991
- HTML 2.0,1994,IETE
- HTML 3.2, 1997,W3C
    - Netscape引入私有标签
    - HTML 3.0失败
    - W3C接管HTML标准化
- HTML 4.01,1998
    - 样式与内容分离,CSS支持
    - Doctype
- XHTML 1.0,2000
    - 用XML语法重新定义HTML
    - 语法严格要求
- XHTML 2.0
    - 不`兼容历史`
    - 去除样式类标签
    - 去除img、a标签
    - 彻底修改Form
    - 开发者不欢迎,浏览器不支持
- HTML5
    - 2004年,WHATWG继续发展HTML
    - 2008年,W3C HTML5草案发布

### HTML5 设计思想
- 兼容已有内容
- 避免不必要的复杂性
- 解决现实的问题
- 优雅降级
- 尊重事实标准
- 用户的需求–>开发者的需求–>浏览器厂商的需求–>标准的制定者的需求–>理论完美

### HTML5 中的变化
- doctype、meta
- 新增语义化标签和属性
- 去掉纯展示性标签
- canvas、video、audio、离线、本地存储、拖拽等

### HTML5语法
- 标签不区分大小写,推荐小些
- 空标签可以不闭合,如`<input> <meta>`
- 属性不必引号,推荐双引号
- 某些属性值可以省略,如required、readonly

### 文本标签
- p
- h1~h6
- hr 段落级别的话题切换（效果：一条横线）
- 列表：
    - 有序列表 `ol、li`
    - 无序列表 `ul、li`
    - 自定义列表`dl、dt、dd`
```html
<h3>霸王别姬</h3>
<dl>
  <dt>导演：</dt>
  <dd>陈凯歌</dd>
  <dt>主演：</dt>
  <dd>张国荣</dd>
  <dd>巩俐</dd>
  <dd>张丰毅</dd>
  <dt>上映日期：</dt>
  <dd>1993-01-01</dd>
</dl>
```
    - 列表是可以嵌套的（列表中有列表,自动默认有缩紧）。
- 嵌套规则：内外不要混搭
- 引用
    - 长段落引用块标签
 ```html
    <blockquote cite="myURL">长段落引用块标签</blockquote>
```
    - 短引用
```html
<cite>短引用说来源，如书名、标题</cite> 
```
    - 引用内容
```html
    <q>引用的内容，如引用一句话</q>
```
- 预格式化文本
    - `pre`保留空格和换行
- 代码段`code`
- 插图`figure`
    - 可以包裹`图片`或`代码段`
```html
<figure>
    <figcaption>定义一个函数</figcaption>
    <pre>
        <code>
            function add(x,y){
                return x+y
            }
        </code>
    </pre>
</figure>
```
### 网页总体结构
![网页总体结构](网页总体结构.png)
[html5 Doctor](https://www.cnblogs.com/Iwillknow/p/3581063.html)
- header 页头
- footer 页尾
- main 正文(网页想要表达的主要内容)
- aside 侧边栏(和正文内容无关)
- article 文章
- section 文档中的节，一段
```html
<article>
  <header>
    <h1>字体排版</h1>
    <p>作者：XXX</p>
  </header>
  <section>
    <h2>语言及范围</h2>
    <p>在当代，。。。。。</p>
    <p>字体排版。。。</p>
  </section>
</article>
```
### 强调： 
- `strong`：重要性、严重性、紧急性
- `em`：从一句话中突出某个词语
- `b`：仅为了将词语从视觉上和其他部分区分，比如一篇论文摘要中的关键词。（不推荐）
- `i`：换一种语调去说一句话时，比如其他语言翻译，对话中的旁白。（不推荐）

### 定义与缩写：
```html
<dfn>定义</dfn> 
<abbr title="对缩写的解释">缩写</abbr>
```
### 代码
```html
<code>代码段</code> 
<var>变量</var> 
<kbd>键盘按键 F12</kbd>
<samp>举个例子</samp>
```
### 上标和下标
```html
<sub></sub> 
<sup></sup>
```
### mark
- 和用户当前行为相关的突出，比如在搜索结果中匹配到的词
- 一部分内容需要在后面引用时。

### 插入和删除
```html
<ins>更新</ins> 
<del>删除</del>
<!-- 用途 -->
<del>原价：199</del><ins>双十一：100</ins>
```
### 换行控制（尽量避免）
```html
<br> 
<!-- 用途 -->
<p>https://blog.csdn.net/sunxiaofre/<wbr>article/<wbr>details<wbr>/695002</p>
```
### div 和 span
- 实在找不到其他更符合语义的标签时使用

### 实体（Entity）字符
- &amp;&nbsp;&gt; &copy;&yen;&#9775;
- `&amp;&nbsp;&gt;&copy;&yen;&#9775;`


