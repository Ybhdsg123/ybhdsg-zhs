# vue2 相关

[vue 原理面试](https://mp.weixin.qq.com/s/3KIaI65HqaD2hSM3NMFEOg)

## 1. 什么是 MVVM？

**Model 层**

对应数据层的域模型，主要用来做域模型的同步。

通过 `Ajax`、`fetch` 等 API 完成客户端和服务端业务模型的同步。

在分层关系中，它主要⽤于抽象出 ViewModel 层中视图的 Model。

**View 层**

作为视图模板存在，其实在 MVVM 中整个 View 就是⼀个动态模板。

除了用于定义结构和布局之外，它还展示了 ViewModel 层的数据和状态。

View 层并不负责状态的实际处理，它只是做：数据绑定声明、 指令声明、 事件绑定声明。

**ViewModel 层**

负责暴露数据给 View 层，并对 View 层中的数据绑定声明、 指令声明、 事件绑定声明进行实际的业务逻辑。

ViewModel 底层会做好绑定属性的监听，当 ViewModel 中的数据变化时，View 层会自动进行更新；⽽当 View 中声明了数据的双向绑定（表单元素），框架也会监听 View 层（表单元素）值的变化，⼀旦变化，则 View 层绑定的 ViewModel 中的数据也会得到⾃动更新。

## 2. MVVM 的优缺点有哪些？

**优点**

1. 实现了视图（View）和模型（Model）的分离，降低代码耦合、提⾼视图或逻辑的复⽤性

> ⽐如：View 可以独⽴于 Model 变化和修改，⼀个 ViewModel 可以绑定于不同的 "View"，当 View 发生变化时 Model 一定会随之改变，而当 Model 变化时则 View 可以不变。我们可以把⼀些视图逻辑放在⼀个 ViewModel ⾥，以此让多个 View 重⽤这段视图逻辑。

2. 提⾼了可测试性：ViewModel 的存在可以帮助开发者更好地编写测试代码

3. 能⾃动更新 DOM：利⽤双向绑定，数据更新后视图⾃动更新，让开发者从繁琐的⼿动操作 DOM 中解放出来

**缺点**

1. Bug 很难被调试：因为使⽤了双向绑定的模式，当我们看到界⾯发生异常了，有可能是 View 的代码产生的 Bug，也有可能是 Model 代码的问题。数据绑定使得⼀个位置的 Bug 被快速传递到别的位置，要定位原始出问题的地⽅就变得不那么容易了。另外，数据绑定的声明是指令式地写在 View 模版中的，它们没办法打断点进行 Debug

2. 在⼀个⼤的模块中 Model 也会很⼤，虽然使⽤上来说⽅便了，也能很容易的保证了数据的⼀致性，但如果⻓期持有不释放内存，就会造成更多的内存消耗

3. 对于⼤型的图形应⽤程序，视图状态较多，ViewModel 的构建和维护的成本都会⽐较⾼

## 3. 谈谈对 Vue 生命周期的理解？

**生命周期的概念**

每个 Vue 实例都有⼀个完整的⽣命周期：

1. 开始创建
2. 初始化数据
3. 编译模版
4. 挂载 DOM
5. 渲染、更新数据 => 重新渲染
6. 卸载

这⼀系列过程我们称之为 Vue 的⽣命周期。

## 5. Vue 组件之间如何进行通信？

**`props` 和 `$emit + v-on`**

通过 `props` 将数据在组件树中进行⾃上⽽下的传递；

通过 `$emit` 和 `v-on` 来作信息的向上传递。

**EventBus**

可通过 EventBus 进⾏信息的发布与订阅。

**Vuex**

全局状态管理库。可通过它来进行全局数据流的管理。

**`$attrs` 和 `$listeners`**

在 Vue 2.4 版本中加⼊的 `$attrs` 和 `$listeners` 可以用来作为跨级组件之间的通信机制。

**`provide` 和 `inject`**

由于 `provide` 和 `inject` 可以允许⼀个祖先组件向它的所有⼦孙组件注⼊⼀个依赖（不论组件层次有多深），并在其上下游关系成⽴的时间⾥始终⽣效，因此这种机制也就成为了一种跨组件通信的手段。

> 另外还有一些方式使用场景有限，在此不介绍了。
>
> 可以阅读参考文章：[Vue 中的 8 种组件通信方式](https://juejin.cn/post/6844903887162310669)

## 6. Vue 双向绑定原理？

在 Vue 2.x 中，利⽤的是 `Object.defineProperty` 去劫持对象的访问器（Getter、Setter），当对象属性值发⽣变化时可获取变化，然后根据变化来作后续响应；

在 Vue 3.0 中，则是通过 `Proxy` 代理对象进⾏类似的操作。

## 7. Object.defineProperty 和 Proxy 的优缺点？

**Proxy**

- 可以直接监听整个对象，⽽⾮是对象的属性

- 可以直接监听数组的变化

- 拦截⽅法丰富：多达 13 种，不限于 `apply`、`ownKeys`、`deleteProperty`、`has` 等。比 `Object.defineProperty` 强大很多

- 返回的是⼀个新对象，可以在不影响原对象的情况下，只操作新对象来达到⽬的；⽽ `Object.defineProperty` 只能遍历原对象属性并直接修改原对象

- 受到各浏览器⼚商的重点持续性能优化，能享受到作为新标准的性能红利

**Object.defineProperty**

- 兼容性较好（可⽀持到 IE9）

## 8. 如何理解 Vue 的响应式系统？

(考察 MVVM) M: model 数据模型, V:view 视图模型, VM: viewModel 视图数据模型

双向:

1. 视图变化了, 数据自动更新 => 监听原生的事件即可, 输入框变了, 监听输入框 input 事件
2. 数据变化了, 视图要自动更新 => vue2 和 vue3

### 基本原理

vue2.0 数据劫持: Object.defineProperty (es5)

vue3.0 数据劫持: Proxy (es6)

分析 :此题考查 Vue 的 MVVM 原理

解答: Vue 的双向绑定原理其实就是 MVVM 的基本原理, Vuejs 官网已经说明, 实际就是通过 Object.defineProperty 方法 完成了对于 Vue 实例中数据的 **`劫持`**, 通过对于 data 中数据 进行 set 的劫持监听, 然后通过**`观察者模式`**, 通知 对应的绑定节点 进行节点数据更新, 完成数据驱动视图的更新

简单概述 : 通过 Object.defineProperty 完成对于数据的劫持, 通过观察者模式, 完成对于节点的数据更新
