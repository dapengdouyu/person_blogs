---
title: react
copyright: true
date: 2019-01-21 17:15:01
tags: ['react']
---
## 组件重用和状态共享
有时，我们希望在组件之间重用一些有**状态逻辑**的部分。传统上，这个问题有两个流行的解决方案：[高阶组件](https://react.docschina.org/docs/higher-order-components.html)、[render props](https://react.docschina.org/docs/render-props.html)和[React Hooks]()

### Render Props
`render prop` 是一个组件用来了解要渲染什么内容的函数 `prop`
```js
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```
使用 render props 的库包括 [React Router](https://reacttraining.com/react-router/web/api/Route/Route-render-methods) 和 [Downshift](https://github.com/paypal/downshift)

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}
```
```js
class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```
### 高阶组件
`高阶组件`就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件



---------
## 参考
- [Epitath 源码 - renderProps 新用法](https://github.com/dt-fe/weekly/blob/master/75.%E7%B2%BE%E8%AF%BB%E3%80%8AEpitath%20%E6%BA%90%E7%A0%81%20-%20renderProps%20%E6%96%B0%E7%94%A8%E6%B3%95%E3%80%8B.md)