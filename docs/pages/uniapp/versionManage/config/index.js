
// 方便 .js页面 获取环境变量
export const hotelBaseConfig = process.env.config[process.env.NAME];

const dataEnv = {
  baseUrl: hotelBaseConfig.api,
  baseImg: hotelBaseConfig.api,
  baseImgUrl: `${hotelBaseConfig.api}api-filemanager/filemanager/applet/`,
  roomQrCodeUrl: `${hotelBaseConfig.api}qrCode/addAreaRoomQrcodeGet?param=12&employeeInfo=`,
  shopQrCodeUrl: `${hotelBaseConfig.api}qrCode/addQrcodeGet?param=11&employeeInfo=`,
  equityCardCodeUrl: `${hotelBaseConfig.api}qrCode/addRightCardQrCodeGet?employeeInfo=`,
  storedCardCodeUrl: `${hotelBaseConfig.api}qrCode/addPrepaidCardQrCodeGet?employeeInfo=`,
  aggregationPageUrl: hotelBaseConfig.h5Url,
};
export const {
  baseUrl,
  baseImgUrl,
  baseImg,
  roomQrCodeUrl,
  shopQrCodeUrl,
  equityCardCodeUrl,
  storedCardCodeUrl,
  aggregationPageUrl,
} = dataEnv;
