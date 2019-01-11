---
title: webpack-bundle-源码
copyright: true
date: 2019-01-11 15:49:58
tags: ['webpack','webpack源码']
---

## webpack打包基础源码

```js
 (function(modules) { // webpack 启动函数
 	//  模块的缓存
 	var installedModules = {};

 	// webpack自己实现的在浏览器里能够执行的require方法
 	function __webpack_require__(moduleId) {

 		// 看看此模块是否在缓存中
 		if(installedModules[moduleId]) {
            // 如果缓存有的话，则取它缓存的模块的对象的exports属性并返回
 			return installedModules[moduleId].exports;
 		}
 		// 创建一个新的模块，并且放置到缓存
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

         // 执行模块函数,传入参数 
        //  1 module.exports=this 2.module 模块对象  3.module.exports 模块的导出对象 4.require方法
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// 把模块标识 为已加载 loaded=true
 		module.l = true;

 		// 返回模块的导出对象
 		return module.exports;
 	}


 	// 把modules挂载到require的m属性
 	__webpack_require__.m = modules;

 	// 把模块的缓存挂载到require的c属性上
 	__webpack_require__.c = installedModules;

 	// 定义(define)一个getter方法 1导出对象 2名称 3 getter
 	__webpack_require__.d = function(exports, name, getter) {
        //  判断对象有没有某个属性 exports.hasOwnProperty(name)
 		if(!__webpack_require__.o(exports, name)) {
        //给exports对象定义name属性，值是可枚举的，get
             Object.defineProperty(exports, name, { enumerable: true, get: getter });
         //   exports[name]
 		}
 	};

 	/**
     * 对象的Symbol.toStringTag属性，指向一个方法
     * 在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型
     * 也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串
     * ({[Symbol.toStringTag]: 'Foo'}.toString())  "[object Foo]"
    */
    // 在导出对象上定义__esModule属性
    //如果此exports对象__esModule属性为true的话，表示这是一个es6的模块
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            // 如果是支持es6的Symbol属性的话，那么定义属性 exports[Symbol.toStringTag] ='Module'
             Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            //  exports.toString = "[object Module]"
         }
        //  exports['__esModule'] = true;
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};

 	// create a fake namespace object
 	// mode & 1: value is a module id, require it
 	// mode & 2: merge all properties of value into the ns
 	// mode & 4: return value when already ns object
 	// mode & 8|1: behave like require
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	// 获取默认导出函数为了兼容性 参数就是module对象
     __webpack_require__.n = function(module) { //hello
    //先拿到一个getter,如果是es模块，返回模块的default,否则返回自身
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
             function getModuleExports() { return module; };
    //var getter =function() { return 'hello'; };
    //给getter上定义一个a属性，值为getter
    //该模块的a属性 = 模块本身
         __webpack_require__.d(getter, 'a', getter);
    // get a(){return 'a'}   obj['a']
    // getter['a'] = getter;
    //(function() { return 'hello'; })['a'] =  (function() { return 'hello'; })
 		return getter;
 	};

 	// // Object.prototype.hasOwnProperty.call
    //判断对象有没有某个属性
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	//webpack的公开路径  webpack publicPath
 	__webpack_require__.p = "";


 	// 加载入口模块并且返回导出对象 s就是入口标识符
 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })
 //modules是一个对象，有属性和值，属性就是此模块的ID，其实就是相对于根目录的相对路径
 ({

 "./src/index.js":
 (function(module, exports) {
eval("console.log('1')");
 })
 });
```

### webpack打包懒加载源码
./src/index.js
```js
document.querySelector("#root").addEventListener("click",()=>{
    import("./a.js").then(res=>res)
})
```
bundle.js
```js
 (function (modules) { //webpack的启动函数
   // 安装一个JSONP的回调为了加载chunk代码块
   function webpackJsonpCallback(data) {//data=[[0],additionalModules]
     var chunkIds = data[0];//第一个元素是chunkId的数组
     var moreModules = data[1];//这个chunk里包含的额外更多的模块


     // 把这次取出来的更多的模块添加到modules对象中
     // 然后把所有的chunkIds标识为已加载，并且执行回调函数
     var moduleId, chunkId, i = 0,
       resolves = [];
     for (; i < chunkIds.length; i++) {//循环本次取出来的chunkIds
       chunkId = chunkIds[i];//先取出一个chunkId
       if (installedChunks[chunkId]) {//如果说有值的话
         //把这个installedChunks[chunkId]的0元素，promise resovle方法添加resolves数组中去
         resolves.push(installedChunks[chunkId][0]);
       }
       installedChunks[chunkId] = 0;//加载完成
     }
     //循环迭代新模块并且
     for (moduleId in moreModules) {
         //把新的模块对象的上的属性全部合并或者说拷贝到老的modules对象上
       if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
         modules[moduleId] = moreModules[moduleId];
       }
     }
     //如果parentJsonpFunction有值的话，调用它,其实就是jsonArray.push方法
    //  如果没值说明先加载异步模块,window["webpackJsonp"]已经添加了该数组
     if (parentJsonpFunction) parentJsonpFunction(data);
    //依次调用resolve方法，让每个promise都成功
     while (resolves.length) {
        //缓存的异步模块直接提示成功  resolve()
       resolves.shift()();
     }

   };



  // 模块的缓存
   var installedModules = {};


    // 这是一个对象，用来存放加载过的和加载中的代码
    //chunk=undefined 表示未加载
    // chunk=null 表示预加载或者预获取
    //chunk=promise 的话表示加载中
    //chunk=0 表示已加载或者说加载完成
   var installedChunks = {
     "main": 0
   };



   // 用来生成脚本路径的函数
   function jsonpScriptSrc(chunkId) {
     return __webpack_require__.p + "" + chunkId + ".bundle.js"
   }

   // require方法
   function __webpack_require__(moduleId) {

     // 检查模块是否在缓存
     if (installedModules[moduleId]) {
       return installedModules[moduleId].exports;
     }
     // 创建一个新模块并且放到缓存中
     var module = installedModules[moduleId] = {
       i: moduleId,
       l: false,
       exports: {}
     };

     // 执行模块函数，给module.exports赋值
     modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

     // 把模块设置为已加载
     module.l = true;

     // 返回模块的导出对象
     return module.exports;
   }

    // 这个文件只包含入口chunk
  //这个代码块加载函数是为了加载额外的模块
//   chunkId=0
   __webpack_require__.e = function requireEnsure(chunkId) {

     var promises = [];//创建一个空的promise数组


     // 先取出此chunkID对应的值 ,第一次的肯定是没有值
     var installedChunkData = installedChunks[chunkId];
     if (installedChunkData !== 0) { // 0 means "already installed".

       // 如果返回值是一个promise表示正在加载
       if (installedChunkData) {
         promises.push(installedChunkData[2]);
       } else {
        //   在chunk缓存中创建一个promise
         var promise = new Promise(function (resolve, reject) {
            //  将chunkData的数据赋值为一个数组 1.promise.resolve 2.promise.reject
           installedChunkData = installedChunks[chunkId] = [resolve, reject];
         });
        //  把installedChunkData[2]赋值为整个promise并且添加到promise数组中去
         promises.push(installedChunkData[2] = promise);

         // 开始代码块的加载
         var script = document.createElement('script'); //创建一个script脚本
         var onScriptComplete; //当脚本完成后

         script.charset = 'utf-8';//设置脚本的编码
         script.timeout = 120;//设置脚本的超时时间
         if (__webpack_require__.nc) { //用来安全处理的 nonce
           script.setAttribute("nonce", __webpack_require__.nc);
         }
        //  拼出一个URL路径度且赋给script.src
         script.src = jsonpScriptSrc(chunkId);
        // 定义加载后的回调函数
         onScriptComplete = function (event) {
           //  防止IE下面的内存泄露
           script.onerror = script.onload = null;
            // 清除定时器.如果是提前执行此函数，则需要先清除定时器
           clearTimeout(timeout);
            //  取得已安装的代码块中的chunk
           var chunk = installedChunks[chunkId];
           if (chunk !== 0) {//如果不等0表示加载失败
             if (chunk) {
               var errorType = event && (event.type === 'load' ? 'missing' : event.type);
               var realSrc = event && event.target && event.target.src;
               var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
               error.type = errorType;
               error.request = realSrc;
               chunk[1](error);//直接调用chunk[1],把error作为参数传进去，调用promise的reject方法，让promise失败
             }
             //把对应的值置为undefine
             installedChunks[chunkId] = undefined;
           }
         };
          //开启了一个定时器，如果说到了120秒之后请求还没有回来，我们就认为超时了，直接执行回调
         var timeout = setTimeout(function () {
           onScriptComplete({
             type: 'timeout',
             target: script
           });
         }, 120000);
         script.onerror = script.onload = onScriptComplete;
         //把JSONP脚本添加到head标签
         document.head.appendChild(script);
       }
     }
     return Promise.all(promises); //返回一个promise
   };

   // expose the modules object (__webpack_modules__)
   __webpack_require__.m = modules;

   // expose the module cache
   __webpack_require__.c = installedModules;

   // define getter function for harmony exports
   __webpack_require__.d = function (exports, name, getter) {
     if (!__webpack_require__.o(exports, name)) {
       Object.defineProperty(exports, name, {
         enumerable: true,
         get: getter
       });
     }
   };

   // define __esModule on exports
   __webpack_require__.r = function (exports) {
     if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
       Object.defineProperty(exports, Symbol.toStringTag, {
         value: 'Module'
       });
     }
     Object.defineProperty(exports, '__esModule', {
       value: true
     });
   };

   // create a fake namespace object 创建一个模拟的命名空间
   // mode & 1: value is a module id, require it 模块是一个模块标识符
   // mode & 2: merge all properties of value into the ns 把所有的属性合并到ns上
   // mode & 4: return value when already ns object 当ns对象OK后返回value
   // mode & 8|1: behave like require 和require表现一样
   __webpack_require__.t = function (value, mode) {
       //如果说mode是1的话，则用require去加载这个模块
     if (mode & 1) value = __webpack_require__(value);
      //如果mode是8的话，则直接返回
     if (mode & 8) return value;
     //如果是mode是4的话 直接返回value
     if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
      //创建一个空的对象
     var ns = Object.create(null);
      //r就是在对象上定义__esModule= true
     __webpack_require__.r(ns);//ns是一个es模块  es.__esModule= true
       //ns的default属性为value
     Object.defineProperty(ns, 'default', {
       enumerable: true,
       value: value
     });
      // ns['default'] = value;
       //如果mode值是2的话，把value上的所有属性全部拷贝到ns上
     if (mode & 2 && typeof value != 'string')
       for (var key in value) __webpack_require__.d(ns, key, function (key) {
         return value[key];
       }.bind(null, key));
     return ns;//ns = {__esModule:true,default:'video'}
   };

   // getDefaultExport function for compatibility with non-harmony modules
   __webpack_require__.n = function (module) {
     var getter = module && module.__esModule ?
       function getDefault() {
         return module['default'];
       } :
       function getModuleExports() {
         return module;
       };
     __webpack_require__.d(getter, 'a', getter);
     return getter;
   };

   // Object.prototype.hasOwnProperty.call
   __webpack_require__.o = function (object, property) {
     return Object.prototype.hasOwnProperty.call(object, property);
   };

   // __webpack_public_path__
   __webpack_require__.p = "";

   // on error function for async loading
   __webpack_require__.oe = function (err) {
     console.error(err);
     throw err;
   };
    // 刚开始的时候webpackJsonp是undefined,那么就给他一个空数组
   var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
    //  给数组的push方法绑定数组本身,如果以后有人再调用oldJsonpFunction,就相当于调用jsonpArray.push
   var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
    //让新数组的push方法指向另外一个函数webpackJsonpCallback
   jsonpArray.push = webpackJsonpCallback;
   //拷贝出来一个新的数组 
   jsonpArray = jsonpArray.slice();
    //如果异步函数先加载完成执行的话， window["webpackJsonp"]为一个数组,寻韩执行这个函数 
   for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
    //   window["webpackJsonp"]的push方法赋值给parentJsonpFunction
   var parentJsonpFunction = oldJsonpFunction;


   // 加载入口模块并且返回导出对象 s就是入口标识符
   return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })

 ({
   "./src/index.js":
     (function (module, exports, __webpack_require__) {
       eval(`document.querySelector("#root").addEventListener("click",()=>{
      __webpack_require__.e(0).then(__webpack_require__.t.bind(null,"./src/a.js", 7)).then(res=>res)
  })`);
     })
 });

```
0.bundle
```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

"./src/a.js":

 (function(module, exports) {

eval("console.log('1')");

 })

}]);
```