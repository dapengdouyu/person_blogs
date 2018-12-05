---
title: Jest
copyright: true
date: 2018-12-04 15:52:57
tags: ['单元测试','test']
---
## Jest 
[jest](https://facebook.github.io/jest/docs/en/expect.html)是由Facebook发布的开源的、基于[Jasmine](http://jasmine.github.io/)的JavaScript单元测试框架，可以测试 javascipt 和 react。 集成了的Mocha和chai，jsdom，sinon等功能。
### 为什么选择Jest？
- Jest 可以利用其特有的[快照测试](https://jestjs.io/docs/zh-Hans/snapshot-testing.html#content)功能，通过比对 UI 代码生成的快照文件，实现对 React 等常见框架的自动测试。此外， Jest 的测试用例是并行执行的，而且只执行发生改变的文件所对应的测试，提升了测试速度

- 安装配置简单，非常容易上手，几乎是**零配置**的，通过npm 命令安装就可以直接运行了

- Jest 内置了测试覆盖率工具[istanbul](https://github.com/gotwarlost/istanbul)，可以通过命令开启或者在 package.json 文件进行更详细的[配置](https://link.juejin.im/?target=http%3A%2F%2Ffacebook.github.io%2Fjest%2Fdocs%2Fzh-Hans%2Fconfiguration.html%23collectcoverage-boolean)。运行 istanbul 除了会再终端展示测试覆盖率情况，还会在项目下生产一个 coverage 目录，内附一个测试覆盖率的报告，让我们可以清晰看到分支的代码的测试情况。

- 集成了**断言库**，不需要再引入第三方的断言库，并且非常完美的支持React组件化测试。

### 安装
```sh
cnpm i jest --save-dev 
cnpm i jest -g 
```
- 运行命令jest后会自动运行项目下所有`.test.js`和`.spec.js`这种格式的文件。
- 涉及到运用ES或react的，要与babel相结合，加上`.babelrc`文件即可，老玩法了。
- jest的配置默认只需要在`package.json`中配置即可，当然也可以用独立的配置文件。
- 我们这里直接将jest的运行范围限定在`test`文件夹下，而不是全部，所以在`package.json`中加入如下配置：
```json
 "jest": {
    "testRegex": "/test/.*.test.jsx?$"
 }
```

### 运行
```sh
jest npm jest 
npm test
```
### 配置
#### 配置位置
- package.json
- jest.config.js
- 命令行
#### 配置项
- testMatch glob规则,识别哪些文件中测试文件
- testRegex 文件正则
- testEnvironment 测试环境
- rootDir 根目录
- moduleFileExtensions 模块文件扩展名
```js
module.exports = {
    //设置识别哪些文件是测试文件（glob形式），与testRegex互斥，不能同时写
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)(spec|test).js?(x)'],
    //设置识别哪些文件是测试文件（正则形式），与testMatch互斥，不能同时写
    testRegex: '(/__tests__).*|(\\.|/)(test|spec))\\.jsx?$',
    //测试环境，默认值是：jsdom，可修改为node
    testEnvironment: 'jsdom',
    //默认值：当前目录，一般是package.json所在的目录。
    rootDir: '',
    //测试文件的类型
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
     // 运行测试前可执行的脚本（比如注册enzyme的兼容）
    setupFiles: ['<rootDir>/jest.setup.js'],
     // 运行环境下的URl
    testURL: 'http://localhost/',
    //转换时需忽略的文件
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'], 
    // 如果moduleNameMapper不能满足您的需求，那么可以使用Jest的transform配置选项来指定如何转换资产
    transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/__test__/css-transform.js',
  },
  // 是否收集测试时的覆盖率信息（默认是false,同package配置的--coverage参数）
  collectCoverage: true, 
  // 哪些文件需要收集覆盖率信息
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,mjs}'], 
  // 输出覆盖信息文件的目录
  coverageDirectory: '<rootDir>/test/coverage', 
  // 统计覆盖信息时需要忽略的文件
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/index.jsx'], 
  moduleNameMapper: { // 需要mock处理掉的文件，比如样式文件 },
}
```
关于`transfrom`的配置可以[参考](https://jestjs.io/docs/zh-Hans/tutorial-react#custom-transformers)
### jest.setup.js
```js
/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```
### 基本用法
和之前介绍的**mocha**和**chai**的功能很像，甚至可以兼容部分**mocha**和**chai**的语法。
可以这么写
```js
import React from 'react'
import { shallow } from 'enzyme'
import CommentItem from './commentItem'

describe('测试评论列表项组件', () => {
  // 这是mocha的玩法，jest可以直接兼容
  it('测试评论内容小于等于200时不出现展开收起按钮', () => {
    const propsData = {
      date: '2018-03-04 10:10:11',
      name: '匿名人',
      content: '测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题'
    }
    const item = shallow(<CommentItem {...propsData} />)
    //看到这里的断言了吗，实际上和chai的expect是很像的
    expect(item.find('.btn-expand').length).toBe(0);
  })



  // 这是jest的玩法，推荐用这种
  test('两数相加结果为两个数字的和', () => {
    expect(3).toBe(3);
  });
}
```
### jest的[mock](https://facebook.github.io/jest/docs/en/mock-functions.html)
两种方式的**Mock Function**，一种是利用**Jest**提供的**Mock Function**创建，另外一种是**手动创建来**覆写本身的依赖实现
- **Mocks**可以擦除函数的实际实现来测试代码之间的链接
- **Mocks**可以捕获对函数的调用( 以及在这些调用中传递的参数) 
- **manual_mocks**用可mock依赖的模块，放置在相应mocks目录下
- 使用**mock function**可以查看函数的调用次数，以及参数

####  官网的例子->测试函数 `forEach` 的内部实现
```js
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```
为了测试此函数，我们可以使用一个 `mock` 函数，然后检查 `mock` 函数的状态来确保回调函数如期调用。
```js
const mockCallback = jest.fn();
forEach([0, 1], mockCallback);

// 此模拟函数被调用了两次
expect(mockCallback.mock.calls.length).toBe(2);

// 第一次调用函数时的第一个参数是 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// 第二次调用函数时的第一个参数是 1
expect(mockCallback.mock.calls[1][0]).toBe(1);
```
几乎所有的**Mock Function**都带有`.mock`的属性，它保存了此函数被调用的信息。 `.mock `属性还追踪每次调用时 `this`的值，所以也让检视` this` 的值成为可能：
```js
const myMock = jest.fn();

const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();

console.log(myMock.mock.instances);
```
在测试中，需要对函数如何被调用，或者实例化做断言时，这些 mock 成员变量很有帮助意义︰
```js
// 这个函数只调用一次
expect(someMockFunction.mock.calls.length).toBe(1);

// 这个函数被第一次调用时的第一个 arg 是 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// 这个函数被第一次调用时的第二个 arg 是 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// 这个函数被实例化两次
expect(someMockFunction.mock.instances.length).toBe(2);

// 这个函数被第一次实例化返回的对象中，有一个 name 属性，且被设置为了 'test’ 
expect(someMockFunction.mock.instances[0].name).toEqual('test');
```
#### Mock返回值
```js
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock
  .mockReturnValueOnce(10)
  .mockReturnValueOnce('x')
  .mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());//10 'x' true true
```
#### Mock内部实现
使用jest.fn或者mockImplementationOnce 可以完全替换需要mock的函数。
如下面的例子：
```js
const myMock=jest.fn(cb=>cb(null,true))
myMock((err,val)=>console.log(val)) //true
myMock((err,val)=>console.log(val)) //true
```
当需要mock的函数是从其他模块创建的就可以使用mockImplementation
```js
// foo.js
module.exports={
    // some code
}
// test.js
jest.mock("../foo")
const foo=require("../foo");

foo.mockImplementation(()=>42)
foo();//42
```
#### Mock名字
可以使用mockName 来给mock函数命名，如果没有命名，输出的日志默认就会打印jest.fn()，加上名字更有利于调试
```js
const mymockFn=jest.fn()
mymockFn.mockReturnValue("default").mockName("add")

```
### 模块的mock
- 使用jest.mock自动mock 
```js
jest.mock("./className")
```
- jest.mock()直接在单元测试里面mock 模块

```js
// 例如我们很多产品代码里面会使用fs文件读取文件, 在单元测试中, 我们并不需要真去调用fs读取文件, 就可以考虑把fs模块mock掉, 如下代码： 
jest.mock('fs',()=>{
    readFileSync:jest.fn()
})
```
- 在需要mock的模块目录临近建立目录**mocks** 
    - 对于用户目录下面的模块
```js
// 例如我们需要mock目录models下面的user模块，那么我们就需要在models下面新建mocks目录（这里要区分大小写），然后新建文件user.js。

// 注意：用这种方式， 需要在单元测试文件中需添加下面的代码才能使此mock生效。 
jest.mock("./mockName")
```
    - 对于node_modules下面的模块

如果我们需要mock的模块是一个Node的模块（如lodash 
），那么 mocks应该是挨着node_modules目录（除非你手动配置的 roots指向非本项目的root目录），这种就会自动mock了，也就是不需要在单元测试用例里再调用jest.mock(‘module_name’)。

如果需要mock的模块是scoped模块，那么我们创建的mock的名字需要一致，例如， mock模块名字为 @scope/project-name，那么就需要创建mocks/@scope/project-name.js。

注意：如果我们需要mock node的核心模块（如fs或者path），那么还是需要显示的调用jest.mock(‘path’) ， 因为核心的node模块默然是不被mock的。
![https://i.imgur.com/BdJxewT.png](https://i.imgur.com/BdJxewT.png)

### mock文件和css module的问题
如果js文件中引用了css或者本地其他文件，那么就可能测试失败。
为了解决这个问题，同时也为了提高测试效率，：
```json
"jest": {
    "moduleNameMapper": {
     "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/config/fileMock.js",
     "\\.(css|less)$": "identity-obj-proxy"
 }
```
而fileMock.js文件内容为：
```js
module.exports = 'test-file-stub';
```
然后安装identity-obj-proxy即可：
```js
npm install --save-dev identity-obj-proxy
```
### jest与webpack
这里不多讲了，可以[参考](http://facebook.github.io/jest/docs/en/webpack.html)
### jest与别名
在webpack中经常会用到别名，而jest测试时，如果文件中引用了别名会出现找不到文件的问题。
毕竟jest测试时没有经过webpack处理
对于以下玩法
```js
resolve: {  
    alias: {  
        common: path.resolve(__dirname, 'plugins/common/')  
    }  
} 
```
可以通过
```json
"jest": {
    "testRegex": "./src/test/.*.test.js$",
    "moduleNameMapper": {
      "^common(.*)$": "<rootDir>/plugins/common$1",
    }
}
```
### jest与eslint检测
如果看了上面的代码会发现我没有引用任何类似于
```js
import *  from 'jest'
```
的代码，而那个expect是没有定义的。
这段代码直接运行**jest**命令没有任何问题，但是eslint会检测出错，对于这种情况，我们可以再eslint配置文件**.eslintrc**中加入以下代码：
```json
"env": {
    "jest": true
  },
```

### jest的断言
jest有自己的[断言玩法](https://facebook.github.io/jest/docs/en/expect.html)。
- 相等断言
    - toBe(value)： 比较数字、字符串
    - toEqual(value)： 比较对象、数组
    - toBeNull()
    - toBeUndefined()
- 包含断言
    - toHaveProperty(keyPath, value)： 是否有对应的属性
    - toContain(item)： 是否包含对应的值，括号里写上数组、字符串
    - toMatch(regexpOrString)： 括号里写上正则
- 逻辑断言,在JavaScript中，有六个falsy值：false，0，''，null， undefined，和NaN。其他一切都是Truthy。
    - toBeTruthy()
    - toBeFalsy()
    - oBeGreaterThan(number)： 大于
    - toBeLessThan(number)： 小于
- not 取反
```js
function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError);//判断抛出异常
}）
```

### DOM测试
- Jest 集成了[jsdom](https://github.com/jsdom/jsdom)
- Jest能操作DOM是因为内置了JSDOM
- JSDOM是在node中模拟了DOM环境

```js
function remove(node) {
    node.parentNode.removeChild(node);
}
function on(node, type, handler) {
    node.addEventListener(type, handler);
}
exports.remove = remove;
exports.on = on;
```
```js
let { remove, on } = require('../src/dom');
describe('dom', () => {
    test('remove', () => {
        document.body.innerHTML = '<div id="container"><span id="hello">hello</span></div>';
        let container = document.getElementById('container');
        expect(container.nodeName.toLocaleLowerCase()).toBe('div');
        let hello = document.getElementById('hello');
        expect(hello.nodeName.toLocaleLowerCase()).toBe('span');
        remove(hello);
        let hello2 = document.getElementById('hello');
        expect(hello2).toBeNull();
    })

    test('on', () => {
        document.body.innerHTML = '<div id="container"><button id="clickMe">click</button></div>';
        let clickMe = document.getElementById('clickMe');
        on(clickMe, 'click', () => {
            clickMe.innerHTML = 'clicked';
        });
        clickMe.click();
        expect(clickMe.innerHTML).toBe('clicked');

    })
});
```

### 代码覆盖率
- line coverage 行覆盖率
- function coverage 函数覆盖率
- branch coverage 分支覆盖率
- statement coverage 语句覆盖率
```sh
npx jest --coverage
```
### 测试的生命周期
Jest 测试提供了一些测试的生命周期 API，可以辅助我们在每个 `case` 的开始和结束做一些处理。 这样，在进行一些和数据相关的测试时，可以在测试前准备一些数据，在测试后，清理测试数据。

4 个主要的生命周期函数：

默认情况下，**before** 和 **after** 的块可以应用到**文件中**的每个测试。 此外可以通过 **describe** 块来将测试分组。 当 **before **和**after** 的块在**describe** 块内部时，则其只适用于该 **describe** 块内的测试。
- afterAll(fn, timeout): 当前文件中的所有测试执行完成后执行 fn, 如果 fn 是 promise，jest 会等待 timeout 毫秒，默认 5000
- afterEach(fn, timeout): 每个 test 执行完后执行 fn，timeout 含义同上
- beforeAll(fn, timeout): 同 afterAll，不同之处在于在所有测试开始前执行
- beforeEach(fn, timeout): 同 afterEach，不同之处在于在每个测试开始前执行

```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});
// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```
```js
BeforeAll(() => {
  console.log('before all tests to excute !')
})

BeforeEach(() => {
  console.log('before each test !')
})

AfterAll(() => {
  console.log('after all tests to excute !')
})

AfterEach(() => {
  console.log('after each test !')
})

Test('test lifecycle 01', () => {
  expect(1 + 2).toBe(3)
})

Test('test lifecycle 03', () => {
  expect(2 + 2).toBe(4)
})
```

### 快照
所谓**snapshot**，即快照也。通常涉及UI的自动化测试，思路是把某一时刻的标准状态拍个快照，在测试回归的时候进行pixel to pixel的对比。但Jest对React组件的快照则不同，其实是把一个组件给序列化成纯文本， 纯文本的比较，这个真是简单又高效呀。对于一个React组件而言， 传入相同的props，我们是期望得到相同的输出， 这样子一来，通过构造不同的props, 我们即有了不同的测试用例。

理想状态中，组件若是无**内部状态变化**，测试用例覆盖率应该可以达到**100%**了。当然，仅仅是理想。

提高代码测试覆盖率

```jsx
// Link.react.js
import React from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

export default class Link extends React.Component {

  constructor(props) {
    super(props);

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);

    this.state = {
      class: STATUS.NORMAL,
    };
  }

  _onMouseEnter() {
    this.setState({class: STATUS.HOVERED});
  }

  _onMouseLeave() {
    this.setState({class: STATUS.NORMAL});
  }

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.page || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}>
        {this.props.children}
      </a>
    );
  }
```
```js
// Link.react-test.js
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
```
第一次跑的时候，就会生成一个快照文件，在`__snapshots__`目录下:
```js
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>
`;
```
在之后的`toMatchSnapshot()`调用就会与之比较，如有不同，则是用例失败，会打印出具体差异：
![https://facebook.github.io/jest/img/content/failedSnapshotTest.png](https://facebook.github.io/jest/img/content/failedSnapshotTest.png)


### 附录
#### glob
gulp内部使用了**node-glob**模块来实现其文件匹配功能。我们可以使用下面这些特殊的字符来匹配我们想要的文件：
#### glob规则
|匹配符	|说明|
|-----|-----|
|星|	匹配文件路径中的0个或多个字符，但不会匹配路径分隔符|
|**|	匹配路径中的0个或多个目录及其子目录|
|[...]|	匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为^或!时，则表示不匹配方括号中出现的其他字符中的任意一个|
|!(pattern pattern pattern)	|匹配任何与括号中给定的任一模式都不匹配的|
|?(pattern pattern pattern)|	匹配括号中给定的任一模式0次或1次，类似于js正则中的?|
|+(pattern pattern pattern)	|匹配括号中给定的任一模式至少1次，类似于js正则中的+|
|(pattern pattern pattern)	|匹配括号中给定的任一模式0次或多次，类似于js正则中的 *|
|@(pattern pattern pattern)	|匹配括号中给定的任一模式1次，类似于js正则中的|

#### glob示例
|glob|	匹配|
|----|----|
|*|	能匹配 a.js,x.y,abc,abc/,但不能匹配a/b.js	|
|.|	a.js,style.css,a.b,x.y|
|//*.js|	能匹配 a/b/c.js,x/y/z.js,不能匹配a/b.js,a/b/c/d.js|
|**|	能匹配 abc,a/b.js,a/b/c.js,x/y/z,x/y/z/a.b,能用来匹配所有的目录和文件|
|a/**/z|	能匹配 a/z,a/b/z,a/b/c/z,a/d/g/h/j/k/z|
|a/**b/z|	能匹配 a/b/z,a/sb/z,但不能匹配a/x/sb/z,因为只有单**单独出现才能匹配多级目录|
|?.js|	能匹配 a.js,b.js,c.js|
|a??|	能匹配 a.b,abc,但不能匹配ab/,因为它不会匹配路径分隔符|
|[xyz].js	|只能匹配 x.js,y.js,z.js,不会匹配xy.js,xyz.js等,整个中括号只代表一个字符	|
|[^xyz].js|	能匹配 a.js,b.js,c.js等,不能匹配x.js,y.js,z.js|
## 参考：
- [前端测试框架Jest系列教程](https://www.cnblogs.com/Wolfmanlq/p/8012847.html)
- [react的单元测试之jest](https://www.cnblogs.com/vvjiang/p/8620847.html)
- [jest](https://jestjs.io/)
- [jest 自动化测试](https://www.cnblogs.com/wang_yb/p/8886859.html)
- [前端单元测试-jest](https://kokokele.github.io/keleblog/#/posts/3)
- [在VS Code中调试Jest单元测试](https://segmentfault.com/a/1190000011852541)
- [Jest基本使用方法以及mock技巧介绍](https://blog.csdn.net/TMQ1225/article/details/81133855)
- [初尝 Jest 单元测试](http://imweb.io/topic/592aab6eff03ef1a4ef15c51)
- [React 16 Jest快照测试](https://www.gowhich.com/blog/853)
- [使用 JEST 進行前端單元測試](https://blog.patw.me/archives/1310/write-frontend-unit-tests-with-jest/)