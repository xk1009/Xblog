---
icon: n
category:
  - nginx
  - O&M
tag:
  - nginx
  - 笔记
  - 记录

title: nginx
star: true
pageview: true
---
## nginx配置文件说明
``` config
#定义Nginx运行的用户和用户组
user www www;
#
#nginx进程数,建议设置为等于CPU总核心数.
worker_processes 8;
#
#全局错误日志定义类型,[ debug | info | notice | warn | error | crit ]
error_log /var/log/nginx/error.log info;
#
#进程文件
pid /var/run/nginx.pid;
#
#一个nginx进程打开的最多文件描述符数目,理论值应该是最多打开文件数（系统的值ulimit -n）与nginx进程数相除,但是nginx分配请求并不均匀,所以建议与ulimit -n的值保持一致.
worker_rlimit_nofile 65535;
#
#工作模式与连接数上限
events
{
    #参考事件模型,use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型是Linux 2.6以上版本内核中的高性能网络I/O模型,如果跑在FreeBSD上面,就用kqueue模型.
    use epoll;
    #单个进程最大连接数（最大连接数=连接数*进程数）
    worker_connections 65535;
}
#
#设定http服务器
http
{
    include mime.types; #文件扩展名与文件类型映射表
    default_type application/octet-stream; #默认文件类型
    #charset utf-8; #默认编码
    server_names_hash_bucket_size 128; #服务器名字的hash表大小
    client_header_buffer_size 32k; #上传文件大小限制
    large_client_header_buffers 4 64k; #设定请求缓
    client_max_body_size 8m; #设定请求缓

    # 开启目录列表访问,合适下载服务器,默认关闭.
    autoindex on; # 显示目录
    autoindex_exact_size on; # 显示文件大小 默认为on,显示出文件的确切大小,单位是bytes 改为off后,显示出文件的大概大小,单位是kB或者MB或者GB
    autoindex_localtime on; # 显示文件时间 默认为off,显示的文件时间为GMT时间 改为on后,显示的文件时间为文件的服务器时间

    sendfile on; # 开启高效文件传输模式,sendfile指令指定nginx是否调用sendfile函数来输出文件,对于普通应用设为 on,如果用来进行下载等应用磁盘IO重负载应用,可设置为off,以平衡磁盘与网络I/O处理速度,降低系统的负载.注意：如果图片显示不正常把这个改成off.
    tcp_nopush on; # 防止网络阻塞
    tcp_nodelay on; # 防止网络阻塞

    keepalive_timeout 120; # (单位s)设置客户端连接保持活动的超时时间,在超过这个时间后服务器会关闭该链接

    # FastCGI相关参数是为了改善网站的性能：减少资源占用,提高访问速度.下面参数看字面意思都能理解.
    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
    fastcgi_buffer_size 64k;
    fastcgi_buffers 4 64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 128k;

    # gzip模块设置
    gzip on; #开启gzip压缩输出
    gzip_min_length 1k; #允许压缩的页面的最小字节数,页面字节数从header偷得content-length中获取.默认是0,不管页面多大都进行压缩.建议设置成大于1k的字节数,小于1k可能会越压越大
    gzip_buffers 4 16k; #表示申请4个单位为16k的内存作为压缩结果流缓存,默认值是申请与原始数据大小相同的内存空间来存储gzip压缩结果
    gzip_http_version 1.1; #压缩版本（默认1.1,目前大部分浏览器已经支持gzip解压.前端如果是squid2.5请使用1.0）
    gzip_comp_level 2; #压缩等级.1压缩比最小,处理速度快.9压缩比最大,比较消耗cpu资源,处理速度最慢,但是因为压缩比最大,所以包最小,传输速度快
    gzip_types text/plain application/x-javascript text/css application/xml;
    #压缩类型,默认就已经包含text/html,所以下面就不用再写了,写上去也不会有问题,但是会有一个warn.
    gzip_vary on;#选项可以让前端的缓存服务器缓存经过gzip压缩的页面.例如:用squid缓存经过nginx压缩的数据

    #开启限制IP连接数的时候需要使用
    #limit_zone crawler $binary_remote_addr 10m;

    ##upstream的负载均衡,四种调度算法(下例主讲)##

    #虚拟主机的配置
    server
    {
        # 监听端口
        listen 80;
        # 域名可以有多个,用空格隔开
        server_name ably.com;
        # HTTP 自动跳转 HTTPS
        rewrite ^(.*) https://$server_name$1 permanent;
    }

    server
    {
        # 监听端口 HTTPS
        listen 443 ssl;
        server_name ably.com;

        # 配置域名证书
        ssl_certificate      C:\WebServer\Certs\certificate.crt;
        ssl_certificate_key  C:\WebServer\Certs\private.key;
        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;
        ssl_protocols SSLv2 SSLv3 TLSv1;
        ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
        ssl_prefer_server_ciphers  on;

        index index.html index.htm index.php;
        root /data/www/;
        location ~ .*\.(php|php5)?$
        {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            include fastcgi.conf;
        }

        # 配置地址拦截转发，解决跨域验证问题
        location /oauth/{
            proxy_pass https://localhost:13580/oauth/;
            proxy_set_header HOST $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # 图片缓存时间设置
        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
            expires 10d;
        }

        # JS和CSS缓存时间设置
        location ~ .*\.(js|css)?$ {
            expires 1h;
        }

        # 日志格式设定
        log_format access '$remote_addr - $remote_user [$time_local] "$request" '
        '$status $body_bytes_sent "$http_referer" '
        '"$http_user_agent" $http_x_forwarded_for';
        # 定义本虚拟主机的访问日志
        access_log /var/log/nginx/access.log access;

        # 设定查看Nginx状态的地址.StubStatus模块能够获取Nginx自上次启动以来的工作状态，此模块非核心模块，需要在Nginx编译安装时手工指定才能使用
        location /NginxStatus {
            stub_status on;
            access_log on;
            auth_basic "NginxStatus";
            auth_basic_user_file conf/htpasswd;
            #htpasswd文件的内容可以用apache提供的htpasswd工具来产生.
        }
    }
}

```

## nignx配置压缩包，提高页面响应速度
``` config
#开关
    gzip  on;	
#最小长度 一般不改			
	gzip_min_length 1k;
#设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。	
	gzip_buffers 4 16k;
#识别http的协议版本 默认1.1
	#gzip_http_version 1.0;
#压缩比，1压缩比最小速度最快，9压缩比最大速度最慢
	gzip_comp_level 1;
#匹配MIME类型进行压缩
   	 gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
#根据请求头上的accept-encoding：gzip 返回是否压缩
	gzip_vary on;
#不适配IE6以前的版本
	gzip_disable "MSIE [1-6]\.";
Nginx做为反向代理的时候启用：
off – 关闭所有的代理结果数据压缩
expired – 如果header中包含”Expires”头信息，启用压缩
no-cache – 如果header中包含”Cache-Control:no-cache”头信息，启用压缩
no-store – 如果header中包含”Cache-Control:no-store”头信息，启用压缩
private – 如果header中包含”Cache-Control:private”头信息，启用压缩
no_last_modified – 启用压缩，如果header中包含”Last_Modified”头信息，启用压缩
no_etag – 启用压缩，如果header中包含“ETag”头信息，启用压缩
auth – 启用压缩，如果header中包含“Authorization”头信息，启用压缩
any – 无条件压缩所有结果数据
	gzip_proxied any;
```

## 常用命令
* 重启nginx 在nginx目录下 ./nginx -s reload
* 测试加载配置文件 ./nginx -t
* ./nginx
* ./nginx -s stop  # 此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。
* ./nginx -s quit   # 此方式停止步骤是待nginx进程处理任务完毕进行停止。
* ./nginx -s reload  #启动

## 安装

1. 下载 解压
2. cd到解压目录 
3. 执行./configure 

若出现：
./configure: error: the HTTP rewrite module requires the PCRE library. You can either disable the module by using --without-http_rewrite_module option, or install the PCRE library into the system, or build the PCRE library statically from the source with 

执行 yum -y install pcre-devel

若出现：
./configure: error: the HTTP gzip module requires the zlib library.
You can either disable the module by using --without-http_gzip_module
option, or install the zlib library into the system, or build the zlib library
statically from the source with nginx by using --with-zlib=path option.

执行 yum install -y zlib-devel