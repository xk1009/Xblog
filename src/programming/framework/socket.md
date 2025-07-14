---
icon: wave-square
category:
  - java
  - foundation
  - 基础
  - socket
tag:
  - java
  - foundation
  - 笔记
  - 记录
  - 基础
  - socket

title: socket
star: true
---
springboot_socket 
不能使用@Autowired注入问题

原因：
socket是线程安全的，用户连接时就创建一个新的端点实例，一个端点只能保证一个线程调用，所以socket对象是多例对象；
而spring是单例模式，@Autowired是在spring初始化的时候创建单例对象并注入其中，并不是在实际使用的时候再注入；
socket是有连接的时候再实例化，所以此时并没有注入；

解决方案：写一个工具类，通过工具类在spring容器中去获取对象。

顺便提下，通过spring来管理对象的创建默认都是单例的 通过@socpe注解来设置

对象的生命周期：单例对象在spring容器中，spring初始化时创建，spring容器销毁随之而销毁，
多利对象在使用时初始化创建，在使用过程中一直存活，当对象长时间不使用，通过gc来销毁。