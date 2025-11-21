import { getUserInfoApi } from "@/common/api/login.js";
import { randomHexColor } from "@/utils/tools";
import { getOrderCouponListApi } from "@/common/api/coupon.js";
import { addAreaRoomQrcodeGetApi } from "@/common/api/checkIn.js";
import getHotelConfig from "./hotelBaseConfig";
import { roomQrCodeUrl } from "@/config";

// 微信小程序订阅消息
export const requestSubscribeMessage_global = () => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      withSubscriptions: true, // 是否获取用户订阅消息的订阅状态，默认false不返回
      success: res => {
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
      fail: res => {
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
    success: res => {
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
    fail(err) {
      // console.log("接口调用失败的回调函数", err);
    },
    // complete() {//   console.log("接口调用结束的回调函数（调用成功、失败都会执行)");// },
  });
};

// 打开设置页面信息
export const openStttingHandler = text => {
  const infoText = text || "检测到您没有开启订阅消息的权限，是否去设置？";
  uni.showModal({
    title: "提示",
    content: infoText,
    success: res => {
      if (res.confirm) {
        uni.openSetting({
          success(res) {},
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

// 根据手机号获取用户信息
export const getUserInfoByPhone_global = async phone => {
  let userInfo = {
    // 前后端字段一致
    useName: null,
    name: null, // 兼容以前
    isAgreement: null, // 分享时是否同意过收集隐私协议
    canVerify: null, // 是否拥有扫码核销权限
    canForceVerify: null, //是否拥有强制核销权限
    canPrepaidCardVerify: null, //是否拥有储值卡核销权限
    employeeName: null, //拥有扫码核销权 canVerify,才有这个值
    guestId: null,
    companyId: null,
    areaId: null,
    bindAreaName: null,
    guestRecordId: null,
    // 前后端字段不一致，前端用的
    bindAreaId: null, // areaId
    checkInRecordId: null, // guestRecordId
  };
  const { data } = await getUserInfoApi({ phone });
  Object.keys(userInfo).forEach(key => {
    userInfo[key] = data[key] || null;
    uni.setStorageSync(key, userInfo[key]); // 使用的姓名
  });
  userInfo.guestRecordId = data.checkInRecordId;
  userInfo.areaId = data.bindAreaId;
  uni.setStorageSync("guestRecordId", data.checkInRecordId);
  uni.setStorageSync("areaId", data.bindAreaId);
  if (!data.useName) {
    userInfo.useName = "用户" + randomHexColor();
    userInfo.name = userInfo.useName;
    uni.setStorageSync("useName", userInfo.useName);
  }
  return userInfo;
};

/**
 * 获取优惠券信息
 * @param {*} formData
 * @returns
 */

export const getVoucherInfo_global = async formData => {
  const voucherForm = {
    page: 1,
    row: 100,
    phone: uni.getStorageSync("phoneNumber"),
    ...formData,
  };
  const data = await getOrderCouponListApi(voucherForm);
  return data;
};

export const getRoomQrcode = async () => {
  const employeeInfo = JSON.parse(uni.getStorageSync("EMPLOYEE_INFO"));
  let form = {
    departmentId: employeeInfo.departmentId,
    employeeId: employeeInfo.employeeId,
  };
  const result = roomQrCodeUrl + JSON.stringify(form);
  const { data } = await addAreaRoomQrcodeGetApi({
    param: result,
  });
  return data;
};

/**
 * 设置页面标题
 * @param {String} titleName  标题名称
 */
export const setPageTitle = titleName => {
  uni.setNavigationBarTitle({
    title: titleName || getHotelConfig().name,
  });
};
