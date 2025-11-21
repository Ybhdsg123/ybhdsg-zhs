# 小程序版本管理相关

## 1. vue.config.js

配置环境配置信息

## 2. package.json

拓展不同环境配置信息，这里配配置的环境名称通过 `process.env.UNI_SCRIPT` 来对应。

uni-app官方相关地址[https://uniapp.dcloud.net.cn/collocation/package.html]

### 3. 在 `main.js` 里挂载到原型上，方便拿取

```js
// 项目子自定义配置信息
import { hotelBaseConfig } from "@/config";
// 酒店的默认信息
Vue.prototype.$hotelBaseConfig = hotelBaseConfig;
```