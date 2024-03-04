# gitHub 遇到的问题

## 1. 常用指令

> 1.1 `ssh -T git@github.com` 验证是否与 gitHub 的连接，
> 连接成功： `Hi yourName! You've successfully authenticated, but GitHub does not provide shell access.`

> 1.2 `ssh-keygen` 生成 SSH key 文件，如果有 git 账号占了 `~/.ssh/id_rsa`名称，可以自己改成`.ssh/id_rsa.github` 文件名称

> 1.3 出现 gitHub 说密钥文件权限不对问题时，可以使用 `chmod 700 .ssh/id_rsa`修改权限，权限值 700，默认 600

**1.4 本地分支**

> `git branch`：查看所有分支

> `git checkout -b main`：创建 main 分支并切换到该分支

> `git branch -d test`：删除 test 分支，删除该分支前需要先切换到其他分支

**_注意：如果分支包含未合并的更改和未推送的提交，则该 -d 标志将不允许删除本地分支。此时，如果你确定了不想要分支的内容，可以使用 -D 替换 -d 来强制删除此分支_**

**1.5 远程分支**

> `git branch -r`：查看远程上的所有分支

> `git push -u origin test`：将代码推送到远程 `test` 分支，没有的话就会创建 `test` 分支

> `git push <remote_name> -d <remote_branch>`：删除远程分支，`git push origin -d test`：删除远程 test 分支

> `git remote -v`: 作用是显示所有远程仓库

> `git remote show <remote_name>`：查看远程分支和本地的对应关系 `git remote show origin`

> `git remote add [name] [url]`: 作用是添加远程版本库,name 是自己取的仓库的名字 url 是地址,新建仓库下面提示都有，直接复制就行

> `git remote rm name`: 删除远程仓库

> `git remote rename old_name new_name`: 修改仓库名

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
$ git remote set-url origin git@github.com:tianqixin/runoob-git-test.git
```

## 4. 上传时忘记弄 `gitignore` 文件，已上传到仓库时（git 添加.gitignore 后不生效问题）

原因：`.gitignore`文件的用途，该文件只能作用于`Untracked Files`，也就是那些从来没有被 `Git` 记录过的文件（自添加以后，从未 add 及 commit 过的文件）。

**清除缓存 重新提交**

```js
git rm --cached -r .  // 清除缓存
git add .
git commit -m '注释'
git push
```

## 5. nvm 相关

> http://test.runoob.com/w3cnote/nvm-manager-node-versions.html

## 6. Git 创建本地分支并关联远程分支

创建本地分支：`git branch 分支名`
切换到本地分支：`git checkout 分支名`

创建本地分支并切换：`git checkout -b 分支名`

提交本地分支到远程仓库：`git push origin 本地分支名`
新建本地分支与远程分支关联
`git branch –set-upstream 本地新建分支名 origin/远程分支名`
例如：
`git branch –set-upstream dev origin/dev`
`git branch --set-upstream-to=origin/dev dev`

将本地 dev 和远程 dev 分支相关联
`git push --set-upstream origin dev`

## 6. `.gitignore`：https://juejin.cn/post/7290210264728469504#comment

1. 通配符`!`表示：否定模式，表示指定不忽略某些文件或文件夹。

```js
# 匹配根目录下的 unpackage 文件夹
/unpackage/

# 取消对 unpackage 下的 dist 文件夹的忽略
!/unpackage/dist/

# 取消对 unpackage 下的 dist 文件夹的忽略
!/unpackage/res/
```

## 7. git 操作误将本地代码被线上覆盖，导致以前更改代码消失的处理方法

找回操作记录，可以使用`git reflog`、`git cherry-pick`
