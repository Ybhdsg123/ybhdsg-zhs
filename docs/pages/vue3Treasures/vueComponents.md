# 截取字符组件

<script setup>
import AutoEllipsis from './components/autoEllipsis.vue'
import Loading from './components/loading.vue'
import ImgWatermark from './components/imgWatermark.vue'
</script>

## 3. 图片水印

<ImgWatermark text="侵权必究">
<!-- style="width:600px;height:300px" -->
<div >
  单行带后缀省略单行带后缀省略单行带后缀省略单行带后缀省略单行带后缀省略,
  单行带后缀省略单行带后缀省略单行带后缀省略单行带后缀省略单行带后缀省略
  单行带后缀省略单行带后缀省略单行带后缀省略单行带后缀省略单行带后缀省略
</div>
</ImgWatermark>

## 1. 自动省略文本

<div style="width:80px" >
<AutoEllipsis  text="1. 单行展示默认省略"/>
</div>
<AutoEllipsis style="width:100px" isShowSuffix text="2. 单行带后缀省略.jpeg"/>
<AutoEllipsis style="width:80px"  :showLine="2" text="3. 多行展示默认省略展示默认省略.jpeg"/>
<AutoEllipsis style="width:90px" isShowSuffix :showLine="2" text="4. 多行展示带后缀省略多行展示带后缀省略.jpg"/>

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

<Loading />
<Loading :size="30"/>

:::details 使用

1. size: 内置 4 个尺寸（ mini，small,medium,large,**默认为 mini**， `<Loading />`

2. 自定义尺寸的话输入数字 `<Loading :size="30"/>`

:::

> 代码地址：pages/vue3Treasures/components/loading.vue

<!-- ## 3. 图片水印

<ImgWatermark/> -->
