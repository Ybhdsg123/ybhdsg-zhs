<template>
  1. 在衔接处，适当留出一些渐变空间，消除锯齿
  <div class="eliminate-jaggies" />
  2. 实现优惠券
  <div class="coupon">99</div>
  <div class="wave">99</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$color: #0396ff;
$color-coupon: #f49714;
// 消除锯齿
.eliminate-jaggies {
  width: 50px;
  height: 50px;
  background: radial-gradient($color 0%, $color 30%, green 30.3%, green 100%);
}

// 优惠券 coupon
.coupon {
  position: relative;
  width: 400px;
  height: 130px;
  margin: 20px auto;
  font-size: 60px;
  line-height: 130px;
  padding-left: 60px;
  color: #fff;
  // box-sizing: border-box;
  cursor: pointer;
  background-image: 
  // 圆形从 左边 1px 8px 开始
    radial-gradient(
      circle at 1px 8px,
      transparent 6px,
      $color-coupon 6px,
      $color-coupon 0px
    ),
    // 圆形从距离 左边 199px 8px  开始
    radial-gradient(
        circle at 199px 8px,
        transparent 6px,
        $color-coupon 6px,
        $color-coupon 0px
      );
  // 每一个渐变背景色的 宽高，这里 宽度 = 容器宽度/2，高度为 18px，会重复铺
  background-size: 200px 16px;
  // 依次对应每个 径向渐变 的位置
  // 第一个径向渐变的位置 0 0，
  // 第二个位置为 容器宽度/2的位置 开始，正好 === 渐变背景色大小宽度
  background-position: 0 0, 200px 0;
  // y轴上重复，x轴不重复
  background-repeat: repeat-y;
  &:before {
    content: "";
    position: absolute;
    left: 200px;
    top: 0;
    bottom: 0;
    width: 0;
    border: 1px dashed #fff;
  }
  &:after {
    content: "立即领取";
    position: absolute;
    width: 90px;
    line-height: 40px;
    font-size: 40px;
    letter-spacing: 3px;
    top: 50%;
    right: 2%;
    transform: translate(-50%, -50%);
  }
}
// 优惠券 wave
.wave {
  position: relative;
  width: 400px;
  height: 130px;
  margin: 20px auto;
  line-height: 130px;
  padding-left: 60px;
  font-size: 60px;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  box-sizing: border-box;
  font-weight: 700;
  // 线性渐变背景色
  background: linear-gradient(90deg, #945700 0%, $color-coupon 100%);
  // filter
  filter: drop-shadow(-7px 4px 3px #333);
  // 文字阴影
  text-shadow: -2px -2px 2px #333;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  }
  &:before {
    width: 10px;
    background-image: radial-gradient(
      circle at -5px 10px,
      transparent 12px,
      #fff 13px,
      #fff 0px
    );
    background-size: 20px 20px;
    background-position: 0 15px;
  }
  &::after {
    width: 15px;
    background-image: radial-gradient(
      circle at 15px 10px,
      #fff 12px,
      transparent 13px,
      transparent 0px
    );
    background-size: 20px 40px;
    background-position: 0 15px;
  }
}
</style>
