# eslint 提交规范相关

## 1. eslint检测

### 1.1 配置`.eslintrc`和`.eslintignore`文件
### 1.2 配置`package.json`中`"lint":"eslint --quiet --ext js,vue ."`命令

## 2. 提交规范

:::tip `提交规范`

## <type>(<scope>) : <subject>

1. feat：新功能（feature）
2. fix：修补bug
3. docs：文档（document）
4. style：格式（不影响代码运行的变动）
5. refactor：重构（既不是新增过年，也不是修改bug代码的变动）
6. test：增加测试
7. chore：构建过程或辅助工具的变动

:::

## 3. 提交时的插件

### 3.1 插件相关
  `validate-commit-msg` ：提交代码规范信息检测
  [ghooks](https://github.com/ghooks-org/ghooks) 监听提交代码时各种事件钩子 
### 3.2  配置相关 （`package.json下的config配置`）
  ```json
    "config":{
        "ghooks":{
            "commit-msg":"validate-commit-msg",
            "pre-commit":"npm run lint"
        }
    }
  ```