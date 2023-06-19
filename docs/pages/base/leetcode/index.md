# 算法笔记

## 1. **动态规划三要素：**

1. 重叠子问题
2. 最优子结构
3. 状态转移方程

:::details 斐波那契数列(台阶问题)求解

```js
// 1. 递归求解 自顶向下
// 时间复杂度： O(2^n) ======> 子问题个数即递归树中的节点总数 2^n,解决一个子问题需要的时间，因为只有一个加法操作 recursion(n-1) + recursion(n-2) ，所以解决一个子问题的时间为 O(1),二者相乘 为 O(2^n)

// 空间复杂度： O(n)
// 总时间 = 子问题个数 * 解决一个子问题需要的时间
function recursion(n) {
  if (n == 0 || n == 1) return n;
  return recursion(n - 1) + recursion(n - 2);
}
// 2. 动态规划 自底向上，递归改成迭代。减少空间消耗，只存储两个临时变量
// 时间复杂度： O(n)
// 空间复杂度： O(1)
function fib(n) {
  if (n == 0) return 0;
  let a1 = 0;
  let a2 = 1;
  for (let i = 1; i < n; i++) {
    [a1, a2] = [a2, a1 + a2];
  }
  return a2;
}

// 3. 尾调用写法
function fibW(n, a1 = 0, a2 = 1) {
  if (n <== 1) return a2;
  return fibW(n - 1, a2, a1 + a2);
}
```

:::

## 2. 贪心算法

**贪心算法**是**动态规划算法**的一个子集，可以更高效解决一部分更特殊的问题。实际上，用贪心算法解决问题的思路，并不总能给出最优解。因为它在每一步的决策中，选择目前最优策略，不考虑全局是不是最优。

:::details 贪心算法+双指针求解 分发饼干 455 （https://leetcode.cn/problems/assign-cookies/）

```js
/**
 * @description: 分发饼干
 * @params {Array} 胃口值
 * @params {Array} 饼干
 * @Author: zhs
 */
function getContentChildren(g, s) {
  // 因为胃口小的孩子最容易满足，所以优先满足胃口小的孩子，先进行排序
  g = g.sort((a, b) => a - b);
  s = s.sort((a, b) => a - b);
  // 定义初始值
  let gi = 0; // 胃口值 指针
  let sj = 0; // 饼干大小 指针
  let result = 0; // 结果
  while (gi < g.length && sj < s.length) {
    // 如果 饼干尺寸 > 胃口值 就符合，指针移动，结果 ++
    if (s[sj] >= g[gi]) {
      gi++;
      sj++;
      result++;
    } else {
      // 没有找到的话就换一个饼干，移动饼干 指针
      // 胃口值和饼干大小已经进行过排序
      sj++;
    }
  }
  return result;
}
```

:::

## 二分查找

**需满足的前提条件：**

1. 有序(单调递增/递减)
2. 数组(能够通过索引访问)
3. 数据量不能太大(**数组内存空间连续，对内存要求严格**)也不能太小(遍历即可)

:::details 最长递增子序列

```js
// const nums = [10, 9, 2, 5, 3, 7, 101, 18];
const nums1 = [1, 4, 5, 2, 3, 7, 0];
//  1. 贪心+二分查找，结果可能不正确，但是数量是对的
// nums1 错误结果是 [0,2,3,7] 长度正确为 4 ，正确结果是：[1,2,3,7] 长度正确为 4
const lengthOfLIS = (nums) => {
  // 拿到要判断的数组长度
  const n = nums.length;
  if (n <= 1) {
    return n;
  }
  // 结果集 默认为 数组第一个值
  const result = [nums[0]];
  // 循环数组里的元素
  for (let i = 0; i < n; i++) {
    const item = nums[i];
    // 如果 当前元素 > 结果集最后一个元素，就将其添加进结果集中，递增的 （最后一个永远是最大的）
    if (item > result[result.length - 1]) {
      result.push(item);
    } else {
      // 如果 <= 的话，循环结果集（记住结果集中数是递增的）
      for (let j = 0; j < result.length; j++) {
        // 找到当前元素并进行替换，这时该位置元素就会当前最小值
        if (result[j] >= item) {
          result[j] = item;
          break; // 中止循环
        }
      }
    }
  }
  // console.log(result)
  return result.length;
};

// 第二种，动态规划， 结果正确，效率低
const lengthOfLIS = (nums) => {
  const n = nums.length;
  if (n <= 1) return n;
  // 初始化一个 要查找数组长度 全为 1 的数组 结果集
  const result = new Array(n).fill(1);
  // 循环要查找的数组
  for (let i = 0; i < n; i++) {
    // 在查找数组的同时，循环 结果集
    for (let j = 0; j < i; j++) {
      // 如果 结果集当中元素 < 查找数组 就让结果集当中元素+1
      if (nums[j] < nums[i]) {
        result[i] = Math.max(result[i], result[j] + 1);
      }
    }
  }
  // console.log(result)
  return Math.max(...result);
};

// console.log(lengthOfLIS(nums));
```

:::
