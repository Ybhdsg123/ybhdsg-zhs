<template>
  <div
    class="auto-ellipsis hover-tip"
    :data-text="props.text"
    ref="autoEllipsisRef"
  >
    <span
      :class="[isEllipsis ? 'overflow-hide-moreline' : '']"
      :style="optionsStyle"
    >
      {{ showText }}
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

// props
const props = defineProps({
  // 显示的文本
  text: {
    type: String,
    default: "",
  },
  // 展示几行
  showLine: {
    type: [Number, String],
    default: 1,
  },
  // 是否展示后缀
  isShowSuffix: {
    type: Boolean,
    default: false,
  },
  // 展示文本的样式
  textStyle: {
    type: Object,
    default: () => {},
  },
});

// 合并展示的style，默认的 fontSize 需要计算文本长度要用，默认一个，可以外面传进来
const optionsStyle = { fontSize: "12px", ...props.textStyle };

// ref
const autoEllipsisRef = ref(null);

// 展示的文本，后面多行展示需要更改，单项数据流，不修改props
const showText = ref(props.text);
// 如果设置的是插槽的话 通过 textRef.value.innerText 拿到文本

// 得到设置的 fontSize 大小，只需要数字，parseInt 可以对只有前面是数字的字符串进行处理 拿到数字
const fs = parseInt(optionsStyle.fontSize);

// 判断文本宽度是否 >= 容器宽度
const isEllipsis = ref(false);

// 这里每次页面变化都会执行到 理论上在onMounted里面就行，只有页面加载运行一次就OK
onMounted(() => {
  // 拿到计算后的文本展示
  const { text, isShowEllipsis } = autoEllipsisHandler(
    autoEllipsisRef.value,
    props.text
  );
  showText.value = text;
  isEllipsis.value = isShowEllipsis;
});

/**
 * @description: 自动计算展示省略的文本
 * @param {HTMLElement} container 父级元素 dom/ref
 * @param {String} text 展示的文本
 * @return {Boolean}  isShowEllipsis 文本宽度 是否超过 容器宽度 * 展示的行数
 * @return {String} 展示的文本
 * @Author: zhs
 */
const autoEllipsisHandler = (container, text) => {
  let isShowEllipsis;
  // 获取容器的宽度
  const autoEllipsisWidth = container && container.clientWidth;
  // 计算出文本宽度
  const textWidth = getTextWidth(text.trim(), fs);
  // 判断 文本宽度 和 容器宽度 * 展示的行数
  // 为 false 什么都不做，直接展示，否则添加类名 'overflow-hide-moreline'
  isShowEllipsis = textWidth >= autoEllipsisWidth * props.showLine;
  // 如果为true 并且展示后缀的话 ==》需要修改展示的文本  （说明已经超过了）
  // 如果为true 不展示后缀的话 ==》css里设置就是直接省略，不用处理
  if (isShowEllipsis && props.isShowSuffix) {
    // 后缀
    const suffix = text.split(".").reverse()[0];
    // 展示的后缀长度
    const suffixLength = Math.round((suffix.length + 1) * 0.5);
    // 一行能展示的文本数量 / 2  将展示的文本数量平分为两半 - 后缀应该有的长度
    const inlineNum =
      (Math.ceil(autoEllipsisWidth / fs) * props.showLine).toFixed(0) -
      suffixLength -
      2;
    const beginText = text.slice(0, inlineNum);
    text = beginText + "..." + suffix;
  }
  return { text, isShowEllipsis };
};

// 计算文字的宽度
const getTextWidth = (text, fontSize = 10) => {
  // 创建一个canva元素
  const canvasDom = document.createElement("canvas");
  const ctx = canvasDom.getContext("2d");
  ctx.font = `${fontSize}px sans-serif`; // 设置字体样式 默认字体大小是10px
  // 通过canvas来获取文本的宽度
  const textMetrics = ctx.measureText(text);
  // 直接得到文本的宽度
  const width = textMetrics.width;
  // mdn 上说这样获取的是文本绝对宽度更准确，但是我们现在要获取他们计算中的最大值
  const actualBoundingBoxWidth =
    textMetrics.actualBoundingBoxRight + textMetrics.actualBoundingBoxLeft;
  // 返回它们两中最大的那个元素
  return Math.max(width, actualBoundingBoxWidth);
};
</script>

<style lang="scss" scoped>
$color-info: #999;
.auto-ellipsis {
  position: relative;
  width: 100%; // 写 100% 外面可以直接读取父级元素设置的宽度
  height: 100%;
}
.overflow-hide-moreline {
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  /* 用来限制在一个块元素显示的文本的行数 */
  -webkit-line-clamp: v-bind("props.showLine");
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

// hover 展示文本
.hover-tip:hover {
  position: relative;
  z-index: 99;
  &:before {
    content: attr(data-text); // 通过 attr 显示自定义文本
    white-space: nowrap;
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    background-color: $color-info;
    padding: 2px 4px;
    border-radius: 6px;
    box-shadow: inset;
  }
  &:after {
    content: "";
    position: absolute;
    top: -3px;
    left: 30%;
    border: 6px solid transparent;
    border-top: 6px solid $color-info;
  }
}
</style>
