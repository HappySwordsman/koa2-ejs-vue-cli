<p align="center">
  <a href="" target="_blank">
    <img height="100" src="./static/images/vue-logo.png" />&emsp;&emsp;
    <img height=100 src="./static/images/koa-logo.png" />
  </a>
</p>

# koa2 vue-cli
[![Build Status](./static/images/passing.svg)](https://github.com/tnnevol/koa2-ejs-vue-cli)

## 描述
将koa2顶替 [webpack-dev-server](https://github.com/webpack/webpack-dev-server)，在开发环境中使用[webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)把vue-cli编译好丢入内存 _这些编译后的文件可以通过http协议拿到_ koa层取到打包后的vue容器模板使用[ejs](https://ejs.bootcss.com/)编译后丢出get请求，达到dev-server的功能。

## 目录简介
```text
├── build // webpack处理
├── config // webpack基础配置
├── gulpfile.babel.js
├── server // 服务层
│   ├── bin
│   ├── middleware // server服务层的中间件
│   ├── model
│   ├── public
│   │   ├── images
│   │   ├── javascripts
│   │   └── stylesheets
│   ├── routes
│   ├── storage
│   ├── utils
│   └── views // vue的页面容器
├── static // 静态资源文件目录
│   └── images
└── client // 原cli的src目录
    ├── assets
    │   └── images
    ├── components
    ├── entry // webpack的入口文件需要与 /server/views/中的文件同名, 否则容器无法引入对应的入口文件
    ├── router
    ├── store
    └── views
```
* /server 目录是服务端开发接口和提供vue的页面容器
* /client 就是vue-cli之前的src目录

## 更新说明
* 2020/11/02: 完成脚手架的基础搭建和文档说明
* 2020/11/03: 完成前后台的分级架构, 实现ejs的渲染中间件

## 待完成
* 集成element-admin