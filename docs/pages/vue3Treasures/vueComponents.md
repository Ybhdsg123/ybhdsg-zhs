# 截取字符组件

<script setup>
import AutoEllipsis from './components/autoEllipsis.vue'
import Loading from './components/loading.vue'
import ImgWatermark from './components/imgWatermark.vue'
import CrashBallLoading from './components/crashBallLoading.vue'
import TextLoading from './components/textLoading.vue'
import MultilineTextErasingEffect from './components/MultilineTextErasingEffect.vue'
</script>

## 1. 自动省略文本

::: tip 注意点

1. 通过自定义 `data` 和 伪元素的 `attr` 显示展示的文本

   [attr()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/attr)
   : 可以将自定义属性值作用于伪元素

   ```html
   <p data-foo="hello">world</p>
   &:before { content: attr(data-foo)}
   ```

:::

<div style="width:180px" >
<AutoEllipsis  text="1. 单行展示默认省略 单行展示默认省略"/>
</div>
<AutoEllipsis style="width:200px" isShowSuffix text="2. 单行带后缀省略单行带后缀省略单行带后缀省略.jpeg"/>
<AutoEllipsis style="width:80px"  :showLine="2" text="3. 多行展示默认省略展示默认省略.jpeg"/>
<AutoEllipsis style="width:220px" isShowSuffix :showLine="2" text="4. 多行展示带后缀省略多行展示带后缀省略.jpg多行展示带后缀省略多行展示带后缀省略.jpg"/>

:::details 使用

1. **text**: [string] 显示的文本
2. **showLine**:[number] 展示几行
3. **isShowSuffix**: [boolean] 是否展示后缀
4. **textStyle**: [object] 展示文本的样式（改变字体大小就在这里修改）

```js

<div style="width:80px" >
<AutoEllipsis  text="1. 单行展示默认省略"/>
</div>
<AutoEllipsis style="width:100px" isShowSuffix text="2. 单行带后缀省略.jpeg"/>
<AutoEllipsis style="width:80px"  :showLine="2" text="3. 多行展示默认省略展示默认省略.jpeg"/>
<AutoEllipsis style="width:90px" isShowSuffix :showLine="2" text="4. 多行展示带后缀省略多行展示带后缀省略.jpg"/>
```

:::

> 代码地址：pages/vue3Treasures/components/autoEllipsis.vue

## 2. loading 效果

### 2.1 加载文字 loading

<TextLoading/>
<TextLoading :loadingText="'正在加载中...'"/>
<TextLoading :loadingText="'请稍后...'"/>

:::details 使用

1. **loadingText**: [string] 加载文字

```js
<TextLoading/> // 默认值: 暂无更多数据...
<TextLoading :loadingText="'正在加载中...'"/>
<TextLoading :loadingText="'请稍后...'"/>
```

:::

### 2.2 转圈 loading

<Loading />

<Loading :size="30"/>

:::details 使用

1. size: 内置 4 个尺寸（ mini，small,medium,large,**默认为 mini**， `<Loading />`

2. 自定义尺寸的话输入数字 `<Loading :size="30"/>`

```js
<Loading />
<Loading :size="30"/>
```

:::

> 代码地址：pages/vue3Treasures/components/loading.vue

### 2.3 小球碰撞 loading

<CrashBallLoading/>

> 代码地址：pages/vue3Treasures/components/crashBallLoading.vue

## 3. 图片水印

<ImgWatermark text="侵权必究" >
<div >
  MutationObserver 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。

disconnect(): 关闭监听， 阻止 MutationObserver 实例继续接收的通知，直到再次调用其 observe() 方法，该观察者对象包含的回调函数都不会再被调用。

observe(): 开启监听，配置 MutationObserver 在 DOM 更改匹配给定选项时，通过其回调函数开始接收通知。

takeRecords():从 MutationObserver 的通知队列中删除所有待处理的通知，并将它们返回到 MutationRecord 对象的新 Array 中。

</div>
</ImgWatermark>

> 代码地址：pages/vue3Treasures/components/imgWatermark.vue

> [MutationObserver----MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

## 4. 多行文本擦除效果出现

<MultilineTextErasingEffect/>

### 4.1 使用`css`实现

- 使用两个相同的文本，第二个文本用定位的方式覆盖到上面（第二个文本嵌套一层`span`元素，因为`span`元素是一个行内元素，它的宽度和高度是由其内容决定的。当给 `span` 元素设置背景色时，背景色会应用于 `span` 元素的内容区域，而不会自动扩展到整个行)
- 使用自定义属性`@property`加动画渐变实现文本擦除效果

:::tip 注意点

1. 判断某个css属性是否可用（无法判断`@property`，因为是自定义属性，但可以判断其设置的`syntax`或者`inherits`属性）

```js
// 判断某个css属性是否可用
function isCssPropertySupported(property) {
  let div = document.createElement("div");
  let style = getComputedStyle(div);
  return property in style;
}
```

2. 使用`css`判断 `@property` 是否可用

``` css
@supports ( @property : --my-color ) {
  /* 如果支持 @property 规则，则执行这里的样式 */
}

```

3. 使用`js`判断 `@property` 是否可用

- `window.CSS.registerProperty`是一个用于注册自定义 CSS 属性的方法。
- 通过检测`window.CSS.registerProperty`是否存在，可以判断浏览器是否支持@property规则。

```js

if (typeof window.CSS.registerProperty !== "undefined") {
  console.log("浏览器支持 @property 规则");
} else {
  console.log("浏览器不支持 @property 规则");
}
```

:::

### 4.2 使用js实现

<MultilineTextErasingEffect :isCss ="false" />
