---
title: Mocha与chai
copyright: true
date: 2018-12-03 15:33:41
tags: ['单元测试']
---
## Mocha 的简介
Mocha是流行的JavaScript测试框架之一，通过它添加和运行测试，从而保证代码质量
### Mocha 的安装与配置
项目中也安装Mocha
```sh
npm install --save-dev mocha
```
在**package.json**中加入下面脚本
```json
"scripts": {
    "test": "mocha"
}
```
### 测试模块

- 测试脚本里面应该包括一个或多个**describe**块，每个**describe**块应该包括一个或多个**it**块。
- **describe**块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。
- **it**块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。

### chai
- Mocha本身不带断言库，所以必须先引入断言库。mocha经常和chai这个**断言库**一起配合使用
- chai支持expect语法和should语法的BDD接近自然语言的写法和常规的asset语法
```js
var {expect} = require('chai');
expect(add(1, 1)).to.be.equal(2);
```
[相关api参考](http:/chaijs.com)

### mocha 参数
- Mocha默认运行**test**子目录里面的测试脚本(后缀名为`.test.js`（表示测试）或者`.spec.js`)。所以，一般都会把测试脚本放在**test**目录里面,但是test子目录下面的测试脚本不执行。
```sh
mocha --recursive
```
- `--help`或`-h`参数，用来查看Mocha的所有命令行参数
```sh
mocha --help
```
- `--reporter`参数用来指定测试报告的格式，默认是**spec**格式。使用[mochawesome](http://adamgruber.github.io/mochawesome/)模块，可以生成漂亮的HTML格式的报告
```sh
mocha --reporter mochawesome
```
- `--watch`参数用来监视指定的测试脚本。只要测试脚本有变化，就会自动运行Mocha
```sh
mocha --watch
```
- Mocha允许在test目录下面，放置配置文件**mocha.opts**,把命令行参数写在里面
```opts
--reporter tap
--recursive
--growl
```
- [--require](https://github.com/mochajs/mocha/wiki/compilers-deprecation)参数指定测试脚本的转码器
```sh
mocha --require @babel/register
```
**注意**，Babel默认不会对Iterator、Generator、Promise、Map、Set等全局对象，以及一些全局对象的方法（比如Object.assign）转码。如果你想要对这些对象转码，就要安装babel-polyfill。
然后，在你的脚本头部加上一行。
```js
import 'babel-polyfill'
```
- Mocha默认会高亮显示超过75毫秒的测试用例，可以用-s或--slow调整这个参数。
```sh
$ mocha -t 5000 -s 1000 timeout.test.js
```
- Mocha默认每个测试用例最多执行2000毫秒，如果到时没有得到结果，就报错.需要用-t或--timeout参数，改变默认的超时设置
```sh
$ mocha -t 5000 timeout.test.js
```


### 测试用例的钩子
Mocha在describe块之中，提供测试用例的四个钩子：`before()`、`after()`、`beforeEach()`和`afterEach()`。它们会在指定时间执行。
```js
describe('hooks', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
});
```
### 参考
- [单元测试框架mocha](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
- [断言库chai](https://www.chaijs.com/)
- [代理HTTP请求supertest](https://npmjs.com/package/supertest)