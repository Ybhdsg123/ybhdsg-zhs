# vue 常见技巧

## 1. css 属性选择器示例

> 页面上 “属性选择器”这几个字显示红色

:::details

```js
// 页面上 “属性选择器”这几个字显示红色
 <div data-v-hash class="test-attr">属性选择器</div>
  <style>
    /* 该标签有个data-v-hash的属性，只不过该属性为空，依然可以使用属性选择器 */
   .test-attr[data-v-hash] {
    color: red;
  }
  </style>
  <script>
     // 通过js判断是否存在 data-v-hash 属性
     console.log(document.querySelector('.test-attr').getAttribute('data-v-hash') === ''); // true
  </script>
```

:::

## 2. [CSS 中的 v-bind()](https://cn.vuejs.org/api/sfc-css-features.html#v-bind-in-css)

:::details

```vue
<script setup>
import { ref } from "vue";
const theme = ref("red");
const colors = ["blue", "yellow", "red", "green"];
setInterval(() => {
  theme.value = colors[Math.floor(Math.random() * 4)];
}, 1000);
</script>
<template>
  <p>hello</p>
</template>
<style scoped>
/* Modify the code to bind the dynamic color */
p {
  color: v-bind("theme");
}
</style>
```

:::

## 3. 动态路由树结构数据，遍历得到想要的结果

**第一种：改变 hidden，并且将不需要的转换为 404，防止地址栏找到（不推荐）**
这样，所有的路由信息都会在里面，只不过没有权限的路由 path 变为 '/404'
:::details

```js
/**
 * @description: 根据设置的权限路由标识来筛选出权限角色的路由
 * @param {Array} routers :所有的路由信息数组
 * @param {Arrray} permissionRoutingMarking :路由权限标识 需要添加 '/layout'
 * @return 改变hidden或者修改path达到效果
 * @Author: zhs
 */
export const recursionRouter = (routers, permissionRoutingMarking = []) => {
  if (routers.children && routers.children.length <= 0) return;
  if (permissionRoutingMarking.length <= 0) return routers;
  const resultRouter = routers.map((obj, index) => {
    // 在 权限路由标识 数组中找不到的话就将其隐藏
    if (!permissionRoutingMarking.includes(obj.path)) {
      obj.meta.hidden = false;
      // 通过地址栏找不到该页面，不需要注释掉就行
      if (obj.path !== "/layout") obj.path = "/404";
    } else {
      obj.meta.hidden = true;
    }
    // 有 chilren 就会递归遍历里面的数据
    obj.children && recursionRouter(obj.children, permissionRoutingMarking);
    return obj;
  });
  return resultRouter;
};
```

:::

**第二种：直接过滤出符合角色权限的路由数据（推荐）**
:::details

```js
/**
 * @description: 返回角色权限路由
 * @param {*} routers :所有的路由信息数组
 * @param {*} permissionRoutingMarking :路由权限标识 需要添加 '/layout'
 * @return 只返回该角色有的路由信息
 * @Author: zhs
 */
export const getRoleRouters = (routers, permissionRoutingMarking = []) => {
  if (routers.children && routers.children.length <= 0) return;
  if (permissionRoutingMarking.length <= 0) return routers;

  return routers.filter((obj) => {
    // 将由children的数据递归处理，找到有该权限的数据，并重新赋值给 obj.children
    if (obj.children) {
      obj.children = getRoleRouters(obj.children, permissionRoutingMarking);
    }
    // 筛选出该权限路由（这里是在权限标识中找到当前的 obj.path）
    if (permissionRoutingMarking.includes(obj.path)) {
      // 防止本地路由设置为false后，侧边栏不现实，将 hidden 设置为true
      obj.meta.hidden = true;
      return true;
    }
  });
};
```

:::

## 4. vue 禁止复制

:::details

```vue
<script setup>
import { onMounted } from "vue";
onMounted(() => {
  // 禁用复制
  document.onselectstart = new Function("event.returnValue=false");
});
</script>
```

:::

## 5. 获取 app 文件的包名

[github 插件地址](https://github.com/chenquincy/app-info-parser)
