# 常见手写函数

[这些手写你都会吗](https://mp.weixin.qq.com/s/e3m_dS37HqiFvPefYH5Jrg)

## 1. [手动实现`Array.prototype.map`方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```js
// 第一种方式
function map(arr, callBack) {
  if (!Array.isArray(arr) || !arr.length || typeof callBack !== "function") {
    return [];
  }
  let newArr = [];
  // for (let index = 0; index < arr.length; index++) {
  //   // 将 mapCallback 返回的结果 push 到 result 数组中
  //   newArr.push(callBack(arr[index], index, arr));
  // }
  arr.forEach((item, index, arr) => {
    newArr.push(callBack(item, index, arr));
  });
  return newArr;
}

var arr = [1, 2, 3, 4, 5];
map(arr, (item) => item * 2); // [2, 4, 6, 8, 10]

// 第二种方式
// 挂载到原型上
Array.prototype._map = function (mapFn) {
  if (!Array.isArray(this) || !this.length || typeof mapFn !== "function") {
    return [];
  }
  const result = [];
  // this为调用的数组
  this.forEach((item, index, arr) => {
    result.push(mapFn(item, index, arr));
  });
  return result;
};
let a = arr._map((item) => item * 2); // [2, 4, 6, 8, 10]
```

### 语法

```js
map((element, index, array) => {
  /* … */
});
```

### 参数

- `callbackFn` 生成新数组元素的函数，使用三个参数：
- - `currentValue` : `callbackFn` 数组中正在处理的当前元素。
- - `index`: `callbackFn` 数组中正在处理的当前元素的索引。
- - `array`: `map` 方法调用的数组。
- `thisArg` **可选**
  执行 `callbackFn` 函数时被用作 `this` 的值。

### 应用

- ### 1 在一个 `String` 上使用 map 方法获取字符串中每个字符所对应的 ASCII 码组成的数组：

```js
const map = Array.prototype.map;
const charCodes = map.call("Hello World", (x) => x.charCodeAt(0));

// charCodes 现在等于 [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
```

- ### 2. 遍历用 `querySelectorAll` 得到的动态对象集合。在这里，我们获得了文档里所有选中的选项，并将其打印：

```js
const elems = document.querySelectorAll("select option:checked");
const values = Array.prototype.map.call(elems, ({ value }) => value);
```

- ### 3. 错误使用

> 1. `parseInt(string, radix)` 解析一个字符串并返回指定基数的十进制整数，radix 是 2-36 之间的整数，表示被解析字符串的基数。
> 2. `parseInt` 经常被带着一个参数使用，但是这里接受两个。第一个参数是一个表达式而第二个是回调函数的基，Array.prototype.map 传递 3 个参数： 元素值，索引，当前处理的数组

```js
// 错误
["1", "2", "3"].map(parseInt);
// 实际结果是 [1, NaN, NaN].

// 正确
[("1", "2", "3")].map((str) => parseInt(str));
// [1, 2, 3]
```

## 2. [手动实现`Array.prototype.filter`方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

```js
// 第一种
function filter(arr, filterCallback) {
  // 首先，检查传递的参数是否正确。
  if (
    !Array.isArray(arr) ||
    !arr.length ||
    typeof filterCallback !== "function"
  ) {
    return [];
  } else {
    let result = [];
    // 每次调用此函数时，我们都会创建一个 result 数组
    // 因为我们不想改变原始数组。
    // for (let i = 0, len = arr.length; i < len; i++) {
    //   // 检查 filterCallback 的返回值是否是真值
    //   if (filterCallback(arr[i], i, arr)) {
    //     // 如果条件为真，则将数组元素 push 到 result 中
    //     result.push(arr[i]);
    //   }
    // }
    arr.forEach((item, index, arr) => {
      if (filterCallback(item, index, arr)) {
        result.push(item);
      }
    });
    return result; // return the result array
  }
}

let arr = [1, 2, 3, 4, 5];
console.log(filter(arr, (item) => item > 2));

// 第二种
Array.prototype._filter = function (exc) {
  const result = [];
  this.forEach((item, index, arr) => {
    if (exc(item, index, arr)) {
      result.push(item);
    }
  });
  return result;
};
console.log(arr._filter((item) => item > 2));
```

### 语法

```js
filter((element, index, array) => {
  /* … */
});
```

### 参数

- `callbackFn` 用来测试数组中每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：
- - `currentValue` : 数组中当前正在处理的元素。
- - `index`: 数组中正在处理的当前元素的索引。
- - `array`: 调用了 filter() 的数组本身。
- `thisArg` **可选**
  执行 `callbackFn` 函数时被用作 `this` 的值。

## 3. [手动实现`Array.prototype.reduce`方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

### 3.2 第一种版本

```js
function reduce(arr, reduceCallback, initialValue) {
  // 首先，检查传递的参数是否正确。
  if (
    !Array.isArray(arr) ||
    !arr.length ||
    typeof reduceCallback !== "function"
  ) {
    return [];
  } else {
    // 如果没有将initialValue传递给该函数，我们将使用第一个数组项作为initialValue
    let hasInitialValue = initialValue !== undefined;
    let value = hasInitialValue ? initialValue : arr[0];

    // 如果有传递 initialValue，则索引从 1 开始，否则从 0 开始
    for (let i = hasInitialValue ? 0 : 1, len = arr.length; i < len; i++) {
      value = reduceCallback(value, arr[i], i, arr);
    }
    return value;
  }
}
let arr = [1, 2, 3, 4, 5];
console.log(reduce(arr, (pre, cur) => pre + cur, 0)); // 15
```

### 3.2 第二种版本

```js
function reduce(arr, fn, initial = 0) {
  // 初始值
  let result = initial;
  arr.forEach((item, index, arr) => {
    // 从第一个item开始
    result = fn(result, item, index, arr);
  });
  return result;
}
let arr = [1, 2, 3, 4, 5];
console.log(reduce(arr, (pre, cur) => pre + cur, 1));
```

### 3.3 第三种版本

```js
Array.prototype._reduce = function (fn, initial = 0) {
  let result = initial; // 初始值
  this.forEach((item, index, arr) => {
    result = fn(result, item, index, arr);
  });
  return result;
};
let arr = [1, 2, 3, 4, 5];
console.log(arr._reduce((pre, cur) => pre + cur, 0)); // 15
```

### 语法

```js
arr.reduce((previousValue, currentValue, currentIndex, array) => {
  /* … */
}, initialValue);
```

### 参数

- **`previousValue` 必需**。上一次调用 callbackFn 时的返回值。在第一次调用时，若指定了初始值 `initialValue`，其值则为 `initialValue`，否则为数组索引为 0 的元素 `array[0]`;
- **`currentValue` 必需**。数组中正在处理的元素。在第一次调用时，若指定了初始值 `initialValue`，其值则为数组索引为 0 的元素 `array[0]`，否则为 `array[1]`；
- **`currentIndex` 可选**。表示当前正在处理的数组元素的索引，若提供 `initialValue` 值，则起始索引为 0，否则起始索引为 1；
- array 可选。表示原数组；
- initialValue 可选。表示初始值。

### 应用

- ### 1. 累加对象数组里的值

```js
let initialValue = 0;
let sum = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce(
  (previousValue, currentValue) => previousValue + currentValue.x,
  initialValue
);

console.log(sum); // logs 6
```

- ### 2. 将二维数组转化为一维

```js
let flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduce(
  (previousValue, currentValue) => previousValue.concat(currentValue),
  []
);
```

- ### 3. 计算数组中每个元素出现的次数

```js
let names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

let countedNames = names.reduce(function (allNames, name) {
  if (name in allNames) {
    // 已存在 +1
    allNames[name]++;
  } else {
    // 第一次为 1
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

- ### 4. 按属性对 object 分类

```js
let people = [
  { name: "Alice", age: 21 },
  { name: "Max", age: 20 },
  { name: "Jane", age: 20 },
];
function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    // 拿到给定属性字段值的 value
    let key = obj[property];
    // 在初始值 acc 中不存在的话就创建一个 []
    if (!acc[key]) {
      acc[key] = [];
    }
    // 像里面添加
    acc[key].push(obj);
    return acc;
  }, {});
}
let groupedPeople = groupBy(people, "age");
// groupedPeople is:
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }
```

- ### 5. 数组去重

**5.1 兼容 Set 和 Array.from() 的环境**

```js
let arrayWithNoDuplicates = Array.from(new Set(myArray));
```

**5.2 reduce()**

```js
let myArray = ["a", "b", "a", "b", "c", "e", "e", "c", "d", "d", "d", "d"];
let myArrayWithNoDuplicates = myArray.reduce(function (
  previousValue,
  currentValue
) {
  if (previousValue.indexOf(currentValue) === -1) {
    previousValue.push(currentValue);
  }
  return previousValue;
},
[]);

console.log(myArrayWithNoDuplicates);
```

- ### 6. 使用 .reduce() 替换 .filter().map()
  > 使用 Array.filter() 和 Array.map() 会遍历数组两次，而使用具有相同效果的 Array.reduce() 只需要遍历一次，这样做更加高效。（如果你喜欢 for 循环，你可用使用 Array.forEach() 以在一次遍历中实现过滤和映射数组）

* ### 7. 按顺序运行 Promise

```js
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  );
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
  return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log); // 1200
```

## 4. [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

`Object.create()` 方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）

```js
Object.prototype._create = function (proto) {
  const Fn = function () {};
  Fn.prototype = proto;
  return new Fn();
};
function A() {}
const obj = Object.create(A);
const obj2 = Object._create(A);
console.log(obj.__proto__ === A); // true
console.log(obj.__proto__ === A); // true
```

### 语法

```js
Object.create(proto);
Object.create(proto, propertiesObject);
```

### 参数

`proto`: 新创建对象的原型对象。

`propertiesObject` **可选**
如果该参数被指定且不为 undefined，则该传入对象的自有可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）将为新创建的对象添加指定的属性值和对应的属性描述符。这些属性对应于 Object.defineProperties() 的第二个参数。

### 返回值

一个新对象，带着指定的原型对象及其属性。

### 如何创建没有原型的对象？

```js
const normalObj = {}; // 创建一个正常的对象
const nullProtoObj = Object.create(null); // 创建一个原型为 "null "的对象
console.log("normalObj is: " + normalObj); // shows "normalObj is: [object Object]"
console.log("nullProtoObj is: " + nullProtoObj); // throws error: Cannot convert object to primitive value

// 上面这样是错误的，需要添加 toString()方法
nullProtoObj.toString = Object.prototype.toString; // 因为新的对象没有toString，所以把原来的通用对象加回来。
console.log("nullProtoObj is: " + nullProtoObj); // shows "nullProtoObj is: [object Object]"
```

## 5. 为什么调用此函数时此代码中 b 会变成全局变量

```js
function myFun() {
  let a = (b = 0);
}
myFun();
```

> 原因是`赋值运算符 or = 具有从右到左的关联性或计算`。这意味着，当多个赋值运算符出现在单个表达式中时，它们从右到左计算。所以我们的代码变得像这样。
> 首先，计算表达式 b = 0，在本例中不声明 b。因此，JS 引擎在此函数之外创建一个全局变量 b，之后表达式 b = 0 的返回值为 0，并分配给带有 let 关键字的新局部变量 a。

```js
function myFun() {
  let a, b;
  a = b = 0;
}
```

## 6. Function.prototype.call

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

```js
Function.prototype._call = function (ctx, ...args) {
  // 如果不为空，则需要进行对象包装
  const o = ctx == undefined ? window : Object(ctx);
  // 给 ctx 添加独一无二的属性
  const key = Symbol();
  o[key] = this;
  // 执行函数，得到返回结果
  const result = o[key](...args);
  // 删除该属性
  delete o[key];
  return result;
};

const obj = {
  name: "11",
  fun() {
    console.log(this.name);
  },
};

const obj2 = { name: "22" };
obj.fun(); // 11
obj.fun.call(obj2); // 22
obj.fun._call(obj2); // 22
```

## 7. Function.prototype.bind

`bind() `方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
const obj = {
  name: "11",
  fun() {
    console.log(this.name);
  },
};
Function.prototype._bind = function (ctx, ...args) {
  // 获取函数体
  const _self = this;
  // 用一个新函数包裹，避免立即执行
  const bindFn = (...reset) => {
    return _self.call(ctx, ...args, ...reset);
  };
  return bindFn;
};
const obj2 = { name: "22" };
obj.fun(); // 11
const fn = obj.fun.bind(obj2);
const fn2 = obj.fun._bind(obj2);
fn(); // 22
fn2(); // 22
```

## 8. New 关键字

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

```js
const _new = function(constructor) {
  // 创建一个空对象
  const obj = {}
  // 原型链挂载
  obj.__proto__ = constructor.prototype;
  // 将obj 复制给构造体中的 this，并且返回结果
  const result = constructor.call(obj)
  // 如果返回对象不为一个对象则直接返回刚才创建的对象
  return typeof result === 'object' && result !== null ? : result : obj
}
```

## 9. 浅拷贝

```js
const _shallowClone = (target) => {
  // 基本数据类型直接返回
  if (typeof target === "object" && target !== null) {
    // 获取target 的构造体
    const constructor = target.constructor;
    // 如果构造体为以下几种类型直接返回
    if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name))
      return target;
    // 判断是否是一个数组
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (prop in target) {
      // 只拷贝其自身的属性
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
};
```

## 10. 深拷贝

实现思路和浅拷贝一致，只不过需要注意几点

- 函数 正则 日期 ES6 新对象 等不是直接返回其地址，而是重新创建
- 需要避免出现循环引用的情况

**第一种**

```js
const _completeDeepClone = (target, map = new WeakMap()) => {
  // 基本数据类型，直接返回
  if (typeof target !== "object" || target === null) return target;
  // 函数 正则 日期 ES6新对象,执行构造体，返回新的对象
  const constructor = target.constructor;
  if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name))
    return new constructor(target);
  // map标记每一个出现过的属性，避免循环引用
  if (map.get(target)) return map.get(target);
  map.set(target, true);
  const cloneTarget = Array.isArray(target) ? [] : {};
  for (prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = _completeDeepClone(target[prop], map);
    }
  }
  return cloneTarget;
};
```

**第二种**

```js
function deepClone(obj) {
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

## 11. 节流

节流函数（throttle）就是让事件处理函数（handler）在大于等于执行周期时才能执行，周期之内不执行，**即事件一直被触发，那么事件将会按每小段固定时间一次的频率执行。**

```js
function throttle(fn, delay = 300) {
  // 这里始终记得字节二面的时候，建议我不写 flag 好家伙
  let isThrottling = false;
  // 核心思路，函数多次执行只有当 isThrottling 为 false 时才会进入函数体
  return function (...args) {
    if (!isThrottling) {
      isThrottling = true;
      setTimeout(() => {
        isThrottling = false;
        fn.apply(this, args);
      }, delay);
    }
  };
}
```

## 12. 防抖

事件响应函数在一段时间后才执行，如果这段时间内再次调用，则重新计算执行时间

```js
function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    // 每次进来都会清空定时器，所以在 delay 事件中重复执行之后执行最后一次
    clearInterval(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

## 13. 发布订阅者模式

:::details

```js
// 发布订阅者模式
class PublishSubscribersPatterns {
  constructor() {
    // 创建一个缓存列表 调度中心
    this.message = {};
  }

  /**
   * @description:   向消息队列添加订阅者
   * @param {*} type 事件名（事件类型）
   * @param {*} callback 回调函数
   * @Author: zhs
   */
  $on(type, callback) {
    // 如果没有这个属性就初始化一个 存放callback的数组
    if (!this.message[type]) {
      this.message[type] = [];
    }

    // 有了就添加
    this.message[type].push(callback);
  }

  /**
   * @description:  删除消息队列的订阅者
   * @param {*} type 事件名（事件类型）
   * @param {*} callback 回调函数 不传直接删掉整个事件
   * @Author: zhs
   */
  $off(type, callback) {
    // 判断是否有 type 这个事件类型，没有直接return
    if (!this.message[type]) return;

    // 判断是否有 callback 这个回调函数
    if (!callback) {
      // 如果没有这个回调函数，直接删除整个注册的 事件类型
      this.message[type] = [];
    }

    // 如果有这个 callback，就过滤出它
    this.message[type] = this.message[type]?.filter((cb) => cb !== callback);
  }

  /**
   * @description:  触发订阅者的执行
   * @param {*} type 事件名（事件类型）
   * @Author: zhs
   */
  $emit(type) {
    // 判断是否有订阅
    if (!this.message[type]) return;

    // 如果有订阅，就对这个`type`事件做一个轮询 (for循环)，并执行回调函数
    this.message[type].forEach((cb) => cb());
  }
}
// 使用构造函数创建一个订阅者
const subscribers1 = new PublishSubscribersPatterns();

// 向这个  subscribers1 订阅者委托一些事情

// 1. 注册事件 buy 并执行 handlerA handlerB
subscribers1.$on("buy", handlerA);
subscribers1.$on("buy", handlerB);

// 取消单个
subscribers1.$off("buy", handlerA);

// 执行
subscribers1.$emit("buy");

// 2. 注册事件 eat 并执行 handlerC
subscribers1.$on("eat", handlerC);

// 取消全部
subscribers1.$off("eat");

// 执行
subscribers1.$emit("eat");

function handlerA() {
  console.log("handlerA");
}
function handlerB() {
  console.log("handlerB");
}
function handlerC() {
  console.log("handlerC");
}
```

:::
