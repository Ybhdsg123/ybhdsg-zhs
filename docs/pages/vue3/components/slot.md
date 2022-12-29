# 组件插槽

## 1. 渲染作用域

插槽内容**无法访问**子组件的数据。Vue 模板中的表达式只能访问其定义时所处的作用域

> 父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。

## 2. 具名插槽

这类带 `name` 的插槽被称为`具名插槽` (named slots)。没有提供 name 的 `<slot>` 出口会隐式地命名为`“default”`。

> 要为具名插槽传入内容，我们需要使用一个含 `v-slot` 指令的 `<template>` 元素，并将目标插槽的名字传给该指令：

> `v-slot` 有对应的简写 `#`，因此 `<template v-slot:header>` 可以简写为 `<template #header>`。其意思就是“将这部分模板片段传入子组件的 header 插槽中”。

```js
<BaseLayout>
  <template v-slot:header>{/* header 插槽的内容放这里 */}</template>
</BaseLayout>
```
