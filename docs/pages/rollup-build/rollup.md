# 使用 rollup 打包 ts 并发布工具包

## 1. 创建 `.gitignore`文件

:::tip `touch 文件名称`:创建文件，`mkdir 文件夹名称`:创建文件夹

**1. `touch .gitignore`**

1. 会创建一个空文件，
2. 或者如果文件确实存在，会将上次修改的时间更新为"now“。

**2.`mkdir src`**: 创建`src文件夹`

:::

## 2. 初始化文件

:::tip

1. 初始化`package.json`文件：`pnpm init`、`npm init -y`
2. 初始化`typescript.json`文件：`tsc --init`(确定已安装 tsc)

   -- `tsc -v` :查看版本号，

   -- `npm i -g typescript`：安装 tsc

:::

## 3.`package.json`文件配置文件

:::details

`name`：包名；
`decription`：包的描述，在 npm 搜索里会用到，如果没有提供，会从 `README.md` 中提取；
`main`：包的入口文件，通常是 `CommonJS`，历史原因。这里我们写上 `./dist/mid-index-of.common.js`；
`browser`：包用于浏览器时的入口文件；
`module`：指定 ES 模块入口，这个不是 npm 自己的字段，是给打包工具用的。这里我们写上 `./dist/mid-index-of.esm.js`；
`types`：指定包的类型文件。这里我们写上`./dist/index.d.ts`；
`keywords`：关键字数组，npm 搜索会用到，建议多写一点；
`private`：是否为私有包，这个字段设置为 true 可以防止意外将私有包发布出去；
`liscense`：开源许可证，常用 MIT；
`files`：指定可以被发布的文件，默认是所有文件。为了减少包体积，不加上多余的文件，这个是一定要配置的。此外一些文件是一定会带上的，比如 `package.json`、`LICENSE`、`README.md`；
`sideEffects`：包是否有副作用，比如注入全局变量。如果没副作用，设置为 false，可以帮助打包工具做 tree-shaking，将一些引入了但没有使用的包移除；

:::

## 4. 前端模块化

**前端模块化**：就是将独立的功能代码封装成一个独立的文件，其他模块需要使用，在进行引用。

**模块化有利于代码的拆分和架构上的解耦**，模块化在服务端领域已经早已成熟，nodejs 也已经支持模块化。

而在浏览器上，js 脚本是异步载入的，脚本按照编码顺序依次执行，依赖关系只能按照编码顺序来控制。因此前端早早就有了模块化技术。

**遵循规范**
require 是 AMD 规范引入方式
import 是 es6 的一个语法标准，如果要兼容浏览器的话必须转化成 es5 的语法

**调用时间**
require 是运行时调用，所以 require 理论上可以运用在代码的任何地方
import 是编译时调用，所以必须放在文件开头

**本质**
require 是赋值过程，其实 require 的结果就是对象、数字、字符串、函数等，再把 require 的结果赋值给某个变量

import 是解构过程，但是目前所有的引擎都还没有实现 import，我们在 node 中使用 babel 支持 ES6，也仅仅是将 ES6 转码为 ES5 再执行，import 语法会被转码为 require

**require / exports 的区别**

1. 遵循 CommonJS/AMD，**只能在运行时确定模块的依赖关系及输入/输出的变量，无法进行静态优化。**

   用法只有以下三种简单的写法：

```js
const fs = require('fs')
exports.fs = fs
module.exports = fs
import / export
```

2. 遵循 ES6 规范，**支持编译时静态分析，便于 JS 引入宏和类型检验。动态绑定。**

```js
import fs from "fs";
import { default as fs } from "fs";
import * as fs from "fs";
import { readFile } from "fs";
import { readFile as read } from "fs";
import fs, { readFile } from "fs";
```

```js
export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```

通过 require 引入**基础数据类型**时，属于**复制该变量**。
通过 require 引入**复杂数据类型**时，**数据浅拷贝该对象**。
出现模块之间的循环引用时，会输出已经执行的模块，而未执行的模块不输出（比较复杂）
**`CommonJS`模块默认`export`的是一个对象，即使导出的是基础数据类型**

**require**：运行时加载，CommonJS/AMD，社区方案，提供了服务器/浏览器的模块加载方案。非语言层面的标准。**只能在运行时确定模块的依赖关系及输入/输出的变量，无法进行静态优化。**
**import**：编译时加载，ESMAScript6+，语言规格层面支持模块功能。**支持编译时静态分析，便于 JS 引入宏和类型检验。动态绑定。**
