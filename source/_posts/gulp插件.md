---
title: gulp插件
date: 2018-05-30 15:44:08
tags: ['gulp','插件']
---
### gulp插件
<!--more-->
#### gulp-rev-append
gulp-rev-append给页面的引用添加版本号，清除页面引用缓存。通过正则(?:href|src)=”(.*)[?]rev=(.*)[“]查找并给指定链接填加版本号(默认根据文件MD5生成，因此文件未发生改变，此版本号将不会变)
```html
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" href="css/style.css?rev=@@hash">
    <script src="js/js-one.js?rev=@@hash"></script>
    <script src="js/js-two.js"></script>
  </head>
  <body>
    <div>hello, world!</div>
    <img src="img/test.jpg?rev=@@hash" alt="" />
    <script src="js/js-three.js?rev=@@hash"></script>
  </body>
</html>
```
```js
var gulp = require('gulp'),
    rev = require('gulp-rev-append');
 
gulp.task('testRev', function () {
    gulp.src('src/html/index.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/html'));
});
```
#### del
在 `gulpfile` 中，我们希望在运行我们的编译任务之前，将 `mobile` 文件的内容先清理掉：
```js
var gulp = require('gulp');
var del = require('del');

gulp.task('clean:mobile', function (cb) {
  del([
    'dist/report.csv',
    // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
    'dist/mobile/**/*',
    // 我们不希望删掉这个文件，所以我们取反这个匹配模式
    '!dist/mobile/deploy.json'
  ], cb);
});

gulp.task('default', ['clean:mobile']);
```

#### gulp-load-plugins
这个插件能自动帮你加载package.json文件里的gulp插件。 例如假设你的package.json文件里的依赖是这样的:
```js
    "devDependencies": {
       "gulp": "^3.9.0",
       "gulp-concat": "^2.6.0",
       "gulp-connect": "^2.2.0"
     }
```
然后我们可以在gulpfile.js中使用gulp-load-plugins来帮我们加载插件
```js
    var gulp = require('gulp');
    var $ = require('gulp-load-plugins')();
```
然后我们要使用gulp-concat和gulp-connect这两个插件的时候， 就可以使用$.concat和$.connect来代替了,也就是原始插件名去掉gulp-前缀，之后再转换为驼峰命名

#### gulp-concat
这个插件可以把几个文件合并到一块
```js
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concat',function(){
    return gulp.src(['app/js/*.js','!app/js/*.tmp.js'])//指定要合并的文件glob
        .pipe(concat('app.js'))//进行合并并指定合并后的文件名
        .pipe(gulp.dest('dist/js'));//输出到目标路径
});

gulp.task('default',['concat']);
```
#### gulp-uglify
合并后我们可以对JS文件进行压缩,最小化处理
```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify')

gulp.task('uglify',function(){
    return gulp.src(['app/js/*.js','!app/js/*.tmp.js'])
        .pipe(concat('app.js')) //把多个JS文件合并成一个文件
        .pipe(uglify()) //对合并后的app.js文件进行压缩
        .pipe(gulp.dest('dist/js')); //输出到目的地
});

gulp.task('default',['uglify']);
```

#### gulp-rename
在把处理好的文件存放到指定的位置之前，我们可以先去重新命名一下它
```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('uglify',function(){
    return gulp.src(['app/js/*.js','!app/js/*.tmp.js'])//指定要处理的文件
        .pipe(concat('app.js'))//合并成一个文件
        .pipe(gulp.dest('dist/js'))//保存此文件
        .pipe(uglify())//进行压缩
        .pipe(rename('app.min.js'))//对此文件进行重命名
        .pipe(gulp.dest('dist/js'));//再输出一次
});

gulp.task('default',['uglify']);
```

#### gulp-minify-css
压缩css
```js
var gulp = require('gulp');
var less = require('gulp-less');
var minify = require('gulp-minify-css');//在文件的顶部去包含这个插件，起个名字，叫做 minify
var rename = require('gulp-rename');
gulp.task('minify',function(){
    return gulp.src('app/less/page.less')//指定 less文件
        .pipe(less())//把less编译成css
        .pipe(gulp.dest('dist/css'))//输出到目的地
        .pipe(minify())//对 css再进行压缩
        .pipe(rename('page.min.css'))//重命名
        .pipe(gulp.dest('dist/css'));//输出到目的地
});

gulp.task('default',['less']);
```
#### gulp-minify-html
压缩html
```js
var gulp = require('gulp'),
    minifyHtml = require("gulp-minify-html");

gulp.task('minify-html', function () {
    gulp.src('src/*.html') // 要压缩的html文件
    .pipe(minifyHtml())    //压缩
    .pipe(gulp.dest('dist/html'));//输出到目的地
});
```
#### gulp-imagemin
如果要想在保证不改变图像质量的情况下，让图像文件的体积变得更小一点,我们可以使用`gulp-imagemin`
```js
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('copy-images',function(){
    return gulp.src('app/imgs/**/*.{jpg,png}')//指定要压缩的图片
        .pipe(imagemin()) //进行图片压缩
        .pipe(gulp.dest('dist'));//输出目的地
});

gulp.task('default',['copy-images']);
```
#### gulp-connect
有些时候我们需要把文件放到本地服务器上去预览，gulp-connect可以帮我们创建一个本地服务器去运行我们的项目
```js
var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('server',function(){
    connect.server({
        root:'dist',//服务器的根目录
        port:8080 //服务器的地址，没有此配置项默认也是 8080
    });
});

gulp.task('default',['server']); //运行此任务的时候会在8080上启动服务器
```
#### 自动刷新 
我们希望当文件变化的时候浏览器可以自动刷新，这样我们就不需要文件修改后手动去刷新浏览器了
```js
var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('copy-html',function(){
gulp.src('app/index.html')//指定源文件
    .pipe(gulp.dest('dist'))//拷贝到dist目录
    .pipe(connect.reload());//通知浏览器重启
});

gulp.task('watch',function(){
gulp.watch('app/index.html',['copy-html']);//当index.html文件变化时执行copy-html任务
});

gulp.task('server',function(){
connect.server({
root:'dist',//服务器的根目录
port:8080, //服务器的地址，没有此配置项默认也是 8080
livereload:true//启用实时刷新的功能
});
});
gulp.task('default',['server','watch']);//运行此任务的时候会在8080上启动服务器，
```
#### jshint 
可以用此插件进行代码检查,注意必须同时安装jshint和gulp-jshint 全部选项
```js
var gulp = require('gulp'),
    jshint = require("gulp-jshint");

gulp.task('jsLint', function () {
    gulp.src('src/*.js')
    .pipe(jshint()) //进行代码检查
    .pipe(jshint.reporter()); // 输出检查结果
});
```
#### sass的编译
```js
var gulp = require('gulp'),
    sass = require("gulp-sass");
 
gulp.task('compile-sass', function () {
    gulp.src('sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});
```
### 自定义插件
`gulp.src()`中这个流里的内容不是原始的文件流,而是一个虚拟文件对象流,这个虚拟文件对象中存储着原始文件的路径、文件名和内容等信息 [vinyl](https://github.com/gulpjs/vinyl)
```js
var File = require('vinyl');

var indexFile = new File({
    cwd: "/",//当前路径
    base: "/test/",//文件名
    path: "/test/index.js",//路径
    contents: new Buffer("name=zfpx")//文件内容
});

console.log(File.isVinyl(indexFile));//是否是vinyl
console.log(indexFile.isBuffer());//内容是否是Buffer
console.log(indexFile.isStream());//内容是否是Stream
```
#### through2
through2：`Node Stream`的简单封装，目的是让链式流操作更加简单
[二进制流的方式](https://www.npmjs.com/package/through2)
```js
 var through2 = require('through2');
 var fs = require('fs');

 fs.createReadStream('src.txt',{highWaterMark:1})
     .pipe(through2(function (chunk, encoding, callback) {
         for (var i = 0; i < chunk.length; i++)
             chunk[i] = chunk[i] + 1;
         this.push(chunk); //向流中写数据,每push一次就发射一次data事件
         callback();
     })).on('data', function (data) {
        console.log(data.toString());
     }).on('end', function (data) {
        console.log('end');
 })
 //.pipe(fs.createWriteStream('dest.txt'))
```
对象方式
```js
var through2 = require('through2');
var fs = require('fs');
var all = [];
fs.createReadStream('src.txt', {highWaterMark: 1})
.pipe(through2.obj(function (chunk, enc, callback) {
    var data = {
        name: chunk.toString()
    }
    this.push(data);
    callback();
}))
.on('data', function (data) {
    console.log(data)
})
.on('end', function () {
    console.log('end')
})
```
#### 插件入门
```js
module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        //file对象就是虚拟文件流
        // 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        // 插件不支持对 Stream 对直接操作，跑出异常
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        // 将文件内容转成字符串，并调用 preprocess 组件进行预处理
        // 然后将处理后的字符串，再转成Buffer形式
        var content = pp.preprocess(file.contents.toString(), options || {});
        file.contents = new Buffer(content);

        // 下面这两句基本是标配啦，可以参考下 through2 的API
        this.push(file);

        cb();
    });
};
```
-----
**参考文档：**
- [插件编写入门](http://www.cnblogs.com/chyingp/p/writting-gulp-plugin.html)