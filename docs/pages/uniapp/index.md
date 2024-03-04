# 常用 api 等

## 1. 状态栏高度

> js 获取状态栏高度

```js
onLoad() {
		this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight; // 获取状态栏高度
},
```

> [uni-app 提供内置 CSS 变量](https://uniapp.dcloud.net.cn/tutorial/syntax-css.html#css-%E5%8F%98%E9%87%8F)

> 当设置 `"navigationStyle":"custom"` 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。此时可以使用一个高度为 `var(--status-bar-height)` 的 view 放在页面顶部，避免页面内容出现在状态栏。

```css
.navBar {
  height: calc(var(--status-bar-height) + 44px);
}
```

## 2. 自定义状态栏

:::details

```vue
<template>
  <view class="cunstom-box" :style="{ backgroundColor: backgroundColor }">
    <view class="status-bar"></view>
    <view class="cunstom-nav">
      <view @click="back" class="cunstom-left">
        <text v-if="isBack" class="iconfont icon-31fanhui1 back-icon" />
      </view>
      <view class="cunstom-title">{{ title }}</view>
      <view class="cunstom-right">
        <slot name="options"></slot>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: String, //标题
    isBack: Boolean, //是否需要左侧返回
    backgroundColor: {
      type: String,
      default: "#fff",
    },
  },
  methods: {
    back() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.cunstom-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 750rpx;
  height: calc(var(--status-bar-height) + 44px);
  z-index: 9998;
}
.status-bar {
  height: var(--status-bar-height);
}
.cunstom-nav {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
}
.cunstom-left {
  flex: 1;
}

.back-icon {
  font-size: 40rpx;
}

.cunstom-title {
  flex: 1;
  text-align: center;
  font-weight: bold;
  font-size: $uni-font-size-lg;
}

.cunstom-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
</style>
```

:::

## 3. 滚动过程中实现吸顶效果

> 1. 主要实现思路：获取某个元素在页面上**距离**顶部的距离，然后**监听**页面的滚动，当页面**滚动的距离-元素距离顶部距离>0**,就让该元素的 position 为`fixed`，否则就让其为 `relative`

> 2. `uni.createSelectorQuery()`返回一个 `SelectorQuery` 对象实例。可以在这个实例上使用 `select` 等方法选择节点，并使用 `boundingClientRect` 等方法选择需要查询的信息。
>    **tips:**
>    > 2.1 使用 `uni.createSelectorQuery()` 需要在生命周期 `mounted` 后进行调用。
>    > 默认需要使用到 `selectorQuery.in` 方法。

[**代码实例**](https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#createselectorquery)
:::details

```js
const query = uni.createSelectorQuery().in(this);
query
  .select("#id")
  .boundingClientRect((data) => {
    console.log("得到布局位置信息" + JSON.stringify(data));
    console.log("节点离页面顶部的距离为" + data.top);
  })
  .exec();
```

:::

### 主要实现代码

:::details

```vue
<template>
  <view id="attendance-list" :style="fixedStyle"> </view>
</template>
<script>
data(){
	return{
		toTop: 0, //距离顶部距离
		fixedStyle:{},
	}
}
// 监听页面滚动，动态设置头部滚动过程中固定
		onPageScroll(obj) {
			if (obj.scrollTop - this.toTop > 0) {
				this.fixedStyle = {
					position: 'fixed',
					top: '0rpx',
					background: '#fff',
					zIndex: 3
				}

			} else {
				this.fixedStyle = {
					position: 'relative',
				}
			}
		},
mounted() {
		this.listToTop()
},
methods:{
	// 距离顶部距离
			listToTop() {
				uni.createSelectorQuery().in(this).select('#attendance-list')
					.boundingClientRect(rect => {
						this.toTop = rect.top
					}).exec()
			},
}
</script>
```

:::

4. 修改标题

:::details

```js
onReady() {
			uni.setNavigationBarTitle({
				title: this.status
			});
		},
```

:::

## 4. `uni.showModal` 异步变为同步

```js
return new Promise(async (resolve) => {
  uni.showModal({
    title: "title",
    content: "content",
    success: (res) => {
      resolve(res);
    },
  });
});
```

## 5. 把对象中的数据给了某个变量，改变一个对象的值，另一个对象也变化的解决办法！

`this.dataB = JSON.parse(JSON.stringify(this.dataA));`

`https://blog.csdn.net/jiangwei1994/article/details/83068944`
