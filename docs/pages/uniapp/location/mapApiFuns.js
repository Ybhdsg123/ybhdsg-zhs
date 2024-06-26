// =================== webservice请求 ===========================
/**
 * @description: 地点搜索
 * @param {Object} options
 * @return {*}
 */
export const getCurrentAdressApi = (options) =>
  locationRequestFn({
    url: "/ws/geocoder/v1/",
    data: {
      location: "39.984154,116.307490",
      // boundary: {
      //   lat: "28.681114",
      //   lng: "115.918377",
      //   radius: 1000,
      //   region: "广东省广州市",
      // },
      ...options,
    },
  });
