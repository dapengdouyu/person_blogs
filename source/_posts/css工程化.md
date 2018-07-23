---
title: css工程化
date: 2018-07-10 15:20:50
tags: ['css','css工程化']
---
### 关注点
- 组织
- 优化
- 构建
- 维护

### postcss
![postcss](postcss.jpg)
- postcss本身只有`解析能力`--可以检测`css代码`是否正确
- 各种神奇的特性全靠插件
- 目前至少有200多个插件

### 插件
- `import` 模块合并
- `autoprefixier` 自动加前缀
- `cssnano` 压缩代码
- `cssnext` 使用css新特性
- `precss` 变量、mixin、循环等

### BrowsersList
![BrowserList](BrowserList.jpg)
### cssnext
![cssnext](cssnext.jpg)
### precss
- 变量
- 条件
- 循环
- mixin Extend
- import
- 属性值引用

### postcss支持的构建工具
- cli 命令行工具
- webpack post-loader
- Gulp gulp-postcss
- Grunt grunt-postcss
- Rollup rollup-postcss
- ...

### webpack
- js是整个应用的核心入口
- 一切资源均有js管理依赖
- 一切资源均有webpack打包

### webpack和css
- css-loader 将css变成js
- style-loader将js样式插入head
- extractTextPlugin 将css从js中提取出来
- css modules 解决css命名冲突的问题
- less-loader sass-loader 各类预处理器
- postcss-loader Postcss处理


### 问题
- 如何解决css模块化的问题
    - Less Sass等css预处理器
    - Postcss插件（postcss-import/press等）
    - webpack处理css(css-loader+style-loader)
- postcss可以做什么？
    - 取决于插件可以做什么
    - autoprefixer cssnext precss 等 兼容性处理
    - import模块合并
    - css语法检查 兼容性检查
    - 压缩文件
- css modules是做什么的，如何使用
    - 解决类名冲突问题
    - 使用postcss或者webpack等构建工具进行编译
    - 在HTML模板中使用编译过程产生的类名
- 为什么使用js来引用、加载css
    - js作为入口、管理资源有天然的优势
    - 将组件结构、样式、行为封装到一起，增加内聚
    - 可以做更多处理（webpack）