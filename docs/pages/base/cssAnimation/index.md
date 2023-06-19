# css 特效

[大佬特效仓库](https://gitee.com/wyanhui02/html_css_demo/blob/master/README.md)

<script setup>
import TextSplitting from './components/textSplitting.vue'
import SpecialIpt from './components/specialIpt.vue'
import FlashCards from './components/flashCards.vue'
import LoveLoading from './components/loveLoading.vue'
import RhombusLoading from './components/rhombusLoading.vue'
import DazzleLoading from './components/dazzleLoading.vue'
import TextExtensionLine from './components/textExtensionLine.vue'
</script>

## 1. 文字裂开特效

<TextSplitting/>

:::details 文字裂开

```vue
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
  width: 50%;
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
```

:::

## 2. 输入框

<SpecialIpt/>

:::details 不一样的输入框

```vue
<template>
  <div class="wrapper">
    <div class="input-data">
      <input
        type="email"
        :modelValue="modelValue"
        @input="emits('update:modelValue', $event.target.value)"
      />
      <div
        class="underline"
        :class="[modelValue ? 'underline-active' : 'underline']"
      ></div>
      <label :class="[modelValue ? 'ipt-have-value' : '']" ref="labelRef">
        您的姓名
      </label>
      <div v-if="verificationPassed" class="error-info">
        {{ rules.message }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  // 绑定值
  modelValue: {
    required: true,
  },
  rules: {
    type: Object,
    dfault: () => {},
  },
});

const emits = defineEmits(["update:modelValue"]);

// 是否验证通过
const verificationPassed = ref(false);

// 失去焦点时
const blurHandler = (e) => {
  const value = e.target.value; // 输入框的值
  emits("update:modelValue", value);
  console.log(value);
  return;
  const rule = props.rules; // 严重规则
  // 是否在失去焦点时验证
  if (rule.trigger === "blur") {
    if (rule.requried && e.target.value === "") {
      verificationPassed.value = true;
    } else {
      verificationPassed.value = false;
    }
  }
  console.log(props.rules);
};
</script>
<style lang="scss" scoped>
.wrapper {
  // 错误提示信息
  .error-info {
    font-size: 12px;
    color: red;
  }
  .input-data {
    /* 相对定位 */
    position: relative;
    width: 100%;
    height: 40px;
    /* 输入框 */
    input {
      width: 100%;
      height: 100%;
      border: none; // 未点击前显示的边框
      font-size: 17px;
      border-bottom: 2px solid #c0c0c0;
      box-sizing: border-box; // 设置怪异盒
      // 防止设置 placeholder，样式混乱，直接给透明值
      &::placeholder {
        color: transparent;
      }
      &:focus {
        outline: none; // 取消聚焦后的边框
      }
      /* 输入框获得焦点时 label*/
      &:focus ~ label {
        /* label上移，同时改变字号、字体颜色 */
        transform: translateY(-25px);
        font-size: 15px;
        color: #2c6fdb;
      }

      /*输入框聚焦时 underline */
      &:focus ~ .underline {
        /* 沿X轴放大 */
        transform: scaleX(1);
      }
    }
    // 输入框有值时
    .ipt-have-value {
      transform: translateY(-25px);
      color: #2c6fdb;
    }
    /* lable*/
    label {
      /* 绝对定位 */
      position: absolute;
      bottom: 10px;
      left: 0px;
      color: #808080;
      /* 这个属性可以使点击label穿透到输入框 */
      pointer-events: none;
      /* 现在动画有点生硬，在这里需要给动画加个过渡 */
      transition: all 0.3s ease;
    }
    /* underline */
    .underline {
      position: absolute;
      bottom: 0px;
      height: 2px;
      width: 100%;
      background-color: #2c6fdb;
      /* 沿X轴缩小 */
      transform: scaleX(0);
      /* 这里同样给动画加个过渡 */
      transition: all 0.3s ease;
    }
    // 有值时
    .underline-active {
      /* 沿X轴缩小 */
      transform: scaleX(1);
    }
  }
}
</style>
```

:::

## 3. 闪光卡片

<FlashCards/>
:::details

```vue
<template>
  <div class="card">
    <span class="card-item">赚钱 摸鱼</span>
  </div>
</template>
<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 渐变背景 自上而下 */
  background: linear-gradient(to bottom, #5ca7ba, #6dd5ed);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  font-size: 18px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  /* 盒子阴影 */
  box-shadow: 0px 5px 45px rgba(0, 0, 0, 0.1);
  /* 背景模糊 */
  backdrop-filter: blur(2px);
  /* 加个动画过渡，动画才不会太过生硬 */
  transition: all 0.5s;
  overflow: hidden;
  &:hover {
    /* 鼠标移入元素沿Y轴上移 */
    transform: translateY(-20px);
  }
  /* 加个扫光动画 */
  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 20px;
    height: 100%;
    background-color: #fff;
    /* 元素沿X轴45横切，沿X轴右移150px */
    transform: skewX(45deg) translateX(170px);
    /* 动画过渡 */
    transition: all 0.5s;
  }
  &:hover::before {
    /* 元素沿X轴45横切，沿X轴左移150px */
    transform: skewX(45deg) translateX(-170px);
  }
}
</style>
```

:::

## 4. 炫彩爱心加载动画

<LoveLoading/>

:::details

```vue
<template>
  <div class="heart">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.heart {
  width: 280px;
  height: 220px;
  display: flex;
  justify-content: space-between;
}
.heart span {
  /* 自定义属性值【划重点】 */
  --c: plum;
  --h: 50%;
  --t: 25%;
  /* var()函数用于插入自定义的属性值，如果一个属性值在多处被使用，该方法就很有用 */
  background-color: var(--c);
  width: 20px;
  border-radius: 10px;
  position: relative;
  height: var(--h);
  top: var(--t);
  /* 执行动画 infinite是无限次播放 */
  animation: beating 1s infinite;
}
.heart span:nth-child(1),
.heart span:nth-child(9) {
  --c: lightcoral;
  --h: 60px;
  --t: 44px;
}
.heart span:nth-child(2),
.heart span:nth-child(8) {
  --c: lightskyblue;
  --h: 120px;
  --t: 12px;
}
.heart span:nth-child(3),
.heart span:nth-child(7) {
  --c: lightgreen;
  --h: 160px;
  --t: 0;
}
.heart span:nth-child(4),
.heart span:nth-child(6) {
  --c: gold;
  --h: 180px;
  --t: 16px;
}
.heart span:nth-child(5) {
  --c: plum;
  --h: 188px;
  --t: 32px;
}

/* 接下来我们定义动画 */
@keyframes beating {
  0%,
  30% {
    height: var(--h);
    top: var(--t);
    background-color: var(--c);
    filter: blur(0);
  }
  60%,
  70% {
    height: 50%;
    top: 25%;
    background-color: plum;
    /* 模糊度 */
    filter: blur(5px);
  }
}
</style>
```

:::

## 5. 有趣的加载动画

:::details

```vue
<template>
  <div class="loading">
    <span>拼命加载中</span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading {
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  border-radius: 50%;
  border-top: 10px solid #63a69f;
  /* 相对定位 */
  position: relative;
  /* 执行动画（动画a1 时长 线性的 无限次播放） */
  animation: a1 2s linear infinite;
}
.loading::before,
.loading::after {
  content: "";
  width: 200px;
  height: 200px;
  /* 绝对定位 */
  position: absolute;
  left: 0;
  top: -10px;
  box-sizing: border-box;
  border-radius: 50%;
}
.loading::before {
  border-top: 10px solid #f2e1ac;
  /* 旋转120度 */
  transform: rotate(120deg);
}
.loading::after {
  border-top: 10px solid #f2836b;
  /* 旋转240度 */
  transform: rotate(240deg);
}
.loading span {
  position: absolute;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  /* 执行动画（动画a2 时长 线性的 无限次播放） */
  animation: a2 2s linear infinite;
}

/* 定义动画 */
@keyframes a1 {
  to {
    transform: rotate(360deg);
  }
}
@keyframes a2 {
  to {
    transform: rotate(-360deg);
  }
}
</style>
```

:::

## 6. 菱形加载动画

<RhombusLoading/>

:::details

```vue
<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loading {
  width: 200px;
  height: 200px;
  display: grid;
  /* 制作3列的网格容器 */
  grid-template-columns: repeat(3, 1fr);
  /* 设置行与列之间的间隙 */
  grid-gap: 10px;
  /* 对子部分进行编号 */
  /* counter-reset: number; */
  /* 旋转45度 */
  transform: rotate(45deg);
}
.loading span {
  /* 自定义属性 */
  --c: red;
  /* 调用var函数使用自定义属性--c */
  background-color: var(--c);
  position: relative;
  transform: rotate(0);
  /* 执行动画：动画 时长 线性的 无限次播放 */
  animation: blinking 2s linear infinite;
  /* 动画延迟 */
  animation-delay: var(--d);
}
.loading span::before {
  /* 设置增量 */
  /* counter-increment: number; */
  /* 将编号赋值到content，这里有助于我们根据编号设置样式 */
  /* content: counter(number); */
  color: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
}
.loading span:nth-child(7) {
  --c: #f15a5a;
  --d: 0s;
}
.loading span:nth-child(4),
.loading span:nth-child(8) {
  --c: #f0c419;
  --d: 0.2s;
}
.loading span:nth-child(1),
.loading span:nth-child(5),
.loading span:nth-child(9) {
  --c: #4eba6f;
  --d: 0.4s;
}
.loading span:nth-child(2),
.loading span:nth-child(6) {
  --c: #2d95bf;
  --d: 0.6s;
}
.loading span:nth-child(3) {
  --c: #955ba5;
  --d: 0.8s;
  /* 到这里基本完成了，我们来吧编号去掉吧 */
}

/* 定义动画 缩放 */
@keyframes blinking {
  0%,
  100% {
    transform: scale(0);
  }
  40%,
  80% {
    transform: scale(1);
  }
}
</style>
```

:::

## 7. 炫彩旋转加载动画

<DazzleLoading/>

:::details

```vue
<template>
  <div class="container">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  width: 300px;
  height: 300px;
  /* 相对定位 */
  position: relative;
  /* 弹性布局 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 自定义属性--h 即色相 */
  --h: calc(var(--percent) / 100 * 360);
  /* hsl函数使用色相,饱和度,亮度来定义颜色 */
  color: hsl(var(--h), 100%, 75%);
  /* 执行动画:动画名称 时长 线性的 无限次播放 */
  animation: changecolor 5s linear infinite;
}
.container span {
  /* 绝对定位 */
  position: absolute;
  /* 自定义属性 可通过var函数进行调用 */
  --diameter: calc(50px + (var(--n) - 1) * 30px);
  width: var(--diameter);
  height: var(--diameter);
  border-style: solid;
  /* currentColor代表当前元素被应用上的color颜色值,如果当前元素没有在css里指定一个color值,那它的颜色值就从父级元素继承而来(这里父级元素还没有设置color,所以暂时看不到) */
  border-color: currentColor transparent;
  border-width: 10px 10px 0 0;
  border-radius: 50%;
  /* 执行动画: 动画名称 时长(暂时不设置) 线性的 无限次播放 */
  animation: rotating linear infinite;
  /* 计算并设置动画时长 */
  animation-duration: calc(5s / (9 - var(--n) + 1));
  /* 大致的效果已经出来了,接下来我们来改变颜色 */
}
/* 为每一个span元素设置自定义属性--n */
.container span:nth-child(1) {
  --n: 1;
}
.container span:nth-child(2) {
  --n: 2;
}
.container span:nth-child(3) {
  --n: 3;
}
.container span:nth-child(4) {
  --n: 4;
}
.container span:nth-child(5) {
  --n: 5;
}
.container span:nth-child(6) {
  --n: 6;
}
.container span:nth-child(7) {
  --n: 7;
}
.container span:nth-child(8) {
  --n: 8;
}
.container span:nth-child(9) {
  --n: 9;
}

/* 定义动画 */
/* 旋转 */
@keyframes rotating {
  to {
    /* 1turn表示一圈 */
    transform: rotate(1turn);
  }
}
/* 通过改变自定义属性--percent来改变颜色 */
@keyframes changecolor {
  0%,
  100% {
    --percent: 0;
  }
  10% {
    --percent: 10;
  }
  20% {
    --percent: 20;
  }
  30% {
    --percent: 30;
  }
  40% {
    --percent: 40;
  }
  50% {
    --percent: 50;
  }
  60% {
    --percent: 60;
  }
  70% {
    --percent: 70;
  }
  80% {
    --percent: 80;
  }
  90% {
    --percent: 90;
  }
}
</style>
```

:::

## 8. 鼠标悬停发光按钮，左上右下有边框并延伸

:::details

```vue
<template>
  <div>
    <div class="container">
      <!-- 接下来的有点神奇了哈，划重点哦 -->
      <!-- 这里的--i是一个自定义属性 -->
      <a href="#" style="--i: 1">点赞</a>
      <a href="#" style="--i: 2">关注</a>
      <a href="#" style="--i: 3">评论</a>
      <a href="#" style="--i: 4">收藏</a>
      <a href="#" style="--i: 5">分享</a>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  /* 弹性布局 水平、垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 让子元素垂直排列 */
  flex-direction: column;
  /* 100%窗口宽度、高度 */
  width: 100vw;
  height: 100vh;
  /* 背景径向渐变 */
  background: radial-gradient(circle at center, #555, #000);
}
.container a {
  /* 相对定位 */
  position: relative;
  width: 140px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin: 40px;
  color: plum;
  text-decoration: none;
  font-size: 20px;
  /* 这里加个动画过渡 */
  transition: all 0.3s ease-in-out;
  /* 我们来改变各个a元素的颜色【划重点】 */
  /* 大家看到效果了吧，是不是很神奇 */
  /* hue-rotate是颜色滤镜，可以加不同的度数来改变颜色，这里我们用了calc自动计算函数，以及var函数来调用我们给每一个a元素设置的不同的自定义属性1~5，然后分别乘以60度，就能够分别得到不同的颜色 */
  filter: hue-rotate(calc(var(--i) * 60deg));
}
.container a::before,
.container a::after {
  /* 将两个伪元素的相同样式写在一起 */
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid plum;
  /* 这里也加一个动画过渡 */
  /* 最后的0.3s是延迟时间 */
  transition: all 0.3s ease-in-out 0.3s;
}
.container a::before {
  top: 0;
  left: 0;
  /* 删除左边元素的右、下边框 */
  border-right: 0;
  border-bottom: 0;
}
.container a::after {
  right: 0;
  bottom: 0;
  /* 删除右边元素的左、上边框 */
  border-top: 0;
  border-left: 0;
}
.container a:hover {
  background-color: plum;
  color: #000;
  /* 添加发光效果和倒影 */
  box-shadow: 0 0 50px plum;
  /* below是下倒影 1px是倒影和元素相隔的距离 最后是个渐变颜色 */
  -webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.3));
  /* 这里我们为以上属性设置一下延迟时间 */
  transition-delay: 0.4s;
}

// hover时改变变宽长宽
.container a:hover::before,
.container a:hover::after {
  width: 138px;
  height: 58px;
  /* 这里不需要延迟 */
  transition-delay: 0s;
}
</style>
```

:::

## 9. 文字上变化滚动的颜色效果

:::details

```vue
<template>
  <h1>helloworld</h1>
</template>

<script setup></script>

<style lang="scss" scoped>
h1 {
  color: #333;
  /* 转大写 */
  text-transform: uppercase;
  font-size: 112px;
  /* 相对定位 */
  position: relative;
}
h1::after {
  content: "helloworld";
  /* 颜色为透明 */
  color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    to right,
    #ff69b3,
    #fe0000,
    #ffa401,
    #ffff01,
    #008102,
    #40e1d2,
    #410098,
    #9400d4
  );
  /* 以文字的范围来裁剪背景图片 */
  background-clip: text;
  -webkit-background-clip: text;
  /* 将元素裁剪为一个圆形（100px表示圆的直径，0% 50%表示圆心的位置） */
  clip-path: circle(100px at 0% 50%);
  /* 执行动画（动画 时长 infinite表示无限次播放） */
  animation: light 5s infinite;
}

/* 定义动画 改变圆心的位置 */
@keyframes light {
  0% {
    clip-path: circle(100px at 0% 50%);
  }
  50% {
    clip-path: circle(100px at 100% 50%);
  }
  100% {
    clip-path: circle(100px at 0% 50%);
  }
}
</style>
```

:::

## 10. 发光按钮

:::details

```vue
<template>
  <button class="btn"></button>
</template>

<script setup></script>

<style lang="scss" scoped>
.btn {
  /* 相对定位 */
  position: relative;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 13px;
  color: #fff;
  /* 渐变背景 */
  background: linear-gradient(to right, #03a9f4, #f441a5, #ffeb3b, #09a8f4);
  /* 背景渐变色大小 */
  background-size: 400%;
  /* 圆角 */
  border-radius: 50px;
  z-index: 1;
}
/* 发光效果 */
.btn::before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  bottom: -5px;
  right: -5px;
  /* 渐变背景 */
  background: linear-gradient(to right, #03a9f4, #f441a5, #ffeb3b, #09a8f4);
  /* 背景渐变色大小 */
  background-size: 400%;
  /* 圆角 */
  border-radius: 50px;
  /* 位于按钮之下 */
  z-index: -1;
  /* 设置模糊度 显示发光效果 */
  filter: blur(20px);
}
/* 鼠标移入执行动画 */
.btn:hover {
  /* 动画：名称 时间 infinite是无限次播放 */
  animation: streamer 8s infinite;
}
.btn:hover::before {
  animation: streamer 8s infinite;
}
/* 接下来定义动画 */
@keyframes streamer {
  100% {
    /* 背景位置 */
    background-position: -400% 0;
  }
}
</style>
```

:::
