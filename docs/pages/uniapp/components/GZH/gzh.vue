<template>
  <view>
    <web-view :src="authUrl"></web-view>
  </view>
</template>

<script>
import { setWxGZHCodeApi } from "@/common/api/login.js";
export default {
  data() {
    return {
      authUrl: "",
    };
  },
  async onLoad(e) {
    if (e.code) {
      // 这里有Code，直接自己将Code传给后台并跳转一个公众号文章
      const openId = uni.getStorageSync("openid");
      openId &&
        (await setWxGZHCodeApi({
          jsCode: e.code,
          openId: openId,
        }));
      this.authUrl = " https://mp.weixin.qq.com/s/3QKWYARirwP0Mf7yzyT8aA";
    } else {
      // 没有Code的话跳转H5页面后返回Code
      this.gzgzh();
    }
  },
  methods: {
    // 关注公众号
    gzgzh() {
      const appid = "wx5d956a756b321d5a";
      const redirectUrl = encodeURIComponent(
        "yingguanfengke.com/wechat/gzh.html"
      );
      this.authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=http://${redirectUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
    },
  },
};
</script>

<style lang="scss"></style>
