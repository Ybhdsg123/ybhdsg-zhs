<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading {
  width: 60px;
  height: 60px;
  display: grid;
  /* 制作3列的网格容器 */
  grid-template-columns: repeat(3, 1fr);
  /* 设置行与列之间的间隙 */
  grid-gap: 10px;
  /* 对子部分进行编号 */
  /* counter-reset: number; */
  /* 旋转45度 */
  transform: rotate(45deg);
}
.loading span {
  /* 自定义属性 */
  --c: red;
  /* 调用var函数使用自定义属性--c */
  background-color: var(--c);
  position: relative;
  transform: rotate(0);
  /* 执行动画：动画 时长 线性的 无限次播放 */
  animation: blinking 2s linear infinite;
  /* 动画延迟 */
  animation-delay: var(--d);
}
.loading span::before {
  /* 设置增量 */
  /* counter-increment: number; */
  /* 将编号赋值到content，这里有助于我们根据编号设置样式 */
  /* content: counter(number); */
  color: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
}
.loading span:nth-child(7) {
  --c: #f15a5a;
  --d: 0s;
}
.loading span:nth-child(4),
.loading span:nth-child(8) {
  --c: #f0c419;
  --d: 0.2s;
}
.loading span:nth-child(1),
.loading span:nth-child(5),
.loading span:nth-child(9) {
  --c: #4eba6f;
  --d: 0.4s;
}
.loading span:nth-child(2),
.loading span:nth-child(6) {
  --c: #2d95bf;
  --d: 0.6s;
}
.loading span:nth-child(3) {
  --c: #955ba5;
  --d: 0.8s;
  /* 到这里基本完成了，我们来吧编号去掉吧 */
}

/* 定义动画 缩放 */
@keyframes blinking {
  0%,
  100% {
    transform: scale(0);
  }
  40%,
  80% {
    transform: scale(1);
  }
}
</style>
