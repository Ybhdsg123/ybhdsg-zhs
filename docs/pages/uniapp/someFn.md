# 一些方法

## 1. uniapp 引入腾讯地图 jdk 和 api 等信息

### 地址：`./location`（location 文件夹中）

## 2. 获取小程序头部状态栏信息

:::details  获取状态栏信息

``` js
// const statusBarHeight = uni.getSystemInfoSync().statusBarHeight; // 状态栏高度
/**
 *  获取状态栏信息
 * @param {*} safeHeight 安全高度
 * @param {*} right 胶囊位置信息
 * @param {*} top 同上
 * @param {*} height 同上
 */
export const getHeight = () => {
  const { height, top, left,right } = uni.getMenuButtonBoundingClientRect();
  const unnecessaryHeight = 10; // 添加的安全高度
  const screenWidth = uni.getSystemInfoSync().screenWidth;  // 获取屏幕宽度
  const rpxValue = (top + height + unnecessaryHeight) / (screenWidth / 450);  // 将 px 转化为 rpx
  return {
    safeHeight: Math.floor(rpxValue),
    right: right - 10,
    top,
    height,
    left
  };
};

```

:::

## 3. 请求方法配置等(请求方法，上传图片，下载文件)

### 3.1 文件地址：`./utils/request.js`

### 3.2 文件使用

:::details  文件使用

```js
import { request,uploadFile } from "./utils/request.js";

/* 请求方法 */
export const getRatingsApi = (data) =>
  request({
    url: `/api-common/comments/getAvgScore`,
    method: "POST",
    data: data,
  });

// 上传图片
export const uploadImageApi = (file) =>
  uploadFile({
    url: "/api-common/material/uploadImage",
    file: file,
    // loading: true,
    // loadingText: "上传中",
  });
```

:::

## 4. 小程序分享（朋友圈和群等）

### 4.1 文件地址：`./utils/share.js`

### 4.2 文件使用

```js
// 1.  main.js中引入
import shareMixin from "@/utils/share.js";

// 2. 混入app
app.mixin(shareMixin);

```
