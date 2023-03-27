<template>
  <div>
    <span>
      <canvas id="canvas1" width="600" height="130">
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
    // 绘制一条从起点（x: 30, y:30）到 另一个点（x: 90, y:90）的直线
    ctx1.moveTo(300, 70); //起点
    ctx1.lineTo(230, 100); // 终点
    ctx1.stroke();
    // 绘制三角形
    ctx1.moveTo(50, 50);
    ctx1.lineTo(130, 130);
    ctx1.lineTo(130, 50);
    ctx1.lineTo(50, 50);
    ctx1.stroke();
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
