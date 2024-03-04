# 杂七杂八系列一

<script setup>
import BgFollowImg from './components/bgFollowImg.vue'

</script>

## 1. 跟随图片变化的背景色

通过 cdn 引入第三方包的方式，在打包时因为 ESM 不支持，所以需要将文件下载下来引入

<BgFollowImg/>

:::tip

1. 通过 cdn 引入 `colorThief`，`import "https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.4.0/color-thief.min.js"`

   - 或者 `npm i colorthief `

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

### 图标库

[Iconify](https://iconify.design/) 一个统一的图标框架，它通过单个 CDN 条目和按需加载提供来自 80 多个流行图标集的 6,000 多个图标。

### Iconify 使用

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

### VS Code 插件

Iconify IntelliSense（加载图标数据并按需缓存它们，它将 svgs 编码为数据 url，以便在 VS Code 中显示为图像。）

### unplugin-icons 插件相关

- [unplugin-icons - npm 网站](https://www.npmjs.com/package/unplugin-icons)

- [unplugin-icons 按需访问数千个图标作为组件](https://blog.csdn.net/CRMEB/article/details/123245221)

- [unjs/unplugin - Vite、Rollup、Webpack 等的统一插件系统](https://github.com/unjs/unplugin)

- [unplugin-vue-components - 按需组件自动导入](https://github.com/unplugin/unplugin-vue-components)

* [unplugin-auto-import - 按需自动导入 API](https://github.com/unplugin/unplugin-auto-import)

* [更多请查看...](https://antfu.me/posts/journey-with-icons-continues)
