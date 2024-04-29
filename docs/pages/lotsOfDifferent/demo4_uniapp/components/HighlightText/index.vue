<template>
  <view>
    <block
      v-for="(item, index) in getHilightStrArray(text, keyword)"
      :key="index"
    >
      <text :style="item == keyword ? 'color:' + color : ''">{{ item }}</text>
    </block>
  </view>
</template>

<script setup>
const props = defineProps({
  // 需要显示的文本
  text: {
    type: String,
  },
  // 需要高亮的关键字
  keyword: {
    type: String,
  },
  // 高亮的颜色
  color: {
    type: String,
    default: "#199B46",
  },
});
const getHilightStrArray = (str, key) => {
  return str.replace(new RegExp(`${key}`, "g"), `%%${key}%%`).split("%%");
};
</script>

<style lang="scss" scoped></style>
