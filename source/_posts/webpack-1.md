---
title: webpack-1
copyright: true
date: 2019-01-08 09:34:56
tags: ['webpack系列','webpack实战']
---
## 什么是webpack
**Webpack**是一个打包模块化 **JavaScript** 的工具，在 **Webpack** 里一切文件皆**模块**，通过 **Loader** 转换文件，通过 **Plugin** 注入钩子，最后输出由多个模块组合成的文件。**Webpack** 专注于构建模块化项目。

一切文件：**JavaScript**、**CSS**、**SCSS**、**图片**、**模板**，在 **Webpack** 眼中都是一个个模块，这样的好处是能清晰的描述出各个模块之间的**依赖关系**，以方便 **Webpack** 对模块进行组合和打包。 经过 **Webpack** 的处理，最终会输出浏览器能使用的静态资源。

![webpack-201919161945](http://b.zhangyapeng.club/webpack-201919161945.jpeg)

## 自动化构建
构建就是把源代码转换成发布到线上的可执行 **JavaScrip**、**CSS**、**HTML** 代码，包括如下内容。

- **代码转换**：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- **文件优化**：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- **代码分割**：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- **模块合并**：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- **自动刷新**：监听本地源代码的变化，自动重新构建、刷新浏览器。
- **代码校验**：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- **自动发布**：更新完代码后，自动构建出线上发布代码并传输给发布系统。

## webpack核心概念
- **Entry**：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- **Module**：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- **Chunk**：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- **Loader**：模块转换器，用于把模块原内容按照需求转换成新内容。
- **Plugin**：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
- **Output**：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

## webpack执行流程
**Webpack** 启动后会从**Entry**里配置的 **Module** 开始**递归**解析 **Entry** 依赖的所有 **Module**。 每找到一个 **Module**， 就会根据配置的**Loader**去找出对应的转换规则，对 **Module** 进行转换后，再解析出当前 **Module** 依赖的 **Module**。 这些模块会以 **Entry** 为单位进行分组，一个 **Entry** 和其所有依赖的 **Module** 被分到一个组也就是一个 **Chunk**。最后 **Webpack** 会把所有 **Chunk** 转换成文件输出。 在整个流程中 **Webpack** 会在恰当的时机执行 **Plugin** 里定义的逻辑。

## 配置webpack
```sh
npm install webpack webpack-cli -D
```
### 基本配置文件
- 配置文件`webpack.config.js`
    - **entry**：配置入口文件的地址
    - **output**：配置出口文件的地址
    - **module**：配置模块,主要用来配置不同文件的加载器
    - **plugins**：配置插件
    - **devServer**：配置开发服务器

```js
const path=require('path');
module.exports={
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'), //绝对路径
        filename:'[name].[hash:8].js'
    },
    module: {},
    plugins: [],
    devServer: {}
}
```

### 1. 配置开发服务器
```sh
npm i webpack-dev-server –D
```

- **contentBase**: 配置开发服务运行时的文件根目录
- **host**：开发服务器监听的主机地址
- **compress**: 开发服务器是否启动gzip等压缩
- **port**：开发服务器监听的端口

```js
devServer: {
    contentBase: path.join(__dirname, "dist"), //静态文件根目录
    port: 9090, // 端口
    host: 'localhost',
    overlay: true,
    compress: true // 服务器返回浏览器的时候是否启动gzip压缩
}
```

- 配置文件`package.json`

```json
"scripts": {
    "build": "webpack --mode development",
    "dev": "webpack-dev-server --open --mode development "
}
```

-------------

### 什么是Loader
通过使用不同的**Loader**，**Webpack**可以要把不同的文件都转成**JS**文件,比如**CSS**、**ES6/7**、**JSX**等

- **test**：匹配处理文件的扩展名的正则表达式
- **use**：loader名称，就是你要使用模块的名称
- **include/exclude**:手动指定必须处理的文件夹或屏蔽不需要处理的文件夹
- **query**：为loaders提供额外的设置选项

####  loader有3种写法

##### 1.1 loader
加载CSS文件，CSS文件有可能在node_modules里，比如bootstrap和antd
```js
module: {
        rules: [
            {
                test: /\.css/,
               loader:['style-loader','css-loader']
            }
        ]
    }
```
##### 1.2 use
```js
module: {
        rules: [
            {
                test: /\.css/,
                use:['style-loader','css-loader']
            }
        ]
    },
```

##### 1.3 useloader
```js
// css-loader用来处理css中url的路径
// style-loader可以把css文件变成style标签插入head中
// 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
 module: {
        rules: [
            {
                test: /\.css/,
                include: path.resolve(__dirname,'src'),//限制范围，提高打包速度
                exclude: /node_modules/
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        insertAt:'top' //插入head的最前面
                    }
                },'css-loader']
            }
        ]
    }
```

#### 支持加载css文件
- [css-loader](https://www.npmjs.com/package/css-loader)
- [style-loader](https://www.npmjs.com/package/style-loader)

#### 支持图片
```sh
npm i file-loader url-loader -D
```
- [file-loader](http://npmjs.com/package/file-loader) 解决CSS等文件中的引入图片路径问题
- [url-loader](https://www.npmjs.com/package/url-loader) 当图片小于limit的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝

##### js中引入图片
```js
let logo=require('./images/logo.png');
let img=new Image();
img.src=logo;
document.body.appendChild(img)
```

```js
{
  test:/\.(jpg|png|bmp|gif|svg|ttf|woff|woff2|eot)/,
    use:[
    {
       loader:'url-loader',
       options:{limit:4096}
    }
  ]
}
```
##### 在CSS中引入图片
```css
.logo{
    width:355px;
    height:133px;
    background-image: url(./images/logo.png);
    background-size: cover;
}
```
#####  HTML 
```html
<div class="logo"></div>
```

#### 分离CSS 
因为CSS的下载和JS可以**并行**,当一个HTML文件很大的时候，我们可以把CSS单独提取出来加载

- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
- filename 打包入口文件
- chunkFilename 用来打包`import('module')`方法中引入的模块

```sh
npm install --save-dev mini-css-extract-plugin
```
配置webpack.config.js
```js
plugins: [
       //参数类似于webpackOptions.output
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename:'[id].css'
        }),
]

{
                test: /\.css/,
                include: path.resolve(__dirname,'src'),
                exclude: /node_modules/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },'css-loader']
}
```
#####  压缩JS和CSS
```sh
npm i uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin -D
```

```js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,//启动缓存
                parallel: true,//启动并行压缩
                //如果为true的话，可以获得sourcemap
                sourceMap: true // set to true if you want JS source maps
            }),
            //压缩css资源的
            new OptimizeCSSAssetsPlugin({})
        ]
    },
}
```
##### css和image存放单独目录
- **outputPath** 输出路径
- **publicPath**指定的是构建后在html里的路径

```js
output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath:'/'
    },
{
  test:/\.(jpg|jpeg|png|bmp|gif|svg|ttf|woff|woff2|eot)/,
  use:[
        {
          loader:'url-loader',
          options:{
              limit: 4096,
              outputPath: 'images',
              publicPath:'/images'
          }
        }
     ]
}

plugins: [
        new MiniCssExtractPlugin({
           filename: 'css/[name].css',
            chunkFilename:'css/[id].css'
        }),
]
```
##### 在HTML中使用图片
```sh
npm i html-withimg-loader -D
```
index.html
```html
<img src="./images/logo.png"/>
```
webpack.config.js
```js
{
    test: /\.(html|htm)$/,
    use: 'html-withimg-loader'
}
```

#### 编译less 和 sass
安装less和sass
```sh
npm i less less-loader -D
npm i node-sass sass-loader -D
```
##### 编写样式 
**less**
```less
@color:orange;
.less-container{
    color:@color;
}
```
**sass**
```scss
$color:green;
.sass-container{
    color:green;
}
```
**webpack.config.js**
```js
{
        test: /\.less/,
        include: path.resolve(__dirname,'src'),
        exclude: /node_modules/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
        },'css-loader','less-loader']
    },
    {
        test: /\.scss/,
        include: path.resolve(__dirname,'src'),
        exclude: /node_modules/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
        },'css-loader','sass-loader']
    },
```
#### 处理CSS3属性前缀

为了浏览器的兼容性，有时候我们必须加入`-webkit`,`-ms`,`-o`,`-moz`这些前缀
- **Trident**内核：主要代表为IE浏览器, 前缀为`-ms`
- **Gecko**内核：主要代表为Firefox, 前缀为`-moz`
- **Presto**内核：主要代表为Opera, 前缀为`-o`
- **Webkit**内核：产要代表为Chrome和Safari, 前缀为`-webkit`

安装[postcss-loader](https://github.com/postcss/postcss-loader)
```sh
npm i postcss-loader autoprefixer -D
```
postcss.config.js
```js
module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      "browsers": [
        "ie >= 9",
        "ff >= 30",
        "chrome >= 34",
        "safari >= 7",
        "opera >= 23"
      ]
    }
  }
}
```
webpack.config.js
```js
{
   test:/\.css$/,
   use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader'],
   include:path.join(__dirname,'./src'),
   exclude:/node_modules/
}
```
#### 转义ES6/ES7/JSX
- Babel其实是一个编译JavaScript的平台,可以把ES6/ES7,React的JSX转义为ES5
- [babel-plugin-proposal-decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)

安装依赖包
```sh
npm i babel-loader @babel/core @babel/preset-env  @babel/preset-react  -D
npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -D
```
webpack.config.js
```js
{
    test: /\.jsx?$/,
    use: {
        loader: 'babel-loader',
        options:{
         "plugins": [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
         ]
        }
    },
    include: path.join(__dirname,'src'),
    exclude:/node_modules/
}
```
#### babel runtime 
- babel 在每个文件都插入了辅助代码，使代码体积过大
- babel 对一些公共方法使用了非常小的辅助代码，比如 `_extend`
- 默认情况下会被添加到每一个需要它的文件中。你可以引入 `@babel/runtime` 作为一个独立模块，来避免重复引入
- [babel-plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)

安装依赖包
```sh
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```
**.babelrc**
```js
{
  "presets": ["@babel/preset-env"],
  "plugins": [
   [
         "@babel/plugin-transform-runtime",
         {
            "corejs": false,
            "helpers": true,
            "regenerator": true,
            "useESModules": true
        }
    ]
  ]
}
```
webpack打包的时候，会自动优化重复引入公共方法的问题

#### ESLint校验代码格式规范
- [eslint](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)
- [eslint-loader](https://www.npmjs.com/package/eslint-loader)
- [configuring](https://eslint.org/docs/user-guide/configuring)
- [babel-eslint](https://www.npmjs.com/package/babel-eslint)
- [Rules](https://cloud.tencent.com/developer/chapter/12618)
- [ESlint 语法检测配置说明](https://segmentfault.com/a/1190000008742240)

安装依赖包
```sh
npm install eslint eslint-loader babel-eslint --D
```
.eslintrc.js
```js
module.exports = {
    root: true,
    //指定解析器选项
    parserOptions: {
        sourceType: 'module'
    },
    //指定脚本的运行环境
    env: {
        browser: true,
    },
    // 启用的规则及其各自的错误级别
    rules: {
        "indent": ["error", 4],//缩进风格
        "quotes": ["error", "double"],//引号类型 
        "semi": ["error", "always"],//关闭语句强制分号结尾
        "no-console": "error",//禁止使用console
        "arrow-parens": 0 //箭头函数用小括号括起来
    }
}
```
webpack.config.js
```js
module: {
        //配置加载规则
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: "pre", //在所有loader执行之前执行
                include: [path.resolve(__dirname, 'src')], // 指定检查的目录
                options: { fix: true } // 这里的配置项参数将会被传递到 eslint 的 CLIEngine   
            },
}
```
#### 对图片进行压缩和优化
[image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)可以帮助我们对图片进行压缩和优化
```sh
npm install image-webpack-loader --save-dev
```

```js
{
          test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
          use: [
            'file-loader',
           {
             loader: 'image-webpack-loader',
             options: {
               mozjpeg: {
                 progressive: true,
                 quality: 65
               },
               optipng: {
                 enabled: false,
               },
               pngquant: {
                 quality: '65-90',
                 speed: 4
               },
               gifsicle: {
                 interlaced: false,
               },
               webp: {
                 quality: 75
               }
             }
           },
          ]
        }
```
---------------

### 插件
- 在 **webpack** 的构建流程中，**plugin** 用于处理更多其他的一些构建任务
- 模块代码转换的工作由 **loader** 来处理
- 除此之外的其他任何工作都可以交由 **plugin** 来完成

#### 自动产出html
我们希望自动能产出**HTML**文件，并在里面引入产出后的资源
```sh
npm i html-webpack-plugin -D
```
- **minify**:是对html文件进行压缩，
- **removeAttrubuteQuotes**:是去掉属性的双引号
- **hash**:引入产出资源的时候加上查询参数，值为哈希避免缓存
- **template**:模版路径

```js
plugins: [
        new HtmlWebpackPlugin({
         minify: {
            removeAttributeQuotes:true
        },
        hash: true,
        template: './src/index.html',
        filename:'index.html'
    })]
```

#### 添加商标
```js
new webpack.BannerPlugin('珠峰培训')
```
#### 拷贝静态文件
有时项目中没有引用的文件也需要打包到目标目录
```sh
npm i copy-webpack-plugin -D
```

```js
new CopyWebpackPlugin([{
  from: path.resolve(__dirname,'src/assets'),//静态资源目录源地址
  to:path.resolve(__dirname,'dist/assets') //目标地址，相对于output的path目录
}])
```
#### 打包前先清空输出目录
```sh
npm i  clean-webpack-plugin -D
```

```js
new CleanWebpackPlugin([path.resolve(__dirname,'dist')])
```
#### DefinePlugin
**DefinePlugin**创建一些在编译时可以配置的全局常量
```js
new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(true),
    VERSION: "1",
    EXPRESSION: "12",
    COPYRIGHT: {
        AUTHOR: JSON.stringify("珠峰培训")
    }
})
```

```js
console.log(PRODUCTION);
console.log(VERSION);
console.log(EXPRESSION);
console.log(COPYRIGHT);
```
- 如果配置的值是**字符串**，那么整个字符串会被当成**代码片段**来执行，其结果作为最终变量的值，,类似`eval`执行的其值
- 如果配置的值**不是字符串**，也不是一个**对象字面量**，那么该值会被转为一个字符串，如 **true**，最后的结果是 **'true'**
- 如果配置的是一个**对象字面量**，那么该对象的所有 **key** 会以同样的方式去定义
- **JSON.stringify(true)** 的结果是 **'true'**

#### IgnorePlugin
**IgnorePlugin**用于忽略某些特定的模块，让 **webpack** 不把这些指定的模块打包进去
```js
import moment from  'moment';
console.log(moment);
```

```js
new webpack.IgnorePlugin(/^\.\/locale/,/moment$/)
```
- 第一个是匹配引入**模块路径**的正则表达式
- 第二个是匹配模块的对应上下文，即所在**目录名**

---------------

### 如何调试打包后的代码
**webpack**通过配置可以自动给我们**source maps**文件,**map**文件是一种对应编译文件和源文件的方法

- **source-map**: 在单独文件中生成，可以映射到列
- **cheap-module-source-map**: 在单独文件中生成，可以映射到列
- **eval-source-map**: 在同一个文件内生成source map，可以映射到列
- **cheap-module-eval-source-map**: 在同一个文件内生成source map，不可以映射到列

```sh
devtool:'eval-source-map'
```

### 打包第三方类库

#### 直接引入 
```js
import _ from 'lodash';
alert(_.join(['a','b','c'],'@'));
```
#### 插件引入

- 类似在每个模块下引用` import _ from 'lodash`
- 函数会自动添加到当前模块的`上下文`，无需显示声明
- 执行上下文，这是一个局部变量
- 如果你有一个第三方的插件，依赖全局对象下的属性
- `jqueryui` 他会依赖`window.jquery`,所以不行
```js
 new webpack.ProvidePlugin({
     _:'lodash'
 })
```
#### expose-loader
不需要任何其他的插件配合，只要将下面的代码添加到所有的loader之前
```js
require("expose-loader?libraryName!./file.js");
```

```js
{ 
    test: require.resolve("jquery"), 
    loader: "expose-loader?jQuery"
}
```

```js
require("expose-loader?$!jquery");
```

#### externals
如果我们想引用一个库，但是又不想**让webpack打包**，并且又不影响我们在程序中以**CMD**、**AMD**或者**window/global**全局等方式进行使用，那就可以通过配置**externals**

```js
const jQuery = require("jquery");
import jQuery from 'jquery';
```

```js
 externals: {
    //  key 模块名 ,value就是真正运行时从window的那个属性上取值
    jquery: 'jQuery'//如果要在浏览器中运行，那么不用添加什么前缀，默认设置就是global
 }
```
------------
### cross-env
**process.env**属性返回一个包含**用户环境信息**的对象

#### 配置环境变量
##### Windows配置

- 临时配置(命令行)
```sh
#node中常用的到的环境变量是NODE_ENV，首先查看是否存在 
set NODE_ENV 
#如果不存在则添加环境变量 
set NODE_ENV=production 
#环境变量追加值 set 变量名=%变量名%;变量内容 
set path=%path%;C:\web;C:\Tools 
#某些时候需要删除环境变量 
set NODE_ENV=
```
- 永久配置
```
右键(此电脑) -> 属性(R) -> 高级系统设置 -> 环境变量(N)...
```

#### Linux配置
- 临时(命令行)
```sh
#node中常用的到的环境变量是NODE_ENV，首先查看是否存在
echo $NODE_ENV
#如果不存在则添加环境变量
export NODE_ENV=production
#环境变量追加值
export path=$path:/home/download:/usr/local/
#某些时候需要删除环境变量
unset NODE_ENV
#某些时候需要显示所有的环境变量
env
```
- 永久(配置文件)
```sh
# 所有用户都生效
vim /etc/profile
# 当前用户生效
vim ~/.bash_profile

# 在文件末尾添加如下格式的环境变量
export path=$path:/home/download:/usr/local/
export NODE_ENV = product

# 修改/etc/profile文件后
source /etc/profile
# 修改~/.bash_profile文件后
source ~/.bash_profile
```
因为windows不支持**NODE_ENV=development**的设置方式。

可以通过**cross-env**实现
```sh
cross-env NODE_ENV=development webpack --mode=development
```
--------
### 服务器代理
如果你有单独的后端开发服务器 **API**，并且希望在同域名下发送 **API** 请求 ，那么代理某些 **URL** 会很有用。

#### 不修改路径
请求到 **/api/users** 现在会被代理到请求 **http://localhost:3000/api/users**。
```js
// api开头的接口代理到3000端口
proxy: {
  "/api": 'http://localhost:3000'
}
```
####  修改路径 
```js
// api开头的接口代理到3000端口
// api/users===>users
proxy: {
    "/api": {
       target: 'http://localhost:3000',
       pathRewrite:{"^/api":""}        
    }            
}
```
#### before after
**before** 在 **webpack-dev-server** 静态资源中间件处理之前，可以用于拦截部分请求返回特定内容，或者实现简单的数据 **mock**
```js
before(app){
  app.get('/api/users', function(req, res) { 
    res.json([{id:1,name:'zfpx1'}])
  })
}
```
#### webpack-dev-middleware 
[webpack-dev-middleware](https://www.npmjs.com/package/)就是在 **Express** 中提供 **webpack-dev-server** 静态服务能力的一个中间件

```sh
npm install webpack-dev-middleware --save-dev
```

```js
const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackOptions = require('./webpack.config');
webpackOptions.mode = 'development';
const compiler = webpack(webpackOptions);
app.use(webpackDevMiddleware(compiler, {}));
app.listen(3000);
```
- **webpack-dev-server** 的好处是相对简单，直接安装依赖后执行命令即可
- 而使用**webpack-dev-middleware**的好处是可以在既有的**Express** 代码基础上快速添加**webpack-dev-server** 的功能，同时利用 **Express** 来根据需要添加更多的功能，如 **mock** 服务、代理 **API** 请求等

### resolve解析
####  extensions
指定**extension**之后可以不用在**require**或是**import**的时候加**文件扩展名**,会依次尝试添加扩展名进行匹配
```js
resolve: {
  extensions: [".js",".jsx",".json",".css"]
},
```
####  alias
- **配置别名**可以加快webpack查找模块的速度
- 每当引入**bootstrap**模块的时候，它会直接引入**bootstrap**,而不需要从**node_modules**文件夹中按模块的查找规则查找

```js
const bootstrap = path.resolve(__dirname,'node_modules/_bootstrap@3.3.7@bootstrap/dist/css/bootstrap.css');
resolve: {
    alias:{
       "bootstrap":bootstrap
    }
},
```
#### modules
- 对于直接声明依赖名的模块（如 **react** ），**webpack** 会类似 **Node.js** 一样进行路径搜索，搜索**node_modules**目录
- 这个目录就是使用**resolve.modules**字段进行配置的 默认配置

```js
resolve: {
modules: ['node_modules'],
}
```
如果可以确定项目内所有的第三方依赖模块都是在项目根目录下的 **node_modules** 中的话
```js
resolve: {
modules: [path.resolve(__dirname, 'node_modules')],
}
```
#### mainFields
默认情况下**package.json** 文件则按照文件中 **main** 字段的文件名来查找文件
```js
resolve: {
  // 配置 target === "web" 或者 target === "webworker" 时 mainFields 默认值是：
  mainFields: ['browser', 'module', 'main'],
  // target 的值为其他时，mainFields 默认值为：
  mainFields: ["module", "main"],
}
```
#### mainFiles
当目录下没有 **package.json** 文件时，我们说会默认使用目录下的 **index.js** 这个文件，其实这个也是可以配置的
```js
resolve: {
  mainFiles: ['index'], // 你可以添加其他默认使用的文件名
},
```
####  resolveLoader
**resolve.resolveLoader**用于配置解析 **loader** 时的 **resolve** 配置,默认的配置：
```js
module.exports = {
  resolveLoader: {
    modules: [ 'node_modules' ],
    extensions: [ '.js', '.json' ],
    mainFields: [ 'loader', 'main' ]
  }
};
```
-------
### noParse
- **module.noParse** 字段，可以用于配置哪些模块文件的内容不需要被**loaders**解析
- 不需要解析依赖（即无依赖） 的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度
- 使用 **noParse** 进行忽略的**模块文件中**不能使用 **import**、**require**、**define** 等导入机制,因为这些模块加载**并不会被解析**，所以就会报错

```js
module.exports = {
// ...
module: {
  noParse: /jquery|lodash/, // 正则表达式
  // 或者使用函数
  noParse(content) {
    return /jquery|lodash/.test(content)
  },
}
}
```

### watch 
当代码发生修改后可以自动**重新编译**

- webpack定时获取文件的更新时间，并跟上次保存的时间进行比对，不一致就表示发生了变化,**poll**就用来配置每秒问多少次
- 当检测文件不再发生变化，会先缓存起来，等待一段时间后之后再通知监听者，这个等待时间通过**aggregateTimeout**配置
- **webpack**只会监听**entry**依赖的文件
- 我们需要尽可能减少需要监听的文件数量和检查频率，当然频率的降低会导致灵敏度下降
```js
watch: true,
watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    poll:1000, //每秒询问的文件变更的次数
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫秒内重复保存不打包
}
```
------------------------
### 区分环境变量
- 日常的前端开发工作中，一般都会有**两套**构建环境
- 一套开发时使用，构建结果用于本地开发调试，不进行**代码压缩**，打印 **debug** 信息，包含 **sourcemap** 文件
- 一套构建后的结果是直接应用于线上的，即代码都是压缩后，运行时不打印 **debug** 信息，静态文件不包括 **sourcemap**
- webpack 4.x 版本引入了 **mode** 的概念
- 当你指定使用 **production mode** 时，默认会启用各种性能优化的功能，包括**构建结果优化**以及 **webpack 运行性能优化**
- 而如果是 **development mode** 的话，则会开启 **debug** 工具，运行时打印详细的错误信息，以及更加快速的增量编译构建

#### 环境差异
- 生产环境
    - 可能需要分离 **CSS** 成单独的文件，以便多个页面共享同一个 **CSS** 文件
    - 需要压缩**HTML/CSS/JS** 代码
    - 需要**压缩图片**
- 开发环境
    - 需要生成 **sourcemap** 文件
    - 需要打印 **debug** 信息
    - 需要 **live reload** 或者 **hot reload** 的功能...

#### 获取mode参数
```sh
npm install --save-dev optimize-css-assets-webpack-plugin
```

```js
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports=(env,argv) => ({
    optimization: {
        minimizer: argv.mode == 'production'?[            
            new UglifyJSplugin({
                  cache: true,//启用缓存
                  parallel: true,// 使用多进程运行改进编译速度
                  sourceMap:true//生成sourceMap映射文件
            }),
            new OptimizeCssAssetsWebpackPlugin({})
        ]:[]
    }
})
```

#### 封装log方法
**webpack**时传递的 **mode** 参数，是可以在我们的应用代码运行时，通过 **process.env.NODE_ENV** 这个变量获取
```js
export default function log(...args) {
    if (process.env.NODE_ENV == 'development') {
        console.log.apply(console,args);
    }
}
```
#### 拆分配置
可以把 **webpack** 的配置按照不同的环境拆分成多个文件，运行时直接根据环境变量加载对应的配置即可

- webpack.base.js：基础部分，即多个文件中共享的配置
- webpack.development.js：开发环境使用的配置
- webpack.production.js：生产环境使用的配置
- webpack.test.js：测试环境使用的配置...
- [webpack-merge](https://github.com/survivejs/webpack-merge)

```js
const { smart } = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.js')
module.exports = smart(base, {
  module: {
    rules: [],
  }
})
```

#### 多入口
有时候我们的页面可以不止一个HTML页面，会有多个页面，所以就需要**多入口**
```js
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html',
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            chunks: ['login'],
            template: './src/login.html',
            filename: 'login.html'
        })
    ],
}
```
-----------------
### 参考文档
- [webpack](https://webpack.docschina.org/configuration/resolve/)
- [webpackdemo](http://www.zhufengpeixun.cn/plan/html/26.webpack-1-basic.html)
- [理解webpack之process.env.NODE_ENV详解](https://www.cnblogs.com/tugenhua0707/p/9780621.html)
- [webpack4之基础篇](https://juejin.im/post/5ab79fa75188255582525400)