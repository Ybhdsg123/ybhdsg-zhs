<template>
  <view
    class="custom-navigation"
    :style="[{ height: getHeight() + 'rpx' }, { background: backgroundColor }]"
  >
    <!-- 顶部状态栏 -->
    <view class="status-bar" :style="[{ height: statusBarHeight + 'px' }]" />

    <view>
      <!-- 标题栏 -->
      <view class="title-bar" :style="[{ height: titleHeight + 'px' }]">
        <view
          class="title-bar-left iconfont icon-fanhui"
          :style="[{ color: backColor }]"
          v-if="back"
          @click="handleBack"
        />
        <!-- 占位区大小，没有返回按钮时，这块区域还在，防止中间标题不在中间 -->
        <view class="title-bar-left" v-else />
        <view class="title-item">
          <!-- 插槽 -->
          <slot>
            <view
              :style="[{ color: titleColor, lineHeight: titleHeight + 'px' }]"
            >
              {{ title }}
            </view>
          </slot>
        </view>
        <!-- <view
          class="title-item"
          :style="[{ color: titleColor, lineHeight: titleHeight + 'px' }]"
        >
          {{ title }}
        </view> -->
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
    backgroundColor: {
      type: String,
      default: "#fff",
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
    padding-left: 30rpx;
    padding-right: 180rpx;

    .title-item {
      flex: 1;
      height: 100%;
      font-size: 32rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }

    .title-bar-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 150rpx; // bar-title的pr-pl的长度
      height: 100%;
      font-size: 40rpx;
    }
  }
}
</style>
