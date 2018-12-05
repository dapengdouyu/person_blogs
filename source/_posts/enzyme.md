---
title: enzyme
copyright: true
date: 2018-12-04 18:13:24
tags: ['enzyme',"jest","react"]
---
## react的单元测试之Enzyme
React官方已经提供了一个测试工具库：[react-dom/test-utils](https://reactjs.org/docs/test-utils.html)
只是用起来不够方便，于是有了一些第三方的封装库，比如Airbnb公司的[Enzyme](https://github.com/airbnb/enzyme)

## 测试项目的配置
```sh
npm install --save-dev enzyme
```
而enzyme还需要根据React的版本安装适配器，适配器对应表如下：
|Enzyme Adapter Package|	React semver compatibility|
|----|----|
|enzyme-adapter-react-16|	^16.0.0|
|enzyme-adapter-react-15|	^15.5.0|
|enzyme-adapter-react-15.4|	15.0.0-0 - 15.4.x|
|enzyme-adapter-react-14	|^0.14.0|
|enzyme-adapter-react-13	|^0.13.0|

那么因为我们安装的React版本为^16.2.0
所以需要安装：
```bash
npm install --save-dev enzyme-adapter-react-16
```
## Enzyme与Jest配合使用
现在开始用Enzyme为**example.jsx**编写测试代码：
```js
import {assert} from 'chai'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Example from '../src/example'

const {shallow}=Enzyme

Enzyme.configure({ adapter: new Adapter() })

describe('Enzyme的浅渲染测试套件', function () {
  it('Example组件中按钮的名字为text的值', function () {
    const name='按钮名'
    let app = shallow(<Example text={name} />)
    assert.equal(app.find('button').text(),name)
  })
})
```
如上面代码所示，在使用Enzyme 前需要先适配React对应的版本
```js
nzyme.configure({ adapter: new Adapter() })
```
要使用Jest运行安装文件以 适配[Enzyme Adapte](http://airbnb.io/enzyme/docs/installation/)，请在配置文件中将[setupTestFrameworkScriptFile](http://jestjs.io/docs/en/configuration)设置为字符串和设置文件的路径。
```json
{
  "jest": {
    "setupTestFrameworkScriptFile": "<rootDir>src/setupTests.js"
  }
}
```
 JEST15以后你可以通过安装babel和相关的`babel`插件就可以了可以[参考](https://github.com/vjwilson/enzyme-example-jest)



## Enzyme 的使用之浅渲染`shallow`
[Shallow Rendering](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md)（浅渲染）指的是，将一个组件渲染成**虚拟DOM对象**，但是只渲染第一层，不渲染所有**子组件**，所以处理速度非常快。它不需要DOM环境，因为根本没有加载进DOM。

shallow的函数输入组件，返回组件的浅渲染结果，而返回的结果可以用类似jquery的形式获取组件的信息。
```js
import {shallow} from 'enzyme';

describe('Enzyme Shallow', function () {
  it('App\'s title should be Todos', function () {
    let app = shallow(<App/>);
    expect(app.find('h1').text()).to.equal('Todos');
  });
};
```
上面代码中，shallow方法返回App的浅渲染，然后**app.find**方法找出h1元素，text方法取出该元素的文本。

关于**find**方法，有一个注意点，就是它只支持简单选择器，稍微复杂的一点的CSS选择器都不支持。
```js

component.find('.my-class'); // by class name
component.find('#my-id'); // by id
component.find('td'); // by tag
component.find('div.custom-class'); // by compound selector
component.find(TableRow); // by constructor
component.find('TableRow'); // by display name
```

## Enzyme 的使用之`mount`
mount方法用于将React组件加载为**真实DOM节点**。

然而真实DOM需要一个浏览器环境，为了解决这个问题，我们可以用到**jsdom**.

也就是说我们可以用jsdom模拟一个浏览器环境去加载真实的DOM节点。

首先安装**jsdom**：
```sh
npm install --save-dev jsdom
```
```js
import {mount} from 'enzyme';

describe('Enzyme Mount', function () {
  it('Delete Todo', function () {
    let app = mount(<App/>);
    let todoLength = app.find('li').length;
    app.find('button.delete').at(0).simulate('click');
    expect(app.find('li').length).to.equal(todoLength - 1);
  });
});
```
## Enzyme 的使用之`render`
而Enzyme还提供了一个不需要`jsdom`模拟环境解决子组件测试的方法：**render**。

意思就是说render方法将React组件渲染成静态的HTML字符串，然后分析这段HTML代码的结构，返回一个**对象**。它跟shallow方法非常像，主要的不同是采用了第三方HTML解析库**Cheerio**，它返回的是一个**Cheerio实例对象**。
```js

import {render} from 'enzyme';

describe('Enzyme Render', function () {
  it('Todo item should not have todo-done class', function () {
    let app = render(<App/>);
    expect(app.find('.todo-done').length).to.equal(0);
  });
});
```
在上面代码中，你可以看到，**render**方法与**shallow**方法的API基本是一致的。 Enzyme的设计就是，让不同的底层处理引擎，都具有同样的API（比如find方法）。

## shallow ,render和mount的效率对比
- shallow果然最快，这是肯定的，但是因为shallow的局限性，我们可能更想知道render和mount的效率。
- 事实证明，render的效率是mount的两倍。
- mount存在的价值是什么，render就可以测试子组件，render还不需要jsdom和额外的配置。
- 当然是有价值的，**shallow**和**mount**因为都是dom对象的缘故，所以都是可以**模拟交互**的，比如
```js
const nav = mount(<Nav />)
 nav.find('a').simulate('click')
```
而render是不能的。

## 小结
简而言之，Enzyme主要包括三个测试：

- 一个是浅渲染的shallow，这个生成虚DOM对象，所以渲染最快，然而它并不能测试子组件的相关代码。

- 另一个是DOM渲染mount，它会生成完整的DOM节点，所以可以测试子组件。但是要依赖一个用jsdom模拟的浏览器环境。

- 最后一个是HTML文本渲染render，它会将react组件渲染为html文本，然后在内部通过Cheerio自动生成一个Cheerio对象。

|渲染方法|	是否可以测试子组件|	是否可以模拟交互|	性能（测试500次）|
|----|----|----|----|
|shallow|	否	|是	|116ms|
|mount	|是	|是	|421ms|
|render|	是|	否	|984ms|

## api
下面是Enzyme的一部分API，你可以从中了解它的大概用法。
- .get(index)：返回指定位置的子组件的DOM节点
- .at(index)：返回指定位置的子组件
- .first()：返回第一个子组件
- .last()：返回最后一个子组件
- .type()：返回当前组件的类型
- .text()：返回当前组件的文本内容
- .html()：返回当前组件的HTML代码形式
- .props()：返回根组件的所有属性
- .prop(key)：返回根组件的指定属性
- .state([key])：返回根组件的状态
- .setState(nextState)：设置根组件的状态
- .setProps(nextProps)：设置根组件的属性

## 参考
- [react的单元测试之Enzyme](https://www.cnblogs.com/vvjiang/p/8599980.html)
- [Enzyme](https://airbnb.io/enzyme/)
- [React 测试入门教程](http://www.ruanyifeng.com/blog/2016/02/react-testing-tutorial.html)
- [React应用下的单元测试](http://www.aliued.com/?p=4095)
- [ jest + enzyme](https://www.cnblogs.com/susu8/p/9512393.html)
