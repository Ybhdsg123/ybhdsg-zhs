import { showToast } from "@/utils/tools.js";

/**
 * @description: 地图请求方法
 * @param {*} config 配置文件
 * @return {*}
 */
// config:{
// url: ``, // 请求地址
// method: "POST", // 请求方法
// data: data,  // 请求参数
// loading: false,    // 是否显示loading
// loadingText: "正在请求中...", // loading提示语
// }
export const TX_MXP_KEY = "EMOBZ-2OIWB-WHHUC-NUMXM-Y7V7T-HJBKI"; // "EP7BZ-ANBCZ-JOHXQ-7HNWV-6VMZS-PYF6C";
const TX_MAP_BASE_URL = "https://apis.map.qq.com";

const locationRequestFn = (config) => {
  if (config.loading) {
    showToast(config.loadingText, _, _, { mask: true });
  }
  const data = {
    key: TX_MXP_KEY,
    ...config.data,
  };
  return new Promise((resolve, reject) => {
    uni.request({
      url: TX_MAP_BASE_URL + config.url,
      data: data,
      method: config.method || "GET",
      timeout: config.timeout || 60000,
      success: (res) => {
        if (config.loading) uni.hideLoading();
        try {
          switch (res.data.status) {
            case 0: // 操作成功
              resolve(res.data);
              break;
            default:
              if (
                Object.prototype.toString.call(res.data.message) ===
                "[object Object]"
              ) {
                let str = "";
                for (let key in res.data.message) {
                  str += res.data.message[key];
                }
                showToast(str);
              } else {
                showToast(res.data.message);
              }
              reject(res.data);
              break;
          }
        } catch (e) {
          if (config.loading) uni.hideLoading();
          showToast("数据格式错误");
        }
      },
      fail: (err) => {
        if (config.loading) uni.hideLoading();
        showToast("网络错误");
        reject(err);
      },
      complete: () => {},
    });
  });
};

export default locationRequestFn;
