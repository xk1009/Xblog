---
# 这是文章的标题
title: Jenkins 
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: j
# 这是侧边栏的顺序
# order: 3
# 设置作者
author: XK
# 设置写作时间
date: 2023-03-01
# 一个页面可以有多个分类
category:
  - jenkins
  - O&M
# 一个页面可以有多个标签
tag:
  - jenkins
  - 笔记
  - 记录
  
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: false
# 你可以自定义版权信息
copyright: xk
---

# 持续集成jenkins

###### 瀑布开发模型

    像瀑布一样 流水线，不可逆
        1.需求分析
        2.设计
        3.代码开发
        4.测试
        5.部署
        6.维护

###### 敏捷开发模型

    核心是迭代开发和增量开发
    迭代开发
        将一次大型开发 分成 若干个小型开发
        每次小型开发都是同样的流程
    增量开发
        按照新功能来划分迭代

###### 持续集成

    频繁的将代码集成到主干
    持续集成的目的是：让产品可以快速迭代，同时还能保持高质量
    它的核心措施是：将代码集成到主干之前，必须通过自动化集成

***

###### 开启与关闭

    启动
    service jenkins start

    重启
    service jenkins restart

    停止
    service jenkins stop

