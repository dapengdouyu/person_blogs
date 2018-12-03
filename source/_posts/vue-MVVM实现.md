---
title: vue-MVVM实现
copyright: true
date: 2018-09-20 13:53:33
tags: [vue,MVVM]
---
### MVVM概括
- **MVVM**双向数据绑定,**MVVM**的数据影响视图,视图影响数据
- **angular** 脏值检测,而**vue**却是**数据劫持**+**发布订阅模式**
- 由于**vue**是通过**Object.difineProperty**实现的,所以不见同低版本

### Object.difineProperty(属性描述对象)
- 通过`var obj={p:'a'}`,创建对象,默认情况如下:
```js
var obj={p:'a'}
Object.getOwnPropertyDescriptor(obj,'p')
// {
//     configurable:true, //属性是否可删除
//     enumerable:true, //属性是否可枚举
//     value:"a",//值
//     writable:true//属性是否可写
// }
```
- 通过`Object.defineProperty(obj,"p",{})`,默认情况如下：
```js
var obj={}
Object.defineProperty(obj,"p",{})
Object.getOwnPropertyDescriptor(obj,"p")
// {
//     value: undefined,
//     writable: false,
//     enumerable: false, 
//     configurable: false
// }
```
- 当`set`,`get`添加时,`value`和`writable`不能共存，会报错

- Object.defineProperty的一个bug
```js
var person = { a:1 } 
// 注:里面的this指向ogj(person) 
Object.defineProperty(person,'a',{ 
    get(){ 
        return this.a 
        }, 
    set(val){ 
        this.a = val
         } 
    })
 //我们想当然的这么写. 
 person.a //Uncaught RangeError: Maximum call stack size exceeded 
 // 什么,溢出了?这是为什么? 
 // 哦~原来是这么写的话会造成循环引用,狂call不止 
 // 我们看下流程: // person.a → get.call(person) → this.a → person.a → get.call(person) → this.a......。

```

### 数据劫持(模拟vue)
- 将vue-data中的数据劫持到Object.defineProperty
```js
var vue=new Vue({
    el:'#app',
    data:{ 
        a:1
    }
})
```
```js
//mvvm
class Vue{
    constructor(options){
        //将所有属性挂载到$options上
        this.$options=options
        //将data数据挂载到this._data上
        let data=this._data=options.data;
        Vue.observe(data)
    }
    static observe(data){
        //数据劫持函数 工厂模式
        if(typeof data !== 'object'){
            return;
        }
        return new Observe(data)
    }
}

class Observe{
    constructor(data){
        //循环遍历data，将每一个属性都挂载到Object.defineProperty上
        for(let key in data){
            let val=data[key]
            Vue.observe(val)
            Object.defineProperty(data,key,{
                enumerable:true,
                configurable:true,
                get(){
                    return val;
                },
                set(newval){
                    if(val===newval){
                        return;
                    }
                    val=newval
                    Vue.observe(newval)
                }
            })
        }
    }
}
```
### 数据代理
我们现在可以通过`vue._data.a`来更改数据了,但是我们更需要通过`vue.a`来更改数据，所以就需要代理一下
```js
 static proxy(vm,data){
        //数据代理
        for(let k in data){
            Object.defineProperty(vm,k,{
                enumerable:true,
                configurable:true,
                set(newval){
                    vm._data[k]=newval
                },
                get(){
                    return vm._data[k]
                }
            })
        }
    }
```
### 模版编译
```js
   static compile(vm){
       let el=vm.$el=document.querySelector(vm.$options.el)
        //将dom操作移入内存中
        let Fragment =document.createDocumentFragment()
        let child=null;
        while(child=el.firstChild){
            Fragment.appendChild(child)
        }
        //替换
        Vue.replace(vm,Fragment)
        //插入文档中
        el.appendChild(Fragment)
    }
    //模板替换
    static replace(vm,nodes){
        let reg=/\{\{(.*)\}\}/
        Array.from(nodes.childNodes).forEach((node)=>{
            let content=node.textContent
            //正则匹配并且时文本节点
            let res=vm;
            if(reg.test(content) && node.nodeType===3){
                let resArr=RegExp.$1.split(".")
                resArr.forEach(val=>{
                    res=res[val]
                })
                console.log(res)
              node.textContent=content.replace(reg,res)
            }
            if(node.childNodes){
                Vue.replace(vm,node)
            }
        })
    }
```
### 发布订阅模式
我们已经可以通过模板编译，将数据渲染在页面上了,但是还有一个问题就是，当数据更改时，可以实时的渲染在页面上，这就需要**发布订阅模式**了,
所以先写一个发布订阅的例子

**发布订阅**,先有订阅，然后在发布。将数据用一个**数组**存储起来，当发布的时候，遍历整个数组
```js
class AddSub{
    constructor(){
        this.subs=[]
    }
    on(fn){
        this.subs.push(fn)
    }
    emit(){
        this.subs.forEach(item=>item.update())
    }
}
```
规定监听函数上一个**update**方法，便于业务处理
```js
class Watcher{
    constructor(fn){
        this.fn=fn
    }
    update() {
        this.fn()
    }
}
```
测试
```js
let w=new Watcher(function(){
    console.log('1')
})
var add=new addSub()
add.on(w)
add.emit()
```
### 连接视图和数据
我们已经了解了发布订阅模式，现在我们来**连接视图**和**数据**吧
```js
static replace(vm,nodes){
        let reg=/\{\{(.*)\}\}/
        Array.from(nodes.childNodes).forEach((node)=>{
            let content=node.textContent
            //正则匹配并且时文本节点
            let res=vm;
            if(reg.test(content) && node.nodeType===3){
                res=donum(RegExp.$1,res)
             +   new Watcher(RegExp.$1,vm,function(res){
             +       node.textContent=content.replace(reg,res)
             +   })
                node.textContent=content.replace(reg,res)
            }




            if(node.childNodes){
                Vue.replace(vm,node)
            }
        })
    }
    //执行模板数据
function donum(reg,res){
    let resArr=reg.split(".")
    resArr.forEach(val=>{
        res=res[val]
    })
    console.log(res)
    return res
}
class Observe{
    constructor(data){
        //循环遍历data，将每一个属性都挂载到Object.defineProperty上
        let addsub=new AddSub()
        for(let key in data){
            let val=data[key]
            Vue.observe(val)
            Object.defineProperty(data,key,{
                enumerable:true,
                configurable:true,
                get(){
                  +  AddSub.target && addsub.on(AddSub.target)
                    return val;
                },
                set(newval){
                    if(val===newval){
                        return;
                    }
                    val=newval
                    Vue.observe(newval)
                   + addsub.emit()
                }
            })
        }
    }
}

class AddSub{
    constructor(){
        this.subs=[]
    }
    on(fn){
        this.subs.push(fn)
    }
    emit(){
        this.subs.forEach(item=>item.update())
    }
}

//规定监听函数上一个updated方法，便于业务处理

class Watcher{
    constructor(reg,vm,fn){
        this.reg=reg;
        this.vm=vm
        this.fn=fn
        AddSub.target=this;
        donum(this.reg,this.vm) //强制执行get方法
        AddSub.target=null;
    }
    update() {
        let res=donum(this.reg,this.vm)
        this.fn(res)
    }
}
```
### 数据双向绑定
```js
 if(node.nodeType===1){
                //数据双向绑定 属性
            Array.from(node.attributes).forEach(attr=>{
                let name=attr.name;// type="text"
                let exp=attr.value; //v-model="b"
               
                if(name.indexOf("v-")!==-1){
                    node.value=vm[exp]
                    new Watcher(exp,vm,function(newVal){
                        node.value=newVal
                    })
                    

                    node.addEventListener("input",(e)=>{
                        vm[exp]=e.target.value
                    })
                }
            })

```

### computed的实现
```js
static computed(vm){//具有缓存功能
        let computed=vm.$options.computed
        Object.keys(computed).forEach(key=>{
            console.log(computed[key])
            Object.defineProperty(vm,key,{
                enumerable:true,
                configurable:true,
                get:typeof computed[key]==='function'?computed[key]:computed[key].get,
                set(){

                }
            })
           
        })
    }
```

### 参考：
- [Vue双向绑定的实现原理Object.defineproperty](https://www.w3cplus.com/vue/vue-two-way-binding-object-defineproperty.html)
- [Vue的双向绑定原理及实现](https://www.w3cplus.com/vue/vue-two-way-binding.html)
