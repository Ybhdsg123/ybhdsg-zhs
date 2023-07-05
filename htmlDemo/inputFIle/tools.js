{
  /* <script src="https://cdn.bootcdn.net/ajax/libs/spark-md5/3.0.2/spark-md5.min.js"></script>; */
}

const baseChuckSize = 1 * 1024 * 1024;
/**
 * @description: 将文件按照指定大小进行分块
 * @param {*} file 要分块的文件
 * @param {*} ChuckSize 指定分割的大小
 * @Author: zhs
 */
export const sliceFile = (file, ChuckSize = baseChuckSize) => {
  let result = [];
  // 从 0 字节开始分割，一次分割 baseChuckSize 大小
  for (let i = 0; i < file.size; i = i + baseChuckSize) {
    // File 对象是特殊类型的 Blob，File 接口也继承了 Blob 接口的属性：所以可以使用 blob.slice() 方法
    //  blob.slice() 截取文件
    result.push(file.slice(i, i + ChuckSize));
  }
  return result;
};

/**
 * @description: 通过 SparkMD5 得到文件的 hash 值，FileReader 是异步的，所以返回 promise
 * @param {*} chunks 分好片的数组文件
 * @param {*} progressCallbackFn 回调函数方法，用于告知外界进度的
 * @Author: zhs
 */
export const getFileSparkMd5 = (chunks, progressCallbackFn) => {
  return new Promise((resolve, reject) => {
    // 当前分的是第几块 默认0
    let currentChunk = 0;
    // 实例化 sparkMd5，sparkMd5 文件在 html 中引入过，本方法在引入后使用，全局可用
    const sparkMd5 = new SparkMD5.ArrayBuffer();
    // 实例化 FileReader
    const fileReader = new FileReader();
    // 文件读取失败时
    fileReader.onerror = reject;
    // 读取文件成功时
    fileReader.onload = (e) => {
      // 抛出一个函数，用于告知进度
      progressCallbackFn &&
        progressCallbackFn(Math.ceil((currentChunk / chunks.length) * 100));
      // 将二进制文件追加到spark中（官方方法）
      sparkMd5.append(e.target.result);
      // 读完后 currentChunk +1
      currentChunk++;
      // 当前 读取索引 < 分块的数组长度 ，就继续读取；否则读取完成，Promise带出结果
      if (currentChunk < chunks.length) {
        // // 将文件按照 assaybuffer 格式读取
        fileReader.readAsArrayBuffer(chunks[currentChunk]);
      } else {
        // resolve出去告知结果 spark.end官方api
        resolve(sparkMd5.end());
      }
    };
    // 文件读取器的readAsArrayBuffer方法开始读取文件，从blob数组中的第0项开始
    fileReader.readAsArrayBuffer(chunks[currentChunk]);
  });
};

/**
 * @description: // 开启辅助线程计算大文件的hash值，更快
 * @param {*} chunks 分好片的数组文件
 * @Author: zhs
 */
export const getFileSparkMd5ByThread = (chunks) => {
  return new Promise((resolve, reject) => {
    // 实例化一个webworker线程
    const worker = new Worker("./hash.js");
    // 主线程向辅助线程传递数据，发分片数组用于计算
    worker.postMessage({ chunks });
    worker.onmessage = (e) => {
      // 主线程向辅助线程传递数据，发分片数组用于计算
      const { hash, hashProgress } = e.data;
      //  更改进度条数据
      let progress = hashProgress;
      console.log(progress, hash);
      if (hash) {
        // 当hash值被算出来时，就可以关闭主线程了
        worker.terminate();
        resolve(hash); // 将结果带出去
      }
    };
  });
};

// 立即执行函数返回工具函数
// (function () {
//   return sliceFile;
// })();
