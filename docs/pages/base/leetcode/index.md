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

## 3. 二分查找

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

## 4. 输出数组中占比超过一半的单个数字，如果没有就输出-1

:::details

```js
const nums = [1, 1, 2, 2, 2];
function majorityElement(nums) {
  // 出现的主要元素
  let majorityEl = 1;
  // 出现的次数
  let count = 0;
  // 循环数组找出这个主要元素
  for (let num of nums) {
    // 如果 count===0，将值给维护的主要元素
    if (count === 0) {
      majorityEl = num;
    }
    // 如果循环的元素 === 主要元素，count++，否则 count--，
    // 就是将一个相同的和一个不相同的互相抵消掉，最后多的就是主要的那个元素
    if (majorityEl === num) {
      count++;
    } else {
      count--;
    }
  }

  // 再次循环判断是否是有这个主要元素
  count = 0;
  for (let num of nums) {
    // 元素 === 主要元素 count++
    if (num === majorityEl) {
      count++;
    }
  }
  // 判断count是否大于循环数组长度的一半
  return count * 2 > nums.length ? majorityEl : -1;
}
console.log(majorityElement(nums));
// 输出 2
```

:::

## 5. 合并两个有序数组

:::details

```js
const arr1 = [1, 2, 3, 0, 0, 0];
const arr2 = [2, 5, 6];
// nums1 arr1, m arr1长度, nums2 arr2, n arr2的长度
var merge = function (nums1, m, nums2, n) {
  // 过滤出不为0的
  nums1 = nums1.filter((item) => item !== 0);
  // 创建一个两个数组长度的 新数组
  const result = new Array(m + n).fill(1);
  if (m === 0) return nums2;
  if (n === 0) return nums1;
  let p1 = 0;
  let p2 = 0;
  // 新数组的标识 初始为 0
  let tail = 0;
  // 当前值
  let cur;
  while (p1 <= m || p2 <= n) {
    if (p1 === m) {
      // arr1 遍历到最后
      cur = nums2[p2++];
    } else if (p2 === n) {
      // arr2 遍历到最后
      cur = nums1[p1++];
    } else if (nums1[p1] < nums2[p2]) {
      // arr1值 < arr2值
      cur = nums1[p1++];
    } else {
      // arr1值 > arr2值
      cur = nums2[p2++];
    }
    result[tail++] = cur;
  }
  console.log(result);
  return result;
};

console.log(merge(arr1, 3, arr2, 3));
```

:::

## 字符串的相加

:::details

```js
const str1 = "1";
const str2 = "9";
function add(str1, str2) {
  let s1 = str1.length - 1;
  let s2 = str2.length - 1;
  let result = [];
  let current = 0; // 是否有进位
  while (s1 >= 0 || s2 >= 0 || current !== 0) {
    // 根据索引拿到字符串
    const num1 = str1.charAt(s1);
    const num2 = str2.charAt(s2);
    // 判断当前位置是否有值，无值使用 0 代替
    const current1 = num1 ? num1 : 0;
    const current2 = num2 ? num2 : 0;
    // 两值 + 进位 进行计算
    const num = current + +current1 + +current2;
    // 向下取整 为进位数
    current = Math.floor(num / 10);
    // 取余为需要的数字
    result.push(num % 10);
    // 改变指针
    s1--;
    s2--;
  }
  return result.reverse().join("");
}
console.log(add(str1, str2));
```

:::
