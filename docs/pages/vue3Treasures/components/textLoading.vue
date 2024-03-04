<template>
  <div class="no-data">
    <!-- 暂无更多数据 -->
    <div class="wavy">
      <!-- --i是自定义属性，可通过var函数调用 -->
      <span v-for="(v, i) in loadingText" :key="i" :style="{ '--i': i }">
        {{ v }}
      </span>
      <!-- <span style="--i: 1">暂</span>
      <span style="--i: 2">无</span>
      <span style="--i: 3">更</span>
      <span style="--i: 4">多</span>
      <span style="--i: 5">数</span>
      <span style="--i: 6">据</span>
      <span style="--i: 7">！</span>
      <span style="--i: 8">.</span>
      <span style="--i: 9">.</span>
      <span style="--i: 10">.</span> -->
    </div>
  </div>
</template>

<script setup>
// 展示的loading文本
const props = defineProps({
  loadingText: {
    type: String,
    default: "暂无更多数据...",
  },
});
</script>

<style lang="scss" scoped>
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.wavy {
  /* 相对定位 */
  position: relative;
  /* 倒影效果 */
  -webkit-box-reflect: below -12px linear-gradient(transparent, rgba(0, 0, 0, 0.2));
}

.wavy span {
  position: relative;
  display: inline-block;
  color: #333;
  font-size: 38rpx;
  text-transform: uppercase; // 大写
  letter-spacing: 8px;
  /* 执行动画：动画名 时长 加速后减速 无限次播放 */
  animation: wavyAnimate 1s ease-in-out infinite;
  /* 通过var函数调用自定义属性--i，在计算出动画延迟时间 */
  animation-delay: calc(0.1s * var(--i));
}

/* 定义动画 */
@keyframes wavyAnimate {
  0% {
    transform: translateY(0);
  }

  20% {
    transform: translateY(-20px);
  }

  40%,
  100% {
    transform: translateY(0);
  }
}
</style>
