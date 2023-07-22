<template>
  <div>
    1. 角向渐变实现色相环
    <div class="ranbow" />
    2. 角向渐变实现
    <div class="bar" />
    3. 角向渐变配合background-size实现贴图
    <div class="poster">
      <div class="poster-one" />
      <div class="poster-two" />
    </div>
    4. 重复角向渐变 repeating-conic-gradient
    <div class="repeating-conic-gradient" />
    <!-- 5. 设置背景图片的大小，默认平铺
    <div class="demo" /> -->
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
$colors: ();
$colorsTotal: 20;

// 1. 角向渐变实现色相环
// to：不包含 end($colorsTotal)，through：包含end($colorsTotal)
@for $i from 0 through $colorsTotal {
  // comma:列表项以逗号分隔，space:列表项以空格分隔
  $colors: append($colors, hsl($i * (360deg / $colorsTotal), 100%, 50%), comma);
}
.ranbow {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient($colors);
}

// 2. 实现饼图
.bar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(red 0 30%, green 0 60%, blue 0 100%);
}

// 3. 贴图
.poster {
  display: flex;
}
.poster-one,
.poster-two {
  width: 90px;
  height: 90px;
  border: 1px solid #000;
  background: conic-gradient(
    #000 0 12.5%,
    #fff 0 37.5%,
    #000 0 62.5%,
    #fff 62.6% 87.5%,
    #000 0 100%
  );
  margin-right: 30px;
}
.poster-two {
  // 设置背景图片的大小，默认平铺
  background-size: 30px 30px;
}

// 4. 重复角向渐变
.repeating-conic-gradient {
  width: 90px;
  height: 90px;
  background: repeating-conic-gradient(deeppink 0 15deg, yellowgreen 0 30deg);
}

// demo
.demo {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  background: conic-gradient(
    from 270deg at 50px 50px,
    pink 0 90deg,
    transparent 0 360deg
  );
}
</style>
