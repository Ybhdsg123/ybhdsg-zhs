<template>
  <div>
    <canvas></canvas>
    <audio :src="bcgnMp3" controls></audio>
  </div>
</template>

<script setup>
import bcgnMp3 from "../mp3/本草纲目.mp3";
import { ref, onMounted, onUnmounted } from "vue";

// 分析器节点
const analyser = ref(null);
// 数组，用于接收分析器节点的分析数据
let dataArray = ref([]);
// 是否已初始化
let isInit = ref(false);

let draw;

onMounted(() => {
  const audio = document.querySelector("audio");
  const cvs = document.querySelector("canvas");
  // 获取canvas的上下文
  const ctx = cvs.getContext("2d");
  // 音频播放事件
  audio.onplay = function () {
    // 判断是否初始化
    if (isInit.value) {
      return;
    }
    // 开始初始化
    // 创建音频上下文
    const audioCtx = new AudioContext();
    // 创建音频源节点
    const source = audioCtx.createMediaElementSource(audio);
    // 创建分析器节点
    analyser.value = audioCtx.createAnalyser();
    analyser.value.fftSize = 512; // 表示（信号）样本的窗口大小
    // 接收分析器节点的分析数据
    dataArray.value = new Uint8Array(analyser.value.frequencyBinCount);
    source.connect(analyser.value);
    analyser.value.connect(audioCtx.destination);
    // 已初始化
    isInit.value = true;
  };
  // 把分析出来的波形绘制到canvas上
  draw = () => {
    // 逐帧绘制
    requestAnimationFrame(draw);

    // 先拿到canvas的宽高，然后接下来清空画布
    const { width, height } = cvs;
    ctx.clearRect(0, 0, width, height);
    if (!isInit.value) {
      return;
    }
    // 让分析器节点分析出数据到数组中
    analyser.value.getByteFrequencyData(dataArray.value);
    const len = dataArray.value.length / 2; //条的数量，取一半，前半部分（低频范围就好，高频部分人耳几乎听不到，看不到波形）
    const barWidth = width / len / 2; //条的宽度
    console.log(len);
    ctx.fillStyle = "#e0f9b5";
    // 循环绘制
    for (let i = 0; i < len; i++) {
      const data = dataArray.value[i];
      const barHeight = (data / 255) * height; //条的高度
      const x1 = i * barWidth + width / 2; //右边区域中条的x坐标
      const x2 = width / 2 - (i + 1) * barWidth; //左边区域中条的x坐标 镜像
      const y = height - barHeight; //条的y坐标
      ctx.fillRect(x1, y, barWidth - 2, barHeight); //填充右边区域
      ctx.fillRect(x2, y, barWidth - 2, barHeight); //填充左边区域
    }
  };
  draw();
});

onUnmounted(() => {
  window.requestAnimationFrame(draw);
});
</script>

<style lang="scss" scoped>
audio {
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.5;
  transition: opacity 0.5s;
}
audio:hover {
  opacity: 1;
}
</style>
