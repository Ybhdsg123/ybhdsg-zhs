# uniapp 常用封装组件（vue2）

## 1. 上传图片组件

**_组件内容_**

```vue

<template>
	<view class="upload-img">
		<view @click="uploadImg" class="img-item">
			<view v-if="imgList.length>0">
				<!-- 必须使用 image 标签，使用原生img标签在真机模拟下不展示图片 -->
				<image @longpress="longpressBtn" :style="{width: width+'rpx',height: height+'rpx'}"
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
						// console.log(JSON.stringify(res.tempFilePaths), '----');
						// console.log(res.tempFiles)
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
						// 上传图片到oss
						let imgList = []
						for (let item of res.tempFilePaths) {
							const imgUrl = await UploadImgApi(item)
							imgList.push(imgUrl.data)
						}
						// console.log(imgList)
						that.$emit('getImgPath', res.tempFilePaths, imgList)
						// 预览图片
						// uni.previewImage({
						// 	urls: res.tempFilePaths,
						// 	longPressActions: {
						// 		itemList: ['发送给朋友', '保存图片', '收藏'],
						// 		success: function(data) {
						// 			console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data
						// 				.index + 1) + '张图片');
						// 		},
						// 		fail: function(err) {
						// 			console.log(err.errMsg);
						// 		}
						// 	}
						// });
					},
					fail: (err) => {
						console.log(err, 'err')
					}
				});
			},
			// 长按删除
			longpressBtn() {
				this.isLongpress && this.$emit('getImgPath', [], [])
			}
		},
	};
</script>

<style lang="scss" scoped>
	.upload-img {
		display: flex;
		// width: 100%;
	}
	.img-item {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		// justify-content: center;
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
			// line-height: 78rpx;
			// height: 100%;
			font-size: 78rpx;
			color: #818181;
		}
	}
</style>

```

**_请求_**

```js
// 上传图片到阿里云
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
```
