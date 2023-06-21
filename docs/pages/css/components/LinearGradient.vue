<template>
  <div>
    1. 背景色渐变画三角形
    <div class="bg-triangles" />
  </div>
  <div>
    2. 背景色渐变画内切四边形
    <div class="notching" />
  </div>
  <div>
    3. repeating-linear-gradient 画进度条
    <div class="process" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
$color: #0396ff;
// 背景色渐变画三角形
.bg-triangles {
  width: 50px;
  height: 50px;
  background: linear-gradient(
    45deg,
    $color 0%,
    $color 50%,
    transparent 50%,
    transparent 100%
  );
}

// 背景色画内切四边形
.notching {
  width: 80px;
  height: 80px;
  // 透明色渐变大小为具体值 不受background-size大小影响
  background: linear-gradient(135deg, transparent 5px, $color 0),
    linear-gradient(-135deg, transparent 5px, $color 0),
    linear-gradient(-45deg, transparent 5px, $color 0),
    linear-gradient(45deg, transparent 5px, $color 0);
  // 完整写法 background-size: 50% 50%,50% 50%,50% 50%,50% 50%;
  // 这里定义渐变背景色的大小，为宽度和高度的 50%，四个渐变背景色大小加起来 === 容器的大小
  background-size: 50% 50%;
  // 依次对应上方四个渐变背景色的位置
  background-position: top left, top right, bottom right, bottom left;
  background-repeat: no-repeat;
}

// repeating-linear-gradient
.process {
  width: 200px;
  height: 30px;
  border-radius: 6px;
  background: repeating-linear-gradient(
    45deg,
    $color,
    $color 11px,
    transparent 11px,
    transparent 20px
  );
}
</style>
