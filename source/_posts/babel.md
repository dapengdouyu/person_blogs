---
title: babel
date: 2018-07-25 09:43:57
tags: ['babel','node']
---
>Babel 是一个广泛使用的 `ES6 `转码器，可以将 ES6 代码转为 ES5 代码

### 配置文件.babelrc
`presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。
```sh
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

### 最新的规则
npm install --save-dev babel-preset-stage 0-3

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```
### Plugin/Preset 排序
- `Plugin` 会运行在 `Preset` 之前。
- `Plugin` 会从`第一个`开始顺序执行。
- `Preset` 的顺序则刚好相反(从最后一个逆序执行)。

### babel-core
如果某些代码需要调用`Babel`的`API`进行转码，就要使用`babel-core`模块,一般在`node代码`中使用
```js

var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
```
### babel-cli
Babel提供`babel-cli工具`，用于命令行转码
```sh
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```
### babel-node
babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。
```sh
$ babel-node es6.js
```
### babel-register
`babel-register`模块改写`require`命令，为它加上一个钩子。此后，每当使用require加载`.js`、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。
```js
require("babel-register");
require("./index.js");
```
需要注意的是，`babel-register`只会对`require`命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

------
### babel-polyfill和runtime Transform
Babel默认只转换新的`JavaScript句法`（syntax），而不转换新的`API`，比如`Iterator`、`Generator`、`Set`、`Maps`、`Proxy``、Reflect`、`Symbol`、`Promise`等`全局对象`，以及一些定义在`全局对象`上的方法（比如`Object.assign`）都不会转码。

#### 函数和方法
- Generator
- Set
- Map
- Array.from
- Array.prototype.includes

#### polyfill
- 全局垫片(会污染全局变量)
- 为开发应用准备(平常项目)
- 包含`core-js` 和`regenerate-runtime` (提供` async` 语法编译后的运行时环境)

```js
npm install babel-polyfill --save
import "babel-polyfill"
```
#### runtime Transform
- 局部垫片(不会污染全局变量)
- 为开发框架准备(例如vue)

```js
npm install babel-plugin-transform-runtime --Save-dev
npm install babel-runtime --save
```
.babelrc的配置
```json
{
    "presets": [
        ["@babel/preset-env",{
            "targets":{
                "browsers":["> 1%"]
            }
        }]
    ],
    "plugins": [
        "@babel/transform-runtime"
    ]
}
```
#### 异同
对于以下代码执行时
```js
const key='babel'
const obj={
    [key]='foo'
}
```
babel默认会编译成以下代码
```js
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

var key = 'babel';
var obj = _defineProperty({}, key, Object.assign({}, { key: 'foo' }));
```
`_defineProperty`的帮助函数，但是这个帮助函数仅仅在`当前模块`中生效，因此其他模块中如果用到了同样的语法，编译后就会出现大量的`重复代码`。

##### babel-polyfill
` babel-polyfill` 是直接在`原型链`上增加方法,所以会污染`全局变量`和`内置的对象原型`
##### babel-runtime
`Babel`为了解决这个问题，提供了单独的包 `babel-runtime` 供编译模块复用`工具函数`。
启用插件` babel-plugin-transform-runtime` 后，Babel 就会使用` babel-runtime` 下的工具函数，转译代码如下
```js
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = 'babel';
var obj = (0, _defineProperty3.default)({}, key, 'foo');
```
**但是** `babel-runtime` 不能转码实例方法，比如这样的代码：
```js
'!!!'.repeat(3);
'hello'.includes('h');
```

------
### babel-preset-env
- `babel-preset-latest`： 支持现有所有ECMAScript版本的新特性，包括处于`stage 4`里的特性（已经确定的规范，将被添加到下个年度的）。
- `babel-preset-env` 功能类似 `babel-preset-latest`，优点是它会根据`目标环境`选择不支持的新特性来转译。
- `实验性`的属性（babel-preset-latest不支持的）需要手动安装配置相应的`plugins`或者`presets`。这样你再不需要 es20xx presets了。

**问题：** 为什么需要`env`?
大部分现代浏览器已经支持ES6的`generators`了，但是如果你设置了`babel-preset-es2015`，`generator`函数还是会被转译成复杂的`ES5代码`。
------
#### 其他配置
- `modules`(string, 默认值: `"commonjs"`)
    - 将ES6模块语法转换为另一种模块类型，可选值:
        - 各种流行的模块化规范："amd"、 "commonjs"、 "systemjs"、 "umd"
        - 禁止转译：false
- `include`, `exclude` (Array of strings, 默认值: [])
    - include 必须要转译的功能 (比如 覆盖有故障的本地功能)。跟单独启用相应插件是一样的。
    - exclude 禁止转译的功能
- `debug` (boolean, default: false)
    - 以下内容都会用console.log输出 :
        - 目标环境
        - 启用的transforms
        - 启用的plugins
        - 启用的polyfills
- `useBuiltIns` (boolean, 默认值: false)
    - `babel-preset-env`可以实现基于特定环境引入需要的`polyfill`
        - `core-js`， 根据需要引入`ES5`，`ES6+`标准方法的实现
            - 安装 polyfill: npm install core-js --save
            - 引入 polyfill: import "core-js"; 
    - `babel-polyfill` 包含`core-js` 和`regenerate-runtime`(提供 `async `语法编译后的运行时环境)。
        - 安装 polyfill: npm install babel-polyfill --save
        - 引入 polyfill: import "babel-polyfill";
    - 两种方法最终都会根据`环境`转译成特定的`polyfill`。 比如:
```js
import "core-js/modules/es7.string.pad-start";
import "core-js/modules/es7.string.pad-end";
import "core-js/modules/web.timers";
import "core-js/modules/web.immediate";
import "core-js/modules/web.dom.iterable";
```
**note:**在整个应用里只能引入一次`polyfill`，可以在 “main” 模块里一次引入。
`useBuiltIns` 会使浏览器下载的代码变少 (最终打包的文件大小变小了)。但是不会节约内存， 因为polyfill本身只会安装缺少的部分。

-----
基于TC39不同阶段的提案的`Presets` (stage-0，1，2，3等) 也是去除的候选，因为在这些statges中的标准是不断变化的。提案可以在2个月内改变。因此，直接引用一些实验性的`plugins`会是更好的选择。
- stage 0 
    - transform-do-expressions
    - transform-function-bind
- stage 1
    - transform-class-constructor-call (启用)
    - transform-export-extensions
- stage 2
    - syntax-dynamic-import
    - transform-class-properties
    - `transform-decorators` – 在提案更新中被禁用 (可以同时使用 legacy 转换,babel7默认添加到stage0中)
- stage 3
    - transform-object-rest-spread
    - transform-async-generator-functions













