---
title: promise详解
date: 2018-07-23 11:17:40
tags: ['promise','异步']
---
### 异步与同步
- **异步**：所谓"异步"，简单说就是一个任务分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段,比如，在我们烧水时可以干很多事情,当水烧开后在用水洗脸。这种不连续的执行，就叫做异步。
- **同步**:连续的执行,例如在烧水的过程中我们一直等待水烧开而不去干别的事情。

### 异步发展历史
- callback
- Promise
- gengrator函数
- async-await

### 高阶函数
了解异步时，我们先了解一下`高阶函数`这个概念
- **高阶函数：**
    - 接收一个或者多个函数作为参数
    - 输出一个函数

```js
//判断数据类型 isType
function isType(type,content){
return Object.prototype.toString.call(content)===`[object ${type}]`
}
```
#### 偏函数--> 预置参数
```js
function isType(type){
    return function(content){
        return Object.prototype.toString.call(content)===`[object ${type}]`
    }
}
let isString=isType('String')
isString('哈哈')
```
#### 预置函数作为参数
```js
// loadsh _.after
function(times,callback){
    return function(--times==0){
        callback()
    }
}
let eat=after(3,function(){
    console.log('饱了')
})
// 当函数执行三次之后，调用回调函数
eat()
eat()
eat()
```
### callback
```js
function read(callback){
    setTimeout(function(){
        let result = 'zpfx';
        callback(result);
    })
}
read(function(data){
    console.log(data);
});
```
### promise
虽然callbake可以解决异步调用的问题,但是它也有诸多**毛病**
- 异步不支持**try/catch**,回调函数是在下一事件环中取出,所以一般在回调函数的第一个参数预置错误对象
- 回调**地狱问题**,异步多级依赖的情况下嵌套非常深，代码难以阅读的维护
- 多个异步在**某一时刻**获取所有异步的结果
- 结果不能通过**return**返回

为了解决**回调地狱**问题，提出了Promise对象，并且后来加入了ES6标准。Promise本意是承诺，在程序中的意思就是承诺我过一段时间后会给你一个结果

#### Promise的三种状态
- Pending Promise对象实例创建时候的初始状态
- Fulfilled 可以理解为成功的状态
- Rejected 可以理解为失败的状态

先用promise解决第一个问题"回调地狱"
```js
// 1.txt => 2.txt
// 2.txt => 我很帅
let fs = require('fs');
function read(){
    fs.readFile('./1.txt','utf8',function(err,data){
        if(err) return console.log(err);
        fs.readFile(data,'utf8',function(err,data){
            if(err) return console.log(err);
            console.log(data); // 我很帅
        })
    })
}
read();
```
`promise`实现就轻松多了
```js
let fs = require('fs');
function read(file){
    return new Promise(function(resolve,reject){
        fs.readFile(file,'utf8',function(err,data){
            if(err) return reject(err);
            resolve(data);
        })
    })
}
read('./1.txt').then(function(data){
    return read(data);
}).then(function(data){
    console.log(data)
}).catch(function(err){
    console.log(err)
});
```
>当第一个then中返回一个promise，会将返回的promise的结果,传递到下一个then中。这就是比较著名的链式调用了

#### 解决同步异步的返回结果，按照顺序
>我们将多个异步请求的结果在同一时间进行汇总

```js
let fs=require('fs');
let path=require("path")

function after(time,callback){//可以缓存函数 当达到条件时执行
    let arr=[];
    return function(data){
        arr.push(data)
        if(--time===0){
            callback(arr);
        }
    }
}
let out=after(3,function(arr){
    console.log(arr)
})
let resolve=(dir)=>path.resolve(__dirname,dir)

fs.readFile(resolve("1.txt"),"utf8",(err,data)=>{
out(data)
})
fs.readFile(resolve("2.txt"),"utf8",(err,data)=>{
out(data)
})
fs.readFile(resolve("3.txt"),"utf8",(err,data)=>{
    out(data)
})
```
使用promise实现
```js
let fs = require('fs');
function read(file){
    return new Promise(function(resolve,reject){
        fs.readFile(file,'utf8',function(err,data){
            if(err) return reject(err);
            resolve(data);
        })
    })
}
Promise.all([read('1.txt'),read('2.txt')]).then(([template,data])=>{
    console.log({template,data})
});
// 不管两个promise谁先完成，Promise.all 方法会按照数组里面的顺序将结果返回
```
#### promise API 详解
##### Promise.race
>接受一个数组，数组内都是Promise实例,返回一个Promise实例，这个Promise实例的状态转移取决于参数的Promise实例的状态变化。当参数中任何一个实例处于resolve状态时，返回的Promise实例会变为resolve状态。如果参数中任意一个实例处于reject状态，返回的Promise实例变为reject状态。

```js
Promise.race([read('1.txt'),read('2.txt')]).then(data=>{
    console.log({template,data})
},(err)=>{
    console.log(err)
});
```
##### Promise.resolve
返回一个Promise实例，这个实例处于resolve状态
```js
Promise.resolve('成功').then(data=>{ 
    console.log(data);
});
```
#### Promise.reject
返回一个Promise实例，这个实例处于reject状态
```js
Promise.reject('失败').then(data=>{ 
   console.log(data); 
},err=>{ 
console.log(err); 
})
```

### Generator
我们发现Promise已经可以解决了**异步编程**问题,但是仍然不够优雅,我们更希望编写异步代码能够像`同步`代码一样简洁。
- genrator 函数要用* 来比标识，yield(暂停产出 )
- 他会将函数分割出好多个部分，调用一次next就会向下继续执行
- 返回结果是一个`迭代器`，迭代器有一个next方法

```js
// 迭代器的实现
// 迭代器 就是有next方法的，每次调用后都会返回一个done和value的属性
function read(arrs){
    let index=0;//默认先迭代第一项
    let len=arrs.length;
    return {
        next(){
            return{
                value:arrs[index],
                done:index++===len?true:false
            }
        }
    }
}
let it=read(['react','vue','angular']);
let flag=true;
do{
let {done,value}=it.next();
flag=done;
console.log(value)
}while(!flag)
```
#### generator的用法
```js
function* read(){
    console.log(1);
    let a=2* (yiled '222')
    console.log(a)
    let b=yiled 9;
    console.log(b)
    return b;
}
let it=read()
console.log(it.next('213'))//1
console.log(it.next('100'))//200
console.log(it.next('100'))//100
```
- yield 后面跟着的是value的值
- yield 等号前面的是我们当前调用next传进来的值
- 第一次next传值是无效的
![promise](generator.png)

```js
//  异步 generator 主要和promise搭配使用
let bluebird=require("bluebird")
let fs=require("fs")
let path=require("path");
let resolve=(dir)=>path.resolve(__dirname,dir)
let read=bluebird.promisify(fs.readFile)
function *r(){
    let content1=yield read(resolve("./1.txt"),"utf8");
    let content2=yield read(resolve(content1),"utf8")
    return content2;
}
```
不使用co这类的迭代库实现
```js
//迭代库
let it=r();
it.next().value.then(function(data){//2.txt
    it.next(data).value.then(function(data){
       console.log(it.next(data).value)
    })
})
```
#### co
有node大神tj写的co库，可以自动的将generator进行迭代
```js
let co=require("co");
co(r()).then((data)=>{
    console.log(data)
})
```
手写co库
```js
function co(it){//it是迭代器
//返回promise
return new Promise(function(resolve,reject){
    // 考虑到是异步调用，一般用递归实现，while实现的是同步调用
    function next(d){
        let {value,done}=it.next(d);
        if(!done){
            value.then(function(data){
                next(data)
            },reject)//如果抛出异常，就立马抛出
        }else{
            resolve(value)
        }
        
    }
    next()
})
}
```
### async/await - 异步的终极实现
- async和await就是generator和co的语法糖,使用async关键字，你可以轻松地达成之前使用生成器和co函数所做到的工作
- 用async来修饰函数 async 需要陪await await只能跟`promise`

```js
async function r(){
    try{
        let contetn1=await read(resolve("1000.txt"),"utf8")
        let contetn2=await read(resolve(contetn1),"utf8")
    }catch(e){//如果出错会catch
        console.log('e',e)
    }
    return 1000;
}
//async函数返回的是promise 
r().then((data)=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})
```
#### async/await解决的问题有哪些
- 1. 回调地狱
- 2.并发执行异步，在同一时刻同步返回结果 promise.all
- 3.解决了返回值的问题
- 4.可以实现try/catch

### Q库
>我们发现无论是generator还是async/await都离不开promise,我们在介绍几个有关promise的库。

```js
//需要下载npm install q
let Promise=require("./Promise")
let Q=require("q")
function read(url){
return new Promise(function(resolve,reject){
    require("fs").readFile(url,'utf8',function(err,data){
        if(err)reject(err);
        resolve(data)
    })
})
}
Q.fcall(function(){
    return 100
}).then(function(data){
    console.log(data)
})
```
### blueBird
>blueBird中有两个常用的方法一个叫`promisify`另一个叫`promisifyAll`
```js
function promisify(fn){//promise化 将回调函数在内部进行处理
return function(...arg){
    return new Promise(function(resolve,reject){
        fn(...arg,function(err,data){
            if(err)reject(err)
            resolve(data)
        })
    })
}
}
promisify(fs.readFile)(url,"utf8").then()
```
promisifyAll(fs)将所有的方法全部增加一个promise化
```js
function(obj){
    Object.keys(obj).forEach(function(value){
        if(typeof obj[key]==='function'){
            obj[`${key}Async`]=promisify(obj[key])
        }
    })
}
promisifyAll(fs)
fs.readAsync(url,"utf8").then()
```
### 实现Promise
- Promise是一个类,需要传递一个函数,这个函数我们称之为执行函数,函数中有两个参数resolve和reject他们也是函数，调用resolve表示成功，调用reject表示失败
- pending（进行中）、fulfilled（成功）、rejected（失败)
- 成功就不会再调用失败,默认状态是等待状态
- then是原型上的一个方法接收两个参数分别是成功的回调和失败的回调
- 调用resolve后会执行成功的回调，调用reject后会执行失败的回调
```js
function Promise(excutor){//excutor是执行函数
    this.status='pending'//初始状态是pending
    this.value=undefined;//存储成功的值
    this.reason=undefined;//存储失败原因
    function resolve(value){// 只有再pending才能转换成功态
    if(this.status==='pending'){
        this.value=value;
        this.status="fulfilled";
    }
        
    }
    function reject(err){ // 只有再pending才能转换失败态
       if(this.status==='pending'){
        this.reason=err;
        this.status="rejected";
       }
    }
    try{
        excutor(resolve,reject)// executor中需要传入resolve和reject
    }catch(e){
        // 如果executor执行发生异常，表示当前的promise是失败态
        reject(e)
    }
    
}
Promise.prototype.then(function(onFufilled,onRejected){
    if(this.status==='fulfilled'){
        //成功调用回调函数 
        onFufilled(this.value)
    }
    if(this.status==='rejected'){
        //失败调用回调函数 
        onRejected(this.reason)
    }
})
```
#### 异步Promise
在new Promise时内部可以写`异步代码`,并且产生的实例可以`then多次`,我们可以先将then中的成功的回调和失败的回调存到`数组内`，当成功时调用成功的数组即可
```js
function Promise(excutor){//excutor是执行函数
    this.status='pending'//初始状态是pending
    this.value=undefined;//存储成功的值
    this.reason=undefined;//存储失败原因
+   this.onFulfilledcallback=[];///存放成功的回调
+   this.onRejectedCallback = []; //存放then失败的回调
    function resolve(value){// 只有再pending才能转换成功态
    if(this.status==='pending'){
        this.value=value;
        this.status="fulfilled";
        // 依次执行成功的回调
+        this.onFulfilledcallback.forEach((value)=>{
+            value()
+        })
    }
    }
    function reject(err){ // 只有再pending才能转换失败态
       if(this.status==='pending'){
        this.reason=err;
        this.status="rejected";
+        this.onRejectedCallback.forEach((value)=>{
+            value()
+        })
       }
    }
    try{
        excutor(resolve,reject)// executor中需要传入resolve和reject
    }catch(e){
        // 如果executor执行发生异常，表示当前的promise是失败态
        reject(e)
    }
    
}
Promise.prototype.then(function(onFufilled,onRejected){
    if(this.status==='fulfilled'){
        //成功调用回调函数 
        onFufilled(this.value)
    }
    if(this.status==='rejected'){
        //失败调用回调函数 
        onRejected(this.reason)
    }
    if(this.status==="pending"){
         // 如果是等待态,就将成功和失败的回调放到数组中
        //成功调用回调函数 
+        this.onFulfilledcallback.push(()=>{
+            onFufilled(this.value)
+        })
        //失败调用回调函数 
+        this.onRejectedCallback.push(()=>{
+              onRejected(this.reason)
+        })
    }
})
```
#### Promise链式调用
promise实现链式调用,返回的并不是this而是一个`新的promise`,因为:如果当前promise已经进入`成功了的回调`，回调中发生了异常如果返回的仍是当前的promise那么状态无法更改到失败态！
```js
function Promise(excutor){//excutor是执行函数
    this.status='pending'//初始状态是pending
    this.value=undefined;//存储成功的值
    this.reason=undefined;//存储失败原因
   this.onFulfilledcallback=[];///存放成功的回调
  this.onRejectedCallback = []; //存放then失败的回调
    function resolve(value){// 只有再pending才能转换成功态
    if(this.status==='pending'){
        this.value=value;
        this.status="fulfilled";
        // 依次执行成功的回调
        this.onFulfilledcallback.forEach((value)=>{
            value()
        })
    }
    }
    function reject(err){ // 只有再pending才能转换失败态
       if(this.status==='pending'){
        this.reason=err;
        this.status="rejected";
        this.onRejectedCallback.forEach((value)=>{
            value()
        })
       }
    }
    try{
        excutor(resolve,reject)// executor中需要传入resolve和reject
    }catch(e){
        // 如果executor执行发生异常，表示当前的promise是失败态
        reject(e)
    }
    
}
Promise.prototype.then(function(onFufilled,onRejected){
+     let promise2; // promise2为then调用后返回的新promise
    if(this.status==='fulfilled'){
        //成功调用回调函数 
+        promise2=new Promise(function(resolve,reject){
+             onFufilled(this.value)
+        })
       
    }
    if(this.status==='rejected'){
        //失败调用回调函数 
+        promise2=new Promise(function(resolve,reject){
+              onRejected(this.reason)
+        }) 
    }
    if(this.status==="pending"){
         // 如果是等待态,就将成功和失败的回调放到数组中
        //成功调用回调函数 
+        new Promise((resolve,reject)=>{
            this.onFulfilledcallback.push(()=>{
            onFufilled(this.value)
          })
        //失败调用回调函数 
            this.onRejectedCallback.push(()=>{
              onRejected(this.reason)
            })
        }) 
+    }
+    return promise2
})
```
### resolvePromise
then返回的结果可能是promise和value或者object
```js
function Promise(excutor){//excutor是执行函数
    this.status='pending'//初始状态是pending
    this.value=undefined;//存储成功的值
    this.reason=undefined;//存储失败原因
   this.onFulfilledcallback=[];///存放成功的回调
  this.onRejectedCallback = []; //存放then失败的回调
    function resolve(value){// 只有再pending才能转换成功态
    if(this.status==='pending'){
        this.value=value;
        this.status="fulfilled";
        // 依次执行成功的回调
        this.onFulfilledcallback.forEach((value)=>{
            value()
        })
    }
    }
    function reject(err){ // 只有再pending才能转换失败态
       if(this.status==='pending'){
        this.reason=err;
        this.status="rejected";
        this.onRejectedCallback.forEach((value)=>{
            value()
        })
       }
    }
    try{
        excutor(resolve,reject)// executor中需要传入resolve和reject
    }catch(e){
        // 如果executor执行发生异常，表示当前的promise是失败态
        reject(e)
    }
    
}
Promise.prototype.then(function(onFufilled,onRejected){
     let promise2; // promise2为then调用后返回的新promise
    if(this.status==='fulfilled'){
        //成功调用回调函数 
        promise2=new Promise(function(resolve,reject){
            // x是then返回的结果 
            let x = onFufilled(this.value)
            resolvePromise(promise2,x,resolve,reject)
        })
       
    }
    if(this.status==='rejected'){
        //失败调用回调函数 
        promise2=new Promise(function(resolve,reject){
           let x= onRejected(this.reason)
           resolvePromise(promise2,x,resolve,reject)
        }) 
    }
    if(this.status==="pending"){
         // 如果是等待态,就将成功和失败的回调放到数组中
        //成功调用回调函数 
        new Promise((resolve,reject)=>{
            this.onFulfilledcallback.push(()=>{
           let x=onFufilled(this.value)
           resolvePromise(promise2,x,resolve,reject)
          })
        //失败调用回调函数 
            this.onRejectedCallback.push(()=>{
             let x= onRejected(this.reason)
             resolvePromise(promise2,x,resolve,reject)
            })
        }) 
    }
    return promise2
})
function resolvePromise(p2,x,resolve,reject){
    // 处理结果时,尽可能完善一些
    //如果then返回的值和p2是同一个值，规范要求抛出一个类型异常
    if(p2===x){
        return reject(new TypeError("循环引用"))
    }
        let called;//表示是否调用成功或者失败
    // 可能是一个thenable(带有then方法)对象
    if(x!==null && (typeof x === 'object' || typeof x==='function')){
        // x可能是promise
        try{// 如果用defineProperty定义的then方法获取时可能会有异常
            let then=x.then;
            // 如果then是函数,说明是promise,我们要让promse执行
            if(typeof then==='function'){
                then.call(x,function(y){
                    if(called) return;
                    called=true;
                    //y可能还是一个Promise，再去解析知道返回的是一个普通值
                    resolvePromise(promise2,y,resolve,reject)
                },function(err){
                    if(called) return;
                    called=true;
                    //失败的回调
                    reject(err)
                })
            }else{
                // 不是函数,x就是一个普通的对象,直接成功即可
                resolve(x);
            }
        }catch(e){
            if(called) return;
                called=true;
            reject(e)
        }
    }else{
        // 是普通值直接调用成功
        resolve(x);
    }
}
```
#### then中的方法异步执行
为了保证程序执行的一致性,规范中要求then中的方法必须在下一队列中执行
```js
Promise.prototype.then(function(onFufilled,onRejected){
     let promise2; // promise2为then调用后返回的新promise
    if(this.status==='fulfilled'){
        //成功调用回调函数 
        promise2=new Promise(function(resolve,reject){
            // x是then返回的结果 
            setTimeout(()=>{
                try{
                let x = onFufilled(this.value)
                 resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                     reject(e);
                }
                

            })
             
            }
           
        })
       
    }
    if(this.status==='rejected'){
        //失败调用回调函数 
        promise2=new Promise(function(resolve,reject){
             setTimeout(()=>{
                try{
                let x= onRejected(this.reason)
                 resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                     reject(e);
                }
                

            })
        }) 
    }
    if(this.status==="pending"){
         // 如果是等待态,就将成功和失败的回调放到数组中
        //成功调用回调函数 
        new Promise((resolve,reject)=>{
            this.onFulfilledcallback.push(()=>{
                
          setTimeout(()=>{
                try{
                let x = onFufilled(this.value)
                 resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                     reject(e);
                }
                

            })
          })
        //失败调用回调函数 
            this.onRejectedCallback.push(()=>{
            setTimeout(()=>{
                try{
                let x = onRejected(this.value)
                 resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                     reject(e);
                }
                

            })
            })
        }) 
    }
    return promise2
})
```

#### 值的穿透
在规范中定义then函数可以不传参,不传参默认会将成功的结果和失败的结果继续向下传递
```js
Promise.prototype.then = function (onFufilled, onRejected) {
+    onFufilled = typeof onFufilled === 'function'?onFufilled:function(value){
+        return value
+    }
+    onRejected = typeof onRejected === 'function'?onRejected:function(err){
+        throw err
+    }

```
#### resolve接收promise 
```js
function resolve(value) { // 调用resolve 会传入为什么成功
+   if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
+      if(typeof value.then === 'function'){
+           // 将当前promise成功的结果再次传回resolve函数中
+           return value.then(resolve,reject);
+       }
+   }
    if (self.status === 'pending') {
```
#### Promise.all
```js
Promise.all=function(promises){
    let arrs=[];//返回的结果
    let ind=0;//表示成功了几次
    return new Promise(function(resolve,reject){
        function processDate(index,y){
            arr[index]=y;
            if(++ind===promises.length){
                resolve(arrs)
            }
        }
      for(let i=0;i<len;i++){
          promises[i].then(function(y){
              processDate(i,y)
          },reject)
      }
    })
}
```
#### Promose.race
```js
Promise.race=function(promises){
     for(let i=0;i<promises.length;i++){
          promises[i].then(resolve,reject)
      }
}
```
#### Promise.resolve
```js
Promise.resolve=function(data){
    return new Promise(function(resolve,reject){
        resolve(data)
    })
}
```
#### Promise.reject
```js
Promise.reject = function(reason){
    return new Promise(function(resolve,reject){
        reject(reason);
    });
}
```
#### catch
```js
Promise.prototype.catch=function(fn){
    return this.then(null,fn)
}
```