// 各个酒店的配置信息
const hotelConfig = {
  // 南京机场诺富特酒店:
  nj_novotel: {
    appid: "wxad350d34c75ef54d",
    tabBarIndexList: [1, 2, 4], // tabBar 展示的列表（如果为 true，则全都有，为 数组 则遍历数组中的 index）
    orderBtnsIdList: [1, 2, 3, 4], // 我的页面 订单 按钮id
    type: "nj_novotel",
    api: "https://nanjingairport-novotel.yingguanfengke.com/",
    name: "南京机场诺富特酒店",
    aboutImgUrl:
      "https://nanjingairport-novotel.yingguanfengke.com/api-filemanager/filemanager/applet/aboutSofitel.png",
    index_icon_url: "index_icon.png",
    my_icon_url: "my_icon.png",
    login_icon_url: "login_icon.png",
    wssHost: "nanjingairport-novotel.yingguanfengke.com", // wss
    h5Url:
      "https://nanjingairport-novotel.yingguanfengke.com:8099/#/?EMPLOYEE_INFO=", // h5
  },
  // 宁波逸东诺富特酒店:
  nb_novotel: {
    appid: "wx1f38d1808addd314",
    tabBarIndexList: true, // tabBar 展示的列表（如果为 true，则全都有，为数组则遍历得到所有的信息）
    orderBtnsIdList: [1, 2, 3, 4], // 我的页面 订单 按钮id
    type: "nb_novotel",
    api: "https://ningboeast-novotel.yingguanfengke.com:4431/",
    name: "宁波逸东诺富特酒店",
    aboutImgUrl:
      "https://ningboeast-novotel.yingguanfengke.com:4431/api-filemanager/filemanager/applet/aboutSofitel.png",
    index_icon_url: "index_icon.png",
    my_icon_url: "my_icon.png",
    login_icon_url: "login_icon.png",
    wssHost: "ningboeast-novotel.yingguanfengke.com:4431", // wss
    h5Url:
      "https://ningboeast-novotel.yingguanfengke.com:8099/#/?EMPLOYEE_INFO=", // h5
  },
  // 新市古镇假日酒店: 121.40.113.111
  xsjr_novotel: {
    appid: "wx5481ad9a5b4da1e9",
    tabBarIndexList: true, // tabBar 展示的列表（如果为 true，则全都有，为数组则遍历得到所有的信息）
    orderBtnsIdList: [1, 2, 3, 4], // 我的页面 订单 按钮 id
    type: "xsjr_novotel",
    api: "https://xinshiholiday.yingguanfengke.com:4431/",
    name: "新市古镇假日酒店",
    aboutImgUrl:
      "https://xinshiholiday.yingguanfengke.com:4431/api-filemanager/filemanager/applet/aboutSofitel.png",
    index_icon_url: "index_icon.png",
    my_icon_url: "my_icon.png",
    login_icon_url: "login_icon.png",
    wssHost: "xinshiholiday.yingguanfengke.com:4431", // wss
    h5Url: "https://xinshiholiday.yingguanfengke.com:8099/#/?EMPLOYEE_INFO=", // h5
  },
};

// tabBarList
const tabBarList = [
  {
    pagePath: "pages/index/index",
    iconPath: "static/icon/home.png",
    selectedIconPath: "static/icon/homeSelected.png",
    text: "订房",
  },
  {
    pagePath: "pages/shop/index",
    iconPath: "static/icon/shop.png",
    selectedIconPath: "static/icon/shopSelected.png",
    text: "商城",
  },
  {
    pagePath: "pages/storedValueCard/index",
    iconPath: "static/icon/stored.png",
    selectedIconPath: "static/icon/storedSelected.png",
    text: "储值优惠",
  },
  {
    pagePath: "pages/serve/index",
    iconPath: "static/icon/serviece.png",
    selectedIconPath: "static/icon/servieceSelected.png",
    text: "服务",
  },
  {
    pagePath: "pages/my/index", //页面路径，必须在 pages 中先定义
    iconPath: "static/icon/my.png", //图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片
    selectedIconPath: "static/icon/mySelected.png", //选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效
    text: "我的", //tab 上按钮文字
  },
];

module.exports = {
  hotelConfig,
  tabBarList,
};
