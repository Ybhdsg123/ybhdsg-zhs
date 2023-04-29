# canvas 的小 demo

<script setup>
import SmallBalls from './components/smallBalls.vue'
// import Fireworks from './components/fireworks.vue'
import SaveImgCanvas from './components/saveImgCanvas.vue'
import ThemeChange from './components/themeChange.vue'
import Signature from './components/Signature.vue'
import AudioVisualisation from './components/audioVisualisation.vue'
</script>

## 1. 音频可视化

<AudioVisualisation/>

## 2. 小球的自由落体运动

<SmallBalls/>

## 3. 烟花

<!-- <Fireworks/> -->

<!-- ## 3. 保存图片

有问题，暂时放弃

<SaveImgCanvas/> -->

## 4. 主题色改变（图片加上滤镜）和拾色器

<ThemeChange/>

:::tip `getImageData()`

`getImageData()`方法可以返回一个`ImageData`对象。

`ImageData`对象用来描述`canvas`区域隐含的像素数据，此区域通过矩形表示，**起始点为(sx, sy)**、**宽为 sw、高为 sh**

语法：`getImageData(sx, sy, sw, sh)`

参数：x

sx：将要被提取的图像数据矩形区域的左上角 `x 坐标`;

sy：将要被提取的图像数据矩形区域的左上角 `y 坐标`;

sw：将要被提取的图像数据矩形区域的`宽度`;

sh：将要被提取的图像数据矩形区域的`高度`;

:tada: ：`getImageData(x,y,1,1)`：获取距离 x 和 y 位置的 **1 像素**点的颜色

:::

:::info `putImageData()`

`putImageData()`：可以将数据从已有的`ImageData`对象绘制为位图

语法： `putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)`

参数：

ImageData：`包含像素值的数组对象`。
dx：源图像数据在目标画布中 `x 轴方向的偏移量`。
dy：源图像数据在目标画布中 `y 轴方向的偏移量`。
dirtyX：可选参数，在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。
dirtyY：可选参数，在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。
dirtyWidth：可选参数，在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。
dirtyHeight：可选参数，在源图像数据中，矩形区域的高度。默认是图像数据的高度。
:::

## 5. 签名

<Signature/>

<!-- ## 5. 音频可视化

<AudioVisualisation/> -->
