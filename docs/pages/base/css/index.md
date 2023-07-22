# css

**Flexbox 布局最适合应用程序的组件和小规模布局（一维布局），而 Grid 布局则适用于更大规模的布局（二维布局）**

[Grid 布局链接](https://www.zhangxinxu.com/wordpress/2018/11/display-grid-css-css3/)：Grid 布局中，`float`，`display:inline-block`，`display:table-cell`，`vertical-align`以及`column-*`这些**属性和声明对 grid 子项是没有任何作用的**。面试经常会问的，一定要记得。

[Flexbox 布局链接](https://www.zhangxinxu.com/wordpress/2018/10/display-flex-css3-css/)：**flex 子元素**的设置 ` float``，clear ` 以及 `vertical-align` 属性都是没有用的。

## 1. 网站置灰

:::tip

```css
html.gray-mode {
  filter: grayscale(0.95);
  -webkit-filter: grayscale(0.95);
}
```

:::

:::details 更多颜色

```js
blur 模糊: -webkit-filter:blur(2px);

brightness 亮度: -webkit-filter:brightness(25%);

contrast 对比度: -webkit-filter: contrast(50%);

drop-shadow 阴影: -webkit-filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5));

opacity 透明度: -webkit-filter: opacity(50%);

grayscale 灰度: -webkit-filter: grayscale(80%);

sepia 褐色: -webkit-filter: sepia(100%);

invert 反色: -webkit-filter: invert(100%);

hue-rotate 色相旋转: -webkit-filter:hue-rotate(180deg);

saturate 饱和度: -webkit-filter: saturate(1000%);
```

:::

## 2. [css 的层/堆叠上下文](https://juejin.cn/post/7230460443189084197)

> **从底层到顶层顺序：** 背景图/边框 ==> `z-index` 为**负数** ==> 块级元素 ==> `float` 元素 ==> 行内元素 ==> **z-index= 1 / auto** ==> `z-index` 为**正数**

## 3. [css 新建图层](https://juejin.cn/post/7051926604666109988#heading-1)

:::details 产生新图层的原因

- 根元素
- 有 z-index 是负值的子元素
- 有 3D 转换
- position：fixed
- 与其他元素可能重叠
- will-change 样式的值为 opacity、transform、transform-style、perspective、filter、backdrop-filter 这 6 个之一
  :::

## 4. 多行省略

```css
/* 用来限制在一个块元素显示的文本的行数 */
-webkit-line-clamp: 2;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
```

## 5. 滚动条样式改变

```css
// 修改滚动条样式 大小
&::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
// 滚动条样式
&::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #888;
}
// 轨道
&::-webkit-scrollbar-track {
  border-radius: 10px;
  /*滚动条里面轨道*/
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}
```

## 6. `scss`定义方法，并在`vite`下注册全局可用

:::details utils.scss

```scss
@use "sass:math";
// 默认设计稿的宽度
$designWidth: 1920;
// 默认设计稿的高度
$designHeight: 1080;

// px 转为 vw 的函数
@function vw($px) {
  @return math.div($px, $designWidth) * 100vw;
}

// px 转为 vh 的函数
@function vh($px) {
  @return math.div($px, $designHeight) * 100vh;
}
```

:::

:::details 在`vite.config.js`下定义使用的方法

```js
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [vue()],
    css: {
      // 指定传递给 CSS 预处理器的选项。文件扩展名用作选项的键
      preprocessorOptions: {
        scss: {
          // 为每个样式内容注入额外代码
          additionalData: `@import "@/styles/utils.scss";`,
        },
      },
    },
  });
};
```

:::
