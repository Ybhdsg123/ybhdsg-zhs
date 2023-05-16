import { computed } from "vue";

export default function useWatermarkBg(props) {
  return computed(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    // devicePixelRatio 当前显示设备的物理像素分辨率与CSS 像素分辨率之比
    const devicePixelRatio = window.devicePixelRatio || 1;
    const fontSize = props.fontSize * devicePixelRatio;
    const font = fontSize + "px serif"; // 设置绘制的字体样式
    // 获取文字宽度
    ctx.font = font;
    const { width, actualBoundingBoxRight, actualBoundingBoxLeft } =
      ctx.measureText(props.text);
    // 得到 canva 元素的大小
    const canvasSize =
      Math.max(100, width, actualBoundingBoxRight + actualBoundingBoxLeft) +
      props.gap * devicePixelRatio;
    // 设置 canvas 的宽高
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    //
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // 倾斜45度
    ctx.rotate((Math.PI / 180) * -45);
    // 文本颜色
    ctx.fillStyle = "#f40";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    // 绘制文本
    ctx.fillText(props.text, 0, 0);
    return {
      // 转换为 data url
      base64: canvas.toDataURL(),
      // canvas 大小
      size: canvasSize,
      // 显示更清晰 需要 canvas大小 / devicePixelRatio
      styleSize: canvasSize / devicePixelRatio,
    };
  });
}
