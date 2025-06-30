---
icon: l
date: 2024-08-25
category:
  - O&M
tag:
  - 运维
  - linux
  - 笔记
  - 记录

title:  Linux 
star: true
pageview: true
---



## Shell脚本编程

## what？

    1.命令的堆积；
    2.特定的语法+系统的命令=文件；
    3.解释型语言 逐行解释为计算机识别的二进制机器语言
    4.每次执行都要进行解释相对于编译型语言速度较慢

## use？

    简化步骤，提高效率，减少人为干预，减少系统故障
    1.自动化软件部署
    2.自动化管理
    3.自动化分析处理
    4.自动化备份
    5.自动化监控
    ...

***

## shell基本语法 文件命名方式 XXX.sh

    #!/bin/bash   
    #第一行 使用的解释器
    #!/bin/env bash 使用当前环境的 bash

    #内容注释

    #脚本内容

***

## 写好一个shell文件后如何执行？

    标准执行方式
        1.添加执行权限 chmod +x xxx.sh
        2.文件相对路径 或者 绝对路径执行
    非标准执行方式(在java程序中使用的是这种方式 runtime)
        bash -x xxx.sh 可查看执行过程
        sh /shell/xxx.sh
    检查脚本 bash -n xxx.sh 

```java
    Runtime runtime = Runtime.getRuntime();
    //通过ssl签署mobileconfig文件
    String[] shell = new String[]{
    "/bin/sh",
    "/opt/ruby/sign.sh",
    signAddress,
    signAddressa
    };
    runtime.exec(shell).waitFor();
```

***

## shell变量怎么定义？

*   某个内容多次使用，并在代码中反复出现
*   在代码运行过程中，可以把某些命令的执行结果保存起来，后段代码继续使用

变量名 = 变量值

    1.变量名不要使用特殊符号，
    2.不能使用数字开头，
    3.值不能有空格，如果有使用引号
    4.变量名一般使用大写（小写也行）

```
    #变量赋值
    A=hello
    #使用变量 打印
    echo $A
    echo ${A}
    #{}方式可以使用变量其中的字符，切片
    B=123456
    echo ${B:2:3}  >> 345 #从第2的索引开始切3个字符
    #取消变量
    unset B
    
```

***

## 交互式定义变量 变量值由用户自己输入 也可以读取文件内容赋值

    read [可选项] 变量名称
    -p 提示用户信息
    -s 用户输入不显示
    -n 指定字符长度
    -t 秒/限制时间

***

## 定义有类型的变量 declare

    declare [可选项] 变量名=变量值
    -i 把变量值作为一个整数
    -r 只读变量
    -x 环境变量

***

## 变量的分类 针对于作用域

    1.本地变量
    当前用户自定义的变量。当前进程中有效，其他进程或当前进程的子进程无效

    2.环境变量
    当前进程有效，并且能够被子进程调用
    env 查看当前用户的环境变量
    set 查看本地变量和环境变量
    定义环境变量 定义本地变量使用export导出 或使用 declare -x

    3.全局变量
    全局所有用户和程序都可以调用，且继承，新建用户也可以使用

    4.系统变量（内置bash中变量）
    shell已经固定好了它的名字和作用
    $? 上一条命令执行后返回的状态，0表示为正常，非0表示异常或错误
    $# 脚本后面跟的参数的 个数
    $* 脚本后面跟的参数，整体输出，以空格分开
    $@ 脚本后面跟的参数，参数是独立的，全部输出
    $1-$9 脚本后面的参数位置，$1表示第一个参数，10以后使用${10}
    $$ 当前进程号

***

## 简单的四则运算（加减乘除）

```shell
默认情况下，shell就只能支持简单的整数计算
$((1+2))    >>3
$[1+2]      >>3
expr 1 + 1  >>3
let 需要定义变量进行计算
let i++
```

***

## 条件判断语法结构

```shell
test 表达式
[ 表达式 ]      其中变量一定要加引号
[[ 表达式 ]]    其中变量不用加引号

1.字符串判断
-z 是否为空，0则成立
-n 非空，0则成立
string1 = string2 字符串相等
string1 != string2 字符串不相等

2.整数判断
-eq 相等
-ne 不等
-gt 大于
-ge 大于等于
-le 小于等于
-lt 小于

3.多重判断
-a 和 && 逻辑与
-o 和 || 逻辑或
```

***

## 流程控制器

if

```

if [条件];
then
    命令
else
    命令
fi

-----------------------

if [条件];
then
    命令
elif
    命令
else
    命令
fi

=====================
例1：

#!/bin/env bash

#name:ping.sh
#des:ping localhostIp and serverIp is ok?
#IP:serverIP from user input

read -p "please input you want test ip :" IP

ping -c1 $IP &>/dev/null

if [ $? -eq 0 ];
then
	echo "connection $IP is ok!"
else
	echo "connection $IP is fail!"
fi
==========================
例2：

#!/bin/env bash

#name:pid.sh
#des:判断进程是否存在

read -p "请输入需要查看的进程名称：" P_NAME

ps -ef|grep $P_NAME|grep -v 'grep' &>/dev/null

if [ $? -eq 0 ];
then
	echo "$P_NAME 此进程存在"
else
	echo "$P_NAME 此进程不存在"
fi

#[ $? -eq 0 ] && echo "$P_NAME 此进程存在" || "$P_NAME 此进程不存在"


```

***

### for 循环

```
for 变量 in {}
    do
        命令
        命令
        。。。
    done

或者

for 变量 in a b c
    do
        命令
    done
    
带条件for循环
注意这里是两个括号
for (( i=1; 1<=5; i++ ))
    do
        echo $i
    done
=============================================

例：
#!/bin/env bash

#des:odd number sum

#判断携带的参数不为空 且大于0
#还需判断数字不为小数 可使用正则判断 正则需要使用[[条件]]进行判断
if [ -n "$1" ] && [ -n "$2" ] && [ "$1" -gt 0 ] && [ "$2" -gt 0 ]
then
	echo "开始计算 $1 到 $2 奇数和"
	declare -i SUM=0
	#需要判断开始数字是奇数还是偶数,开始数为偶数则加1
	declare -i START_NUM=0
	if [ $[$1%2] -eq 0 ]
	then
		START_NUM=$1+1
	else
		START_NUM=$1
	fi
	for (( i=START_NUM; i<=$2; i+=2 ))
	do
		SUM+=i;
	done
	echo "$1 到 $2 之间的奇数和为：$SUM"
else
	echo "请携带需要计算的两个正整数，第一个为开始数字，第二个为结束数字"
fi

```

    * continue  跳过本次循环
    * break     直接跳出循环
    * exit      直接退出程序

***

## while 循环

    特点是条件为真就进入循环，为假不进循环
    注意避免死循环

<!---->

    while 表达式
    do
        命令
    done

***

## until 循环

    特点与while相反，条件为假进入循环，为真不进循环

<!---->

    until 表达式
    do
        命令
    done

***

## 系统变量 随机数 RANDOM

    echo $RANDOM
    范围 0 ~ 32767

    获取0~1的随机数
    $[$RANDOM%1]
    获取0~10的随机数
    $[$RANDOM%11]

## 函数

    函数名(){}
    在本文件中调用 直接函数名
    在终端调用 source 文件 直接输入函数名
    return可以结束一个函数
    return 数字 返回一个自定义返回值 可用于$? 判断

## openssl

    openssl smime -sign -in $1 -out $2 -signer /opt/ruby/2.crt -inkey /opt/ruby/1.key -certfile /opt/ruby/3.pem -outform der -nodetach

openssl smime

|     参数    |               english description              |           说明          |
| :-------: | :--------------------------------------------: | :-------------------: |
|   -sign   |                  sign message                  |          签名消息         |
|    -in    |                   input file                   |          输入文件         |
|  -signer  |             signer certificate file            |        签署者证书文件        |
|   -inkey  | input private key (if not signer or recipient) |   输入私钥（如果不是签名者或收件人）   |
| -certfile |             other certificates file            |         其他证书文件        |
|  -outform |    output format SMIME (default), PEM or DER   | 输出格式SMIME（默认），PEM或DER |
| -nodetach |               use opaque signing               |        使用不透明的签名       |



## linux 常用命令
``` shell
#查看端口
netstat -lnp|grep 8000  

firewall-cmd --query-port=666/tcp #查看指定端口是否开放
firewall-cmd --zone=public --add-port=3306/top -permanent   #开放指定端口
firewall-cmd -reload #开启后刷新一下防火墙

systemctl status firewalld #查看防火墙状态
sudo systemctl stop firewalld #关闭防火墙
sudo systemctl start firewalld #开启防火墙

#查看linux版本信息
uname -a
lsb_release -a

部署项目 指定日志输出位置
java -Dserver.port=8080 -jar sentinel-dashboard.jar >sentinel.log 2>&1 &

shift+zz #编辑快速保存退出

netstat -ntlp | grep [$Port]

#查看进程
ps -ef|grep java
#查看进程号
pgrep java

#mysql 数据导出
mysqldump -u 用户名 -p 数据库名 > 导出的文件名

mysqldump -u 用户名 -p 数据库名 表名> 导出的文件名


#查看ssl证书可用时间
openssl x509 -in {证书文件} -noout -dates
例如：openssl x509 -in /opt/app/test/2779074_d1.6bapp.cn.pem -noout -dates

#清空日志
> filename
cat /dev/null >listener_scan1.log 

#查找关键字 上下
grep -C 10 keyword catalina.out

df -h #查看云盘使用情况

du -h #查看当前目录使用情况

chmod 777 文件名 #添加上传权限

```

## grep 过滤命令
* i 忽略大小写
* n 显示行号
* v 取反
* A 后面几行
* B 前面几行
* C 前后几行

## vim 快捷键

* u 撤销上一步
* j 上一行
* k 下一行
* G 大写的G 光标移动到最后一行
* gg 第一行
* /xx 搜索字符
* x，X 删除后一个字符 和 前一个字符 
* dd 删除光标所在行
* yy 复制光标所在行
* ctrl+r 重复上一个操作
* ZZ 保存退出

## 定时任务

* crontab -u //设定某个用户的cron服务，一般root用户在执行这个命令的时候需要此参数  
* crontab -l //列出某个用户cron服务的详细内容
* crontab -r //删除没个用户的cron服务
* crontab -e //编辑某个用户的cron服务

## 启动脚本
``` shell

/usr/bin/nohup nohup java -jar /opt/app/jar/video_manager-0.0.1.jar --spring.profiles.active=test-mengmai-loc  -Xms64m -Xmx512m -XX:MaxMetaspaceSize=512m -XX:CompressedClassSpaceSize=64m -Xss256k -Xmn8m -XX:InitialCodeCacheSize=4m -XX:ReservedCodeCacheSize=8m -XX:MaxDirectMemorySize=16m    2>/opt/app/jar/capital.out & 

```

## 重启脚本
``` shell 

#!/bin/bash
   PID=$(ps -ef | grep video_manager-0.0.1.jar | grep -v grep | awk '{ print $2 }')
   echo $PID
   GetPageInfo=/dev/null  
   StartTomcat=/opt/app/jar/start.sh
   WebUrl=http://127.0.0.1:8889/test.jpg
   TomcatMonitorLog=/opt/app/jar/nohup.out 
 Monitor()  
{ 
if [ -z "$PID" ]
then
#不存在
    $StartTomcat
else
#存在
	echo "$PID."  
    # 获取返回状态码  
    echo "[error]$TomcatServiceCode $GetPageInfo"  
    echo "[error]java error"  
    kill -9 $PID  
    sleep 3  
    $StartTomcat  
fi
}
Monitor>>$TomcatMonitorLog 


```

## cpu过高排查方法

1. top命令看那个进程较高
2. top -h -p 进程id  找到线程id
3. 将线程id 转为16进制 printf '0x%x\n' 线程id
4. 使用jstack   jstack 进程id|grep 16进制线程id -A 20 找到出问题的代码


## 数据库备份

``` shell

#数据库备份

进入到备份目录中

vi bkDatabaseName.sh

输入/粘贴以下内容：

不压缩版本---
#!/bin/bash
mysqldump -uusername -ppassword DatabaseName > /home/backup/DatabaseName_$(date +%Y%m%d_%H%M%S).sql

压缩版本---
#!/bin/bash
mysqldump -uusername -ppassword DatabaseName | gzip > /home/backup/DatabaseName_$(date +%Y%m%d_%H%M%S).sql.gz

注意：
用root账户
把 username 替换为实际的用户名； 
把 password 替换为实际的密码； 
把 DatabaseName 替换为实际的数据库名；

```

### jebkins 启动脚本
``` shell
cp /var/jenkins_home/workspace/super-user/target/super-user.jar /var/jenkins_home/jar/
#!/bin/bash
APP_NAME=super-user.jar
LOG_NAME=super-user.log

pid=`ps -ef | grep $APP_NAME | grep -v grep|awk '{print $2}'`

function is_exist(){
pid=`ps -ef | grep $APP_NAME | grep -v grep|awk '{print $2}'`
if [ -z ${pid} ]; then
String="notExist"
echo $String
else
String="exist"
echo $String
fi
}

str=$(is_exist)
if [ ${str} = "exist" ]; then
echo " 检测到已经启动的程序，pid 是 ${pid} "
kill -9 $pid
else
echo " 程序没有启动了 "
echo "${APP_NAME} is not running"
fi

str=$(is_exist)
if [ ${str} = "exist" ]; then
echo "${APP_NAME} 已经启动了. pid=${pid} ."
else
source /etc/profile
BUILD_ID=dontKillMe
nohup java -Xms300m -Xmx300m -jar /var/jenkins_home/jar/$APP_NAME   >$LOG_NAME 2>&1 &
echo "程序已重新启动..."
fi
```