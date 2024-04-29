# 时间相关

## 0！. 一天的毫秒数 8.64e7

`8.64e7` 是科学计数法 8.64 乘以 10 的 7 次方，即为 86400000 也就是 1000*60*60\*24 也就是一天的毫秒数。因为 Date.now()
方法能够返回得到自 1970 年 1 月 1 日 00:00:00(UTC)到当前时间的毫秒数。咱们是北京时间的时区，也就是为东 8 区，
起点时间对应就是："1970/01/01 08:00:00"

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
  let firstDay = new Date(date + (1 - dayOfToday) - 86400 - 1000);
  let lastDay = new Date(date + (7 - dayOfToday) - 86401 - 1000);
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

```js
/**
 * @description: 根据某一天获取本月的第一天及最后一天（不传默认为当前日期本月第一天）
 * @param {number} time: 某天时间
 * @param {string} formMat: 返回格式 默认毫秒
 * @Author: zhs
 * @return 毫秒数
 */
export function getMonthFrist(time, formMat = "timestamp") {
  let date = time ? new Date(time) : new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let result = new Date(year, month, 1);
  return formMat === "timestamp" ? result.getTime() / 1000 : result;
}
// 本月最后一天
export function getMonthLast(timestamp) {
  let date = timestamp ? new Date(timestamp) : new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  // day为0表示获取一个月最后一天，所以 month+1 然后加上一天的秒数
  // 86300表示一天秒数，最后日期为 23:59:59
  return (new Date(year, month + 1, 0) / 1000 + 86399) * 1000;
}
```

## 4. 格式化时间

### 4.1 格式化时间 2021-12-31 11:25:11

```js
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

```js
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

```js
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
  return y + "-" + MM + "-" + d;
}
```

## 5. 两日期之间相差的天数

<!-- 传入毫秒数 -->

```js
const dayDiff = (date1, date2) => {
  const d1 = date1 * 1;
  const d2 = date2 * 1;
  return Math.ceil(Math.abs(d1 - d2) / 86400000);
};
// dayDiff(1653926400000,1651248000000) => 31
// dayDiff(new Date(2022,5,0), new Date(2022,4,0));  => 31
// dayDiff(new Date("2021-10-21"), new Date("2022-02-12")) => 114;
```

## 6. 查询某天是否为工作日

```js
const isWeekday = (date) => date.getDay() % 6 !== 0;

isWeekday(new Date(2022, 03, 11));
// true
```

## 7. 将时间转换为 `几秒/分钟/小时...前`、或者`未来多少时间`

```js
/**
 * 函数接收一个日期作为参数，并返回一个字符串
 * @param {Date|String} date 需要计算时间间隔的日期
 * @return String
 */
function timeIntervalFormat(date) {
  let t,
    p,
    l = [
      { n: "年", s: 3600 * 24 * 365 * 1e3 },
      { n: "个月", s: 3600 * 24 * 30 * 1e3 },
      { n: "天", s: 3600 * 24 * 1e3 },
      { n: "小时", s: 3600 * 1e3 },
      { n: "分钟", s: 60 * 1e3 },
      { n: "秒", s: 1 * 1e3 },
      { n: "刚刚", s: 0 },
    ];
  t = Date.now() - new Date(date || Date.now()).getTime();

  // 考虑传入的并不是一个可以被Date对象解析的日期字符串，避免错误影响程序运行
  if (Number.isNaN(t)) return "-";
  if (t === 0) return l.find((e) => e.s === t).n;

  // t < 0 时，说明是未来时间
  t < 0 && ((p = !!t), (t = -t));

  for (let i = 0; i < l.length; i++) {
    const { n, s } = l[i];
    if (t >= s) {
      const v = Math.floor(t / s);
      return p ? `未来${v}${n}` : `${v}${n}前`;
    }
  }
}
```

## 8. 获取相距今天多少天的日期，返回格式参考函数

:::details 用到的 formatTime 函数

```js
/**
 * @description:  时间格式化 默认 2022-09-06 12:00:00
 * 如果需要显示成  2023年03月08日 11:00 传入 YYYY[年]-MM[月]-DD[日] HH:mm
 * @param {number} val : 秒数
 * @param {string} formatTime : 格式同dayjs
 * @Author: zhs
 */
import dayjs from "dayjs";
export const formatTime = (val, formatTime = "YYYY-MM-DD HH:mm") => {
  if (!Number(val)) {
    return "-";
  }
  let value = Number(val) * 1000;
  return dayjs(value).format(formatTime);
};
```

:::

```js
/**
 * @description:  获取相距今天多少天的日期
 * @param {Date} currentDay : 从那天开始，不传默认是今天
 * @param {number} interveningDate : 相距日期，默认14天
 * @Author: zhs
 */

export const get14DaysDates = (currentDay, interveningDate = 14) => {
  const today = currentDay ? new Date(currentDay) : new Date();
  const end = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + interveningDate
  );
  const dates = [];
  let date = today;
  const weeks = ["日", "一", "二", "三", "四", "五", "六"];
  while (date < end) {
    const time = date / 1000;
    const t = weeks[formatTime(time, "d")];
    dates.push({
      time: formatTime(time, "YYYY-MM-DD"),
      day: formatTime(time, "DD"),
      week: "周" + t,
    });
    date.setDate(date.getDate() + 1);
  }
  return dates;
};
```
