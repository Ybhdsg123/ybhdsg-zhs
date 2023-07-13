# node.js(http://www.nodejs.com.cn/7-days-nodejs/#2.5.5)

## ！node 常用

### 1. `process`全局变量

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

      - [0] node路径 （一般用不到）
      - [1] 当前执行的文件路径 （一般用不到）
      - 2-n : 参数 （一般都这样 process.argv.slice(2) 拿命令行输入的参数）

- `process.cwd()`：返回当前 Node 进程执行的目录

:::

### 2. `cp -r source/* target` 拷贝目录命令

- 终端下通过 `cp -r source/* target` 可以快速实现目录的拷贝 `source`：源目录，target：目标目录

```js
  cp -r demo demo1 // 将 demo 目录 拷贝一份到 demo1 ，没有就新建
  cp -r demo/file demo2 // 将 demo 目录下的 file 拷贝到 demo2
```

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
- `fs.readdirSync(dir)` 读取目录内容

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

:::details `fs.stat(), fs.statsync() `: 获取文件信息状态

1. 异步方法 `fs.stat()`
   fs.stat(path,callback)，path 表示文件路径； callback 是指回调函数，有两个参数：(err,stats)，其中 stats 是 fs.stat 的实例；
2. 同步方法 `fs.statsync()`
   fs.statsync(path),只接收一个 path 变量，fs.statSync(path)其实是一个 fs.stats 的一个实例

**常用的方法：**

1. `stats.isFile()`: 如果是文件则返回 true,否则返回 false;

2. `stats.isDirectiory()`: 如果是目录则返回 true,否则返回 false;

3. `stats.isBlockDevice()`: 如果是块设备则返回 true，否则返回 false;

4. `stats.isCharacterDevice()`: 如果是字符设备返回 true,否则返回 false;

5. `stats.isSymbolicLink()`: 如果是软链接返回 true,否则返回 false;

6. `stats.isFIFO()`: 如果是 FIFO,则返回 true,否则返回 false.FIFO 是 UNIX 中的一种特殊类型的命令管道；

7. `stats.isSocket()`: 如果是 Socket 则返回 true,否则返回 false;

8. `stats.size()`: 文件的大小（以字节为单位）。

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

## 6 .单字节编码

:::details

1. `ASCII编码`：单字节编码。最初的编码，由一个字节组成，因此只能表示 256 个字符，但只表示 0-9，a-z，A-Z，和一些加减乘除百分号，够老美用了
2. `ANSI编码`：多字节编码。

- 由于一个字节只能表示 255 个数字，所以**中国**约定了**GBK 编码规则**，约定用 `0x80-0xFF` 范围内的某两个字节来表示某一个中文字符。

- 日本约定了 JIS 编码规则，他们约定 0x80-0xFF 范围内的某两个字节来表示某个日文字符。

- 台湾约定了 BIG5 编码规则，约定 0x80-0xFF 范围内的某两个字节表示某个繁体中文字符。

- 所以我们拿到了一个 ANSI 字节串的时候，我们还必须知道这个字节串的编码，才能将这个字节串转换成相应国家的字符串。

3. `UNICODE编码`：宽字节编码。

:::
:::tip

1. 字节： **字节（Byte）是一种计量单位，表示数据量多少**，它是计算机信息技术用于计量存储容量的一种**计量单位**。
2. 字符：字符是指计算机中使用的文字和符号，比如 1、2、3、A、B、C、~！·#￥%……—\*（）——+、等等。

- ①ASCII 码中，一个英文字母（不分大小写）占一个字节的空间，一个中文汉字占两个字节的空间。一个二进制数字序列，在计算机中作为一个数字单元，一般为 8 位二进制数，换算为十进制。**最小值 0，最大值 255**。

- ②UTF-8 编码中，一个英文字符等于一个字节，一个中文（含繁体）等于三个字节。

- ③Unicode 编码中，一个英文等于两个字节，一个中文（含繁体）等于两个字节。符号：英文标点占一个字节，中文标点占两个字节。举例：英文句号“.”占 1 个字节的大小，中文句号“。”占 2 个字节的大小。

- ④UTF-16 编码中，一个英文字母字符或一个汉字字符存储都需要 2 个字节（Unicode 扩展区的一些汉字存储需要 4 个字节）。

- ⑤UTF-32 编码中，世界上任何字符的存储都需要 4 个字节。

:::

## 7. `http`模块

**'http'模块提供两种使用方式：**

- 作为服务端使用时，创建一个 HTTP 服务器，监听 HTTP 客户端请求并返回响应。

- 作为客户端使用时，发起一个 HTTP 客户端请求，获取服务端响应。

:::warning 注意点：
问： 为什么 http 模块创建的 HTTP 服务器返回的响应是 chunked 传输方式的？

答： 因为默认情况下，使用.writeHead 方法写入响应头后，允许使用.write 方法写入任意长度的响应体数据，并使用.end 方法结束一个响应。由于响应体数据长度不确定，因此 NodeJS 自动在响应头里添加了 Transfer-Encoding: chunked 字段，并采用 chunked 传输方式。但是当响应体数据长度确定时，可使用.writeHead 方法在响应头里加上 Content-Length 字段，这样做之后 NodeJS 就不会自动添加 Transfer-Encoding 字段和使用 chunked 传输方式。

问： 为什么使用 http 模块发起 HTTP 客户端请求时，有时候会发生 socket hang up 错误？

答： 发起客户端 HTTP 请求前需要先创建一个客户端。http 模块提供了一个全局客户端 http.globalAgent，可以让我们使用.request 或.get 方法时不用手动创建客户端。但是全局客户端默认只允许 5 个并发 Socket 连接，当某一个时刻 HTTP 客户端请求创建过多，超过这个数字时，就会发生 socket hang up 错误。解决方法也很简单，通过 http.globalAgent.maxSockets 属性把这个数字改大些即可。另外，https 模块遇到这个问题时也一样通过 https.globalAgent.maxSockets 属性来处理
:::

## 8. 进程管理

- 1.  `process`:process 不是内置模块，而是一个全局对象，
  - 官方文档： http://nodejs.org/api/process.html
- 2. `child_process`:模块可以创建和控制子进程,该模块提供的 API 中最核心的是.spawn，其余 API 都是针对特定使用场景对它的进一步封装，算是一种语法糖。
  - 官方文档： http://nodejs.org/api/child_process.html
- 3. `Cluster`:cluster 模块是对 child_process 模块的进一步封装，**专用于解决单进程 NodeJS Web 服务器无法充分利用多核 CPU 的问题**。使用该模块可以简化多进程服务器程序的开发，让每个核上运行一个工作进程，并统一通过主进程监听端口和分发请求。

  - 官方文档： http://nodejs.org/api/cluster.html

### 应用场景

#### 1. 如何获取命令行参数

```js
function main(argvs) {}
main(process.argv.slice(2));
```

#### 2. 如何退出程序

通常一个程序做完所有事情后就**正常退出了，这时程序的退出状态码为 0**。或者一个程序运行时**发生异常后挂了，这时程序的退出状态码不等于 0**。如果我们在代码中捕获了某个异常，但是觉得程序不应该继续运行下去，需要立即退出，并且需要把退出状态码设置为指定数字，比如 1，就可以按照以下方式：

```js
try {
  // ...
} catch (err) {
  // ...
  process.exit(1);
}
```

#### 3. 如何控制输入输出

NodeJS 程序的**标准输入流`（stdin）`**、一个**标准输出流`（stdout）`**、一个**标准错误流（`stderr）`**分别对应 **process.stdin**、**process.stdout** 和 **process.stderr**，第一个是只读数据流，后边两个是只写数据流，对它们的操作按照对数据流的操作方式即可。例如，console.log 可以按照以下方式实现。

```js
 function log(){
  process.stdout.write(
          util.format.apply(util, arguments) + '\n');
  )
 }
```

#### 4. 如何降权

在 Linux 系统下，我们知道需要**使用 root 权限才能监听 1024 以下端口**。但是一旦**完成端口监听后，继续让程序运行在 root 权限下存在安全隐患**，因此最好能把权限降下来。以下是这样一个例子。

```js
http.createServer(callback).listen(80, function () {
  // 如果是通过sudo获取root权限的，运行程序的用户的UID和GID保存在环境变量SUDO_UID和SUDO_GID里边。
  // 如果是通过chmod +s方式获取root权限的，运行程序的用户的UID和GID可直接通过process.getuid和process.getgid方法获取。
  var env = process.env,
    uid = parseInt(env["SUDO_UID"] || process.getuid(), 10),
    gid = parseInt(env["SUDO_GID"] || process.getgid(), 10);

  // 降权时必须先降GID再降UID，否则顺序反过来的话就没权限更改程序的GID了。
  process.setgid(gid); // 先降GID  process.setgid(gid) 只接受number类型参数
  process.setuid(uid); // 再降UID   process.setuid(uid) 只接受number类型参数
});
```

#### 5. 如何创建子进程

```js
// spawn(exec, args, options)方法支持三个参数
// exec：参数是执行文件路径，可以是执行文件的相对或绝对路径，也可以是根据PATH环境变量能找到的执行文件名。
// args：数组中的每个成员都按顺序对应一个命令行参数。
// options：用于配置子进程的执行环境与行为。
const child = child_process.spawn("node", ["xxx.js"]);

child.stdout("data", function (data) {
  console.log("stdout: " + data);
});
child.stderr("data", function (data) {
  console.log("stderr: " + data);
});
child.on("close", function (code) {
  console.log("child process exited with code " + code);
});
```

#### 6. 进程间如何通讯

```js
/* parent.js */
const child = child_process.spawn("node", ["child.js"]);

// 父进程通过 .kill 方法向子进程发送 SIGTERM 信号
child.kill("SIGTERM");

/* child.js */
process.on("SIGTERM", function () {
  // 子进程通过监听 process 对象的的SIGTERM事件响应信号
  cleanUp();
  process.exit(0);
});
```

**父子进程都是 NodeJS 进程，就可以通过 IPC（进程间通讯）双向传递数据**
据在传递过程中，会先在发送端使用 `JSON.stringify` 方法序列化，再在接收端使用 `JSON.parse` 方法反序列化。

```js
/* parent.js */
var child = child_process.spawn("node", ["child.js"], {
  stdio: [0, 1, 2, "ipc"], //父进程在创建子进程时，在options.stdio字段中通过ipc开启了一条IPC通道
});

// 监听子进程对象的 message 事件接收 来自子进程的消息，
child.on("message", function (msg) {
  console.log(msg);
});

// 并通过.send方法给子进程发送消息。
child.send({ hello: "hello" });

/* child.js */
process.on("message", function (msg) {
  // 监听 process 对象的 message 事件
  msg.hello = msg.hello.toUpperCase();
  // 通过 .send 方法向父进程传递信息
  process.send(msg);
});
```

#### 7. 如何守护子进程

**守护进程一般用于监控工作进程的运行状态，在工作进程不正常退出时重启工作进程**，保障工作进程不间断运行。以下是一种实现方式。

```js
/* daemon.js */
function spawn(mainModule) {
  var worker = child_process.spawn("node", [mainModule]);

  worker.on("exit", function (code) {
    // 工作进程非正常退出时，守护进程立即重启工作进程。
    if (code !== 0) {
      spawn(mainModule);
    }
  });
}

spawn("worker.js");
```

## 9. 异步编程

### 域（domain）

1. 一个域就是一个 js 运行环境，在一个运行环境中，如果一个异常没有被捕获，就会作为一个全局异常被抛出，nodejs 中通过 process 对象提供捕获全局异常的方法

```js
process.on("uncaughtException", function (error) {
  console.log("Error: %s", err.message);
});

setTimeout(function (fn) {
  fn();
});

// Error: undefined is not a function
```

2. 通过 域（domain）对象监听 error 事件，捕获异常

```js
const d = domain.create();

d.on("error", function () {
  response.writeHead(500);
  response.end();
});
```

### 注意点 ⚠️

- 官方建议无论是通过`process`还是`domian`处理异常后都要重启程序，因为处理异常后的程序处于一种**不确定的运行状态**，可能导致**内存泄漏**或者**表现的很奇怪**
- JS 本身的 throw..try..catch 异常处理机制并不会导致内存泄漏，也不会让程序的执行结果出乎意料，但 NodeJS 并不是存粹的 JS。NodeJS 里大量的 API 内部是用 C/C++实现的，因此 NodeJS 程序的运行过程中，代码执行路径穿梭于 JS 引擎内部和外部，而 JS 的异常抛出机制可能会打断正常的代码执行流程，导致 C/C++部分的代码表现异常，进而导致内存泄漏等问题
