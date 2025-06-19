---
icon: v
date: 2021-07-21
category:
  - frontEnd
  - vue
tag:
  - frontEnd
  - vue
  - 笔记
  - 记录

title: vue
star: true
pageview: true
---

## vue 实现了变量与模型的双向绑定

减少 dom 操作（虚拟 dom），提高渲染效率，双向数据绑定

## 特点及优势

- 利用虚拟 DOM 渲染
- 轻量级
- 响应式组件
- 支持服务器渲染
- 易于集成路由工具，打包工具以及状态管理工具

## 条件判断

v-if ：变量值为 true/false，支持表达式 大于小于等于，如果为 false，直接没有这条数据
v-show ：变量值为 true/false，支持表达式 大于小于等于，如果为 false，实际是隐藏数据
反复使用 用 v-show，减少渲染性能更好，只使用一次 用 v-if

## 方法绑定

使用@click=‘方法名’ 实际上是 v-on:click
方法写再 methods 中
object.freeze()方法解除绑定
这会阻止修改现有属性，及相应系统无法再最终变化

## 循环

v-for ： v-for=“item，index in list” ，item 循环后的变量值，index 索引值，list 被循环变量

## 属性中绑定数据

变量时使用冒号：来实现属性绑定 实际上是 v-bind：

## key 属性

设置 key 属性是给 VUE 使用的，用来强调重置
插入一次不再修改
使用 v-once 属性
添加 html 内容
使用 v-html='变量名' 使用这种方式会存在 xss 攻击 嵌入 script 标签等

## 计算属性 computed

会将结果进行缓存，只要条件内容变化就会重新计算

## 侦听器 watch

只要属性发生改变就会触发事件，使用过多会使性能下降

## 事件绑定

可以使用表达式的方式 @click=‘变量+=1’ 点击一次变量加一

## 事件修饰符参考文档

例如 .stop 修饰符 阻止冒泡事件
修饰符可以组合使用 直接链式编程 ，.stop.trim

## VUE 生命周期 8 个钩子函数可调用

1. beforeCreate：此时数据 data 和事件方法还未绑定
2. create：数据和方法绑定到 vue 实例上
3. beforeMount：渲染（挂载）之前，根据数据生成的 DOM 对象无法拿到
4. mounted：渲染之后，可以拿到数据生成的 DOM 对象
5. beforeUpdate：更新之前
6. updated：更新之后
7. beforeDistrioy：销毁之前
8. distroyed：销毁之后

## vue 组件

```javascrpt
定义组件
Vue.component(‘组件名称’，{
template：，

//通过父元素Vue，传递数据或方法到组件中
props：['来至父元素的变量名称或者方法名称']
})

$emit('方法名'，参数) 子组件可以触发父Vue的方法
$parent.方法名 子元素调用父元素方法 同理可以拿到父元素的属性

$root 根组件

v-model
<slot> 插槽标签

```

axios 安装
router 安装

LESS =》 css 编程语言
模块化开发 ，虚拟 dom

computed 类似于内存缓存
计算属性 计算出的结果保存到属性中 内存中运行

page 视图组件
com

## vue 打包安卓 apk 包

https://www.cnblogs.com/fanqiuzhuji/p/12696347.html 
1. 调整线上环境先将项目 build
2. hbuilder 新建项目 h5+app 
3. 将 build 后的 dist 文件中内容复制到新项目中 
4. 配置 manifest.json 文件 
5. 发行 原生 app 云打包
