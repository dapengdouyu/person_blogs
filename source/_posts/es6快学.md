---
title: es6快速预览
date: 2018-05-31 15:36:10
tags: ['es6','js']
---
### es6快速预览
#### let&&const
`var的问题`:
1. var没有作用域
2. var不能定义常量
3. var可以重复定义
因为这些问题,es6引入了let和const来解决它们。es6之前js的作用域只有**函数作用域**和**全局作用域**。
<!-- more -->
- let块级作用域
```js
if(true){
    let name='zyp'
}
console.log(name)// ReferenceError: name is not defined
```
- 不能提升作用域
```js
let name='zhangyapeng'
if(true){
    console.log(name))// ReferenceError: name is not defined
    let name='haha'
}
```
- 不会污染全局变量
```js
if(true){
    let name = 'zfpx';
}
console.log(window.name);//undefined
```
- 闭包实现
```js
//es5
"use strict";
var _loop = function _loop(i) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
};
for (var i = 0; i < 2; i++) {
    _loop(i);
}

//es6 的实现
for(let i=0;i<2;i++){
    setTimeout(function(){
        console.log(i)
    },1000)
}
```
const 定义**常量**，常量一旦定义就不能修改
- 定义值类型
```js
const a=1;
a=2;//Assignment to constant variable
```
- 定义引用类型
```js
const a=[1,2,3]
a=[2,3,4]//Assignment to constant variable
a[0]=9//a=[9,2,3]
```
#### 解构
解构的意思就是分解一个对象,解构的时候，等号两边`结构类似`，右边还必须时以这真实的值。
- 解构数组
```js
let [name,age]=['zyp','18']
console.log(name,age)//zyp,18
```
- 嵌套赋值
```js
let [x, [y], z] = [1, [2.1, 2.2]];
console.log(x, y, z);//1,2.1,undefined
```
- 省略赋值
```js
let [, , x] = [1, 2, 3];
console.log(x);
```
- 默认值(赋值和传参的时候可以使用默认值)
```js
let [a = "a", b = "b", c =new Error('C必须指定')] = [1, , 3];
console.log(a, b, c);//"a","b",3
```
#### 字符串
##### 模板字符串
- 模板字符串用**反引号**包含,其中的变量用**${}**括起来
```js
let name='zyp',age=18
let dec=`${name}is ${age}old!`
```
- 数组循环
```js
/**
 * 实现
 * <ul>
 *  <li>zhangyapeng</li>
 *  <li>zuhong</li>
 * </ul>
*/
let arr= [{name:"zhangyapeng"},{name:"zuhong"}]
//map 映射，把老数组的每一个元素映射为新数组的每一个元素
let newList=arr.map((user,index)=>{
    return (
        `
        <li>${user.name}</li>
        `
    )
}).join('')

let ul=(
    `
    <ul>${newList}</ul>
    `
)
```
- 自己实现模板引擎
```js
let name='zyp',age=18
let dec="${name}is ${age}old!"
//replace函数
function replace(dec){
return dec.replace(/\$\{([^}]+)\}/g,function(matched,key){
return eval(key)
})
}
```
- 带标签的模板字符串
```js
var name = 'zyp',age = 18;
function desc(strings,...values){
    console.log(strings,values);
}
desc`${name} is ${age} old!`;
```
可以在模板字符串的前面添加一个标签，这个标签可以去处理模板字符串,标签其实就是一个`函数`,因为我们有些时候希望有自己的拼接字符串逻辑,才有了这个标签的模板字符串.
`rest运算符`,会把后面的所有参数全都放在一个数组里,`rest`其他运算符只能作为最后一个参数

##### API
- **includes()**:返回布尔值，表示是否找到了参数字符串
- **startsWith()**：返回布尔值，表示参数字符串是否在源字符串的头部。
- **endsWith()**：返回布尔值，表示参数字符串是否在源字符串的尾部。
- **repeat**:返回一个新字符串，表示将原字符串重复n次
```js
let s="https://www.baidu.com"
s.includes("https")//true
s.startsWith("https")//true
s.endsWith("https")//true
//还支持第二个参数，表示开始搜索的位置,endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束
s.endsWith('p',4)//true
//重复
"x".repeat(3)
```
####  函数
