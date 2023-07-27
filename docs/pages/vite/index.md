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

[vite 官网地址](https://cn.vitejs.dev/guide/why.html#footnote-1)

:::details `webpack`：分析依赖 ==> 编译打包 ==> 交给本地服务器渲染

- 分析各个模块之间的依赖，再进行打包，然后通过`webpack-dev-server`请求，显示结果。
- 项目体积变大，`bundle`体积增加，影响热更新速度

:::

::: details `vite`: 开发阶段通过 `esbuild`构建，生产环境通过 `rollup` 进行构建

- `Vite`在一开始时就将应用中的模块分为**依赖**和**源码**，
- **依赖**：大多为在开发时不会变动的纯 JavaScript，
  - **`Vite`采用 `esbuild` 进行依赖预购建，依赖不改变，不需要重新构建，**
- **源码**：通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。
  - `Vite`以原生`ES Modules(ESM)`形式提供源码，因为浏览器可以直接解析`ES Modules(ESM)`，`<script type='module'></script>`来使用浏览器的 `ESM` 模块加载模块。
  - 这实际是让浏览器接手打包程序的的部分工作：**`Vite`只需在浏览器请求源码时进行转换并按需提供源码，根据场景动态导入代码(按需导入)**

:::

:::details `vite` 服务热更新更快的原因

- 1. 在 Vite 中， `HMR` 是在原生 `ESM` 上执行的。当编辑一个文件时，`Vite` 只需要精确地使已编辑的模块与其最近的 `HMR` 边界之间的链失活[1]（大多数时候只是模块本身），使得无论应用大小如何，`HMR` 始终能保持快速更新。
- 2. `Vite` 同时利用 `HTTP` 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）
- 3. **源码模块**的请求会根据 `304 Not Modified` 进行**协商缓存**
- 4. **依赖模块**请求则会通过 `Cache-Control: max-age=31536000,immutable` 进行**强缓存**，因此一旦被缓存它们将不需要再次请求。

:::

:::tip 总结

1. 开发阶段构建项目，`vite` 将应用分为**依赖**和**源码**，对依赖进行预构建，源码通过`ESM`形式提供，利用浏览器的能力按需加载源码。
2. `HMR`是在原生`ESM`上执行的，精确控制已编辑模块与最近的`HMR`边界之间的链失活，保持快速更新
3. 利用`HTTP`头的缓存，通过对**源码模块**的**协商缓存**，**依赖模块**的**强缓存**

:::

## 3. 依赖预构建

[vite 官网地址](https://cn.vitejs.dev/guide/dep-pre-bundling.html#the-why)

当你首次启动 vite 时，Vite 在本地加载你的站点之前预构建了项目依赖。默认情况下，它是自动且透明地完成的。

### 原因

1. **CommonJS 和 UMD 兼容性**: 在开发阶段中，**`Vite` 的开发服务器将所有代码视为原生 `ES` 模块**。因此，Vite 必须先将以 CommonJS 或 UMD 形式提供的依赖项转换为 ES 模块。在转换 CommonJS 依赖项时，Vite 会进行智能导入分析，这样即使模块的导出是动态分配的（例如 React），具名导入（named imports）也能正常工作：

```js
// 符合预期
import React, { useState } from "react";
```

2. **性能**：为了提高后续页面的加载性能，**`Vite`将那些具有许多内部模块的 `ESM` 依赖项转换为单个模块。**

- 有些包将它们的 `ES `模块构建为许多单独的文件，彼此导入。例如，lodash-es 有超过 600 个内置模块！下载时会进行 600 个请求。
- 通过将 lodash-es 预构建成单个模块，现在我们只需要一个 HTTP 请求！

:::warning 注意
依赖预构建仅适用于开发模式，并使用 esbuild 将依赖项转换为 ES 模块。在生产构建中，将使用 @rollup/plugin-commonjs。
:::
