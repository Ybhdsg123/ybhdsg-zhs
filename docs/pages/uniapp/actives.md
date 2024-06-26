# 常见注意点

## 1. tab栏封装

- 定义一个**tab**列表，`scroll-view`包裹，`scroll-x`允许横向滚动，设置scroll-left默认为0
- 每个tab设置为`display: inline-block`，`scroll-view`设置 `white-space: nowrap`不换行
- 给每个tab设置vertical-align: top;防止高度塌陷
- 设置整个**tab**列表的`padding`，需要设置 `padding-left: 30rpx;box-sizing: border-box;`

## 2. uni-popup弹出层ios下iphone11底部安全区处理

- **注释掉源码这一段** `// paddingBottom: this.safeAreaInsets + 'px'`

## 3. uniapp自动导入`ref`,`onLoad`等

### 3.1 安装依赖 ： `pnpm install unplugin-auto-import`

### 3.2 配置(vite.config.js，没有该文件就创建)

:::details  配置(vite.config.js，没有该文件就创建)

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

:::

## 4. uniapp中`pinia`持久化的处理

### 4.1 安装依赖 ：`npm install pinia-plugin-persistedstate`

### 4.2 配置pinia持久化

:::details  配置pinia持久化

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

:::

### 4.3 `main.js`中引入pinia

:::details `main.js`中引入pinia

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

:::

## 5. 禁止页面滚动

- **在`pags.json`中设置该页面的`disableScroll：true`** (设置为 true 则页面整体不能上下滚动（bounce效果），只在页面配置中有效，在`globalStyle`中设置无效)

## 6. 小程序获取公众号Code（微信网页授权相关）

### 6.1 微信网页授权拿`code` [微信网页授权地址](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

**demo地址**：`./components/GZH/gzh.vue`

### 6.2 注意点

- 页面通过`web-biew`跳转
- 授权后重定向的回调链接地址`redirect_uri`，比如：`https://www.baidu.com/`
- 在回调的H5页面中拿到`code`，然后返回`web-biew`的文件中，将`code`传递给后端

## 7. 使用`rich-text`时，富文本换行没效果

设置 `rich-text`的属性 `space='nbsp'`

## 8. 滚动过程中实现吸顶效果

### 8.1 主要实现思路

获取某个元素在页面上**距离**顶部的距离，然后**监听**页面的滚动，当页面**滚动的距离-元素距离顶部距离>0**,就让该元素的 position 为`fixed`，否则就让其为 `relative`

### 8.2 [uni.createSelectorQuery()的使用](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#createselectorquery)

`uni.createSelectorQuery()`返回一个 `SelectorQuery` 对象实例。可以在这个实例上使用 `select` 等方法选择节点，并使用 `boundingClientRect` 等方法选择需要查询的信息

 **tips:**
使用 `uni.createSelectorQuery()` 需要在生命周期 `mounted` 后进行调用。
 默认需要使用到 `selectorQuery.in` 方法。

### 8.3 例子

:::details

```vue
<template>
  <view id="attendance-list" :style="fixedStyle"> </view>
</template>
<script>
data(){
 return{
  toTop: 0, //距离顶部距离
  fixedStyle:{},
 }
}
// 监听页面滚动，动态设置头部滚动过程中固定
  onPageScroll(obj) {
   if (obj.scrollTop - this.toTop > 0) {
    this.fixedStyle = {
     position: 'fixed',
     top: '0rpx',
     background: '#fff',
     zIndex: 3
    }

   } else {
    this.fixedStyle = {
     position: 'relative',
    }
   }
  },
mounted() {
  this.listToTop()
},
methods:{
 // 距离顶部距离
   listToTop() {
    uni.createSelectorQuery().in(this).select('#attendance-list').boundingClientRect(rect => {
      this.toTop = rect.top
     }).exec()
   },
//    const query = uni.createSelectorQuery().in(this);
//     query.select("#id").boundingClientRect((data) => {
//     console.log("得到布局位置信息" + JSON.stringify(data));
//     console.log("节点离页面顶部的距离为" + data.top);
//   }).exec();
}
</script>
```

:::
