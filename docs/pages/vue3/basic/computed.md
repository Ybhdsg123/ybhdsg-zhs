# 计算属性

**推荐使用计算属性来描述依赖响应式状态的复杂逻辑**

> 1. 计算属性默认是只读的，`computed()` 方法期望接收一个 getter 函数，返回值为一个**计算属性 ref**,模版中会自动解包；
> 2. 计算属性值会基于其响应式依赖被缓存;
> 3. 计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。**不要在 getter 中做异步请求或者更改 DOM！**

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
