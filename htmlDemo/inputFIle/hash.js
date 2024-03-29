// 使用importScripts引入cdn使用
self.importScripts(
  "https://cdn.bootcdn.net/ajax/libs/spark-md5/3.0.2/spark-md5.min.js"
);
// 监听主线程的 message 事件
self.onmessage = (e) => {
  const { chunks } = e.data; // 获取到分片数组
  const spark = new self.SparkMD5.ArrayBuffer(); // 实例化spark对象用于计算文件hash
  let currentChunk = 0;
  let fileReader = new FileReader();
  fileReader.onload = (e) => {
    spark.append(e.target.result);
    currentChunk = currentChunk + 1;
    if (currentChunk < chunks.length) {
      fileReader.readAsArrayBuffer(chunks[currentChunk]);
      // 未曾计算完只告知主线程计算进度
      self.postMessage({
        hashProgress: Math.ceil((currentChunk / chunks.length) * 100),
      });
    } else {
      // 计算完了进度和hash结果就都可以告知了
      self.postMessage({
        hash: spark.end(),
        hashProgress: 100,
      });
      // 关闭该进程
      self.close();
    }
  };
  fileReader.readAsArrayBuffer(chunks[currentChunk]);
};
