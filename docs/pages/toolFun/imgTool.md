<!--
 * @Author: zhs 1654134943@qq.com
 * @Date: 2022-12-17 17:10:21
 * @LastEditors: zhs 1654134943@qq.com
 * @LastEditTime: 2022-12-26 09:46:41
 * @FilePath: /ybhdsg-zhs/docs/pages/toolFun/imgTool.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# 常用工具相关

**_遍历文件夹下图片并进行瀑布流布局和预览图片（有瑕疵没完善）：https://github.com/Ybhdsg123/ybhdag-img/actions_**

## 1. 图片的瀑布流排布

```js
/**
 * @description: 瀑布流排法 等宽不等高
 * @param {*} data 图片数组 [{img:imgurl}]
 * @param {*} clientW 屏幕的总宽度
 * @param {*} columnNums columnNums 列数
 * @param {*} gap gap 间隔
 * @return {*}
 */
export function useWaterfall(data, clientW, columnNums, gap) {
  let pW = clientW - gap * (columnNums - 1); // 总宽度
  const columnHeights = []; // 列的高度
  let newList = JSON.parse(JSON.stringify(data)); // 深拷贝数据
  newList.length > 0 &&
    newList.forEach((obj, i) => {
      let index = i % columnNums; // 遍历的图片和列数取余
      obj.w = pW / columnNums; // 图片宽度
      // 创建图片对象获取图片的宽高
      let img = new Image();
      img.src = obj.img;
      obj.h = Number((img.height * (obj.w / img.width)).toFixed(0));
      obj.left = index * (obj.w + gap); //左边距离 2列的话，1/3/5距离左边距离为0，2/4/6距离左边距离为图片的宽度+间隔距离
      obj.top = columnHeights[index] + gap || 0; // 定位高度
      // 第一张和第二张距离顶部的高度为0
      if (isNaN(columnHeights[index])) {
        columnHeights[index] = obj.h;
      } else {
        // 第二张往后 找出前面的高度最小的索引
        index = columnHeights.indexOf(Math.min(...columnHeights));
        obj.left = index * (pW / columnNums + gap); // 改变每一张距离左边的距离
        obj.top = columnHeights[index] + gap || 0; // 距离上面的距离
        columnHeights[index] = obj.h + columnHeights[index] + gap; // 累加高度
      }
    });
  return newList;
}
```

## 2. 异步方式得到图片的大小

```js
/**
 * @description:
 * @return {*} 返回一个异步的图片宽高信息
 */
export const getImgSize = (url) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    (img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    }),
      (img.onerror = () => {
        reject(new Error("error"));
      });
  });
};
```
