<template>
  <button
    style="padding: 3px; border: 1px solid #409eff"
    v-debounce:[demo].foo="onClick"
  >
    多次点击
  </button>
  {{ demo.time }}
</template>

<script setup>
import { ref } from "vue";

// 这里 time 就是延迟时间，event就是执行的事件 例如 click 或者 input
const demo = ref({
  time: 1000,
  event: "click",
});

// 点击事件
function onClick() {
  // console.log(demo.value)
  demo.value.time++;
  console.log("Only triggered once when clicked many times quickly");
}

// 防抖
const debounce = (fn, wait = 1000) => {
  let timer = null;
  return function (...args) {
    // 每次进来都会清空定时器，所以在 delay 事件中重复执行之后执行最后一次
    clearInterval(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};

// 防抖指令
const vDebounce = {
  mounted(el, binding) {
    // 指令参数
    // 格式：object {event:注册的事件,time:延时的时间}
    const args = binding.arg;
    if (!args) {
      throw Error('请传入类似于{time:1000,event:"click"}格式的指令参数');
    }
    // 注册点击事件，传入 binding.value => onClick，和延时时间 args.arg
    el.addEventListener(args.event, debounce(binding.value, args.time));
  },
};
</script>
