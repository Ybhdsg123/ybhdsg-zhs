<template>
  <view
    class="custom-navigation"
    :style="[{ height: getHeight() + 'rpx' }, { background: background }]"
  >
    <!-- 顶部状态栏 -->
    <view
      class="status-bar"
      :style="[
        { height: statusBarHeight + 'px' },
        { background: statusbarBackground },
      ]"
    />

    <view :style="[{ background: titleBackground }]">
      <!-- 标题栏 -->
      <view class="title-bar" :style="[{ height: titleHeight + 'px' }]">
        <view class="title-item title-bar-left">
          <text
            :style="[{ color: backColor }]"
            v-if="back"
            class="iconfont icon-fanhui"
            @click="handleBack"
          />
        </view>
        <view class="title-item title-bar-center">
          <text :style="[{ color: titleColor }]">{{ title }}</text>
        </view>
        <view class="title-item">
          <text></text>
        </view>
      </view>
      <!-- 多余的高度 装饰顶部栏 -->
      <view
        class="navigation-unnecessary"
        :style="[{ height: unnecessaryHeight + 'px' }]"
      ></view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    statusbarBackground: {
      type: String,
      default: "#fff",
    },
    titleBackground: {
      type: String,
      default: "#fff",
    },
    background: {
      type: String,
      default: "#4980fa",
    },
    // 是否展示返回图标
    back: {
      type: Boolean,
      default: true,
    },
    // 自定义返回按钮的点击事件，会覆盖默认的返回按钮的点击事件
    isCustomBackFn: {
      type: Boolean,
      default: false,
    },
    titleColor: {
      type: String,
      default: "#000",
    },
    backColor: {
      type: String,
      default: "#000",
    },
  },
  data() {
    return {
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
      titleHeight: 0,
      unnecessaryHeight: 0,
    };
  },
  mounted() {
    this.statusBarHeight = uni.getMenuButtonBoundingClientRect().top;
    this.titleHeight = uni.getMenuButtonBoundingClientRect().height;
    this.unnecessaryHeight = 10;
    // 对外暴露整个组件的高度(外部组件用的到)
    this.$emit("getHeight", this.getHeight());
  },
  methods: {
    getHeight() {
      // 获取屏幕宽度
      const systemInfo = uni.getSystemInfoSync();
      const screenWidth = systemInfo.screenWidth;

      // 将 px 转化为 rpx
      const rpxValue =
        (this.statusBarHeight + this.titleHeight + this.unnecessaryHeight) /
        (screenWidth / 750);
      return rpxValue;
    },
    handleBack() {
      if (this.isCustomBackFn) {
        this.$emit("back");
      } else {
        uni.navigateBack();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
  transition: background 0.3s;

  .title-bar {
    display: flex;
    align-items: center;
    padding: 0 30rpx;

    .title-item {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .title-bar-left {
      justify-content: flex-start;

      .iconfont {
        font-size: 40rpx;
      }
    }

    .title-bar-center {
      justify-content: center;
      font-size: 32rpx;
    }
  }
}
</style>
