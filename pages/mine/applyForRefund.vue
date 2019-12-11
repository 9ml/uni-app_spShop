<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				申请退款
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<!-- 商品信息 -->
		<view class="tk-gMain">
			<view class="tkg-body" @tap="goGoodsInfo(userGoodsInfo.goodsId)">
				<view class="tb-img">
					<image :src="userGoodsInfo.goodsMainImg" mode=""></image>
				</view>
				<view class="tb-desc">
					<view class="td-top">
						{{userGoodsInfo.goodsName}}
					</view>
					<view class="td-bom">
						<text>颜色:{{userGoodsInfo.goodsColor}};尺码:{{userGoodsInfo.goodsSize}};</text>
					</view>
				</view>
				<view class="td-price">
					<view class="tp-top">
						￥{{userGoodsInfo.lastPrice}}
					</view>
					<view class="tp-bom">
						X{{userGoodsInfo.goodsAmount}}
					</view>
				</view>
			</view>
		</view>
		<!-- 退款原因 -->
		<view class="refundReason">
			<view class="rr-left">
				选择退款原因
			</view>
			<view class="rr-right">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
			</view>
		</view>
		<!-- 退款说明 -->
		<view class="refundExplain">
			<view class="re-item">
				<view class="ri-left">
					退款金额
				</view>
				<view class="ri-right">
					￥{{userGoodsInfo.orderGoodsPrice}}.00
				</view>
			</view>
			<view class="re-item">
				<view class="ri-left">
					退款说明
				</view>
				<view class="ri-right">
					<input type="text" v-model="refundExplain" placeholder="选填" />
				</view>
			</view>
		</view>
		<!-- 上传凭证 -->
		<view class="uploadFiles">
			<view class="uf-title">
				上传凭证
			</view>
			<view class="uf-icon" @tap="upLoadImgs()">
				<image src="/static/icon_tjtp.png" mode=""></image>
			</view>
			<view class="uf-imgs" v-if="isUpload">
				<view class="ui-item" v-for="(m,m_idx) in userChoseImgList" :key="m_idx">
					<image :src="m" mode=""></image>
				</view>
			</view>
		</view>
		<view class="afr-btn" @tap="sureRefund()">
			提交
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            array: ['订单信息拍错(规格)', '不想要了', '拍重复了', '收货信息填写错误', '缺货'],
	            index: 0,
				userGoodsInfo : "",
				refundReason : "",
				refundExplain : "",
				userChoseImgList : [],
				getServerImgList : [],
				isUpload : true,
				userId : uni.getStorageSync("userId")
	        }
	    },
		onLoad(options) {
			this.baseUrl = this._Api.baseUrl;
			this.imgUrl = this._Api.imgUrl;
			this.orderGoodsId = options.orderGoodsId
			this.refundReason = this.array[this.index]
			this.getGoodsInfoDFK();
		},
	    methods: {
			// 商品信息
			getGoodsInfoDFK(){
				this._Api.getOneGoodsInfo({
					orderGoodsId : this.orderGoodsId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						res.data.goodsMainImg = this.imgUrl + res.data.goodsMainImg
						res.data.lastPrice = res.data.orderGoodsPrice / res.data.goodsAmount
						this.userGoodsInfo = res.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 上传图片
			upLoadImgs(){
				uni.chooseImage({
					success : (res)=>{
						let loclImgs = res.tempFilePaths[0]
						uni.uploadFile({
							url: this.baseUrl + '/orderInfo/uploadAfterImg',
							filePath: loclImgs,
							name: 'file',
							formData: {
								id : this.userId,
								uploadPath : 'afterImg'
							},
							success: (res) => {
								if(res.statusCode === 200){
									if(this.getServerImgList.length < 3){
										let serverRuturnImg = JSON.parse(res.data).body.url
										this.getServerImgList[this.getServerImgList.length] = serverRuturnImg
										this.userChoseImgList[this.userChoseImgList.length] = loclImgs
										this.isUpload = false
										this.isUpload = true
									}else{
										uni.showToast({
											title:"最多上传3张图片哦~",
											icon:'none',
											duration:1500
										})
									}
								}else{
									uni.showToast({
										title:res.errMsg,
										icon:'none',
										duration:1500
									})
								}
							}
						});
					}
				})
			},
			// 提交
			sureRefund(){
				let gotImgStr = this.getServerImgList.join("|");
				console.log(gotImgStr);
				this._Api.submitRefund({
					userId : this.userId,
					orderNum : this.userGoodsInfo.orderNum,
					orderGoodsId : this.orderGoodsId,
					afterReason : this.refundReason,
					afterMoney : this.userGoodsInfo.orderGoodsPrice,
					afterExplain : this.refundExplain,
					afterImg : gotImgStr
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:"提交成功，请耐心等待店家审核",
							icon:"none",
							duration:1500
						})
						setTimeout(()=>{
							uni.reLaunch({
								url: "/pages/mine/myOrder?idx="+'0'
							})
						},1500)
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:"none",
							duration:1500
						})
					}
				})
			},
	        bindPickerChange: function(e) {
	            console.log('picker发送选择改变，携带值为', this.array[e.target.value])
	            this.index = e.target.value
				this.refundReason = this.array[e.target.value]
	        },
			goGoodsInfo(idx){
				this._Api.checkPtGoodsInfo({
					goodsId : idx
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						console.log(res.data.length);
						if(res.data.length === 0){
							uni.navigateTo({
								url:"../index/goodsInfoNormal?goodsId="+idx
							})
						}else{
							let ptArr = []
							let ptNum = []
							res.data.forEach((i)=>{
								ptArr[ptArr.length] = i.id
								ptNum[ptNum.length] = i.ptSize
							})
							uni.navigateTo({
								url:"../index/goodsInfo?goodsId="+idx+"&arr="+ptArr+"&num="+ptNum
							})
						}
					}
				});
			},
	    }
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.tk-gMain{
		width: 94%;
		margin: 18rpx auto 18rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		.tkg-body{
			width: 90%;
			height: 172rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			.tb-img{
				width: 26%;
				height: 124rpx;
				text-align: center;
				image{
					width: 146rpx;
					height: 124rpx;
				}
			}
			.tb-desc{
				width: 54%;
				height: 124rpx;
				.td-top{
					height: 66rpx;
					overflow: hidden;
					font-size: 22rpx;
				}
				.td-bom{
					height: 30rpx;
					line-height: 30rpx;
					text{
						padding: 4rpx;
						font-size: 20rpx;
						border-radius: 4rpx;
						background-color: #F1F1F1;
					}
				}
			}
			.td-price{
				width: 20%;
				height: 124rpx;
				text-align: right;
				.tp-top{
					font-size: 22rpx;
					color: #FF584C;
				}
				.tp-bom{
					font-size: 20rpx;
					color: #999999;
				}
			}
		}
	}
	.refundReason{
		width: 94%;
		height: 70rpx;
		background-color: #FFFFFF;
		margin: 0 auto 18rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		.rr-left{
			margin-left: 20rpx;
		}
		.rr-right{
			margin-right: 20rpx;
			picker{
				.uni-input{
					font-size: 24rpx;
				}
			}
		}
	}
	.refundExplain{
		width: 94%;
		height: 120rpx;
		background-color: #FFFFFF;
		margin: 0 auto 18rpx;
		border-radius: 16rpx;
		.re-item{
			width: 94%;
			height: 60rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			line-height: 60rpx;
			.ri-left{
				width: 20%;
			}
			.ri-right{
				width: 80%;
				input{
					width: 100%;
					height: 100%;
					font-size: 24rpx;
				}
			}
		}
	}
	.uploadFiles{
		width: 94%;
		// height: 200rpx;
		background-color: #FFFFFF;
		margin: 0 auto 18rpx;
		padding-bottom: 20rpx;
		border-radius: 16rpx;
		.uf-title{
			height: 60rpx;
			font-size: 24rpx;
			margin-left: 20rpx;
			line-height: 60rpx;
		}
		.uf-icon{
			width: 120rpx;
			height: 120rpx;
			margin-left: 20rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.uf-imgs{
			width: 94%;
			margin: 20rpx auto 0;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.ui-item{
				width: 120rpx;
				height: 120rpx;
				margin: 0 10rpx 20rpx 0;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.afr-btn{
		width: 300rpx;
		height: 82rpx;
		margin: 50rpx auto;
		background-image: url(../../static/btn_zhuce_zhuce.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		font-size: 30rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 82rpx;
	}
</style>
