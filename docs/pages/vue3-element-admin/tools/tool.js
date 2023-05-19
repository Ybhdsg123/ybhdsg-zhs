//根据某一天获取本月的第一天及最后一天
/**
 * @description: 根据某一天获取本月的第一天及最后一天（不传默认为当前日期本月第一天）
 * @param {number} timestamp: 某天时间
 * @Author: zhs
 * @return 毫秒数
 */
export function getMonthFrist(timestamp) {
  let date = timestamp ? new Date(timestamp) : new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  return new Date(year, month, 1) * 1;
}
export function getMonthLast(timestamp) {
  let date = timestamp ? new Date(timestamp) : new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  return (new Date(year, month + 1, 0) / 1000 + 86399) * 1000;
}

/**
 * @description: 数组分块
 * @param {Array} arr
 * @param {Number} size
 * @Author: zhs
 */
export const chunk = (arr, size) => {
  return arr.reduce(
    (res, cur) => (
      res[res.length - 1].length < size
        ? res[res.length - 1].push(cur)
        : res.push([cur]),
      res
    ),
    [[]]
  );
};

/**
 * @description: 文字复制到剪贴板
 * @param {String} text 复制的文本，图片什么的
 * @Author: zhs
 */
export const copyText = async (text) =>
  await navigator.clipboard.writeText(text);

/**
 * @description: 深拷贝
 * @param {*} obj 要拷贝的数据
 * @Author: zhs
 */
export function deepClone(obj) {
  // 定义一个变量 并判断是数组还是对象
  var objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object" && obj != null) {
    // 循环对象类型的obj
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 判断如果obj[key]存在并且obj[key]是对象类型的时候应该深拷贝，即在堆内存中开辟新的内存
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          // 否则就是浅复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}

/**
 * @description: 校验数据类型
 * @param {*} obj
 * @Author: zhs
 */
export const myTypeOf = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

/**
 * @description: 根据地址栏信息取参数
 * @param {*} URL 获取的地址参数
 * @Author: zhs
 */
export const getParameters = (URL) =>
  JSON.parse(
    `{"${decodeURI(URL.split("?")[1])
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );

/**
 * @description: 防抖
 * @param {*} fn 防抖方法
 * @param {*} wait 等待时间
 * @Author: zhs
 */
export const debounce = (fn, wait = 200) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};

/**
 * @description: 通过关键词搜索获取模糊搜索结果
 * @param {*} keyword 关键词
 * @param {*} data 总的数据
 * @param {*} field 要查找的数据字段 例如 字段为 name 就传name， 为 id 就传 id
 * @Author: zhs
 */
export const fuzzySearchBykeyword = (keyword, data, field = "name") => {
  let str = ["", ...keyword, ""].join(".*");
  let reg = new RegExp(str);
  return data.filter((item) => reg.test(item[field]));
};
