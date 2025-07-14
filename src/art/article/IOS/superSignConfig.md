---
icon: seedling
date: 2022-09-25
category:
  - IOS
  - 签名
tag:
  - 运维
  - 签名
  - 分析
  - 记录
  - 配置
  - ios

title:  ios 签名脚本环境
star: true
pageview: true
sticky: true
copyright: xk
---

## 1. ruby环境 我使用的是稳定版 3.0.2
官网下载http://www.ruby-lang.org/zh_cn/downloads/
下载后解压 tar -zxvf 
通过源码编译安装
当然，也可以通过源码安装 Ruby。下载，解压，然后执行：
$ ./configure
$ make
$ sudo make install
默认情况下，Ruby 安装到 /usr/local 目录。如果想使用其他目录，可以把 --prefix=DIR 选项传给 ./configure 脚本。

输入命令 ruby -v 查看安装成功

## 2. 安装 gcc-c++ 编译器
yum install gcc-c++

## 3. 安装fastlane
gem install fastlane
如果报错：
OpenSSL is not available. Install OpenSSL and rebuild Ruby (preferred) or use non-HTTPS sources
解决方法：cd 到ruby安装目录 /home/ruby/ruby-3.0.2/ext/openssl
执行 ruby ./extconf.rb
make && make install

## 4. 安装spaceship驱动
gem install pry
gem install spaceship

测试：
fastlane Spaceship
登录苹果账号 密码


之前超级签名用户端 cpu100%
top 查看cpu使用情况 kill -9
crontab -l 查看定时任务 并修改
@reboot /var/tmp/.xri/monitor


## 超级签名用户端

1. 静态页面所用到js在rely文件中的staticsjs中，代码中是将此文件放在阿里云上提高页面加载速度

2. 脚本依赖rely文件中ruby文件夹，需要在服务器安装ruby脚本，需要 fastlane，spaceship

3. 签名工具rely文件中zsign文件夹，其中主要文件为zsign文件

4. 需要注意的是mobileprovision文件过期问题，还有其中使用的证书过期问题


