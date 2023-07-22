# 组件注册

## 1. 全局注册

> 1. `app.component()` 方法可以被链式调用：
> 2. 全局注册的组件可以在此应用的任意组件的模板中使用：所有的子组件也可以使用全局注册的组件，这意味着这三个组件也都可以在彼此内部使用。

```js
import MyComponent from "./App.vue";

app.component("MyComponent", MyComponent);
app
  .component("ComponentA", ComponentA)
  .component("ComponentB", ComponentB)
  .component("ComponentC", ComponentC);
```

## 2. 局部注册

> 1. 在使用 `<script setup>` 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：
> 2. 如果没有使用 `<script setup>`，则需要使用 `components` 选项来显式注册
> 3. **局部注册的组件在后代组件中并不可用**,仅在当前组件可用，而在任何的子组件或更深层的子组件中都不可用。

```js
import ComponentA from "./ComponentA.js";

export default {
  components: {
    ComponentA,
  },
  setup() {
    // ...
  },
};
```

## 3. 目前在使用的自动注册组件方法

**_1. 前置条件：_** 因为在`<script setup>`下，无法使用 name，可以写两个`script标签`解决，也可以使用插件 `vite-plugin-vue-setup-extend`来解决，

- 1.1. 安装插件：`npm i vite-plugin-vue-setup-extend -D --save`

- 1.2. 配置 vite.config.ts

```js
// /vite.config.ts
import { defineConfig } from "vite";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
export default defineConfig({
  plugins: [VueSetupExtend()],
});
```

- 1.3. 使用

```js
<script lang="ts" setup name="demo">
  // do something...
</script>
```

**_2. 批量引入组件信息：_** 使用 [`import.meta.glob`](https://cn.vitejs.dev/guide/features.html#glob-import) 自动获取组件信息，（`eager: true`,可以对这些模块进行 `tree-shaking`。）

我的组件格式为： `组件名称/index.vue`，所以写的是`import.meta.glob("@/components/**/index.vue", {
  eager: true,
});`，

如果你的组件格式为 `组件名称/组件名称.vue`，可以写成`import.meta.glob("@/components/**/**.vue", {
  eager: true,
});`

**_3. 主要代码实现：_**

**3.1 通过插件的形式进行组件注册：**

> 一个插件可以是一个拥有 `install()` 方法的对象，也可以直接是一个安装函数本身。安装函数会接收到安装它的应用实例和传递给 `app.use()` 的额外选项作为参数：

```js
// components/index.ts
// 1. 获取所有组件信息
const allRoutes: any = import.meta.glob("@/components/**/index.vue", {
  eager: true,
});
export default {
  // 通过插件的形式来注册，install(app)会自动接收到 app 实例
  install(app: any) {
    for (let obj in allRoutes) {
      // 这里组件名称，通过插件写的name，可以直接直接接收到
      app.component(allRoutes[obj].default.name, allRoutes[obj].default);
    }
  },
};
```

**3.2 在`mian.ts`中引入**

```js
//  main.ts
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App); // 创建vue实例
app.mount("#app"); // 挂载

// 全局组件的注册  /components/index.ts下的 index.ts可以省略
import globalComponents from "@/components";
app.use(globalComponents);
```

**3.3 使用**

```vue
<template>
  <componentA />
</template>
```

## 4. [elemengt plus 的按需自动导入](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)

1. 首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```js
npm install -D unplugin-vue-components unplugin-auto-import
```

2. 配置 `vite.config.ts`

```js
// vite.config.ts
import { defineConfig } from "vite";
// 按需导入 - 自动导入element-puls组件
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```
