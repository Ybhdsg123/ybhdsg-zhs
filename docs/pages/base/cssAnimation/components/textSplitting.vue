<template>
  <div class="items">
    <div v-for="item in 2" :key="item" class="item">
      <div class="a">文字裂开效果</div>
      <div class="a">文字裂开效果</div>
      <a target="_blank" href="https://ybhdsg123.github.io/ybhdsg-zhs/"
        >点赞了解更多</a
      >
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.items {
  width: 80%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // 触发景深效果
  &:hover .item {
    filter: blur(10px);
    transform: scale(0.8);
    transition: filter 0.5s, transform 0.5s;
  }
  /* 对应的取消景深效果 */
  .item:hover {
    filter: blur(0px);
    transform: scale(1);
    transition: filter 0.5s, transform 0.5s;
    /* 上半部分上移并变淡 */
    .a:nth-child(1) {
      top: -10px;
      opacity: 0.8;
      transition: top 0.5s, opacity 0.5s;
    }
    /* 下半部分下移并变淡 */
    .a:nth-child(2) {
      top: 10px;
      opacity: 0.8;
      transition: top 0.5s, opacity 0.5s;
    }
  }
  .item {
    position: relative;
    display: flex;
    justify-content: center;
    /* 裂开后显示的文字 */
    //  让元素先隐藏
    a {
      position: absolute; // 这里很重要 让变换的文字对齐
      color: #000;
      text-decoration: none;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.5s;
      // hover 时加上下划线
      &:hover {
        text-decoration: underline;
      }
    }
    // hover时 改变 opacity 让其显示
    &:hover a {
      opacity: 1;
      transition: opacity 0.5s;
    }
    // 元素基本样式
    .a {
      font-style: italic;
      font-weight: bold;
      font-size: 30px;
      top: 0;
      opacity: 1;
      transition: top 0.5s, opacity 0.5s;
      /* 切割文字 第一个文字上半部分*/
      &:nth-child(1) {
        position: absolute;
        clip-path: polygon(0% 0%, 100% 0%, 100% 51%, 0% 51%);
      }
      /* 切割文字 第二个文字下半部分*/
      &:nth-child(2) {
        position: relative;
        clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%);
      }
    }
  }
}
</style>
