---
icon: server
date: 2023-10-25
category:
  - 服务器
  - 绝密档案
tag:
  - 运维
  - linux
  - 记录
  - 加密

title:  aliyun 真视界服务器
star: false
pageview: true
---

# 阿里云 真视界服务器

##### ECS服务器
    
###### launch-advisor-20210126  1CPU 1G 
    实例id：i-wz9cfzy3lqc3q4bfpj4m
    公网ip：120.79.58.216
    私网ip：172.18.207.59
    
    这台服务器 没有java mysql nginx redis 暂时不知道放的什么
***
###### game_app 1CPU 2G
    实例id：i-wz96axgu37bpd0zv0lj3
    公网ip：39.108.4.12
    私网ip：172.18.207.58
    
    运行 gamebox app端 game_app java
    
###### ESS-asg-location 1CPU 2G
    实例id：i-wz9c5ajto2x33ia0m1bk
    公网ip：8.129.66.29
    私网ip：172.18.207.57
    
    运行 定位用户端 location_app java

###### location_mysql 8CPU 16G 
    实例id：i-wz9cc5ecqwtt17s3ccf8
    公网ip：47.107.100.18
    私网ip：172.18.207.54
    
    运行location_manager java
    运行nginx 
    定位管理端页面 /opt/app/manager
    server指向本地服务器ip
    运行mysql location_app表
    运行redis
    
###### location_app	1CPU 2G
    实例id：i-wz98qtvejt7iu3d6q6us
    公网ip：47.112.178.153
    私网ip：172.18.207.53
    
    运行 定位用户端 location_app java
    
###### 自动部署系统 4CPU 8G 
    实例id：i-wz9anc2b2vge3ccxrcmh
    公网ip：47.115.38.21
    私网ip：172.18.207.52
    
    之前田冬冬用的自动部署系统 端口8080 可访问 admin 123456
    由于游戏盒子 定位系统 出现问题怀疑是这个服务器造成的 以停止jenkins服务
    
###### novel-nginx 4CPU 8G
    实例id：i-wz9fkptd39wt2aj5jypb
    公网ip：8.129.5.187
    私网ip：172.18.207.51
    
    运行nginx
        小说app页面
        千寻官网
        亿进商城
        亿游盒子官网
    http://www.yjgamebox.com/ 可访问
    
###### novel_user 2CPU 4G
    实例id：i-wz9dqh9q8l3gdxis65iy
    公网ip：47.115.188.167
    私网ip：172.18.207.50
    
    运行novel_app 微信小说用户端 java
    
###### 小说mysql 8CPU 16G
    实例id：i-wz94fd4og43akscozjwo
    公网ip：47.112.156.16
    私网ip：172.18.207.49
    
    运行novel_manager 小说管理端 java
    运行mysql
        novel表
        game_platform表
        location_app表 这张表应该没用
    运行redis
    使用 https://lom.yjgamebox.com/ 域名进行访问
    运行nginx
        小说管理端页面
        地图相关静态页面
        ios
        game

###### test 2CPU 4G
    实例id：i-wz99u75h5ca4w4cd5ac1
    公网ip：47.115.137.0
    私网ip：172.18.207.47
    
    登录密码不知道 
    测试使用 之前测试sentinel 


###### red-nginx-001 2CPU 4G
    实例id：i-wz986rsvsmuhs9ewuail
    公网ip：120.24.60.243
    私网ip：172.18.207.46
    
    运行nginx
        游戏超级签名
        用户端 页面
        管理端 页面
        用户手机端 页面
        管理端手机 页面
        代理指向 172.18.207.44

###### red-user-001 8CPU 16G
    实例id：i-wz986rsvsmuhqu43uu59
    公网ip：120.24.61.68
    私网ip：172.18.207.45
    
    运行超级签名用户端 shuperapp_user java
    ruby环境 签名

###### red-mysql 8CPU 16G
    实例id：i-wz9g6c0t49xf9lk3p0g7
    公网ip：120.24.62.54
    私网ip：172.18.207.44
    
    运行超级签名管理端 shuperapp_manager java
    运行mysql
        shuperapp 表
    运行redis

###### launch-advisor-20190422 2CPU 8G
    实例id：i-wz91j9xpp922nez1c1wm
    公网ip：120.79.21.168
    私网ip：172.18.207.42
    
    gitlab 服务器
    redis 测试服务器
    
    登录密码不知道
    
##### oss对象存储
    所有云存储数据 请登录账号查看
    
##### dcdn全站加速
    加速域名 登录账号查看
    
##### 短信服务管理
    千寻定位 短信模板
    趣有读 短信模板
    
***
#### 阿里云 亿进001
    域名：
    cdyijinkeji.com
    cdyijinkj.com
    chengduyijin.com
    yjgamebox.com
***
#### 阿里云 众诚聚源001
    域名：
    myzcwl.com
    myzcjy.com
    
    
#### 微信支付信息

亿进
APIv3密钥
 4379adca65434d599381da0633d8354f
 
众城
 57a50d05ab9841f38ca6b7c8529ab5d5
 
 操作密码 637337
 
 本地微信支付证书地址
 
 F:\定位app支付参数\weixin\WXCertUtil\cert
 
 
 ##### 极速定位
 操作密码： 123321
 
 APIv3： f61b342d7af34655a4c99e0664181d5a
 
  本地微信支付证书地址
  
F:\定位app支付参数\weixin\WXCertUtil\cert
