<template>
  <div>
    <span>
      <canvas id="canvas1" width="800" height="330">
        当前浏览器不支持canvas元素，请升级或更换浏览器！
      </canvas>
    </span>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // 拿到 canvas 元素
  const canvasDom1 = document.getElementById("canvas1");
  // 判断浏览器支持不支持
  if (canvasDom1.getContext) {
    // 获取渲染上下文
    const ctx1 = canvasDom1.getContext("2d");
    // 绘制一条从起点（x: 300, y:70）到 另一个点（x: 230, y:100）的直线
    ctx1.moveTo(300, 70); //起点
    ctx1.lineTo(430, 100); // 终点
    ctx1.stroke();
    // 绘制三角形
    ctx1.beginPath();
    ctx1.moveTo(50, 50);
    ctx1.lineTo(130, 130);
    ctx1.lineTo(130, 50);
    ctx1.lineTo(50, 50);
    ctx1.stroke();
    // 绘制一个矩形边框 x 和 y 是矩形的起点坐标，width 和 height 是矩形的宽高
    ctx1.strokeRect(200, 20, 20, 50);
    //  绘制一个填充矩形
    ctx1.fillRect(230, 60, 30, 30);
    // 绘制一段圆弧
    ctx1.beginPath(); // 开启路径
    ctx1.arc(60, 160, 50, 0, Math.PI, false);
    ctx1.stroke();
    // 绘制一个圆弧
    ctx1.beginPath(); // 开启路径
    ctx1.arc(180, 160, 50, 0, Math.PI * 2, false);
    ctx1.stroke();
    // 填充一个四分之一圆弧
    ctx1.beginPath(); // 开启路径
    ctx1.arc(60, 200, 50, 0, Math.PI / 2, false);
    ctx1.fill();
    // 填充一个圆弧
    ctx1.beginPath(); // 开启路径
    ctx1.arc(200, 280, 50, 0, Math.PI * 2, false);
    ctx1.fill();
    // 绘制一个椭圆
    ctx1.beginPath();
    ctx1.ellipse(400, 150, 50, 100, 0, 0, 2 * Math.PI);
    ctx1.stroke();
    // 绘制一个填充的椭圆
    ctx1.beginPath();
    ctx1.ellipse(550, 150, 50, 100, Math.PI / 2, 0, 2 * Math.PI); // 旋转90°
    ctx1.fill();
  }
});
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid skyblue;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
</style>
