---
title: gulp
date: 2018-05-29 16:48:22
tags: ['gulp','构建工具']
---

gulp是一个前端构建工具,它通过nodejs中的`stream`来读取和操作数据，速度奇快。
### gulp和grunt的区别
Grunt主要是以文件为媒介来运行它的工作流的，比如在Grunt中执行完一项任务后，会把结果写入到一个`临时文件`中，然后可以在这个临时文件内容的基础上执行其它任务，执行完成后又把结果写入到临时文件中，然后又以这个为基础继续执行其它任务...就这样反复下去。而在Gulp中，使用的是Nodejs中的stream(流)，首先获取到需要的`stream`，然后可以通过stream的pipe()方法把流导入到你想要的地方，比如Gulp的插件中，经过插件处理后的流又可以继续导入到其他插件中，当然也可以把流写入到文件中。所以Gulp是以stream为媒介的，它不需要频繁的生成临时文件，这也是Gulp的速度比Grunt快的一个原因。

<!--more-->
### gulp的安装
- 先安装node,然后全局安装gulp
```sh
npm install -g gulp
```
- 安装局部gulp
```sh
npm i gulp -D
```
- 在项目根目录下建立`gulpfile.js`文件
```js
var gulp = require('gulp');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```
- 运行gulp
```sh
gulp
```
### gulp的工作流程
gulp的使用流程一般是
1. 首先通过gulp.src()方法获取到想要处理的文件流
2. 然后把文件流通过pipe方法导入到gulp的插件中
3. 最后把经过插件处理后的流再通过pipe方法导入gulp.dest()中
4. gulp.dest()方法则把流中的内容写入文件中
```js
var gulp = require('gulp');
gulp.src('script/src.js')             // 获取文件的流的api
.pipe(gulp.dest('dist/dest.js')); // 写文件的api
```
### gulp的API
对于gulp我们只需要知道4个api即可,`gulp.task()`、`gulp.src()`、`gulp.dest()`、`gulp.watch()`其他的可以[参考文档](https://www.gulpjs.com.cn/docs/api/)
#### gulp.src()
gulp.src()方法正是用来获取流的,它可以将匹配的文件转成流,但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流([Vinyl files](https://github.com/gulpjs/vinyl-fs))。这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息
```js
gulp.src(globs[, options])
```
- **globs**参数是文件匹配模式(类似正则表达式),用来匹配文件路径，当多个路径时，可以为数组
- **options**为可选参数。通常情况下我们不需要用到。

gulp匹配规则时[node-glob](https://github.com/isaacs/node-glob),可以了解。

#### gulp.dest()
gulp.dest()方法是用来写文件的，其语法为：
```js
gulp.dest(path[,options])
```
- **path**写入文件的路径
- **options**为可选参数。通常情况下我们不需要用到。

gulp.dest()传入的路径参数只能用来指定要生成的文件的`目录`,而不能指定生成文件的`文件名`

```js
// 最终生成的文件路径为 dist/jquery.js/jquery.js,而不是dist/jquery.js
var gulp = require('gulp');
gulp.src('script/jquery.js').pipe(gulp.dest('dist/jquery.js'));
```
**注意：**gulp.dest(path)生成的文件路径是我们传入的path参数后面再加上gulp.src()中有`通配符`开始出现的那部分路径
通过指定gulp.src()方法配置参数中的base属性，我们可以更灵活的来改变gulp.dest()生成的文件路径
```js
//配置了base参数，此时base路径为script
//假设匹配到的文件为script/lib/jquery.js
//此时生成的文件路径为 build/lib/jquery.js
gulp.src('script/lib/*.js', {base:'script'}).pipe(gulp.dest('build'))
```

#### gulp.task()

`gulp.task`方法用来定义任务，内部使用的是[Orchestrator](https://github.com/robrich/orchestrator)，其语法为

```js

gulp.task(name[, deps], fn)

```
- **name** 为任务名
- **deps** 是当前定义的任务需要依赖的其他任务，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖，则可省略这个参数
- **fn** 为任务函数，我们把任务要执行的代码都写在里面。该参数也是可选的。

```js
gulp.task('mytask', ['array', 'of', 'task', 'names'],
   function() { //定义一个有依赖的任务
      // Do something
  });
```
>如果某个任务所依赖的任务是`异步`的，就要注意了，gulp并不会等待那个所依赖的异步任务完成，而是会接着执行后续的任务

```js
gulp.task('one',function(){
  //one是一个异步执行的任务
  setTimeout(function(){
    console.log('one is done')
  },5000);
});

//two任务虽然依赖于one任务,但并不会等到one任务中的异步操作完成后再执行
gulp.task('two',['one'],function(){
  console.log('two is done');
});
```
**有三种方法解决：**
- **回调函数**来通知gulp这个异步任务已经完成,这个回调函数就是任务函数的第一个参数
```js
gulp.task('one',function(cb){ //cb为任务函数提供的回调，用来通知任务已经完成
  //one是一个异步执行的任务
  setTimeout(function(){
    console.log('one is done');
    cb();  //执行回调，表示这个异步任务已经完成
  },5000);
});

//这时two任务会在one任务中的异步操作完成后再执行
gulp.task('two',['one'],function(){
  console.log('two is done');
});
```
- 定义任务时返回一个**流对象**。适用于任务就是操作`gulp.src`获取到的流的情况
```js
gulp.task('one',function(cb){
  var stream = gulp.src('client/**/*.js')
      .pipe(dosomething()) //dosomething()中有某些异步操作
      .pipe(gulp.dest('build'));
    return stream;
});

gulp.task('two',['one'],function(){
  console.log('two is done');
});
```
- 返回一个promise对象
```js
gulp.task('one',function(){
 return new Promise((resolve,reject)=>{
   setTimeout(function() {
    resolve();
  }, 5000);
 })
});

gulp.task('two',['one'],function(){
  console.log('two is done');
});
```



#### gulp.watch()
- `gulp.watch()`用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩等。其语法为
```
gulp.watch(glob[, opts], tasks)
```
- **glob** 为要监视的文件匹配模式，规则和用法与gulp.src()方法中的glob相同。
- **opts** 为一个可选的配置对象，通常不需要用到
- **tasks** 为文件变化后要执行的任务，为一个数组
```js
gulp.task('uglify',function(){
  //do something
});
gulp.task('reload',function(){
  //do something
});
gulp.watch('js/**/*.js', ['uglify','reload']);
```
- `gulp.watch()`还有另外一种使用方式
```js
gulp.watch(glob[, opts, cb])
```
- glob和opts参数与第一种用法相同
- **cb**参数为一个函数。每当监视的文件发生变化时，就会调用这个函数,并且会给它传入一个对象，该对象包含了文件变化的一些信息，type属性为变化的类型，可以是added,changed,deleted；path属性为发生变化的文件的路径
```js
gulp.watch('js/**/*.js', function(event){
    console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变 
    console.log(event.path); //变化的文件的路径
}); 
```

-------
**参考链接：**
- [gulp官网](https://www.gulpjs.com.cn/)
- [前端构建工具gulpjs的使用介绍及技巧](https://www.cnblogs.com/2050/p/4198792.html#part4)
- [gulp文档](https://zhufengnodejs.github.io/doc/html/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/gulp.html)









