## element plus 组件

<script setup>
  import FuzzySearchData from './components/fuzzySearchData.vue'
  const data = [
  {name:'item1',job_id:1,child:[{name:'item1-1',job_id:12,},{name:'item1-2',job_id:13,}]},
  {name:'item2',job_id:2,child:[{name:'item2-1',job_id:22,},{name:'item2-2',job_id:23,}]},
  {name:'item3',job_id:3,child:[{name:'item3-1',job_id:32,},{name:'item3-2',job_id:33,}]},
  ]
</script>

## 1. 导入 excel 文件并上传组件

:::tip
其中 `excelToJson`,`changeCnToEnFn` 方法来自于 **工具函数/文件相关** `/pages/toolFun/download`
:::

::: details 源码

```vue
<template>
  <el-upload
    ref="uploadPayrollFileRef"
    class="upload-file"
    accept=".xls,.xlsx"
    action="#"
    :limit="1"
    :on-exceed="handleExceed"
    :on-change="handleChange"
    :auto-upload="false"
    :before-upload="beforeUpload"
    :show-file-list="showFileList"
  >
    <template #trigger>
      <el-button type="primary">{{ text }}</el-button>
    </template>
  </el-upload>
</template>

<script setup name="ImportExcel">
// 导入excel
import { ref, reactive } from "vue";
import { changeCnToEnFn, excelToJson } from "@/utils/readFile.js";
import { genFileId } from "element-plus";

const props = defineProps({
  text: {
    type: String,
    default: "导入",
  },
  // 是否展示列表信息
  showFileList: {
    type: Boolean,
    default: false,
  },
  // 中英文对应的map信息
  cnMapEn: {
    type: Object,
    default: () => {},
  },
  // 是否需要前端处理
  isNeedFont: {
    type: Boolean,
    default: true,
  },
});

// ref
const uploadPayrollFileRef = ref(null);

// emits
const emits = defineEmits(["getExcelData", "getExcelFile"]);

// excel文件信息
const excelData = reactive({
  name: "", // 文件名称
  data: [], // 转换后的文件数据
});

// 文件改变时
const handleChange = async (file) => {
  if (!props.isNeedFont) {
    // 后端处理，直接将导入的文件对象传出去
    emits("getExcelFile", file);
    return;
  }
  excelData.name = file.name;
  let excelFile = file.raw;
  if (!excelFile) return;
  // 中文表头数据
  let headerCnData = await excelToJson(excelFile);
  // 将表头中对应的中文转换为英文字段
  excelData.data = changeCnToEnFn(headerCnData, props.cnMapEn);
  // 前端自己处理的，返回处理过后的数据
  emits("getExcelData", excelData);
};

// 文件导入超出限制 选中时自动替换上一个文件。
const handleExceed = (files, fileList) => {
  // 清空上传文件列表
  uploadPayrollFileRef.value.clearFiles();
  const file = files[0];
  // 给一个唯一的uid
  file.uid = genFileId();
  // 手动选择重复上传的文件
  uploadPayrollFileRef.value.handleStart(file);
};

// 上传前的验证
const beforeUpload = (file, filelist) => {};
</script>

<style lang="scss" scoped>
.upload-file {
  display: inline-block;
}
</style>
```

:::

## 2. 前端自己实现模糊搜索组件

<FuzzySearchData :data='data'/>

:::details 使用

**如果需要搜索后清除选中的值，需要手动调用组件实例的`clearSelected`方法**

1. `data`格式 :[{name:'item1',job_id:1,child:[{name:'item1-1',job_id:12,},{name:'item1-2',job_id:13,}]}]
2. `defaultValue`: 默认值(只需要传显示的名字 )
3. `@selectedJob`: 是 emits 选中值的事件
4. `disabled`: 是否禁止

```vue
<template>
  <FuzzySearchData
    :disabled="dialogStatus"
    :data="jobs"
    :defaultValue="defaultValue"
    @selectedJob="selectedJob"
    ref="searchBoxRef"
  />
</template>
```

:::

## 3. 图片上传组件

组件位置：`pages/vue3-element-admin/components/imgUpload.vue`