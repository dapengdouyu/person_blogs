---
title: test-1
copyright: true
date: 2018-12-03 14:38:34
tags: ['测试','单元测试']
---
## 测试
- **单元测试**是用来对一个`模块`、一个`函数`或者一个`类`来进行正确性检验的测试工作
- **端到端测试(e2e)**是组件之间的配合(功能测试) -（整体,完整，所有功能的测试）

## 测试用例:
- 输入-> 期待输出的过程

## 测试过程

### 手工测试
```js
//qs.js
function parse(str){
     let arr = str.split('&');
    let obj = {};
    arr.forEach((item) => {
        let [key, val] = item.split('=');
        obj[key] = val;
    });
    return obj;
}
exports.parse=parse
```
```js
//qs.test.js
console.log(parse('name=zyp').name==='zyp')
console.log(parse('name=zyp&age=9').name==='zyp')
```
#### 缺点：

- **污染**源代码里混杂了很多测试代码
- **零散**杂乱无章，不能分组和分类	
- 没有**持久化**,没有存储
- **手动**跑测试比较麻烦

### assert断言
- **断言**是表达设计人员对于系统应达到状态的一种**预期**
- 各种语言都内置了**断言**的接口
- **断言**是单元测试的核心

```js
// const assert=require("assert")
const assert=(expression,message)=>{
    if(!expression){
        throw new Error(message)
    }
}
assert(parse('name=zyp').name==='zyp','姓名必须是zyp')
assert(parse('name=zyp&age=9').age===9,'年龄必须是9')
```

|问题|	解决方案|
|----|----|
|污染 源代码里混杂了很多测试代码|	从源代码中抽离出去|
|零散 杂乱无章，不能分组和分类|	整体规划 和设计|
|没有持久化 没有存储|	把测试文件单独存放|
|手动跑测试比较麻烦	|自动运行并显示结果|

### 测试框架
正因为这些问题，测试框架应运而生
- 通过测试框架，我们可以**分离测试代码**和**源代码**
- 测试框架可以**自动**运行所有的用例并输出结果
- 测试框架可能提高编写测试代码的**效率**

### 开发模式
#### 瀑布模式
- 分析需求
- 调试开发
- 测试发布
#### TDD(测试驱动开发)
- 在TDD理念中，先有测试代码再有功能逻辑代码
- 包括测试用例和断言
- 分为模块测试和单元测试
- 有其使用场景，不能滥用 (当用户需求**模糊**的时候不能用)
- 在实际开发中一般会使用测试框架

大概的流程是先针对每个功能点抽象出接口代码，然后编写**单元测试代码**，接下来**实现接口**，运行**单元测试代码**，循环此过程，直到整个**单元测试都通过**。
- 分析需求
- 任务、模块分解
- 编写测试用例,尽量穷尽和考虑所有边界
- 快速构建代码跑通测试用例
- 重构代码
- 功能测试、发布

#### BDD(行为驱动开发)
- 在TDD中，我们并不能完全保证根据设计所编写的测试就是**用户**所期望的功能。
- BDD将这一部分简单和自然化，用**自然语言**来描述，让**开发**、**测试**、**BA**以及**客户**都能在这个基础上达成一致。

### 常用测试框架
- [qunit](https://github.com/qunitjs/qunit) jQuery
- [mocha](https://github.com/mochajs/mocha) 支持Node&Browser express.js
- [jasmine](https://github.com/jasmine/jasmine) 支持Node&Browser Vue.js
- [karma](https://github.com/karma-runner/karma) A Test-Runner 在不同的浏览器中跑测试用例 Angular
- [jest](https://github.com/facebook/jest) React
    - 零配置
    - 内置代码覆盖率
    - 内置Mocks

[TDD与BDD](https://juejin.im/entry/58627476b123db0065c689d3)