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

## 3. a 元素的应用

:::details

1. 锚点：

```html
<h2 id="Mailing_address">邮寄地址</h2>
<!-- 链接到某个文件的特定地方 -->
<p>请将信件邮寄至<a href="contacts.html#Mailing_address">我们的地址</a></p>
<!-- 链接到本文件的特定地方 -->
<p>本页面底部可以找到<a href="#Mailing_address">公司邮寄地址</a></p>
```

2. `download`属性，下载文件保存的名称
3. 发送邮件：`mailto:` URL 协议实现。
   [更多发送邮件相关](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#%E7%94%B5%E5%AD%90%E9%82%AE%E4%BB%B6%E9%93%BE%E6%8E%A5)
   > 电子邮件地址是可选的。如果你省略了它（也就是说，你的 href 属性仅仅只是简单的“mailto:”），发送新的电子邮件的窗口也会被用户的邮件客户端打开，只是没有收件人的地址信息，这通常在“分享”链接是很有用的，用户可以给他们选择的地址发送邮件。

```html
<a href="mailto:nowhere@mozilla.org">向 nowhere 发邮件</a>
```

:::

## 4. 系统主题色改变

:::details css

```css
@media (prefers-color-scheme: light) {
  /* 亮色主题下的css变量和样式 */
}
@media (prefers-color-scheme: dark) {
  /* 暗色主题下的css变量和样式 */
}
```

:::

:::details js

```js
// 通过 matchMeida 监听当前系统的主题色 dark：暗色 light：亮色
const scheme = window.matchMedia("prefers-color-scheme: dark");
// 返回值 scheme 中的 matches 为true表示符合当前检测的主题
// 例如在当前检测下，系统主题为 暗色主题的话 matches=true

// 可以监听系统主题色的改改变
scheme.addEventListener("change", (e) => {
  // 主题色从 暗色-亮色会触发该方法
  console.log(e);
});
```

:::
