# Webpack 面试题

## 1、webpack 的作用是什么，谈谈你对它的理解？

现在的前端网页功能丰富，特别是 SPA（single page web application 单页应用）技术流行后，JavaScript 的复杂度增加和需要一大堆依赖包，还需要解决 Scss，Less……新增样式的扩展写法的编译工作。
所以现代化的前端已经完全依赖于 webpack 的辅助了。

## 2、webpack 的工作原理?

WebPack 可以看做是模块打包机：它做的事情是，`分析你的项目结构`，`找到JavaScript模块`以及`其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript等），并将其转换和打包为合适的格式供浏览器使用`。在 3.0 出现后，Webpack 还肩负起了优化项目的责任。

## 3、webpack 打包原理

**把一切都视为模块**：不管是 css、JS、Image 还是 html 都可以互相引用，通过定义 `entry.js`，对所有依赖的文件进行跟踪，将各个模块通过 `loader` 和 `plugins` 处理，然后打包在一起。

**按需加载**：打包过程中 Webpack 通过 Code Splitting 功能将文件分为多个 chunks，还可以将重复的部分单独提取出来作为 commonChunk，从而实现按需加载。把所有依赖打包成一个 bundle.js 文件，通过代码分割成单元片段并按需加载

## 4、webpack 的核心概念

- **Entry**：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。告诉 webpack 要使用哪个模块作为构建项目的起点，默认为`./src/index.js`

- **output** ：出口，告诉 webpack 在哪里输出它打包好的代码以及如何命名，默认为`./dist`

- **Module**：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

- **Chunk**：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。

- **Loader**：模块转换器，用于把模块原内容按照需求转换成新内容。**webpack 本身只能打包 js 文件**，所以，针对 css，图片等格式的文件没法打包，就需要引入第三方的模块进行打包。loader 虽然是扩展了 webpack ，但是它只专注于转化文件，完成压缩，打包，语言翻译。 **仅仅只是为了打包**

  > `css-loader`和`style-loader`模块是为了打包 css 的
  > `babel-loader`和`babel-core`模块时为了把 ES6 的代码转成 ES5
  > `url-loader`和`file-loader`是把图片进行打包的。

- **Plugin**：扩展插件，Plugin 可以扩展 webpack 的功能，让 webpack 具有更多的灵活性。在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。

**Loader 和 Plugin1n 的区别**

- loader 运行在打包文件之前（loader 为在模块加载时的预处理文件）；plugins 在整个编译周期都起作用

* 一个 loader 的职责是单一的，只需要完成一种转换。一个 loader 其实就是一个 Node.js 模块。当需要调用多个 loader 去转换一个文件时，每个 loader 会链式的顺序执行

## 5、Webpack 的基本功能有哪些？

- **代码转换**：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等等

- **文件优化**：压缩 JavaScript、CSS、html 代码，压缩合并图片等

- **代码分割**：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载

- **模块合并**：在采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件

- **自动刷新**：监听本地源代码的变化，自动构建，刷新浏览器

- **代码校验**：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过

- **自动发布**：更新完代码后，自动构建出线上发布代码并传输给发布系统。

## 6、gulp/grunt 与 webpack 的区别是什么?

三者都是前端构建工具，grunt 和 gulp 在早期比较流行，现在 webpack 相对来说比较主流，不过一些轻量化的任务还是会用 gulp 来处理，比如单独打包 CSS 文件等。
**grunt 和 gulp 是基于任务和流（Task、Stream）的。**
类似 jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个 web 的构建流程。
**webpack 是基于入口的。**
webpack 会自动地递归解析入口所需要加载的所有资源文件，然后用**不同的 `Loader` 来处理不同的文件，用 `Plugin` 来扩展 webpack 功能。**

## 7、webpack 是解决什么问题而生的?

如果像以前开发时一个 html 文件可能会引用十几个 js 文件,而且顺序还不能乱，因为它们存在依赖关系，同时对于 ES6+等新的语法，less, sass 等 CSS 预处理都不能很好的解决……，此时就需要一个处理这些问题的工具。

## 8、你是如何提高 webpack 构件速度的?

- 多入口情况下，使用 CommonsChunkPlugin 来提取公共代码
- 通过 `externals` 配置来提取常用库
- 利用 `DllPlugin` 和 `DllReferencePlugin` 预编译资源模块通过 DllPlugin 来对那些我们
  引用但是绝对不会修改的 npm 包来进行预编译，再通过 DllReferencePlugin 将预编译的模块加载进来。
- 使用 Happypack 实现多线程加速编译
- 使用 `webpack-uglify-paralle` 来提升 uglifyPlugin 的压缩速度。
  原理上 webpack-uglify-parallel 采用了多核并行压缩来提升压缩速度
  使用 Tree-shaking 和 Scope Hoisting 来剔除多余代码

## 9、npm 打包时需要注意哪些？如何利用 webpack 来更好的构建？

Npm 是目前最大的 JavaScript 模块仓库，里面有来自全世界开发者上传的可复用模块。
你可能只是 JS 模块的使用者，但是有些情况你也会去选择上传自己开发的模块。
关于 NPM 模块上传的方法可以去官网上进行学习，这里只讲解如何利用 webpack 来构建。
**NPM 模块需要注意以下问题**：

- 要支持 CommonJS 模块化规范，所以要求打包后的最后结果也遵守该规则。
- Npm 模块使用者的环境是不确定的，很有可能并不支持 ES6，所以打包的最后结果应该是采用 ES5 编写的。并且如果 ES5 是经过转换的，请最好连同 SourceMap 一同上传。
- Npm 包大小应该是尽量小（有些仓库会限制包大小）
- 发布的模块不能将依赖的模块也一同打包，应该让用户选择性的去自行安装。这样可以避免模块应用者再次打包时出现底层模块被重复打包的情况。
- UI 组件类的模块应该将依赖的其它资源文件，例如.css 文件也需要包含在发布的模块里。

## 10、前端为什么要进行打包和构建？

**代码层面：**

- 体积更小（Tree-shaking、压缩、合并），加载更快
- 编译高级语言和语法（TS、ES6、模块化、scss）
- 兼容性和错误检查（polyfill,postcss,eslint）

  **研发流程层面：**

- 统一、高效的开发环境
- 统一的构建流程和产出标准
- 集成公司构建规范（提测、上线）

## 11、webpack 的构建流程是什么?从读取配置到输出文件这个过程尽量说全。

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

**1. 初始化参数**：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；

**2. 开始编译**：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；

**3. 确定入口**：根据配置中的 entry 找出所有的入口文件；

**4. 编译模块**：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

**5. 完成模块编译**：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；

**6. 输出资源**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；

**7. 输出完成**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## 12、怎么配置单页应用？怎么配置多页应用？

**单页应用**可以理解为 webpack 的标准模式，直接在 entry 中指定单页应用的入口即可

**多页应用**的话，可以使用 webpack 的 `AutoWebPlugin` 来完成简单自动化的构建，但是前提是项目的目录结构必须遵守他预设的规范。多页应用中要注意的是：

- 每个页面都有公共的代码，可以将这些代码抽离出来，避免重复的加载。比如，每个页面都引用了同一套 css 样式表
- 随着业务的不断扩展，页面可能会不断的追加，所以一定要让入口的配置足够灵活，避免每次添加新页面还需要修改构建配置

## 13、Loader 机制的作用是什么？

**webpack 默认只能打包 js 文件**，配置里的 **module.rules** 数组配置了一组规则，告诉 Webpack 在遇到哪些文件时使用哪些 `Loader` 去加载和转换打包成 js。

**注意：**

- use 属性的值需要是一个由 Loader 名称组成的数组，Loader 的执行顺序是由后到前的；
- 每一个 Loader 都可以通过 URL querystring 的方式传入参数，
- 例如 css-loader?minimize 中的 minimize 告诉 css-loader 要开启 CSS 压缩。

## 14、常用 loader

- `css-loader` 读取 合并 CSS 文件

* `style-loader` 把 CSS 内容注入到 JavaScript 里
* `sass-loader` 解析 sass 文件（安装 sass-loader，node-sass）
* `postcss-loader` 自动添加浏览器兼容前缀（postcss.config 配置）
* `url-loader` 将文件转换为 base64 URI。
* `vue-loader` 处理 vue 文件。

## 15、Plugin（插件）的作用是什么？

**Plugin 是用来扩展 Webpack 功能的，通过在构建流程里注入钩子实现，它给 Webpack 带来了很大的灵活性。**

Webpack 是通过 `plugins` 属性来配置需要使用的插件列表的。plugins 属性是一个数组，里面的每一项都是插件的一个实例，在实例化一个组件时可以通过构造函数传入这个组件支持的配置属性。

## 16、什么是 bundle，什么是 chunk，什么是 module

**bundle**：是由 webpack 打包出来的文件

**chunk**：是指 webpack 在进行模块依赖分析的时候，代码分割出来的代码块

**module**：是开发中的单个模块

## 17、常见 Plugins

`HtmlWbpackPlugin` 自动在打包结束后生成 html 文件，并引入 bundle.js
`cleanwebPackPlugin` 打包自动删除上次打包文件

## 18、ExtractTextPlugin 插件的作用

`ExtractTextPlugin` 插件的作用是**提取出 JavaScript 代码里的 CSS 到一个单独的文件**。

对此你可以通过插件的 `filename` 属性，告诉插件输出的 CSS 文件名称是通过`[name]\_[contenthash:8].css` 字符串模版生成的，

里面的`[name]`代表文件名称，`[contenthash:8]`代表根据文件内容算出的 8 位 hash 值， 还有很多配置选项可以在 `ExtractTextPlugin` 的主页上查到。

## 19、sourceMap

**是一个映射关系，将打包后的文件隐射到源代码，用于定位报错位置**

**配置方式:**
例如：

```js
devtool：‘source-map’
```

加不同前缀意义：

`inline`: 不生成映射关系文件，打包进 main.js

`cheap`: 1.只精确到行，不精确到列，打包速度快 2.只管业务代码，不管第三方模块

`module`：不仅管业务代码，而且管第三方代码

`eval`:执行效率最快，性能最好

**最佳实践：**

开发环境：cheap-module-eval-source-map

线上环境：cheap-mudole-source-map

## 22、babel 相关: polyfill 以及 runtime 区别， ES stage 含义，preset–env 作用等等

- **1.polyfill 以及 runtime 区别**

**`babel-polyfill` 的原理是当运行环境中并没有实现的一些方法，**

**`babel-polyfill` 会做兼容。**

`babel-runtime `它是将 es6 编译成 es5 去执行。我们使用 es6 的语法来编写，最终会通过 babel-runtime 编译成 es5.也就是说，不管浏览器是否支持 ES6，只要是 ES6 的语法，它都会进行转码成 ES5.所以就有很多冗余的代码。

`babel-polyfill` 它是通过向全局对象和内置对象的 prototype 上添加方法来实现的。比如运行环境中不支持 Array.prototype.find 方法，引入 polyfill, 我们就可以使用 es6 方法来编写了，但是缺点就是会造成全局空间污染。

`babel-runtime`: 它不会污染全局对象和内置对象的原型，比如说我们需要 Promise，我们只需要 `import Promise from 'babel-runtime/core-js/promise'`即可，这样不仅避免污染全局对象，而且可以减少不必要的代码。

- **stage-x：指处于某一阶段的 js 语言提案**

* **理解 babel-preset-env**
  `babel-preset-es2015`: 可以将 es6 的代码编译成 es5.
  `babel-preset-es2016`: 可以将 es7 的代码编译为 es6.
  `babel-preset-es2017`: 可以将 es8 的代码编译为 es7.
  `babel-preset-latest`: 支持现有所有 ECMAScript 版本的新特性

## 23. 什么是模热更新？有什么优点？

模块热更新是 webpack 的一个功能，它可以使得代码修改之后，不用刷新浏览器就可以更新。

在应用过程中替换添加删出模块，无需重新加载整个页面，是高级版的自动刷新浏览器。

优点：只更新变更内容，以节省宝贵的开发时间。调整样式更加快速，几乎相当于在浏览器中更改样式

## 24、什么是长缓存？在 webpack 中如何做到长缓存优化？

浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，但是每一次代码升级或者更新，都需要浏览器去下载新的代码，最方便和最简单的更新方式就是引入新的文件名称。

在 webpack 中，可以在 output 给出输出的文件制定 chunkhash，并且分离经常更新的代码和框架代码，通过 NameModulesPlugin 或者 HashedModulesPlugin 使再次打包文件名不变。

## 26、什么是 Tree-sharking?

指打包中去除那些引入了但在代码中没用到的死代码。在 wepack 中 js treeshaking 通过 `UglifyJsPlugin` 来进行，css 中通过 `purify-CSS `来进行。

## 27、webpack-dev-server 和 http 服务器的区别

webpack-dev-server 使用内存来存储 webpack 开发环境下的打包文件，并且可以使用模块热更新，比传统的 http 服务对开发更加有效。

## 28、webpack3 和 webpack4 的区别

mode/–mode 参数，新增了 mode/–mode 参数来表示是开发还是生产（development/production）production 侧重于打包后的文件大小，development 侧重于 goujiansud 移除 loaders，必须使用 rules（在 3 版本的时候 loaders 和 rules 是共存的但是到 4 的时候只允许使用 rules）移除了 CommonsChunkPlugin (提取公共代码)，用 optimization.splitChunks 和 optimization.runtimeChunk 来代替支持 es6 的方式导入 JSON 文件，并且可以过滤无用的代码
