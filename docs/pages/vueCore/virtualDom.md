# 虚拟 Dom

## 1. 什么是虚拟 dom？

**`Virtual DOM`是 JS 模拟真实 DOM 节点，这个对象就是更加轻量级的对 DOM 的描述**

为什么现在主流的框架都使用虚拟 dom?

1）前端性能优化的一个秘诀就是尽可能少地操作 DOM，**频繁变动 DOM 会造成浏览器的回流或者重绘**

2）使用虚拟 dom，当数据变化，页面需要更新时，**通过 diff 算法**，对新旧虚拟 dom 节点进行对比，**比较两棵树的差异，生成差异对象**，一次性对 DOM 进行批量更新操作，进而有效提高了性能

3）**虚拟 DOM 本质上是 js 对象，而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便的跨平台操作**，例如服务器渲染、weex 开发等等

## 三、 vue3 与 vue2 的区别

1）vue3 性能比 Vue2.x 快 1.2~2 倍

2）使用 proxy 取代 Object.defineproperty，解决了 vue2 中新增属性监听不到的问题，同时 proxy 也支持数组，不需要像 vue2 那样对数组的方法做拦截处理

3）diff 方法优化
vue3 新增了静态标记（patchflag），虚拟节点对比时，就只会对比这些带有静态标记的节点

4）静态提升
**vue3 对于不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可**。vue2 无论元素是否参与更新，每次都会重新创建然后再渲染

5）事件侦听器缓存
默认情况下 onClick 会被视为动态绑定，所以每次都会追踪它的变化，但是因为是同一个函数，所以不用追踪变化，直接缓存起来复用即可

6）按需引入，通过 treeSharking 体积比 vue2.x 更小

7）组合 API（类似 react hooks），可以将 data 与对应的逻辑写到一起，更容易理解

8）提供了很灵活的 api 比如 toRef、shallowRef 等等，可以灵活控制数据变化是否需要更新 ui 渲染

9）更好的 Ts 支持

## 四、[vue 和 react 的区别](https://github.com/lihongxun945/myblog/issues/21)

1）设计理念不同

**react 整体上是函数式编程思想**，组件使用 jsx 语法，all in js，将 html 与 css 全都融入 javaScript 中，jsx 语法相对来说更加灵活

**vue 的整体思想，是拥抱经典的 html(结构)+css(表现)+js(行为)的形式**，使用 template 模板，并提供指令供开发者使用，如 v-if、v-show、v-for 等，开发时有结构、表现、行为分离的感觉

2）监听数据变化的实现原理不同

**vue 的思想是响应式的**，通过 Object.defineproperty 或 proxy 代理实现数据监听，每一个属性添加一个 dep 对象（用来存储对应的 watcher），当属性变化的时候，通知对应的 watcher 发生改变

**react 推崇的是数据不可变**，react 使用的是浅比较，如果对象和数据的引用地址没有变，react 认为该对象没有变化，所以 react 变化时一般都是新创建一个对象

3）更新渲染方式不同

当组件的状态发生变化时，vue 是响应式，通过对应的 watcher 自动找到对应的组件重新渲染

react 需要更新组件时，会重新走渲染的流程，通过从根节点开始遍历，dom diff 找到需要变更的节点，更新任务还是很大，需要使用到 Fiber，将大任务分割为多个小任务，可以中断和恢复，不阻塞主进程执行高优先级的任务

4）各自的优势不同

**vue 的优势**：框架内部封装的多，更容易上手，简单的语法及项目创建， 更快的渲染速度和更小的体积

**react 的优势**： react 更灵活，更接近原生的 js、可操控性强，对于能力强的人，更容易造出更个性化的项目

## 五、[react Fiber](https://juejin.cn/post/6943896410987659277)

解决 react 旧版本，更新页面时会出现丢帧卡顿的问题

**React 旧版本问题**

当我们调用 setState 更新页面的时候，React 会遍历应用的所有节点，计算出差异，然后再更新 UI

整个过程是一气呵成，不能被打断的。如果页面元素很多，整个过程执行的时间可能超过 50 毫秒，就容易出现掉帧的现象

**新版本解决方案**

React Fiber 是把一个大任务拆分为了很多个小块任务，一个小块任务的执行必须是一次完成的，不能出现暂停，但是一个小块任务执行完后可以移交控制权给浏览器去响应用户操作

核心是通过 requestIdleCallback ，会在利用浏览器空闲时间会找出所有需要变更的节点

阶段一，生成 Fiber 树，得出需要更新的节点信息，这一步是一个渐进的过程，可以被打断

阶段二，将需要更新的节点一次性批量更新，这个过程不能被打断

**react 中使用了 Fiber，为什么 vue 没有用 Fiber？**
原因是二者的更新机制不一样

Vue 是基于 template 和 watcher 的组件级更新，把每个更新任务分割得足够小，不需要使用到 Fiber 架构，将任务进行更细粒度的拆分

React 是不管在哪里调用 setState，都是从根节点开始更新的，更新任务还是很大，需要使用到 Fiber 将大任务分割为多个小任务，可以中断和恢复，不阻塞主进程执行高优先级的任务，如果不用 Fiber，会出现老版本卡顿的问题

## 六、[Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

**描述：**
`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

**语法：**

```js
Object.defineProperty(obj, prop, descriptor);
```

**参数：**

- `obj` 要定义属性的对象。

- `prop` 要定义或修改的属性的名称或 Symbol 。

- `descriptor` 要定义或修改的属性描述符。
  包括

  ```js
  {
  value: 10, // 要修改的值
  writable: false, // 不可重写
  enumerable: false, // 不可遍历
  configurable: false, // 不可修改描述符本身
  }
  ```

:::warning 注意

1. 默认情况下，使用 `Object.defineProperty()` 添加的属性值是不可修改（immutable）的。因为在使用`Object.defineProperty()` 定义属性时，`writable`,`enumerable`,`configurable`默认值都为 false
2. 存取描述符还具有以下可选键值：

**get**

属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。 **默认为 undefined。**

**set**

属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。**默认为 undefined。**

:::

:::details 属性描述符 demo

```js
var obj = {
  b: 2,
};

// 得到属性描述符
// var desc = Object.getOwnPropertyDescriptor(obj, 'a');
// console.log(desc);

// 设置属性描述符
Object.defineProperty(obj, "a", {
  value: 10,
  writable: false, // 不可重写
  enumerable: false, // 不可遍历
  configurable: false, // 不可修改描述符本身
});
```

:::

:::warning 访问器
在使用 （getter 和 setter）存取描述符时，使用对象的赋值语句，像得到对象属性 `obj.a` ，其实是在执行 `get()` 方法，设置对象属性 `obj.a=123` ，其实是在执行 `set(123)` 方法
:::

:::details 访问器（getter 和 setter）demo

```js
var obj = {};

Object.defineProperty(obj, "a", {
  get: function () {
    return 123;
  }, // 读取器 getter
  set: function (val) {
    throw new Error(
      `兄弟，你正在给a这个属性重新赋值，你所赋的值是${val}，但是，这个属性是不能赋值，你再考虑考虑`
    );
  }, // 设置器 setter
  enumerable: true,
  configurable: true,
});

console.log(obj.a);
obj.a = "abx";
// console.log(obj.a); // console.log(get())
```

:::

## 七、[Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)

`Object.getOwnPropertyDescriptor()` 方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
