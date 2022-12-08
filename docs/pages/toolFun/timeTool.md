# 时间相关

## 1. 获取当天时间

```js
/*
 ** val="timeStamp" 返回时间戳 毫秒，否则返回格式为 "2022-12-09"
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

## 2. 根据某一天获取本周的时间戳

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
> 例如 `let weekFirst = getWeekdays(1670774400000).firstDay / 1000`

## 3. 根据某一天获取本月的第一天及最后一天

### 3.1 根据传入时间来判断

```js
// 本月第一天
export function getMonthFrist(time, formMat = "timestamp") {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth();
  let result = new Date(year, month, 1);
  return formMat == "timestamp" ? result.getTime() / 1000 : result;
}
// 本月最后一天
export function getMonthLast(time) {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth();
  return (new Date(year, month + 1, 0) / 1000 + 86399) * 1000;
}
```

### 3.2 根据当天时间获取

```js
// 获取一个月的第一天 时间戳
export const firstMonthDay = () => {
  let time = new Date();
  time.setDate(1); // 将当前日期设置成第一天
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let firstDay = new Date(year + "-" + month + "-" + day);
  return firstDay.getTime();
};
// 获取一个月的最后一天 时间戳
export const lastMonthDay = () => {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  // 这里传入的是整数时间，返回的是下个月的第一天，因为月份是0-11
  let nextMonthFirthDay = new Date(year, month, 1); // 下个月的第一天
  let oneDay = 60 * 60 * 24 * 1000; // 一天的时间毫秒数
  let endDay = new Date(nextMonthFirthDay - oneDay);
  let day = endDay.getDate(); // 本月最后一天
  let lastDay = new Date(`${year}-${month}-${day} 23:59:59`);
  return lastDay.getTime();
};
```

## 4. 格式化时间

### 4.1 格式化时间 2021-12-31 11:25:11

```
export function formatTime(timestamp) {
if (!Number(timestamp)) {
return "-";
}
const date = new Date(timestamp * 1000);
const y = date.getFullYear();
let MM = date.getMonth() + 1;
MM = MM < 10 ? "0" + MM : MM;
let d = date.getDate();
d = d < 10 ? "0" + d : d;
let h = date.getHours();
h = h < 10 ? "0" + h : h;
let m = date.getMinutes();
m = m < 10 ? "0" + m : m;
let s = date.getSeconds();
s = s < 10 ? "0" + s : s;
return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
}
```

### 4.2 格式化时间 2021-12-31 上午

```
export function formatTime1(timestamp) {
if (!Number(timestamp)) {
return "-";
}
const date = new Date(timestamp * 1000);
const y = date.getFullYear();
let MM = date.getMonth() + 1;
MM = MM < 10 ? "0" + MM : MM;
let d = date.getDate();
d = d < 10 ? "0" + d : d;
let h = date.getHours();
h = h < 12 ? "上午" : "下午";
return y + "-" + MM + "-" + d + " " + h;
}
```

### 4.3 格式化时间 2021-12-31

```
export function formatTime2(timestamp) {
if (!Number(timestamp)) {
return "-";
}
const date = new Date(timestamp * 1000);
const y = date.getFullYear();
let MM = date.getMonth() + 1;
MM = MM < 10 ? "0" + MM : MM;
let d = date.getDate();
d = d < 10 ? "0" + d : d;
return y + "-" + MM + "-" + d ;
}
```
