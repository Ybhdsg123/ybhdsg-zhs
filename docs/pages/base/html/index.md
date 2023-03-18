# HTML

## 1.禁用右键 和 禁用选择

:::tip js 中

```js
// 禁用右键
document.oncontextmenu = new Function("event.returnValue=false");
// 禁用选择
document.onselectstart = new Function("event.returnValue=false");
```

:::

:::tip css 中

```js
//全局选择
*{
user-select:none;
}
//或者部分标签
.test-class{
user-select:none;
}
```

:::

## 2. 将 `http` 请求升级为 `https`

```js
<meta
  http-equiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
/>
```
