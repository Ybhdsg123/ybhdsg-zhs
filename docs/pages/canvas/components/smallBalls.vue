<template>
  <div style="width: 600px">
    <canvas id="canvas-dom" width="600" height="300">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // 获取 canvas 元素
  const canvasDom = document.getElementById("canvas-dom");
  canvasDom.width = 600;
  // 判断是否支持 canvas
  if (canvasDom.getContext) {
    // 获取绘制的上下文
    const ctx = canvasDom.getContext("2d");
    // 创建小球基本信息
    let ball = {
      x: 50,
      y: 50,
      vx: 1,
      vy: 3,
      radius: 10, //半径
      color: "blue",
      draw: function () {
        // 开启路径
        ctx.beginPath();
        // 画一个圆
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // 关闭路径
        ctx.closePath();
        // 填充颜色
        ctx.fillStyle = this.color;
        // 填充
        ctx.fill();
      },
    };
    // 小球运动方法
    function ballRun() {
      // 每次进来时先清空画布
      // ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
      // 拖尾效果，用带透明度的矩形代替清空
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      // ctx.fillStyle = "rgba(34,255,154,.6)";
      ctx.fillRect(0, 0, canvasDom.width, canvasDom.height);
      // 然后绘制
      ball.draw();
      // 添加加速度
      ball.vy *= 0.99;
      ball.vy += 0.15;
      // 添加运动速率
      ball.x += ball.vx;
      ball.y += ball.vy;
      // 添加边界情况
      if (ball.x + ball.vx > canvasDom.width || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
      }
      if (ball.y + ball.vy > canvasDom.height || ball.y + ball.vy < 0) {
        ball.vy = -ball.vy;
        if (ball.y + ball.vy > 310) {
          ball.y = 50;
        }
      }
      // 通过 requestAnimationFrame 执行
      window.requestAnimationFrame(ballRun);
    }
    window.requestAnimationFrame(ballRun);
    // 绘制
    ball.draw();
  }
});
</script>

<style lang="scss" scoped>
#canvas-dom {
  border: 1px solid #ccc;
}
</style>
