# vscode 相关插件和快捷键

## 必备插件

1. `Bookmarks`
   功能：常用于读源码进行标记行，跳转（代码标记快速跳转）
2. `ESLint`
   功能：代码规范检查
3. `Prettier - Code formatter`
   功能：代码美化，自动格式化成规范格式
4. `Project Manager`
   功能：项目管理插件，当开发多个项目时，可以快速跳转
5. `Path Intellisense`
   功能：路径智能提示
6. `Image preview`
   功能：当引入路径为图片时，可以预览当前图片
7. `GitLens`
   功能：增强了 git 功能，支持在 VSCode 查看作者、修改时间等等
8. `open in browser`
   功能：在浏览器打开当前文件
9. `auto-close-tag`：自动关闭标签。

## 好用插件

1. `Code Spell Checker` ：一个用于检查单词拼写的插件。
2. `javascript console utils`：

`Cmd+Shift+L`：选中变量，在当前代码下插入一行 clg
`Cmd+Shift+D`：删除插入的那一行代码

3. `Import Cost`：显示依赖的大小
4. `Auto Rename Tag`：自动重命名标签
5. `Code Runner`：一键执行各种语言代码（常用于测试）
6. `Debugger for Chrom`e：在 VSCode 端，调试代码
7. `Live ServerPP`：在服务器端打开你的文件，实时显示你修改的代码
   支持 websocket 消息服务，可以用于调试 websocket 客户端
   支持可编程虚拟文件，可用于模拟服务端 API 接口
8. `Svg Preview`：可以显示你的 SVG 图片，还可以编辑
9. `Template String Converte`r：在字符串中输入$触发，将字符串转换为模板字符串
10. `JavaScript (ES6) code snippets`：ES6 的 js 代码片段，比如 clg---console.log
11. `any-rule`：常用正则判断表单内容
12. `vscode-icons`：VSCode 文件夹&文件图标
13. `echarts-vscode-extension`：
    --安装插件后，ctrl+shift+p 输入 active Echars 即可开启智能提示，
    --提示各种 Echar 中 Option 的属性，挺强大的
14. `A-super-translate`：选中行，Ctrl+Shift+p 输入 翻译，键入 ctrl+`再按下 ctrl+1 为翻译直接替换选中区域
15. `One Dark Pro`：颜色主题
16. `VS Code Counter`：统计你的代码行数，点击 Vscode 顶部菜单 查看 -> 命令面板 ，输入 count
17. `koroFileHeader`: 文件头部注释和函数注释的插件

> **_在 settings.json 中配置 fileheader_**

```js
// 文件头部注释
"fileheader.customMade": {
  "Author": "zhs", // 文件作者
  "Date": "Do not edit", // 文件创建时间
  "LastEditors": "JDY", // 文件最后编辑者
  "LastEditTime": "Do not edit", // 文件最后编辑时间
  "Description": "" // 介绍文件的作用、文件的入参、出参。
},
// 函数注释
"fileheader.cursorMode": {
  "description": "", // 函数注释生成之后，光标移动到这里
  "param": "", // param 开启函数参数自动提取 需要将光标放在函数行或者函数上方的空白行
  "Author": "zhs", // 函数作者
  "Date": "Do not edit"
},
```

## 快捷键

1. 快速复制一行：`shift+alt+下箭头(上箭头)`
2. 选定多个相同的单词：`ctrl+d`
3. 添加多个光标：`ctrl+alt+下箭头(上箭头)`
4. 快速定位到某一行：`ctrl+g`
5. 选择某个区块：`shift+alt 然后拖动鼠标`
6. 放大缩小整个编辑器界面： `ctrl + + / - ctrl + 加号或者减号`
7. 多行注释：`shift +alt +a`
8. 自定义快捷键 作者：管理按钮 --- 键盘快捷方式 --- 输入 shift +alt +a 找到这个快捷键 -----点击编辑按钮 ----直接按下 ctrl +shift + / ----最后按下回车修改完毕。
