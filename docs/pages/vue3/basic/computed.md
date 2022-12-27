## 计算属性 computed()

**推荐使用计算属性来描述依赖响应式状态的复杂逻辑**

> 1. 计算属性默认是只读的，`computed()` 方法期望接收一个 getter 函数，返回值为一个**计算属性 ref**,模版中会自动解包；
> 2. 计算属性值会基于其响应式依赖被缓存;
> 3. 计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。**不要在 getter 中做异步请求或者更改 DOM！**
> 4. **避免直接修改计算属性值**"，从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的;

```vue
<script setup>
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

const fullName = computed({
  // getter
  get() {
    return firstName.value + " " + lastName.value;
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(" ");
  },
});
</script>
```

现在当你再运行 `fullName.value = 'John Doe'` 时，setter 会被调用而 firstName 和 lastName 会随之更新。

## 侦听器 watch()

计算属性允许我们声明性地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些“副作用”：例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。

**侦听数据源类型:** `watch` 的第一个参数可以是不同形式的“数据源”：它可以是一个 **`ref (包括计算属性)`、`一个响应式对象`、`一个 getter 函数`、或`多个数据源组成的数组`**

```js
const x = ref(0);
const y = ref(0);
const obj = reactive({ count: 0 });
// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});

// 一个响应式对象
watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
});

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});
```

注意，你不能直接侦听响应式对象的属性值，需要用一个返回该属性的 getter 函数：

```js
const obj = reactive({ count: 0 });

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`);
});

// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`);
  }
);

// 直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——
// 该回调函数在所有嵌套的变更时都会被触发
watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
});

// 相比之下，一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调：
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
);
```

## 侦听器 watchEffect()

1. `watch()` 是懒执行的：仅当数据源变化时，才会执行回调
2. `watchEffect()` 会立即执行一遍回调函数，如果这时函数产生了副作用，Vue 会自动追踪副作用的依赖关系，自动分析出响应源。
3. `watch` 只追踪明确侦听的数据源。
4. `watchEffect`，则会在副作用发生期间追踪依赖。

## 回调的触发时机

默认情况下，用户创建的侦听器回调，都会在 **`Vue 组件更新之前`** 被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

想在侦听器回调中能访问被 **Vue 更新之后的 DOM**，你需要指明 `flush: 'post'` 选项：

```js
import { watchPostEffect } from "vue";

watch(source, callback, {
  flush: "post",
});

watchEffect(callback, {
  flush: "post",
});

// 后置刷新 watchPostEffect()
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
});
```

## 停止侦听器

在 `setup()` 或 `<script setup>` 中用**同步语句**创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时**自动停止**。因此，在大多数情况下，你无需关心怎么停止一个侦听器。

一个关键点是，侦听器必须用同步语句创建：如果用**异步回调**创建一个侦听器，那么它不会绑定到当前组件上，你**必须手动停止它**，以防内存泄漏。

```vue
<script setup>
import { watchEffect } from "vue";

// 它会自动停止 同步创建的
watchEffect(() => {});

// ...这个则不会！ 异步创建的
setTimeout(() => {
  watchEffect(() => {});
}, 100);

const unwatch = watchEffect(() => {});
// ...当该侦听器不再需要时
unwatch();

// 需要异步请求得到的数据
const data = ref(null);
watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
});
</script>
```
