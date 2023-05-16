# vite 相关

## 1. [`import.meta.glob`](https://cn.vitejs.dev/guide/features.html#glob-import) 获取文件夹下的文件

```js
// 获取所有组件信息
const allRoutes = import.meta.glob("@/components/**/index.vue", {
  //设置为 true 直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用）
  eager: true,
  // 加载默认导出，不加这个需要这样获取文件  allRoutes[key].default.name
  import: "default",
});
export default {
  install(app) {
    for (let key in allRoutes) {
      app.component(allRoutes[key].name, allRoutes[key]);
    }
  },
};
```

## 2. vite 比 webpack 快的原因

:::details `webpack`：分析依赖 ==> 编译打包 ==> 交给本地服务器渲染

- 分析各个模块之间的依赖，再进行打包，然后通过`webpack-dev-server`请求，显示结果。
- 项目体积变大，`bundle`体积增加，影响热更新速度

:::

::: `vite`: 开发阶段通过 `esbuild`构建，生产环境通过 `rollup` 进行构建

- 开发阶段：采用 `esbuild` 进行依赖预购建，依赖不改变，不需要重新构建，通过浏览器自身的 `ES Modules(ESM)` ，给`<scrup` 写上 `type='module'`，来使用浏览器的 esm 模块加载模块，当浏览器发起相应模块的请求时，Vite 内置的基于 Koa 构建的 web 服务器会拦截 ES Module 请求，并通过 path 找到想要目录的文件，通过简单的处理再返回给浏览器。

:::

:::tip 总结

`vite` 在开发阶段构建项目时会将其构建成 ESM 的形式，这让浏览器来决定什么使用要加载什么模块，然后 Vite 拦截并处理浏览器对模型加载的请求，从而实现真正的按需加载，**不再需要打包**。

:::
