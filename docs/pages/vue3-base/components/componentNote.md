# 组件注意点

## 1. props 的单向数据流

所有的 props 都遵循着**单向绑定**原则，你**不应该**在子组件中去更改一个 prop。若你这么做了，Vue 会在控制台上向你抛出警告

导致你想要更改一个 prop 的需求通常来源于以下两种场景：

1. **prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。** 在这种情况下，最好是新定义一个局部数据属性，从 props 上获取初始值即可：

```js
const props = defineProps(["initialCounter"]);

// 计数器只是将 props.initialCounter 作为初始值
// 像下面这样做就使 prop 和后续更新无关了
const counter = ref(props.initialCounter);
```

2. **需要对传入的 prop 值做进一步的转换。** 在这种情况中，最好是基于该 prop 值定义一个计算属性：

```js
const props = defineProps(["size"]);

// 该 prop 变更时计算属性也会自动更新
const normalizedSize = computed(() => props.size.trim().toLowerCase());
```

## 2. 更改对象 / 数组类型的 props：

因为 JavaScript 的对象和数组是按**引用传递**，当对象或数组作为 props 被传入时，虽然子组件**无法更改** props 绑定，但仍然**可以**更改对象或数组**内部的值**。（而对 Vue 来说，禁止这样的改动虽然可能，但有很大的性能损耗，比较得不偿失。）

这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响父组件的状态，可能会使数据流在将来变得更难以理解。除非父子组件在设计上本来就需要紧密耦合。在大多数场景下，子组件应该**抛出一个事件**来通知父组件做出改变。

## 3. props 的校验

> 1.  `defineProps()` 宏中的参数不可以访问 `<script setup>` 中定义的其他变量，因为在编译时整个表达式都会被移到外部的函数中。
> 2.  所有 prop 默认都是可选的，除非声明了 `required: true`。
> 3.  除 `Boolean` 外的未传递的可选 prop 将会有一个默认值 undefined，而`Boolean` 类型的未传递 prop 将被转换为 `false`。
> 4.  如果声明了 `default` 值，那么在 prop 的值被解析为 `undefined` 时，无论 prop 是未被传递还是显式指明的 `undefined`，都会改为 `default` 值。

```js
defineProps({
  // 基础类型检查
  // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
  propA: Number,
  // 多种可能的类型
  propB: [String, Number],
  // 必传，且为 String 类型
  propC: {
    type: String,
    required: true,
  },
  // Number 类型的默认值
  propD: {
    type: Number,
    default: 100,
  },
  // 对象类型的默认值
  propE: {
    type: Object,
    // 对象或数组的默认值
    // 必须从一个工厂函数返回。
    // 该函数接收组件所接收到的原始 prop 作为参数。
    default(rawProps) {
      return { message: "hello" };
    },
  },
  // 自定义类型校验函数
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ["success", "warning", "danger"].includes(value);
    },
  },
  // 函数类型的默认值
  propG: {
    type: Function,
    // 不像对象或数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数
    default() {
      return "Default function";
    },
  },
});
```

## 4.事件校验

要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 emit 的内容，返回一个`布尔值`来表明事件是否合法。

```js
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
```

## 5. 透传 Attributes

> 1. “透传 attribute”指的是传递给一个组件，却没有被该组件声明为 `props` 或 `emits` 的 attribute 或者 v-on 事件监听器。最常见的例子就是 class、style 和 id。
> 2. **当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上。**
> 3. 如果一个子组件的根元素已经有了 `class` 或 `style` attribute，**它会和从父组件上继承的值合并。**
> 4. `v-on` 监听器继承
> 5. 透传的 attribute 不会包含 `<MyButton>` 上**声明过**的 props 或是针对 emits 声明事件的 v-on 侦听函数，换句话说，声明过的 props 和侦听函数被 `<MyButton>`“消费”了。
> 6. 透传的 attribute 若符合声明，也可以作为 props 传入 `<BaseButton>`。
> 7. 禁用 `Attributes` 继承：设置`inheritAttrs: false`

如果你使用了 `<script setup>`，你需要一个额外的 `<script>` 块来书写这个选项声明：

```vue
<script>
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false,
};
</script>

<script setup>
// ...setup 部分逻辑
</script>
```

> 8. 在根节点以外的其他元素上应用 `attribute`,通过设置 inheritAttrs 选项为 false，你可以完全控制透传进来的 attribute 被如何使用。
> 9. 透传进来的 `attribute`，在模版中可以通过`$attrs`访问到

这个 `$attrs` 对象**包含**了除组件所声明的 props 和 emits **之外**的所有其他 attribute，例如 class，style，v-on 监听器等等。

> 10. 透传 `attributes` 在 JavaScript 中**保留了它们原始的大小写**，所以像 `foo-bar` 这样的一个 attribute 需要通过 **`$attrs['foo-bar']`** 来访问。
> 11. 像 **`@click`** 这样的一个 v-on 事件监听器将在此对象下被暴露为一个函数 **`$attrs.onClick`**。

我们想要所有像 class 和 v-on 监听器这样的透传 attribute 都应用在内部的 `<button>` 上而不是外层的 `<div>` 上。我们可以通过设定 inheritAttrs: false 和使用 v-bind="$attrs" 来实现：

```js{2}
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```

**_没有参数的 v-bind_** 会将一个对象的所有属性都作为 attribute 应用到目标元素上。

> 12. 有着**多个根节点**的组件没有自动 `attribute` 透传行为。如果 `$attrs` **没有被显式绑定**，将会抛出一个运行时警告。
> 13. 你可以在 `<script setup>` 中使用 **_useAttrs()_** API 来访问一个组件的所有透传 attribute：

```vue
<script setup>
import { useAttrs } from "vue";
const attrs = useAttrs();

// 非 setup
export default {
  setup(props, ctx) {
    // 透传 attribute 被暴露为 ctx.attrs
    console.log(ctx.attrs);
  },
};
</script>
```

虽然这里的 `attrs` 对象总是反映为**最新**的透传 `attribute`，**但它并不是响应式的** (考虑到性能因素)。你**不能**通过侦听器去监听它的变化。如果你需要响应性，可以使用 `prop`。或者你也可以使用 `onUpdated()` 使得在每次更新时结合最新的 `attrs` 执行副作用。
