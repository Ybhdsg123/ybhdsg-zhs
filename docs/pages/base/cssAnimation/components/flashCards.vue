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
  /* 渐变背景  */
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  color: #fff;
  width: 90px;
  height: 90px;
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
