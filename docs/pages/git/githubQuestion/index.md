# gitHub 遇到的问题

## 1. 常用指令

- 1.1 `ssh -T git@github.com` 验证是否与 gitHub 的连接，
连接成功： `Hi yourName! You've successfully authenticated, but GitHub does not provide shell access.`

- 1.2 `ssh-keygen` 生成 SSH key 文件，如果有 git 账号占了 `~/.ssh/id_rsa`名称，可以自己改成`.ssh/id_rsa.github` 文件名称

- 1.3 出现 gitHub 说密钥文件权限不对问题时，可以使用 `chmod 700 .ssh/id_rsa`修改权限，权限值 700，默认 600

## 2.出现`git@github.com: Permission denied (publickey)`错误时解决办法

**第一步**：生成 SSH key

**第二步**：输入命令：`ssh -v git@github.com`

**第三步**：输入命令：`ssh-agent -s`

**第四步**：输入命令：`ssh-add ~/.ssh/id_rsa`，文件路径是`~/.ssh/id_rsa`，如果自己生成时保存的为`~/.ssh/id_rsa.github`,就改成这个

**第五步**：在 gitHub 上添加一个 SSH key，根据路径找到以.pub 结尾的文件，将公钥文件复制到 Github 中

## 3. git push 时需要输入账号密码（不使用 https 上传）

**第一步**：`git remote -v` 查看当前链接的远程仓库地址

```js
$ git remote -v
origin  https://github.com/tianqixin/runoob-git-test (fetch)
origin  https://github.com/tianqixin/runoob-git-test (push)
```

**第二步**：`git remote set-url origin  remote's URL` 修改当前链接的远程仓库形式

```js
git remote set-url origin git@github.com:tianqixin/runoob-git-test.git
```

### 面试问题

2024年2年前端社招bitget面经，期望薪资16K
【一面】

1、自我介绍
2、小程序跟H5的区别是什么？
3、react和vue的语法是是如何在小程序中运行的？
4、uni-app是如何打包成各个平台能运行的代码的？
5、vue3中做了哪些优化？
6、vue2和vue3的响应式有什么区别？
7、vue中的watchEffect是什么？
8、nextjs中运行时机制什么样？你们自己封装的还是？
9、interface和type的区别是什么？
10、vite、webpack、rollup的区别是什么？你怎么选择
11、promise有哪些方法？
12、coding题
13、手写Promise.all

【二面】
1、自我介绍
2、工作经历
3、为什么一直在教育行业
4、前端监控如何设计
5、讲一个你过往项目中遇到的问题，如何解决的

git checkout -b 新分支名 origin/远程分支名
这将会创建一个新的本地分支，并且自动跟踪远程分支。

例如，如果你想创建一个名为feature-x的本地分支，并且想要拉取远程仓库的origin上同名的feature-x分支的代码，你可以这样做：
