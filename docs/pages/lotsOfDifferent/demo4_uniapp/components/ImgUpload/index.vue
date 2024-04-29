<template>
  <view class="form-upload-wrap">
    <template v-if="list?.length">
      <view class="form-upload" v-for="(item, index) in list" :key="index" @click="handlePreviewImage(index)">
        <text class="icon-close iconfont icon-guanbi2fill" @click.stop="handleClose(index)"></text>
        <image class="form-upload-image" :src="baseImgApi + item" mode="aspectFill"></image>
      </view>
    </template>
    <view v-if="list?.length < count" @click="handleUpload">
      <slot name="uploadImgIcon">
        <view class="form-upload form-upload-camera">
          <image class="upload-icon" src="/static/images/global/upload-img.png" mode="scaleToFill" />
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup>
import { baseImgApi } from '@/config'
import { uploadImageApi } from "@/api/modules/upload.js";
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  list: Array,
  count: {
    type: Number,
    default: 1,
  },
  sizeType: {
    type: Array,
    default: () => ["original", "compressed"],
  },
  sourceType: {
    type: Array,
    default: () => ["album", "camera"],
  },
});

const emits = defineEmits(["uploadSuccess", "deleteImage"]);

// 上传图片
const handleUpload = () => {
  let newCount = props.count;
  console.log(props.list);
  if (props.list.length) {
    newCount = props.count - props.list.length;
  }
  if (newCount === 0) {
    uni.showToast({
      title: `最多只能上传${props.count}张`,
      icon: "none",
    });
    return false;
  }
  uni.chooseImage({
    count: newCount,
    sizeType: props.sizeType, //可以指定是原图还是压缩图，默认二者都有
    sourceType: props.sourceType, //从相册选择
    success: async (res) => {
      try {
        const resultArr = [];
        res.tempFilePaths.forEach(async (item, index) => {
          console.log(item, "--uni.chooseImage--");
          const result = await uploadImageApi(item);
          resultArr.push(result.data);
          if (index === res.tempFilePaths.length - 1) {
            emits("uploadSuccess", resultArr);
          }
        });
      } catch (e) { }
    },
  });
};

// 删除
const handleClose = (index) => {
  emits("deleteImage", index);
};

// 预览
const handlePreviewImage = (index = 0) => {
  const previewImages = props.list.map(item => baseImgApi + item)
  uni.previewImage({
    urls: previewImages,
    current: index,
  });
};
</script>

<style lang="scss" scoped>
.form-upload-wrap {
  // display: flex;
  // flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10rpx;
  margin-top: 20rpx;
}

.form-upload {
  width: 150rpx;
  height: 150rpx;
  position: relative;

  .icon-close {
    position: absolute;
    top: -20rpx;
    right: -20rpx;
    font-size: 40rpx;
    color: #202640;
  }

  .form-upload-image {
    width: 100%;
    height: 100%;
  }
}

.form-upload-camera {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150rpx;
  height: 150rpx;
  background: #F7F7F7;
  border-radius: 16rpx;

  .upload-icon {
    width: 66rpx;
    height: 66rpx;
  }
}
</style>
