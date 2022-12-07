# 时间相关

### 1. 获取当天时间

```js
/*
 ** val="timeStamp" 返回时间戳 毫秒
 */
export const getCurrentDay = (val = "timeStamp") => {
  let currentDay = new Date();
  let year = currentDay.getFullYear();
  let month = currentDay.getMonth() + 1;
  let day = currentDay.getDate();
  let newM = month >= 10 ? month : "0" + month;
  let newD = day >= 10 ? day : "0" + day;
  let date = new Date(`${year}-${newM}-${newD}`);
  let theDay = val === "timeStamp" ? date.getTime() : `${year}-${newM}-${newD}`;
  return theDay;
};
```

### 2. 根据某一天获取本周的时间戳

```js
/*
** timestamp 入参时间戳(毫秒）或者字符串格式都可以
*** getWeekdays('2022-12-7') getWeekdays(1670774400000)
 */
export function getWeekdays(timestamp) {
let date = new Date(timestamp).setHours(0, 0, 0, 0);
let dayOfToday = new Date(date).getDay();
let firstDay = new Date(date + (1 - dayOfToday) _ 86400 _ 1000);
let lastDay = new Date(date + (7 - dayOfToday) _ 86401 _ 1000);
return {
firstDay,
lastDay,
};
}
```

**结果**
![结果](../../public//images/timeTool-weekTimeS.png)

> 想要获取时间戳的话 获取到返回的对象后 `/1000` 得到秒数
> 例如 let weekFirst = getWeekdays(1670774400000).firstDay / 1000

### 3. 根据某一天获取本月的第一天及最后一天

```js
export function getMonthFrist(timestamp) {
let date = new Date(timestamp);
let year = date.getFullYear();
let month = date.getMonth();
return new Date(year, month, 1);
}
export function getMonthLast(timestamp) {
let date = new Date(timestamp);
let year = date.getFullYear();
let month = date.getMonth();
return (new Date(year, month + 1, 0) / 1000 + 86399) \* 1000;
}

```

```js
 // koroFileHeader 文件头部注释
  "fileheader.customMade": {
    "Author": "zhs", // 文件作者
    "Date": "Do not edit", // 文件创建时间
    "LastEditors": "JDY", // 文件最后编辑者
    "LastEditTime": "Do not edit", // 文件最后编辑时间
    "Description": "" // 介绍文件的作用、文件的入参、出参。
  },
  // 函数主食
  "fileheader.cursorMode": {
    "description": "", // 函数注释生成之后，光标移动到这里
    "param": "", // param 开启函数参数自动提取 需要将光标放在函数行或者函数上方的空白行
    "Author": "zhs", // 函数作者
    "Date": "Do not edit"
  },
  "editor.language.colorizedBracketPairs": [],
  "editor.language.brackets": []
```
