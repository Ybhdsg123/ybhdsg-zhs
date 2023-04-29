# 欢迎来到哑巴湖大水怪的世界 👏

## [vitePress 官网](https://vitepress.vuejs.org/guide/markdown)

## [Emoji 🎉 ](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

<!-- <img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-14-142005.png" alt="image-20220814222004395" style="zoom: 20%;" />

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-13-060434.png" alt="image-20220813140434032" style="zoom:50%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-14-143153.png" alt="image-20220814223152726" style="zoom: 50%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-14-154655.png" alt="image-20220814234654914" style="zoom:33%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-15-013519.png" alt="image-20220815093518833" style="zoom:33%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-15-014216.png" alt="image-20220815094215982" style="zoom:30%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-15-014459.png" alt="image-20220815094458940" style="zoom:25%;" />
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-23-100047.png" alt="image-20220823180047075" style="zoom:40%;" /> -->

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

- [ECMAScript+ 面试宝典](https://es-interview.js.org/articles/02-ECMAScript+/02-javascript.html)

## 7. es5/6/7/...

- [【译】理解 Javascript 执行上下文和执行栈](https://juejin.cn/post/6844903704466833421)
- [JavaScript 中的这些骚操作，你都知道吗？](https://juejin.cn/post/6844904168784658439)
- [JS 高级之手写一个 Promise,Generator,async 和 await【近 1W 字】](https://juejin.cn/post/6844904022223110151)
- [JS 原生面经从初级到高级【近 1.5W 字】](https://juejin.cn/post/6844903976081555470)
- [JS 开发必须知道的 41 个技巧【持续更新】](https://juejin.cn/post/6854573212890562573)
- [「中高级前端面试」JavaScript 手写代码无敌秘籍](https://juejin.cn/post/6844903809206976520)
- [JavaScript 工具函数大全（新）](https://juejin.cn/post/6844903966526930951)
- [这应该是你见过的最全前端下载总结](https://juejin.cn/post/6844903763359039501)
- [【建议 👍】再来 40 道 this 面试题酸爽继续(1.2w 字用手整理)](https://juejin.cn/post/6844904083707396109)
- [ES9 已经来了 Are you ready?](https://juejin.cn/post/6844903652348395533)
- [💦【何不三连】做完这 48 道题彻底弄懂 JS 继承(1.7w 字含辛整理-返璞归真)](https://juejin.cn/post/6844904098941108232)
- [ES6 完全使用手册](https://juejin.cn/post/6844903726201700365)
- [JavaScript 专题系列 20 篇正式完结！](https://juejin.cn/post/6844903506017517582)
- [正则表达式不要背](https://juejin.cn/post/6844903845227659271)
- [前端大文件上传](https://juejin.cn/post/6844903860327186445)
- [2 万字 | 前端基础拾遗 90 问](https://juejin.cn/post/6844904116552990727)
- [9k 字 | Promise/async/Generator 实现原理解析](https://juejin.cn/post/6844904096525189128)
- [🎉 喜大普奔，ES2019 登场](https://juejin.cn/post/6844903769776324615)
- [Axios 如何取消重复请求？](https://juejin.cn/post/6955610207036801031)
- [这些高阶的函数技术，你掌握了么](https://juejin.cn/post/6892886272377880583)
- [你不知道的 Proxy](https://juejin.cn/post/6924442692667572237)
- [JavaScript 那些写出来会被同事揍的骚操作](https://juejin.cn/post/6844904032146817038)
- [书到用时方恨少，一大波 JS 开发工具函数来了](https://juejin.cn/post/6844904090313424903)
- [这些一行 JS 实现功能的代码，让你看起来像一个前端专家](https://juejin.cn/post/6921509748785283086)
- [【干货】js 数组详细操作方法及解析合集](https://juejin.cn/post/6844903614918459406)
- [js 基础-面试官想知道你有多理解 call,apply,bind？[不看后悔系列]](https://juejin.cn/post/6844903906279964686)
- [最详尽的 JS 原型与原型链终极详解，没有「可能是」。（一）](https://www.jianshu.com/p/dee9f8b14771)
- [JavaScript 深入之作用域链](https://github.com/mqyqingfeng/Blog/issues/6)
- [深入理解 JavaScript Event Loop](https://zhuanlan.zhihu.com/p/34229323)
- [一次弄懂 Event Loop（彻底解决此类面试问题）](https://juejin.cn/post/6844903764202094606)
- [浏览器与 Node 的事件循环(Event Loop)有何区别?](https://zhuanlan.zhihu.com/p/54882306)
- [从 event loop 规范探究 javaScript 异步及浏览器更新渲染时机 ](https://github.com/aooy/blog/issues/5)
- [JavaScript 函数式编程到底是个啥](https://segmentfault.com/a/1190000009864459)
- [JavaScript 性能利器 —— Web Worker](https://juejin.cn/post/6844903736238669837)
- [ES6、ES7、ES8 特性一锅炖(ES6、ES7、ES8 学习指南)](https://juejin.cn/post/6844903679976275976)
- [1.5 万字概括 ES6 全部特性(已更新 ES2020)](https://juejin.cn/post/6844903959283367950)
- [25 个你不得不知道的数组 reduce 高级用法](https://juejin.cn/post/6844904063729926152)
- [当 async/await 遇上 forEach](https://objcer.com/2017/10/12/async-await-with-forEach/)
- [BAT 前端经典面试问题：史上最最最详细的手写 Promise 教程](https://juejin.cn/post/6844903625769091079#heading-9)
- [100 行代码实现 Promises/A+ 规范](https://mp.weixin.qq.com/s/qdJ0Xd8zTgtetFdlJL3P1g)
- [详解 JS 原型链与继承 JavaScript](http://louiszhai.github.io/2015/12/15/prototypeChain/)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d70d83222d9d42a397465fe367f849c8~tplv-k3u1fbpfcp-watermark.image)

## 8.css

- [css 加载会造成阻塞吗](https://segmentfault.com/a/1190000018130499)
- [CSS 设置居中的方案总结-超全](https://juejin.cn/post/6844903560879013901)
- [rem 布局解析](https://juejin.cn/post/6844903671143088136)
- [彻底搞懂 CSS 层叠上下文、层叠等级、层叠顺序、z-index](https://juejin.cn/post/6844903667175260174)
- [CSS 实现多行文本“展开收起”](https://juejin.cn/post/6963904955262435336)
- [不可思议，纯 css 都能图片滚动](https://juejin.cn/post/6895584191073927175)
- [Web 开发者需要知道的 CSS Tricks](https://juejin.cn/post/6844903576561516558)
- [十几个 CSS 高级常见技巧汇总（虚线框、三角形、优惠券卡券、滚动条、多行溢出...）](https://blog.csdn.net/weixin_41556756/article/details/114196921)
- [字节跳动最爱考的前端面试题：CSS 基础](https://juejin.cn/post/6936913689115099143)
- [一种巧妙的使用 CSS 制作波浪效果的思路](https://juejin.cn/post/6963445854589960206)
- [灵活运用 CSS 开发技巧](https://juejin.cn/post/6844903926110617613)
- [45 个值得收藏的 CSS 形状](https://zhuanlan.zhihu.com/p/63253867)
- [9 个很棒的 CSS 边框技巧](https://zhuanlan.zhihu.com/p/144775015)
- [详解 CSS 七种三栏布局技巧](https://zhuanlan.zhihu.com/p/25070186)
- [【图片版】GRID，一起来学习 CSS 网格布局吧！](https://zhuanlan.zhihu.com/p/36541501)
- [CSS 的预处理程序（Sass、LESS、Stylus 等）分别都有哪些优缺点？](https://www.zhihu.com/question/20300388/answer/42847463)
- [浏览器将 rem 转成 px 时有精度误差怎么办？](https://www.zhihu.com/question/264372456)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61a0824c51c2433493a546f7f4dc76fe~tplv-k3u1fbpfcp-watermark.image)

## 9. ts

- [TypeScript 入门教程](http://ts.xcatliu.com/basics/declaration-files.html#declare-var)
- [深入理解 TypeScript](http://martsforever-snapshot.gitee.io/typescript-book-chinese/typings/types.html)
- [这些高阶 ts 内置泛型帮助类型，你用过几个](https://juejin.cn/post/6893071406481801224)
- [Vue3.0 之前你必须知道的 TypeScript 实战技巧](https://juejin.cn/post/6844903939079405576)
- [一份不可多得的 TS 学习指南（1.8W 字）](https://juejin.cn/post/6872111128135073806)
- [TypeScript 安利指南](https://juejin.cn/post/6844903958545170446)
- [TS 常见问题整理（60 多个，持续更新 ing）](https://juejin.cn/post/6844904055039344654)
- [Typescript+Vue 大型后台管理系统实战](https://juejin.cn/post/6844904046352941064)
- [TypeScript 中高级应用与最佳实践](http://www.alloyteam.com/2019/07/13796/)
- [三万字长文）类型即正义：TypeScript 从入门到实践系列，正式完结！](https://juejin.cn/post/6844904167840940039)
- [TypeScript - 一种思维方式](https://zhuanlan.zhihu.com/p/63346965)
- [Vue3 跟着尤雨溪学 TypeScript 之 Ref 类型从零实现](https://juejin.cn/post/6844904126283776014)
- [让人眼前一亮的 10 大 TS 项目](https://juejin.cn/post/6844904185838698503)
- [三千字讲清 TypeScript 与 React 的实战技巧](https://juejin.cn/post/6844903897790677005)
- [总结 TypeScript 在项目开发中的应用实践体会](https://juejin.cn/post/6970841540776329224)
- [TS 常见问题整理（60 多个，持续更新 ing）](https://juejin.cn/post/6844904055039344654)
- [可能是你需要的 React + TypeScript 50 条规范和经验](https://juejin.cn/post/6844903849166110728)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/891d55bafa4944dc9253aa8fea46ba4a~tplv-k3u1fbpfcp-watermark.image)

## 10. vue2/3

- [Vue3 自定义指令-10 个常见的实用指令，带详细讲解，快拿去收藏！！！](https://juejin.cn/post/6968996649515515917)
- [Vue3 究竟好在哪里？（和 React Hook 的详细对比）](https://juejin.cn/post/6844904132109664264)
- [Vue 项目性能优化 — 实践指南（网上最全 / 详细）](https://juejin.cn/post/6844903913410314247)
- [Vue 开发必须知道的 36 个技巧【近 1W 字】](https://juejin.cn/post/6844903959266590728)
- [Vue3.0 新特性以及使用经验总结](https://juejin.cn/post/6940454764421316644)
- [阮一峰推荐】学习 vue3 源码的利器](https://juejin.cn/post/6925668019884523534)
- [Vue3 的响应式和以前有什么区别，Proxy 无敌？](https://juejin.cn/post/6844904122479542285)
- [Vue3.0 前的 TypeScript 最佳入门实践](https://juejin.cn/post/6844903865255477261)
- [抄笔记：尤雨溪在 Vue3.0 Beta 直播里聊到了这些…](https://juejin.cn/post/6844904134303301645)
- [Vue 最全知识点，面试必备（基础到进阶，覆盖 vue3.0，持续更新整理，欢迎补充讨论](https://juejin.cn/post/6844903709055401991)
- [简单通俗的理解 Vue3.0 中的 Proxy](https://juejin.cn/post/6844904088119853063)
- [Vue3 DOM Diff 核心算法解析](https://juejin.cn/post/6877814455968350215)
- [深入了解 Vue3 响应式原理](https://juejin.cn/post/6893763807899271181)
- [Webpack5 基础 & Vue3 项目搭建](https://juejin.cn/post/6942076401986043918)
- [Vue.js 升级踩坑小记](https://juejin.cn/post/6844903516822044680)
- [[Vue 官方教程笔记]- 尤雨溪手写 mini-vue](https://juejin.cn/post/6911897255087702030)
- [Vue 3.0 自定义指令的这些知识你掌握了么？](https://juejin.cn/post/6944875414208643102)
- [Vue 应用性能优化指南](https://juejin.cn/post/6844903677262561293)
- [性能优化之组件懒加载: Vue Lazy Component 介绍](https://juejin.cn/post/6844903496102199304)
- [VirtualDOM 与 diff(Vue 实现)](https://juejin.cn/post/6844903496232206349)
- [聊聊 Vue.js 组件间通信](https://juejin.cn/post/6844903505317068808)
- [Vuex 源码解析](https://juejin.cn/post/6844903507057704974)
- [聊聊 Vue.js 的 template 编译](https://juejin.cn/post/6844903502196506631)
- [在 vue 项目中 如何定义全局变量 全局函数](https://juejin.cn/post/6844903505832968199)
- [Vue 的钩子函数[路由导航守卫、keep-alive、生命周期钩子]](https://juejin.cn/post/6844903641866829838)
- [Vue 组件间通信六种方式（完整版）](https://juejin.cn/post/6844903845642911752)
- [详解 vue 的 diff 算法](https://juejin.cn/post/6844903607913938951)
- [面试官: 实现双向绑定 Proxy 比 defineproperty 优劣如何?](https://juejin.cn/post/6844903601416978439)
- [虚拟 DOM 到底是什么？(长文建议收藏)](https://mp.weixin.qq.com/s/oAlVmZ4Hbt2VhOwFEkNEhw)
- [生命周期](https://ustbhuangyi.github.io/vue-analysis/v2/components/lifecycle.html)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a25073d1333f4b1cb195455a985cc003~tplv-k3u1fbpfcp-watermark.image)

## 11. react

- [将 React 应用优化到 60fps](https://zhuanlan.zhihu.com/p/24959748)
- [如何提高你的 React 应用的性能](https://juejin.cn/post/6844903518826938382)
- [如何评价 React 的新功能 Time Slice 和 Suspense？](https://www.zhihu.com/question/268028123)
- [浅入浅出图解 domDIff](https://juejin.cn/post/6844903592520843277)
- [你真的理解 setState 吗？](https://zhuanlan.zhihu.com/p/39512941)
- [React 中的高阶组件及其应用场景](https://juejin.cn/post/6844903782355042312)
- [[译] 如何写出更好的 React 代码？](https://juejin.cn/post/6844903600989143054)
- [setState 之后发生了什么 —— 浅谈 React 中的 Transaction](https://undefinedblog.com/what-happened-after-set-state/)
- [React 同构实践与思考](https://zhuanlan.zhihu.com/p/20669111)
- [Immutable 详解及 React 中实践](https://zhuanlan.zhihu.com/p/20295971)
- [十五分钟读懂 React 17 | 🏆 技术专题第六期征文](https://juejin.cn/post/6894204813970997256)
- [React v17.0 RC 版本发布：无新特性（译）](https://juejin.cn/post/6860388976008626183)
- [React Hooks 最佳实践](https://juejin.cn/post/6844904165500518414)
- [这可能是最通俗的 React Fiber(时间分片) 打开方式](https://juejin.cn/post/6844903975112671239)
- [React 开发必须知道的 34 个技巧【近 1W 字】](https://juejin.cn/post/6844903993278201870)
- [精读《useEffect 完全指南》](https://juejin.cn/post/6844903806090608647)
- [一起学习造轮子（三）：从零开始写一个 React-Redux](https://juejin.cn/post/6844903632702275598)
- [React 中的五种组件形式](https://juejin.cn/post/6844903487692603399)
- [[实战] 为了学好 React Hooks, 我抄了 Vue Composition API, 真香](https://juejin.cn/post/6844903991491444744)
- [1w 字 | 从零开始的 React 服务端渲染](https://juejin.cn/post/6844904000387563533)
- [React Hooks 性能优化的正确姿势](https://juejin.cn/post/6892730652333244429)
- [手把手带你用 85 行代码实现一个 React.js（详细讲解）](https://juejin.cn/post/6844903683541434381)
- [React 源码剖析系列 － 生命周期的管理艺术](https://zhuanlan.zhihu.com/p/20312691)
- [React Hooks 详解 【近 1W 字】+ 项目实战](https://juejin.cn/post/6844903985338400782)
- [React SSR 详解【近 1W 字】+ 2 个项目实战](https://juejin.cn/post/6844904017487724557)
- [分析 React.createRef 和 React.useRef](https://zhuanlan.zhihu.com/p/115230135)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9590f041631444d822520c49a46d323~tplv-k3u1fbpfcp-watermark.image)

## 12. node

- [一个开箱即用，功能完善的 Express 项目](https://juejin.cn/post/6844904022080651277)
- [《大前端进阶 Node.js》系列 P6 必备脚手架/CI 构建能力](https://juejin.cn/post/6844904101893898248)
- [基于 nodeJS 从 0 到 1 实现一个 CMS 全栈项目（上）](https://juejin.cn/post/6844903952761225230)
- [浏览器与 Node 的事件循环(Event Loop)有何区别?](https://zhuanlan.zhihu.com/p/54882306)
- [零基础实现 node+express 个性化聊天室](https://juejin.cn/post/6844903558848970760)
- [深入理解 Node.js 进程与线程](https://mp.weixin.qq.com/s/VzXnnfn4gCBMd5wea3LRIg)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1191a98c749a42038f9185c8dce98155~tplv-k3u1fbpfcp-watermark.image)

## 13. 浏览器

- [Chrome DevTools 中的这些骚操作，你都知道吗？](https://juejin.cn/post/6844904162602254350)
- [面试官: 你了解前端路由吗?](https://juejin.cn/post/6844903589123457031)
- [在浏览器中使用 ECMAScript Modules](https://juejin.cn/post/6943233321765715976)
- [前端开发的你应该知道的浏览器知识](https://juejin.cn/post/6932762257675780103)
- [(1.6w 字)浏览器灵魂之问，请问你能接得住几个？](https://juejin.cn/post/6844904021308735502)
- [反直觉！浏览器到底是如何下载资源的](https://juejin.cn/post/6934516416326729735)
- [傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.cn/post/6844904034181070861)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd417af5f6354ff9b632e3ec8006b154~tplv-k3u1fbpfcp-watermark.image)

## 14. 网络

- [设计一个无懈可击的浏览器缓存方案：关于思路，细节，ServiceWorker，以及 HTTP/2](https://zhuanlan.zhihu.com/p/28113197)
- [关于三次握手与四次挥手面试官想考我们什么](https://juejin.cn/post/6844903834708344840)
- [面试带你飞：这是一份全面的 计算机网络基础 总结攻略](https://juejin.cn/post/6844903592965439501)
- [前端性能优化总结](https://juejin.cn/post/6844904195707895816)
- [前端性能优化 24 条建议（2020）](https://juejin.cn/post/6892994632968306702)
- [（建议精读）HTTP 灵魂之问，巩固你的 HTTP 知识体系](https://juejin.cn/post/6844904100035821575)
- [17K star 仓库，关于网络相关的前端面试题 90% 都有答案](https://juejin.cn/post/6956046759428636708)
- [前端词典】进阶必备的网络基础（上）](https://juejin.cn/post/6844903789078675469)
- [浅谈 HTTP/2 Server Push](https://zhuanlan.zhihu.com/p/26757514)
- [怎样把网站升级到 http/2](https://zhuanlan.zhihu.com/p/29609078)
- [从实践出发理解 HTTP2](https://zhuanlan.zhihu.com/p/39053130)
- [大部分流量皆已使用新协定 QUIC 和 HTTP/3](https://zhuanlan.zhihu.com/p/338094843)
- [Google、Facebook 等均开始支持的 HTTP3 到底是个什么鬼？](https://zhuanlan.zhihu.com/p/338560677)
- [五千多字，图文并茂详解 HTTP 报文格式、请求响应头、cookie 以及 HTTPS 加密方式](https://zhuanlan.zhihu.com/p/346982045)
- [看图学 HTTPS](https://juejin.cn/post/6844903608421449742)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48d6e33b33354ad0ba8c1dcbcc72d28f~tplv-k3u1fbpfcp-watermark.image)

## 15. 性能优化

- [移动 spa 商城优化记（一）---首屏优化篇](https://juejin.cn/post/6844903577815613453)
- [前端黑科技：美团网页首帧优化实践](https://juejin.cn/post/6844903715262955533)
- [项目不知道如何做性能优化？不妨试一下代码分割](https://juejin.cn/post/6844904101134729229)
- [揭秘 Vue.js 九个性能优化技巧](https://juejin.cn/post/6922641008106668045)
- [前端性能优化之加载技术](https://juejin.cn/post/6844903495108132871)
- [当面试官问你如何进行性能优化时，你该这么回答](https://juejin.cn/post/6844903569154375693)
- [还在看那些老掉牙的性能优化文章么？这些最新性能指标了解下](https://juejin.cn/post/6850037270729359367)
- [网站性能优化实战——从 12.67s 到 1.06s 的故事](https://juejin.cn/post/6844903613790175240)
- [聊一聊前端性能优化](https://juejin.cn/post/6911472693405548557)
- [工作中如何进行前端性能优化(21 种优化+7 种定位方式)](https://juejin.cn/post/6904517485349830670)
- [CSS 性能优化的 8 个技巧](https://juejin.cn/post/6844903649605320711)
- [重构 - 改善代码的各方面问题](https://juejin.cn/post/6844903597092651015)
- [前端优秀实践不完全指南](https://juejin.cn/post/6932647134944886797)
- [滚动视差？CSS 不在话下](https://juejin.cn/post/6844903654458146823)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eedbe07a3d524b77807f3ab21c9e4f31~tplv-k3u1fbpfcp-watermark.image)

## 16. 工程化/架构/设计模式

- [不好意思！耽误你的十分钟，让 MVVM 原理还给你](https://juejin.cn/post/6844903586103558158)
- [让虚拟 DOM 和 DOM-diff 不再成为你的绊脚石](https://juejin.cn/post/6844903806132568072)
- [发布订阅模式，在工作中它的能量超乎你的想象](https://juejin.cn/post/6844903616172539917)
- [webpack4-用之初体验，一起敲它十一遍](https://juejin.cn/post/6844903599080734728)
- [Webpack5 上手测评](https://juejin.cn/post/6844904169405415432)
- [Webpack5 新特性业务落地实战](https://juejin.cn/post/6924258563862822919)
- [webpack 教程：如何从头开始设置 webpack 5](https://juejin.cn/post/6896249895108231176)
- [Webpack 5 模块联邦引发微前端的革命？](https://juejin.cn/post/6844904187147321352)
- [玩转 webpack，使你的打包速度提升 90%](https://juejin.cn/post/6844904071736852487)
- [万字长文：关于 sourcemap，这篇文章就够了](https://juejin.cn/post/6969748500938489892)
- [做了一夜动画，让大家十分钟搞懂 Webpack](https://juejin.cn/post/6961961165656326152)
- [「吐血整理」再来一打 Webpack 面试题](https://juejin.cn/post/6844904094281236487)
- [webpack4 的 30 个步骤打造优化到极致的 react 开发环境，如约而至](https://juejin.cn/post/6844903862898262024)
- [webpack 详解](https://juejin.cn/post/6844903573675835400)
- [webpack 打包原理 ? 看完这篇你就懂了 !](https://juejin.cn/post/6844904038543130637)
- [备战 2021：vite 工程化实践，建议收藏](https://juejin.cn/post/6910014283707318279)
- [Vite 原理浅析](https://juejin.cn/post/6844904146915573773)
- [面向未来的前端构建工具-vite](https://juejin.cn/post/6869915676501835783)
- [一个基于 vue3+vite+ts 的完整项目](https://juejin.cn/post/6881795051492474893)
- [尤雨溪 3 天 10 更的 Vite 究竟有什么魔力？](https://juejin.cn/post/6924997323214815240)
- [Rollup 打包工具的使用（超详细，超基础，附代码截图超简单）](https://juejin.cn/post/6844904058394771470)
- [一文带你快速上手 Rollup](https://juejin.cn/post/6869551115420041229)
- [携手 Rollup 与 TS 造轮子](https://juejin.cn/post/6844903968766689294)
- [无用代码去哪了？项目减重之 rollup 的 Tree-shaking](https://juejin.cn/post/6968262966604988429)
- [从 0 到 1 教你搭建前端团队的组件系统（高级进阶必备）](https://juejin.cn/post/6844904068431740936)
- [Rollup 之插件机制浅析](https://juejin.cn/post/6968641190061309960)
- [大型项目前端架构浅谈（8000 字原创）](https://juejin.cn/post/6844903853859536903)
- [以前端架构师身份，从零开始搞事搞事搞事](https://juejin.cn/post/6952066955868110879)
- [分享阿里前端 p7 架构图谱](https://juejin.cn/post/6844903859563790344)
- [有赞权限系统](https://juejin.cn/post/6844903576720916487)
- [每日优鲜供应链前端团队微前端改造](https://juejin.cn/post/6844903943873675271)
- [分享狼叔关于《大前端工程化的实践与思考》](https://juejin.cn/post/6844903887091023885)
- [深入浅出 Babel 上篇：架构和原理 + 实战](https://juejin.cn/post/6844903956905197576)
- [在前端业务场景下的设计模式](https://juejin.cn/post/6908885198381776910)
- [工作效率 upup，一起来实现一个 Node.js-CLI 开发工具吧](https://juejin.cn/post/6922612857331056648)
- [关于现代包管理器的深度思考——为什么现在我更推荐 pnpm 而不是 npm/yarn?](https://juejin.cn/post/6932046455733485575)
- [npm 删除依赖包\_npm 依赖管理中被忽略的那些细节](https://blog.csdn.net/weixin_39522423/article/details/111282694?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_baidulandingword-5&spm=1001.2101.3001.4242)
- [绝了，没想到一个 source map 居然涉及到那么多知识盲区](https://juejin.cn/post/6963076475020902436)
- [前端模块化详解(完整版)](https://juejin.cn/post/6844903744518389768)
- [三年 Git 使用心得 & 常见问题整](https://juejin.cn/post/6844904191203213326)
- [体积减少 80%！释放 webpack tree-shaking 的真正潜力](https://juejin.cn/post/6844903669100445710)

## 17. flutter/rn/Electron

- [分享这半年的 Electron 应用开发和优化经验](https://juejin.cn/post/6844904029231775758)
- [Flutter 开发踩坑记录（干货总结](https://juejin.cn/post/6844904074622697480)
- [Flutter 面试知识点集锦](https://juejin.cn/post/6844903843260530701)
- [Flutter 完整开发实战详解(一、Dart 语言和 Flutter 基础) | 掘金技术征文](https://juejin.cn/post/6844903650704244750)
- [国内大厂在移动端跨平台的框架接入分析](https://juejin.cn/post/6844904177949212680)
- [React Native 性能优化指南【全网最全，值得收藏】](https://juejin.cn/post/6844904041290432525)
- [🎯【深入解析】跨端框架的核心技术到底是什么？](https://juejin.cn/post/6899235961096372237)
- [Flutter VS React Native VS Native，谁才是性能之王](https://juejin.cn/post/6844904130645852167)
- [React Native App 应用架构设计](https://juejin.cn/post/6844903507544244232)
- [React Native 原理与实践](https://zhuanlan.zhihu.com/p/343519887)
- [React Native 学习资源汇总](https://zhuanlan.zhihu.com/p/165942725)
- [云音乐 React Native 优化实践之拆包与预热](https://zhuanlan.zhihu.com/p/287861192)
- [为什么国内的 uniapp 一直没人讨论呢？](https://www.zhihu.com/question/330607558/answer/1400541322)
- [React Native 持续部署实践— push 代码构建出新版的 Growth](https://zhuanlan.zhihu.com/p/27092552)
- [如何利用 Electron 开发一个桌面 APP](https://zhuanlan.zhihu.com/p/32765171)
- [想要试试 Electron ，不如看看这篇爬坑总结](https://juejin.cn/post/6844904183821238280)
- [用 Electron 和 React 撸了个功能超全 + 颜值极高的音乐客户端](https://juejin.cn/post/6844903752885862414)
- [Android 性能优化最佳实践](https://juejin.cn/post/6844903641032163336)
- [Android Webview H5 秒开方案实现](https://juejin.cn/post/6844903673697402887)
- [近两万字小程序攻略发布了](https://juejin.cn/post/6844903670589423623)
- [Flutter 手势原理](https://juejin.cn/post/6898893296706256903)
- [Electron 桌面端所见即所得-Electron 练习生](https://juejin.cn/post/6902230039366991879)
- [写给前端工程师的 Flutter 教程](https://juejin.cn/post/6844903918351155213)
- [移动混合开发中的 JSBridge](https://mp.weixin.qq.com/s/I812Cr1_tLGrvIRb9jsg-A)

## 18. 面试经验

- [必须要会的 50 个 React 面试题](https://juejin.cn/post/6844903806715559943)
- [30 道 Vue 面试题，内含详细讲解（涵盖入门到精通，自测 Vue 掌握程度）](https://juejin.cn/post/6844903918753808398)
- [2020 最新：100 道有答案的前端面试题（上）](https://juejin.cn/post/6847902225423925255)
- [世界顶级公司的前端面试都问些什么](https://juejin.cn/post/6844903763568771080)
- [前端面试考点多？看这些文章就够了（2019 年 6 月更新版）](https://juejin.cn/post/6844903577220349959)
- [面试官(6): 写过『通用前端组件』吗?](https://juejin.cn/post/6844903847874265101)
- [【1 月最新】前端 100 问：能搞懂 80% 的请把简历给我](https://juejin.cn/post/6844903885488783374)
- [霖呆呆的中大厂面试记录及 2 年前端薪资对比(附赠学习方法)](https://juejin.cn/post/6844904181627781128)
- [阿里前端攻城狮们写了一份前端面试题答案，请查收](https://juejin.cn/post/6844904097556987917)
- [前端，社招，面淘宝，指南](https://juejin.cn/post/6922623997980966926)
- [聊聊前端面试](https://juejin.cn/post/6964658454543728647)
- [最全的手写 JS 面试题](https://juejin.cn/post/6968713283884974088)
- [最全的 Vue 面试题+详解答案](https://juejin.cn/post/6961222829979697165)
- [10 种跨域解决方案（附终极大招）](https://juejin.cn/post/6844904126246027278)
- [字节跳动最爱考的前端面试题：JavaScript 基础](https://juejin.cn/post/6934500357091360781)
- [跳槽人速来，面经&资源分享](https://juejin.cn/post/6942988170208215076)
- [字节跳动今日头条前端面经（4 轮技术面+hr 面）](https://juejin.cn/post/6844904088337907720)
- [看完跳槽少说涨 5 K，前端面试从准备到谈薪完全指南（近万字精华）](https://juejin.cn/post/6844904029340827656)
- [四月前端知识集锦（每月不可错过的文章集锦）](https://juejin.cn/post/6844903600926228493)
- [几道高级前端面试题解析](https://juejin.cn/post/6844903598707441672)
- [前端笔试题面试题记录（上）](https://juejin.cn/post/6844903577421365255)

## 19. 安全

- [前端安全系列（一）：如何防止 XSS 攻击？](https://juejin.cn/post/6844903685122703367)
- [前端安全系列之二：如何防止 CSRF 攻击？](https://juejin.cn/post/6844903689702866952)
- [8 大前端安全问题（上）](http://insights.thoughtworks.cn/eight-security-problems-in-front-end/)
- [《大前端进阶 安全》系列 HTTPS 详解（通俗易懂）](https://juejin.cn/post/6844904127420432391)
- [前端安全问题汇总（实战）](https://zhuanlan.zhihu.com/p/83865185)
- [当我们在谈论前端加密时，我们在谈些什么](https://zhuanlan.zhihu.com/p/22289839)
- [15 张精美动图全面讲解 CORS](https://juejin.cn/post/6856556746706518024)
- [【面试篇】寒冬求职之你必须要懂的 Web 安全](https://juejin.cn/post/6844903842635579405)

## 20. 开源项目

- [《吐血整理》系列 大厂前端组件库工具集合（PC 端、移动端、JS、CSS 等）](https://juejin.cn/post/6844904103114440718)
- [这些神仙代码库值得每一个前端开发者收藏](https://juejin.cn/post/6844904178305728519)
- [9 个项目助你在 2020 年成为前端大神！](https://juejin.cn/post/6844903987330678798)
- [提高前端开发者效率的 11 个必备的网站](https://juejin.cn/post/6844904070122045453)
- [这些开源项目，让你轻松应对十大工作场景](https://juejin.cn/post/6898098763772985352)
- [前端进阶必备，github 优质资源整理分享！](https://juejin.cn/post/6844903902299553806)

## 21. 部署/监控

- [谁说前端不需要懂-Nginx 反向代理与负载均衡](https://juejin.cn/post/6844903619465068551)
- [【你应该了解的】详尽&全面的前端部署（从零起步，前端上线不用愁）](https://juejin.cn/post/6844904032218120200)
- [前端工程师不可不知的 Nginx 知识](https://juejin.cn/post/6864085814571335694)
- [去大厂，你就应该了解前端监控和埋点!](https://juejin.cn/post/6844904130163507214)
- [前端一键自动部署工具 🛠](https://juejin.cn/post/6872914108979609614)
- [浅谈前端线上部署与运维](https://juejin.cn/post/6844903512573214733)
- [Docker+Nginx+Jenkins 实现前端自动化部署](https://juejin.cn/post/6869736425953165319)
- [一步一步搭建前端监控系统：如何记录用户行为？](https://juejin.cn/post/6844903905394950158)
- [要进大厂？前端灰度发布必须要知道](https://juejin.cn/post/6844903969110622222)
- [实战笔记：Jenkins 打造强大的前端自动化工作流](https://juejin.cn/post/6844903591417757710)
- [前端必备 Nginx 配置](https://juejin.cn/post/6844903942262882318)
- [前端的 Nginx 知识梳理](https://juejin.cn/post/6914160814152744973)

## 22. 团队规则

- [ESLint 里的规则教会我，无规矩 不编程](https://juejin.cn/post/6844903608379506701)
- [团队 React 代码规范制定](https://juejin.cn/post/6844903999074746381)
- [前端团队代码评审 CheckList 清单](https://juejin.cn/post/6844903879604191246)
- [有赞前端质量保障体系](https://juejin.cn/post/6844903885652377614)
- [如何保障前端项目的代码质量](https://juejin.cn/post/6844903671457677325)
- [在 Typescript 项目中，如何优雅的使用 ESLint 和 Prettier](https://juejin.cn/post/6844903880006844424)

## 23. 算法

- [leetcode](https://leetcode-cn.com/)
- [写给前端的算法进阶指南，我是如何两个月零基础刷 200 题](https://juejin.cn/post/6847009772500156429)
- [前端该如何准备数据结构和算法？](https://juejin.cn/post/6844903919722692621)
- [一些提高前端代码健壮性的方法](https://juejin.cn/post/6896118234391511053)
- [前端面试遇到的算法题](https://juejin.cn/post/6844903575538106376)
- [字节跳动最爱考的 64 道算法题（JS 版）](https://juejin.cn/post/6947842412102287373)

## 24. 杂谈

- [精读《为什么专家不再关心技术细节》](https://juejin.cn/post/6844903847060570126)
- [关于前端学习路线的一些建议（内含经典自测题）](https://juejin.cn/post/6844903929755484167)
- [还在迷茫于前端如何入门和进阶？万字指南让你不再迷茫！](https://juejin.cn/post/6844904199604404231)
- [我如何零基础转行成为一个自信的前端](https://juejin.cn/post/6844903783630127111)
- [技术栈：小菜前端的技术栈是如何规划和演进的](https://juejin.cn/post/6844903807340511246)
- [今天聊：2~4 年前端走出离职困境与舒适区](https://juejin.cn/post/6931985882111016968)
- [关于裸辞，关于前端面试](https://juejin.cn/post/6844903858297143310)
- [你累死累活做业务，绩效还不怎么样，我只能帮你到这了……](https://juejin.cn/post/6844904150161948679)
- [致 2021 届前端同学的一封信|砥砺前行，未来可期！](https://juejin.cn/post/6844904106709139469)
- [解密初、中、高级程序员的进化之路（前端）](https://juejin.cn/post/6844903897593544718)
- [你必须『收藏』的 Github 技巧](https://juejin.cn/post/6844903456969342989)
- [一个草根前端人的焦虑](https://juejin.cn/post/6922456847765110798)
- [从破解某设计网站谈前端水印(详细教程)](https://juejin.cn/post/6900713052270755847)
- [看看这些被同事喷的 JS 代码风格你写过多少](https://juejin.cn/post/6844903714164047879)
- [Web 前端修仙指南：从小白到全栈](https://juejin.cn/post/6844904122311786504)
- [如何成为公司独当一面的工程师](https://juejin.cn/post/6844904001092206605)
- [神三元在抖音架构组的八个月，他经历了什么？](https://juejin.cn/post/6963061994928898085)
- [聊一聊加班严重时要如何自我提升](https://juejin.cn/post/6844903919731130381)
