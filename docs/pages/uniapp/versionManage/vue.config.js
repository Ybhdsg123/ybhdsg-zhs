const { hotelConfig } = require("./config/hotelBaseConfig");

// 动态修改 appid 和 tabBar
require("./config/modifyManifest");

module.exports = {
  chainWebpack: config => {
    // 配置环境变量
    config.plugin("define").tap(args => {
      // 定义一个全局的变量 process.env.config 存储 所有配置的 酒店信息
      args[0]["process.env.config"] = JSON.stringify(hotelConfig);
      //   console.log("process.env", args);
      return args;
    });
    // 发行时启用了压缩时会生效
    if (process.env.NODE_ENV !== "development") {
      config.optimization.minimizer("terser").tap(args => {
        const compress = args[0].terserOptions.compress;
        // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
        compress.drop_console = true;
        compress.pure_funcs = [
          "__f__", // App 平台 vue 移除日志代码
          // 'console.debug' // 可移除指定的 console 方法
        ];
        return args;
      });
    }
  },
};
