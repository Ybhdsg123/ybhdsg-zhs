<template>
  <div>
    <span class="text-exand-line">这段文字 鼠标点击 上去会有延展线</span>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.text-exand-line {
  cursor: pointer;
  display: inline-block;
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  background-size: 100% 2px;
  // &:hover {
  //   background-color: aqua;
  //   background-size: 100% 2px;
  // }
}
</style>
