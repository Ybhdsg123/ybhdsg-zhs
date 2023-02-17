# vite 相关

## 1. 整体配置项目

```js
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// element-plus 按需导入-自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// svg图标
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// setup下name书写
import VueSetupExtend from "vite-plugin-vue-setup-extend";
// 在模块的最高层中使用 await 操作符
import TopLevelAwait from "vite-plugin-top-level-await";

export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: "./",
    plugins: [
      vue(),
      // name组件的注册
      VueSetupExtend(),
      // element-plus 按需导入-自动导入
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // svg图标
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      // 在模块的最高层中使用 await 操作符
      TopLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: "__tla",
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: (i) => `__tla_${i}`,
      }),
    ],
    // 本地反向代理解决浏览器跨域限制
    server: {
      // hmr: true,
      host: "localhost",
      port: Number(env.VITE_APP_PORT), // 开启端口号
      open: true, // 启动后是否自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_URL]: {
          target: "https://ax-dev.lhygb.com/api", // 自己项目地址
          ws: true,
          changeOrigin: true, // 开启跨越
          // 以 ^ 开头，将被识别为 RegExp。
          // 这样写的话需要针对不同环境配置这个请求变量，并且需要注意前面这个 ^ 要进行 \ 转义
          rewrite: (path) => path.replace(/^\/api/, "/"),
          // rewrite: (path) =>
          //   path.replace(new RegExp('^' + env.VITE_APP_BASE_URL), '')
        },
      },
    },
    build: {
      sourcemap: true,
      assetsDir: "platform", // 打包后的文件夹
    },
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
        "~/": `${path.resolve(__dirname, "src")}/`,
      },
    },
  });
};
```

## import.meta.glob 获取文件夹下的文件

```js
// 自动创建生成公共 component
const allRoutes = import.meta.glob("@/components/**/index.vue", {
  eager: true,
});
export default {
  install(app) {
    for (let key in allRoutes) {
      app.component(allRoutes[key].default.name, allRoutes[key].default);
    }
  },
};
```
