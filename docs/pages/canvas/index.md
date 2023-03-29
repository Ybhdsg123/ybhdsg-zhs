# canvas

<script setup>
  import CanvasDemo from './components/canvasDemo.vue'
</script>

## 一、基础知识（详细版本看大神的)

[案例+图解带你一文读懂 Canvas🔥🔥](https://juejin.cn/post/7119495608938790942)

[二次贝塞尔曲线工具网站](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/quadratic-curve.html)

[三次贝塞尔曲线工具网站](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/bezier-curve.html)

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

<CanvasDemo></CanvasDemo>

## 1. 绘制直线和三角形

:::tip

1. `moveTo(x,y)`: <my-text text=" 设置初始位置"/>，参数为**初始位置**`x`和`y`的坐标点
2. `lineTo(x,y)`: <my-text text=" 绘制一条从初始位置到指定位置的直线"/>，参数为**指定位置**`x`和`y`的坐标点
3. `stroke()`: <my-text text=" 通过线条来绘制图形轮廓"/>

:::

## 2. 矩形

:::tip

> x 和 y 是矩形的起点坐标，width 和 height 是矩形的宽高

1. `strokeRect(x, y, width, height)` 绘制一个矩形的边框
2. `fillRect(x, y, width, height)` 绘制一个填充的矩形
3. `clearRect(x, y, width, height)` 清除指定矩形区域，让清除部分完全透明。

:::

## 3. 圆弧和圆

:::tip 圆

1. `arc(x, y, radius, startAngle, endAngle, anticlockwise)`。x 和 Y 为圆心的坐标，radius 为半径，startAngle 为圆弧或圆的开始位置，endAngle 为圆弧或圆的结束位置，anticlockwise 是绘制的方向（不写默认为 false，从顺时针方向）。

2. 在画弧的时候，**arc()函数中角的单位是弧度而不是角度**。角度换算为弧度的表达式为：<my-text text="弧度=(Math.PI/180)*角度。"/>

:::

:::info 椭圆

1. `ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)`

- x、y：椭圆的圆心位置
- radiusX、radiusY：x 轴和 y 轴的半径
- rotation：椭圆的旋转角度，以弧度表示
- startAngle：开始绘制点
- endAngle：结束绘制点
- anticlockwise：绘制的方向（默认顺时针），可选参数。

:::

## 4. 开启路径（beginPath），闭合路径（closePath()）

:::tip

1. 新建一条路径，生成之后，图形绘制命令被指向到路径上。

2. 闭合路径之后图形绘制命令又重新指向到上下文中，**关闭路径其实并不是必须的，对于新路径其实每次都开启新路径就 ok。**

:::

## 5. fill

:::tip

1. `stroke`方法是通过线条来绘制图形轮廓，
2. `fill`方法则是通过填充路径的内容区域生成实心的图形。

:::

## 6. 贝塞尔曲线

::: tip

**二次贝塞尔曲线**

1. `quadraticCurveTo(cp1x, cp1y, x, y)`，其中 cp1x 和 cp1y 为一个控制点，x 和 y 为结束点。

**三次贝塞尔曲线**

2. `ctx.bezierCurveTo(cp1x,cp1y, cp2x,cp2y, x, y)`，其中 cp1x 和 cp1y 为一个控制点，cp2x 和 cp2y 为第二个控制点，x 和 y 为结束点。

:::

## 三、 绘制样式

## 1. 线条的样式

:::tip

1. `lineWidth` 设置当前绘线的粗细。属性值必须为正数。默认值是 1.0。
2. `lineCap` 设置线段端点显示的样子。可选值为：butt，round 和 square。默认是 butt。
3. `lineJoin` 该属性可以设置两线段连接处所显示的样子。可选值为：round, bevel 和 miter。默认是 miter。
4. `miterLimit` 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
   线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数级增大。
   如果交点距离大于 miterLimit 值，连接效果会变成了 lineJoin = bevel 的效果。
5. `setLineDash` 可以设置当前虚线样式。<my-text text="设置奇数，setLineDash 会复制一份数组补全为偶数"/>
6. `getLineDash` 则是返回当前虚线设置的样式，长度为非负偶数的数组。
7. `lineDashOffset` 设置虚线样式的起始偏移量。

:::
