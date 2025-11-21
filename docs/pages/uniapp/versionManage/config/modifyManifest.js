const { hotelConfig, tabBarList } = require("./hotelBaseConfig");
const fs = require("fs");
const path = require("path");

/**
 *
 * @description 读取指定文件内容
 * @param {String} pathUrl
 * @returns  {Object} 返回文件的路径和文件内容
 */
function _readFileData(pathUrl) {
  // 获取正确的 文件 路径
  const filePath = path.resolve(__dirname, pathUrl);
  // 读取 文件相关信息
  const fileJson = fs.readFileSync(filePath, { encoding: "utf-8" });
  return {
    fileData: JSON.parse(fileJson),
    filePath,
  };
}

/**
 * @description 递归修改 JSON 中的指定 key
 * @param {object} obj 需要修改的 JSON 对象
 * @param {string} key 目标键
 * @param {any} newValue 修改后的值（支持字符串、数组、对象等）
 */
function _updateJsonByKey(obj, key, newValue) {
  if (typeof obj !== "object" || obj === null) return;

  for (const prop in obj) {
    if (prop === key) {
      obj[prop] = newValue;
    } else if (obj[prop] instanceof Object) {
      _updateJsonByKey(obj[prop], key, newValue);
    }
  }
  return obj;
}

try {
  // 获取当前运行的 appid 和 tabBarIndexList
  const { appid, tabBarIndexList } = hotelConfig[process.env.UNI_SCRIPT];

  /**
   * 修改 manifest.json 的 appid， 配置 UniApp 项目的全局信息
   */

  // 获取正确的 manifest.json 文件相关信息
  const { filePath: manifestPath, fileData: manifestData } =
    _readFileData("../manifest.json");

  // 修改 manifest.json 中的 appid
  const manifestDataNew = _updateJsonByKey(manifestData, "appid", appid);

  // 重新写入 manifest.json
  fs.writeFileSync(manifestPath, JSON.stringify(manifestDataNew, null, 2), {
    flag: "w",
  });

  /**
   * 修改  project.config.json 文件 appid ,开发者工具配置信息
   */

  // 读取 pages.json 文件相关信息
  const { filePath: projectConfigPath, fileData: projectConfigData } =
    _readFileData("../project.config.json");
  // 修改 project.config.json 中的 appid
  projectConfigData.appid = appid;
  // 重新写入 project.config.json 文件
  fs.writeFileSync(
    projectConfigPath,
    JSON.stringify(projectConfigData, null, 2),
    {
      flag: "w",
    }
  );

  /**
   * 修改  pages.json 文件，tabBar 列表 和 入口文件
   */

  // 读取 pages.json 文件相关信息
  const { filePath: pagesPath, fileData: PagesData } =
    _readFileData("../pages.json");

  // 为布尔值，则全部显示
  if (typeof tabBarIndexList === "boolean" && tabBarIndexList) {
    PagesData.tabBar.list = tabBarList; // tabBar 列表
    PagesData.entryPagePath = tabBarList[0].pagePath; // 启动页面;
  }

  // 为数组，过滤出需要展示的 tabBar 列表
  if (typeof tabBarIndexList === "object") {
    PagesData.tabBar.list = tabBarList.filter((_, i) => {
      return tabBarIndexList.includes(i);
    }); // tabBar 列表
    PagesData.entryPagePath = PagesData.tabBar.list[0].pagePath; // 启动页面;
  }

  // 修改 manifest.json
  fs.writeFileSync(pagesPath, JSON.stringify(PagesData, null, 2), {
    flag: "w",
  });
} catch (error) {
  console.error("脚本执行过程中发生错误:", error.message);
  process.exit(1); // 退出程序并返回错误状态码
}
