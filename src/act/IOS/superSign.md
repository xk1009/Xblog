---
icon: lock
date: 2022-05-25
category:
  - IOS
  - 签名
tag:
  - 运维
  - 签名
  - 分析
  - 记录
  - ios

title:  ios 签名解析
star: true
pageview: true
---

## 超级签名管理端接口

    主要针对 苹果账号初始化接口 和 上传app接口分析

## ==initAppleAccount==

    账号入库，及初始化账号
    接口：/initAppleAccount
    1.参数：sysUserId
    2.参数：appleAccountId

*   删除/opt/crt/\* 所有文件
*   执行 ruby /opt/ruby/[initcrt.rb](#initRb)
*   参数1：账号
*   参数2：密码
*   参数3：账号
*   参数4：电话号码
*   返回字符串 包含success 及初始化成功，否则失败根据原因设置状态值
    *   将本地p12文件上传至阿里云
    *   与用户端服务器同步文件

***

## ==uploadApp==

    上传包

*   系统账号状态判断
*   上传logo图片至阿里云
*   根据app语言生成mobileconfig文件
*   mobileconfig模板直接在代码中
*   执行bin/sh /opt/ruby/[sign.sh](#signconfig)
*   参数1 本地mobileconfig文件
*   参数2 签名之后的mobileconfig文件
*   将签名之后的mobileconfig文件上传至阿里云

***

## 超级签名用户端接口

    下载时获取uuid接口分析
    接口：/web/user/{channel}
    getUUID函数 restful 接收channel ->appName

*   获取请求中的流数据
*   解析后获取udid、手机型号
*   调用==insertDownloandRecord==
    *   根据channel对应appName获取app信息
    *   根据app信息进行检验，是否存在，客户是否封停，客户下载量是否足够
    *   日志输出 当前app下载总量 app所属客户的下载总量 app当天的下载总量
    *   判断是否下载过
        *   下载过
        *   添加点击记录
        *   获取下载记录isUpdate，如果是0，async更新ipa： [updateIpa](#ipa)()
        *   async判断封号： [jcAppleAccountStatus](#jc)()
        *   没下载过
        *   ①加锁
        *   ②判断app状态 下载量等
        *   ③正常添加下载记录 点击记录
        *   ④签署app： async  [signApp](#sign)()
        *   ⑤添加下载记录：addAppDownloadRecord() [^record]
*   获取代理域名 获取member 的email如果为null 获取客户的 代理域名 [^agentDomain]
*   如果通过数据库获取的代理域名为null使用配置文件中bYurl域名
*   返回响应头location：代理域名/channel?udid

***

<span id="ipa"></span>

## ==updateIpa==

    异步更新ipa
    重签ipa包
    1.参数 App
    2.参数 AppDownloadRecord

*   获取苹果账号
*   执行linux命令
*   创建文件夹
    /opt/app/appName/
    /opt/app/appName/uuid/
*   阿里云下载.p12证书
*   阿里云下载.mobileprovision 描述文件
*   阿里云下载.ipa
*   开始重签
    *   ①解压ipa
    *   ②执行/opt/ruby/[register.sh](#register) 脚本
    *   参数1：解压后的ipa地址
    *   参数2：.p12文件地址
    *   参数3：.mobileprovision文件地址
    *   参数4：苹果账号的证书密码
    *   参数5：重签地址
    *   脚本内容：
        timeout 600 /opt/zsign/zsign -f -k `$2 -p $`4 -m `$3 -o $`5 -z 9 \$1
*   读取流数据
    *   如果包含 Archive OK!
    *   重新上传ipa到阿里云
    *   修改app下载记录isUpdate为1
    *   缓存plist文件地址
    *   rm -rf
    *   删除证书 ipa 描述文件 签名完的ipa

***

<span id="jc"></span>

## ==jcAppleAccountStatus==

    异步检测苹果账号状态 检测封号
    1.参数 AppDownloadRecord
    2.参数 App
    3.参数 SystemRequest

*   定义苹果账号状态为0；清理缓存中的plist
*   获取苹果账号
    *   如果数据库中没有使用 <http://172.24.135.82/web/user/getAppleAccountById>
    *   设置苹果账号状态为1
    *   如果还是没有账号或者苹果账号状态为2 回调 ==insertDownloandRecord== 函数
    *   record重设uuid值，并修改
*   执行ruby脚本 ruby /opt/ruby/[isfalse.rb](#isfalse)
    *   参数1：苹果账号
    *   参数2：苹果账号密码
    *   参数3：苹果账号手机号
*   获取流数据 从而判断是否封号

***

<span id="sign"></span>

## ==signApp==

    异步签名方法
    1.参数： App
    2.参数： AppDownloadRecord
    3.参数： AppAcountName
    4.参数： AppAcount

*   检测阿里云ipa是否存在
*   检测账号是否有 证书是否存在
*   创建文件夹
*   下载.p12文件
    下载苹果账号的crt文件为p12文件
*   开始签名 注册到苹果
    *   执行/opt/ruby/[registeruuid.sh](#registeruuid)脚本
    *   参数1：苹果账号
    *   参数2：苹果账号密码
    *   参数3：true
    *   参数4：uuid
    *   参数5：mobileprovision文件生成地址
    *   参数6：mobileprovision文件名称
    *   参数7：苹果账号手机号
*   获取响应数据
    一系列状态判断 详情查看日志
*   响应数据包含success =》注册成功
    *   ①获取udid
    *   ②下载描述文件
    *   ③开始重签
    *   下载ipa
    *   执行register.sh签名
    *   重签完成上传阿里云
    *   生成plist文件,上传阿里云
    *   缓存plist文件下载地址
    *   设置苹果账号注册数 当大于等于100 设置状态为1 下线

***

## 相关文件说明

    .ipa                包文件
    .mobileconfig 	    配置文件帮助用户进行app安装授权
    .p12				开发证书/发布证书
    .mobileprovision 	描述文件
    .plist			    捆绑基本信息
    p12文件相当于公钥，.mobileprovision文件相当于私钥

***

<span id="initRb"></span>

## initcrt.rb 脚本

```ruby
require "spaceship"
require_relative "ask_two_factor_code"

account = ARGV[0]
password = ARGV[1]
bundleId = ARGV[2]
phone = ARGV[3]
certificatid = nil
ENV["SPACESHIP_2FA_SMS_DEFAULT_PHONE_NUMBER"] = '+86 ' + phone

def store_certificate(certificate, output)
  cert_name = certificate.id
  cert_name = "#{cert_name}.cer" unless File.extname(cert_name) == ".cer"
  path = File.expand_path(File.join(output, cert_name))
  raw_data = certificate.download_raw
  File.write(path, raw_data)
  return path
end

def gen_random_str(len)
    rand(36 ** len).to_s(36)
end

begin
  Spaceship.login(account, password)
  #解析所有的证书
  certificates = Spaceship.certificate.production.all
  puts "===begin-certificate-all==="
  puts certificates
  puts "===end-certificate-all==="
  certificat = nil
  if certificates.length <= 1
    puts "无证书"
    output = "/opt/crt/" + account
    Dir.mkdir(output)
    csr, pkey = Spaceship.certificate.create_certificate_signing_request
    certificat = Spaceship.certificate.production.create!(csr: csr)
    private_key_path = File.expand_path(File.join(output, "#{certificat.id}.key"))
    File.write(private_key_path, pkey)
    store_certificate(certificat, output)
    certificatid = certificat.id
    puts "===begin-certificate-id-all==="
    puts certificatid
    puts "===end-certificate-id-all==="
    #生成app
    app = nil
    begin
      puts "生成app"
      app = Spaceship.app.create!(bundle_id: bundleId, name: bundleId)
    rescue Exception => e
      bundleId = "org." + gen_random_str(8) + ".abc"
      app = Spaceship.app.create!(bundle_id: bundleId, name: bundleId)
    end
    app.update_service(Spaceship.app_service.push_notification.on)
    puts "===begin-app-all==="
    puts app
    puts "===end-app-all==="
    #判断设备
    devices = Spaceship.device.all
    puts "判断设备"
    if (devices.length <= 0)
      Spaceship.device.create!(name: '29403a0638ec90ff6402594a05e93ee66b43b9b8', udid: '29403a0638ec90ff6402594a05e93ee66b43b9b8')
      devices = Spaceship.device.all
    end
	puts "===begin-device-all==="
    puts devices.length
    puts "===end-device-all==="
    #创建描述文件
    puts "创建描述文件"
    profile = Spaceship.provisioning_profile.ad_hoc.create!(bundle_id: app.bundle_id, certificate: certificat)
    puts "===begin-profile-all==="
    puts profile.name
    puts "===end-profile-all==="
    profile.devices = devices
	puts 'success'
  end
rescue Exception => e
  puts e.message
end
```

***

<span id="signconfig"></span>

## sign.sh 脚本

    使用ssl证书 ssl证书使用的是sign.quyoudu.com这个域名申请的证书

```shell
openssl smime -sign -in $1 -out $2 -signer /opt/ruby/2.crt -inkey /opt/ruby/1.key -certfile /opt/ruby/3.pem -outform der -nodetach
```

|     参数    |               english description              |           说明          |
| :-------: | :--------------------------------------------: | :-------------------: |
|   -sign   |                  sign message                  |          签名消息         |
|    -in    |                   input file                   |          输入文件         |
|  -signer  |             signer certificate file            |        签署者证书文件        |
|   -inkey  | input private key (if not signer or recipient) |   输入私钥（如果不是签名者或收件人）   |
| -certfile |             other certificates file            |         其他证书文件        |
|  -outform |    output format SMIME (default), PEM or DER   | 输出格式SMIME（默认），PEM或DER |
| -nodetach |               use opaque signing               |        使用不透明的签名       |

***

<span id="register"></span>

## register.sh 脚本

```shell
timeout 600 /opt/zsign/zsign -f -k $2 -p $4 -m $3 -o $5 -z 9 $1
```

|  参数 |                  English description                 |            说明            |
| :-: | :--------------------------------------------------: | :----------------------: |
|  -f |     Force sign without cache when signing folder.    |  在对文件夹进行签名时强制执行不带缓存的签名。  |
|  -k | Path to private key or p12 file. (PEM or DER format) | 私钥或p12文件的路径。 （PEM或DER格式） |
|  -p |         Password for private key or p12 file.        |       私钥或p12文件的密码。       |
|  -m |         Path to mobile provisioning profile.         |       移动资源配置文件的路径。       |
|  -o |               Path to output ipa file.               |        输出ipa文件的路径。       |
|  -z |   Compressed level when output the ipa file. (0-9)   |   输出ipa文件时的压缩级别。 （0-9）   |

***

<span id="registeruuid"></span>

## registeruuid.sh 脚本

```shell
timeout 180 ruby /opt/ruby/registeruuid.rb $1 $2 $3 $4 $5 $6 $7 $8
例：

```

| registeruuid.sh parameter | registeruuid.rb parameter |         说明        |
| :-----------------------: | :-----------------------: | :---------------: |
|            \$1            |          ARGV\[0]         |        苹果账号       |
|            \$2            |          ARGV\[1]         |       苹果账号密码      |
|            \$3            |          ARGV\[2]         |        true       |
|            \$4            |          ARGV\[3]         |        udid       |
|            \$5            |          ARGV\[4]         | mobileprovision文件 |
|            \$6            |          ARGV\[5]         |       p12文件       |
|            \$7            |          ARGV\[6]         |      AdHoc（）      |
|            \$8            |          ARGV\[7]         |        手机号        |

## registeruuid.rb 脚本

```ruby
require "spaceship"
require_relative "ask_two_factor_code"
puts ARGV[0]
puts ARGV[1]
puts ARGV[2]
puts ARGV[3]
puts ARGV[4]
puts ARGV[5]
puts ARGV[6]
puts ARGV[7]
ENV["SPACESHIP_2FA_SMS_DEFAULT_PHONE_NUMBER"] = '+86 ' +  ARGV[7]
begin
  Spaceship.login(ARGV[0], ARGV[1])
  device = Spaceship.device.create!(name: ARGV[3], udid: ARGV[3])
  devices = Spaceship.device.all
  profiles = Spaceship.provisioning_profile.ad_hoc.all
  profiles.each do |p|
    p.devices = devices
    p.update!
  end
  puts "===begin-UDID-all==="
  puts devices.length
  puts "===end-UDID-all==="
  downloadProfiles = Spaceship.provisioning_profile.ad_hoc.all
  downloadProfiles.each do |p|
	puts ARGV[5]
	puts ARGV[6]
	name = ARGV[5]
	if ARGV[6] != nil
		name = ARGV[5] + " " +  ARGV[6]
	end
    if p.name == name 
      File.write(ARGV[4], p.download)
    end
  end
  puts "success"
rescue Exception => e
  puts e.message
end
```

***

<span id="isfalse"></span>

## isfalse.rb 脚本

```ruby
require "spaceship"
require_relative "ask_two_factor_code"

account = ARGV[0]
password = ARGV[1]
phone = ARGV[2]
ENV["SPACESHIP_2FA_SMS_DEFAULT_PHONE_NUMBER"] = '+86 ' + phone
begin
    Spaceship.login(account, password)
	downloadProfiles = Spaceship.provisioning_profile.ad_hoc.all
	downloadProfiles.each do |p|
		puts "===begin-profile-all==="
		puts p.name
		puts "===end-profile-all==="
		cert = p.certificates
		cert.each do |c| 
			puts "===begin-certificate-id-all==="
			puts c.id
			puts "===end-certificate-id-all==="
		end
	end
  puts "success"
rescue Exception => e
   puts e.message
end
```

[^record]: 用于数据统计和比例

[^agentDomain]: 获取客户的苹果账号状态，数据库都为null，如果为1，使用 <https://kl.cjappmanager.com，否则使用配置文件中的bYurl>

## 可能存在的问题

    点击下载 手机提示描述文件损坏
    下载安装成功 app闪退 是包的问题？

    签名时使用的 ssl证书是另外一台服务器的证书 此证书需要配置吗？
    下载时 mobileprovision文件是一个静态资源 此文件来源不明 不知道是如何生成的？

    疑问：
    1. 之前下载后提示ssl证书过期 替换了一个ssl证书 此证书是sign.quyoudu.com域名下的证书，没有配置其他的东西，不知道是不是需要配置什么
    2. 苹果更新之后 替换了oss中的mobileprovision静态资源文件，此文件是老王的朋友发给我的，此文件如何生成不知道

    描述文件错误 应该是config文件或者provision文件 这两个文件的问题
        1.不知道是不是因为ssl证书问题导致 mobileconfig文件错误
        2.由于mobileprovision文件也替换过 但不知道怎么生成此文件
        
    解决方案 
        描述文件错误 
        .检查描述文件是否过期
        描述文件无法访问服务器
        1.检查域名是否掉案
        2.检查域名能否正常使用
        
        闪退问题
        由于ios更新可能会导致下载后app闪退
        查看签名工具是否更新 ，将签名工具更新到最新版本

