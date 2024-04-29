const share = {
  title: "酒店信息|酒店信息|酒店信息|酒店信息",
  path: "/pages/page_recommend/index", // 全局分享的路径
};
export default {
  // 定义全局分享
  // 1.发送给朋友
  onShareAppMessage(res) {
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
  },
};
