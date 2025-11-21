


// 微信小程序订阅消息
export const requestSubscribeMessage_global = () => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      withSubscriptions: true, // 是否获取用户订阅消息的订阅状态，默认false不返回
      success: (res) => {
        // console.log(res, "===");
        const isOpenSubscribe = res.subscriptionsSetting.mainSwitch; // 是否开启订阅总信息
        const subscribeItems = res.subscriptionsSetting.itemSettings; // 每一项的订阅消息开关
        // 订阅消息的总开关,如果是关着的，引导用户去打开
        if (!isOpenSubscribe) {
          openStttingHandler();
          reject(false);
        } else {
          subscribeMessageHandler();
          resolve(true);
        }
      },
      fail: (res) => {
        console.log(res, "===");
        openStttingHandler();
        reject(false);
      },
    });
  });
};

// 订阅信息
const tmplIds = ["ZHy6AQNxUQ2Oq1Tq_4_gZyh3TwWZiXKPmqBQAxFqOR4"]; // 模版id
export const subscribeMessageHandler = () => {
  uni.requestSubscribeMessage({
    tmplIds: tmplIds,
    success: (res) => {
      // console.log("接口调用", res);
      for (let i = 0; i < tmplIds.length; i++) {
        const item = tmplIds[i];
        if (res[item] == "accept") {
          // console.log(res, "订阅成功", res[item]);
        } else if (res[item] == "reject") {
          openStttingHandler("您拒绝代金券过期提醒，是否去设置？");
        }
      }
    },
    fail(err) {// console.log("接口调用失败的回调函数", err);
    },
    // complete() {//   console.log("接口调用结束的回调函数（调用成功、失败都会执行)");// },
  });
};

// 打开设置页面信息
export const openStttingHandler = (text) => {
  const infoText = text || "检测到您没有开启订阅消息的权限，是否去设置？";
  uni.showModal({
    title: "提示",
    content: infoText,
    success: (res) => {
      if (res.confirm) {
        uni.openSetting({
          success(res) { },
        });
      } else if (res.cancel) {
        uni.showToast({
          title: "您拒绝订阅消息授权，无法获取提醒!",
          icon: "none",
        });
      }
    },
  });
};
