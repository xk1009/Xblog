---
icon: chart-line
date: 2019-11-22
category:
  - java
  - activit
tag:
  - java
  - activit
  - 笔记
  - 记录

title: Activit
star: true
pageview: true
---

<!-- <VidStack src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" /> -->


## activit 流程
解决更新业务流程，不需要更新源代码，通过更新流程定义图来实现流程更新
流程图就是一个xml文件，解析xml，获取每个节点信息
BPMN流程定义图

## 步骤
1. 整合activiti
2. 实现业务流程建模，使用BPMN实现业务流程图
3. 部署流程到activiti
4. 启动流程实例
5. 查询待办任务
6. 处理代办任务
7. 接收流程


## activiti.cfg.xml 工作流配置文件 
* 配置数据源
* 配置流程引擎类 使用 单独启动的方式 StandaloneProcessEngineConfiguration
* processEngine（核心）通过其可以获取各种服务 例如 runTimeService 。。

## 重点数据表
* hi_ 历史数据表 每步操作都会记录
* ru_运行时数据表 流程每步流程数据
* re_仓库数据表 流程定义

## 重点service
repositoryService 	仓库服务，用于部署流程
runTimeService	运行时服务，开启流程，提交
taskService 		任务服务，查询当期 代办任务  完成任务
historyService		历史服务,查询流程信息

## 删除流程定义 repositoryService 	
* 注意：
* 当正在执行的流程 没有完全结束 如果要删除流程部署 会删除失败
* deleteDeployment（id，true） 级联删除 就会没有删除没有完成的流程 再删除流程部署

## 将流程定义资源存入指定目录 目的是用户方便查看流程图
* 部署流程时将 bpmn文件 和 png文件 存了byte数据到act_ge_bytearray中
* 获取数据流 getResourceAsStream方法 参数1 为流程部署id 参数2 为数据资源名称 也就是bpmn文 件名称和png文件名称
* getDiagramResourceName   获取png文件名字
* getResourceName          	获取pbmn文件名字
使用输出流将流数据写入指定文件位置

## 流程定义 和 流程实例
* businessKey 通过业务主键，activiti与项目结合
* 在 ru_execution表中 businessKey字段
* 在启动一个流程实例的时候 通过runtimeService.startProcessInstanceByKey(param1,param2)
param1 部署时唯一的key，param2 businessKey

## 流程定义 挂起与激活
* 如果将流程定义挂起 未完成的流程都挂起，流程也不能继续走下去，此流程定义也不再使用
* isSuspended  判断是否挂起
* repositoryService.activateProcessDefinitionById  激活方法
* repositoryService.suspendProcessDefinitionById  挂起方法

## 流程实例 挂起与激活
挂起某一个流程实例，或激活某一个流程
方法同上

## 任务分配的方式
（根据业务情况来定，一般使用第二种方式）
1. 可直接在绘制流程图BPMN是直接写死
2. UEL表达式（Unified Expression Language）
${assignee} 由程序中来指定
在启动流程时 设置参数
startProcessInstanceByKey  设置map参数  map.put("assignee","zhangsa") ...
map中的key与el表达式中的值一致
3. 绑定监听器 需要实现taskListener类 在配置到监听器中

## 流程变量
activiti流程变量是为了流程执行需要而设置的
（即流程中需要使用的，业务中使用的一般不设置到流程变量中）
数据类型和java大致相同，对象需要序列化
### 变量作用域 
global 全局变量
local 节点变量
在连线上使用UEL表达式

### 设置global流程变量	
1. 启动的时候设置		startProcessInstanceByKey  方法
2. 任务办理时设置  		complete  方法
3. 通过当前流程实例设置	runtimeService   运行时服务来设置
4. 通过当前任务设置		taskService 	任务服务来设置
### 设置local流程变量
通过当前任务设置 只有当前任务节点有效

## 任务组与候选人 
可以在bpmn中写死，用逗号隔开；也可以用UEL表达式
### 步骤：
1. 先查询组任务    		taskCandidate设置候选人 来查询任务
2. 领取任务为个人任务  	claim方法来领取任务
有可能领取任务后又想返回给其他候选人组 设置办理人设置为null  setAssingee 方法
也可以委托给其他人 这两种情况要先判断本人是否是候选人 setAssingee 方法
3. 查询个人任务
4. 办理任务

## 网关和排他网关 
（防止条件都成立从而两个分支都走）如果都满足，只走一个流程，如果都不满足就会报错
在condition中设置参数条件
## 并行网关
它具有分支和汇聚的功能，并行网关不会解析条件
## 包含网关
是以上两个的结合 满足条件可以并行执行，执行完成到汇聚点，
所有满足条件都执行完聚合之后才到下一个节点

## activiti与spring整合
1. pom 依赖导入
2. 配置文件 ProcessConfigurer
### 数据源配置
配置工程类获取processEngine
配置service获取注入spring其中
## 注：
activiti7 强依赖springSecurity 
activiti7中新增 ProcessRuntime类和TaskRuntime类
但需要整合springSecurity