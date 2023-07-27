# javaScript

## 1. 将一个字符串变成数字

:::tip
js 中有`~`是按位取反运算,`~~` 用来作双非按位取反运算，
`~~` 的作用**是去掉小数部分,对于正数，向下取整；对于负数，向上取整**；与 Math.floor()不同的是，它只是**单纯的去掉小数部分，不论正负都不会改变整数部分**

**非数字取值为 0，true:1,false:0**
:::
:::details 骚操作

```js
let str = "2";
console.log(~~str); //2
```

:::

## 2. flat 数组扁平化

:::details 常规操作

```js
let arr = [1, [2, [3, 4，5]]];
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flatten(arr))// [1, 2, 3, 4，5]
```

:::

:::tip flat()
`arr.flat ( [depth] )` 其中 depth 是 flat 的参数，depth 是可以传递数组的展开深度（**默认不填、数值是 1）**，即展开一层数组。如果层数不确定，参数可以传进 **Infinity，代表不论多少层都要展开：**
:::

:::details flat

```js
let arr = [1, [2, [3, 4, 5]]];
console.log(arr.flat(Infinity)); // [1, 2, 3, 4，5]
```

:::

## 3. 拓展运算符的应用

**3.1 注意 set 数据结构**
:::details 数组去重

```js {2，3，4}
let arr = [3, 5, 2, 2, 5, 5];
let setArr = new Set(arr); // 返回set数据结构Set(3) {3, 5, 2}
let setArr1 = new Set([...arr]); //  返回set数据结构Set(3) {3, 5, 2}
let setArr1 = [...new Set(arr)]; // 返回数组 [3,5,2]
//方法一 es6的...解构
let unique1 = [...setArr]; //去重转数组后 [3,5,2]
//方法二 Array.from()解析类数组为数组
let unique2 = Array.from(setArr); //去重转数组后 [3,5,2]
```

:::
**3.2 字符串去重**
:::details 字符串去重

```js
let str = "352255";
let unique = [...new Set(str)].join(""); // 352
```

:::

**3.3 实现并集、交集、差集**
:::details

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}
// 交集
let intersect = new Set([...a].filter((x) => b.has(x))); // set {2, 3}
// （a 相对于 b 的）差集
let difference = new Set([...a].filter((x) => !b.has(x))); // Set {1}
```

:::
**3.4 将伪数组转化为数组**
:::details

```js
//伪数组转换为数组
var nodeList = document.querySelectorAll("div");
console.log([...nodeList]); // [div, div, div ... ]
```

:::

## 4. js 丝滑的操作样式（5 种方式）

**4.1 操作元素节点上的 style 属性**
:::details cssText 批量赋值

```js
// 多个单词使用驼峰
el.style.backgroundColor = "red";
el.stvle.fontSize = "1Opx";

// style.cssText 批量赋值
el.style.cssText ="background-color： green; font-size: 40px;
// 会把原有的cssText清掉，比如原来的style中有`display:none; `，那么执行完上面的JS后，display就被删掉了。
// 为了解决这个问题，可以采用cssText累加的方法：
el.style.cssText += "width:100px;height:100px;top:100px;left:100px;"
```

:::
**4.2 `classList` 切换样式**

可预先定义好 class 类名的样式，后面只需添加 class 即可达到切换样式的需求
:::details

```js
// 切换 class，对应元素有此 class 则为删除，没有则为添加，第二个参数如果为 true，则单纯为添加类名
el.classList.toggle("className", true);
// 添加类名
el.classList.add("aa", "bb");
// 等同于
// el.className = "aa bb ";
// 移除类名
el.classList.remove("aa", "bb");
```

:::

**4.3 操作 style 节点内容**

:::details

```html {11,19,26}
<body>
  <style id="sty">
    .box {
      color: green;
    }
  </style>
  <button id="btn">变色</button>
  <div class="box">内容</div>

  <script>
    <!-- style 本质上还是节点，可直接操作替换其内容 -->
    btn.addEventListener("click", () => {
      // 内容由绿色变为粉色
      sty.textContent = sty.textContent.replace(
        "color: green;",
        "color: pink;"
      );
    });
    <!-- 操作已有 style 节点 -->
    btn.addEventListener("click", () => {
      const styleSheets = Array.from(document.styleSheets);

      // 找到对应的style标签
      const sty = styleSheets.find((item) => item.ownerNode.id === "sty");

      // 选过选择器找到对应的 rule
      const rule = Array.from(sty.rules).find(
        (rule) => rule.selectorText === ".box"
      );

      const styleMap = rule.styleMap;

      styleMap.set("background-color", "pink");
    });
    <!-- 操作外部样式 -->
    btn.addEventListener("click", () => {
      const styleSheets = Array.from(document.styleSheets);
      const sty = styleSheets.find((s) => s.href.endsWith("index.css"));
      const rule = Array.from(sty.rules).find(
        (rule) => rule.selectorText === ".box"
      );
      const styleMap = rule.styleMap;
      styleMap.set("background-color", "orange");
    });
  </script>
</body>
```

:::

**4.4 动态创建 link 节点引入样式**
:::details

```js
function importCssByUrl(url) {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}
```

:::

**4.5 `window.getComputeStyle`**

- 返回一个对象，包含元素计算之后的 css 属性值
- 语法：`window.getComputedStyle(element, [pseudoElt])` **pseudoElt 参数可以让它查询伪元素**
- **注意此方式获取的是最终计算之后的样式值，而且会引起回流**

:::details

```html {14}
<body>
  <div class="box">云牧</div>
  <style>
    .box:before {
      content: "你好";
      font-size: 1.6rem;
    }
  </style>
  <script>
    const styleDeclaration = window.getComputedStyle(
      document.querySelector(".box"),
      "before"
    );
    console.log(styleDeclaration.content, styleDeclaration.fontSize); //"你好" 25.6px
  </script>
</body>
```

:::

## 6. structuredClone() 方法使用`结构化克隆算法`将给定的值进行`深拷贝`。

> https://mp.weixin.qq.com/s/dLvyW_xmT3PAZ6ZrkrvYjA

> mdn : https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone

## 7. 循环中使用定时器

:::details

### 1.第一种方式

```js
for (var i = 0; i <= 5; i++) {
  console.log(i); // 0，1，2，3，4，5
  // 1. 在 6次 循环中，推入任务队列中 6个 定时任务，在 1s 内全部执行完毕了
  // 2. performance.now() 大小基本相同，瞬间执行完 0-5 次循环推入的 6 个定时器，都在 1s 内执行完
  setTimeout(() => {
    console.log(performance.now());
    // i 为全局最终值 6，虽然在循环时引用到定义的 i，但是这个 i 是全局的
    // 所以在 定时器执行时(同步代码执行完毕后) 这个 i 已经变为 6 了，输出6
    console.log(i); // 1s 输出 6个6
  }, 1000);
}
console.log(i); // 6
```

### 2.第二种方式

```js
for (var i = 0; i <= 5; i++) {
  console.log(i); // 0，1，2，3，4，5
  // 1. 间隔 1s 推入任务队列中一个定时任务， 0s,1s,2s,3s,4s,5s。
  // 2. 依次为 st(fn,0s)，st(fn,1s)，st(fn,2s)，st(fn,3s)，st(fn,4s),st(fn,5s),st(fn,6s),
  // 3. performance.now() 大小相差大概 1s，因为在 0-5 次循环推入的 6个定时器， 定时间隔为 1s
  setTimeout(() => {
    console.log(performance.now());
    console.log(i); // i 为全局最终值 6，每隔 1s 输出 1个 6
  }, i * 1000);
}
console.log(i);
```

:::

## 8. 监听中文输入开始和结束

1. `compositionstart`: 当用户使用拼音输入法开始输入汉字拼音时，这个事件就会被触发。
2. `compositionupdate`: 拼音输入法，输入中触发
3. `compositionend`: 拼音输入法，输入结束触发

:::details 例子

```vue
<template>
  <input
    type="text"
    v-model="demo"
    @compositionstart="compositionstart"
    @compositionupdate="compositionupdate"
    @compositionend="compositionend"
  />
  <!--  elelment元素上需要 ➕ 修饰符 native -->
  <el-input
    @compositionstart.native="compositionstart"
    @compositionupdate.native="compositionupdate"
    @compositionend.native="compositionend"
    v-model="demo"
  />
</template>

<script setup>
import {ref} from 'vue'
const demo= ref('')
compositionend(e) {
  console.log("end", e.target.value);
},
compositionstart(e) {
  console.log("start", e.target.value);
},
compositionupdate(e) {
  console.log("update", e.target.value);
},
</script>
```

:::

## 9. 哪些事件无法进行冒泡

- ui 事件：`load、unload、scroll、resize`；
- 鼠标移动事件：`mouseenter、mouseleave`;
- 焦点事件：`blur、focus`
