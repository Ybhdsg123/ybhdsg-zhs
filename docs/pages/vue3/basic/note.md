# vue3 基础知识点

## 1. DOM 更新时机

当你更改响应式状态后，DOM 会自动更新。然而，你得注意 `DOM 的更新并不是同步的`。相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次状态更改，每个组件都只更新一次。

若要等待一个状态改变后的 DOM 更新完成，你可以使用 nextTick() 这个全局 API：

```js
import { nextTick } from "vue";

function increment() {
  state.count++;
  nextTick(() => {
    // 访问更新后的 DOM
  });
}
```

## 2. 深层响应性

在 Vue 中，状态都是默认深层响应式的。这意味着即使在更改深层次的对象或数组，你的改动也能被检测到。

## 3. 响应式代理 vs. 原始对象

值得注意的是，reactive() 返回的是一个原始对象的 Proxy，**它和原始对象是不相等的**：

```js
const raw = {};
const proxy = reactive(raw);

// 代理对象和原始对象不是全等的
console.log(proxy === raw); // false
```

只有代理对象是响应式的，更改原始对象不会触发更新。因此，使用 Vue 的响应式系统的最佳实践是 **_仅使用你声明对象的代理版本_**。

为保证访问代理的一致性，**对同一个原始对象调用 reactive() 会总是返回同样的代理对象，而对一个已存在的代理对象调用 reactive() 会返回其本身**：

```js
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy); // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy); // true
```

这个规则对嵌套对象也适用。依靠深层响应性，响应式对象内的嵌套对象依然是代理：

```js
const proxy = reactive({});

const raw = {};
proxy.nested = raw;

console.log(proxy.nested === raw); // false
```

## 4. reactive() 的种种限制归根结底是因为 JavaScript 没有可以作用于所有值类型的 “引用” 机制。

## 5. [响应性语法糖](https://cn.vuejs.org/guide/extras/reactivity-transform.html#refs-vs-reactive-variables)

> 1. `$ref()` 方法是一个编译时的宏命令：它不是一个真实的、在运行时会调用的方法。而是用作 Vue 编译器的标记，表明最终的 count 变量需要是一个响应式变量。

```vue
<script setup>
let count = $ref(0);
console.log(count);
function increment() {
  count++;
}
</script>
<template>
  <button @click="increment">{{ count }}</button>
</template>
```

**_显示启用_**

> 2. 响应性语法糖目前**默认是关闭状态**，需要你显式选择启用。此外，以下列出的所有配置都需要 **vue@^3.2.25**。

```js
// Vite
// vite.config.js
export default {
  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],
};
// vue-cli
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        return {
          ...options,
          reactivityTransform: true,
        };
      });
  },
};

// 仅用 webpack + vue-loader
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          reactivityTransform: true,
        },
      },
    ],
  },
};
```
