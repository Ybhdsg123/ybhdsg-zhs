# ref

## 基础知识：

**_`ref()` 让我们能创造一种对任意值的 “引用”，并能够在不丢失响应性的前提下传递这些引用_**

> 1. `ref()` 方法来允许我们创建可以使用`任何值`类型的`响应式 ref`;
> 2. `ref()` 将传入参数的值包装为一个带 `.value` 属性的 ref 对象;
> 3. ref 的 `.value` 属性也是响应式的。同时，当值为对象类型时，会用 reactive() 自动转换它的 .value;
> 4. 一个包含对象类型值的 ref 可以响应式地替换整个对象; `reactive“替换”一个响应式对象，将导致对初始引用的响应性连接丢失`
> 5. ref 被传递给函数或是从一般对象上被解构时，不会丢失响应性; `reactive 将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，会失去响应性`
> 6. 当 ref 在`模板中作为顶层属性`被访问时，它们会被自动“解包”
> 7. 当一个 ref 被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包
> 8. 如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的 ref
> 9. 只有当嵌套在一个深层响应式对象内时，才会发生 ref 解包。当其作为`浅层响应式对象的属性`被访问时不会解包。
> 10. 跟响应式对象不同，当 ref 作为`响应式数组`或像 `Map 这种原生集合类型`的元素被访问时，不会进行解包。

```vue
<script setup>
import { ref, reactive } from "vue";
const object = { foo: ref(1) }; // foo 是顶层属性，但 object.foo 不是。
const { foo } = object; // 渲染的结果会是一个 [object Object]，因为 object.foo 是一个 ref 对象。我们可以通过将 foo 改成顶层属性来解决这个问题：

const count = ref(0);
const state = reactive({
  count,
});
console.log(count); // { value: 0 }
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1

console.log(state.count); // 0
state.count = 1;
console.log(count.value); // 1

const otherCount = ref(2);
state.count = otherCount;
console.log(state.count); // 2
// 原始 ref 现在已经和 state.count 失去联系
console.log(count.value); // 1

// 一个包含对象类型值的 ref 可以响应式地替换整个对象：
const objectRef = ref({ count: 0 });
// 这是响应式的替换
objectRef.value = { count: 1 };

// 使用 reactive 会丢失响应式 ==》 “替换”一个响应式对象，因为这将导致对初始引用的响应性连接丢失：
let state = reactive({ count: 0 });
// 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
state = reactive({ count: 1 });

const books = reactive([ref("Vue 3 Guide")]);
// 这里需要 .value
console.log(books[0].value);

const map = reactive(new Map([["count", ref(0)]]));
// 这里需要 .value
console.log(map.get("count").value);
</script>
<template>
  <div>
    <!-- 无需 .value -->
    {{ count }}
    <!-- 解构object，才可以正确渲染，渲染结果为2 -->
    {{ foo + 1 }}
  </div>
</template>
```
