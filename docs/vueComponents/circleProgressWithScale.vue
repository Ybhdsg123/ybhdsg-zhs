<template>
  <view class="circle-progress-with-Scale">
    <view class="scale">
      <view class="big-circle" ref="bigCircleRef">
        <view class="small-circle">
          <!-- 内部文字 -->
          <view name="infoText" class="temp-num">
            {{ rotVal }}
            <text class="temp-unit">{{ unit }}</text>
          </view>
        </view>
        <!-- 刻度条 -->
        <view
          v-for="(obj, index) in scaleLines"
          :key="obj.rotateNum"
          :class="[
            'scale-line',
            scaleNums >= index ? 'active-line' : 'not-active-line',
          ]"
          :style="{
            transform: `rotate(${obj.rotateNum}deg) translate(${scaleLineTranslateX}, -50%) `,
          }"
        />
        <!-- 移动的刻度按钮只是这个大的正方形上的按钮，旋转的其实是大正方形而已-->
        <view
          class="scale-line-btn-box"
          @touchmove="touchMoveHandler"
          @touchend="touchEndHandler"
          :style="'transform: rotate(' + arcNow + 'deg);'"
          id="scaleBtnRef"
        />
        <!-- 最低最高温度展示 -->
        <text class="min-temp">{{ minVal + unit }}</text>
        <text class="max-temp">{{ maxVal + unit }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    name: {
      // 名称
      type: String,
      default: "浓度",
    },
    unit: {
      // 单位
      type: String,
      default: "°c",
    },
    // 最大值
    maxVal: {
      type: Number,
      default: 30,
    },
    // 最小值
    minVal: {
      // 初始值
      type: Number,
      default: 16,
    },
    //  x轴方向的偏移量
    scaleLineTranslateX: {
      type: String,
      default: "210rpx",
    },
    // 初始值
    initVal: {
      // 初始值
      type: Number,
      default: 16,
    },
    // 刻度数量 这里28 是因为 最高温度 - 最低温度差值，自己看怎么合适计算
    scaleLineNums: {
      type: Number,
      default: 28,
    },
  },
  data() {
    return {
      scaleLines: [], // 刻度值旋转数组
      arcNow: 0, // 旋转的角度
      rotVal: 21, // 温度 =》 当前值
      step: 0, // 步长 =》
      halfX: 0,
      halfY: 0,
      centerX: 0, // 中心点 x
      centerY: 0, // 中心点 y
      scaleNums: 0,
    };
  },
  mounted() {
    const lines = this.createLine();
    this.scaleLines = lines.reverse();
    // 半圈计算的最终值貌似不太准，不为 180°，用了174°
    // 步长 = 174 / (最大值 - 最小值)
    this.step = Math.min(174 / (this.maxVal - this.minVal));
    console.log(this.step, "步长");
    setTimeout(() => {
      // 获取元素
      let view = uni.createSelectorQuery().in(this).select("#scaleBtnRef");
      view
        .boundingClientRect((data) => {
          // 旋转元素的中心点坐标
          this.centerX = data.left + data.width / 2;
          this.centerY = data.top + data.height / 2;
          // 旋转元素的半径
          this.halfX = data.width / 2;
          this.halfY = data.height / 2;
          // 当前旋转的角度
          this.arcNow = (this.initVal - this.minVal) * this.step;
          // console.log(this.arcNow, "当前旋转的角度");
          this.scaleNums = ((this.arcNow / 174) * this.scaleLineNums).toFixed(
            0
          );
          console.log(this.scaleNums);
          // 当前值默认为初始值
          this.rotVal = this.initVal;
        })
        .exec();
    }, 100);
  },
  methods: {
    // 创建刻度条
    createLine() {
      // 刻度总数
      // 如果为一圈的话就用 360/this.scaleLineNums , 下半圈为180/this.scaleLineNums, 上半圈为 360 - 180 / this.scaleLineNums;
      // 算出夹角的度数
      var g = 360 - 180 / this.scaleLineNums;
      let result = [];
      for (var a = 0; a < this.scaleLineNums; a++) {
        result.push({
          // a*g当前刻度与x轴的夹角
          rotateNum: a * g,
        });
      }
      return result;
    },
    touchMoveHandler(e) {
      this.getAngle(e);
    },
    touchEndHandler(e) {
      this.getAngle(e);
      this.$emit("getTemp", this.rotVal);
    },
    getAngle(e) {
      let nowX = e.changedTouches[0].clientX;
      let nowY = e.changedTouches[0].clientY;
      let arcNow = 0;
      // x方向 在左还是右
      let xDis = nowX <= this.centerX;
      // y方向 在上还是下
      let yDis = nowY <= this.centerY;
      // 当前距离 <= 当前中心点位置 左边，否在右边
      if (xDis) {
        if (yDis) {
          arcNow =
            85 +
            (Math.atan((this.centerX - nowX) / (nowY - this.centerY)) * 180) /
              3.14159;
          // console.log("左上", arcNow);
        } else {
          arcNow =
            (Math.atan((this.centerX - nowX) / (this.centerY - nowY)) * 180) /
            3.14159;
          // console.log("左下", arcNow);
        }
        // console.log("左边");
      } else {
        if (yDis) {
          arcNow =
            85 -
            (Math.atan((this.centerX - nowX) / (this.centerY - nowY)) * 180) /
              3.14159;
          // console.log("右上", arcNow);
        } else {
          arcNow =
            295 +
            (Math.atan((this.centerX - nowX) / (nowY - this.centerY)) * 180) /
              3.14159;
          // console.log("右下", arcNow);
        }
        // console.log("右边");
      }
      // 角度
      this.arcNow = arcNow <= 0 ? 0 : arcNow >= 174 ? 174 : arcNow;
      console.log(this.arcNow);
      // 刻度数量
      this.scaleNums = ((arcNow / 174) * this.scaleLineNums).toFixed(0);
      console.log(this.scaleNums);
      // 温度值
      const temp = Math.floor(
        (arcNow * (this.maxVal - this.minVal)) / 174 + this.minVal
      ).toFixed(0);
      this.rotVal =
        temp <= this.minVal
          ? this.minVal
          : temp >= this.maxVal
          ? this.maxVal
          : temp;
    },
  },
};
</script>

<style lang="scss" scoped>
.circle-progress-with-Scale {
  // 外圈圆
  .big-circle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 364rpx;
    height: 364rpx;
    background: linear-gradient(148deg, #ffffff 0%, #fcf9f4 100%);
    box-shadow: -10rpx 0rpx 50rpx 0rpx rgba(196, 182, 164, 0.3);
    border-radius: 50%;
    // 内圈圆
    .small-circle {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 286rpx;
      height: 286rpx;
      background: #ffffff;
      box-shadow: -8rpx 7rpx 30rpx 0rpx rgba(225, 220, 213, 0.5);
      border-radius: 50%;
      .temp-num {
        font-size: 50rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
      }
    }
    // 刻度
    .scale-line {
      position: absolute;
      left: 50%;
      top: 50%;
      // transform-origin: left center;
      // background-color: #d5b792;
      width: 12rpx;
      height: 4rpx;
    }
    // 刻度条颜色
    .not-active-line {
      background-color: #ded7cf;
    }
    .active-line {
      background-color: #d5b792;
    }
    // 刻度按钮
    .scale-line-btn-box {
      position: absolute;
      left: 0rpx;
      top: 0rpx;
      width: 364rpx;
      height: 364rpx;
      border-radius: 50%;
      &:before {
        content: "";
        position: absolute;
        left: -24rpx;
        top: 40%;
        width: 0rpx;
        height: 0rpx;
        border: 16rpx solid transparent;
        border-right-color: #d5b792;
      }
      &::after {
        content: "";
        position: absolute;
        left: 20rpx;
        top: 44%;
        width: 6rpx;
        height: 6rpx;
        background-color: #d3b794;
      }
    }
    // 最低最高温度
    .min-temp {
      position: absolute;
      left: -80rpx;
      top: 50%;
      font-weight: 500;
      color: #999999;
    }
    .max-temp {
      position: absolute;
      right: -80rpx;
      top: 55%;
      font-weight: 500;
      color: #999999;
    }
  }
}
</style>
