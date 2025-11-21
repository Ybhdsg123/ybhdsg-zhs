# 算法  ---- 简单模式

###  1. 找单独的数

::: tip  异或运算

1. 相同数字异或结果为0：a ^ a = 0
2. 任何数字与0异或结果为该数字本身：a ^ 0 = a
3. 异或运算满足交换律和结合律：a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b

:::

```js
function solution(cards) {
    // 初始化结果变量为0
    let result = 0
   // 遍历数组中的每一个元素
    for (let card of cards) {
        // 对结果变量进行异或运算
        result = result ^ card;
    }
    // 返回最终结果
    return result;
}

function main() {
    console.log(solution([1, 2, 2, '1', 3, 3, 4, 5, 5]) === 4);
    console.log(solution([0, 1, 0, 1, 2]) === 2);
}
main();
```

### 2. 数字字符串格式化 （需要将一个不带千分位逗号的数字字符串转换为带千分位逗号的格式，并且保留小数部分）


```js{1,10}
// 1. 正则表达式实现
function solution(s){
    // 1. 去除前导 0 
    const str = Number(s).toString()
    // 2. 分割整数 和 小数部分
    const [int, decimal] = str.split('.')
    return int.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,') + (decimal ? '.' + decimal : '')
}

// 2. 常规做法
function solution(s){
    // 1. 去除前导 0 
    const str = Number(s).toString()
    // 2. 分割整数 和 小数部分
    const [int, decimal] = str.split('.')
    // 3. 格式化整数部分
    let formattedIntegerPart = ''
    for(let i = int.length-1,count=0;i>=0;i--,count++){
        // count > 0 且为 3 的倍数 就在前面 + ','
        if(count>0&&count%3===0){
            formattedIntegerPart  = ','+formattedIntegerPart
        }
        formattedIntegerPart = int[i]+formattedIntegerPart
    }
     // 合并整数部分和小数部分
    if (decimal) {
        return formattedIntegerPart + '.' + decimal;
    } else {
        return formattedIntegerPart;
    }
}
```
