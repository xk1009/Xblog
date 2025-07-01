---
icon: tree
date: 2019-12-23
category:
  - java
  - foundation
  - 基础
  - spring
tag:
  - java
  - foundation
  - 笔记
  - 记录
  - 基础
  - spring

title: spring
star: true
pageview: true
---

## spring 创建bean的三种方式
1. 使用默认构造函数 xml中配置bean id 和class
2. 使用普通工厂（类）中的方法来创建对象并存入spring容器
	xml中 配置factory-bean 和factory-method
3. 使用静态工厂（类）中的静态方法创建对象并存入容器
	xml中 使用factory-method指定静态方法

## bean的作用范围
scope属性：
    singleton 单利 （默认）
    prototype 多利
    request 作用于web应用的请求范围
    session 作用于web应用的会话范围
    global-session 作用于集群环境会话范围（全集会话范围），
        当不上集群环境时，就是session

## bean的生命周期
* 单利 spring加载创建容器 初始化 容器一直在一直活着 容器销毁对象销毁
* 多利 使用时创建初始化 使用过程中一直活着 当对象长时间不用 由gc回收
	
## 常用注解：	
* @bean 注解 将方法的返回值作为javabean 存入spring容器 默认方法名为key，通过name属性指定key
* @Import 在主配置类中导入其他配置类
* @PropretiesSource 读取配置文件

## spring事务传播行为   
说明：方法1调用方法2 两个方法都是有事务的 在1掉2中 方法2的事务是属于方法1 的 还是从新开启一个事务呢？这个是由于2的事务传播行为决定的 
七种传播行为:
	1.PROPAGATION_REQUIRED 如果当前没有事务就创建一个事务，当前有事务就加入事务，spring默认的            常用
	2.PROPAGATION_SUPPORTS 支持当前事务，如果当前有事务就加入当前事务，如果没有事务就非事务执行        常用
	3.PROPAGATION_MANDATORY 支持当前事务，如果当前存在事务，就加入事务，如果当前不存在事务，就抛出异常
	4.PROPAGATION_REQUIRES+_NEW创建新事务，无论当前存不存在事务，都创建新事务
	。。。