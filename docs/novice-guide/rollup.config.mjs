import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser' // 压缩

export default {
  input: './dist/index.js', // 打包入口
  // 打包出口
  output: [
    {
      file: './dist/dist.js',
      format: 'umd', // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
      name: 'NoviceGuide',
      sourcemap: true
    },
    {
      file: './dist/dist.min.js',
      format: 'umd',
      name: 'NoviceGuide',
      plugins: [terser()]
    }
  ],
  // 打包插件
  plugins: [
    // 查找和打包node_modules中的第三方模块
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    commonjs()
  ]
}
