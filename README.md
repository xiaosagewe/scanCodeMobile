# VUE3.0基于Vant库的移动端脚手架

## 自适应方案
使用vw做自适应
1. 首先，在src/global/styles.less中，将base变量改为设计稿的宽度
2. 在页面的less中，调用vw方法，入参为设计稿上元素的px值
例如：设计稿字体为32px，写法如下
``` less
  .Test {
    font-size: ~`vw(32)`;
  }
```

## 移动端框架：Vant
### 文档
1. template写法直接查看： https://youzan.github.io/vant/#/zh-CN/swipe#swipe-fang-fa
2. jsx写法：官方文档 + 源代码中的ts申明
### 使用规范
请按需引入，在src/main.ts中引入

## 全局mixin和全局样式
1. 全局mixin方法可以封装在 src/global/mixin.js 中
2. 全局的样式写在 src/global/styles.less 中

## 请求
请求写在 src/api中
你也可以取自己喜欢的名字，比如 service

## 运行
npm install
npm run serve

## 发布
生产: npm run build:prod
