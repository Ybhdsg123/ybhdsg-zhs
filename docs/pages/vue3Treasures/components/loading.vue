<template>
  <div class="my-loading"></div>
</template>

<script setup>
import { onMounted } from "vue";
const props = defineProps({
  // loading 大小
  size: {
    type: [Number, String],
    default: "mini",
  },
});
// size 别名
const mapSize = {
  mini: 60,
  small: 80,
  medium: 100,
  large: 200,
};
const sizes = mapSize[props.size];

let dpr;
onMounted(() => {
  dpr = window.devicePixelRatio;
});

// 判断输入的值是否为内置别名
const loading_size = sizes ? sizes + "px" : props.size + "px";
</script>

<style lang="scss" scoped>
$size: v-bind("loading_size");
$dpr: v-bind("dpr");
.my-loading {
  width: calc($size / $dpr);
  height: calc($size / $dpr);
  background: royalblue;
  -webkit-mask: radial-gradient(
        closest-side circle,
        royalblue 99%,
        transparent 100%
      )
      center top/25% 25% no-repeat,
    radial-gradient(
      closest-side circle,
      transparent 49%,
      red 50% 99%,
      transparent 100%
    ),
    conic-gradient(transparent 10%, royalblue 90%);
  // source-over /*叠加，两者都显示*/ source-in; /*只显示重合的地方*/
  -webkit-mask-composite: source-over, source-in;
  animation: run 3s linear infinite;
}
@keyframes run {
  100% {
    transform: rotate(360deg);
  }
}
</style>
