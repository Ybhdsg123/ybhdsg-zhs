# 深入理解 Promise

## Promise 规范

1. 所有的异步场景，都可以看做是一个异步任务，每个异步任务，在 JS 中应该表现为一个**对象**，该对象称之为 **Promise 对象**，也叫做任务对象

3. 每个任务对象，都应该有 **两个阶段、三个状态**

   **两个阶段**：unsettled（未决阶段）、settled（已决阶段）

   **三个状态**：pending（挂起状态）、fulfilled（完成状态）、rejected（ 失败状态）

   

   根据常理，他们之间存在以下逻辑：

   - 任务总是从未决到已决阶段，无法逆行

   - 任务总是从挂起状态变成完成或失败状态，无法逆行

   - 时间不能倒流，历史不可改写，任务一旦完成或者失败，状态就固定下来，永远无法改变




3. `挂起 => 完成`，称之为 `resolve`; `挂起 => 失败` 称之为 `reject`。 任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因

   

4. 可以针对任务进行后续处理，针对完成状态的后续处理称之为 `onFulfilled`, 针对失败的后续处理称之为 `onRejected`

----

## Promise API

ES6 提供了一套 API，实现了 Promise A+ 规范

基本使用如下：

```javascript
// 创建一个任务对象，该任务立即进入 pending 状态
const pro = new Promise((resolve, reject) => {
    // 任务的具体执行流程，该函数会立即被执行
    // 调用 resolve(data), 可将任务变肥 fulfilled 状态，data 为需要传递的相关数据
    // 调用 reject(reason)，可将任务变为 rejected 状态，reason 为需要传递的失败原因
})

pro.then(
    data = > {
	    // onFulfilled 函数，当任务完成后，会自动运行该函数，data 为任务完成的相关数据
    },
    reason => {
        // onRejected 函数，当任务失败后，会自动运行该函数，reason 为任务失败的相关原因
    }
)
```

-----

## catch 方法

`.catch(onRejected) = .then(null, onRejected)`

```javascript
new Promise((resolve, reject) => {
    reject(new Error('abc'));
}).then(null, err => {
    console.log('失败了！！'， err)
})

// 等同于上面的写法
new Promise((resolve, reject) => {
    reject(new Error('abc'));
}).catch(err => {
    console.log('失败了！！'， err)
})
```

---

## 链式调用

1. then 方法必定会返回一个新的 Promise

   可以理解为后续处理也是一个任务

   

2. 新任务的状态取决于后续处理：

   - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据
   - 若有后续处理但是还未执行，新任务挂起
   - 若后续处理执行了，则根据后续处理的情况确定新任务的状态
     - 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
     - 后续处理执行有错，新任务的状态为失败，数据为异常对象
     - 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致



由于链式任务的存在，异步代码拥有了更强的表达力

```javascript
// 常见任务处理代码

/**
 * 任务成功后，执行处理 1，失败则执行处理 2
 */
pro.then(处理1).catch(处理2)

/**
 * 任务成功后，依次执行处理 1、处理 2
 */
pro.then(处理1).then(处理2)

/**
 * 任务成功后，执行处理 1，失败则执行处理 2，若任务失败或前面的处理有误，执行处理3
 */
pro.then(处理1).then(处理2).catch(处理3)
```

---

## Promise 的静态方法

| 方法名                       | 含义                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| Promise.resolve(data)        | 直接返回一个完成状态的任务                                   |
| Promise.reject(reason)       | 直接返回一个拒绝状态的任务                                   |
| Promise.all(任务数组)        | 返回一个任务<br />任务数组全部成功则成功<br />任何一个失败则失败 |
| Promise.any(任务数组)        | 返回一个任务<br />任务数组任一成功则成功<br />任务全部失败则失败 |
| Promise.allSettled(任务数组) | 返回一个任务<br />任务数组全部已决则成功<br />该任务不会失败 |
| Promise.race(任务数组)       | 返回一个任务<br />任务数组任一已决则已决，状态和其一致       |

---

## async 和 await

有了 Promise，异步任务就有了一种统一的处理方式

有了统一的处理方式， ES 官方就可以对其进一步优化

ES7推出了两个关键字 `async` 和 `await` , 用于更加优雅的表达 Promise



### async

`async` 关键字用于修饰函数，被它修饰的函数，一定返回 Promise

```javascript
async function method1() {
    return 1; // 该函数的返回值是 Promise 完成后的数据
}

method1(); // Promise { 1 }

async function method2() {
    // 若返回的是 Promise，则 method 得到的 Promise 状态和其一致
    return Promise.resolve(1); 
}

method2(); // Promise { 1 }

async function method3() {
    // 若执行过程中报错，则任务是 rejected
    throw new Error(1); 
}

method3();
```



### await

`await` 关键字表示等待某个 Promise 完成，他必须用于 `async` 函数中

```js
async function method() {
    const n = await Promise.rewolve(1);
    console.log(n); // 1
}

// 上面的函数等同于
function method() {
    return new Promise((resolve, reject) => {
        Promise.resolve(1).then(n => {
            console.lgo(n);
            resolve(1)
        })
    })
}
```

`await` 也可以等待其他数据

```js
async function method() {
    const n = await 1; // 等同于 await Promise.resolve(1)
}
```

---

## 事件循环

进入事件队列的函数有以下几种：

- `setTimeout` 的回调，宏任务（macro task）
- `setInterval` 的回调，宏任务（macro task）
- Promise 的 `then` 函数回调，**微任务** （micro task）
- `requestAnimationFrame` 的回调，宏任务（macro task）
- 事件处理函数，宏任务（macro task）



## 一些面试题



1. 下面代码输出结果是什么

```js
const promie = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2)
});

promise.then(() => {
    console.log(3);
})

console.log(4)

// 1 2 4 3
```



2. 下面代码输出结果是什么

```js
const promise = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        console.log(2);
        resolve();
        console.log(3)
    });
});

promise.then(() => {
    console.log(4)
});

console.log(5)

// 1 5 2 3 4
```



3. 下面代码输出结果是什么

```js
const promise1 - new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 1000)
});

const promise2 = promise1.catch(() => {
    returun 2;
})

console.log('promise1', promise1);
console.log('promise2', promise2);

setTimeout(() => {
    console.log('promise1', promie1);
    console.log('promise2', promise2);
}, 2000)

// promise1 Promise { <Pending> }
// promise2 Promise { <Pending> }

// promise1 Promise undefined
// promise2 Promise undefined
```



4. 下面代码的输出结果是什么

```js
asunc function m() {
    const n = await 1;
    console.log(n);
}

m();
console.log(2);

// 2 1
```



5. 下面代码的输出结果是什么

```js
async function m() {
    const n = await 1;
    console.log(n)
};

(async () => {
    await m();
    console.log(2);
})();

console.log(3);

// 3 1 2
```



6. 下面代码的输出结果是什么

```js
async function m1() {
    return 1;
}

async function m2() {
    const n = await m1();
    console.log(n);
    return 2;
}

async function m3() {
    const n = m2();
    console.log(n);
    return 3;
}

m3().then(n => {
    console.log(n)
});

m3();

console.log(4)

// Promise { <pending> }
// Promise { <pending> }
// 4
// 1
// 3
// 1

```



7. 下面代码的输出结果是什么

```js
 Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);

// 1
```



8. 下面代码的输出结果是什么

```js
var a;
var b = new Promise((resolve, reject) => {
    console.log('promise1');
    setTimeout(() => {
        resolve();
    }, 1000)
}).then(() => {
    console.log("promise2");
}).then(() => {
    console.log('promise3');
}).then(() => {
    console.log('promise4')
});

a = new Promise(async (resolve, reject) => {
    console.log(a);
    await b;
    console.log(a);
    console.log("after1");
    await a;
    resolve(true);
    console.log('after2')
})

console.log('end');

// promise1
// undefined
// end
// promise2
// promise3
// pormise4
// Promise { <pending> }
// after1 
```



9. 下面代码的输出结果是什么

```js
async function async1() {
    console.log('async1 start');
	await async2();
    console.log('async1 end');
}

async function async2() {
    console.log("async2");
}

console.log("script start");

setTimeout(function () {
    console.log("setTimeout")
}, 0);

async1();

new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
});

console.log("script end");


// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```









































