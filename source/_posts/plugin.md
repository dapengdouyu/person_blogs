---
title: plugin
copyright: true
date: 2019-01-21 15:34:52
tags: ['webpack','plugin']
---
##  plugin
插件向第三方开发者提供了 webpack 引擎中完整的能力。使用阶段式的构建回调，开发者可以引入它们自己的行为到 webpack 构建流程中。创建插件比创建 loader 更加高级，因为你将需要理解一些 webpack 底层的内部特性来做相应的钩子

### 为什么需要一个插件
- webpack基础配置无法满足需求
- 插件几乎能够任意更改webpack编译结果
- webpack内部也是通过大量内部插件实现的

### 可以加载插件的常用对象
|对象|	钩子|
|-----|-----|
|Compiler	|run,compile,compilation,make,emit,done|
|Compilation|	buildModule,normalModuleLoader,succeedModule,finishModules,seal,optimize,after-seal|
|Module| Factory	beforeResolver,afterResolver,module,parser|
|Module|	|
|Parser	|program,statement,call,expression|
|Template	|hash,bootstrap,localVars,render|

### 创建插件
webpack 插件由以下组成：
- 一个 JavaScript 命名函数。
- 在插件函数的 prototype 上定义一个 apply 方法。
- 指定一个绑定到 webpack 自身的事件钩子。
- 处理 webpack 内部实例的特定数据。
- 功能完成后调用 webpack 提供的回调。

### Compiler 和 Compilation
在插件开发中最重要的两个资源就是compiler和compilation对象。理解它们的角色是扩展webpack引擎重要的第一步。

- `compiler` 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。

- `compilation` 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

- [Compiler](https://github.com/webpack/webpack/blob/master/lib/Compiler.js)

- [Compilation](https://github.com/webpack/webpack/blob/master/lib/Compilation.js)
- [Parser](https://github.com/webpack/webpack/blob/master/lib/Compilation.js)
- [NormalModuleFactory](https://github.com/webpack/webpack/blob/master/lib/Compilation.js)

### 基本插件架构
- 插件是由「具有 apply 方法的 `prototype` 对象」所实例化出来的。
- 这个 `apply` 方法在安装插件时，会被 `webpack compiler` 调用一次。
- `apply` 方法可以接收一个 `webpack compiler` 对象的引用，从而可以在回调函数中访问到 `compiler` 对象

webpack/lib/webpack.js:35
```js
if (options.plugins && Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
        plugin.apply(compiler);
    }
}
```
一个简单的插件结构如下：
```js
class DonePlugin{
    constructor(options) {
        this.options=options;
    }
    apply(compiler) {
        compiler.hooks.done.tap('DonePlugin', ()=> {
            console.log('Hello ',this.options.name);
        });
    }
}
module.exports=DonePlugin;
```
然后，要安装这个插件，只需要在你的 webpack 配置的 plugin 数组中添加一个实例：
```js
const DonePlugin=require('./plugins/DonePlugin');
module.exports={
    entry: './src/index.js',
    output: {
        path: path.resolve('build'),
        filename:'bundle.js'
    },
    plugins: [
        new DonePlugin({name:'zfpx'})
    ]
}
```
webpack/lib/Compiler.js:251
```js
this.emitRecords(err => {
    if (err) return finalCallback(err);
        this.hooks.done.callAsync(stats, err => {});
});
```
### 访问 compilation 对象
使用 compiler 对象时，你可以绑定提供了编译 compilation 引用的回调函数，然后拿到每次新的 compilation 对象。这些 compilation 对象提供了一些钩子函数，来钩入到构建流程的很多步骤中。
```js
class CompilationPlugin{
    constructor(options) {
        this.options=options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('CompilationPlugin',function (compilation) {
            compilation.hooks.optimize.tap('optimize',function () {
                console.log('资源正在被优化');
            });
        });
    }
}
module.exports=CompilationPlugin;
```
webpack/lib/Compiler.js:496
```js
newCompilation(params) {
        const compilation = this.createCompilation();
        this.hooks.compilation.call(compilation, params);
        return compilation;
    }
```
webpack/lib/Compilation.js:1183
```js
seal(callback) {
        this.hooks.seal.call();
        this.hooks.optimize.call();
}
```
关于 compiler, compilation 的可用回调，和其它重要的对象的更多信息，请查看 [插件](https://doc.webpack-china.org/api/plugins/) 文档。

### 异步编译插件
有一些编译插件中的步骤是异步的，这样就需要额外传入一个 callback 回调函数，并且在插件运行结束时，必须调用这个回调函数
```js
class CompilationAsyncPlugin{
    constructor(options) {
        this.options=options;
    }
    apply(compiler) {
        compiler.hooks.emit.tapAsync('EmitPlugin',function (compilation,callback) {
            setTimeout(function () {
                console.log('异步任务完成');
                callback();
            },500);
        });
    }
}
module.exports=CompilationAsyncPlugin;
```
emit事件在即将写入文件前触发 webpack/lib/Compiler.js:364
```js
this.hooks.emit.callAsync(compilation, err => {
    if (err) return callback(err);
    outputPath = compilation.getPath(this.outputPath);
    this.outputFileSystem.mkdirp(outputPath, emitFiles);
});
```
### 输出文件列表
```js
class FileListPlugin{
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.emit.tap('FileListPlugin', (compilation) =>{
            let filelist='## 文件列表';
            filelist = Object.keys(compilation.assets).reduce((filelist,filename)=>filelist+'\r\n- '+filename,filelist);
            compilation.assets[this.options.name?this.options.name:'filelist.md']={
                source() {
                    return filelist;
                },
                size() {
                    return filelist.length
                }
            }
        });
    }
}
module.exports=FileListPlugin;
```
### InlineWebpackPlugin
有些时候我们希望把脚本和样式单独内联在HTML页面里面
- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
- [html-webpack-inline-source-plugin](https://github.com/DustinJackson/html-webpack-inline-source-plugin)

```js
class InlineWebpackPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('InlineWebpackPlugin', compilation => {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('InlineWebpackPlugin', (htmlPluginData, callback) => {
                if (!this.options.inlineSource) {
                    return callback(null, htmlPluginData);
                }
                console.log(htmlPluginData);
                /**
                 * { head:[ { tagName: 'link',
                              selfClosingTag: false,
                              voidTag: true,
                              attributes: [Object] } ],
                    body: [ { tagName: 'script', closeTag: true, attributes: [Object] } ],
                 */
                htmlPluginData = this.processTags(compilation, htmlPluginData);
                callback(null, htmlPluginData);
            });
        });
    }
    processTags(compilation, htmlPluginData) {
        htmlPluginData.head = htmlPluginData.head.map(tag => this.processTag(compilation, tag));
        htmlPluginData.body = htmlPluginData.body.map(tag => this.processTag(compilation, tag));
        return htmlPluginData;
    }
    processTag(compilation, tag) {
        let inlineSource = this.options.inlineSource;
        let assetUrl;
        if (tag.tagName == 'link' && inlineSource.test(tag.attributes.href)) {
            assetUrl = tag.attributes.href;
            tag = {
                tagName: 'style',
                closeTag: true,
                attributes: { type: 'text/css' }
            }
        } else if (tag.tagName == 'script' && inlineSource.test(tag.attributes.src)) {
            assetUrl = tag.attributes.src;
            tag = {
                tagName: 'script',
                closeTag: true,
                attributes: { type: 'text/javascript' }
            }
        }
        if (assetUrl) {
            let asset = compilation.assets[assetUrl];
            tag.innerHTML = asset.source();
            delete compilation.assets[assetUrl];
        }
        return tag;
    }
}

module.exports = InlineWebpackPlugin;
```
webpack.config.js
```js
const InlineWebpackPlugin = require('./plugins/InlineWebpackPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    entry: "./src/index.js",
    output: {
        path: resolve("dist"),
        filename: "bundle.js"
    },
    resolveLoader: {
        modules: [path.resolve('./loaders'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new InlineWebpackPlugin({
            inlineSource: /\.(js|css)$/
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
}
```
### 自动上传资源文件到CDN
- [qiniu](https://developer.qiniu.com/kodo/sdk/1289/nodejs)

```js
const qiniu = require('qiniu');
const path = require('path');
const fs = require('fs');

class UploadPlugin {
    constructor(options = {}) {
        let { bucket = '', domain = "", accessKey = '', secretKey = '' } = options;
        let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket });
        this.uploadToken = putPolicy.uploadToken(mac);
        let config = new qiniu.conf.Config();
        this.formUploader = new qiniu.form_up.FormUploader(config);
        this.putExtra = new qiniu.form_up.PutExtra();
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tapPromise('UploadPlugin', compilation => {
            let assets = compilation.assets;
            let promises = Object.entries(assets).map(([key, value]) => this.upload(key, value.source()));
            return Promise.all(promises);
        });
    }
    upload(key, value) {
        console.log('value', value)
        return new Promise((resolve, reject) => {
            this.formUploader.put(this.uploadToken, key, value, this.putExtra, (err, body, info) => {
                err ? reject(err) : resolve(body);
            });
        });
    }
}
module.exports = UploadPlugin;
```
```js
new UploadPlugin({
    bucket: 'cnpmjs',
    domain: "img.zhufenpeixun.cn",
    accessKey: 'fi5imW04AkxJItuFbbRy1ffH1HIoo17HbWOXw5fV',
    secretKey: 'ru__Na4qIor4-V7U4AOJyp2KBUYEw1NWduiJ4Pby'
})
```

### 自动外链

#### 使用外部类库
- 手动指定 external
- 手动引入 script

能否检测代码中的import自动处理这个步骤?

#### 思路
解决import自动处理external和script的问题，需要怎么实现，该从哪方面开始考虑

- `依赖` 当检测到有`import`该`library`时，将其设置为不打包类似exteral,并在指定模版中加入script,那么如何检测import那？这里就用`Parser`
- `external依赖` 需要了解external是如何实现的，webpack的external是通过插件ExternalsPlugin实现的，ExternalsPlugin通过 `tap NormalModuleFactory` 在每次创建Module的时候判断是否是`ExternalModule`
- webpack4加入了模块类型之后，Parser获取需要指定类型moduleType,一般使用`javascript/auto`即可

#### 使用plugins
```js
plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename:'index.html'
        }),
        new AutoExternalPlugin({
            jquery: {
                expose: '$',
                url: 'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
            }
        })
    ]
```
```js
const ExternalModule = require('webpack/lib/ExternalModule');
class AutoExternalPlugin {
    constructor(options) {
        this.options = options;
        this.externalModules = {};
    }
    apply(compiler) {
        //1.在解析语法树的过程中查找那些需要外部引入的模块名称
        compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin', normalModuleFactory => {
            normalModuleFactory.hooks.parser
                .for('javascript/auto')
                .tap('AutoExternalPlugin', parser => {
                    parser.hooks.import.tap('AutoExternalPlugin', (statement, source) => {
                        if (this.options[source])
                            this.externalModules[source] = true;
                    });
                });
            //2.在生产模块的过程中发现如果是外部模块则返回外部模块
            normalModuleFactory.hooks.factory.tap('AutoExternalPlugin', factory => (data, callback) => {
                const dependency = data.dependencies[0];
                let value = dependency.request;
                if (this.externalModules[value]) {
                    let varName = this.options[value].expose;
                    callback(null, new ExternalModule(varName, 'window'));
                } else {
                    factory(data, callback);
                }
            });
        });
        compiler.hooks.compilation.tap('AutoExternalPlugin', compilation => {
            //3.向body底部插入全局变量的脚本
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('normalModuleFactory', (htmlPluginData, callback) => {
                Object.values(this.externalModules).forEach(src => {
                    htmlPluginData.body.unshift({
                        tagName: 'script',
                        closeTag: true,
                        attributes: { type: 'text/javascript', src }
                    });
                });
            });
        });
    }
}
module.exports = AutoExternalPlugin;
```
### 核心流程
```js
- webpack-cli/cli.js   compiler = webpack(options);
- webpack/webpack.js compiler = `new Compiler`(options.context);
- webpack-cli/cli.js   compiler.`run`(compilerCallback);
- Compiler.js `run`(callback)
-             this.hooks.`beforeRun`.callAsync
-             this.hooks.`run`.callAsync
-             this.`readRecords`
-             this.`compile`(onCompiled);
-             const params = this.newCompilationParams();
-             this.hooks.`beforeCompile`.callAsync
-             this.hooks.`compile`.call(params);
-             const compilation = this.newCompilation(params);
-             this.hooks.`make`.callAsync
- SingleEntryPlugin.js compilation.addEntry(context, dep, name, callback);
- Compilation.js addEntry
-                this._addModuleChain
-                const moduleFactory = this.dependencyFactories.get(Dep);
-                moduleFactory.create
- NormalModuleFactory create(data, callback)
-                      this.hooks.`beforeResolve`.callAsync
-                      const factory = this.hooks.factory.call(null);
-                      factory(result, (err, module)
-                      let resolver = this.hooks.resolver.call(null);
-                      resolver(result
-                      this.hooks.resolver.tap("NormalModuleFactory"
-                      const result = this.ruleSet.exec({
-                     getParser(type, parserOptions) 
-                     this.hooks.afterResolve.callAsync
-                     let createdModule = this.hooks.createModule.call(result);
-                     createdModule = new NormalModule(result);
-                     createdModule = this.hooks.`module`.call(createdModule, result); 
- Compilation.js      const addModuleResult = this.addModule(module);
-                     this.buildModule(module
-                     this.hooks.buildModule.call(module);
-                     module.build(
- NormalModule.js     build(options, compilation, resolver, fs, callback) 
-                     return this.doBuild(options, compilation, resolver, fs
-                     runLoaders()
-                     this._source = this.createSource(
-                     this._ast =
-                      const result = this.parser.parse(this._ast
- Compilation.js      this.hooks.succeedModule.call(module);
-                        this.processModuleDependencies
-                          if (module) 
- Compiler.js        compilation.finish()
-                    compilation.seal
-                    this.hooks.afterCompile 

```

------------
### 参考
- [Node.js SDK](https://developer.qiniu.com/kodo/sdk/1289/nodejs)
- [writing-a-plugin](https://webpack.js.org/contribute/writing-a-plugin/)
- [api/plugins](https://webpack.js.org/api/plugins/)
- [插件 API](http://www.css88.com/doc/webpack2/api/plugins/)