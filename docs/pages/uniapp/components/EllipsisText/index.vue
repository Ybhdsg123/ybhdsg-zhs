<template>
  <view class="ellpsis-text">
    <view
      class="text-content"
      :style="{ '-webkit-line-clamp': showText ? Infinity : lines }"
    >
      <!-- 前缀文本（标题） -->
      <text v-if="prefixText" class="prefix-text">{{ prefixText }} </text>
      <!-- 展示文本 -->
      <text class="show-text"> {{ content }}</text>
      <!-- 站位文本 -->
      <text class="text-placeholder__higth">占位文本</text>
    </view>
    <view v-if="isEllipsis" class="btn-text" @click="shiftText">
      <text v-if="showText" class="btn-text__switch">
        收起 <text class="iconfont icon-shangla"></text>
      </text>
      <view v-else> 展开 <text class="iconfont icon-xiala"></text> </view>
    </view>
  </view>
</template>
<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
/**
 * @name TextEllipsis
 * @description 文本超出N行显示（...展开）
 * @param {String} prefixText 前缀文本
 * @param {String} content 文本
 * @param {Number} lines 文本超出n行显示省略
 */
const props = defineProps({
  prefixText: { type: String, default: "" },
  content: { type: String, require: true },
  lines: { type: Number, require: true },
});

const showText = ref(true); // 展示文本的状态
const isEllipsis = ref(false); // 是否显示省略号
const instance = getCurrentInstance(); // 获取组件实例

function shiftText() {
  showText.value = !showText.value;
}

onMounted(() => {
  const query = uni.createSelectorQuery().in(instance);
  // 计算占位字体高度
  let textHeigth = 0;
  query
    .select(".text-placeholder__higth")
    .boundingClientRect((data) => {
      textHeigth = data.height;
    })
    .exec();
  // 展示的文本
  query
    .select(".show-text")
    .boundingClientRect((data) => {
      // 计算误差小于0.1
      if (data.height - 0.1 > textHeigth * props.lines) {
        isEllipsis.value = true;
        showText.value = false;
      }
    })
    .exec();
});
</script>

<style lang="scss" scoped>
.ellpsis-text {
  position: relative;
  font-size: 24rpx;
  .prefix-text {
    font-size: 32rpx;
    font-weight: 700;
    color: #000;
  }
  .text-content {
    position: relative;
    color: #666;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;

    // 占位字计算高度的样式
    .text-placeholder__higth {
      position: absolute;
      top: 0;
      left: 0;
      color: transparent;
    }
  }

  .btn-text {
    position: absolute;
    right: 0rpx;
    bottom: -30rpx;
    font-weight: 700;
    color: #000;
  }
}
</style>
