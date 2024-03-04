# 常见注意点

## 1. tab栏封装

- 定义一个**tab**列表，`scroll-view`包裹，`scroll-x`允许横向滚动，设置scroll-left默认为0
- 每个tab设置为`display: inline-block`，`scroll-view`设置 `white-space: nowrap`不换行
- 给每个tab设置vertical-align: top;防止高度塌陷
- 设置整个**tab**列表的`padding`,需要设置 `padding-left: 30rpx;box-sizing: border-box;`

## 2. uni-popup弹出层ios下iphone11底部安全区处理

`// paddingBottom: this.safeAreaInsets + 'px', `注释源码

