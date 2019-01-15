---
title: AST
copyright: true
date: 2019-01-14 17:29:38
tags: ['AST','抽象语法树']
---
## 抽象语法树(Abstract Syntax Tree)
**webpack**和**Lint**等很多的工具和库的核心都是通过**Abstract Syntax Tree**抽象语法树这个概念来实现对代码的`检查`、`分析`等操作的。通过了解抽象语法树这个概念，你也可以随手编写类似的工具

## 抽象语法树用途
- 代码语法的检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等
    - 如JSLint、JSHint对代码错误或风格的检查，发现一些潜在的错误
    - IDE的错误提示、格式化、高亮、自动补全等等
- 代码混淆压缩
    - UglifyJS2等
- 优化变更代码，改变代码结构使达到想要的结构
    - 代码打包工具webpack、rollup等等
    - CommonJS、AMD、CMD、UMD等代码规范之间的转化
    - CoffeeScript、TypeScript、JSX等转化为原生Javascript

## 抽象语法树定义
这些工具的原理都是通过`JavaScript Parser`把代码转化为一颗抽象语法树（`AST`），这颗树定义了`代码的结构`，通过操纵这颗树，我们可以精准的定位到`声明语句`、`赋值语句`、运算语句等等，实现对代码的分析、优化、变更等操作

>在计算机科学中，抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。
>Javascript的语法是为了给开发者更好的编程而设计的，但是不适合程序的理解。所以需要转化为AST来更适合程序分析，浏览器编译器一般会把源码转化为AST来进行进一步的分析等其他操作。
![ast-2019115103639](http://b.zhangyapeng.club/ast-2019115103639.jpg)
## 抽象语法树的生成过程（编译）
![1675f140480d7f78-2019115102522](http://b.zhangyapeng.club/1675f140480d7f78-2019115102522.webp)
--------
### js为例
- `词法分析`（lexical analysis）：进行词法分析的程序或者函数叫作词法分析器（Lexical analyzer，简称Lexer），也叫扫描器（Scanner，例如typescript源码中的scanner.ts），字符流转换成对应的`Token流`。
- `tokenize`：tokenize就是按照一定的规则，例如token令牌（通常代表``关键字`，变量名`，`语法符号`等），将代码分割为一个个的**串**，也就是语法单元）。涉及到词法解析的时候，常会用到tokennize。
- `语法分析`（parse analysis）：是编译过程的一个逻辑阶段。语法分析的任务是在词法分析的基础上将单词序列组合成`语法树`，如“程序”，“语句”，“表达式”等等.语法分析程序判断源程序在结构上是否正确。源程序的结构由上下文无关文法描述。

```js
const a = 1;
const b = a + 1;
```
### 编译过程

![js转换AST流程图-201911510340](http://b.zhangyapeng.club/js转换AST流程图-201911510340.webp)

- `词法解析过程`：一边扫描源代码一边进行分类，例如扫描到第一行`const a = 1`,首先扫描到`const`，会生成一个语法单元说这是关键字`const`，接着扫描到`a`，这是变量名`a`，接着操作符`=`，接着常量`1`，等等，构成一个个`token流`。

- `语法分析过程`：将`token流转化`为一个有元素层级嵌套所组成的代表程序语法结构的树，这个树被叫做`抽象语法树AST`。


## JavaScript Parser
- **JavaScript Parser:**把js源码转化为抽象语法树的解析器
- 浏览器会把`js源码`通过解析器转为`抽象语法树`，再进一步转化为`字节码`或直接`生成机器码`。
- 一般来说每个js引擎都会有自己的抽象语法树格式，`Chrome的v8引擎`，`firefox的SpiderMonkey`引擎等等，MDN提供了详细`SpiderMonkey AST format`的详细说明，算是业界的标准。

### 常用的JavaScript Parser有
- esprima
- traceur
- acorn(babel和webpack的实现)
- shift

------------
## esprima
- 通过 [esprima](https://www.npmjs.com/package/esprima) 把源码转化为AST
- 通过 [estraverse](https://www.npmjs.com/package/estraverse) 遍历并更新AST
- 通过 [escodegen](https://www.npmjs.com/package/escodegen) 将AST重新生成源码
- [astexplorer](https://astexplorer.net/)

```sh
cnpm i esprima estraverse escodegen- S
```
```js
let esprima = require('esprima');
var estraverse = require('estraverse');
var escodegen = require("escodegen");
let code = 'function ast(){}';
let ast=esprima.parse(code);
let indent=0;
function pad() {
    return ' '.repeat(indent);
}
estraverse.traverse(ast,{
    enter(node) {
        console.log(pad()+node.type);
        if(node.type == 'FunctionDeclaration'){
            node.id.name = 'ast_rename';
        }
        indent+=2;
     },
    leave(node) {
        indent-=2;
        console.log(pad()+node.type);

     }
 });
let generated = escodegen.generate(ast);
console.log(generated);
```
```sh
Program
  FunctionDeclaration
    Identifier
    Identifier
    BlockStatement
    BlockStatement
  FunctionDeclaration
Program
```

## 转换箭头函数
- 访问者模式`Visitor` 对于某个对象或者一组对象，不同的访问者，产生的结果不同，执行操作也不同
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [babel-types](https://github.com/babel/babel/tree/master/packages/babel-types)它包含了构造、验证以及变换 AST 节点的方法
- [babel-types-api](https://babeljs.io/docs/en/next/babel-types.html)
- [Babel 插件手册](https://github.com/brigand/babel-plugin-handbook/blob/master/translations/zh-Hans/README.md#asts)
- [babeljs.io](https://babeljs.io/en/repl.html)
- [babel-plugin-transform-es2015-arrow-functions](https://www.npmjs.com/package/babel-plugin-transform-es2015-arrow-functions)

转换前
```js
const sum = (a,b)=>a+b
```
![arrow-left-2019115111231](http://b.zhangyapeng.club/arrow-left-2019115111231.png)
转换后
```js
var sum = function sum(a, b) {
  return a + b;
};
```
![arrow-right-2019115111311](http://b.zhangyapeng.club/arrow-right-2019115111311.png)
实现
```js
let babel = require('@babel/core');
let t = require('babel-types'); //
const code = `const sum = (a,b)=>a+b`;
// path.node  父节点
// path.parentPath 父路径
let transformArrowFunctions = {
    visitor: {
        ArrowFunctionExpression: (path, state) => {
            let node = path.node;
            let id = path.parent.id;
            let params = node.params;
            let body=t.blockStatement([
                t.returnStatement(node.body)
            ]);
            let functionExpression = t.functionExpression(id,params,body,false,false);
            path.replaceWith(functionExpression);
        }
    }
}
const result = babel.transform(code, {
    plugins: [transformArrowFunctions]
});
console.log(result.code);
```
## 预计算babel插件
转换前
```js
const result = 1 + 2;
```
![precalcleft-2019115111447](http://b.zhangyapeng.club/precalcleft-2019115111447.png)
转换后
```js
const result = 3;
```
![precalcright-2019115111519](http://b.zhangyapeng.club/precalcright-2019115111519.png)
实现
```js
let babel = require('@babel/core');
let t=require('babel-types');
let preCalculator={
    visitor: {
        BinaryExpression(path) {
            let node=path.node;
            let left=node.left;
            let operator=node.operator;
            let right=node.right;
            if (!isNaN(left.value) && !isNaN(right.value)) {
                let result=eval(left.value+operator+right.value);
                path.replaceWith(t.numericLiteral(result));
                if (path.parent&& path.parent.type == 'BinaryExpression') {
                    preCalculator.visitor.BinaryExpression.call(null,path.parentPath);
                }
            }
        }
    }
}


const result = babel.transform('const sum = 1+2+3',{
    plugins:[
        preCalculator
    ]
});
console.log(result.code);
```
## 把类编译为Function
- [babel-plugin-transform-es2015-classes](https://www.npmjs.com/package/babel-plugin-transform-es2015-classes) 

es6
```js
  class Person {
      constructor(name) {
          this.name=name;
      }
      getName() {
          return this.name;
      }
  }
```
![classast-2019115112715](http://b.zhangyapeng.club/classast-2019115112715.png)
es5
```js
function Person(name) {
    this.name=name;
}
Person.prototype.getName=function () {
    return this.name;
}

```
![es5class1-2019115112759](http://b.zhangyapeng.club/es5class1-2019115112759.png)
实现
```js
let babel = require('@babel/core');
let t=require('babel-types');
let source=`
    class Person {
        constructor(name) {
            this.name=name;
        }
        getName() {
            return this.name;
        }
    }
`;
let ClassPlugin={
    visitor: {
        ClassDeclaration(path) {
            let node=path.node;
            let id=node.id;
            let constructorFunction = t.functionDeclaration(id,[],t.blockStatement([]),false,false);
            let methods=node.body.body;
            let functions = [];
            methods.forEach(method => {
                if (method.kind == 'constructor') {
                    constructorFunction = t.functionDeclaration(id,method.params,method.body,false,false);
                    functions.push(constructorFunction);
                } else {
                    let memberObj=t.memberExpression(t.memberExpression(id,t.identifier('prototype')),method.key);
                    let memberFunction = t.functionExpression(id,method.params,method.body,false,false);
                    let assignment = t.assignmentExpression('=',memberObj,memberFunction);
                    functions.push(assignment);
                }
            });
            if (functions.length ==1) {
                path.replaceWith(functions[0]);
            } else {
                path.replaceWithMultiple(functions);
            }
        }
    }
}


const result = babel.transform(source,{
    plugins:[
        ClassPlugin
    ]
});
console.log(result.code);
```

## webpack babel插件
```js
var babel = require("@babel/core");
let { transform } = require("@babel/core");
```
### 实现按需加载
```js
import { flatten,concat } from "lodash"
```
![treeshakingleft-2019115112955](http://b.zhangyapeng.club/treeshakingleft-2019115112955.png)
转换为
```js
import flatten from "lodash/flatten";
import concat from "lodash/flatten";
```
![treeshakingright-2019115113021](http://b.zhangyapeng.club/treeshakingright-2019115113021.png)

### webpack配置
```sh
cnpm i webpack webpack-cli -D
```
```js
const path=require('path');
module.exports={
    mode:'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename:'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins:[['import',{library:'lodash'}]]
                    }
                }
            }
        ]
    }
}
```
编译顺序为首先`plugins`从左往右,然后`presets`从右往左
### babel插件 
`babel-plugin-import.js`放置在`node_modules`目录下
```js
let babel = require('@babel/core');
let types = require('babel-types');
const visitor = {
    ImportDeclaration:{
        enter(path,state={opts}){
            const specifiers = path.node.specifiers;
            const source = path.node.source;
            if(state.opts.library == source.value && !types.isImportDefaultSpecifier(specifiers[0])){
                const declarations = specifiers.map((specifier,index)=>{
                    return types.ImportDeclaration(
                        [types.importDefaultSpecifier(specifier.local)],
                        types.stringLiteral(`${source.value}/${specifier.local.name}`)
                    )
                });
                path.replaceWithMultiple(declarations);
            }
        }
    }
}
module.exports = function(babel){
    return {
        visitor
    }
}
```
---------------------
## 参考
- [AST抽象语法树](https://juejin.im/post/5bff941e5188254e3b31b424)
- [Babel 插件手册](https://github.com/brigand/babel-plugin-handbook/blob/master/translations/zh-Hans/README.md#asts)
- [babel-types](https://github.com/babel/babel/tree/master/packages/babel-types)
- [不同的parser解析js代码后得到的AST](https://astexplorer.net/)
- [在线可视化的看到AST](http://resources.jointjs.com/demos/javascript-ast)
- [babel从入门到入门的知识归纳](https://zhuanlan.zhihu.com/p/28143410)
- [Babel 内部原理分析](https://octman.com/blog/2016-08-27-babel-notes/)
- [babel-plugin-react-scope-binding](https://github.com/chikara-chan/babel-plugin-react-scope-binding)
- [transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译,启用插件 babel-plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数
- [ast-spec](https://github.com/babel/babylon/blob/master/ast/spec.md)
- [babel-handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/README.md)

