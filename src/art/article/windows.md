---

icon: window-maximize
date: 2022-09-25
category:
  - O&M
  - windows
tag:
  - 运维
  - windows

title: windows 常用命令
star: true
pageview: true
sticky: true
copyright: xk
---


## 查看 域名解析
nslookup XXX.XXX.com

## 查看 所有端口使用情况
netstat -ano

## 查找指定端口被哪个应用占用
netstat -ano|findstr 端口号

## 查找指定进程号
tasklist |findstr 进程号

## 关闭指定进程
taskkill /f /m /im 进程号或者进程名称

## 查看ip 
ipconfig

## 截图
win+shift+s

## 快速打开
计算器 calc
记事本 notepad
画图   mspaint
