<template>
  <div>
    <canvas id="saveImgs" width="600" height="300">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
    </canvas>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
const images = [
  {
    name: "白月魁",
    url: "https://img1.baidu.com/it/u=4141276181,3458238270&fm=253&fmt=auto&app=138&f=JPEG?w=281&h=500",
  },
  {
    name: "鸣人",
    url: "https://img2.baidu.com/it/u=1548765981,166433699&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
  },
  {
    name: "路飞",
    url: "https://img2.baidu.com/it/u=1700240772,3511789617&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  },
  {
    name: "哪吒",
    url: "https://img2.baidu.com/it/u=4044887937,3129736188&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=392",
  },
  {
    name: "千寻",
    url: "https://img1.baidu.com/it/u=3907076642,679964949&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=293",
  },
];

onMounted(() => {
  // 获取 canvas
  const saveImgCanvas = document.getElementById("saveImgs");
  const width = saveImgCanvas.width;
  const height = saveImgCanvas.height;
  // 获取绘制上下文
  const ctx = saveImgCanvas.getContext("2d");

  // 图片数组
  let imgsData = [];
  // 鼠标按下时的位置
  let mouseClickDown = { x: 0, y: 0 };
  // 点击的目标元素（点击了那一张图片）
  let targetImg;

  // 遍历图片
  images.forEach((obj) => {
    // 创建一个 img 对象
    const img = new Image();
    //避免污染画布，进行跨源处理，即允许对未经过验证的图像进行跨源下载
    img.crossOrigin = "Anonymous";
    img.src = obj.url;
    const name = obj.name;
    img.onload = () => {
      // 控制等宽 200
      const w = 200;
      // 根据宽度进行高度适配
      const h = (200 / img.width) * img.height;

      // 绘制的位置
      const x = Math.random() * (width - w);
      const y = Math.random() * (height - h);
      const imgObj = { img, name, x, y, w, h };
      // 将位置什么的保存到一个数组，后面需要用来判断点击哪一个元素
      imgsData.push(imgObj);
      // 绘制图片
      drawImg(imgObj);
    };
  });

  // 渲染图片
  const drawImg = (obj) => {
    // 绘制图片
    // ctx.drawImage(obj.img, obj.x, obj.y, obj.w, obj.h);
    // 开启路径，将图片加一个边框，
    // 重点：可以使用 isPointInPath()方法 判断点击的是否在路径之内
    // 原因：因为绘制图片使用的是 drawImage() 方法，不支持isPointInPath()方法，所以需要绘制一个一样大小路径
    // 可以不要下面的，那样检测点击哪一个元素方法需要改一下
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.rect(obj.x, obj.y, obj.w, obj.h);
    ctx.stroke();
  };
  ctx.rect(100, 10, 100, 100); //路径
  ctx.stroke();

  // 为canvas添加鼠标按下事件
  saveImgCanvas.addEventListener("mousedown", mousedownFn, false);
  // 鼠标按下触发的方法
  function mousedownFn(e) {
    // 获取 saveImgCanvas 相对于视窗的位置
    // const t = saveImgCanvas.getBoundingClientRect();
    mouseClickDown.x = e.pageX - saveImgCanvas.offsetLeft;
    mouseClickDown.y = e.pageY - saveImgCanvas.offsetTop;

    checkTargetImg();
  }
  // 检测点击的是哪一个元素
  function checkTargetImg() {
    imgsData.forEach((obj, index) => {
      drawImg(obj);
      console.log(ctx.isPointInPath(mouseClickDown.x, mouseClickDown.y));
      // if (ctx.isPointInPath(mouseClickDown.x, mouseClickDown.y)) {
      //   targetImg = index;
      //   console.log("点击的元素是", obj.name);
      // }
      // else {
      //   return console.log("点击的元素是");
      // }
    });
  }
});
</script>

<style lang="scss" scoped></style>
