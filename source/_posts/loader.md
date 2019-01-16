---
title: loader
copyright: true
date: 2019-01-15 11:34:48
tags: ['webpack','loader']
---
## loader运行的总体流程(一个函数)
![loader-2019115113541](http://b.zhangyapeng.club/loader-2019115113541.jpg)
## loader配置
`loader`是导出为一个`函数`的node模块。该函数在`loader`转换资源的时候调用。给定的函数将调用`loader API`(loaderContext)，并通过`this`上下文访问。
###  匹配(test)单个 loader
匹配(test)单个 `loader`，你可以简单通过在 **rule** 对象设置 `path.resolve` 指向这个本地文件
```js
{
  test: /\.js$/
  use: [
    {
      loader: path.resolve('path/to/loader.js'),
      options: {/* ... */}
    }
  ]
}
```
### 匹配(test)多个 loaders
你可以使用 `resolveLoader.modules` 配置，`webpack` 将会从这些目录中搜索这些 `loaders`
```js
resolveLoader: {
   modules: [path.resolve('node_modules'), path.resolve(__dirname, 'src', 'loaders')]
},
```
###  npm link
- 确保正在开发的本地` Npm` 模块（也就是正在开发的 Loader）的 `package.json` 已经正确配置好； 在本地 `Npm` 模块根目录下执行 `npm link`，把本地模块注册到全局；
- 在项目根目录下执行`npm link loader-name`，把第2步注册到全局的本地 `Npm` 模块链接到项目的 `node_moduels` 下，其中的 - `loader-name` 是指在第1步中的 `package.json` 文件中配置的模块名称。

```js
npm link
```
###  alias 
```js
resolveLoader: {
        alias: {
            "babel-loader": resolve('./loaders/babel-loader.js'),
            "css-loader": resolve('./loaders/css-loader.js'),
            "style-loader": resolve('./loaders/style-loader.js'),
            "file-loader": resolve('./loaders/file-loader.js'),
            "url-loader": resolve('./loaders/url-loader.js')
        }
    },
```
------------------
## loader用法
### 单个loader用法
- 当一个 **loader** 在资源中使用，这个 **loader** 只能传入一个参数 - 这个参数是一个包含`资源文件内容的字符串`
- 同步 **loader** 可以简单的返回一个代表模块转化后的值。
- 在更复杂的情况下，`loader` 也可以通过使用 `this.callback(err, values...) `函数，返回任意数量的值。错误要么传递给这个` this.callback` 函数，要么扔进同步 `loader` 中。
- `loader`只能传入一个包含包含资源文件内容的字符串
- 同步 `loader `可以简单的返回一个代表模块转化后的值
- loader 也可以通过使用 `this.callback(err, values...)` 函数，返回任意数量的值
- loader 会返回**一个或者两个值**。第一个值的类型是 `JavaScript` 代码的`字符串`或者 `buffer`。第二个参数值是` SourceMap`，它是个 `JavaScript` 对象

### 多个loader
当链式调用多个 **loader**的时候，请记住它们会以相反的顺序执行。取决于数组写法格式，从`右向左`或者从`下向上`执行。
- 最后的 loader 最早调用，将会传入原始资源内容。
- 第一个 loader 最后调用，期望值是传出 `JavaScript` 和 `source map`（可选）。
- 中间的 loader 执行时，会传入前一个 `loader` 传出的结果。

### 单个loader用法
- 最后的 `loader` 最早调用，将会传入原始资源内容。
- 第一个 `loader` 最后调用，期望值是传出 `JavaScript` 和 `source map`（可选）。
- 中间的`loader` 执行时，会传入前一个 `loader` 传出的结果。

----------------------------
## 用法准则
### 简单
`loaders` 应该只做单一任务。这不仅使每个 `loader` 易维护，也可以在更多场景链式调用。
### 链式(Chaining)
利用 `loader` 可以链式调用的优势。写五个简单的 `loader` 实现五项任务，而不是一个 `loader` 实现五项任务
### 模块化(Modular)
保证输出模块化。`loader` 生成的模块与普通模块遵循相同的设计原则。
### 无状态(Stateless)
确保 `loader` 在不同模块转换之间不保存状态。每次运行都应该独立于其他编译模块以及相同模块之前的编译结果。
### loader 工具库(Loader Utilities)
[loader-utils](https://github.com/webpack/loader-utils) 包。它提供了许多有用的工具，但最常用的一种工具是获取传递给 `loader` 的选项

[schema-utils](https://github.com/webpack-contrib/schema-utils) 包配合 `loader-utils`，用于保证 `loader` 选项，进行与 `JSON Schema` 结构一致的校验

### loader 依赖(Loader Dependencies)
如果一个 `loader` 使用外部资源（例如，从文件系统读取），必须声明它。这些信息用于使缓存 `loaders` 无效，以及在观察模式(watch mode)下重编译。

### 模块依赖(Module Dependencies)
根据模块类型，可能会有不同的模式指定依赖关系。例如在 `CSS` 中，使用 `@import` 和 `url(...)` 语句来声明依赖。这些依赖关系应该由模块系统解析。

### 绝对路径(Absolute Paths)
不要在模块代码中插入绝对路径，因为当项目根路径变化时，文件绝对路径也会变化。`loader-utils` 中的 `stringifyRequest` 方法，可以将绝对路径转化为相对路径。

### 同等依赖(Peer Dependencies)
如果你的 `loader` 简单包裹另外一个包，你应该把这个包作为一个 `peerDependency` 引入。
这种方式允许应用程序开发者在必要情况下，在 `package.json` 中指定所需的确定版本。

-----------------------
## API
### 缓存结果
`webpack`充分地利用缓存来提高编译效率
```js
this.cacheable();
```
### 异步
当一个 `Loader` 无依赖，可异步的时候我想都应该让它不再阻塞地去异步
```js
// 让 Loader 缓存
module.exports = function(source) {
    var callback = this.async();
    // 做异步的事
    doSomeAsyncOperation(content, function(err, result) {
        if(err) return callback(err);
        callback(null, result);
    });
};
```
### raw loader
默认的情况源文件是以 `UTF-8 `字符串的形式传入给 `Loader`,设置`module.exports.raw = true`可使用 `buffer` 的形式进行处理
```js
module.exports.raw = true;
```
### 获得 Loader 的 options
```js
const loaderUtils = require('loader-utils');
module.exports = function(source) {
  // 获取到用户给当前 Loader 传入的 options
  const options = loaderUtils.getOptions(this);
  return source;
};
```
### 返回其它结果
`Loader`有些场景下还需要返回除了内容之外的东西
```js
module.exports = function(source) {
  // 通过 this.callback 告诉 Webpack 返回的结果
  this.callback(null, source, sourceMaps);
  // 当你使用 this.callback 返回内容时，该 Loader 必须返回 undefined，
  // 以让 Webpack 知道该 Loader 返回的结果在 this.callback 中，而不是 return 中 
  return;
};
```
完整格式(`见NormalModule.js---->runLoaders`)
```js
this.callback(
    // 当无法转换原内容时，给 Webpack 返回一个 Error
    err: Error | null,
    // 原内容转换后的内容
    content: string | Buffer,
    // 用于把转换后的内容得出原内容的 Source Map，方便调试
    sourceMap?: SourceMap,
    // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
    // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
    abstractSyntaxTree?: AST
);
```
### 同步与异步
`Loader` 有同步和异步之分，上面介绍的` Loader` 都是同步的 `Loader`，因为它们的转换流程都是同步的，转换完成后再返回结果。 但在有些场景下转换的步骤只能是异步完成的，例如你需要通过网络请求才能得出结果，如果采用同步的方式网络请求就会阻塞整个构建，导致构建非常缓慢。
```js
module.exports = function(source) {
    // 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果
    var callback = this.async();
    someAsyncOperation(source, function(err, result, sourceMaps, ast) {
        // 通过 callback 返回异步执行后的结果
        callback(err, result, sourceMaps, ast);
    });
};
```
### 处理二进制数据
在默认的情况下，`Webpack` 传给 `Loader` 的原内容都是 `UTF-8` 格式编码的字符串。 但有些场景下 `Loader` 不是处理文本文件，而是处理二进制文件，例如 `file-loader`，就需要 `Webpack` 给 `Loader` 传入二进制格式的数据。 为此，你需要这样编写 `Loader`：
```js
module.exports = function(source) {
    // 在 exports.raw === true 时，Webpack 传给 Loader 的 source 是 Buffer 类型的
    source instanceof Buffer === true;
    // Loader 返回的类型也可以是 Buffer 类型的
    // 在 exports.raw !== true 时，Loader 也可以返回 Buffer 类型的结果
    return source;
};
// 通过 exports.raw 属性告诉 Webpack 该 Loader 是否需要二进制数据 
module.exports.raw = true;
```

###  缓存
在有些情况下，有些转换操作需要大量计算非常`耗时`，如果每次构建都重新执行重复的转换操作，构建将会变得非常缓慢。 为此，`Webpack `会**默认缓存**所有` Loader` 的处理结果，也就是说在需要被处理的文件或者其依赖的文件没有发生变化时， 是不会重新调用对应的 `Loader` 去执行转换操作的。
```js
module.exports = function(source) {
  // 关闭该 Loader 的缓存功能
  this.cacheable(false);
  return source;
};
```

### 其它 Loader API
- [完整API](https://webpack.docschina.org/api/loaders/#%E5%90%8C%E6%AD%A5-loader)

|方法名|	含义|
|------|-------|
|this.context	|当前处理文件的所在目录，假如当前 Loader 处理的文件是 /src/main.js，则 this.context 就等于 /src|
|this.resource|	当前处理文件的完整请求路径，包括 querystring，例如 /src/main.js?name=1。|
|this.resourcePath	|当前处理文件的路径，例如 /src/main.js|
|this.resourceQuery	|当前处理文件的 querystring|
|this.target	|等于 Webpack 配置中的 Target|
|this.loadModule|	但 Loader 在处理一个文件时，如果依赖其它文件的处理结果才能得出当前文件的结果时,就可以通过 this.loadModule(request: string, |callback: function(err, source, sourceMap, module)) 去获得 request 对应文件的处理结果|
|this.resolve|	像 require 语句一样获得指定文件的完整路径，使用方法为 resolve(context: string, request: string, callback: function(err, result: string))|
|this.addDependency|	给当前处理文件添加其依赖的文件，以便再其依赖的文件发生变化时，会重新调用 Loader 处理该文件。使用方法为 addDependency(file: string)|
|this.addContextDependency|	和 addDependency 类似，但 addContextDependency 是把整个目录加入到当前正在处理文件的依赖中。使用方法为 addContextDependency(directory: string)|
|this.clearDependencies|	清除当前正在处理文件的所有依赖，使用方法为 clearDependencies()|
|this.emitFile	|输出一个文件，使用方法为 emitFile(name: string, content: Buffer/string, sourceMap: {...})|
|loader-utils.stringifyRequest|	Turns a request into a string that can be used inside require() or import while avoiding absolute paths. Use it instead of JSON.stringify(...) if you're generating code inside a loader 把一个请求字符串转成一个字符串，以便能在require或者import中使用以避免绝对路径。如果你在一个loder中生成代码的话请使用这个而不要用JSON.stringify()|
|loader-utils.interpolateName|	Interpolates a filename template using multiple placeholders and/or a regular expression. The template and regular expression are set as query params called name and regExp on the current loader's context. 使用多个占位符或一个正则表达式转换一个文件名的模块。这个模板和正则表达式被设置为查询参数，在当前loader的上下文中被称为name或者regExp|



----------------
## 参考
- [loader-utils](https://github.com/webpack/loader-utils)
- [schema-utils](https://github.com/webpack-contrib/schema-utils)