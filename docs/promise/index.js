// 记录 Promise 的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 运行一个微队列任务
 * 把传递的函数添加到微队列中
 * @param {Function} callback 传递的函数
 */
function runMicroTask(callback) {
    // 判断 node 环境
    if (process && process.nextTick) {
        process.nextTick(callback);
    } else if (MutationObserver) {
        const p = document.createElement("p");
        const observer = new MutationObserver(callback);
        // 观察该元素的内部变化
        observer.observe(p, { childList: true });
        p.innerHTML = "1";
    } else {
        setTimeout(callback, 0);
    }
}

/**
 * 判断一个对象是否是 Promise
 * @param {*} obj 对象
 * @returns {boolean} 是否是 Promise
 */
function isPromise(obj) {
    return !!obj && typeof obj === "object" && typeof obj.then === "function";
}

class MyPromise {
    /**
     * 创建一个 promise
     * @param {Function} executor 任务执行器，立即执行
     */
    constructor(executor) {
        this._state = PENDING; // 状态
        this._value = undefined; // 数据
        this._handlers = []; // 处理函数形成的队列

        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
            console.error(error);
        }
    }

    /**
     * 向处理队列中添加一个函数
     * @param {Function} executor 添加函数
     * @param {String} state 该函数什么状态执行
     * @param {Function} resolve 让 then 函数返回的 Promise 成功
     * @param {Function} reject 让 then 函数返回的 Promise 失败
     */
    _pushHandler(executor, state, resolve, reject) {
        this._handlers.push({
            executor,
            state,
            resolve,
            reject,
        });
    }

    /**
     * 根据实际情况，执行队列
     */
    _runHandlers() {
        if (this._state === PENDING) return;

        while (this._handlers[0]) {
            const handler = this._handlers[0];
            this._runOneHandler(handler);
            this._handlers.shift();
        }
    }

    /**
     * 处理一个 handler
     * @param {Object} handler 处理函数
     */
    _runOneHandler({ executor, state, resolve, reject }) {
        runMicroTask(() => {
            // 如果状态不一致，则不执行
            if (this._state !== state) return;

            if (typeof executor !== "function") {
                // 传递后续处理不是一个函数
                this._state === FULFILLED
                    ? resolve(this._value)
                    : reject(this._value);
                return;
            }

            try {
                const result = executor(this._value);
                if (isPromise(result)) {
                    result.then(resolve, reject);
                    return;
                } else {
                    resolve(result);
                }
            } catch (error) {
                reject(error);
                console.error(error);
            }
        });
    }

    /**
     * Promise A+ 规范的 then 方法
     * @param {Function} onFulfilled 成功回调
     * @param {Function} onRejected 失败回调
     */
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
            this._pushHandler(onRejected, REJECTED, resolve, reject);
            this._runHandlers(); // 执行队列
        });
    }

    /**
     * 仅处理失败的场景
     * @param {Function} onRejected 失败回调
     * @returns {MyPromise} 新的 Promise
     */
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    /**
     * 无论成功还是失败，都会执行
     * @param {Function} onSettled 最终回调
     * @returns {MyPromise} 新的 Promise
     */
    finally(onSettled) {
        return this.then(
            (data) => {
                onSettled();
                return data;
            },
            (reason) => {
                onSettled();
                throw reason;
            }
        );
    }

    /**
     * 更改任务状态
     * @param {string} state 新状态
     * @param {any} value 相关数据
     */
    _changeState(newState, value) {
        // 如果状态不是 pending，目前状态已经改变，则不进行状态改变
        if (this._state !== PENDING) return;
        this._state = newState;
        this._value = value;
        this._runHandlers(); // 状态变化，执行队列
    }

    /**
     * 标记当前任务完成
     * @param {any} value 任务完成的相关数据
     */
    _resolve(data) {
        // 改变状态和数据
        this._changeState(FULFILLED, data);
    }

    /**
     * 标记当前任务失败
     * @param {any} reason 任务失败的相关数据
     */
    _reject(reason) {
        // 改变状态和数据
        this._changeState(REJECTED, reason);
    }

    /**
     * 返回一个已完成的 Promise
     * 特殊情况：
     * 1. 传递的 data 本身就是 ES6 的 Promise 对象
     * 2. 传递的 data 是 PromiseLike （Promise A+ 规范）,返回新的 Promise，状态和其保持一致
     * @param {any} data 数据
     * @returns {MyPromise} 新的 Promise
     */
    static resolve(data) {
        if (data instanceof MyPromise) {
            return data;
        }
        return new MyPromise((resolve, reject) => {
            if (isPromise(data)) {
                data.then(resolve, reject);
            } else {
                resolve(data);
            }
        });
    }

    /**
     * 得到一个被拒绝的 Promise
     * @param {any} reason 失败的原因
     * @returns {MyPromise} 新的 Promise
     */
    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }

    /**
     * 得到一个新的 Promise，该 Promise 的状态取决于 Promise 执行
     * proms 是一个可迭代对象，包含多个 Promise
     * 全部 Promise 成功，则返回的 Promise 成功，数据为所有 Promise 成功的数据， 顺序是按照传入的顺序排列
     * 有一个 Promise 失败，则返回的 Promise 失败，原因为第一个失败的 Promise 的原因
     *
     * @param {iterator} promises 可迭代对象，包含多个 Promise
     * @returns {MyPromise} 新的 Promise
     */
    static all(proms) {
        return new MyPromise((resolve, reject) => {
            try {
                const results = [];
                let count = 0;
                let fulfilledCount = 0;

                for (const pro of proms) {
                    let index = count;
                    MyPromise.resolve(pro).then((data) => {
                        fulfilledCount++;
                        results[index] = data;
                        if (fulfilledCount === count) {
                            // 当前是最后一个 Promise 完成了
                            resolve(results); // 全部成功，返回所有数据
                        }
                    }, reject);
                    count++;
                }

                if (count === 0) resolve(results);
            } catch (error) {
                reject(error);
                console.error(error);
            }
        });
    }

    /**
     * 等待所有的 Promise 有结果之后
     * 该方法返回的 Promise 完成
     * 并且按照顺序将所有的结果汇总
     * @param {iterator} proms 可迭代对象，包含多个 Promise
     */
    static allSettled(proms) {
        const ps = [];
        for (const pro of proms) {
            ps.push(
                MyPromise.resolve(pro).then(
                    (data) => ({ status: FULFILLED, value: data }),
                    (reason) => ({ status: REJECTED, reason })
                )
            );
        }
        return MyPromise.all(ps);
    }

    /**
     * 返回一个 Promise，该 Promise 的状态取决于最先完成的 Promise
     * 如果最先完成的是成功的 Promise，则返回的 Promise 成功，数据是该 Promise 成功的数据
     * 如果最先完成的是失败的 Promise，则返回的 Promise 失败，数据是该 Promise 失败的原因
     * @param {iterator} proms 可迭代对象，包含多个 Promise
     */
    static race(proms) {
        return new MyPromise((resolve, reject) => {
            for (const pro of proms) {
                MyPromise.resolve(pro).then(resolve, reject);
            }
        });
    }
}
