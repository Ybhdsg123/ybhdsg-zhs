## 1. [`navigator.clipboard` 剪切板](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard/read)

### 1.1 复制文本 （有兼容性）

```js
// 读取文本
export const copyText = async (text) => {
  // 读的权限
  const premission = await navigator.permissions.query({
    name: "clipboard-write",
  });
  if (premission.state == "granted" || premission.state == "prompt") {
    const result = await navigator.clipboard.writeText(text);
    return result;
  } else {
    throw Error("不允许读取文本，没有权限");
  }
};
```

### 1.2 读文本（有兼容性,会弹窗提示）

```js
// 读取文本
export const readText = async (text) => {
  // 读的权限
  const premission = await navigator.permissions.query({
    name: "clipboard-read",
  });
  if (premission.state == "granted" || premission.state == "prompt") {
    const result = await navigator.clipboard.readText(text);
    return result;
  } else {
    throw Error("不允许读取文本，没有权限");
  }
};
```

## 6. `ElMessageBox.confirm` 二次封装

```js
import { ElMessage, ElMessageBox } from "element-plus";

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
 * @param {String} text 复制的文本，
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
      // hasOwnProperty() 方法返回一个布尔值，表示对象自有属性（而不是继承来的属性）中是否具有指定的属性。
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

function deepClone (obj) {
    if (typeof obj !== 'object' || obj == null) {
        return obj;
    }
    
    let deepCloneObj = Array.isArray(obj) ? [] : {}
    
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            deepCloneObj[key] = deepClone(obj[key]);
        }
    }
    
    return deepCloneObj;
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

### 11.1 第一种

 `decodeURI()函数`: 可对 encodeURI() 函数编码过的 URI 进行解码。

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

### 11.2 第二种

- 1. `window.location.search`: 获取当前页面 `?` 以及跟随其后的一串 URL 查询参数
- 2. `URLSearchParams`: 接口定义了一些实用的方法来处理 URL 的查询字符串。
- 3. MDN 文档： <https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams>

```js
export const getSearchParams = () => {
  const searchPar = new URLSearchParams(window.location.search);
  console.log(searchPar);
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
  const obj = {};
  arr.forEach((item) => {
    if (!map[item[key]]) {
      obj[item[key]] = item;
    }
  });
  list = Object.values(obj);
  return list;
};
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

## 21. 计算年龄

```js
function showAge() {
  var birthday = new Date("2002-2-26");
  var today = new Date();
  // 设置当天时间为时分秒为 00:00:00
  today.setHours(0), today.setMinutes(0), today.setMilliseconds(0);
  // 本月生日日期
  thisYearBirthday = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  );
  // 当天年份 - 传入日期的年份
  var age = today.getFullYear() - birthday.getFullYear();
  // 如果当天时间 < 本年生日时间 age--
  if (today.getTime() < thisYearBirthday.getTime()) {
    age--;
  }
  return age;
}
```

## 22. 对数据进行分组

:::details

```js
**
 * @description: 根据字段对数据进行分组
 * @param {*} arr 要处理的源数据
 * @param {*} fn 传入一个方法，指定分类的依据(传入string类型的时候，特殊处理)
 * @return 处理过的数据
 * @Author: zhs
 */
export function groupBy(arr, fn) {
  let result = {};
  // 校验数据类型是不是 string 类型
  const fnTypeOf = Object.prototype.toString
    .call(fn)
    .slice(8, -1)
    .toLowerCase();
  // 如果传入的是 string 类型的话，就将其包装成 function
  if (fnTypeOf === "string") {
  // 先将字段保存起来，例如指定根据性别分类（例2）
    const fnStr = fn;
    // 创建一个 fn，返回指定字段的分类
    fn = (obj) => obj[fnStr];
  }
  for (let obj of arr) {
    // 拿到要处理的数据，传入方法中进行分类
    const field = fn(obj);
    // 判断 result 有无这个 分类，没有就创建一个
    if (!result[field]) {
      result[field] = [];
    }
    // 有这个分类，就将 值 加入到该 分类 中
    result[field].push(obj);
  }
  return result;
}
const demo = [
  { name: "zs", age: 12, gender: "女" },
  { name: "ls", age: 13, gender: "男" },
  { name: "zscs", age: 12, gender: "女" },
];
// 处理数组 返回 => {奇数:[1,3,1,49,9],偶数:[2,8]}
// const stra = groupBy([1, 2, 3, 1, 49, 9, 8], (obj) =>
//   obj % 2 === 0 ? "偶数" : "奇数"
// );

// 传入 string 类型数据 返回 => {女:Array(2),男:Array(1)}
// console.log(groupBy(demo, "gender"));

// 处理复杂的 多字段 数据  返回 => {12-女:Array(2),13-男:Array(1)}
// console.log(groupBy(demo, (obj) => `${obj.age}-${obj.gender}`));=
```

:::

## 23.解决数字相加精度损失问题

```js
//默认传入的都是数字类型  解决数字相加精度损失问题
export function commonAdd(number1, number2) {
  let result = 0;
  if (Number.isInteger(number1) || Number.isInteger(number2)) {
    result = number1 + number2;
  } else {
    //两个都是纯小数
    const number1Array = number1.toString().split(".");
    const number2Array = number2.toString().split(".");
    //最大的除数位数
    let maxBit = 1;
    if (number1Array[1].length >= number2Array[1].length) {
      maxBit = number1Array[1].length + 1;
    } else {
      maxBit = number2Array[1].length + 1;
    }
    const divisor = parseInt("1".padEnd(maxBit, 0));
    result = (number1 * divisor + number2 * divisor) / divisor;
  }
  return result;
}
```

## 24. 数组递归查找节点

```js
// 数组递归查找节点
export function findNodeById(tree, targetId, options = { id: 'id', children: 'children' }) {
  const { id, children } = options
  for (const node of tree) {
    // 检查当前节点的ID是否匹配
    if (node[id] === targetId) {
      return node;
    }
    // 如果当前节点有子节点，递归查找
    if (node[children] && node[children].length > 0) {
      const foundNode = findNodeById(node[children], targetId);
      // 如果在子节点中找到了匹配项，立即返回
      if (foundNode) {
        return foundNode;
      }
    }
  }
  // 如果遍历完所有节点仍未找到，返回null
  return null;
}
```

## 25. 百分比计算 - 最大余额法

计算百分比时，由于四舍五入，各个比例相加可能不等于 1，通过最大余额法可以保证总数为 1。

```js
// 输出 ['32.56%', '6.97%', '27.91%', '32.56%']
getPercentWithPrecision([56, 12, 48, 56], 2)

// 具体最大余额法算法可以网上搜索查看
function getPercentWithPrecision(valueList, precision) {
  // 根据保留的小数位做对应的放大
  const digits = Math.pow(10, precision)
  const sum = valueList.reduce((total, cur) => total + cur, 0)
  
  // 计算每项占比，并做放大，保证整数部分就是当前获得的席位，小数部分就是余额
  const votesPerQuota = valueList.map((val) => {
      return val / sum * 100 * digits
  })
  // 整数部分就是每项首次分配的席位
  const seats = votesPerQuota.map((val) => {
    return Math.floor(val);
  });
  // 计算各项的余额
  const remainder = votesPerQuota.map((val) => {
    return val - Math.floor(val)
  })
    
  // 总席位
  const totalSeats = 100 * digits
  // 当前已经分配出去的席位总数
  let currentSeats = votesPerQuota.reduce((total, cur) => total + Math.floor(cur), 0)
    
  // 按最大余额法分配
  while(totalSeats - currentSeats > 0) {
    let maxIdx = -1 // 余数最大的 id
    let maxValue = Number.NEGATIVE_INFINITY // 最大余额, 初始重置为无穷小

    // 选出这组余额数据中最大值
    for(var i = 0; i < remainder.length; i++) {
      if (maxValue < remainder[i]) {
        maxValue = remainder[i]
        maxIdx = i
      }
    }
        
    // 对应的项席位加 1，余额清零，当前分配席位加 1
    seats[maxIdx]++
    remainder[maxIdx] = 0
    currentSeats++
  }
    
  return seats.map((val) => `${val / totalSeats * 100}%`)
}

```

## 26. 限制并发

```js
async function asyncPool(poolLimit, iterable, iteratorFn) {
  // 用于保存所有异步请求
  const ret = [];
  // 用户保存正在进行的请求
  const executing = new Set();
  for (const item of iterable) {
    // 构造出请求 Promise
    const p = Promise.resolve().then(() => iteratorFn(item, iterable));
    ret.push(p);
    executing.add(p);
    // 请求执行结束后从正在进行的数组中移除
    const clean = () => executing.delete(p);
    p.then(clean).catch(clean);
    // 如果正在执行的请求数大于并发数，就使用 Promise.race 等待一个最快执行完的请求
    if (executing.size >= poolLimit) {
      await Promise.race(executing);
    }
  }
  // 返回所有结果
  return Promise.all(ret);
}

// 使用方法
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results => {
  console.log(results)
})
```

## 27. uuid(生成 uuid 的代码片段)

```js
const uuid = (a) =>
  a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid)

```
