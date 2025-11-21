# 前端工程化 - 资源分包 + 增量构建

## 一、为什么要做“第三方库单独打包 + 不重复打包”？

### 核心目的：
- 减少每次部署上传的数据量
- 提升构建速度
- 利用浏览器缓存机制提高加载速度
- 便于 CDN 缓存和版本管理

### 场景举例：

| 情况                             | 是否需要重新打包 vendors |
|--------------------------------- |--------------------------|
| 修改了页面组件或样式               | ❌ 不需要                |
| 升级了 element-ui 版本           | ✅ 需要                  |
| 新增了一个 npm 包                | ✅ 需要                  |

## 二、实现方式详解

### 1. SplitChunks 分包机制（Webpack 内置）

#### 原理：
Webpack 支持通过 `splitChunks` 将某些模块提取为单独的 chunk 文件。

#### 示例配置：

```js
config.optimization.splitChunks({
  chunks: 'all',
  cacheGroups: {
    coreLibs: {
      test: /[\\/]node_modules[\\/](vue|vue-router|vuex|element-ui|axios|lodash|echarts)[\\/]/,
      name: 'vendors/core',
      enforce: true,
    },
    defaultVendors: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors/other',
      priority: -10,
      reuseExistingChunk: true,
    }
  }
});
```

#### 输出结果：

```
dist/
├── vendors/
│   ├── core.[contenthash].js     ← vue, element-ui 等核心依赖
│   └── other.[contenthash].js    ← 其他 node_modules 依赖
├── js/
│   ├── app.[contenthash].js      ← 你的业务代码
│   └── chunk-common.[contenthash].js
```

### 2. 使用 contenthash 控制文件名不变

#### 原理：
Webpack 支持多种 hash 方式：

| 类型        | 说明                                                               |
|-------------|-------------------------------------------------------------------|
| [hash]      | 所有文件共享一个 hash，只要有一个文件变就全变                         |
| [chunkhash] | 每个 chunk 使用自己的 hash                                          |
| [contenthash]| 每个文件根据内容生成 hash（推荐）                                   |

#### 推荐配置：

```js
config.output.filename = `js/[name].[contenthash:10].js`;
config.output.chunkFilename = `js/[name].[contenthash:10].js`;
```

这样只有文件内容真正变化时才会生成新的 hash 文件名。

### 3. recordsPath 固定 chunk ID（避免无变更 hash 变化）

#### 原理：
Webpack 默认会动态分配 chunk ID，即使内容没变，ID 也可能不同，导致 hash 变化。

#### 解决方法：

```js
config.recordsPath(path.resolve(__dirname, "webpack.records.json"));
```

Webpack 会把 chunk ID 记录到这个文件中，确保相同依赖生成相同的 hash。

> ⚠️ 注意：这个文件应该加入 `.gitignore`，因为它包含本地路径信息。

### 4. 增量部署策略（只上传变动的文件）

#### 实现方式：
你可以写一个脚本，在每次构建后对比上次构建的输出目录，找出新增或变更的文件。

##### 示例脚本：

```bash
# 对比 dist 目录与上一次 build 的 dist_last 目录
diff -r dist/ dist_last/ | grep '^Only' | awk '{print $2}' > changed_files.txt
```

然后只上传 `changed_files.txt` 中列出的文件。

### 5. CDN 静态资源托管（可选）

如果你希望进一步优化部署流程，可以将 `vendors/` 目录部署到 CDN 上：

#### 步骤：
1. 构建完成后，将 `vendors/` 上传到 CDN；
2. 在 `index.html` 中引用这些 CDN 资源；
3. 后续构建只需更新业务代码（`js/app.*.js`）；

#### 示例：

```html
<script src="https://cdn.example.com/vendors/core.abc123.js"></script>
<script src="https://cdn.example.com/vendors/other.def456.js"></script>
```

## 三、最终效果总结

| 项目              | 效果                                                                 |
|-------------------|----------------------------------------------------------------------|
| 第三方库          | 独立打包为 `vendors/core.js` 和 `vendors/other.js`                   |
| 文件名控制        | 使用 `contenthash`，内容不变则文件名不变                             |
| chunk ID 控制     | 使用 `recordsPath` 固定 ID，防止 hash 变动                           |
| 构建效率          | 第三方库不会重复打包                                                 |
| 部署效率          | 只需上传业务代码相关文件，无需重复上传 `vendors`                     |
| CDN 支持          | 可将 `vendors` 托管至 CDN，进一步提升性能                            |

## 衍生建议

| 功能                  | 推荐做法                                                       |
|-----------------------|----------------------------------------------------------------|
| 查看哪些文件发生了变化 | 使用 `git diff --name-only` 或文件对比脚本                      |
| 自动上传变更文件       | 使用 shell 脚本 + rsync / scp / ftp / sftp                      |
| 统计包体积变化         | 使用 `webpack-bundle-analyzer` 插件                             |
| 自动清理旧版本文件     | 设置服务器定期清理过期的 `vendors` 文件                         |

## 总结

你现在已具备以下能力：

✅ 将常用第三方库独立打包为 `vendors/` 目录下的稳定文件  
✅ 业务代码每次只打包变动部分，极大提升构建效率  
✅ 通过 hash 控制缓存和 CDN 加速，提升用户体验  
✅ 通过记录机制固定 chunk ID，避免无变更也重新上传  

这是一套适用于大型 Vue 项目的标准上线优化方案，特别适合企业级后台管理系统、SaaS 平台等对部署效率要求较高的场景。