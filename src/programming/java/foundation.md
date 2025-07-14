---
icon: grip-lines
category:
  - java
  - foundation
  - 基础
tag:
  - java
  - foundation
  - 笔记
  - 记录
  - 基础

title: java基础
star: true
pageview: true
---

## 面向对象特征(封装，继承，多态，抽象)
1. 封装：
  将对象封装成一个相对封闭和高度自治的个体，通过自己的方法来获取或改变其属性值。

2. 继承：
  继承父类的所有属性和方法，作为自己的内容，同时加入若干自己的新的内容，或修改原来的方法使之更适合特殊的需要。

3. 多态：
  是指程序中定义的引用变量所指向的具体类型和通过该引用变量发出的方法调用在编程时并不确定，而是在程序运行期间才确定，即一个引用变量倒底会指向哪个类的实例对象，该引用变量发出的方法调用到底是哪个类中实现的方法，必须在由程序运行期间才能决定

4. 抽象：
  将一些事物的相识和共同之处，将事物归为一个类，这个类只考虑这些事物的相识和共性之处

## string，stringbuffer，stringbuilder
* string底层使用了final char[] 字符数组，所以其内容是不可变的
* stringbuffer是线程安全的，stringbuilder线程不安全
* 字符串拼接使用stringbuffer或者stringbuilder，builder相对于buffer效率高

## java集合
* set集合：
  不允许相同元素加入集合，若相同元素使用set的add方法将返回false，判断元素是否相同是通过equals方法判断的，只要equals返回true，set就不会添加

* HashSet：
  1. 不能保证顺序一致；
  2. 不是同步的；
  3. 集合元素可以是null，只能放入一个null
  判断元素是否相同是通过equals和hashCode方法同时相等

* LinkedHashSet：
  1. 顺序可保证，通过hashcode决定位置，通过链表来维护元素的次序；
  2. 遍历时性能比hashSet好，添加时次于hashSet

* treeSet：
  1. 可以确保元素的排序状态，支持自然排序和定制排序，自然排序为默认排序规则，
  2. 判断元素是否相等时通过equals和compareTo方法比较

* List集合：
  有序，可重复，因为其有索引，所以查询速度快，添加和删除时伴随着后面元素的移动，所以添加和删除相对较慢

* ArrayList：
  基于数组实现，可以使用sort方法实现排序提供Comparator比较器即可，扩容为旧容量的一半，即50%

* linkedList：
  基于链表实现，双向链表，每个节点维护了上一个和下一个值的指针

* vector：
  线程安全的，扩容为100%

* map集合（键值对，键唯一，值不唯一）
1. hashMap：线程不安全，可以用null作为k或v，数组+链表+红黑树，初始容量为16，扩容为旧容量的2倍
2. hashTable：线程安全，会锁住整个对象，null不能作为k或v
3. LinkedHashMap：有序
4. treeMap：基于红黑二叉树，有序
5. ConccurentHashMap：线程安全，null不能作为k或v，CAS+同步锁，数组+链表+红黑树

* 线程不安全的集合都可以使用 collections.synchronized()方法，使其线程安全
  CopyOnWrite集合，可实现线程安全，其工作原理是先copy一个容器在其中添加或删除，完成之后再指向新的容器，这种使用于读多写少的情况

## 线程的实现方式
1. 继承Thread类，并重写其run()方法。
2. 实现Runnable接口，并实现其run()方法。
3. 实现Callable接口，并实现其call()方法。



## ++与--
++在前是 先加再用
++在后是 先用再加
--同理
