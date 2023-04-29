<template>
  <canvas id="themeCanvas" width="600" height="300"></canvas>
  <div>划过的颜色为：{{ moveColorText }}</div>
  <div>选中的颜色： {{ selectColorText }}</div>
  <button @click="resetHandler">还原</button>
  <button @click="blackWhiteHandler">黑白</button>
  <button @click="exposureHandler">曝光</button>
</template>

<script setup>
import { ref, onMounted } from "vue";
const url =
  "https://img2.baidu.com/it/u=4044887937,3129736188&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=392";
let ctx = null;
let themeCanvas = null;
let img = null;

// hoverColor
const moveColorText = ref("");
const selectColorText = ref("");
onMounted(() => {
  themeCanvas = document.getElementById("themeCanvas");
  // willReadFrequently 频繁调用getImageData()方法时能节省内存，仅Gecko内核浏览器支持。
  ctx = themeCanvas.getContext("2d", { willReadFrequently: true });
  // 创建image元素
  img = new Image();
  // 防止画布被污染，跨域
  img.crossOrigin = "Anonymous";
  img.src = url;
  img.onload = () => {
    // 绘画
    ctx.drawImage(img, 0, 0, 600, 300);
    img.style.display = "none";
  };

  // canavs注册鼠标移动事件
  themeCanvas.addEventListener("mousemove", function (event) {
    pickColor("move", event);
  });
  // canvas注册鼠标点击事件
  themeCanvas.addEventListener("click", (event) => {
    pickColor("click", event);
  });

  //获取图片元素信息的方法
  function pickColor(type, e) {
    const x = e.offsetX;
    const y = e.offsetY;
    // 获取图片的像素信息, x: 左上角 x 坐标， y: 左上角 y 坐标， 1：被提取的宽度 1：被提取的高度
    // 这个意思就是 获取 x,y 一个像素的颜色值
    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;
    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    if (type == "move") {
      moveColorText.value = rgba;
    } else {
      selectColorText.value = rgba;

      // 将选中的颜色应用到图片整体
      // 获取图片所有像素信息
      const imgData = ctx.getImageData(
        0,
        0,
        themeCanvas.width,
        themeCanvas.height
      );
      const data1 = imgData.data;
      // 遍历改变数组里面像素数据
      for (let i = 0; i <= data1.length; i += 4) {
        // 改变像素数据
        data1[i] = data[0]; //red
        data1[i + 1] = data[1]; //green
        data1[i + 2] = data[2]; //blue
      }
      ctx.putImageData(imgData, 0, 0);
    }
    return rgba;
  }
});

// 还原
const resetHandler = () => {
  ctx.drawImage(img, 0, 0, 600, 300);
};
// 黑白主题
const blackWhiteHandler = () => {
  // ctx.drawImage(img, 0, 0, 300, 200);
  resetHandler();
  // 获取 canvas区域隐含的像素数据
  const imgData = ctx.getImageData(0, 0, themeCanvas.width, themeCanvas.height);
  const data = imgData.data;
  // 遍历改变数组里面像素数据
  for (let i = 0; i <= data.length; i += 4) {
    // 改变像素数据
    const arg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = arg; //red
    data[i + 1] = arg; //green
    data[i + 2] = arg; //blue
  }
  // 设置 ImageData
  ctx.putImageData(imgData, 0, 0);
};
//曝光
const exposureHandler = () => {
  resetHandler();
  // 获取 canvas区域隐含的像素数据
  const imgData = ctx.getImageData(0, 0, themeCanvas.width, themeCanvas.height);
  const data = imgData.data;
  // 遍历改变数组里面像素数据
  for (let i = 0; i <= data.length; i += 4) {
    data[i] = 255 - data[i]; //red
    data[i + 1] = 255 - data[i + 1]; //green
    data[i + 2] = 255 - data[i + 2]; //blue
  }
  // 设置 ImageData
  ctx.putImageData(imgData, 0, 0);
};
</script>

<style lang="scss" scoped>
.a {
  color: rgba(110, 21, 35, 1);
}
</style>
