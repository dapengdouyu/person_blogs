---
title: text-size-adjust使用汇总
date: 2018-06-21 10:15:54
tags:
---
>-webkit-text-size-adjust 的本职是用于`mobile`的，见规范 [CSS Mobile Text Size Adjustment Module Level 1](https://drafts.csswg.org/css-size-adjust/) 和 apple 的 [Safari Web Content Guide](https://developer.apple.com/safari/resources/#documentation/appleapplications/reference/safariwebcontent/AdjustingtheTextSize/AdjustingtheTextSize.html#//apple_ref/doc/uid/TP40006510-SW16)。
之所以现在的桌面版webkit浏览器支持他，是因为实际上这是一下bug。[Bug 56543 – CSS property "-webkit-text-size-adjust" means different things in Safari and iOS](https://bugs.webkit.org/show_bug.cgi?id=56543)这个bug在最新版的 WebKit Nightly Builds 里已经被修复了。

这属性现在的一般用处是防止iPhone在坚屏转向横屏时放大文字（注意，就算viewport设置了maximum-scale=1.0 文字还是会放大的）。


- 而且iPhone和iPad的默认设定是不一样的iPhone默认设定 -webkit-text-size-adjust: auto;
- iPad默认设定-webkit-text-size-adjust: none;所以iPad默认是不调节的。
- 此属性还支持百分比，这在当前的桌面版的webkit浏览器是不支持的，所以如果不想让iPhone横坚屏切换的时候调节文字，用-webkit-text-size-adjust: 100%;绝对不能用-webkit-text-size-adjust: none;这会导致仍然支持 -webkit-text-size-adjust: none;的桌面版的webkit浏览器无法人为放大文字大小，严重影响可用性。

>关于如何在chrome里实现小于12px的文字。当然文字缩小到12px以下本来就一定程度影响到可用性了，建议无视chrome的这个特性。硬要实现的话，我想到的一个变通方法是先用js判断是否为chrome （至今还没听说有区分safari 和 chrome 的 css hack ）

```js
var isChrome = !!window.chrome;
```


再用-webkit-transform: scale( ) 缩小到合适值。如果你非得要font-size:10px(使用em单位时方便计算)，你会发现在chrome里最小还是12px，就算你设置了font-size: 10px;-webkit-text-size-adjust: 100%;(或-webkit-text-size-adjust: none;)也没用。原因如下：

```css
div{
    -webkit-text-size-adjust: 100%|none;
}
```
- 只对chrome27.0 版本以下有效，27.0以上版本无效；
- 只对英文才有效，对中文无效。

>在新版的chrome中，已经禁止了改属性,建议使用CSS3中的方法:transform:scale(0.875);当使用transform:scale(0.875)时; 不仅是文字变小了，整个文字所在的容器也同时会变小。

```css
综上所述：
采用-webkit-text-size-adjust: 100%;
必须要用小于12px字体时，用-webkit-transform: scale( ) 缩小到合适值。
```