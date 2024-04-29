<template>
  <view class="slider-range" :class="{ disabled: disabled }" :style="{
    paddingLeft: blockSize / 2 + 'px',
    paddingRight: blockSize / 2 + 'px',
  }">
    <!-- 选中价格展示 -->
    <view class="slider-value" v-if="rangeValueVisible">
      <view class="slider-label">{{ rangeValueText }}</view>
      <view class="value">{{ showValueText }}</view>
    </view>
    <!-- 滑块差距数值显示 -->
    <view class="range-gap-nums">
      <view class="min">{{ format(min) }}</view>
      <view class="min">{{ format(max) }} +</view>
    </view>
    <view class="slider-range-inner" :style="{ height: height + 'px' }">
      <!-- 滑块轨道 -->
      <view class="slider-bar" :style="{ height: barHeight + 'px' }">
        <!-- 背景条 -->
        <view class="slider-bar-bg" :style="{
          backgroundColor: backgroundColor,
        }"></view>

        <!-- 滑块实际区间 -->
        <view class="slider-bar-inner" :style="{
          width: ((values[1] - values[0]) / (max - min)) * 100 + '%',
          left: lowerHandlePosition + '%',
          backgroundColor: activeColor,
        }"></view>
      </view>

      <!-- 滑动块-左 -->
      <view class="slider-handle-block" :class="{ decoration: decorationVisible }" :style="{
        backgroundColor: blockColor,
        width: blockSize + 'px',
        height: blockSize + 'px',
        left: lowerHandlePosition + '%',
      }" @touchstart="_onTouchStart" @touchmove="_onBlockTouchMove" @touchend="_onBlockTouchEnd" data-tag="lowerBlock"
        v-if="!isSingleRange">
        <!-- 滑动显示得tip -->
        <view class="price" v-show="tag === 'lowerBlock' && isShowTip">{{
          format(values[0])
        }}</view>
      </view>

      <!-- 滑动块-右 -->
      <view class="slider-handle-block" :class="{ decoration: decorationVisible }" :style="{
        backgroundColor: blockColor,
        width: blockSize + 'px',
        height: blockSize + 'px',
        left: higherHandlePosition + '%',
      }" @touchstart="_onTouchStart" @touchmove="_onBlockTouchMove" @touchend="_onBlockTouchEnd"
        data-tag="higherBlock">
        <!-- 滑动显示得tip -->
        <view class="price" v-show="tag === 'higherBlock' && isShowTip">
          {{ format(values[1]) }}
        </view>
      </view>

      <!-- 滑块值移动提示 -->
      <view v-if="tipVisible" class="range-tip" :style="lowerTipStyle">{{
        format(values[0])
      }}</view>
      <view v-if="tipVisible" class="range-tip" :style="higherTipStyle">{{
        format(values[1])
      }}</view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    //滑块区间当前取值
    currentValue: {
      type: Array,
      default: function () {
        return [0, 1000];
      },
    },
    //最小值
    min: {
      type: Number,
      default: 0,
    },
    //最大值
    max: {
      type: Number,
      default: 1200,
    },
    // 步长
    step: {
      type: Number,
      default: 50,
    },
    // 单滑块
    isSingleRange: {
      type: Boolean,
      default: false,
    },
    // 值格式化
    format: {
      type: Function,
      default: function (val) {
        return "￥" + val;
      },
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    //滑块容器高度
    height: {
      height: Number,
      default: 40,
    },
    //区间进度条高度
    barHeight: {
      type: Number,
      default: 3,
    },
    //背景条颜色
    backgroundColor: {
      type: String,
      default: "#e9e9e9",
    },
    //已选择的颜色
    activeColor: {
      type: String,
      default: "#199B46",
    },
    //滑块大小
    blockSize: {
      type: Number,
      default: 20,
    },
    // 滑块颜色
    blockColor: {
      type: String,
      default: "#fff",
    },
    // 是否在滑动时显示信息
    tipVisible: {
      type: Boolean,
      default: false,
    },
    // 滑块值显示
    rangeValueVisible: {
      type: Boolean,
      default: true,
    },
    // 滑块值显示
    rangeValueText: {
      type: String,
      default: "价格：",
    },
    // 滑块样式
    decorationVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      values: [this.min, this.max],
      startDragPos: 0, // 开始拖动时的坐标位置
      startVal: 0, //开始拖动时较小点的值
      isShowTip: false, // 显示滑块值提示
      tag: "lowerBlock", // 当前是那个滑块
    };
  },
  computed: {
    // 较小点滑块的坐标
    lowerHandlePosition() {
      return ((this.values[0] - this.min) / (this.max - this.min)) * 100;
    },
    // 较大点滑块的坐标
    higherHandlePosition() {
      return ((this.values[1] - this.min) / (this.max - this.min)) * 100;
    },
    lowerTipStyle() {
      if (this.lowerHandlePosition < 90) {
        return `left: ${this.lowerHandlePosition}%;`;
      }
      return `right: ${100 - this.lowerHandlePosition
        }%;transform: translate(50%, -100%);`;
    },
    higherTipStyle() {
      if (this.higherHandlePosition < 90) {
        return `left: ${this.higherHandlePosition}%;`;
      }
      return `right: ${100 - this.higherHandlePosition
        }%;transform: translate(50%, -100%);`;
    },
    // 展示选中得文本
    showValueText() {
      if (!this.rangeValueVisible) return;
      const minValue = this.format(this.values[0]);
      const maxValue = this.format(this.values[1]);
      // 如果最大值没动，则只展示最小值 100以上
      // 如果最小值没动，则只展示最大值 1000以下
      if (this.values[0] === this.min && this.values[1] === this.max) {
        return "";
      } else if (this.values[1] - this.values[0] == this.step) {
        return this.values[1] + "以上";
      } else if (this.values[0] === this.min) {
        return maxValue + "以下";
      } else {
        return [minValue, this.values[1]].join(" ~ ");
      }
    },
  },
  watch: {
    //滑块当前值
    currentValue: {
      immediate: true,
      handler(newVal, oldVal) {
        if (
          this._isValuesValid(newVal) &&
          (newVal[0] !== this.values[0] || newVal[1] !== this.values[1])
        ) {
          this._updateValue(newVal);
        }
      },
    },
  },
  methods: {
    _updateValue(newVal) {
      // console.log("currentValue", newVal);
      // 步长大于区间差，或者区间最大值和最小值相等情况
      if (this.step >= this.max - this.min) {
        throw new RangeError("Invalid slider step or slider range");
      }

      let newValues = [];
      if (Array.isArray(newVal)) {
        newValues = [newVal[0], newVal[1]];
      }
      if (typeof newValues[0] !== "number") {
        newValues[0] = this.values[0];
      } else {
        newValues[0] =
          Math.round((newValues[0] - this.min) / this.step) * this.step +
          this.min;
      }
      if (typeof newValues[1] !== "number") {
        newValues[1] = this.values[1];
      } else {
        newValues[1] =
          Math.round((newValues[1] - this.min) / this.step) * this.step +
          this.min;
      }

      // 新值与原值相等，不做处理
      if (this.values[0] === newValues[0] && this.values[1] === newValues[1]) {
        return;
      }
      // 左侧滑块值小于最小值时，设置为最小值
      if (newValues[0] < this.min) {
        newValues[0] = this.min;
      }
      // 右侧滑块值大于最大值时，设置为最大值
      if (newValues[1] > this.max) {
        newValues[1] = this.max;
      }
      // 两个滑块重叠或左右交错，使两个滑块保持最小步长的间距
      if (newValues[0] >= newValues[1]) {
        // 左侧未动，右侧滑块滑到左侧滑块之左
        if (newValues[0] === this.values[0]) {
          newValues[1] = newValues[0] + this.step;
        } else {
          // 右侧未动， 左侧滑块滑到右侧之右
          newValues[0] = newValues[1] - this.step;
        }
      }

      this.values = newValues;
      this.$emit("change", this.values);
    },
    _onTouchStart: function (event) {
      if (this.disabled) {
        return;
      }

      this.isDragging = true;
      // this.isShowTip = true;
      this.tag = event.target.dataset.tag;
      //兼容h5平台及某版本微信
      let e = event.changedTouches ? event.changedTouches[0] : event;
      this.startDragPos = e.pageX;

      this.startVal =
        this.tag === "lowerBlock" ? this.values[0] : this.values[1];
    },
    _onBlockTouchMove: function (e) {
      if (this.disabled) {
        return;
      }
      // this.isShowTip = true;
      this._onDrag(e);
    },
    _onBlockTouchEnd: function (e) {
      if (this.disabled) {
        return;
      }
      this.isDragging = false;
      this.isShowTip = false;
      this._onDrag(e);
    },
    _onDrag(event) {
      if (!this.isDragging) {
        return;
      }
      let view = uni
        .createSelectorQuery()
        .in(this)
        .select(".slider-range-inner");

      view
        .boundingClientRect((data) => {
          let sliderWidth = data.width;
          const tag = event.target.dataset.tag;
          let e = event.changedTouches ? event.changedTouches[0] : event;
          let diff =
            ((e.pageX - this.startDragPos) / sliderWidth) *
            (this.max - this.min);
          let nextVal = this.startVal + diff;
          if (tag === "lowerBlock") {
            this._updateValue([nextVal, null]);
          } else {
            this._updateValue([null, nextVal]);
          }
        })
        .exec();
    },
    _isValuesValid: function (values) {
      return Array.isArray(values) && values.length == 2;
    },
  },
};
</script>

<style scoped>
.slider-range {
  position: relative;
  padding-top: 20rpx;
  font-family: PingFang SC, PingFang SC;
}

.slider-value {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  color: #333;
}

.slider-label {
  font-weight: 700;
  font-size: 28rpx;
  color: #000000;
}

.slider-value .value {
  font-weight: bold;
  font-size: 24rpx;
  color: #166833;
}

.range-gap-nums {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 28rpx;
  color: #666666;
  margin: 10rpx 0rpx;
}

.slider-range-inner {
  position: relative;
  width: 100%;
}

.slider-range.disabled .slider-bar-inner {
  opacity: 0.35;
}

.slider-range.disabled .slider-handle-block {
  cursor: not-allowed;
}

.slider-bar {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.slider-bar-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10000px;
  z-index: 10;
}

.slider-bar-inner {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10000px;
  z-index: 11;
}

.slider-handle-block {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow: 0 0 3px 2px rgba(227, 229, 241, 0.5);
  z-index: 12;
  border: 2rpx solid #199b46;
}

.slider-handle-block .price {
  position: absolute;
  top: -100rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 60rpx;
  height: 60rpx;
  font-size: 24rpx;
  padding: 5rpx;
  line-height: 60rpx;
  text-align: center;
  border-radius: 30%;
  background: #f40;
  color: #fff;
}

.slider-handle-block .price::before {
  content: "";
  position: absolute;
  bottom: -30rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 0rpx;
  height: 0rpx;
  border: 20rpx solid transparent;
  border-top: 20rpx solid #f40;
}

.slider-handle-block.decoration::before {
  position: absolute;
  content: "";
  width: 6rpx;
  height: 24rpx;
  top: 50%;
  left: 29%;
  transform: translateY(-50%);
  background: #eeedf2;
  border-radius: 3rpx;
  z-index: 13;
}

.slider-handle-block.decoration::after {
  position: absolute;
  content: "";
  width: 6rpx;
  height: 24rpx;
  top: 50%;
  right: 29%;
  transform: translateY(-50%);
  background: #eeedf2;
  border-radius: 3rpx;
  z-index: 13;
}

.range-tip {
  position: absolute;
  top: 0;
  font-size: 24rpx;
  color: #666;
  transform: translate(-50%, -100%);
}
</style>
