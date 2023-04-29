<template>
  <canvas id="signatureCanvas" width="600" height="300"></canvas>
  <button @click="clear">清空画布</button>
</template>

<script setup>
import { onMounted } from "vue";
let ctx = null;
let signatureCanvas = null;
onMounted(() => {
  signatureCanvas = document.getElementById("signatureCanvas");
  ctx = signatureCanvas.getContext("2d");
  // 鼠标进入事件
  signatureCanvas.addEventListener("mouseenter", () => {
    // 鼠标按下事件
    signatureCanvas.addEventListener("mousedown", (e) => {
      // console.log("鼠标按下了");
      ctx.beginPath();
      // 设置初始位置坐标
      ctx.moveTo(e.offsetX, e.offsetY);
      // 鼠标移动 绘画
      signatureCanvas.addEventListener("mousemove", draw);
    });
    // 鼠标抬起事件
    signatureCanvas.addEventListener("mouseup", () => {
      // console.log("鼠标抬起了");
      // 移除  mousemove 事件
      signatureCanvas.removeEventListener("mousemove", draw);
    });
  });
  const draw = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };
});
const clear = () => {
  ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
};
</script>

<style lang="scss" scoped>
#signatureCanvas {
  border: 1px solid #ccc;
}
</style>
