---
icon: comment
category:
  - 数据
  - 消息队列
  - 中间件
tag:
  - 数据
  - 消息队列
  - 中间件
  - 笔记
  - 记录

  

title: RabbitMQ
star: true
pageview: true
---

## 使用场景
异步处理，应用解耦，流量削峰，日志处理等。。。

## 使用须知
* 先要安装erlang语言，再安装mq
* [安装地址](https://www.rabbitmq.com/install-windows.html)
* 第一次到sbin目录执行一下命令
``` 命令
rabbitmq-plugins.bat enable rabbitmq_management
```

## 通信协议
使用AMQP通信协议

AMQP（Advanced Message Queuing Protocol）是一种开放标准的应用层协议，专为分布式系统中的可靠消息传递而设计。它通过统一的协议规范实现了不同系统、语言和中间件之间的互操作性，是消息队列技术的核心协议之一。
以下是其核心要点：
### 一、协议基础
* 定位与特点‌
AMQP是二进制协议，支持异步、安全、跨平台的通信，提供多信道复用和高效的消息路由机制。其核心目标是实现消息中间件的全行业标准化，降低系统集成成本‌。

‌与JMS对比‌：JMS是API级规范，而AMQP是网络层协议（Wire-level），直接定义数据传输格式，确保不同实现的互操作性‌。
* 核心组件‌
    * ‌生产者（Producer）‌：发送消息的客户端应用。
    * ‌交换机（Exchange）‌：接收消息并路由到队列，支持多种路由规则‌。
    * ‌队列（Queue）‌：存储消息直至被消费者处理。
    * ‌绑定（Binding）‌：定义交换机与队列的路由规则‌。
    * ‌消费者（Consumer）‌：从队列获取消息的客户端‌。
### 二、通信模型与机制
* 分层架构‌
    * ‌模型层‌：定义命令集（如消息发布、订阅）。
    * 会话层‌：处理命令传递的可靠性、同步及错误恢复。
    * 传输层‌：管理帧处理、信道复用及数据表示‌。
* 双向RPC特性‌
AMQP支持双向通信，允许客户端发送请求并接收响应，适用于远程过程调用（RPC）场景。
例如：
客户端通过replyTo队列和correlationId实现同步调用‌。
发布/订阅模式下，订阅者可向发布者反馈消息‌。
‌信道（Channel）机制‌
在单一TCP连接上复用多个轻量级信道，减少资源开销。每个信道独立处理消息读写，类似光纤电缆中的单束光纤‌。

### 三、路由模式（Exchange类型）
AMQP通过不同类型的交换机实现灵活路由：
* ‌Direct‌：精确匹配routing key，实现点对点通信（如订单处理）‌。
* Fanout‌：广播模式，无视routing key，消息分发到所有绑定队列（如通知推送）‌。
* ‌Topic‌：基于通配符匹配routing key，支持多播路由（如日志分类）‌。
* ‌Headers‌：通过消息头键值对匹配，不依赖routing key（特殊场景使用）‌。
### 四、应用场景与优势
‌典型场景‌
* 异步任务处理‌：解耦生产者与消费者，提升系统响应速度‌。
* ‌事件驱动架构‌：通过消息广播实现微服务间通信‌。
* ‌数据同步‌：跨系统可靠传输（如库存更新）‌。
技术优势‌
* ‌可靠性‌：消息持久化、确认机制（ACK/NACK）防止丢失‌。
* 扩展性‌：支持集群和高可用部署‌。
* ‌语言无关性‌：兼容多种编程语言（如PHP、Java）‌。
### 五、实现与生态
‌主流实现‌
‌RabbitMQ‌：最流行的AMQP实现，基于Erlang开发，支持丰富插件‌。
‌Spring AMQP‌：简化RabbitMQ集成，提供模板化和声明式配置‌。
‌开发示例‌
PHP通过php-amqplib库与RabbitMQ交互，生产者发布消息至队列，消费者异步消费‌。
Java中可通过RabbitTemplate发送消息，结合@RabbitListener注解实现监听‌。

## 使用模式
1. 简单队列
 	建立连接，通过生产者往mq中发送消息
    创建管道，通过管道作为媒介来发送和接收消息
    创建一个队列，加入管道中

    耦合性高 生产者和消费者一 一 对应

2. workQueue 工作队列
    一个生产者，一个队列对应多个消费者
    默认采用轮训的范式处理 robbin

    设置为公平分发 fair dispatch
    生产者发送消息给mq，消费者监听mq，消费者处理完再响应给mq，mq收到消息之后再发给消费者，否则暂不发送给这个消费者，每次只处理一个消息
    消费者发送一个手动的回执，autoAck是否自动，改为false

    autoAck消息应答，true自动确认模式，一旦MQ发送给消费者之后就会从内存中删除，若消费者挂了，那么这个消息会丢失；false手动确认模式，MQ一旦接收到回执，再内存中删除

    如果mq挂了，那么内存中的数据也将丢失，所以MQ也支持持久化，durable改为true，queue队列不允许以定义的queue，必须在申明之前定义是否持久化

3. 订阅模式 type:fanout（交换机或者叫转发器【exchange】）
    一个消息可以被多个消费者消费
    消费者发送消息到交换机，通过交换机放入队列，队列对应消费者，每个消费者都有自己的队列，每个队列需要绑定到交换机
    交换机（fanout【分发】）

4. 路由模式 type:direct（和发布订阅模式很像，会使用到交换机，做路由键的过滤，路由键）
    exchange
    接受生产者的消息，向队列推送消息
    匿名转发
    fanout（不处理路由键）
    direct（处理路由键）

5. 主题模式【topic exchange】type：topic（和路由模式一样，添加了通配符）
    将路由键和某个模式匹配
    '#' 匹配一个或者多个
    '*' 匹配一个


## 消息确认机制
在rabbitMQ中可以使用持久化的方式解决消息丢失问题
生产者将消息发送出去之后，消息有没有到达MQ呢？

两种方式来进行确认
    AMQP协议实现了事务机制
    Confirm模式

事务机制
    txSelect 、txCommit 、txRollback
    txSelect用户将当前channel设置为transaction模式
    txCommit:提交事务
    txRollback：回滚事务
    都是对生产者的操作，通过事务的模式来确认消息，缺点降低了消息的吞吐量，大量的请求往服务器中发，就会降低mq服务的吞吐量

confirm模式
    它是异步的，不是串行的，此模式channel发布消息都会指派一个唯一的ID，一旦消息投递到所有匹配的队列之后，broker就会发送一个确认给生产者（包含唯一ID），这就是生产者知道消息以及正确到达队列了，如果消息和队列是可持久化的，那么确认消息会将消息写入磁盘之后发出，broker回传给生产者的确认消息中deliver-tag域包含了确认消息的序列号，此外broker也可以设置basic.ack的multiple域，表示到这个序列号之前的所有消息都已经处理。
    ① 普通的 发送一条消息 调用waitForConfirms 方法 确认是否成功
    ② 批量的 发送多条消息 调用waitForConfirms 方法 确认是否成功 若失败需要重新批量发送
    ③ 异步模式
    channel对象提供的confirmListerner回调方法只包含deliveryTag（当前channel发出的消息序列号），我们需要自己为没一个channel维护一个unconfirm的消息序号集合，每发送一条数据，集合元素加1，每次回调一次handlerAck方法，unconfirm集合删除相应的一条（multiple=false）或多条（multiple=true）记录。从程序运行效率上看，这个unconfirm集合最好采用有序集合SortedSet存储结构
    成功会掉用handlerAck方法，失败会掉handlerNack方法，在这个两个方法中去处理消息确认的实际业务逻辑
