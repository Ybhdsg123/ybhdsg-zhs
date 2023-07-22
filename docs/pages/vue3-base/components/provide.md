# 依赖注入

一个父组件相对于其所有的后代组件，会作为**依赖提供者**。任何后代的组件树，无论层级有多深，都可以**注入**由父组件提供给整条链路的依赖。

## 1. 应用层 Provide

> 在应用级别提供的数据在该应用内的**所有组件**中都可以注入。这在你编写插件时会特别有用，因为插件一般都不会使用组件形式来提供值。

```js
import { createApp } from "vue";
const app = createApp({});
app.provide(/* 注入名 */ "message", /* 值 */ "hello!");
```

## 2. Provide (提供)

一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。

> `provide(key,value)` 函数接收两个参数

> 第一个参数被称为注入名，可以是一个字符串或是一个 Symbol。
>
> 第二个参数是提供的值，**值可以是任意类型**，包括响应式的状态，比如一个 ref：

```vue
<script setup>
import { ref, provide } from "vue";
const count = ref(0);
provide(/* 注入名 */ "message", /* 值 */ "hello!");
provide("key", count);
</script>
```

提供的响应式状态使后代组件可以由此和提供者建立响应式的联系。

## 3. Inject (注入)

要注入上层组件提供的数据，需使用 `inject()` 函数：如果提供的值是一个 ref，注入进来的会是该 ref 对象，而**不会自动解包**为其内部的值。这使得注入方组件能够通过 ref 对象保持了和供给方的响应性链接。

```vue
<script setup>
import { inject } from "vue";
const message = inject("message");
</script>
```

如果在注入一个值时不要求必须有提供者，那么我们应该声明一个**默认值**，和 props 类似：

```js
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject("message", "这是默认值");
// 在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。
// 为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值：
const value = inject("key", () => new ExpensiveClass());
```
