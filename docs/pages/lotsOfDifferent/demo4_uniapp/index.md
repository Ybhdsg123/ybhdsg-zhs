# 系列四 —— uniapp 相关问题

<script setup>
 import HighlightText from './components/HighlightText/index.vue'
  import EllipsisText from './components/EllipsisText/index.vue'
</script>

## 1. uniapp 引入腾讯地图 jdk 和 api 等信息

### 地址：location 文件夹中

## 2. 滑块组件（单/双滑块）

### 2.1  组件地址： `./components/SliderRange/index.vue`

### 2.2  组件使用方法

```vue
<template>
 <SliderRange @change="handleRangeChange" :currentValue="sliderRangeValue" />
 </template>
 <script setup>

 const sliderRangeValue = ref([0, 1200]);

</script>
```

## 3. 顶部导航栏组件

### 2.1  组件地址： `./components/CustomNavigation/index.vue`

### 2.2  组件使用方法

```vue
<template>
 <CustomNavigation v-bind="basePageOptions" @getHeight="getHeight" />
  <view :style="{ paddingTop: pt + 'rpx' }">
    </view>
 </template>
<script setup>
const pt = ref(0); // 自定义导航栏上方安全距离
const getHeight = (e) => {
  pt.value = e;
};

</script>
```

## 4. 获取状态栏信息

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
  const rpxValue = (top + height + unnecessaryHeight) / (screenWidth / 750);  // 将 px 转化为 rpx
  return {
    safeHeight: Math.floor(rpxValue),
    right: right - 10,
    top,
    height,
    left
  };
};

```

## 5. 搜索时高亮`搜索关键字`组件

 <HighlightText text="这是测试搜索关键字的文本" keyword="搜索关键字" />

### 2.1  组件地址：`./components/HighlightText/index.vue`

### 2.2  组件使用方法

```vue
<template>
 <HighlightText text="这是测试搜索关键字的文本" keyword="搜索关键字" />
</template>
```

## 6. 使用`rich-text`时，富文本换行没效果

设置 `rich-text`的属性 `space='nbsp'`

## 7. 省略文本（展开和收起）

### 7.1  组件地址：`./components/EllipsisText/index.vue`

### 7.2  组件使用方法

```vue
<template>
 <EllipsisText content="这是测试省略文本的文本" lines="2" prefixText="前缀文本" />
</template>
```

## 8. 上传图片

### 8.1  组件地址：`./components/ImgUpload/index.vue`

### 8.2  组件使用方法

```vue
<template>
    <ImgUpload :list="imgList" :count="5" @uploadSuccess="uploadSuccessHandler"
     @deleteImage="deleteImageHandler" />
</template>
<script setup>
const imgList = ref([]);
const uploadSuccessHandler = (imgs) => {
    const result = imgs.map((item) => item.url);
    imgList.value = [...imgList.value, ...result];
};
const deleteImageHandler = (i) => {
    imgList.value.splice(i, 1);
};
</script>
```

## 9. uniapp自动导入`ref`,`onLoad`等

### 9.1 安装依赖

`pnpm install unplugin-auto-import`

### 9.2 配置(vite.config.js，没有该文件就创建)

```js
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    uni(),
    // 自动导入配置
    AutoImport({
      imports: [
        // 预设
        "vue",
        "uni-app",
      ],
    }),
  ],
});

```

## 10. 请求方法配置等(请求方法，上传图片，下载文件)

### 10.1 文件地址：`./utils/request.js`

### 10.2 文件使用

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

## 11. 小程序分享（朋友圈和群等）

### 11.1 文件地址：`./utils/share.js`

### 11.2 文件使用

```js
// 1.  main.js中引入
import shareMixin from "@/utils/share.js";

// 2. 混入app
app.mixin(shareMixin);

```

## 12. uniapp中`pinia`持久化的处理

### 12.1 安装依赖

`npm install pinia-plugin-persistedstate`

### 12.2 配置pinia持久化

```js
import { defineStore } from "pinia";
export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({ userInfo: null,  }),
  actions: { },
  persist: {
    // 默认值，就是使用localStorage
    // storage: localStorage
    // 重写存取方法，转调给UniApp
    storage: {
      getItem(key) {
        return uni.getStorageSync(key);
      },
      setItem(key, val) {
        uni.setStorageSync(key, val);
      },
    },
  },
});

export default useUserStore;

```

### 12.3 `main.js`中引入pinia

```js
// main.js
import App from "./App";
import * as Pinia from "pinia";
import shareMixin from "@/utils/share.js";
// pinia持久化插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// #ifndef VUE3
import Vue from "vue";
import "./uni.promisify.adaptor";
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
// 创建pinia实例
const pinia = Pinia.createPinia();
// 使用持久化插件
pinia.use(piniaPluginPersistedstate);
export function createApp() {
  const app = createSSRApp(App);
  // app.use(Pinia.createPinia());
  app.use(pinia);
  // 使用持久化插件
  pinia.use(piniaPluginPersistedstate);
  app.mixin(shareMixin);
  return {
    app,
    Pinia, // 此处必须将 Pinia 返回
  };
}
// #endif


```
