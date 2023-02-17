# 文件相关

## 1. 创建 a 链接并下载文件（导出 excel）

```js
// 下载文件
export const exportExcel = (data, fileName) => {
  if (!data) {
    return;
  }
  window.URL = window.URL || window.webkitURL; // 兼容性
  // 创建一个 URL 这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
  let url = window.URL.createObjectURL(new Blob([data]));
  let link = document.createElement("a"); // 创建一个a元素
  link.style.display = "none"; // 让a元素在页面中隐藏
  link.href = url; // 绑定 a 元素的 href 为当前的url
  let exportName = fileName || "导出明细";
  link.setAttribute("download", `${exportName}.xlsx`); // 设置 a 元素 download属性，属性值为后面的值
  document.body.appendChild(link); // 添加到页面中
  link.click(); // 点击a元素 下载excel文件
  window.URL.revokeObjectURL(url); //卸载url，释放内存
};
//   // 兼容性
//   window.URL = window.URL || window.webkitURL
//   // 1. 创建链接
//   let url =window.URL.createObjectURL(new Blob([data]))
//   // 2. 创建 a 链接
//   let link = document.createElement('a')
//   // 3. 让这个 a 链接在页面中隐藏
//   link.style.disl=play = 'none'
//   // 4. 绑定 a 元素的href 为创建的url链接
//   link.href = url
//   // 5. 指定文件名称
//   let exportName = fileName || '导出明细'
//   // 6. 设置 a 元素的 download 属性，属性值为后面的值 setAttribute('属性名','属性值')
//   link.setAttribute('download',`${exportName}.xlsx`)
//   // 7. 将 a 元素添加到页面中
//   document.body.appendChild(link)
//   //8. 点击 a 元素进行下载 excel 文件
//   link.click()
//   // 9. 卸载url，释放内存
//   window.URL.removeObjectURL(url)
```

## 2. 下载图片 相关

- **2.1 需要用到的插件**

```js
pnpm i  jszip && pnpm i file-saver
```

```js
// 需要用到的插件
import JSZip from "jszip";
import FileSaver from "file-saver";
```

- **2.2 单个图片下载**

```js
/**
 * @description: 单个图片下载
 * @param {string} url 下载的url
 * @param {string} name 下载文件的名字
 */
export const singleExportFile = (url, name) => {
  if (!name) {
    FileSaver.saveAs(url); // 未传入导出图片名称
  } else {
    FileSaver.saveAs(url, `${name}.jpg`); // 通过fileSaver导出下载图片
  }
};
```

- **2.3 批量图片压缩导出下载**

```js
/**
 * @description:  创建链接将图片转为 blob 并请求
 * @param {string} url
 */
function getImgArrayBuffer(url) {
  return new Promise((resolve, reject) => {
    //通过请求获取文件blob格式
    let xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open("GET", url, true);
    xmlHTTP.responseType = "blob";
    xmlHTTP.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        reject(this);
      }
    };
    xmlHTTP.send();
  });
}
/**
 * @description:批量图片导出
 * @param {Arrray} list 要下载的图片链接列表数组
 */
export const batchExportFile = (list) => {
  let zip = new JSZip();
  var imgObj = {};
  let promises = [];
  for (let obj of list) {
    // 将图片信息转换为 blob 格式
    const promise = getImgArrayBuffer(obj.qr_code)
      .then((data) => {
        zip.file(obj.title + ".jpg", data, { binary: true }); // 逐个添加文件
        imgObj[obj.title] = data;
      })
      .catch((error) => {
        console.log(error);
      });
    promises.push(promise);
  }
  // console.log(promises)
  // Promise.all 请求
  Promise.all(promises).then(async () => {
    try {
      const content = await zip.generateAsync({ type: "blob" });
      await FileSaver.saveAs(content, "压缩图片");
      // const newDate = +new Date()
      // console.log('new-',newDate)
    } catch (error) {
      console.log(error);
    }
  });
};
```

## 3. excel 导入相关

- **3.1 下载的插件**

```js
pnpm i xlsx@0.18.5
```

- **3.2 按照二进制方式读取文件**

```js
import * as XLSX from "xlsx";

/**
 * @description:  把文件按照二进制方式读取
 * @param {binary} file :文件
 */
export const readFile = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    // 二进制
    reader.readAsBinaryString(file);
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
  });
};
```

- **3.3 按照 base64 方式读取文件**

```js
/**
 * @description: 把文件按照base64方式读取
 * @param {binary} file
 */
export const readFileBase = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    // base64
    reader.readAsDataURL(file);
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
  });
};
```

- **3.4 导入的 excel 文件读取是中文表头的，需要转换为相应的 英文字段**

```js
/**
 * @description: 将excel中文表头转换为对应的字段
 * @param {Array} excelData: 导入的excel列表数据
 * @param {Object} header : excel列表中文表头和字段对应的映射
 */
export const changeCnToEnFn = (excelData, header) => {
  let result = [];
  excelData.forEach((obj) => {
    let info = {};
    Object.keys(header).forEach((key) => {
      info[header[key]] = obj[key];
    });
    result.push(info);
  });
  return result || [];
};
```

- **3.5 将导入的 excel 文件转换为 json 格式**

```js
/**
 * @description: 将导入的excel文件转换为json格式
 * @param {*} file ：转换的文件
 */
export const excelToJson = async (excelFile) => {
  // 将文件内容转换为二进制文件
  let binaryData = await readFile(excelFile);
  // 将二进制数据通过 XLSX.read(fileData, { type: "binary" }) 方法生成 workbook 对象 type :'binary' 类型为二进制
  let eleData = XLSX.read(binaryData, { type: "binary" });
  //  eleData.SheetNames[0] 获取第一个 Sheet 的名称，有多个，其实就是第一个表格的名字
  //  eleData.Sheets 根据eleData.SheetNames[0]为key存的数据内容
  let eleDataSheet = eleData.Sheets[eleData.SheetNames[0]];
  // 将解析出的数据转换为json格式
  eleData = XLSX.utils.sheet_to_json(eleDataSheet);
  // 判断是否有表格头 现在单元格的合并对表格头会有一些影响，目前用是否有 __EMPTY_1 字段来判断是否有表格头（单元格合并的话不会有 __EMPTY）
  const hasTableHead = !!eleData[0].__EMPTY_1;
  // 有表头转换后的数据格式
  let tableDataArr = [];
  // 有表头
  if (hasTableHead) {
    // 获取表头数据，并且去除获取的表格中的表头（就是第一行为表格数据，去除掉）
    const header = eleData.shift();
    eleData.forEach((obj) => {
      let info = {};
      Object.keys(header).forEach((key) => {
        info[header[key]] = obj[key] || "";
      });
      tableDataArr.push(info);
    });
    return tableDataArr;
  } else {
    return eleData;
  }
};
```

## 4. 本地缓存相关

- **window.localStorage**

```js
/**
 * @description: window.localStorage 浏览器永久缓存
 * @return {*}
 */
export const localStorage = {
  // 设置
  set(key, val) {
    if (key) {
      window.localStorage.setItem(key, JSON.stringify(val));
    }
  },
  // 获取
  get(key) {
    const result = window.localStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
  },
  // 移除
  remove(key) {
    if (key) {
      window.localStorage.removeItem(key);
    }
  },
  // 清除全部
  clear() {
    window.localStorage.clear();
  },
};
```

- **window.sessionStorage**

```js
/**
 * @description: window.sessionStorage 浏览器临时缓存
 * @return {*}
 */
export const sessionStorage = {
  // 设置
  set(key, val) {
    window.sessionStorage.setItem(key, JSON.stringify(val));
  },
  // 获取
  get(key) {
    const result = window.sessionStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
  },
  // 移除临时缓存
  remove(key) {
    window.sessionStorage.removeItem(key);
  },
  // 移除全部临时缓存
  clear() {
    window.sessionStorage.clear();
  },
};
```

- **cookie**

```js
/**
 * @description:  cookie
 * @return {*} 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
 */

export const docCookies = {
  // 获取
  getItem: function (sKey) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    );
  },
  // 设置
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === Infinity
              ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
              : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=" +
      encodeURIComponent(sValue) +
      sExpires +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "") +
      (bSecure ? "; secure" : "");
    return true;
  },
  // 移除
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return new RegExp(
      "(?:^|;\\s*)" +
        encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
        "\\s*\\="
    ).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  },
};
```

## 5. 根据某一天获取本月的第一天及最后一天

> `new Date(year, month, 1) * 1` 返回下个月第一天时间
> `new Date(year, month + 1, 0)` 返回本月最后一天

```js
import { ElMessage, ElMessageBox } from "element-plus";
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
  // day为0表示获取上一个月最后一天，所以month+1
  // 86300表示一天秒数，最后日期为 23:59:59
  return (new Date(year, month + 1, 0) / 1000 + 86399) * 1000;
}
```

## 6. `ElMessageBox.confirm` 二次封装

```js
/**
 * @description: 将 ElMessageBox.confirm 二次封装
 * @param {string} tipMessage : 提示信息
 * @param {string} title : 默认 '温馨提示',
 * @param {object} spectiaclOptions : ElMessageBox 所有的配置项
 * @param {string} cancelButtonText : 取消文本 默认 '取消',
 * @param {enum} type ：success，error，info和 warning 默认 'warning'
 * @param {function} fn : 需要操作的方法，比如确定后刷新页面啥的
 * @Author: zhs
 */
export const ElMessageBoxConfirm = async (
  tipMessage,
  fn,
  spectiaclOptions = {}
) => {
  const configuration = {
    cancelButtonText: "取消",
    confirmButtonText: "确定",
    type: "warning",
    title: "温馨提示",
    center: true,
    ...spectiaclOptions,
  };
  try {
    await ElMessageBox.confirm(tipMessage, configuration.title, {
      ...configuration,
    });
    return fn && fn();
  } catch (error) {
    console.log(error);
    ElMessage.info("取消操作");
  }
};
```

## 7. 数组分块

```js
 chunk([1,2,3,4,5],4) => [[1, 2, 3, 4],[5]] // 分成 4 个为一组
```

```js
/**
 * @description: 数组分块
 * @param {Array} arr 要分的数组
 * @param {Number} size 分成几个为一组
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
```

## 8. 文字复制到粘贴板 和 获取选定的文本

- [文字复制到粘贴板](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard/writeText)

```js
/**
 * @description: 文字复制到剪贴板
 * @param {String} text 复制的文本，图片什么的
 * @Author: zhs
 */
export const copyText = async (text) =>
  await navigator.clipboard.writeText(text);
```

- [获取选定的文本](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getSelection)

```js
const getSelectedText = () => window.getSelection().toString();

getSelectedText();
// 返回选中的内容**
```

## 9. 深拷贝

```js
/**
 * @description: 深拷贝对象或者数组
 * @param {*} obj 要拷贝的数据
 * @Author: zhs
 */
export function deepClone(obj) {
  // 定义一个变量 并判断是数组还是对象
  var objClone = Array.isArray(obj) ? [] : {};
  // 判断obj存在并且是对象类型的时候 因为null也是object类型，所以要单独做判断
  if (obj && typeof obj === "object" && obj != null) {
    // 循环对象类型的obj
    for (var key in obj) {
      // 判断obj中是否存在key属性
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
```

## 10. 校验数据类型

```js
/**
 * @description: 校验数据类型
 * @param {*} obj
 * @Author: zhs
 */
export const myTypeOf = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};
```

## 11. 从 url 获取参数并转为对象

- **11.1 第一种**
  > > `decodeURI()函数`: 可对 encodeURI() 函数编码过的 URI 进行解码。

```js
const getParameters = (URL) =>
  JSON.parse(
    `{"${decodeURI(URL.split("?")[1])
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );

getParameters("https://www.google.com.hk/search?q=js+md&newwindow=1");
// {q: 'js+md', newwindow: '1'}
```

- **11.2 第二种**

> 1. `window.location.search`: 获取当前页面 `?` 以及跟随其后的一串 URL 查询参数
> 2. `URLSearchParams`: 接口定义了一些实用的方法来处理 URL 的查询字符串。
> 3. MDN 文档： https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams

```js
export const getSearchParams = () => {
  const searchPar = new URLSearchParams(window.location.search);
  conssole.log(searchPar);
  const paramsObj = {};
  for (const [key, value] of searchPar.entries()) {
    paramsObj[key] = value;
  }
  return paramsObj;
};

// 假设目前位于 https://****com/index?id=132333&age=18;
getSearchParams(); // {id: "132333", age: "18"}
```

## 12. 检查对象是否为空

> 1. 静态方法 `Reflect.ownKeys()` 返回一个由目标对象自身的属性键组成的数组。
> 2. **参数**：获取自身属性键的目标对象，**返回值**：由目标对象的自身属性键组成的 `Array`, **异常**：如果目标不是 Object，抛出一个 TypeError。
> 3. `Reflect.ownKeys([])` => `['length']`， 传入数组返回值
> 4. `Reflect.ownKeys([1,2,3])` => `['0', '1', '2', 'length']`

[Reflect.ownKeys()的 MDN 链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)

```js
const isEmpty = (obj) =>
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
isEmpty({}); // true
isEmpty({ a: "not empty" }); //false
isEmpty([]); // false
isEmpty(1); // 报错
```

## 13. 计算数组平均值

```js
const average = (arr) => arr.reduce((a, b) => a + b) / arr.length;
average([1, 9, 18, 36]); //16
```

## 14. 数组对象根据字段去重

> `Object.values()` 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用 for...in 循环的顺序相同（区别在于 for-in 循环枚举原型链中的属性）。

[Object.values()的 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values#%E8%A7%84%E8%8C%83)

```js
// arr 要去重的数组
// key 根据去重的字段名
export const uniqueArrayObject = (arr = [], key = "id") => {
  if (arr.length === 0) return;
  let list = [];
  const map = {};
  arr.forEach((item) => {
    if (!map[item[key]]) {
      map[item[key]] = item;
    }
  });
  list = Object.values(map);
  return list;
};
```

## 15. 两日期之间相差的天数

```js
const dayDiff = (date1, date2) =>
  Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

dayDiff(new Date("2021-10-21"), new Date("2022-02-12"));
// Result: 114
```

## 16. 查询某天是否为工作日

```js
const isWeekday = (date) => date.getDay() % 6 !== 0;

isWeekday(new Date(2022, 03, 11));
// true
```

## 17. 生成随机十六进制

```js
const randomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;
console.log(randomHexColor());
// #a2ce5b
```

## 18. 检查设备类型

```js
const judgeDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "PC";

judgeDeviceType(); // PC | Mobile
```

## 19. 开启全屏 和 关闭全屏

- **开启全屏**

```js
export const launchFullscreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
};
```

- **关闭全屏**

```js
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};
```

## 20. 检测元素是否处于焦点

```js
const elementIsInFocus = (el) => el === document.activeElement;

elementIsInFocus(anyElement);
// 元素处于焦点返回true，反之返回false
```
