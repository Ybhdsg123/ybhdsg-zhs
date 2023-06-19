# Diff 算法

:::warning Diff 算法作用
在组件**更新**时，会**形成**新的 VNode，**新旧 VNode 进行比较 patch**，通过 diff 算法**找出**更新的地方，然后**执行**对应的 DOM 操作 diff 的过程
:::

**Vnode 的基本格式**： `h(type, props, children)`，`type`指`vnode`的类型（包括组件，元素等），`props`指接收的参数（对于组件类型为其`props`等值，对于元素类型为其属性值），`children`指子`vnode`（默认是数组）。
