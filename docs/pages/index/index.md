# 欢迎来到哑巴湖大水怪的世界 👏

## [vitePress 官网](https://vitepress.vuejs.org/guide/markdown)

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-14-142005.png" alt="image-20220814222004395" style="zoom: 20%;" />

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-13-060434.png" alt="image-20220813140434032" style="zoom:50%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-14-143153.png" alt="image-20220814223152726" style="zoom: 50%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-14-154655.png" alt="image-20220814234654914" style="zoom:33%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-15-013519.png" alt="image-20220815093518833" style="zoom:33%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-15-014216.png" alt="image-20220815094215982" style="zoom:30%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-15-014459.png" alt="image-20220815094458940" style="zoom:25%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-23-100047.png" alt="image-20220823180047075" style="zoom:40%;" />

## 1. 虚拟滚动插件：

比如 `vue-virtual-scroller`、`vue-virtual-scroll-list`、`react-tiny-virtual-list`、`react-virtualized` 等

[vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller) 的使用

```js
// 安装插件
npm install vue-virtual-scroller

// main.js
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.use(VueVirtualScroller)

// 使用
<template>
  <RecycleScroller
    class="scroller"
    :items="list"
    :item-size="32"
    key-field="id"
    v-slot="{ item }">
      <div class="user"> {{ item.name }} </div>
  </RecycleScroller>
</template>
```

> 该插件主要有 `RecycleScroller.vue`、`DynamicScroller.vue` 这两个组件，其中 RecycleScroller 需要 item 的**高度为静态**的，也就是列表每个 item 的高度都是一致的，而 DynamicScroller 可以兼容 item 的**高度为动态**的情况

## 2. [vueUse](https://vueuse.org/core/useDraggable/)

## 3. [精进 JavaScript ｜ 这些手写你都会吗 ？](https://mp.weixin.qq.com/s/e3m_dS37HqiFvPefYH5Jrg)

## 4. [前端知识体系、前端监控、性能优化、原理探索、面经等](https://github.com/xy-sea/blog)

## 5. [珠峰：史上最全最专业的 Vue.js 面试题训练营](https://www.bilibili.com/video/BV1YE411u7m4/?from=search&seid=14891340203736945411)

## 6. [破解前端面试（80% 应聘者不及格系列）：从闭包说起](https://juejin.cn/post/6844903474212143117)
