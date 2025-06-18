---
icon: id-card
title: 自我介绍
---

# introduce

## 自我介绍
``` java
public class MyResume {
    public static void main(String[] args) {
        System.out.println("我是XK" + 
            /* 这里曾经有个名字，但被GC回收了 */
            new String("Java八级钳工").intern()
        );
    }
    
    @Override
    protected void finalize() throws Throwable {
        System.out.println("正在回收被OOM杀死的尊严...");
    }
}
// 运行时请搭配JVM参数：-XX:+UseG1GC -XX:MaxGCPauseMillis=人生太长

```

## 编程哲学‌：

「重构代码就像拆炸弹，剪红线还是蓝线？—— 我选择git reset --hard」

## 专业技能：

精通"复制粘贴工程学"，Git提交记录能写成长篇小说
擅长在凌晨3点与编译器进行哲学辩论
掌握"老板你看这个需求..."的108种委婉说法
日常状态：
🟢 编码中（10%）
🔴 调试中（90%）
🟡 在Stack Overflow上跪求答案（100%）

## 特殊成就：

* 成功让测试同事喊出"这不可能！" 累计237次

* 用console.log()写过的日记比初恋情书还长

* 头发浓密度与代码优化能力成反比（骄傲挺胸）

* 🏆 连续三年获得「最佳甩锅语录」金奖：
    "这肯定是网络问题"
    "我本地测试正常的啊"
    "可能是浏览器缓存..."

## 人生信条：
"这段代码能跑就别动它"
"不是我写的bug，但可以是我修的kpi"

## 优化：
``` sql
-- 试图优化数据库查询
EXPLAIN SELECT * FROM 我的头发;
-- 执行结果: 0 rows returned

```

``` java
@Bean
public Performance ultraBoost() {
    while(true) {
        // 声称实现了响应式编程
        return new ThreadPoolExecutor(0, Integer.MAX_VALUE); 
    }
}// 效果：创建线程速度超过光速（直到CPU起火）:ml-citation{ref="2,5" data="citationList"}

```

## 最后附赠人生代码：

``` java

while (me.isAlive()) {  
    try {  
        me.code();  
        me.drinkCoffee(3); // 计量单位：升  
    } catch (DeadlineException e) {  
        me.overtime(∞);  
    }  
}  


```
请多指教~ 

Memory Overflow...
