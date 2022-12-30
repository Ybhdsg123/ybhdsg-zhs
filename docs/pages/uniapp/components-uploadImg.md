# uniapp 常用封装组件----上传图片组件（vue2）

## 1. 组件内容

```vue

<template>
	<view class="upload-img">
		<view class="img-item" @click="uploadImg">
			<view v-if="imgList.length>0">
				<!-- 必须使用 image 标签，使用原生img标签在真机模拟下不展示图片 -->
				<image @longpress="longpressBtn(item)"
					:style="{width: width+'rpx',height: height+'rpx',marginRight:'12rpx',border:'2rpx solid #ccc'}"
					v-for="(item,index) in imgList" :key="item" :mode="modeType" :src="item" alt="照片">
			</view>
			<view class="imgAdd">
				<slot v-if="imgList.length<count">
					<view :style="{width: width+'rpx',height: height+'rpx'}" class="imgIcon">
						<text class="iconfont icon-jia add" />
						<text>{{label}}</text>
					</view>
				</slot>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		UploadImgApi
	} from '@/api/global.js'
	export default {
		props: {
			// 手机上相册一次能选择几张
			count: {
				type: Number,
				default: 1
			},
			sizeType: {
				type: Array,
				default: () => ['original', 'compressed']
			},
			sourceType: {
				type: Array,
				default: () => ['album', 'camera']
			},
			// 上传大小
			maxSize: {
				type: Number,
				// 2 * 1024 * 1024 2M 5242880 5M
				default: 5242880
			},
			// 图片列表
			imgList: {
				type: Array,
				default: () => []
			},
			// 图片和上传按钮的大小
			width: {
				type: Number,
				default: 179
			},
			// 图片和上传按钮的大小
			height: {
				type: Number,
				default: 179
			},
			// 是否长按删除,目前只有单张图片
			isLongpress: {
				type: Boolean,
				default: false
			},
			// 裁切图片
			crop: {
				type: Object,
				default: () => {}
			},
			// 图片展示形式
			modeType: {
				type: String,
				default: 'scaleToFill'
			},
			// 添加按钮下方文字
			label: {
				type: String,
				default: ''
			},
			// 是否是新的 改过的，默认旧的，主要为了长按删除图片
			isNew: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			// 上传图片
			uploadImg() {
				let that = this
				uni.chooseImage({
					count: that.count, //默认9
					sizeType: that.sizeType, //可以指定是原图还是压缩图，默认二者都有
					sourceType: that.sourceType, // album 从相册选图，camera 使用相机，默认二者都有
					crop: that.crop,
					// 成功则返回图片的本地文件路径列表
					success: async function(res) {
						// 限制上传大小
						res.tempFiles.forEach(item => {
							if (item.size >= that.maxSize) {
								return uni.showToast({
									title: `最大上传大小为${that.maxSize}M`,
									icon: "none",
									duration: 2000
								});
							}
						})
						// 新的直接传本地图片出去，外面自己上传到阿里云，方法在tool.js，旧的传本地图片和oss图片
						if (that.isNew) {
							that.$emit('getImgPath', res.tempFilePaths)
						} else {
							// 上传图片到oss
							let imgList = []
							for (let item of res.tempFilePaths) {
								const imgUrl = await UploadImgApi(item)
								imgList.push(imgUrl.data)
							}
							that.$emit('getImgPath', res.tempFilePaths, imgList)
						}
					},
					fail: (err) => {
						console.log(err, 'err')
					}
				});
			},

			// 长按删除
			longpressBtn(imgUrl) {
				if (this.isNew) {
					this.isLongpress && uni.showModal({
						title: '温馨提示',
						content: '确认删除这张图片嘛',
						success: res => {
							if (res.confirm) {
								let index = this.imgList.findIndex(item => item == imgUrl)
								if (index > -1) {
									this.imgList.splice(index, 1)
								}
							}
						}
					})
				} else {
					this.isLongpress && this.$emit('getImgPath', [], [])
				}

			},
			// 预览图片
			// previewImageHandler(imgUrl) {
			// 	uni.previewImage({
			// 		urls: imgUrl,
			// 		longPressActions: {
			// 			itemList: ['发送给朋友', '保存图片', '收藏'],
			// 			success: function(data) {
			// 				console.log(data)
			// 				console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data
			// 					.index + 1) + '张图片');
			// 			},
			// 			fail: function(err) {
			// 				console.log(err.errMsg);
			// 			}
			// 		}
			// 	});
			// },
		},
	};
</script>

<style lang="scss" scoped>
	.upload-img {
		display: flex;
	}

	.img-item {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		height: 100%;
		border-radius: 10rpx;

		img {
			margin: 13rpx;
		}
	}

	.imgAdd {
		margin: 13rpx;
	}

	.imgIcon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #F6F6F6;
		border-radius: 10rpx;
		color: #818181;

		.add {
			font-size: 78rpx;
			color: #818181;
		}
	}
</style>

```

## 2. 请求

```js
// 上传图片到阿里云 api/global.js
export const UploadImgApi = (file) => {
  // 返回一个新的promise对象
  return new Promise((resolve, reject) => {
    //上传图片
    uni.uploadFile({
      url: `${baseApi}/common/upload`, //请求接口, baseApi 自己引入
      filePath: file,
      name: "image", // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
      formData: {
        category: "shop_image", // 这个是公司要上传的阿里云必传 参数
      },
      success(uploadFileRes) {
        // console.log(uploadFileRes.data, '------’');
        let url = JSON.parse(uploadFileRes.data);
        // 成功 resolve
        resolve(url);
      },
    });
  });
};

// utils/tools.js
import { UploadImgApi } from "@/api/global.js";
// 上传图片到阿里云oss
export const uploadImgToOss = async (imgList) => {
  let imgs = [];
  for (let item of imgList) {
    const imgUrl = await UploadImgApi(item);
    imgs.push(imgUrl.data);
  }
  return imgs;
};
```

## 3. 使用了 `isNew` 新的，只会返回本地图片

```vue
<template>
  <uploadImg
    isLongpress
    isNew
    :width="180"
    :height="180"
    :count="9"
    @getImgPath="getIndustryLicensePath"
    :imgList="industryLicense"
  />
</template>
<script>
import {
		uploadImgToOss
	} from '@/utils/tool'
data(){
	return{
		industryLicense: [],
	}
},
methods:{
	// 获取时使用了 isNew 的只会返回本地图片
	getIndustryLicensePath(localImg) {
		this.industryLicense = [...this.industryLicense, ...localImg]
	},
	// 在真正请求时在上传到oss上
	upload(){
		this.registerForm.related_license = JSON.stringify(await uploadImgToOss(this.industryLicense))
	}
</script>
```

## 4. 未使用 `isNew` 返回本地图片和 oss 图片

```vue
<template>
  <uploadImg
    :width="180"
    :height="180"
    @getImgPath="getBusinessLicensePath"
    :imgList="businessLicense"
  />
</template>
<script>
import {
		uploadImgToOss
	} from '@/utils/tool'
data(){
	return{
		businessLicense: [],
	}
},
methods:{
	// 获取时未使用 isNew 的返回本地图片和oss图片
	getBusinessLicensePath(localImg, netWorkImg) {
		// 本地图片数组
		this.businessLicense = localImg
		// oss图片数组
		this.registerForm.business_license = netWorkImg[0]
	},
</script>
```
