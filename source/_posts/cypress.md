---
title: cypress
copyright: true
date: 2018-12-06 10:56:09
tags: ["test","e2e","cypress"]
---
### e2e 简介
e2e 测试端对端测试的简称, e2e 即为end to end。

我不管你逻辑使用什么框架什么逻辑写的，我只想知道浏览器上我要的交互效果，ui展示效果是不是正确的，功能使用上是不是正确的，那么这就叫**E2E测试**。

### e2e的测试对于业务的收益点在哪里呢
我觉得这个要看项目类型，如果是生命周期比较短的展示型项目，写 **e2e** 的意义不是特别大，但如果是**长期维护迭代**的大型系统，**e2e** 测试不仅很有必要而且是必需。

### 目前E2E测试工具有哪些？
现在有一些测试框架可供选择，**CasperJS**、**Nightwatch** 等等。**CasperJS**只能是无界面浏览器测试，不列入考虑。在 **TestCafe** 和 **Cypress** 中犹豫过，**TestCafe** 支持常见浏览器，支持 **ES6/ES7** 和 **TS**，安装也方便。

最终选择了**Cypress**，主要是觉得**开箱即用**，文档比较清晰美观，语法用起来比较舒服，最重要的一点是测试跑在 **Chrome** 的标签页里，和平时开发没什么区别。这种情况下其实很适合开发时模拟各种场景，比如新增一个接口，约定好了接口定义但是接口还没好，就可以利用 **Cypress** 来模拟请求开发了。一定程度上也可以实现 **mock** 的功能。同样，测试 **fail** 了也可以直接调试。

|项目|	Web	|Star |
|----|----|----|
|[puppeteer](https://github.com/GoogleChrome/puppeteer)|	Chromium (~170Mb Mac, ~282Mb Linux, ~280Mb Win)	|31906|
|[nightmare](https://github.com/segmentio/nightmare)|	Electron|	15502|
|[nightwatch](https://github.com/nightwatchjs/nightwatch)|	WebDriver	|8135|
|[protractor](https://github.com/angular/protractor)|	selenium	|7532|
|[casperjs](https://github.com/casperjs/casperjs)|	PhantomJS	|7180|
|[cypress](https://github.com/cypress-io/cypress)|	Electron	|5303|
|[Zombie](https://github.com/assaf/zombie)	|不需要	|4880|
|[testcafe](https://github.com/DevExpress/testcafe)|	不需要|	4645|
|[CodeceptJS](https://github.com/Codeception/CodeceptJS)|	webdriverio	|1665|

端到端测试一般都需要一个**Web容器**，来运行前端应用。例如Chromium, Electron, PhantomJS, WebDriver等等。

从体积角度考虑，这些**Web容器体积**一般都很大。

从**速度**的角度考虑：PhantomJS, WebDriver < Electon, Chromium。

而且每个工具的侧重点也不同，建议按照需要去选择。

## 优秀的端到端测试工具应该有哪些特点
- **安装简易**：我希望它非常容易安装，最好可以一行命令就可以安装完毕
- **依赖较少**：我只想做个E2E测试，不想安装**jdk**, python之类的东西
- **速度很快**：运行测试用例的速度要快
- **报错详细**：详细的报错
- **API完备**：鼠标键盘操作接口，DOM查询接口等
- **Debug方便**：出错了可以很方便的调试，而不是去猜

##  为什么要用Cypress？
**Cypress**基本上拥有了上面的特点之外，还有以下特点

- **时光穿梭:** 测试运行时，Cypress会自动截图，你可以轻易的查看每个时间的截图
- **Debug友好:** 不需要再去猜测为什么测试有失败了，Cypress提供Chrome DevTools, 所以Debug是非常方便的。
- **实时刷新:** Cypress检测测试用例改变后，会自动刷新
- **自动等待:** 不需要在使用wait类似的方法等待某个DOM出现，Cypress会自动帮你做这些
- **Spies, stubs, and clocks:** 验证和控制函数、服务器响应或计时器的行为。从单元测试中得到的相同功能正好在你的指尖上。
- **网络流量控制:** 在不涉及服务器的情况下轻松控制，存根和测试边缘案例。无论你喜欢，你都可以存储网络流量。
- **一致的结果:** 我们的架构不使用Selenium或WebDriver。向快速，一致和可靠的无剥落测试问好。
- **截图和视频:** 查看失败时自动截取的截图，或无条件运行时整个测试套件的视频。

## Cypress
**cypress** 是目前 **e2e** 很火的一个测试组件，内部绑定了 **macha**、**chai**、**chai-jquery** 之类的断言,为了让代码代码
更有说服力，减少提交测试错误，进行**e2e**测试显然是非常有必要的。

## 安装
```sh
$ npm i -D cypress
```
然后为了方便起见，咱们在**package.json**中写入下面脚本,配置GUI和非GUI(terminal)两种方式来运行cypress:
```json
{
  "scripts": {
    "e2e-gui": "cypress open",
    "e2e": "cypress run"
  }
}
```
配置好后 先运行` yarn run e2e `或者 `npm run e2e[-gui]`(中括号意思是可选)来初始化`cypress`，**生成默认配置**和**目录**。

- **fixtures** 文件夹存放自定义 json 文件，
- **integration** 文件夹编写测试，
- **plugins** 和**support** 是非必须使用的文件夹，需要自定义指令的时候会用到。

详细目录

- **cypress.json**(与package.json同级目录): **cypress**提供比较灵活的配置，可以根据自己需要定制行为，以下列一下我对一个项目的配置
```json
{
    "baseUrl": "http://localhost:8080", // 基础链接，之后在是使用 cy.visit 的时候，只需要访问具体路由例如: cy.visit('/Hello')（webpack-dev-server) 
    "integrationFolder": "src", // 自定义"src"为测试文件根目录，默认是"cypress/integration"
    "testFiles": "**/*.cypress.spec.js", // 自定义测试文件的匹配正则，默认是"**/*.*",即所有文件
    "videoRecording": false, // 关闭录屏功能, 如果开启录屏功能，记得将"cypress/screenshots"目录加入".gitignore",防止不小心将录屏加到git中
    "viewportHeight": 800, // 设置测试环境的页面视图的高度
    "viewportWidth": 1600, // 设置测试环境的页面视图的宽度
    "pageLoadTimeout": 3000,//页面家安在超过 3000ms 即为超时。
}
```
- **cypress/plugins/index.js**: cypress运行环境配置，可以用来配置**webpack**等。以下是配置**webpack**别名范例。默认这里不需要配置。
```js
// 参考官方例子地址 https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/preprocessors__typescript-webpack/cypress/plugins/index.js
const wp = require("@cypress/webpack-preprocessor");
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, "../..", dir);
}

module.exports = on => {
    const options = {
        webpackOptions: {
            resolve: {
                alias: {
                    "@": resolve("src"),
                    cypress: resolve("cypress")
                }
            }
        }
    };
    on("file:preprocessor", wp(options));
};
```
## 根据喜好选择某种风格编写测试
**Cypress** 对 **chai**、**Expect.js** 风格的都支持，还拓展了一些断言，

### cy.visit
这是 **cypress** 里面一个很重要的方法，可以访问一个链接,列入 **example.js** 文件如下:
```js
beforeEach(function() {
  // Visiting our app before each test removes any state build up from
  // previous tests. Visiting acts as if we closed a tab and opened a fresh one
  cy.visit('https://example.cypress.io/commands/querying')
})
```
这里就是在前置钩子函数里面访问了`https://...../querying这个链接`。如果代码需要浏览器调试，比如用户交
互点击，用户输入之类的。第一步就是访问：**cy.visit**

### cy.get

还是从 **example_spec.js** 问中说起：
```js
it('cy.get() - query DOM elements', function() {
  // https://on.cypress.io/get

  // Get DOM elements by id
  cy.get('#query-btn').should('contain', 'Button')

  // Get DOM elements by class
  cy.get('.query-btn').should('contain', 'Button')

  cy.get('#querying .well>button:first').should('contain', 'Button')
  //              ↲
  // Use CSS selectors just like jQuery
})
```
这里定义了一个测试单元，在这个里面做了啥呢？第一步获取 id 为 **query-btn** 这个按钮。接下来 **should** 操作
，奉上一张表自行查看:

![2245784160-5ae29bd4cc107_articlex-2018126153343](http://b.zhangyapeng.club/2245784160-5ae29bd4cc107_articlex-2018126153343.jpg)

从官网截图的表格，详细[jquery-chai](https://docs.cypress.io/guides/references/assertions.html#Chai-jQuery) 文档表格

所以可以将 `cy.get()`当`$`一样来用即可，不过这里返回的不过 `jquery` 对象罢了，这里返回的事通过 `cypress` 包装过的对象可以在控制台看到这样的东西,见下图:

![cypress-$-2018126154229](http://b.zhangyapeng.club/cypress-$-2018126154229.jpg)

是一个用于 **cypress** 所有方法的对象。然后可以操作他的 **api** 了。

### cy.get相似
- **cy.contains** 通过文本获取元素
- **cy.closet** 见 jqery
- **cy.next/cy.nextAll** 可以和 cy.contains 联合使用获取该节点的下一个节点
- **cy.prev/cy.prevAll** 同上
- **cy.children/cy.parents/cy.parent** 获取子节点/ 所有的父节点 / 父节点
- **cy.first/cy.last**
- **cy.url** 获取当前页面 url
- **cy.title** 获取当前页面标题
- [... API](https://docs.cypress.io/api/commands/type.html#Key-Combinations)


### 重名名
**cy.get**还有一个玩法就是 **cy.get('@app')**这种，意思说之前你已经`cy.get('.app').as('app')`,不需要再次获
取了，直接使用别名就好了

## cypress 交互逻辑

### cy.type
这**不是**一个可以直接使用的方法，要配合**cy.get**使用的,作用是给空间进行输入。例如:
- 测试输入例如 **text, textarea**
```js
cy.get('input').type('hello world')
```
- 测试**tabIndex**
```js
 <div class="el" tabIndex="1">
    This is TabIndex div.
  </div>
cy.get('.el').type('laldkadaljdkljasf') // 这个里面是随机字符串
```
- 测试 **input** 为日期的
```js
cy.get('input[type=date]').type('2008-8-9')
```
- [键盘绑定](https://docs.cypress.io/api/commands/type.html#Key-Combinations)
```js
cy.get('input').type('{shift}{alt}Q')
cy.get('input').type('{alt}这里是按了一下alt后输入的内容')
```
- 对于选择例如 **radio, checkbox**
```js
cy
  .get('input[type=radio]')
  .as('radio')
  .click()
cy.get('@radio').should('be.checked')
```

## 定时
### `cy.wait`下面是等待 1s
```js
cy.wait(1000)
```
### `cy.clock` 和 `cy.tick`
页面代码
```js
var seconds = 0
setInterval(() => {
  $('#seconds-elapsed').text(++seconds + ' seconds')
}, 1000)
```
测试代码
```js
cy.clock()
cy.visit('/index.html')
cy.tick(1000)
cy.get('#seconds-elapsed').should('have.text', '1 seconds')
cy.tick(1000)
cy.get('#seconds-elapsed').should('have.text', '2 seconds')
```
迷惑的可以参考:[地址](https://docs.cypress.io/api/commands/clock.html#Now)

## 常用api
### Hooks
```js
describe('Hooks', function() {
  before(function() {
    // runs once before all tests in the block
  })
  after(function() {
    // runs once after all tests in the block
  })
  beforeEach(function() {
    // runs before each test in the block
  })
  afterEach(function() {
    // runs after each test in the block
  })
})
```
### cy.viewport()
可以方便的修改视窗，就像使用 `Chrome` 模拟不同设备窗口一样。比如设置了 `cy.viewport('iphone-6')` 就会以 `iphone6` 的大小跑测试。

### Environment Variables
类似于全局变量，在根目录下的 `cypress.json` 中
```js
{
  "env": {
    "foo": "bar",
    "some": "value"
  }
}
```
便可以在测试文件中通过 `Cypress.env('foo')` 来访问。
### 注意
- 后端修改接口时，可能需要修改测试中的接口返回，否则可能会不匹配实际情况。
- Cypress 对多浏览器测试支持并不友好，不能做到像 browserstack 那样测试各个浏览器兼容性。这方面可以看一下 [这篇文章](https://zhuanlan.zhihu.com/p/27929078)。接下来我们也可能使用阿里云移动测试来测试兼容性。
- Cypress 对 **fetch** 的兼容不好，处理方法详见 [issue95](http://link.zhihu.com/?target=https%3A//github.com/cypress-io/cypress/issues/95)。

### 关于测试覆盖率
目前**cypress**没有内置测试覆盖率统计功能，github上有专门的issue在跟踪这个，后续应该会有。issue上也有几个临时方案，目前我倾向使用**chrome**自带的来查看。在**GUI**打开的测试的浏览器中打开**devtools**,切到**Sources**, 按下`cmd+shift+p`(**windows**用户按`ctrl+shift+p`)，输入**coverage**，选择重新刷新并统计代码执行覆盖率。
![代码覆盖率-201812616056](http://b.zhangyapeng.club/代码覆盖率-201812616056.gif)

## 网络请求`mock`例子
- **cy.route**的路径匹配是严格的，所以要注意是否需要加通配符。如 `cy.route('/api/search', [])不会拦截/api/search?keyword=abc`，只会拦截`/api/search`。
- **cy.route**的`method`要注意，默认是**GET**，`cy.route('/api/posts')` 和 `cy.route('POST', '/api/posts')` 是不一样的。

```js
describe('要啥给啥', () => {
     beforeEach(() => {
        cy.server(); // 一定要在 cy.route 前调用
        cy
            .fixture('/posts/list.json') // 我们在 cypress/fixtures 内创建mock用的数据
            .as('postsData'); // 给 mock 数据取别名，以后 cy.route 使用
        cy
            .route('/api/posts', '@postsData')
            .as('getPostsRoute'); // 给请求取别名，以供 cy.wait 使用
    })

    it('进入列表页，拦截列表请求接口', () => {
        cy.wait('@getPostsRoute'); // 等待被拦截的接口请求完成

        cy.get('.post').should('have.length', 10); // 要有10条数据被渲染到页面上
    });
})
```

实际场景例子: 结合上面所有姿势，我们现在测试搜索页面的搜索、操作结果
```js
describe('test search page', () => {
    // 几个 route 路径变量
    const searchRoutePath = '/api/items/activities?query=*';
    const deleteActivityRoutePath = '/api/activities/*/items/batch?num_iids[]=*';
    const undoActivityRoutePath = '/api/activities/*/items/undo';

    function search(keyword) {
        // 将搜索行为和等待搜索返回封装起来
        cy
            .fixture('items/activities.json')
            // 处理mock数据，只返回符合搜索结构的数据
            .then(data => data.filter(item => item.title.indexOf(keyword) !== -1))
            .as('searchResult');
        cy.server();
        cy.route(searchRoutePath, '@searchResult').as('searchRoute');

        const input = cy.get('input');
        input.clear(); // 清空输入框内文本

        input.type(`${keyword}{enter}`);

        cy.wait('@searchRoute');
    }

    before(() => {
        // 进行所有测试前，先访问搜索页
        cy.visit('/activities/search');
    });

    it('should show no data tip when search result is empty', () => {
        const text = 'not exist';
        search(text);
        cy.contains(`没有找到关于 ${text} 的结果`);
    });

    it('should remove activity from list when clean successful', () => {
        search('成功');

        cy
            .route('delete', deleteActivityRoutePath, {
                success: 0,
                fail: 0,
                waiting: 0,
            })
            .as('deleteActivityResponse');

        // within是让cy执行的context保持在'.activities-search'这个dom节点内
        // 默认cy的执行是以上一个cy命令结果作为context
        // 如 "cy.get('a'); cy.get('span')"，cy会在上一个命令找到的'a'标签中查找'span'
        cy.get('.activities-search').within(() => {
            const items = cy.get('.result-item');
            items.should('have.length', 1);
            const applyList = items.get('.apply-list');

            applyList.should('not.be.visible'); // 每个数据项内详细内容区域是隐藏的

            const toggleBtn = items.get('.item-apply-count');
            toggleBtn.click(); // 点击显示详细内容区
            applyList.should('be.visible');
            applyList.children().should('have.length', 1); // 详细内容区内数据只有1条

            const cleanBtn = cy.contains('退出');
            cleanBtn.click(); // 点击详细内容区里的“退出”按钮

            cy.wait('@deleteActivityResponse'); // 等待“退出”请求返回
            cy.get('.apply-list').should('be', null); // 退出成功后，详细内容区数据减1，即空
        });
    });
});
```

### cy.request 请求数据，类似ajax
- [network-requests](https://docs.cypress.io/guides/guides/network-requests.html#Testing-Strategies)
- [assertions](https://docs.cypress.io/guides/references/assertions.html#Chai) 
- [recipes](https://docs.cypress.io/examples/examples/recipes.html#Node-Modules)
- [code completion](https://docs.cypress.io/guides/tooling/intelligent-code-completion.html) 

## 总结`Cypress`写测试的基本思路
- 确定是否需要拦截请求，用 **cy.route** 修改请求，按照设计好的测试用例设定 **response**。
- 用 **cy.visit** 访问需要测试的页面。
- 根据实际情况，一般校验元素可见性、是否是禁用状态、数量、文案是否正确等等。
- 运行测试，在控制面板查看测试结果。

## 参考
- [前端E2E测试框架 cypress了解一下](https://segmentfault.com/a/1190000014665493?utm_source=index-hottest)
- [撩测试MM神器cypress使用入门](https://segmentfault.com/a/1190000014486404)
- [端到端测试哪家强？不容错过的Cypress](https://wdd.js.org/e2e-testing-hacker-news-with-cypress.html)
- [cypress进行e2e测试之理论](https://segmentfault.com/a/1190000014630097)
- [E2E 测试之 Cypress](https://zhuanlan.zhihu.com/p/32666685)
- [cypress 官网](https://docs.cypress.io/guides/guides/command-line.html)





