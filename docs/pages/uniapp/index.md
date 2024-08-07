# uniapp —— 组件相关

<https://ext.dcloud.net.cn/plugin?id=7594#c8>

<script setup>
 import HighlightText from './components/HighlightText/index.vue'
  import EllipsisText from './components/EllipsisText/index.vue'
</script>

## 1. 滑块组件（单/双滑块）

### 1.1  组件地址： `./components/SliderRange/index.vue`

### 1.2  组件使用

```vue
<template>
 <SliderRange @change="handleRangeChange" :currentValue="sliderRangeValue" />
</template>
 <script setup>
 const sliderRangeValue = ref([0, 1200]); // 滑块当前区间的值
 const handleRangeChange = (e) => {}; // 获取选中的值
</script>
```

## 2. 顶部导航栏组件

### 2.1  组件地址： `./components/CustomNavigation/index.vue`

### 2.2  组件使用方法

```vue
<template>
 <CustomNavigation v-bind="basePageOptions" @getHeight="getHeight" />
  <view :style="{ paddingTop: pt + 'rpx' }"> </view>
</template>
<script setup>
import {ref} from 'vue';
const pt = ref(0); // 自定义导航栏上方安全距离
const getHeight = (e) => {pt.value = e};
</script>
```

## 3. 搜索时高亮`搜索关键字`组件

 <HighlightText text="这是测试搜索关键字的文本" keyword="搜索关键字" />

### 3.1  组件地址：`./components/HighlightText/index.vue`

### 3.2  组件使用方法

```vue
<template>
 <HighlightText text="这是测试搜索关键字的文本" keyword="搜索关键字" />
</template>
```

## 4. 省略文本（展开和收起）

### 4.1  组件地址：`./components/EllipsisText/index.vue`

### 4.2  组件使用方法

```vue
<template>
 <EllipsisText content="这是测试省略文本的文本" lines="2" prefixText="前缀文本" />
</template>
```

## 5. 上传图片

### 5.1  组件地址：`./components/ImgUpload/index.vue`

### 5.2  组件使用方法

:::details  组件使用方法

```vue
<template>
    <ImgUpload :list="imgList" :count="5" @uploadSuccess="uploadSuccessHandler"
     @deleteImage="deleteImageHandler" />
</template>
<script setup>
const imgList = ref([]);
const uploadSuccessHandler = (imgs) => {
    const result = imgs.map((item) => item.url);
    imgList.value = [...imgList.value, ...result];
};
const deleteImageHandler = (i) => {
    imgList.value.splice(i, 1);
};
</script>
```

:::

## 6. 类似于PC的TREE组件（无限层级选择）

### 6.1  组件地址：`./components/ljs-treeChoose/ljs-treeChoose.vue`

### 6.2  组件使用demo: `./components/ljs-treeChoose/demo.vue`

## 7. 日历组件

### 7.1  组件地址：`./components/Calendar/index.vue`

### 7.2  组件使用demo

```vue
<template>
<Calendar :calendarWidth="650" @getCurrentDay="getCurrentDay" :deadLine="currentDay" />
</template>
```

### 7.3  组件复杂的应用使用demo:  `./components/Calendar/CustomCalendar.vue`

主要是使用传出的 `width` 再加上日历组件本来的样式，在外面重新画一遍日历组件形式，为了不再传入组件里面遍历多次而这样使用（应该有更好的办法，还没想到）

![效果](./imgs//calendar.png)
