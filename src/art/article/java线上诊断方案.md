---
title: java 线上诊断方案
icon: house-medical
date: 2019-12-03
auther: xk
category:
    - 文章
    - 问题解决
tag: 
    - 记录
    - 解决方案
copyright: xk
---


## java线上诊断方法
1. 原生方法
		Linux原生命令 top、printf
		jdk自带命令工具 jstack、jstat
2. Arthas（阿尔萨斯）
		阿里开源针对java的线上诊断工具
		Arthas的githup官网 https://github.com/alibaba/arthas
		Arthas 支持JDK 6+，支持Linux/Mac/Windows，采用命令行交互模式，
		同时提供丰富的 Tab 自动补全功能，进一步方便进行问题的定位和诊断
3. show-busy-java-theads(淘宝开源)
		show-busy-java-threads.sh，这个工具是useful-scripts工具集的其中一个工具。
		useful-scripts的github网址：https://github.com/oldratlee/useful-scripts。
		show-busy-java-threads用于快速排查Java的CPU性能问题(top us值过高)，
		自动查出运行的Java进程中消耗CPU多的线程，并打印出其线程栈，从而确定导致性能问题的方法调用。

注意：
此工具的核心还是使用jdk的jstack方法，只是在其上做了封装展示