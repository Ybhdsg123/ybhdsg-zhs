<template>
	<view style="background: #f8f8f8">
		<canvas
			v-if="!tempFilePath"
			:canvas-id="CanvasID"
			:style="{
				position: absolute,
				left: '999px',
				opcity: 0,
				width: canvasW + 'px',
				height: canvasH + 'px'
			}"
		></canvas>
		<image v-else lazy-load :src="tempFilePath" mode="widthFix" class="is-response" @longpress="toSave(tempFilePath)"></image>
	</view>
</template>

<script>
var _this;
export default {
	name: 'Poster',
	props: {
		CanvasID: {
			//CanvasID 等同于 canvas-id
			Type: String,
			default: 'PosterCanvas'
		},
		imgSrc: {
			//展示图
			Type: String,
			default: ''
		},
		//二维码
		QrSrc: {
			Type: String,
			default: ''
		},
		// 头像
		avatarSrc: {
			Type: String,
			default: ''
		},
		PasterTitle: {
			//文本内容
			Type: String,
			default: ''
		},
		TitleColor: {
			//标题颜色
			Type: String,
			default: '#333333'
		},
		hotelTitleColor: {
			//酒店标题颜色
			Type: String,
			default: '#666666'
		},
		LineType: {
			//标题显示行数 大于两行是否省略	（注超出2行显示会导致画布布局絮乱）
			Type: [String, Boolean],
			default: true
		},
		PriceTxt: {
			//价格值
			Type: String,
			default: ''
		},
		PriceColor: {
			//价格颜色
			Type: String,
			default: '#87410E'
		},
		OriginalTxt: {
			//原价值
			Type: String,
			default: ''
		},
		OriginalColor: {
			//默认颜色（如原价与扫描二维码颜色）
			Type: String,
			default: '#666'
		},
		//画布宽度  (高度根据图片比例计算 单位upx)
		Width: {
			Type: String,
			default: 750
		},
		//canvas画布背景色
		CanvasBg: {
			Type: String,
			//   default: "#F8F8F8",
			default: '#F8F8F8'
		},
		//推荐人信息
		Referrer: {
			Type: String,
			default: ''
		},
		//描述提示文字 二级
		ViewDetails: {
			Type: String,
			default: ''
		},
		//描述提示文字 三级
		ViewDetailsInfo: {
			Type: String,
			default: ''
		},
		// 价格偏移距离 例如 0=> 左侧 200=>右侧
		priceOffsetDistance: {
			Type: [Number, String],
			default: 200
		},
		// 标签数组文本
		labels: {
			Type: Array,
			default: () => []
		},
		// 标签之间的间距
		labelSpacing: {
			Type: [Number, String],
			default: 0
		}
	},
	data() {
		return {
			loading: false,
			tempFilePath: '',
			canvasW: 0,
			canvasH: 0,
			canvasImgSrc: '',
			ctx: null
		};
	},
	mounted() {
		_this = this;
		this.OnCanvas();
	},
	methods: {
		toSave(url) {
			console.log('长按开始');
			//#ifndef H5
			uni.getImageInfo({
				src: url,
				success: function (image) {
					console.log('图片信息：', JSON.stringify(image));
					uni.saveImageToPhotosAlbum({
						filePath: image.path,
						success: function () {
							console.log('save success');
							uni.showToast({
								title: '海报已保存相册',
								icon: 'success',
								duration: 2000
							});
						}
					});
				}
			});
			//#endif
		},

		// 绘制圆角矩形边框
		// roundRect(ctx, 10, 10, 150, 100, 15, true, true);
		// ctx: Canvas的2D上下文。x, y: 矩形左上角的坐标。width, height: 矩形的宽度和高度。radius: 圆角的半径。fill: 是否填充矩形。stroke: 是否绘制矩形的边框。
		roundRect(ctx, x, y, width, height, radius, fill, stroke) {
			if (!radius) {
				radius = 5;
			}
			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			ctx.lineTo(x + width, y + height - radius);
			ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			ctx.lineTo(x + radius, y + height);
			ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
			ctx.lineTo(x, y + radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			ctx.closePath();
			if (fill) {
				ctx.fill();
			}
			if (stroke) {
				ctx.stroke();
			}
		},

		async OnCanvas() {
			this.loading = true;

			_this.ctx = uni.createCanvasContext(_this.CanvasID, this);

			const C_W = uni.upx2px(_this.Width), //canvas 宽度
				C_P = uni.upx2px(30), //canvas Paddng 间距
				C_Q = uni.upx2px(160), //二维码或太阳码宽高
				C_A = uni.upx2px(100); //头像宽高
			let _strlineW = 0; //文本宽度
			let _imgInfo = await _this.getImageInfo({
				imgSrc: _this.imgSrc
			}); //广告图
			//   console.log("图片信息：", JSON.stringify(""));

			let _QrCode = await _this.getImageInfo({
				imgSrc: _this.QrSrc
			}); //二维码或太阳码
			//   console.log("二维码信息：", JSON.stringify(_QrCode));

			let _avatarInfo = await _this.getImageInfo({
				imgSrc: _this.avatarSrc
			}); //头像
			//   console.log("头像图片信息：", JSON.stringify(_avatarInfo));

			let r = [_imgInfo.width, _imgInfo.height]; // 图片宽高
			let q = [_QrCode.width, _QrCode.height]; // 二维码宽高
			let a = [_avatarInfo.width, _avatarInfo.height]; // 头像宽高
			let imgW = C_W - C_P * 2;
			if (r[0] != imgW) {
				r[1] = Math.floor((imgW / r[0]) * r[1]);
				r[0] = imgW;
			}
			if (q[0] != C_Q) {
				q[1] = Math.floor((C_Q / q[0]) * q[1]);
				q[0] = C_Q;
			}
			if (a[0] != C_A) {
				a[0] = C_A;
				a[1] = C_A;
			}

			_this.canvasW = C_W; // canvas 宽度
			_this.canvasH = r[1] + q[1] + 170; // canvas 高度
			_this.ctx.fillStyle = _this.CanvasBg; //canvas 背景颜色

			this.roundRect(_this.ctx, 0, 0, _this.canvasW, _this.canvasH, 12, true, false); //canvas画布大小

			//   _this.ctx.font = "PingFang SC, PingFang SC";
			// _this.ctx.fillRect(0, 0, C_W, _this.canvasH); //canvas画布大小

			//添加图片展示
			//   _this.ctx.drawImage(_imgInfo.path, C_P, C_P, r[0], r[1]);

			// 定义圆角半径
			const radius = 12; // 可根据需要调整

			// 开始绘制前保存画布状态
			_this.ctx.save();

			// 创建圆角路径
			const imgWidth = C_W - 24;
			const imgHeight = r[1];

			// 绘制圆角矩形路径
			_this.ctx.beginPath();
			_this.ctx.moveTo(12 + radius, 12);
			_this.ctx.arcTo(12, 12, 12, 12 + radius, radius); // 左上角圆弧
			_this.ctx.arcTo(12, 12 + imgHeight, 12 + imgWidth, 12 + imgHeight, radius); // 右上角圆弧
			_this.ctx.arcTo(12 + imgWidth, 12 + imgHeight, 12 + imgWidth, 12, radius); // 右下角圆弧
			_this.ctx.arcTo(12 + imgWidth, 12, 12, 12, radius); // 左下角圆弧
			_this.ctx.closePath();

			// 应用裁剪（后续绘制将限制在此路径内）
			_this.ctx.clip();

			// 在裁剪区域内绘制图片
			_this.ctx.drawImage(_imgInfo.path, 12, 12, imgWidth, imgHeight);

			// 恢复画布原始状态（避免影响后续绘制）
			_this.ctx.restore();
			// _this.ctx.drawImage(_imgInfo.path, 12, 12, C_W - 24, r[1]);
			//添加图片展示 end

			// 标签偏移上方距离，默认为 0 ，如果有标签则为 20，下方文本偏移距离要加上这个值
			let labelsOffsetTopWidth = 20;

			// 标题和标签 的白色背景
			// _this.ctx.fillStyle = "#fff"; // 设置为白色
			// // _this.ctx.fillRect(C_P, r[1] + labelsOffsetTopWidth, r[0], 100);
			// const h = _this.PasterTitle.length < 20 ? 100 : 120;
			// this.roundRect(
			//   _this.ctx,
			//   C_P,
			//   r[1] + labelsOffsetTopWidth,
			//   r[0],
			//   h,
			//   12,
			//   true,
			//   false
			// );
			// 标题和标签 的白色背景 end

			/* 绘制标签 */
			if (this.labels.length > 0) {
				labelsOffsetTopWidth = 20;
				_this.ctx.fillStyle = this.PriceColor;
				_this.ctx.strokeStyle = '#D5B792';
				_this.ctx.lineWidth = 1;

				for (let i = 0; i < this.labels.length; i++) {
					const text = this.labels[i];
					const textWidth = _this.ctx.measureText(text).width;
					const textHeight = 12;

					// 计算边框的x和y坐标，使边框水平方向均匀分布且留有一定间距
					const x = i * (textWidth + this.labelSpacing + 20) + C_P; // x 坐标
					const y = r[1] + C_P * 2 + offsetTopWidth; // 固定的y坐标
					// 绘制文本边框
					_this.ctx.strokeRect(x - 5, y - textHeight / 2 - 5, textWidth + 10, textHeight + 10);
					// 绘制文本，使其在边框中水平和垂直居中
					_this.ctx.fillText(
						text,
						x + textWidth / 2 - textWidth / 2, // 水平居中
						y + textHeight / 2 // 垂直居中
					);
				}
			}
			/* 标签end */

			//设置文本
			// _this.ctx.setFontSize(uni.upx2px(36)); //设置标题字体大小
			// 设置字体样式（加粗 + 自定义字体）
			const fontSize = uni.upx2px(36); // 转换单位
			_this.ctx.font = `bold ${fontSize}px Alimama ShuHeiTi, Alimama ShuHeiTi`; // 设置字体
			_this.ctx.setFillStyle(_this.TitleColor); //设置标题文本颜色
			let _strLastIndex = 0; //每次开始截取的字符串的索引
			let _strHeight = r[1] + C_P * 2 + labelsOffsetTopWidth; //绘制字体距离canvas顶部的初始高度
			let _num = 1;
			for (let i = 0; i < _this.PasterTitle.length; i++) {
				_strlineW += _this.ctx.measureText(_this.PasterTitle[i]).width;
				if (_strlineW > r[0]) {
					if (_num == 2 && _this.LineType) {
						//文字换行数量大于二进行省略号处理
						_this.ctx.fillText(_this.PasterTitle.substring(_strLastIndex, i - 5) + '...', C_P * 2, _strHeight);
						_strlineW = 0;
						_strLastIndex = i;
						_num++;
						break;
					} else {
						_this.ctx.fillText(_this.PasterTitle.substring(_strLastIndex, i - 2), C_P * 2, _strHeight);
						_strlineW = 0;
						_strHeight += 22;
						_strLastIndex = i - 2;
						_num++;
					}
				} else if (i == _this.PasterTitle.length - 1) {
					_this.ctx.fillText(_this.PasterTitle.substring(_strLastIndex, i + 1), C_P, _strHeight);
					_strlineW = 0;
				}
			}
			//设置文本 end

			//设置价格起始位置 + 偏移距离
			const addDistance = _this.PriceTxt < 1000 ? 10 : 0; // 增加的补偿偏移距离，价钱过长是需要调整位置，尽量靠右对齐
			_strlineW = C_P;
			const topHieght = _num == 1 ? 60 : 90;
			_strHeight += uni.upx2px(topHieght);
			//单行标题时占位符
			if (_num == 1) {
				_strHeight += 20;
			}

			//是否有销售价格
			if (_this.PriceTxt) {
				// 设置文本填充颜色为 _this.PriceColor 指定的颜色
				_this.ctx.setFillStyle(_this.PriceColor);

				// 设置“现价 ￥”文字的字体大小，将 upx 单位转换为 px 单位，这里假设大小为 30px
				_this.ctx.setFontSize(uni.upx2px(28));
				// 绘制“现价 ￥”文字 现价
				_this.ctx.fillText('￥', _strlineW, _strHeight);

				// 保存当前绘图上下文状态（包括字体大小等设置）
				_this.ctx.save();

				// 计算“现价 ￥”文字的宽度 现价
				const textWidth = _this.ctx.measureText('￥').width;

				// 设置价格部分的字体大小，将 upx 单位转换为 px 单位，这里假设大小为 38px
				_this.ctx.setFontSize(uni.upx2px(48));

				// 在“现价 ￥”文字的右侧绘制价格文本
				_this.ctx.fillText(_this.PriceTxt, _strlineW + textWidth, _strHeight);

				// 计算“_this.PriceTxt”文字的宽度
				const priceTxtWidth = _this.ctx.measureText(_this.PriceTxt).width + 4;

				// 绘制起
				_this.ctx.setFontSize(uni.upx2px(28));
				_this.ctx.fillText('起', _strlineW + textWidth + priceTxtWidth, _strHeight);

				// 恢复之前保存的绘图上下文状态
				_this.ctx.restore();

				// 获取刚刚绘制的整个文本（“现价 ￥” + 价格）的宽度，再加上 10px（转换后的 upx 单位），更新 _strlineW 的值
				_strlineW += _this.ctx.measureText(_this.PriceTxt).width + textWidth + uni.upx2px(30);
			}

			//判断是否有销售价格且原价不为空
			//判断是否有销售价格且原价不为空
			if (_this.PriceTxt && _this.OriginalTxt) {
				_this.ctx.setFillStyle(_this.OriginalColor);
				_this.ctx.setFontSize(uni.upx2px(24));
				_this.ctx.fillText('￥' + _this.OriginalTxt, _strlineW + 70, _strHeight); // 商品原价

				// 计算“￥”符号的宽度
				const symbolWidth = _this.ctx.measureText('￥').width;

				// 计算下划线的起点和终点
				const startX = _strlineW + 70;
				const endX = startX + symbolWidth + _this.ctx.measureText(_this.OriginalTxt).width;

				_this.ctx.strokeStyle = _this.OriginalColor;
				_this.ctx.beginPath();
				_this.ctx.moveTo(startX, _strHeight - uni.upx2px(10)); // 起点
				_this.ctx.lineTo(endX, _strHeight - uni.upx2px(10)); // 终点
				_this.ctx.stroke();
			}
			//设置价格 end

			// 绘制虚线分割
			// 设置虚线样式
			_this.ctx.setStrokeStyle('#C4C4C4');
			_this.ctx.setLineWidth(1);
			// _this.ctx.setLineCap('round');
			// _this.ctx.setLineJoin('round');

			// 绘制示例虚线
			console.log('许仙高度', _strHeight + 10);
			this.drawEqualDashedLine(_this.ctx, 13, _strHeight + 10, C_W - C_P, _strHeight + 10, 3);

			//绘制二维码
			_strHeight += uni.upx2px(60);
			_this.ctx.drawImage(_QrCode.path, r[0] - q[0] + C_P, _strHeight, q[0], q[1]);
			//添加二维码 end

			// 绘制头像
			_strHeight += a[0] / 2 + 4;
			_this.ctx.drawImage(_avatarInfo.path, C_P, _strHeight, a[0], a[1]);
			// 添加头像 end

			//添加推荐人与描述

			const viewX = C_P + a[0] + 10;
			_strHeight += 36; // 自己调整合适位置
			_this.ctx.setFillStyle(_this.hotelTitleColor);
			_this.ctx.setFontSize(uni.upx2px(30));
			_this.ctx.fillText(_this.Referrer, viewX, _strHeight);

			// 描述
			if (_this.ViewDetails) {
				_this.ctx.setFillStyle(_this.OriginalColor);
				_this.ctx.setFontSize(uni.upx2px(24));
				_strHeight += 20; // 自己调整合适位置
				_this.ctx.fillText(_this.ViewDetails, viewX, _strHeight);
			}

			// 三级描述
			if (_this.ViewDetailsInfo) {
				_strHeight += 20; // 自己调整合适位置
				_this.ctx.fillText(_this.ViewDetailsInfo, viewX, _strHeight);
			}

			//  添加推荐人与描述 end

			//延迟后渲染至canvas上

			setTimeout(function () {
				_this.ctx.draw(true, (ret) => {
					uni.hideLoading();
					_this.getNewImage();
				});
			}, 100);
		},
		drawEqualDashedLine(ctx, startX, startY, endX, endY, dashLength) {
			const totalLength = Math.hypot(endX - startX, endY - startY);
			let currentPos = 0;
			const deltaX = (endX - startX) / totalLength;
			const deltaY = (endY - startY) / totalLength;

			ctx.beginPath();

			while (currentPos < totalLength) {
				// 计算当前点位置
				const x1 = startX + deltaX * currentPos;
				const y1 = startY + deltaY * currentPos;

				// 计算下一个点位置
				const x2 = startX + deltaX * Math.min(currentPos + dashLength, totalLength);
				const y2 = startY + deltaY * Math.min(currentPos + dashLength, totalLength);

				// 交替绘制实线和空白
				if (Math.floor(currentPos / (dashLength * 2)) % 2 === 0) {
					ctx.moveTo(x1, y1);
					ctx.lineTo(x2, y2);
				}

				// 更新起点位置
				currentPos += dashLength;
			}

			ctx.stroke();
		},
		async getImageInfo({ imgSrc }) {
			return new Promise((resolve, errs) => {
				uni.getImageInfo({
					src: imgSrc,
					success: function (image) {
						resolve(image);
					},
					fail(err) {
						errs(err);
						uni.showToast({
							title: '海报生成失败',
							mask: false,
							duration: 2000,
							icon: 'none'
						});
						uni.hideLoading();
					}
				});
			});
		},
		getNewImage() {
			uni.canvasToTempFilePath(
				{
					canvasId: _this.CanvasID,
					quality: 1,
					complete: (res) => {
						_this.tempFilePath = res.tempFilePath;
						_this.$emit('success', res);
						_this.loading = false;

						uni.showToast({
							title: '长按图片保存海报',
							mask: false,
							duration: 2000,
							icon: 'none'
						});
						uni.hideLoading();
					}
				},
				this
			);
		}
	}
};
</script>

<style>
.is-response {
	width: 100%;
	/* border-radius: 50rpx; */
}
</style>
