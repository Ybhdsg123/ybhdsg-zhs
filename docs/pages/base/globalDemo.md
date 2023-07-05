# node.js(http://www.nodejs.com.cn/7-days-nodejs/#2.5.5)

## !. `process`

- `process`：一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制
- 由于 JavaScript 是一个单线程语言，所以通过 node xxx 启动一个文件后，只有一条主线程

:::details `process`常见属性

- process.env：环境变量，例如通过 `process.env.NODE_ENV 获取不同环境项目配置信息
- process.nextTick：这个在谈及 EventLoop 时经常为会提到
- process.pid：获取当前进程 id
- process.ppid：当前进程对应的父进程
- process.cwd()：获取当前进程工作目录，
- process.platform：获取当前进程运行的操作系统平台
- process.uptime()：当前进程已运行时间，例如：pm2 守护进程的 uptime 值
- 进程事件：process.on(‘uncaughtException’,cb) 捕获异常信息、 process.on(‘exit’,cb）进程推出监听
- 三个标准流：process.stdout 标准输出、 process.stdin 标准输入、 process.stderr 标准错误输出
- process.title 指定进程名称，有的时候需要给进程指定一个名称

:::

:::tip `process`常见方法

- `process.argv()`：在终端通过 node 命令执行时，获取命令行参数，返回值是一个数组

      - [0] node路径
      - [1] 当前执行的文件路径
      - 2-n : 参数

- `process.cwd()`：返回当前 Node 进程执行的目录

:::

## 1. 基本信息

- **`NodeJS`是一个 JS 脚本解析器**，任何操作系统下安装`NodeJS`本质上做的事情都是**把 NodeJS 执行程序复制到一个目录**，然后**保证这个目录在系统 `PATH` 环境变量下**，以便终端下可以使用 node 命令。

- 终端下直接输入 node 命令可进入命令交互模式，很适合用来测试一些 JS 代码片段，比如正则表达式。

- NodeJS 使用 CMD 模块系统，主模块作为程序入口点，**所有模块在执行过程中只初始化一次**。

- 除非 JS 模块不能满足需求，否则不要轻易使用二进制模块，否则你的用户会叫苦连天。

## 2. 模块路径解析规则

- **内置模块**：不做路径解析，**直接返回内部模块的导出对象**，例如`require(fs)`
- `node-modules`目录：在模块`/home/user/hello.js`中使用`require('foo/bar')`，那么会依次查找
  ```js
  /home/user/node-modules/foo/bar
  /user/node-modules/foo/bar
  /node-modules/foo/bar
  ```
- `NODE_PATH`变量：`NodeJs`允许通过`NODE_PATH`环境变量来设置搜索路径，可以设置一个或者多个目录，在`linux`下使用`:`，在`window`下使用`;`分隔，例如：

```js
// 环境变量
NODE_PATH = "/home/user/lib:/home/lib";
// 使用
requir("foo / bar");

// 查找路径
("/home/user/lib/foo/bar");
("/home/lib/foo/bar");
```

## 3. 包`package`

- js 模块的基本单位是 js 文件，多个子模块组成大模块，称为包，并把子模块放在同一目录中
- 当模块的文件名为`index.js`时，**加载模块时可以使用模块所在目录的路径代替模块文件路径**，下面两条语句等价

```js
var cat = require("/home/user/lib/cat");
var cat = require("/home/user/lib/cat/index");
```

- `package.json`文件，自定义入口模块的**文件名**和**入口位置**，可以使用`require("/home/user/lib/cat")`来加载模块

```js
// package.json
{
    "name": "cat", // 包名，在npm上必须唯一
    "main": "./lib/main.js" // 入口位置
}
```

## 4. `fs`模块

:::tip `fs`模块

- 引入 ` const fs = require('fs')`
- `fs.readFileSync(文件路径,options)` ：从源路径读取文件内容
- `fs.writeFileSync(目标文件路径（无新建）`,写入文件,options)：写入文件
- `fs.createReadStream()`：创建一个源文件的只读的数据流
- `fs.createWriteStream()`：创建一个目标文件的只写数据流
- `.pipe`进行连接：`js fs.createReadStream(src).pipe(fs.createWriteStream(dst));`
- **文件属性读写**。

其中常用的有`fs.stat`、`fs.chmod`、`fs.chown`等等。

- **文件内容读写**。

其中常用的有`fs.readFile`、`fs.readdir`、`fs.writeFile`、`fs.mkdir`等等。

- **底层文件操作**。

其中常用的有`fs.open`、`fs.read`、`fs.write`、`fs.close`等等。

:::

## 5. `path`模块

:::tip path

- `path.normalize()`: 将传入的路径转换为**标准路径**，**解析**路径中的`.`与`..`，还能**去掉**多余的斜杠。
  <MyText text='注意：'/>标准化之后的路径里的斜杠在 **Windows 系统下是`\`** ，而在**Linux 系统下是`/`**。如果想保证任何系统下都使用`/`作为路径分隔符的话，需要用 **`.replace(/\\/g, '/')`** 再替换一下标准路径。

  ```js
  path.normalize('foo//baz//../bar') ==> "foo/bar"
  ```

- `path.join()`：将传入的多个路径拼接为标准路径。该方法可避免手工拼接路径字符串的繁琐，并且能在不同系统下正确使用相应的路径分隔符.

  ```js
  path.join("foo/", "baz/", "../bar"); // => "foo/bar"
  ```

- `path.extname()`：**返回 `path` 的扩展名**，即 `path` 的最后一部分中从最后一次出现的 .（句点）字符到字符串的结尾

  ```js
  path.extname("foo/bar.js"); // => ".js"
  path.extname("index.html"); // => '.html'
  path.extname("index."); // => '.'
  path.extname("index"); // => ''
  path.extname(".index"); // => ''
  path.extname(".index.md"); // => '.md'
  ```

- `path.resolve()`： 路径或路径片段的序列解析为**绝对路径**。**给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径。**

  ```js
  // 因为 baz 不是绝对路径，但是 /bar/baz 是
  path.resolve("/foo", "/bar", "baz"); // => '/bar/baz'
  path.resolve("/foo/bar", "./baz"); // => '/foo/bar/baz'
  path.resolve("/foo/bar", "/tmp/file/"); // => '/tmp/file'

  path.resolve("wwwroot", "static_files/png/", "../gif/image.gif");
  // 如果当前工作目录是 /home/myself/node，
  // 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
  ```

:::
