<template>
  <view class="air">
    <view class="air-top">
      <view class="air-top-inner">
        <view class="circle-out">
          <view class="circle">
            <!-- 						:style="{ background: bgcolor, '--colorbefore': colorbefore, '--colorafter': colorafter }" -->
            <view class="circle-inner-back"></view>
          </view>
          <view
            class="circle-inner"
            id="sliderCircle"
            @touchmove="touchMove"
            @touchend="touchEnd"
            :style="'transform: rotate(' + arcNow + 'deg);'"
          ></view>
          <!-- 中间上方内容 -->
          <slot name="numSlot">
            <view class="circle-num">
              {{ rotVal }}
              <text>{{ unit }}</text>
            </view>
          </slot>
          <!-- 中间下方内容 -->
          <slot name="titleSlot">
            <!-- <view class="circle-name">{{ name }}</view> -->
            <image
              src="/static/image/eq/lightIcon.png"
              mode="widthFix"
              class="img"
            />
          </slot>
          <view class="circle-mini">{{ minVal }}{{ unit }}</view>
          <view class="circle-max">{{ maxVal }}{{ unit }}</view>
        </view>
      </view>
      <view v-if="showBtn" class="control-icon reduce-icon" @click="decrease()"
        >-</view
      >
      <view v-if="showBtn" class="control-icon add-icon" @click="increase()"
        >+</view
      >
    </view>
  </view>
</template>

<script>
export default {
  props: {
    showBtn: {
      type: Boolean,
      default: false,
    },
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
    minVal: {
      // 最小
      type: Number,
      default: 16,
    },
    maxVal: {
      // 最大
      type: Number,
      default: 28,
    },
    initVal: {
      // 初始值
      type: Number,
      default: 20,
    },
    step: {
      // 初始值
      type: Number,
      default: 1,
    },
    action: {
      type: Function,
    },
    bgcolor: {
      type: String,
      default: " linear-gradient(to right, #F9EAD3, #D5B792)",
    },
    colorbefore: {
      type: String,
      default: " linear-gradient(to right, #F9EAD3, #D5B792)",
    },
    colorafter: {
      type: String,
      default: " linear-gradient(to right, #F9EAD3, #D5B792)",
    },
  },
  data() {
    return {
      arcNow: 0, // 角度
      rotVal: 21, // 温度
      halfX: 0,
      halfY: 0,
      centerX: 0,
      centerY: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      // 获取元素
      let view = uni.createSelectorQuery().in(this).select("#sliderCircle");
      view
        .boundingClientRect((data) => {
          this.centerX = data.left + data.width / 2;
          this.centerY = data.top + data.height / 2;

          this.halfX = data.left + data.width / 2;
          this.halfY = data.top;

          this.arcNow =
            (360 * (this.initVal - this.minVal)) / (this.maxVal - this.minVal);
          this.rotVal = this.initVal;
        })
        .exec();
    }, 100);
  },
  methods: {
    touchMove(e) {
      this.drawMiniCircle(e);
    },
    touchEnd(e) {
      this.drawMiniCircle(e);
      this.$emit("getTemp", this.rotVal);
      //   this.action();
    },
    // 减少
    decrease() {
      let value = (Number(this.rotVal) - this.step).toFixed(0);
      if (value < this.minVal) return;
      this.rotVal = Math.floor(value * 10) / 10; //取一位小数
      this.arcNow =
        (268 * (this.rotVal - this.minVal)) / (this.maxVal - this.minVal);

      //todo
      //   this.action();
    },
    // 增加
    increase() {
      let value = (Number(this.rotVal) + this.step).toFixed(0);
      if (value > this.maxVal) return;
      this.rotVal = Math.floor(value * 10) / 10; //取一位小数
      this.arcNow =
        (268 * (this.rotVal - this.minVal)) / (this.maxVal - this.minVal);
      //todo
      //   this.action();
    },

    drawMiniCircle(e) {
      let nowX = e.changedTouches[0].clientX;
      let nowY = e.changedTouches[0].clientY;

      let arcNow = 0;
      if (nowX <= this.centerX) {
        let yDis = nowY - this.centerY;
        if (yDis > 0) {
          arcNow =
            180 -
            (180 -
              (Math.atan((this.centerX - nowX) / (nowY - this.centerY)) * 180) /
                3.14159);
          //   console.log("左上");
        }

        if (yDis < 0) {
          arcNow =
            180 -
            (Math.atan((this.centerX - nowX) / (this.centerY - nowY)) * 180) /
              3.14159;
          //   console.log("左下");
        }
      } else {
        let yDis = nowY - this.centerY;
        if (yDis > 0) {
          //   console.log("右上");
          arcNow =
            180 +
            (180 -
              (Math.atan((this.centerX - nowX) / (this.centerY - nowY)) * 180) /
                3.14159);
        }
        if (yDis < 0) {
          //   console.log("右下");
          arcNow =
            180 +
            (Math.atan((this.centerX - nowX) / (nowY - this.centerY)) * 180) /
              3.14159;
        }
      }
      console.log(arcNow);
      let changeValue =
        Math.floor(
          ((arcNow * (this.maxVal - this.minVal)) / 268 + this.minVal) * 10
        ) / 10;
      if (changeValue <= this.maxVal && changeValue >= this.minVal) {
        this.arcNow = arcNow;
        // this.rotVal =
        //   Math.floor(
        //     ((arcNow * (this.maxVal - this.minVal)) / 268 + this.minVal) * 10
        //   ) / 10; //取一位小数
        this.rotVal = Math.floor(
          (arcNow * (this.maxVal - this.minVal)) / 268 + this.minVal
        ).toFixed(0); //取一位小数
      }

      //todo
    },
  },
};
</script>

<style lang="scss">
.air-top {
  width: 660rpx;
  height: 428rpx;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  .control-botton {
    position: absolute;
    right: 30rpx;
    top: 26rpx;
  }

  .control-icon {
    position: absolute;
    width: 106rpx;
    height: 56rpx;
    line-height: 56rpx;
    top: 50%;
    margin-top: -28rpx;
    box-shadow: 0 0 6rpx rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 24rpx;
    font-size: 50rpx;
  }

  .reduce-icon {
    left: 0;
  }

  .add-icon {
    right: 0;
  }

  .air-top-inner {
    width: 328rpx;
    height: 328rpx;
    margin: 48rpx auto 0 auto;
    background: radial-gradient(circle at center, #eedac1, #fff 100%);
    // background: #d5b792;
    box-shadow: 2rpx 2rpx 2rpx eedac1;
    // backdrop-filter: blur(20px);
    border-radius: 50%;
  }
}

.circle-out {
  width: 328px;
  height: 328px;
  position: relative;
  border-radius: 50%;
  border: 2rpx solid #dcdcdc;
}

.circle {
  width: 214rpx;
  height: 214rpx;
  border-radius: 50%;
  // background: #d5b792;
  // filter: blur(20px);
  border: 1px solid #dcdcdc;
  // background: linear-gradient(to right, #80e2f5, #5175e9);
  overflow: hidden;
  position: relative;
}

// .circle::before {
//   width: 48rpx;
//   height: 48rpx;
//   border-radius: 50%;
//   content: "";
//   position: absolute;
//   // background: linear-gradient(to right, #7bd7f3, #77cef2);
//   // background: var(--colorbefore);
//   left: 23rpx;
//   top: 235rpx;
//   z-index: 2;
// }

// .circle::after {
//   width: 48rpx;
//   height: 48rpx;
//   border-radius: 50%;
//   content: "";
//   position: absolute;
//   // background: linear-gradient(to right, #5a8aec, #5580ea);
//   // background: var(--colorafter);
//   right: 23rpx;
//   top: 235rpx;
//   z-index: 2;
// }

.circle-inner {
  width: 280rpx;
  height: 280rpx;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  margin-left: -140rpx;
  top: 50%;
  margin-top: -140rpx;
  z-index: 3;
  border: 2rpx solid #dcdcdc;
  //滑动延迟
  // transition: all .5s linear;
}

.circle-inner::before {
  position: absolute;
  left: 0;
  bottom: 0;
  content: "";
  width: 16px;
  height: 16px;
  background: #f0dcc4;
  border: 3px solid #894411;
  border-radius: 50%;
  // 滑动剪头图标
  // background: url('data:image/png;base64,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')
  // 	no-repeat;
  // background-size: 100% 100%;
}

.circle-inner-back {
  position: absolute;
  width: 100%;
  height: 20%;
  background: #fff;
  left: 0;
  bottom: 0;
}

.circle-num {
  //   line-height: 90rpx;
  text-align: center;
  color: #333;
  font-size: 50rpx;
  position: absolute;
  // width: 40%;
  // left: 30%;
  //   top: 90rpx;
  z-index: 4;
}

.circle-num text {
  font-size: 42rpx;
  color: #bbb;
}

.img {
  width: 22px;
  height: 22px;
}

.circle-name {
  height: 56rpx;
  line-height: 56rpx;
  color: #000000;
  font-size: 28rpx;
  text-align: center;
  position: absolute;
  width: 40%;
  left: 30%;
  top: 150rpx;
  z-index: 4;
}

.circle-mini {
  // width: 120rpx;
  width: 50%;
  height: 54rpx;
  line-height: 54rpx;
  text-align: center;
  color: #000000;
  font-size: 28rpx;
  left: 0;
  bottom: -20rpx;
  position: absolute;
  font-weight: bold;
  background: #fff;
  box-shadow: 2rpx 2rpx 2rpx 4rpx #fff;
}

.circle-max {
  // width: 120rpx;
  width: 50%;
  height: 54rpx;
  line-height: 54rpx;
  text-align: center;
  color: #000000;
  font-size: 28rpx;
  right: 0;
  bottom: -20rpx;
  position: absolute;
  font-weight: bold;
  background: #fff;
  box-shadow: 2rpx 2rpx 2rpx 4rpx #fff;
}

.circle-out {
  width: 328rpx;
  height: 328rpx;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
