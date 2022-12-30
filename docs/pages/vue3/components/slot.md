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

## 3. 动态插槽名

```html
<base-layout>
  <template v-slot:[dynamicSlotName]> ... </template>
  <!-- 缩写为 -->
  <template #[dynamicSlotName]> ... </template>
</base-layout>
```

## 4. 默认作用域插槽

**默认插槽：** 通过子组件标签上的 v-slot 指令，直接接收到了一个插槽 props 对象：

```html
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```

```js
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
// 可以在 v-slot 中使用解构：
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

## 5. 具名作用域插槽

```vue
<template>
  <MyComponent>
    <template v-slot:header="slotProps">
      {{ slotProps }}
    </template>
  </MyComponent>
  // 缩写
  <MyComponent>
    <template #header="headerProps">
      {{ headerProps }}
    </template>
  </MyComponent>
</template>
```

> 注意插槽上的 `name` 是一个 **Vue 特别保留的 attribute**，不会作为 props 传递给插槽。因此最终 `headerProps` 的结果是 `{ message: 'hello' }`。

```html
<slot name="header" message="hello"></slot>
```

> 混用了具名插槽与默认插槽，则需要为默认插槽使用显式的 `<template>` 标签。

```vue
<template>
  <MyComponent>
    <!-- 使用显式的默认插槽 -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>
</template>
```
