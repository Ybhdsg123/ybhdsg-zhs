# 下载相关

## 1. 创建 a 链接并下载文件（导出 excel）

```js
/**
 * @description: 导出excel
 * @param {binary} data 导出excel 二进制数据
 * @param {string} fileName 导出excel文件名字，带后缀
 * @Author: zhs
 */
export const exportExcel = (data, fileName) => {
  if (!data) {
    return;
  }
  // 判断是否是二进制数据
  const isArrayBuffer = data instanceof ArrayBuffer || data instanceof Blob;
  window.URL = window.URL || window.webkitURL; // 兼容性
  // 创建一个 URL 这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
  let url = isArrayBuffer ? window.URL.createObjectURL(new Blob([data])) : data;
  let link = document.createElement("a"); // 创建一个a元素
  link.style.display = "none"; // 让a元素在页面中隐藏
  link.href = url; // 绑定 a 元素的 href 为当前的url
  let exportName = fileName || "导出明细.xlsx";
  link.setAttribute("download", exportName); // 设置 a 元素 download属性(下载保存的文件名称)，属性值为后面的值
  link.setAttribute("target", "_blank"); // 设置 a 元素 target属性，再开一个标签页打开或者下载
  document.body.appendChild(link); // 添加到页面中
  link.click(); // 点击a元素 下载excel文件
  window.URL.revokeObjectURL(url); //卸载url，释放内存
};
//   // 判断是否是二进制数据
//   const isArrayBuffer = data instanceof ArrayBuffer || data instanceof Blob;
//   // 兼容性
//   window.URL = window.URL || window.webkitURL
//   // 1. 创建链接
//   let url = isArrayBuffer ? window.URL.createObjectURL(new Blob([data])) : data;
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
//   // 8. 点击 a 元素进行下载 excel 文件
//   link.click()
//   // 9. 卸载url，释放内存
//   window.URL.removeObjectURL(url)
```

## 2. 将 json 数据转化为 demo.json 并下载文件

> `exportExcel`为 1 的方法

> `JSON.stringify(value[, replacer [, space]])` 参考文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

```js
const json = { a: 3, b: 4, c: 5 };
const str = JSON.stringify(json, null, 2);
// 方案一：Text -> DataURL
const dataUrl = `data:,${str}`;
exportExcel(dataUrl, "demo.json");

// 方案二：Text -> blob -> ObjectURL
const url = URL.createObjectURL(new Blob(str.split("")));
exportExcel(url, "demo1.json");
```

## 3. 根据链接下载文件 相关

- **2.1 需要用到的插件**

```js
pnpm i  jszip && pnpm i file-saver
```

```js
// 需要用到的插件
import JSZip from "jszip";
import FileSaver from "file-saver";
```

- **2.2 单个文件下载**

```js
/**
 * @description: 单个文件下载 导出excel
 * @param {string} url 下载的url
 * @param {string} name 下载文件的名字 带后缀
 * @Author: zhs
 */
export const singleExportFile = (url, name) => {
  if (!name) {
    FileSaver.saveAs(url); // 未传入导出文件名称
  } else {
    FileSaver.saveAs(url, name); // 通过fileSaver导出下载文件
  }
};
```

- **2.3 批量图片压缩导出下载**

::: details

```js
/**
 * @description:   将文件链接转为 二进制文件 创建链接 转为 blob 并请求
 * @param {string} url 要下载的文件链接
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
 * @description:批量文件导出
 * @param {Arrray} list 要下载的文件链接列表数组
 * @param list 格式 [{name:"",url:""}],name：名称带后缀，如a.pdf,b.png
 * @param {String} fileName 导出完成后的压缩文件名称
 * @Author: zhs
 */
export const batchExportFile = (list, fileName = "压缩文件") => {
  let zip = new JSZip();
  let promises = [];
  for (let obj of list) {
    const promise = getImgArrayBuffer(obj.url)
      .then((data) => {
        // obj.name： 文件名称，带后缀， data：文件内容，
        zip.file(obj.name, data, { binary: true }); // 逐个添加文件
      })
      .catch((error) => {
        console.log(error);
      });
    promises.push(promise);
  }
  // console.log(promises)
  // return
  Promise.all(promises).then(async () => {
    try {
      const content = await zip.generateAsync({ type: "blob" });
      await FileSaver.saveAs(content, fileName);
    } catch (error) {
      console.log(error);
    }
  });
};
```

:::

## 4. excel 导入相关

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

## 5. 本地缓存相关

:::details **window.localStorage**

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

:::

:::details **window.sessionStorage**

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

:::

:::details **cookie**

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

:::
