# canvas

<script setup>
  import CanvasDemo from './components/canvasDemo.vue'
</script>

## 一、基础知识

## 1. 基础知识

```html
<body>
  <canvas id="canvas" width="200" height="200">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
</body>
<script>
  // 获取 canvas 元素
  const canvasDom = document.getElementById("canvas");
  // 通过判断getContext方法是否存在来判断浏览器的支持性
  if (canvasDom.getContext) {
    // 获取绘图上下文
    var ctx = canvas.getContext("2d");
  }
</script>
```

:::tip

- 1. `Canvas`标签的默认大小为：`300 x 150 (像素)`，而这里咱们设置为了：`200 x 200（像素）`。

- 2. `Canvas`标签中的文字：`不支持Canvas`：浏览器会忽略容器而显示其中的内容，`支持Canvas`：忽略包含的内容渲染 Canvas 标签:::

- 3. Canvas 标签起初只是创造了一个固定大小的画布，它公开了一个或多个渲染上下文，通过 `getContext()` 可以获得渲染上下文和绘画功能

:::

:::details `getContext()`可能的接收参数

- 1. `2d`：建立一个二维渲染上下文。这种情况可以用 `CanvasRenderingContext2D()`来替换 getContext('2d')。
- 2. `webgl`（或 `experimental-webgl`）： 创建一个 WebGLRenderingContext 三维渲染上下文对象。只在实现 WebGL 版本 1(OpenGL ES 2.0)的浏览器上可用。
- 3. `webgl2`（或 `experimental-webgl2`）：创建一个 WebGL2RenderingContext 三维渲染上下文对象。只在实现 WebGL 版本 2 (OpenGL ES 3.0)的浏览器上可用。
- 4. `bitmaprenderer`：创建一个只提供将 canvas 内容替换为指定 ImageBitmap 功能的 ImageBitmapRenderingContext。

:::

## 二、绘制形状

## 1. 绘制直线和三角形

:::tip 直线

1. `moveTo(x,y)`: <my-text text=" 设置初始位置"/>，参数为**初始位置**`x`和`y`的坐标点
2. `lineTo(x,y)`: <my-text text=" 绘制一条从初始位置到指定位置的直线"/>，参数为**指定位置**`x`和`y`的坐标点
3. `stroke()`: <my-text text=" 通过线条来绘制图形轮廓"/>

:::

<CanvasDemo></CanvasDemo>
