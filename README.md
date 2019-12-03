# webserver
## 案例需求
+ 首页
  + 作者主页
  + 博客页详情页
+ 登录页
+ 管理中心
  + 新建页
  + 编辑页
---
## 博客系统说明
+ 登录系统
    + cookie + session 方案
+ 日志系统
+ 安全系统
    + 防sql注入攻击
    + 防xss攻击
---

## 接口说明
> http://127.0.0.1/api/blog/list?keyword=String&author=String # 获取博客列表

> http://127.0.0.1/api/blog/detail?id=Number # 获取详情

> http://127.0.0.1/api/blog/new # 新增博客
```
{
    "title": String,
    "content": String
}
```
> http://127.0.0.1/api/blog/del?id=Number # 删除博客

> http://127.0.0.1/api/user/login # 用户登录
```
{
    "username": String,
    "password": String
}
```

## blog-1
> URL 接收后分层处理
+ httpServer启动   
    + serverHandle (app.js) 解析req中http首部字段 & 解析**url字段值** & 派发给相应Router  
        + Router (bin/www.js) url字段值->controller = **核心resData** && 核心resData->module = **完整resData** 
            + controller (src/controller/*.js) 接收url字段值返回**核心resData**
            + module (src/module/resModule.js) **接收核心resData**返回**完整resData**