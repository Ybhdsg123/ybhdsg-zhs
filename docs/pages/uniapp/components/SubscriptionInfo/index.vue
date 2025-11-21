<template>
  <view>
    <view class="subscription-info" v-if="isShow">
      <text>{{ infoText }} </text>
      <view class="subscription-btn" @click="SubscribeNowHandler">
        立即订阅
      </view>
    </view>
  </view>
</template>

<script>
import { requestSubscribeMessage_global } from "./globalFn";
export default {
  props: {
    infoText: {
      type: String,
      default: "开启优惠券过期/到账提醒",
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    requestSubscribeMessage_global,
    SubscribeNowHandler() {
      this.requestSubscribeMessage_global();
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.subscription-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 88rpx;
  padding: 10rpx 20rpx;
  box-sizing: border-box;
  font-size: 24rpx;
  color: #666;
  background: #fff;
  .subscription-btn {
    font-weight: 700;
    padding: 10rpx 20rpx;
    color: #fff;
    border-radius: 10rpx;
    background: #ddac46;
  }
}
</style>
