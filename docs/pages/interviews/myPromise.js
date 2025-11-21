

// pedding ：等待 ，fulfilled ：成功 ， rejected ：失败
// class MyPromise {
//   constructor(executor) {
//     this.state = "pending"; // 初始状态
//     this.value = null; // 记录成功的值
//     this.reason = null; // 记录失败的原因
//     this.onFulfilledCallbacks = []; // 存储成功的回调
//     this.onRejectedCallbacks = []; // 存储失败的回调

//     const resolve = (value) => {
//       if (this.state === "pending") {
//         this.state = "fulfilled";
//         this.value = value;
//         this.onFulfilledCallbacks.forEach((fn) => fn(value));
//       }
//     };

//     const reject = (reason) => {
//       if (this.state === "pending") {
//         this.state = "rejected";
//         this.reason = reason;
//         this.onRejectedCallbacks.forEach((fn) => fn(reason));
//       }
//     };

//     try {
//       executor(resolve, reject);
//     } catch (error) {
//       reject(error);
//     }
//   }

//   then(onFulfilled, onRejected) {
//     return new MyPromise((resolve, reject) => {
//       if (this.state === "fulfilled") {
//         try {
//           const result = onFulfilled(this.value);
//           resolve(result);
//         } catch (error) {
//           reject(error);
//         }
//       } else if (this.state === "rejected") {
//         try {
//           const result = onRejected(this.reason);
//           resolve(result);
//         } catch (error) {
//           reject(error);
//         }
//       } else {
//         this.onFulfilledCallbacks.push(() => {
//           try {
//             const result = onFulfilled(this.value);
//             resolve(result);
//           } catch (error) {
//             reject(error);
//           }
//         });

//         this.onRejectedCallbacks.push(() => {
//           try {
//             const result = onRejected(this.reason);
//             resolve(result);
//           } catch (error) {
//             reject(error);
//           }
//         });
//       }
//     });
//   }

//   catch(onRejected) {
//     return this.then(null, onRejected);
//   }

//   finally(callback) {
//     return this.then(
//       (value) => {
//         callback();
//         return value;
//       },
//       (reason) => {
//         callback();
//         throw reason;
//       }
//     );
//   }

//   // ✅ 实现 Promise.all()
//   static all(promises) {
//     return new MyPromise((resolve, reject) => {
//       let results = [];
//       let completed = 0;

//       promises.forEach((promise, index) => {
//         MyPromise.resolve(promise)
//           .then((value) => {
//             results[index] = value; // 存储解析后的值
//             completed++;

//             if (completed === promises.length) {
//               // **只有所有 Promise 解析后，才返回最终数组**
//               resolve(results);
//             }
//           })
//           .catch(reject); // 任意一个 `Promise` 失败，立即 `reject`
//       });
//     });
//   }

//   // ✅ 实现 Promise.race()
//   static race(promises) {
//     return new MyPromise((resolve, reject) => {
//       promises.forEach((promise) => {
//         MyPromise.resolve(promise)
//           .then(resolve) // 谁先完成就返回
//           .catch(reject); // 失败的最快也会返回
//       });
//     });
//   }

//   // ✅ 让 all/race 也支持普通值
//   // static resolve(value) {
//   //   return new MyPromise((resolve) => resolve(value));
//   // }
//   static resolve(value) {
//     // console.log("static resolve", value);
//     if (value instanceof MyPromise) return value;
//     return new MyPromise((resolve) => resolve(value));
//   }
  
// }

class MyPromise {
  constructor(executor) {
    this.state = "pending"; // 记录 Promise 状态
    this.value = null; // 存储成功的值
    this.reason = null; // 存储失败的原因
    this.onFulfilledCallbacks = []; // 存储成功的回调
    this.onRejectedCallbacks = []; // 存储失败的回调
    this.isCanceled = false; // 记录 Promise 是否被取消

    const resolve = (value) => {
      if (this.state === "pending" && !this.isCanceled) {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(value));
      }
    };

    const reject = (reason) => {
      if (this.state === "pending" && !this.isCanceled) {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // ✅ then(): 处理成功回调
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled" && !this.isCanceled) {
        try {
          resolve(onFulfilled(this.value));
        } catch (error) {
          reject(error);
        }
      } else if (this.state === "rejected") {
        try {
          resolve(onRejected(this.reason));
        } catch (error) {
          reject(error);
        }
      } else {
        this.onFulfilledCallbacks.push(() => {
          try {
            resolve(onFulfilled(this.value));
          } catch (error) {
            reject(error);
          }
        });

        this.onRejectedCallbacks.push(() => {
          try {
            resolve(onRejected(this.reason));
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }

  // ✅ catch(): 处理失败回调
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // ✅ finally(): 无论成功或失败都执行
  finally(callback) {
    return this.then(
      (value) => {
        callback();
        return value;
      },
      (reason) => {
        callback();
        throw reason;
      }
    );
  }

  // ✅ resolve(): 让普通值也能变成 Promise
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  // ✅ reject(): 让错误也能变成 Promise
  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  // ✅ all(): 只有所有 Promise 都成功时，才 resolve
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let results = [];
      let completed = 0;

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise)
          .then((value) => {
            results[index] = value;
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          })
          .catch(reject); // 任意失败立即 reject
      });
    });
  }

  // ✅ race(): 谁先完成（成功或失败），就返回
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        MyPromise.resolve(promise).then(resolve).catch(reject);
      });
    });
  }

  // ✅ timeout(): 设定 Promise 超时
  static timeout(promise, ms) {
    return new MyPromise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Promise 超时 (${ms} ms)`));
      }, ms);

      MyPromise.resolve(promise)
        .then((value) => {
          console.log("value", value);
          
          clearTimeout(timer);
          resolve(value);
        })
        .catch((error) => {
          console.log("error", error);
          clearTimeout(timer);
          reject(error);
        });
    });
  }

  // ✅ cancel(): 手动取消 Promise
  cancel(reason = "Promise 被取消") {
    if (this.state === "pending") {
      this.isCanceled = true;
      this.state = "rejected";
      this.reason = reason;
      this.onRejectedCallbacks.forEach((fn) => fn(reason));
    }
  }

  // ✅ retry(): 失败时重试（默认 3 次）
  static retry(promiseFn, retries = 3, delay = 1000) {
    return new MyPromise((resolve, reject) => {
      const attempt = (count) => {
        MyPromise.resolve(promiseFn()) // 确保 `promiseFn()` 返回 `Promise`
          .then(resolve)
          .catch((error) => {
            if (count > 0) {
              console.log(`重试中...剩余次数: ${count}`);
              setTimeout(() => attempt(count - 1), delay);
            } else {
              reject(error); // **最后一次失败才 reject**
            }
          });
      };

      attempt(retries);
    });
  }

  // ✅ delay(): 让 Promise 延迟执行
  static delay(value, ms) {
    return new MyPromise((resolve) => {
      setTimeout(() => resolve(value), ms);
    });
  }
}

  const slowPromise = new MyPromise((resolve) =>
    setTimeout(() => resolve("完成"), 3000)
  );

  MyPromise.timeout(slowPromise, 2000)
    .then((value) => console.log("成功:", value))
    .catch((error) => console.log("失败:", error.message));


  return

const myAsyncFunction = async () => {
  try {
    const result = await new MyPromise((resolve, reject) => {
      console.log("异步操作开始");
      setTimeout(() => {
        console.log("setTimeout操作前");
        resolve("成功获取数据");
        console.log("异步操作结束");
      }, 1000);
      console.log("setTimeout操作后");
    });

    console.log("异步结果:", result);
  } catch (error) {
    console.log("发生错误:", error);
  } finally {
    console.log("finally 异步操作完成");
  }
};

myAsyncFunction();

// 返回一个Promise对象，在指定的时间后会自动解析resolve
const sleep = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

// 改变颜色
const changeColor = (color, time) => {
  console.log("traffic-light", color);
  return sleep(time);
};

const main = async () => {
  // 无限循环
  while (true) {
    await changeColor("red", 500);
    await changeColor("yellow", 1000);
    await changeColor("green", 3000);
  }
};

main();