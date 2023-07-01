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
