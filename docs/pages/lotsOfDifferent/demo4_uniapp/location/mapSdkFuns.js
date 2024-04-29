/*
 * @Author: '哑巴湖大水怪' '1654134943@qq.com'
 * @Date: 2024-03-05 14:07:02
 * @LastEditors: '哑巴湖大水怪' '1654134943@qq.com'
 * @LastEditTime: 2024-04-15 16:05:57
 * @FilePath: \ygfk_sass_uniapp\location\mapJdkFuns.js
 * @Description: 地图webAervice请求方式
 */
import QQMapWX from "./jdk/qqmap-wx-jssdk.js";
import { TX_MXP_KEY } from "./locationRequest.js";
import { showToast } from "@/utils/tools.js";
import useStore from "@/store";

let qqmapsdk = new QQMapWX({
  key: TX_MXP_KEY, // 申请的key
});

// 地址搜索
export const addressSearchApi = (options) => {
  qqmapsdk.search({
    keyword: "酒店",
    ...options,
    success: function (res) {
      console.log(res, "---地址搜索-----");
    },
    fail: function (res) {
      console.log(res);
    },
  });
};

// 逆地址解析
export const reverseGeocoderApi = (options) => {
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      ...options,
      success: function (res, data) {
        resolve(res.result);
      },
      fail: function (res) {
        showToast("出现点问题，不好意思");
      },
    });
  });
};

// store
const { locationStore } = useStore();
// 获取用户当前位置信息
export const getUserCurentLocation = (isRefresh) => {
  // uni.getSystemInfo({
  //   success: function (res) {
  //     console.log("uni.getSystemInfo", res.locationEnabled);
  //     if (!res.locationEnabled) {
  //       return showToast("请确保手机系统定位已开启!");
  //     }
  //   },
  // });
  // console.log("走到这里了");
  return new Promise((resolve, reject) => {
    uni.authorize({
      scope: "scope.userLocation",
      geocode: true,
      success() {
        uni.getLocation({
          type: "gcj02",
          isHighAccuracy: true,
          success: async (res) => {
            const lat = locationStore.searchHotelForm?.latitude;
            const locationsIsChange = res.latitude == lat;
            // const locationsIsChange = false;
            if (!locationsIsChange || isRefresh) {
              const data = await reverseGeocoderApi({
                location: {
                  latitude: res.latitude,
                  longitude: res.longitude,
                },
              });
              locationStore.searchHotelForm.latitude = String(res.latitude);
              locationStore.searchHotelForm.longitude = String(res.longitude);
              locationStore.searchHotelForm.city = "";
              locationStore.searchHotelData.city = data.address_component.city;
              const userAddressInfo = {
                city: data.address_component.city, // 当前城市
                currentPoints: data.ad_info.location, // 行政区划中心点坐标
                latitude: String(res.latitude), // 纬度
                longitude: String(res.longitude), // 经度
                address: data.address, // 地址描述
                address_component: data.address_component, // 地址部件，address不满足需求时可自行拼接
                landmark_l1: data.address_reference.landmark_l1, // 一级地标
                landmark_l2: data.address_reference.landmark_l2, // 二级地标
                formatted_addresses: data.formatted_addresses, // 位置描述, 格式化后的地址
              };
              locationStore.setUserAddressInfo(userAddressInfo);
              resolve(data);
            } else {
              resolve();
              console.log("位置没有变化");
            }
          },
          fail: (error) => {
            // getLocation:fail system permission denied
            showToast("请确保微信的系统定位已开启!");
            // console.log("error======", error);
          },
        });
      },
      fail(error) {
        uni.showModal({
          title: "提示",
          content: "为了获取更准确的位置信息,请允许获取定位权限",
          success: (res) => {
            if (res.confirm) {
              uni.openSetting({
                success(res) {
                  console.log(res.authSetting);
                },
              });
            } else if (res.cancel) {
              // console.log("用户点击取消");
            }
          },
        });
      },
    });
  });
};
export default qqmapsdk;
