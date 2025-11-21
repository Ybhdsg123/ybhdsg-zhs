## 面试题 --- 自己想到的


### vue2/3的区别和升级，vue3还有哪些好处

#### 区别与升级：

1. 核心架构：Vue 3 使用基于 Proxy 的响应式替代 Vue 2 的 Object.defineProperty。

2. 性能提升：Vue 3 体积更小，初始化、渲染和更新速度更快。

3. Composition API：Vue 3 引入了 Composition API，增强了逻辑复用能力。

4. Tree-shaking：支持按需打包未使用的模块，减小项目体积。

5. Fragments：Vue 3 支持组件返回多个根节点。

6. 更好的 TypeScript 支持。

#### Vue 3 好处：

1. 更强的灵活性，支持大型项目的开发。

2. 通过 Composition API 提高了代码的可读性和组织能力。

### webpack和vite的区别，vite的好处
#### 区别：

1. 开发模式：

- Webpack 使用构建时间作为开发环境的基础。

- Vite 使用浏览器的原生 ESM 功能，实现即时启动，无需预构建。

2. 热更新 (HMR)：

- Webpack 热更新基于模块系统。

- Vite 利用 ESM 的动态导入机制，热更新更快。

3. 打包效率：

- Webpack 对大项目打包速度较慢。

- Vite 使用 Rollup 进行构建，速度更快。

#### Vite 好处：

- 快速启动，特别适用于大型项目。

- 高效热更新，开发体验更好。

- 更好的支持现代化 JavaScript（例如 ESM 模块）。
### webpack的loader和plugin的区别

#### Loader：用于转换文件，例如 CSS、图片、ES6 转 ES5 等。它是模块处理器。

- 示例：css-loader, babel-loader。

#### Plugin：用于扩展 Webpack 功能，比如压缩文件、优化资源等。它是功能增强器。

- 示例：HtmlWebpackPlugin, DefinePlugin。

### webpack 进行热更新的原理

#### Webpack 的热更新（Hot Module Replacement, HMR）通过以下方式实现：

1. Webpack Dev Server 启动一个 WebSocket 服务器。

2. 代码文件修改后，Webpack 编译模块并通过 WebSocket 通知浏览器。

3. 浏览器接收到更新信息后，仅替换修改的模块，而非刷新整个页面。

### vue3的响应式原理

#### Vue 3 使用 ES6 的 Proxy 实现响应式：

- 拦截对对象的读取（get）和写入（set）。

- 动态追踪依赖，结合 effect 收集使用到的响应式数据。

- 修改数据时，自动触发依赖的重新渲染。

### vue3的diff算法

#### Vue 3 使用 双端对比算法，提升了性能：

- 从两边同时开始比较（头对头，尾对尾）。

- 优化了节点移动和复用，减少了 DOM 操作次数。

### vue3的虚拟dom和真实dom
#### 虚拟 DOM：

- 是一层 JavaScript 描述对象。

- 在内存中模拟真实 DOM 结构，用于高效渲染。

#### 真实 DOM：

- 是浏览器的文档对象，用于显示 UI。

- 修改真实 DOM 操作开销较高，虚拟 DOM 可优化其性能。

### vue3的组件化原理
- 每个组件是一个独立的 Vue 实例。

- Vue 通过 render 函数将组件的模板编译成虚拟 DOM 树，并映射到真实 DOM。

- 父子组件通过属性（props）和事件（emit）进行数据流传递。

### vue3的组件通信


### vue3的组件生命周期


### vue3的组件懒加载


### vue3的组件懒加载原理


### vue3的组件懒加载的实现原理

