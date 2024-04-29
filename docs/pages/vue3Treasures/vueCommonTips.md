# vue 常见技巧

## 1. css 属性选择器示例

> 页面上 “属性选择器”这几个字显示红色

:::details

```js
// 页面上 “属性选择器”这几个字显示红色
 <div data-v-hash class="test-attr">属性选择器</div>
  <style>
    /* 该标签有个data-v-hash的属性，只不过该属性为空，依然可以使用属性选择器 */
   .test-attr[data-v-hash] {
    color: red;
  }
  </style>
  <script>
     // 通过js判断是否存在 data-v-hash 属性
     console.log(document.querySelector('.test-attr').getAttribute('data-v-hash') === ''); // true
  </script>
```

:::

## 2. [CSS 中的 v-bind()](https://cn.vuejs.org/api/sfc-css-features.html#v-bind-in-css)

:::details

```vue
<script setup>
import { ref } from "vue";
const theme = ref("red");
const colors = ["blue", "yellow", "red", "green"];
setInterval(() => {
  theme.value = colors[Math.floor(Math.random() * 4)];
}, 1000);
</script>
<template>
  <p>hello</p>
</template>
<style scoped>
/* Modify the code to bind the dynamic color */
p {
  color: v-bind("theme");
}
</style>
```

:::

## 3. 动态路由树结构数据，遍历得到想要的结果

**第一种：改变 hidden，并且将不需要的转换为 404，防止地址栏找到（不推荐）**
这样，所有的路由信息都会在里面，只不过没有权限的路由 path 变为 '/404'
:::details

```js
/**
 * @description: 根据设置的权限路由标识来筛选出权限角色的路由
 * @param {Array} routers :所有的路由信息数组
 * @param {Arrray} permissionRoutingMarking :路由权限标识 需要添加 '/layout'
 * @return 改变hidden或者修改path达到效果
 * @Author: zhs
 */
export const recursionRouter = (routers, permissionRoutingMarking = []) => {
  if (routers.children && routers.children.length <= 0) return;
  if (permissionRoutingMarking.length <= 0) return routers;
  const resultRouter = routers.map((obj, index) => {
    // 在 权限路由标识 数组中找不到的话就将其隐藏
    if (!permissionRoutingMarking.includes(obj.path)) {
      obj.meta.hidden = false;
      // 通过地址栏找不到该页面，不需要注释掉就行
      if (obj.path !== "/layout") obj.path = "/404";
    } else {
      obj.meta.hidden = true;
    }
    // 有 chilren 就会递归遍历里面的数据
    obj.children && recursionRouter(obj.children, permissionRoutingMarking);
    return obj;
  });
  return resultRouter;
};
```

:::

**第二种：直接过滤出符合角色权限的路由数据（推荐）**
:::details

```js
/**
 * @description: 返回角色权限路由
 * @param {*} routers :所有的路由信息数组
 * @param {*} permissionRoutingMarking :路由权限标识 需要添加 '/layout'
 * @return 只返回该角色有的路由信息
 * @Author: zhs
 */
export const getRoleRouters = (routers, permissionRoutingMarking = []) => {
  if (routers.children && routers.children.length <= 0) return;
  if (permissionRoutingMarking.length <= 0) return routers;

  return routers.filter((obj) => {
    // 将由children的数据递归处理，找到有该权限的数据，并重新赋值给 obj.children
    if (obj.children) {
      obj.children = getRoleRouters(obj.children, permissionRoutingMarking);
    }
    // 筛选出该权限路由（这里是在权限标识中找到当前的 obj.path）
    if (permissionRoutingMarking.includes(obj.path)) {
      // 防止本地路由设置为false后，侧边栏不现实，将 hidden 设置为true
      obj.meta.hidden = true;
      return true;
    }
  });
};
```

:::

## 4. vue 禁止复制 禁用右键

:::details

```vue
<script setup>
import { onMounted } from "vue";
onMounted(() => {
  // 禁用复制
  document.onselectstart = new Function("event.returnValue=false");
  // 禁用右键
  document.oncontextmenu = new Function("event.returnValue=false");
});
</script>
```

:::

## 5. 获取 app 文件的包名

[github 插件地址](https://github.com/chenquincy/app-info-parser)

## 6. 通过 `customRef()` 创建一个防抖的 ref(官网例子)

:::details useDebouncedRef

```js
import { customRef } from "vue";

export function useDebouncedRef(value, delay = 200) {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}
```

:::

::: details 使用

```vue
<script setup>
import { useDebouncedRef } from "./***/useDebouncedRef.js";
const text = useDebouncedRef("cehsi");
</script>
<template>
  <input v-model="text" />
</template>
```

:::

## 7. 在 `vue` 中使用 `xlsx-populate`库加密`excel`文件，并且开启 `new worker()`

### 7.1 下载 `xlsx-populate`，这是一个 `node`的库

- `js  npm i -D xlsx-populate `

:::details nodejs 版本

```js
// 导入 xlsx-populate 库
const XlsxPopulate = require("xlsx-populate");
XlsxPopulate.fromBlankAsync().then((workbook) => {
  // 写入内容
  workbook.sheet("Sheet1").cell("A1").value("Some  text");
  // 写入 /test.xlsx 文件 并加密
  return workbook.toFileAsync("./test.xlsx", { password: "$secret_password" });
});
```

:::

:::details 浏览器版本 https://github.com/dtjohnson/xlsx-populate

```js
// 下载  pnpm i xlsx-populate -D
import XlsxPopulate from "xlsx-populate"; // 导入
// 加密文件 file 获取后端请求的excel文件为二进制，设置 { responseType: "blob" }
const worksheets = await XlsxPopulate.fromDataAsync(file);
// 也可以这么写入文件，一个单元格一个单元格的写
// workbook.sheet("Sheet1").cell("A1").value("Some  text");

// 对文件进行加密
const workbook = await worksheets.outputAsync({
  password: "$secret_password", // 密码
});
// downloadExcel下载方法 挂载 a 元素下载
this.downloadExcel(workbook, "导出文件"); // 导出excel
```

:::

### 7.2 在 `vue` 中使用 `new worker()`，

- 1. 需要通过 `worker-loader`配置，配置了之后 worker.js 后缀的文件就会被 loader 处理，但我没整好

- 2. **我采用的方法**：直接把`demo.worker.js`文件放到目录`public`下了，这样就不会报各种奇怪问题，最简单直接

### 7.3 下载加密的`excel`

:::details 主线程

```js
let worker
async workerDemo(file, ps) {
      return new Promise((resolve, reject) => {
        // 实例化一个主线程，地址为 public 下的 demo.worker.js
        worker = new Worker("demo.worker.js");
        // 发送信息
        worker.postMessage({ file });
        // 接受信息
        worker.onmessage = (e) => {
          const { workbook } = e.data;
          // 异步的话感觉时间和正常加密差不多，不懂
          resolve(workbook);
          // 同步，直接在这就下载了，
          // this.downloadExcel(workbook, "导出文件"); // 导出excel
        };
      });
},
async quitExport() {
      // 请求获取文件的二进制数据
      const file = await this.$http.exportExcel(url,data {
        responseType: "blob",
      });
      const t0 = window.performance.now();
      // 调用 workerDemo 并且传入 file
      const workbook = await this.workerDemo(file);
      // 立即终止 Worker 的行为
      worker.terminate()
      // downloadExcel()方法，看 工具函数/文件相关
      this.downloadExcel(workbook, "导出文件"); // 导出excel
      const t1 = window.performance.now();
      console.log(" 函数执行了" + (t1 - t0) + "毫秒。");
},

```

:::

:::details 子线程

```js
// self 和 this 是一样的，代表子进程的全局对象
// 引入 xlsx-populate 库的cdn文件
self.importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx-populate/1.21.0/xlsx-populate.min.js"
);
// 接受信息
self.onmessage = async (e) => {
  const { file } = e.data;
  if (!file) {
    // 关闭进程
    self.close();
  } else {
    // 处理传入的 file 文件对象
    const worksheets = await XlsxPopulate.fromDataAsync(file);
    // 进行加密处理
    const workbook = await worksheets.outputAsync({
      password: "123", //  密码
    });
    // 向父进程传输数据
    self.postMessage({ workbook });
    // 关闭进程
    self.close();
  }
};
```

:::

