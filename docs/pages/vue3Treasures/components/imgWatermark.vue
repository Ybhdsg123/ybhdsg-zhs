<template>
  <div class="water-mark" ref="parentRef">
    <slot></slot>
    <!-- 添加一个 div ，填满整个区域，设置水印背景，重复 -->
  </div>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
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
    type: [Number, String],
    default: 10,
  },
  // 间隙，平铺的间隙
  gap: {
    type: Number,
    default: 10,
  },
});

// ref
const parentRef = ref(null);

// 得到水印文本转换为的URL和大小
const watermarkData = useWatermarkBg(props);

// 创建水印的 div 防篡改
let div;

// 创建一个 flag 为了让 watchEffect收集依赖运行
const flag = ref(0);

// 收集依赖 防篡改
watchEffect(() => {
  // 收集一下 flag 的依赖，下面自动运行
  flag.value;
  if (!parentRef.value) {
    return;
  }
  // 如果创建节点时之前节点有值,就移除节点
  if (div) {
    div.remove();
  }
  const { base64, size, styleSize } = watermarkData.value;
  // 创建一个div
  div = document.createElement("div");
  div.style.backgroundImage = `url(${base64})`;
  div.style.backgroundSize = `${styleSize}px ${styleSize}px`;
  // 平铺
  div.style.backgroundRepeat = "repeat";
  // div.style.width = "72px";
  // div.style.height = "72px";
  // 防止底部元素失去鼠标事件交互
  div.style.pointerEvents = "none";
  // 设置定位
  div.style.position = "absolute";
  div.style.zInde = 9999;
  // 定位元素距离父级元素 四边的距离 为0 则直接覆盖，不用设置top等
  div.style.inset = 0;
  parentRef.value.appendChild(div);
});

let ob;
// 在组建挂载时  监听整个容器
onMounted(() => {
  // 创建监听器
  ob = new MutationObserver((records) => {
    // console.log(records);
    for (const record of records) {
      // 循环判断 records中的 removedNodes 是否是有删除水印的操作
      for (const dom of record.removedNodes) {
        // 判断 dom 是否是水印节点
        if (dom === div) {
          // console.log("删除了水印");
          flag.value++; // 它改变，watchEffect收集依赖会运行
          return;
        }
      }
      // console.log(record.target);
      // 监控修改
      if (record.target === div) {
        flag.value++;
        return;
      }
    }
  });
  // 开启监听， 告诉它监听谁
  ob.observe(parentRef.value, {
    childList: true, // 监听 target 节点中发生的节点的新增与删除
    attributes: true, // 观察所有监听的节点属性值的变化。
    subtree: true, // 监听以 target 为根节点的整个子树，包括子树中所有节点的属性
  });
});

// 组件卸载时，取消监听
onUnmounted(() => {
  // 关闭监听
  ob && ob.disconnect();
  // 将div设置为null，避免内存泄漏
  div = null;
});
</script>

<style lang="scss" scoped>
.water-mark {
  position: relative;
  width: 100%;
  height: 100%;
  // width: 360px;
  // height: 340px;
}
</style>
