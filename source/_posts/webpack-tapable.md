---
title: webpack-tapable
copyright: true
date: 2019-01-14 14:50:58
tags: ['webpack','tapable']
---
## webpack的插件机制
webpack实现插件机制的大体方式是:
- **创建** - webpack在其内部对象上创建各种钩子；
- **注册** - 插件将自己的方法注册到对应钩子上，交给webpack；
- **调用** - webpack编译过程中，会适时地触发相应钩子，因此也就触发了插件的方法

## tapable
**Webpack**本质上是一种`事件流`的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是**Tapable**，**webpack**中最核心的负责`编译`的**Compiler**和负责`创建`**bundle**的**Compilation**都是Tapable的实例


## tapable用法
```js
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } = require("tapable");
```
![tapable (1)-2019114145412](http://b.zhangyapeng.club/tapable%20(1)-2019114145412.png)

看起来起来功能和 `EventEmit` 类似，先注册事件，然后触发事件。不过 `Tapable` 的功能要比 `EventEmit` 强大。从官方介绍中，可以看到 `Tapable` 提供了很多类型的 `Hook`，分为`同步`和`异步`两个大类(异步中又区分异步`并行`和异步`串行`)，而根据事件执行的终止条件的不同，由衍生出 `Bail`/`Waterfall`/`Loop` 类型。

![167f458ac2b1e527-2019114145946](http://b.zhangyapeng.club/167f458ac2b1e527-2019114145946.webp)
![167f458d6ff8424f-201911415344](http://b.zhangyapeng.club/167f458d6ff8424f-201911415344.webp)
--------

- **BasicHook**: 执行每一个，不关心函数的返回值，有 SyncHook、AsyncParallelHook、AsyncSeriesHook。
- **BailHook**: 顺序执行 Hook，遇到第一个结果 `result !== undefined` 则返回，不再继续执行。有：SyncBailHook、AsyncSeriseBailHook, AsyncParallelBailHook。
- **WaterfallHook**: 类似于 reduce，如果前一个 Hook 函数的结果 `result !== undefined`，则 result 会作为后一个 Hook 函数的第一个参数。既然是顺序执行，那么就只有 Sync 和 AsyncSeries 类中提供这个Hook：SyncWaterfallHook，AsyncSeriesWaterfallHook
- **LoopHook**: 不停的循环执行 Hook，直到所有函数结果 `result === undefined`。同样的，由于对串行性有依赖，所以只有 SyncLoopHook 和 AsyncSeriseLoopHook （PS：暂时没看到具体使用 Case）

## SyncHook
---- 
串行同步执行,不关心返回值
```js
let {SyncHook}=require('tapable');
// 创建一个同步 Hook，指定参数
let queue = new SyncHook(['name']);
// 注册
queue.tap('1',function(name){
  console.log(name,1);
});
queue.tap('2',function(name){
  console.log(name,2);
});
queue.tap('3',function(name){
  console.log(name,3);
});
// 调用
queue.call('zfpx');
```
实现
```js
class SyncHook{
    constructor(){
        this.tasks=[]
    }
    tap(name,task){
    this.tasks.push(task)
    }
    call(...args){
          this.tasks.forEach(val=>val(...args))
    }
}
```
## SyncBailHook
------
串行同步执行，有一个返回值不为`null`则跳过剩下的逻辑
- **break**是跳出当前循环就是最近的一次循环，继续执行外循环，

- **continue**是指结束本次循环，这次循环后边的不执行了，继续最内层循环的循环

- **break**是跳到了外层循环，

- **return**则终止该方法，后边的都不执行了。

```js
let {SyncBailHook}=require('tapable');
let queue = new SyncBailHook(['name']);
queue.tap('1',function(name){
  console.log(name,1);
  return 'Wrong';
});
queue.tap('2',function(name){
  console.log(name,2);
});
queue.tap('3',function(name){
  console.log(name,3);
});
queue.call('zfpx');
```
实现
```js
class SyncBailHook{
    constructor(){
        this.tasks=[]
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...args){
        //   for(var val of this.tasks){
        //       let ret= val(...args)
        //       if(ret) break;
        //   }
        let i=0,ret=null;
          do{
            ret=this.tasks[i++](...args)
          }while(!ret)
    }
}
```
## SyncWaterfallHook
----- 
串行同步执行,瀑布流,类似于`reduce`，将前一个结果当值 `result !== undefined`复制给下一个参数
```js
let {SyncWaterfallHook}=require('tapable');
let queue = new SyncWaterfallHook(['name']);
queue.tap('1',function(name,age){
  console.log(name,age,1);
  return 1;
});
queue.tap('2',function(data){
    console.log(data,2);
    return 2;
});
queue.tap('3',function(data){
  console.log(data,3);
});
queue.call('zfpx',9);
```
实现
```js
class SyncBailHook{
    constructor(){
        this.tasks=[]
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...args){
    const [first,...tasks]=this.tasks
        let firstarg=args
      tasks.reduce((prev,next)=>{
          if(prev){
              firstarg=prev
            return next(prev)
          }else{
            return next(...firstarg)
          }
         
      },first(...args))
    }
}
```

## SyncLoopHook
----
监听函数返回`true`表示继续循环，返回`undefine`表示结束循环
```js
let {SyncLoopHook}=require('tapable');
let queue = new SyncLoopHook(['name']);
let count = 0;
queue.tap('1',function(name){
    console.log(count++);
    if(count==3){
        return;
    }else{
        return true;
    }
});
queue.call('zfpx');
```
实现
```js
class SyncLoopHook{
     constructor(){
        this.tasks=[]
    }
    tap(name,task){
        this.tasks.push(task)
    }
    call(...args){
        this.tasks.forEach((val,index)=>{
            let ind=0,ret=true;
             do{
                 ret=this.tasks[ind++](...args)
             }while(ret && ind<=index)
        })
    }
}
```
-------------------
## AsyncParallelHook 
------------
异步并行执行钩子
### tap
```js
let {AsyncParallelHook}=require('tapable');
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
实现
```js
class AsyncParallelHook{
    constructor(){
        this.tasks=[]
    }
    tap(name,task){
        this.tasks.push(task)
    }
    callAsync(...args){
         let callback=args.pop();
        this.tasks.forEach(task=>task(...args))
         callback();
    }
}
```
### tapAsync
```js
let {AsyncParallelHook}=require('tapable');
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    setTimeout(function(){
        console.log(1);
        callback();
    },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
实现
```js
class AsyncParallelHook{
    constructor(){
        this.tasks=[]
    }
    tapAsync(name,task){
        this.tasks.push(task)
    }
    callAsync(...args){
         let callback=args.pop();
         let i=0,length = this.tasks.length;
        this.tasks.forEach(task=>task(...args,done))
        function done(err){
            if(++i==length){
                callback(err)
            }
        }
    }
}
```
### tapPromise
```js
let {AsyncParallelHook}=require('tapable');
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1);
            resolve();
        },1000)
    });

});
queue.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(()=>{
    console.timeEnd('cost');
})
```
实现
```js
class AsyncParallelHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise(...args) {
     let promises = this.tasks.map(task => task(...args));
        return new Promise(function(resolve,reject){
            let result=[]
            let count=0;
            for(let i=0;i<promises.length;i++){
                promises[i].then(function(data){
                    result[i]=data;
                    if(++count===promise.length){
                        resolve(result)
                    }
                },function (err) {
        reject(err);
      })
            }
        })
    }
}
```
## AsyncParallelBailHook
带保险的异步并行执行钩子
### tap
```js
//let {AsyncParallelBailHook} = require('tapable');
class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        for (let i=0;i<this.tasks.length;i++){
            let ret=this.tasks[i](...args);
            if (ret) {
                return callback(ret);
            }
        }
    }
}
let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
    return "Wrong";
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
### tapAsync
```js
//let {AsyncParallelBailHook} = require('tapable');

class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let finalCallback=args.pop();
        let count=0,total=this.tasks.length;
        function done(err) {
            if (err) {
                return finalCallback(err);
            } else {
                if (++count == total) {
                    return finalCallback();
                }
            }
        }
        for (let i=0;i<total;i++){
            let task=this.tasks[i];
            task(...args,done);
        }
    }
}
let queue=new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
    console.log(1);
    callback('Wrong');
});
queue.tapAsync('2',function(name,callback){
    console.log(2);
    callback();
});
queue.tapAsync('3',function(name,callback){
    console.log(3);
    callback();
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
### tapPromise
```js
//let {AsyncParallelBailHook} = require('tapable');

class AsyncParallelBailHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
        let args=Array.from(arguments);
        let promises = this.tasks.map(task => task(...arguments));
        return Promise.all(promises);
    }
}
let queue = new AsyncParallelBailHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(1);
            resolve();
        },1000)
    });
});
queue.tapPromise('2',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(2);
            reject();
        },2000)
    });
});

queue.tapPromise('3',function(name){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});

queue.promise('zfpx').then(()=>{
    console.timeEnd('cost');
},err => {
    console.error(err);
    console.timeEnd('cost');
})
```
## AsyncSeriesHook
-------------------
异步串行钩子
### tap
```js
let {AsyncSeriesHook} = require('tapable');

let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
实现
```js
class AsyncSeriesHook{
    constructor() {
        this.tasks=[];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        for (let i=0;i<total;i++){
            let task=this.tasks[i];
            task(...args);
        }
    }
}
```
### tapAsync 
```js
class AsyncSeriesBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args = Array.from(arguments);
        let finalCallback = args.pop();
        let index = 0, length = this.tasks.length;
        let next = () => {
            let task = this.tasks[index++];
            if (task) {
                task(...args, next);
            } else {
                finalCallback();
            }
        }
        next();
    }
}
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
   },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
### tapPromise 
```js
class AsyncSeriesHook{
    constructor() {
        this.tasks=[];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise() {
         //first是第一个函数， tasks是剩下的函数
        let [first, ...tasks] = this.tasks;
        return tasks.reduce((a, b) => {
            return a.then(() => b());
        }, first(...args));
    }
}
let queue=new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
   return new Promise(function(resolve){
       setTimeout(function(){
           console.log(1);
           resolve();
       },1000)
   });
});
queue.tapPromise('2',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(data=>{
    console.log(data);
    console.timeEnd('cost');
});
```
##  AsyncSeriesBailHook
###  tap
```js
let {AsyncSeriesBailHook} = require('tapable');
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tap('1',function(name){
    console.log(1);
    return "Wrong";
});
queue.tap('2',function(name){
    console.log(2);
});
queue.tap('3',function(name){
    console.log(3);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
### tabAsync
```js
//let {AsyncSeriesBailHook}=require('tapable');
class AsyncSeriesBailHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,size = this.tasks.length;
        let next=(err) => {
            if (err) return  callback(err);
            let task=this.tasks[i++];
            task?task(...args,next):callback();
        }
        next();
    }
}
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
       callback('wrong');
   },1000)
});
queue.tapAsync('2',function(name,callback){
    setTimeout(function(){
        console.log(2);
        callback();
    },2000)
});
queue.tapAsync('3',function(name,callback){
    setTimeout(function(){
        console.log(3);
        callback();
    },3000)
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
###  tapPromise 
```js
let {AsyncSeriesBailHook} = require('tapable');
let queue = new AsyncSeriesBailHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
   return new Promise(function(resolve,reject){
       setTimeout(function(){
           console.log(1);
           //resolve();
           reject();
       },1000)
   });
});
queue.tapPromise('2',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(2);
            resolve();
        },2000)
    });
});
queue.tapPromise('3',function(name,callback){
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(3);
            resolve();
        },3000)
    });
});
queue.promise('zfpx').then(err=>{
    console.log(err);
    console.timeEnd('cost');
},err=>{
    console.log(err);
    console.timeEnd('cost');
});
```
-----------------
## AsyncSeriesWaterfallHook
###  tap
```js
let {AsyncSeriesWaterfallHook} = require('tapable');
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tap('1',function(name,callback){
    console.log(1);
});
queue.tap('2',function(data){
    console.log(2,data);
});
queue.tap('3',function(data){
    console.log(3,data);
});
queue.callAsync('zfpx',err=>{
    console.log(err);
    console.timeEnd
```
### tapAsync 
```js
//let {AsyncSeriesBailHook}=require('tapable');
class AsyncSeriesWaterfallHook{
    constructor() {
        this.tasks=[];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args=Array.from(arguments);
        let callback=args.pop();
        let i=0,size = this.tasks.length;
        let next=(err,data) => {
            if (err) return  callback(err);
            let task=this.tasks[i++];
            if (task) {
                if (i==0) {
                    task(...args,next);
                } else {
                    task(data,next);
                }

            } else {
                callback(err,data);
            }
        }
        next();
    }
}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapAsync('1',function(name,callback){
   setTimeout(function(){
       console.log(1);
       callback(null,1);
   },1000)
});
queue.tapAsync('2',function(data,callback){
    setTimeout(function(){
        console.log(2);
        callback(null,2);
    },2000)
});
queue.tapAsync('3',function(data,callback){
    setTimeout(function(){
        console.log(3);
        callback(null,3);
    },3000)
});
queue.callAsync('zfpx',(err,data)=>{
    console.log(err,data);
    console.timeEnd('cost');
});
```
### tapPromise
```js
let {AsyncSeriesWaterfallHook} = require('tapable');
class AsyncSeriesWaterfallHook {
    constructor() {
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        //first是第一个函数， tasks是剩下的函数
        let [first, ...tasks] = this.tasks;
        return tasks.reduce((a, b) => {
            return a.then((data) => b(data));
        }, first(...args));
    }
}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(name, 1);
            resolve(1);
        }, 1000);
    });
});
queue.tapPromise('2', function (data) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(data, 2);
            resolve(2);
        }, 2000);
    });
});
queue.tapPromise('3', function (data) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(data, 3);
            resolve(3);
        }, 3000);
    });
});
queue.promise('zfpx').then(err => {
    console.timeEnd('cost');
});
```
##  tapable
```js
const {Tapable,SyncHook} = require("tapable");
const t = new Tapable();
t.hooks = {
    myHook: new SyncHook()
};
let called = 0;
t.plugin("my-hook", () => called++);
t.hooks.myHook.call();
t.plugin("my-hook", () => called += 10);
t.hooks.myHook.call();
console.log(called);
```
---------------------
## 参考
- [webpack-internal-plugin-relation](https://github.com/alienzhou/webpack-internal-plugin-relation)
- [webpack系列之二Tapable](https://juejin.im/post/5c25f920e51d45593b4bc719)