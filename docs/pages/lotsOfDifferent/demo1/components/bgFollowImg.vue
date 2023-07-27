<template>
  <div class="grid">
    <div class="item" v-for="(url, i) in images">
      <img
        crossorigin="anonymous"
        :src="url"
        @mouseenter="mouseenterHandler($event, i)"
        @mouseleave="mouseleaveHandler"
        :class="[hoverIndex === i ? 'hoverImg' : '']"
        :style="{
          opacity: hoverIndex === -1 ? 1 : i === hoverIndex ? 1 : 0.2,
          transition: '.3s',
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// 通过cnd方式引入 ColorThief
// import "https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.4.0/color-thief.min.js";

// 通过cdn引入的方式，在打包时ESM不支持，所以需要将文件下载下来引入
import "../color_thief";
const images = [];
for (let i = 0; i < 4; i++) {
  images.push(`https://picsum.photos/200?r=${i}`);
}

//创建一个 ColorThief 的实例对象
const colorThief = new ColorThief();

// 背景色的渐变背景 默认为 白色 在 css 中通过 v-bind 设置
const linearBg = ref("#fff");

// 当前图片索引
const hoverIndex = ref(-1);

// 鼠标移入
const mouseenterHandler = async (e, i) => {
  hoverIndex.value = i;
  // console.log(e.target);
  // 得到这张图片的调色盘（只得到前三种颜色）
  const colors = await colorThief.getPalette(e.target, 3);
  // 解构出设置的三种 rgb 颜色
  const [c1, c2, c3] = colors.map((c) => `rgb(${c[0]},${c[1]},${c[2]})`);
  // 设置背景色的渐变色
  linearBg.value = `${c1},${c2},${c3}`;
};
// 鼠标移出
const mouseleaveHandler = () => {
  hoverIndex.value = -1;
  linearBg.value = "#fff";
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-rows: repeat(2, 200px);
  grid-template-columns: repeat(2, 200px);
  /* 注意⚠️：这里不能设置整体背景，会在鼠标移出时触发背景变化，在很短时间内又触发背景移入事件，造成页面闪一下*/
  /* gap: 20px; */
  align-content: center;
  justify-content: center;
  background: linear-gradient(v-bind("linearBg"));
}
.grid img {
  /* 设置图片间隔 */
  padding: 20px;
}
.hoverImg {
  transform: scale(1.1);
}
</style>
