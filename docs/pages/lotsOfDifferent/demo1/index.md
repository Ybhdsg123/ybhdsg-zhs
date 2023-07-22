# 杂七杂八系列一

<script setup>
import BgFollowImg from './components/bgFollowImg.vue'

</script>

## 1. 跟随图片变化的背景色

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
