<template>
  <div class="img-upload">
    <!-- 提示信息 -->
    <span v-if="isShowInfo" class="info no-important-fs MB20">
      文件大小
      <span class="color-red"> 不能超过{{ maxSize }}M</span> ，文件格式为{{
        type.join("，")
      }}
      <slot name="img-info" />
    </span>
    <!-- 上传组件 -->
    <el-upload
      v-bind="surplusProps"
      class="upload-file"
      :action="uploadUrl"
      :file-list="ossList"
      :list-type="listType"
      :limit="limits"
      :data="upLoadData"
      :before-upload="beforeUploadHandler"
      :on-success="successHandler"
      :on-preview="previewImgHandler"
      :on-error="errorImgHandler"
      :on-remove="removeImgHandler"
      :on-exceed="exceedImgHandler"
      name="image"
    >
      <!-- 上传框 -->
      <slot v-if="listType !== 'text'" name="icon">
        <div class="icon">
          <el-image fit="cover" :style="iconStyle" :src="iconName" />
          {{ iconText }}
        </div>
      </slot>
      <template v-if="listType === 'text'" #trigger>
        <el-button type="primary">上传文件</el-button>
      </template>
    </el-upload>
    <!-- 图片展示的弹层 -->
    <el-dialog v-model="showImgDialog">
      <el-image :src="dialogImageUrl" fit="cover" />
    </el-dialog>
  </div>
</template>

<script setup name="ImgUpload">
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";

// 控制显示弹层
const showImgDialog = ref(false);
// 弹层展示的 预览图片
let dialogImageUrl = ref();
// 上传的url
const uploadUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "http://ax-dev.lhygb.com/api/admin/common/upload"
    : "/api/admin/common/upload";

// props
const props = defineProps({
  // 默认展示的值 [{url:地址}]
  fileList: {
    type: Array,
    default: () => [],
  },
  // 上传类型
  type: {
    type: Array,
    default: () => [
      "image/jpeg",
      "image/jpg",
      "image/png",
      // 'image/gif',
      // 'image/bmp'
    ],
  },
  // 上传大小 单位 M
  maxSize: {
    type: Number,
    default: 5,
  },
  // 最大上传数量
  limits: {
    type: Number,
    default: 1,
  },
  // 文件列表的类型
  listType: {
    type: String,
    default: "picture-card",
  },
  // 上传时附带的额外参数
  upLoadData: {
    type: Object,
    default: function () {
      return { category: "anxin_pc_image" };
    },
  },
  // el-upload的剩余参数
  surplusProps: {
    tyep: Object,
    default: () => {},
  },

  // 是否展示提示信息
  isShowInfo: { type: Boolean, default: true },
  // 上传框大小
  uploadSize: {
    type: Object,
    default: () => ({
      width: "113px",
      height: "113px",
    }),
  },
  // icon展示的内容
  iconName: String | Object,
  // icon提示文本
  iconText: {
    type: String,
    default: "图片上传",
  },
  // icon展示图片大小
  iconStyle: {
    type: Object,
    default: {
      width: "34px",
      height: "34px",
    },
  },
});

// emits
const emits = defineEmits(["ossImgUrl"]);

// 超过限制数量不展示上传框
const exceedLimts = computed(() => {
  return ossList.value.length >= props.limits ? "none" : "flex";
});
// oss文件列表
let ossList = ref(props.fileList);

// 限制上传类型
const type = props.type.map((item) => {
  return item.split("/")[1];
});

// 上传前的验证
const beforeUploadHandler = (file) => {
  if (!props.type.includes(file.type)) {
    return ElMessage.error(`请上传类型为${props.type}的文件`);
  }
  if (file.size / 1024 / 1024 > props.maxSize) {
    return ElMessage.error(`上传文件最大为${props.maxSize}M`);
  }
};
// 图片上传失败
const errorImgHandler = (err, file, fileList) => {
  // ElMessage.error('上传失败，err请稍后重试！')
  return false;
};
// 图片上传成功
const successHandler = (file, fileList) => {
  if (file.code === 200 && file.data !== "") {
    ossList.value.push({ url: file.data });
    emits("ossImgUrl", ossList.value);
  } else {
    // let msg = file.message || '上传失败，请稍后重试！'
    ossList.value = [...ossList.value]; // 上传失败 错误图片不能展示
    // console.log(ossList.value)
  }
};

// 文件移除
const removeImgHandler = (file, filelist) => {
  // console.log(filelist);
  ossList.value = filelist;
};

// 文件超出限制
const exceedImgHandler = (file, filelist) => {
  ElMessage.error(`上传最大数量为${props.limits}`);
};

// 展示图片
const previewImgHandler = (file) => {
  showImgDialog.value = true;
  dialogImageUrl.value = file.url;
};
</script>

<style lang="scss" scoped>
.img-upload {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.info {
  line-height: 13px;
}
// 上传框大小
:deep(.el-upload--picture-card) {
  width: v-bind("props.uploadSize.width");
  height: v-bind("props.uploadSize.height");
  // 超过限制隐藏上传框
  display: v-bind("exceedLimts");
}
.icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  color: #999999;
}
</style>
