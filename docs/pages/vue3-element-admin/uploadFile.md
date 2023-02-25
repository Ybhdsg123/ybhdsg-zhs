# 原生文件上传相关

## html

::: info input 属性
`multiple`:多选文件

`webkitdirectory`:选择文件夹
:::

:::details html 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文件上传</title>
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body>
    <div class="upload">
      <div class="upload-file">
        <span class="add">+</span>
        <input type="file" multiple webkitdirectory class="iptFile" />
      </div>
      <div class="upload-process">
        <img class="preview-img" src="" alt="预览图片" />
        <!-- 上传进度的控制-->
        <div class="process-bar" data-precent="0">
          <div class="bar"></div>
        </div>
        <a class="close">X</a>
        <a href="#" class="cacel">取消</a>
      </div>
      <div class="upload-result">
        <img src="" alt="展示图片" class="img-result" />
      </div>
    </div>
  </body>

  <script src="./index.js"></script>
</html>
```

:::

## css

:::info attr()
`attr()`: 可以将自定义属性值作用于伪元素
:::

:::details css 文件

```css
.upload {
  position: relative;
  width: 200px;
  height: 200px;
}
.add {
  position: absolute;
  left: 50%;
  top: 50%;
  color: #6a6767;
  transform: translate(-50%, -50%) scale(3.5);
}
/* 隐藏上传文件 */
.iptFile {
  width: 100%;
  height: 100%;
  opacity: 0;
}

.preview-img,
.img-result {
  width: 200px;
  height: 200px;
}

.upload-file {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
  box-sizing: border-box;
}

/* 切换控制不同区域的显示 */
.select .upload-file {
  display: block;
}
.process .upload-process {
  display: block;
}
.result .upload-result {
  display: block;
}
/* 定位下面两个显示时的位置 */
.upload-process,
.upload-result {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  display: none;
}
/* 上传进度条 */
.process-bar {
  width: 200px;
  height: 8px;
  background-color: #6a6767;
  margin: 20px 10px 20px 0;
  border-radius: 4px;
}
.bar {
  content: "";
  display: flex;
  height: 8px;
  width: 0px;
  border-radius: inherit;
  background-image: linear-gradient(to right, #018eb2, #29c9eb);
  transition: width;
}
.process-bar::after {
  content: attr(data-precent) "%";
}

/* 关闭按钮 */
.close {
  position: absolute;
  top: 0px;
  right: 6px;
}
```

:::

## js

::: info 注意点

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
  upload: $(".upload"),
  uploadFile: $(".upload-file"),
  selectFile: $(".iptFile"),
  previewImg: $(".preview-img"),
  resultImg: $(".img-result"),
  uploadProcess: $(".upload-process"),
  uploadResult: $(".upload-result"),
  cancel: $(".cancel"),
  processBar: $(".process-bar"),
  bar: $(".bar"),
  cacelBtn: $(".cacel"),
  close: $(".close"),
  drap: $(".drap"),
};
// const processBarBefore = window.getComputedStyle(doms.processBar, "before");
// 上传完成的图片
let resultImg = "";

// 返回的取消上传的事件
let cancal = null;

// 切换页面展示
function showArea(val) {
  doms.upload.className = `upload ${val}`;
}
// 上传进度条变换
function changeProcess(val) {
  doms.processBar.dataset.precent = val / 2;
  doms.bar.style.width = val + "px";
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
    doms.previewImg.src = resultImg;
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
doms.cacelBtn.onclick = doms.close.onclick = cnacelHandler;
```

:::
