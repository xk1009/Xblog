---
icon: g
date: 2018-03-18
category:
  - term
  - foundation
  - git
  
tag:
  - git
  - foundation
  - 笔记
  - 记录
  - git


title: GIT
star: true
pageview: true
---

## GIT 命令
### git基本操作
- 第一步：git init 初始化项目文件夹
- 第二步：git add . 键所有文件添加到暂存区
- 第三步：git commit -m "first commit"   提交到本地仓库
- 第四步：git remote add origin XXX（XXX就是你github或者码云等远程仓库的地址，git branch这个命令可以看到你所在的分支，删除某个仓库地址使用git remote rm origin）
- 第五步：git pull 拉取远程分支信息，首次拉取合并信息
- 第六步：git push -u -f origin master 提交到远程仓库，这个命令中的 -f 是强制推送，因为远程仓库只有初始化的文件，所以强制推送上去就行了，不加-f 会报当前分支没有远程分支，强制推送可以覆盖master，这样就完成了第一次提交的步骤)

### 分支管理
* 列出/创建/删除分支
git branch          # 列出本地分支
git branch -d 分支名 # 删除分支
* 切换或创建分支
git checkout -b 分支名  # 创建并切换
* 合并分支到当前分支 
git merga 分支名

### 其他操作
* 查看提交记录与提交id
git log
* 删除最近一个提交，保留更改
git reset --soft HEAD~1
* 删除最近一个提交,并丢弃更改
git reset --hard HEAD~1
* 设置用户信息（全局/本地）
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

