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

## 6. v-if 和 v-show

> 1. `v-if` 是一个指令，他必须依附于某个元素, 可以在一个 `<template>` 元素上使用 v-if，这只是一个不可见的包装器元素,最后渲染的结果并不会包含这个 `<template>` 元素。
> 2. `v-show` 不支持在` <template>` 元素上使用，也不能和 v-else 搭配使用。`v-show` 仅切换了该元素上名为 `display` 的 CSS 属性。
> 3. `v-if` 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。
> 4. `v-if` 也是**惰性的**：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。
> 5. 当 v-if 和 v-for 同时存在于一个元素上的时候，`v-if` 会首先被执行。

## 7. v-for

> 1. `v-for` 来遍历一个对象的所有属性。遍历的顺序会基于对该对象调用 `Object.keys()` 的返回值来决定。

```js
/**
 * @description:
 * @return {*}
 * 第一个参数：表示值 value
 * 第二个参数：表示属性名（例如key）
 * 第三个参数：表示位置索引 index
 */
<li v-for="(value, key, index) in myObject" >
  {{ index }}. {{ key }}: {{ value }}
</li>
// n 的初值是从 1 开始而非 0。
<span v-for="n in 10" >{{ n }}</span>
```

> 2. `v-if` 比 `v-for` 的优先级更高。这意味着 v-if 的条件将无法访问到 v-for 作用域内定义的变量别名：

```js
<!--
 这会抛出一个错误，因为属性 todo 此时
 没有在该实例上定义
-->
<li v-for="todo in todos" v-if="!todo.isComplete" :key="todo.name">
  {{ todo.name }}
</li>
```

> 3. Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表。默认模式是高效的，**但只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况。**
> 4. key 绑定的值期望是一个`基础类型的值`，例如字符串或 number 类型。**不要用对象作为 v-for 的 key**。

## 8. 事件修饰符

> 1. 使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用
>    `@click.prevent.self` 会阻止元素及其子元素的所有点击事件的默认行为而
>    `@click.self.prevent` 则只会阻止对元素本身的点击事件的默认行为。
> 2. 请勿同时使用 `.passive` 和 `.prevent`，因为 `.passive` 已经向浏览器表明了你不想阻止事件的默认行为。如果你这么做了，则 `.prevent` 会被忽略，并且浏览器会抛出警告。

```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 阻止默认事件 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>
<!-- 也可以只有修饰符 -->
<form @submit.prevent />

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 事件的默认行为立即执行，无需等待事件回调执行完毕 -->
<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()`  -->
<div @scroll.passive="onScroll">...</div>
```

## 9. 不常用事件

```js
<img
  @wheel.prevent="zoom"
  @pointerdown="pointerdownHandler"
  @pointerup="pointerupHandler"
  @pointermove="pointermoveHandler"
/>
// 鼠标滚轮事件
function zoom(event) {
  if (!event.deltaY) {
    return;
  }
  // console.log(event.deltaY); // event.deltaY 的正负判断滚轮是朝上还是朝下：
  // event.preventDefault(); // 阻止默认行为的话
  if (event.deltaY < 0) {
    scaleNum.value += 0.1; // 放大
  } else if (event.deltaY > 0) {
    scaleNum.value >= 0.2 && (scaleNum.value -= 0.1); // 缩小
  }
}
// 鼠标/手指按下
function pointerdownHandler(e) {}
// 鼠标/手指抬起
function pointerupHandler(e) {}
//鼠标/手指移动
function pointermoveHandler(e) {}
```

## 10. watch vs. watchEffect

它们之间的主要区别是追踪响应式依赖的方式：

- `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。

- `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

#### 注意：

1. **同步语句创建**的侦听器会在宿主组件卸载时**自动停止**
2. **异步回调创建**的侦听器**必须手动停止**，以防内存泄漏

## 11. 组件的 ref

> 1. 你只可以在**组件挂载后**才能访问模板引用，在初次渲染时会是 null
> 2. 如果你需要侦听一个模板引用 ref 的变化，确保考虑到其值为 null 的情况：

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus();
  } else {
    // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
  }
});
```

> 3. 当在 v-for 中使用模板引用时，`对应的 ref 中包含的值是一个数组`，它将在元素被挂载后包含对应整个列表的`所有元素`,
>    应该注意的是，`ref 数组并不保证与源数组相同的顺序`。(需要 v3.2.25 及以上版本)
> 4. `ref attribute` 还可以绑定为一个函数，会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数

```html
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }" />
```

注意我们这里需要使用动态的 `:ref`绑定才能够传入一个函数。`当绑定的元素被卸载时，函数也会被调用一次，此时的 el 参数会是 null`。你当然也可以绑定一个组件方法而不是内联函数

> 5. 使用了 `<script setup>` 的组件是默认私有的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 **`defineExpose`** 宏显式暴露
