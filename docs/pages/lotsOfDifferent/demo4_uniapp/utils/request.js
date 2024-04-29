import { baseApi } from "@/config/index.js";
import { showToast } from "@/utils/tools.js";

// 请求方法
export const request = (config) => {
  if (config.loading) {
    showToast(config.loadingText, null, null, { mask: true });
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseApi + config.url,
      data: config.data || null,
      method: config.method || "GET",
      timeout: config.timeout || 60000,
      header: {
        "Content-Type": "application/json",
      },
      success: (res) => {
        if (config.loading) uni.hideLoading();
        try {
          switch (res.data.status) {
            case 0: // 操作成功
              resolve(res.data);
              break;
            case 401: // 操作失败
              showToast(res.data.message);
              uni.removeStorageSync("token");
              reject(res.data);
              uni.redirectTo({
                url: "/pages/page_login/index",
              });
              break;
            case 146:
              showToast(res.data.message);
              break;
            case 500:
              showToast("服务器错误");
              break;
            default:
              if (
                Object.prototype.toString.call(res.data.msg) ===
                "[object Object]"
              ) {
                let str = "";
                for (let key in res.data.msg) {
                  str += res.data.msg[key];
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

// 上传图片
export const uploadFile = (config) => {
  // 返回一个新的promise对象
  return new Promise((resolve, reject) => {
    if (config.loading) {
      uni.showLoading({
        title: config.loadingText,
      });
    }
    //上传图片
    uni.uploadFile({
      url: `${baseApi}${config.url}`, //请求接口
      filePath: config.file,
      file: config.file,
      name: "file", // 后端接受文件的key
      header: {
        "Content-Type": "multipart/formdata",
        Token: uni.getStorageSync("TOKEN") || null,
      },
      success(uploadFileRes) {
        const url = JSON.parse(uploadFileRes.data);
        resolve(url);
      },
      fail(err) {
        console.log(err, "失败");
      },
      complete: () => {
        if (config.loading) uni.hideLoading();
      },
    });
  });
};

// 下载文件
export const downloadFile = (config) => {
  // 返回一个新的promise对象
  return new Promise((resolve, reject) => {
    if (config.loading) {
      uni.showLoading({
        title: config.loadingText,
      });
    }
    //下载
    uni.downloadFile({
      url: `${baseApi}${config.url}`, //请求接口
      filePath: config.filePath,
      header: {
        "Content-Type": "application/vnd.ms-excel",
        "X-Api-Key": uni.getStorageSync("TOKEN") || null,
      },
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      },
      complete: () => {
        if (config.loading) uni.hideLoading();
      },
    });
  });
};
