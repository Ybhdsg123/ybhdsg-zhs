export const a = () => {
  console.log(1111);
};

// pedding ：等待 ，fulfilled ：成功 ， rejected ：失败
class Promise {
  constructor(executor) {
    //初始化状态为 pedding
    this.state = "pedding";
    // 成功的值
    this.value = undefined;
    // 失败的值
    this.reason = undefined;
    // 成功时存放的数组
    let onResolvedCallbacks = [];
    // 失败时存放的数组
    let onRejectedCallbacks = [];
    let resolve = (value) => {
      // state 改变的话 则 resolve 执行会失败
      if (this.state === "pedding") {
        // resolve 执行后，改变 state 的值
        this.state = "fulfilled";
        // 存储成功的值
        this.value = value;
        // 一但 resolve ，调用成功数组的函数
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (value) => {
      // state 改变的话 则 reject 执行会失败
      if (this.state === "pedding") {
        // reject 执行后，改变 state 的值
        this.state = "fulfilled";
        // 存储失败的值
        this.reason = value;
        // 一但 reject ，调用失败数组的函数
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    // 如果直接执行失败，则直接 reject
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  // then 方法 有两个参数onFulfilled onRejected
  then(onFulfilled, onRejected) {
    // 状态为 fulfilled，执行 onFulfilled，传入成功的值
    if (this.state === "fulfilled") {
      onFulfilled(ths.value);
    }
    // 状态为 rejected，执行 onRejected，传入失败的原因
    if (this.state === "fulfilled") {
      onRejected(ths.reason);
    }
    // 当状态state为pending时
    if (this.state === "pending") {
      // onFulfilled传入到成功数组
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      // onRejected传入到失败数组
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
