# v-model

## 1. `v-model` 在原生元素上的用法：

```html
<input v-model="searchText" />
```

上面的代码其实等价于下面这段 (编译器会对 v-model 进行展开)：

```html
<input :value="searchText" @input="searchText = $event.target.value" />
```

## 2. `v-model` 在组件上

```js
<CustomInput
  :modelValue="searchText"
  @update:modelValue="(newValue) => (searchText = newValue)"
/>
```

要让这个例子实际工作起来，`<CustomInput>` 组件内部需要做两件事：

1. 将内部原生 input 元素的 `value `attribute 绑定到 `modelValue `prop
2. 输入新的值时在 input 元素上触发 `update:modelValue` 事件

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

另一种在组件内实现 v-model 的方式是使用一个可写的，同时具有 `getter` 和 `setter` 的计算属性。`get` 方法需返回 `modelValue` prop，而 `set` 方法需触发相应的事件：

```vue
<!-- CustomInput.vue -->
<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <input v-model="value" />
</template>
```

## 3. `v-model` 的参数

默认情况下，`v-model` 在组件上都是使用 `modelValue` 作为 prop，并以 `update:modelValue` 作为对应的事件。我们可以通过给 v-model 指定一个参数来更改这些名字：

```js
<MyComponent v-model:title="bookTitle" />
```

子组件应声明一个 `title` prop，并通过触发 `update:title` 事件更新父组件值：

```vue
<!-- MyComponent.vue -->
<script setup>
defineProps(["title"]);
defineEmits(["update:title"]);
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

## 4. 多个 `v-model` 绑定

在一个组件上创建多个 `v-model` 双向绑定，每一个 `v-model` 都会同步不同的 prop：

```js
<UserName v-model:first-name="first" v-model:last-name="last" />
```

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String,
});

defineEmits(["update:firstName", "update:lastName"]);
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

## 5. 处理 `v-model` 修饰符

组件的 `v-model` 上所添加的修饰符，可以通过 `modelModifiers` prop 在组件内访问到。在下面的组件中，我们声明了 `modelModifiers` 这个 prop，它的默认值是一个空对象：

创建一个自定义的修饰符 `capitalize`，它会自动将 `v-model` 绑定输入的字符串值第一个字母转为大写：

> 注意这里组件的 `modelModifiers` prop 包含了 `capitalize` 且其值为 `true`，**因为它在模板中的 v-model 绑定上被使用了**。

> 有了 `modelModifiers` 这个 prop，我们就可以在`原生事件侦听函数中检查它的值`，然后决定触发的自定义事件中要向父组件传递什么值。

```js
//  1. 在组件上使用了 capitalize
<MyComponent v-model.capitalize="myText" />
```

```vue{8,13,16,17,18,19,20}
<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) },
});

defineEmits(["update:modelValue"]);
// 2. 组件的 modelModifiers prop 包含了 capitalize 且其值为 true
console.log(props.modelModifiers); // { capitalize: true }
function emitValue(e) {
  let value = e.target.value
  // 3. 因为 capitalize 在组件上使用了，且其值为true，对传入父组件的值进行操作后传递
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>


```

对于`又有参数又有修饰符`的 v-model 绑定，生成的 prop 名将是 `arg + "Modifiers"`。

```js
<MyComponent v-model:title.capitalize="myText">
```

```js{2}
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title']) console.log(props.titleModifiers) // { capitalize:
true }
```
