<script setup>
  import LinearGradient from './components/LinearGradient.vue'
  import RadialGradient from './components/RadialGradient.vue'
  // import ConicGradient from './components/ConicGradient.vue'
</script>

css 渐变函数用于创建一个表示两种或多种颜色线性渐变的图片。其结果属于`<gradient>`数据类型，**是一种特别的`<image>`数据类型。**

## 1. `linear-gradient` 线性渐变

:::tip `linear-gradient`(角度，颜色 占比，颜色 占比，)

1. 角度：`to top(0deg)`，从下往上，如果是`45deg`，**想象为在 Y 轴上下各有一个点，在 `45deg` 时，Y 轴上方的点带着 `0deg` 时那个背景色绕 Y 轴 顺时针旋转了 `45deg`，旋转角度为`0deg`与 Y 轴的的角度**（自己理解）
2. 渐变到的范围：`linear-gradient()`如果所有点和长度都使用固定单位（而不是相对于 background-size 的值指定的百分比或关键字），则渐变背景不受 `background-size` 的影响;
3. 渐变位置：` background-position`可以在重复时定义每个渐变的位置;
4. 渐变的颜色可以是透明色；
5. 渐变可以是从一种颜色直接到另外一种颜色，不需要有过渡状态；
6. 渐变是可以叠加多层的；
7. 利用 `repeating-linear-gradient` 节省代码，实现片段的重复。

::::

<LinearGradient/>

## 2. `radial-gradient` 径向渐变

> https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/radial-gradient

:::tip

1. 语法

```js
/* 在容器中心的渐变，从红色开始，变成蓝色，最后变成绿色 */
radial-gradient(circle at center, red 0, blue, green 100%)
```

2. `drop-shadow(偏移距离，阴影的模糊半径，阴影的扩展半径，颜色)`

```css
filter: drop-shadow(-7px 4px 3px #333);
```

:::

<RadialGradient/>

## 3. `conic-gradient`角向渐变

::: tip 注意点

1. 起始点是图形中心；
2. 默认渐变角度 0deg 是从上方垂直于圆心的；
3. 渐变方向以顺时针方向绕中心实现。
4. 改变起始点和渐变角度： `background: conic-gradient(from 270deg at 50px 50px, deeppink, yellowgreen);`，改变圆心为`50px 50px`，角度为 `270deg`
5. **先定义的颜色层叠在后定义的颜色上**

- 0 ～ 30% 的区间使用 red
- 0 ～ 60% 的区间使用 green
- 0 ～ 100% 的区间使用 blue
- 这里也可以使用角度

```css
.demo {
  background: conic-gradient(red 0 30%, green 0 60%, blue 0 100%);
}
```

:::

:::details hsl() 色相(h)，饱和度(s)，亮度(l)

1. 色相(h)：就是颜色
2. 饱和度(s)：指色彩的纯度，越高色彩越纯，越低颜色变灰，取值 0-100%
3. 明度(v)，亮度(l)：取值 0-100%

:::

<!-- <ConicGradient/> -->
