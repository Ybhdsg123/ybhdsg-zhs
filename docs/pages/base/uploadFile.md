# 原生文件上传相关

## html

::: tip input 属性
`multiple`：多选文件

`webkitdirectory`：选择文件夹
:::

:::details html 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文件上传demo</title>
    <link rel="stylesheet" href="./css/index.css" />
  </head>
  <body>
    <div class="upload select">
      <!-- 选择区域 -->
      <div class="upload-select">
        <input type="file" />
      </div>
      <!-- 预览区域 -->
      <div class="upload-progress" style="--percent: 20">
        <div class="progress-bar">
          <button>取消</button>
        </div>
      </div>
      <!-- 结果区域 -->
      <div class="upload-result">
        <button>X</button>
      </div>
      <img src="./files/small.jpg" alt="" class="preview" />
    </div>
    <script src="./js/index.js"></script>
  </body>
</html>
```

:::

## css

:::tip

1.  [attr()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/attr)

    `attr()`: 可以将自定义属性值作用于伪元素

    ```html
    <p data-foo="hello">world</p>
    p:before { content:attr(data-foo) " ";
    ```

2.  [counter()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter)

    CSS 函数`counter()`，返回一个代表计数器的当前值的字符串。它通常和伪元素搭配使用，但是理论上可以在支持`<string>`值的任何地方使用。

3.  [counter-reset](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-reset)

    `counter-reset` 属性用于将 CSS 计数器 (en-US) 重置为制定值

    ```css
    .progress-bar::before {
      counter-reset: progress var(--percent);
      content: counter(progress) "%";
    }
    ```

4.  [counter-increment](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-increment)

    `counter-increment`属性用于将 CSS Counters (en-US)的值增加给定值。可以使用 `counter-reset` 属性重置计数器的值。

:::

:::details css 文件

```css
.upload {
  --border-color: #dcdfe6;
  --font-color: #8c939d;
  --primary-color: #409eff;
  --danger-color: #eb685e;
}

.upload * {
  box-sizing: border-box;
}

.upload {
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

.upload .preview {
  object-fit: contain;
  z-index: 1;
}

.upload > * {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.upload > div {
  display: none;
  z-index: 2;
}

.upload.select .upload-select {
  display: block;
}
.upload.select .preview {
  display: none;
}

.upload.progress .upload-progress {
  display: block;
}

.upload.result .upload-result {
  display: block;
}

.upload-select {
  border-radius: inherit;
  border: 1px dashed var(--border-color);
  cursor: pointer;
}
.upload-select::before,
.upload-select::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 30px;
  height: 3px;
  border-radius: 3px;
  background: var(--font-color);
  transform: translate(-50%, -50%);
}
.upload-select::after {
  transform: translate(-50%, -50%) rotate(90deg);
}
.upload-select input {
  display: none;
}
.upload-select:hover {
  border-color: var(--primary-color);
}

.upload-progress {
  background: #00000080;
}

.progress-bar {
  position: absolute;
  width: 90%;
  height: 3px;
  background: #fff;
  border-radius: 3px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 12px;
}
.progress-bar::before {
  counter-reset: progress var(--percent);
  content: counter(progress) "%";
  /* content: var(--percent); */
  position: absolute;
  left: 50%;
  top: -20px;
  transform: translateX(-50%);
}
.progress-bar::after {
  content: "";
  position: absolute;
  left: 0;
  border-radius: inherit;
  width: calc(1% * var(--percent));
  height: 100%;
  background: var(--primary-color);
}
.upload-progress::after {
  content: "文件上传中...";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 5px);
  white-space: nowrap;
  opacity: 0.8;
  color: #fff;
  font-size: 12px;
}
.upload button {
  border: none;
  outline: none;
  background: none;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
  user-select: none;
}
.progress-bar button {
  left: 50%;
  position: absolute;
  top: 25px;
  transform: translateX(-50%);
}
.progress-bar button:hover {
  color: var(--danger-color);
}

.upload-result {
  border: 1px dashed var(--border-color);
  border-radius: inherit;
  overflow: hidden;
}

.upload-result button {
  width: 30px;
  height: 20px;
  background: var(--font-color);
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 2px;
  color: #fff;
}
.upload-result button:hover {
  background: var(--danger-color);
}
```

:::

## js

::: tip 注意点

1.  将 `div` 元素变为可拖拽元素(拖拽上传)

```js
// 拖拽 当拖动的元素或选择文本输入有效的放置目标时，会触发此事件。 只触发一次
doms.selectFile.ondragenter = (e) => {
  e.preventDefault(); // 阻止默认行为使其变为可拖拽元素
};
// 当将元素或文本选择拖动到有效放置目标（每几百毫秒）上时，会触发此事件。 多次触发
doms.selectFile.ondragover = (e) => {
  e.preventDefault(); // 阻止默认行为使其变为可拖拽元素
};

// 当在有效放置目标上放置元素或选择文本时触发此事件。
doms.selectFile.ondrop = (e) => {
  e.preventDefault();
  // 将拖拽的文件赋值给 上传文件列表
  doms.selectFile.files = e.dataTransfer.files;
  console.log(e.dataTransfer);
  // 这里不会触发文件变化时的 onchange 事件
};
```

:::

:::details js 文件

```js
let $ = document.querySelector.bind(document);
// 获取的dom
const doms = {
  img: $(".preview"),
  container: $(".upload"),
  select: $(".upload-select"),
  selectFile: $(".upload-select input"),
  progress: $(".upload-progress"),
  cancelBtn: $(".upload-progress button"),
  delBtn: $(".upload-result button"),
};
// const processBarBefore = window.getComputedStyle(doms.processBar, "before");
// 上传完成的图片
let resultImg = "";

// 返回的取消上传的事件
let cancal = null;

// 切换页面展示
function showArea(val) {
  doms.container.className = `upload ${val}`;
}
// 设置进度条
function setProgress(value) {
  doms.progress.style.setProperty("--percent", value);
}

// 拖拽 当拖动的元素或选择文本输入有效的放置目标时，会触发此事件。 只触发一次
doms.selectFile.ondragenter = (e) => {
  e.preventDefault(); // 阻止默认行为使其变为可拖拽元素
};
// 当将元素或文本选择拖动到有效放置目标（每几百毫秒）上时，会触发此事件。 多次触发
doms.selectFile.ondragover = (e) => {
  e.preventDefault(); // 阻止默认行为使其变为可拖拽元素
};

// 当在有效放置目标上放置元素或选择文本时触发此事件。
doms.selectFile.ondrop = (e) => {
  e.preventDefault();
  // 将拖拽的文件赋值给 上传文件列表
  doms.selectFile.files = e.dataTransfer.files;
  // console.log(doms.selectFile.files);
  // console.log(e.dataTransfer);
  // 这里不会触发文件变化时的 onchange 事件
  changeHandler();
};

// 选择文件
// doms.uploadFile.onclick = function () {
//   doms.selectFile.click();
// };

// 文件变化时
doms.selectFile.onchange = changeHandler;
function changeHandler() {
  // 获取的上传文件
  let files = doms.selectFile.files;
  if (files.length === 0) return;
  // 校验
  // if (!validateFile(files[0])) {
  //   return;
  // }
  // 切换展示区域
  showArea("process");
  // 预览图片 通过 FileReader() 的 readAsDataURL来读取变为 dataurl
  const reader = new FileReader();
  reader.onload = (e) => {
    resultImg = e.target.result;
    doms.img.src = resultImg;
  };
  reader.readAsDataURL(files[0]);
  // 上传
  cancal = uploadFileHandler(
    files[0],
    function (val) {
      // 进度变换啦
      changeProcess(val);
    },
    function (val) {
      // 上传完成回到结果区域
      console.log(val);
    }
  );
}
// 上传文件封装
/**
 * @description: 上传文件 返回一个可以取消上传文件的函数
 * @param {*} file 文件
 * @param {*} onProcess 获取上传进度函数
 * @param {*} onFinsish 上传完成文件函数
 * @Author: zhs
 */
function uploadFileHandler(file, onProcess, onFinsish) {
  const xmr = new XMLHttpRequest();
  // 请求成功
  xmr.onload = function () {
    onFinsish(xmr);
  };
  // 进度
  xmr.upload.onprogress = (e) => {
    const precent = Math.floor((e.loaded / e.total) * 100);
    onProcess(precent);
  };
  // 初始化请求
  xmr.open("POST", "http://test.com:9527//upload/single");
  const form = new FormData();
  form.append("avatar", file);
  // 发送请求
  xmr.send(form);
  return function () {
    // 取消请求
    xmr.abort();
  };
}

// 取消文件上传
function cnacelHandler() {
  // 取消上传，中断网络传输
  cancal && cancal();
  // 回到选择图片区域
  showArea("select");
  // 清空上传文件
  doms.selectFile.value = null;
}

// 校验文件上传类型
function validateFile(file) {
  // 限制上传类型
  const types = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  // 限制上传文件大小 2M 2 *1024 * 1024
  const size = 2 * 1024 * 1024;
  const name = file.name.toLowerCase();
  if (file.size > size) {
    alert(`文件上传格式超过限制，最大为${size}M`);
    return false;
  }
  // 判断文件是否以规定格式 结尾
  if (!types.some((exc) => name.endsWith(exc))) {
    alert("文件上传格式不正确");
    return false;
  }
  return true;
}

// 取消按钮点击事件注册
doms.cacelBtn.onclick = doms.delBtn.onclick = cnacelHandler;
```

:::
