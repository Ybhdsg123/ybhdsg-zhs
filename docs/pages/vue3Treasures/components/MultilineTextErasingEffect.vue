<template>
  <div>
    <template v-if="isCss">
      <div class="container">
        <p>{{ contentText }}</p>
        <!-- 定位覆盖到第一个上面 -->
        <p class="eraser">
          <span class="text"> {{ contentText }}</span>
        </p>
      </div>
    </template>
    <template v-else>
      <p ref="jsAtainRef" class="js-atain-style">
        {{ showText }}
        <span class="jump">|</span>
      </p>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  isCss: {
    type: Boolean,
    default: true,
  },
});

const contentText =
  "1.人和人之间舒服的关系，是可以一直不说话，也可以随时说话。2.有朵盛开的云，缓缓滑过山顶，随风飘向天边。";
// 判断是否支持 @property
const isCssPropertySupported = isCssPropertySupportedHandler();
function isCssPropertySupportedHandler() {
  if (typeof window.CSS.registerProperty !== "undefined") {
    console.log("浏览器支持 @property 规则");
    return true;
  } else {
    console.log("浏览器不支持 @property 规则");
    return false;
  }
}

// js实现
const jsAtainRef = ref(null);
const showText = ref("");
onMounted(() => {
  //   const ele = jsAtainRef.value;
  //   const text = ele && ele.innerText;
  //   console.log(text, "===");
});
function erasingEffectText(text) {
  let index = 0;
  let timer = setInterval(() => {
    index++;
    if (index === text.length) {
      clearInterval(timer);
    }
    showText.value = text.slice(0, index);
  }, Math.random() * 500);
}
erasingEffectText(contentText);
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  background: #000;
  color: #fff;
  width: 100%;
  text-indent: 20px;
  line-height: 2;
  font-size: 18px;
  margin: 30px auto;
  .eraser {
    position: absolute;
    inset: 0;
    /*这里解释一下inset属性，inset属性用作定位元素的top、right、bottom 、left这些属性的简写
    依照的也是上右下左的顺序。
    例如：inset:1px 2px 等同于 top:1px right:2px bottom:1px left:2px
    */
    margin: 0; // 清空p标签的margin
  }
  .text {
    --p: 0%;
    background: linear-gradient(
      to right,
      #0000 var(--p),
      #000 calc(var(--p) + 30px)
    ); // 加上30px显示一个默认的渐变区域
    //    background: linear-gradient(
    //     to right,
    //     #0000 100%,
    //     #000 calc(var(--p) )
    //   ); // 加上30px显示一个默认的渐变区域
    color: transparent; //
    animation: erase 8s linear forwards;
  }
  @keyframes erase {
    to {
      --p: 100%;
    }
  }
}
// 自定义属性
@property --p {
  syntax: "<percentage>"; // 设置其为百分比
  initial-value: 0%; // 设置初始值
  inherits: false; // 是否默认继承
}

// js实现部分样式
.js-atain-style {
  .jump {
    transition: all 0.5s;
    animation: fade 2s infinite forwards;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
