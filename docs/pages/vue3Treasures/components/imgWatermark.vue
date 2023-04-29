<template>
  <div class="water-mark" ref="parentRef">
    <slot></slot>
    <!-- 添加一个 div ，填满整个区域，设置水印背景，重复 -->
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import useWatermarkBg from "../hook/useWatermarkBg";

const props = defineProps({
  // 水印文本
  text: {
    type: String,
    required: true,
    default: "waterMark",
  },
  // 字体大小
  fontSize: {
    type: Number,
    default: 40,
  },
  // 间隙，平铺的间隙
  gap: {
    type: Number,
    default: 20,
  },
});

// ref
const parentRef = ref(null);

// 得到水印文本转换为的URL和大小
const watermarkData = useWatermarkBg(props);

watchEffect(() => {
  if (!parentRef.value) {
    return;
  }
  const { base64, styleSize } = watermarkData.value;
  // 创建一个div
  const div = document.createElement("div");
  div.style.backgroundImage = `url(${base64})`;
  div.style.backgroundSize = `${styleSize}px ${styleSize}px`;
  // 平铺
  div.style.backgroundRepeat = "repeat";
  // 防止底部元素失去鼠标事件交互
  div.style.pointerEvents = "none";
  // 设置定位
  div.style.position = "absolute";
  div.style.zInde = 9999;

  // 定位元素距离父级元素 四边的距离 为0 则直接覆盖，不用设置top等
  div.style.inset = 0;
  parentRef.value.appendChild(div);
});
</script>

<style lang="scss" scoped>
.water-mark {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
