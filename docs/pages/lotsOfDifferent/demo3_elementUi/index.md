# 系列 3 —— element-ui 相关

## 1. 修改菜单栏颜色

### 1.1 高亮选中的菜单栏背景色

```css
.el-menu-item.is-active {
  background-color: #199b46 !important;
}
```

### 1.2 高亮选中子菜单时父菜单的背景色

```css
::v-deep.el-submenu.is-active > .el-submenu__title {
  color: #fff !important;
  background-color: #199b46 !important;
}
/* icon图标也跟着变 */
::v-deep .el-submenu.is-active > .el-submenu__title i {
  color: #fff !important;
}
```

## 2. 自定义主题色、修改input，select，cascader等组件的样式(element-ui,vue2)

> 文件路径：`./components/element-variables.scss`

## 3. 修改el-table的表头背景色，使用rgba颜色时样式表示不一致（vue2）

``` css
 /* 如下正常设置表头样式，展示颜色不是设置的背景色 */
 :header-cell-style="{
      textAlign: 'center',
      backgroundColor: 'rgba(25, 155, 70, 0.05)',
      fontWeight: 700,
    }"
  /* 进行下面设置后，颜色展示一致 */
  /* 但是，固定的表格栏还是会有问题，颜色更深*/
  ::v-deep .has-gutter {
  background-color: rgba(25, 155, 70, 0.05) !important;
}
```

## 4. `el-table`列动态隐藏显示时错位问题

```html
<!-- 使用key属性，每次重新渲染组件时，都会重新渲染table组件，从而解决错位问题 -->
<el-table :key="Math.random()" :data="tableData" ></el-table>
```

## 5. `el-form`弹窗中表单的初始化

```js
// vue2
Object.assign(this.formData, this.$options.data().formData);
```

:::tip

1. vue2：`this.$options.data()`，拿到 data 中定义的初始数据

:::

## 6. [Element UI 中国省市区级联数据](https://www.npmjs.com/package/element-china-area-data)

## 7. `el-date-picker` 时间选择器，设置快捷选项和禁止选择的时间

:::tip 注意：

时间要设置为当天结束，因为组件默认的是当前时间，这样会显示当天时间，但不能选择，因为当前时间已经结束，所以要设置当日23：59：59：59

```js
const endDate = new Date();
endDate.setHours(23, 59, 59, 59); // 结束时间：当日23：59：59：59
// 交易时间的快捷选项 禁止选中以后时间
export const disabledAfterNowPickerOptions = {
  disabledDate(time) {
    return time.getTime() > endDate;
  },
};
```

:::
