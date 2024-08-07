
## 1. 常用语法

```js

`git branch`：# 查看本地所有分支
`git branch -r`  # 查看远程所有分支
`git branch -vv` # 查看本地分支和远程分支的关联关系


`git checkout -b 本地分支 origin/远程分支`  # 创建本地分支并关联远程分支
`git checkout -b 本地分支`：# 创建分支并切换到该分支

`git branch --set-upstream-to origin/远程分支名 本地分支名`  # 已有本地分支要推向远程并创建关联
`git push -u origin test`：将代码推送到远程 `test` 分支，远程没有的话就会创建 `test` 分支

`git pull origin 拉取的分支名` # 拉取分支

`git remote show <remote_name>`：查看远程分支和本地的对应关系 `git remote show origin`
`git remote add [name] [url]`: 作用是添加远程版本库,name 是自己取的仓库的名字 url 是地址,新建仓库下面提示都有，直接复制就行
`git remote rm name`: 删除远程仓库
`git remote rename old_name new_name`: 修改仓库名
```

## 2. 删除分支

```js
1. 删除本地分支：
git branch -d <branch_name>  # 安全删除，只有当分支已经合并到其它分支时才会删除
git branch -D <branch_name>  # 强制删除，不论分支是否合并都会被删除
2. 删除远程分支：
git push <remote_name> --delete <branch_name>  # 删除远程分支
```

## 3. git 操作误将本地代码被线上覆盖，导致以前更改代码消失的处理方法

找回操作记录，可以使用`git reflog`、`git cherry-pick`

## 4. 忘添加 `.gitignore` 文件

**已上传到仓库时（git 添加.gitignore 后不生效问题）**
原因：`.gitignore`文件的用途，该文件只能作用于`Untracked Files`，也就是那些从来没有被 `Git` 记录过的文件（自添加以后，从未 add 及 commit 过的文件）。

**清除缓存 重新提交**

```js
`--cached` 选项表示只从索引中删除，而不删除工作目录中的文件。`-r` 选项表示递归操作
常用于当您不想让某些文件或目录被 Git 管理，但又希望保留在本地的时候。
git rm --cached -r .  # 清除全部缓存
git add .
git commit -m '注释'
git push
```

```js 清除对于 unpackage的缓存
git rm -r --cached unpackage # 清除unpackage的缓存
git commit -m "Remove unpackage from tracking"
git push
```

## 5. `.gitignore`规则

<https://juejin.cn/post/7290210264728469504#comment>

1. 通配符`!`表示：否定模式，表示指定不忽略某些文件或文件夹。

```js
/unpackage/ # 匹配根目录下的 unpackage 文件夹
!/unpackage/dist/ # 取消对 unpackage 下的 dist 文件夹的忽略
!/unpackage/res/ # 取消对 unpackage 下的 dist 文件夹的忽略
```

## 6. nvm 相关

<http://test.runoob.com/w3cnote/nvm-manager-node-versions.html>
