import request from "@/common/httpRequest.js";
import { giftGoodsVoucherApi } from '@/common/api/shop.js';
const share = {
  title: "杭州英冠索菲特酒店",
  path: "/pages/index/index", // 全局分享的路径
  success: function () {
    console.log(1)
  },
  fail: function () {
    console.log(2)
  },
};

export default {
  // 定义全局分享
  // 1.发送给朋友
  async onShareAppMessage(res) {

    if (res.from === 'button') {
      const data = await giftGoodsVoucherApi({
        goalCouponId: uni.getStorageSync('couponId'),
        selfPhone: uni.getStorageSync('phoneNumber')
      });
      const couponInfo = {}
      couponInfo.id = uni.getStorageSync('couponId')
      couponInfo.nickName = uni.getStorageSync('nickname')
      couponInfo.greetingMessage = uni.getStorageSync('greetingMessage')
      couponInfo.transferPhone = uni.getStorageSync('phoneNumber')
      couponInfo.couponRecordId = data.data
      // console.log('couponInfo', couponInfo)
      // 来自页面内转发按钮
      return {
        title: '你的好友送你一张商品券，快去领取吧',
        path: `/pages/index/index?couponInfo=` + JSON.stringify(couponInfo),
        imageUrl: request.baseUrl + '20240514135115.png'
      }
    }
    return {
      title: share.title,
      path: share.path,
      // imageUrl: this.share.imageUrl,
    };
  },
  //2.分享到朋友圈
  onShareTimeline(res) {
    return {
      title: share.title,
      path: share.path,
      // imageUrl: this.share.imageUrl,
    };
  }
};
