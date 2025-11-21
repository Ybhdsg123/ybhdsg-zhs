# 系列一 —— 杂七杂八

<script setup>
import BgFollowImg from './components/bgFollowImg.vue'

</script>

## 1. 跟随图片变化的背景色

通过 cdn 引入第三方包的方式，在打包时因为 ESM 不支持，所以需要将文件下载下来引入

<BgFollowImg/>

:::tip

1. 通过 cdn 引入 `colorThief`，`import "https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.4.0/color-thief.min.js"`

   - 或者 `npm i colorthief`

2. 通过 `https://picsum.photos` 网址获取随机图片，通过 `colorThief` 获取颜色的话会有**跨域污染（因为里面使用了 canvas，会污染画布）**，在`img`标签上设置
   `crossorigin="anonymous"`解决

3. `colorThief`使用

```js
//创建一个 ColorThief 的实例对象
const colorThief = new ColorThief();

// 1. 得到图片的调色盘（只得到前三种主要颜色）
const colors = await colorThief.getPalette(e.target, 3);

// 2. 只得到主要颜色
const mainColor = await colorThief.getColor(e.target);
```

:::

## 2. [纯 CSS 图标 (Anthony Fu 系列文章)](https://antfu.me/posts/icons-in-pure-css-zh)

### 2.1 图标库

[Iconify](https://iconify.design/) 一个统一的图标框架，它通过单个 CDN 条目和按需加载提供来自 80 多个流行图标集的 6,000 多个图标。

### 2.2 Iconify 使用

```js
<!--Import Framework 引入-->
<script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>

```

```js
<!--Use an icon from Font Awesome 使用-->
<span class="iconify" data-icon="fa:home"></span>

<!--Use another icon from Material Design Icons-->
<span class="iconify" data-icon="mdi:flask"></span>

```

### 2.3 VS Code 插件

Iconify IntelliSense（加载图标数据并按需缓存它们，它将 svgs 编码为数据 url，以便在 VS Code 中显示为图像。）

### 2.4 -icons 插件相关

- [unplugin-icons - npm 网站](https://www.npmjs.com/package/unplugin-icons)

- [unplugin-icons 按需访问数千个图标作为组件](https://blog.csdn.net/CRMEB/article/details/123245221)

- [unjs/unplugin - Vite、Rollup、Webpack 等的统一插件系统](https://github.com/unjs/unplugin)

- [unplugin-vue-components - 按需组件自动导入](https://github.com/unplugin/unplugin-vue-components)

- [unplugin-auto-import - 按需自动导入 API](https://github.com/unplugin/unplugin-auto-import)

- [更多请查看...](https://antfu.me/posts/journey-with-icons-continues)

## 3. vue中img标签引入图片时，需要使用`require('图片地址')`

```html
:src="require('@/assets/images/hotel/zsr.png')"
```

## 4. Array.includes() 在进行比较时使用的是强等于（===）比较

## 5. MD5 加密文件和使用

### 5.1 文件地址：`./utils/md5.js`

### 5.2 使用方法

```js
import md5 from './utils/md5.js'
const token = hex_md5('dvjhkl1234567890');
```

## 6. 如何中断`forEach`

### 6.1 理解`forEach`

- `JavaScript` 中的 `forEach` 方法用于遍历数组。**它对数组中的每个元素执行一次回调函数**。然而，与传统的 `for` 或 `while` 循环不同，`forEach` 被设计为在没有内置机制的情况下，为每个元素执行函数，**无法提前停止或中断循环**。

### 6.2 使用 `break` 中断`forEach`

- 如果尝试在 `forEach` 中使用 `break`，你会遇到语法错误，**因为 `break` 在回调函数内不适用**

```js
const numbers = [1, 2, 3, 4, 5];  
numbers.forEach(number => {  
    if (number > 3) {  
        break; // Syntax Error: Illegal break statement  
    }  
    console.log(number);  
});
```

### 6.3 使用 `return` 中断`forEach`

- 在`forEach` 中，`return` 并不能中断循环。相反，**它仅仅退出当前回调函数的迭代，然后继续处理数组中的下一个元素**。

```js {6}
const numbers = [1, 2, 3, 4, 5];  
numbers.forEach(number => {  
    if (number === 3) {  
        return; // Exits only the current iteration  
    }  
    console.log(number);  // 1,2,4,5
});

```

### 6.4 使用异常中断 `forEach` 循环

- 通过抛出异常技术上可以中断 `forEach` 循环。**通常不建议使用**，因为它对代码的可读性和错误处理有影响，但它可以有效地停止循环。。

```js {10}
const numbers = [1, 2, 3, 4, 5];  
try {  
    numbers.forEach(number => {  
        if (number > 3) {  
            throw new Error('Loop stopped');  
        }  
        console.log(number);  
     });  
} catch (e) {  
    console.log('Loop was stopped due to an exception.');  
}  
// Output: 1, 2, 3, Loop was stopped due to an exception.

```

## 7. 打开新页签(防止恶意网站重定向你的网站地址)

- 如果要打开外链，建议将 `rel`设置为 `noopener noreferrer`，避免一些恶意网站通过 `window.opener.location` 重定向你的网站地址。`window.open` 方法同理。
- [相关文章链接](https://www.cnblogs.com/never404/p/15723254.html)

```js
// 高版本浏览器 rel 默认为 noopener，不过建议显示设置，兼容低版本。
<a target="_blank" rel="noopener noreferrer">...</a>

// window.open rel 默认为 opener，需要自己设置
window.open('https://baidu.com', 'baidu', 'noopener,noreferrer')

// 以下有安全漏洞，打开的新页签可以通过 window.opener.location 重定向你的网站
<a target="_blank" rel="opener">...</a>
window.opener.location = 'http://fake.website.here';

```

## 8. [version-rocket](https://github.com/guMcrey/version-rocket/blob/main/README.zh-CN.md#%E5%AE%89%E8%A3%85) 一个用于 web 应用版本检测和部署通知的工具库。

::: tip

1. 看官网操作步骤直接设置好就ok了，打包时后面加上 `set EXTERNAL=some text && generate-version-file`
2. 本地测试的话，可以直接在 `public` 目录下放一个 `version.json` 文件，写上`version`，字段，然后和`package.json` 中的`version`比较，不同就会提示更新，
    **注意：** 放到服务端时，本地文件最好删除`version.json` 文件，因为`generate-version-file`已经自动生成了，除非你有自定义的东西
3. 主要代码，只加下方代码后，打包就可有版本更新
```js
/** 1. package.json */

{
  ...
  "scripts": {
    "dev": "vite",
    // 1. set EXTERNAL=some text 设置提示信息 用于 onVersionUpdate 自定义 UI 时
    // 2. generate-version-file 生成 version.json 文件，version 默认取 package.json 的 version 字段
    "build": "vite build && set EXTERNAL=some text && generate-version-file",
    "test": "vite build --mode test && set EXTERNAL=some text && generate-version-file",
    "preview": "vite preview"
  },
  ....
}

/** 2. App.vue */
// 版本更新  https://github.com/guMcrey/version-rocket?tab=readme-ov-file
import { checkVersion } from "version-rocket";
// 推荐使用 package.json 中的 version 字段, 也可自定义 version
import { version, name } from "../package.json";

onBeforeMount(() => {
  // 在生命周期钩子中调用 checkVersion
  const { VITE_NODE_ENV } = import.meta.env;
  if (VITE_NODE_ENV === "production") {
    checkVersion(
      // config
      {
        // 5分钟检测一次版本
        pollingTime: 300000,
        localPackageVersion: version,
        originVersionFileUrl: `${location.origin}/version.json`,
        immediate: true,
      },
      // options
      {
        title: name,
        description: "检测到新版本",
        buttonText: "立即更新",
      }
    );
  }
});

```
:::

## 9. 访问本地文件

### 9.1 使用 本地地址 访问文件内容

可以直接访问  `[本地地址][[文件名]` 来访问，比如`http://localhost:8080/version.json` 访问 version.json文件

### 9.2 方法来访问 

```js
function fetchData(path) {
  fetch(path)
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "data");
    })
    .catch((error) => {
      console.error("Error fetching JSON data:", error);
    });
}
```

## 10. html快速调试样式快捷键 `Shift + Command/ctrl + C`

