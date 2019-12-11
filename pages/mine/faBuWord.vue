<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				发布评价
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="zt-main">
			<view class="pjName_a">
				整体评价
			</view>
			<uni-rate :value="5" :size="20" @change="onChangeAll" />
			<text class="type">非常好</text>
		</view>
		<view class="inp-main">
			<view class="in-area">
				<textarea v-model="evenluationFonts" placeholder="宝贝满足您的期待吗？说说您的使用心得,分享给想买的他们吧" />
			</view>
			<view class="in-icon" @tap="addCImgs()">
				<image src="../../static/icon_tjtp.png" mode=""></image>
			</view>
			<view class="uf-imgs" v-if="isUpload">
				<view class="ui-item" v-for="(m,m_idx) in userChoseImgList" :key="m_idx">
					<image :src="m" mode=""></image>
				</view>
			</view>
			<view class="in-bom">
				<view class="ib-main">
					<view class="im-left" @tap="isShowName()">
						<view class="il-icon">
							<image :src="nmIcon" mode=""></image>
						</view>
						<view class="il-font">
							匿名评价
						</view>
					</view>
					<view class="im-right">
						您写的评价会以匿名的形式展现
					</view>
				</view>
			</view>
		</view>
		<view class="dp-main">
			<view class="dm-body">
				<view class="db-title">
					店铺评价
				</view>
				<view class="db-item">
					<view class="di-left">
						物流服务
					</view>
					<uni-rate :value="0" :size="18" @change="onChangeWL" />
				</view>
				<view class="db-item">
					<view class="di-left">
						描述相符
					</view>
					<uni-rate :value="0" :size="18" @change="onChangeMS" />
				</view>
				<view class="db-item">
					<view class="di-left">
						服务态度
					</view>
					<uni-rate :value="0" :size="18" @change="onChangeFW" />
				</view>
			</view>
		</view>
		<view class="fb-btn" @tap="addEvenluations()">
			发布
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				userId : uni.getStorageSync("userId"),
				// 整体评价
				evenluationAll : 5,
				// 物流
				evenluationWL : 0,
				// 描述
				evenluationMS : 0,
				// 服务
				evenluationFW : 0,
				// 文字描述
				evenluationFonts : "",
				// 上传的图片
				userChoseImgList : [],
				// 服务器返回的图片
				returnList : [],
				// 渲染
				isUpload : true,
				// 匿名
				nmIcon : "../../static/icon_wx_qx.png",
				isNM : 0
			}
		},
		onLoad(options) {
			this.baseUrl = this._Api.baseUrl;
			this.orderGoodsId = options.orderGoodsId;
		},
		methods: {
			// 发布评价
			addEvenluations(){
				let gotImgStr = this.returnList.join("|");
				this._Api.addEvenluation({
					userId : this.userId,
					orderGoodsId : this.orderGoodsId,
					globalEvenluation : this.evenluationAll,
					evenluationContent : this.evenluationFonts,
					evenluationImg : gotImgStr,
					logisticsService : this.evenluationWL,
					answerDescription : this.evenluationMS,
					serviceAttitude : this.evenluationFW,
					isAnonymity : this.isNM
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:"评论成功",
							icon:"none",
							duration:1500
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:"/pages/mine/myOrder?idx=" + '0'
							})
						},1500)
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none",
							duration:1500
						})
					}
				})
			},
			isShowName(){
				this.nmIcon === "../../static/icon_wx_qx.png" ? (this.nmIcon = "../../static/icon_xz_qx.png",this.isNM = 1) : (this.nmIcon = "../../static/icon_wx_qx.png",this.isNM = 0);
			},
			// 上传图片
			addCImgs(){
				uni.chooseImage({
					success: (res) =>{
						let locaList = res.tempFilePaths[0]
						uni.uploadFile({
							url: this.baseUrl + '/orderInfo/uploadCommentImg',
							filePath: locaList,
							name: 'file',
							formData: {
								id : this.userId,
								uploadPath : 'comment'
							},
							success: (res) => {
								console.log(res);
								if(res.statusCode === 200){
									if(this.returnList.length < 9){
										let serverList = JSON.parse(res.data).body.url
										this.returnList[this.returnList.length] = serverList
										this.userChoseImgList[this.userChoseImgList.length] = locaList
										this.isUpload = false
										this.isUpload = true
									}else{
										uni.showToast({
											title:"最多上传9张图片哦~",
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
			// 总体评价
			onChangeAll(e) {
				console.log(e.value)
				this.evenluationAll = e.value
			},
			// 物流评价
			onChangeWL(e){
				this.evenluationWL = e.value
			},
			// 描述评价
			onChangeMS(e){
				this.evenluationMS = e.value
			},
			// 服务评价
			onChangeFW(e){
				this.evenluationFW = e.value
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F4F4;
	}
	.zt-main{
		width: 94%;
		height: 70rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 18rpx auto 18rpx;
		display: flex;
		align-items: center;
		.pjName_a{
			width: 20%;
			text-align: center;
			height: 60rpx;
			font-size: 24rpx;
			line-height: 60rpx;
		}
		.type{
			font-size: 22rpx;
			color: #999999;
			margin-left: 30rpx;
		}
	}
	.inp-main{
		width: 94%;
		border-radius: 16rpx;
		margin: 0 auto 18rpx;
		background-color: #FFFFFF;
		padding-bottom: 10rpx;
		.in-area{
			width: 94%;
			height: 150rpx;
			margin: 0 auto;
			padding-top: 10rpx;
			textarea{
				width: 100%;
				height: 100%;
				font-size: 22rpx;
			}
		}
		.in-icon{
			width: 94%;
			height: 120rpx;
			margin: 10rpx auto 16rpx;
			image{
				width: 120rpx;
				height: 120rpx;
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
		.in-bom{
			margin-top: 24rpx;
			border-top: 1rpx solid #F4F4F4;
			.ib-main{
				width: 94%;
				height: 60rpx;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.im-left{
					display: flex;
					align-items: center;
					.il-icon{
						width: 30rpx;
						height: 30rpx;
						image{
							width: 100%;
							height: 100%;
							margin-bottom: 15rpx;
						}
					}
					.il-font{
						height: 30rpx;
						line-height: 30rpx;
						font-size: 22rpx;
						margin-left: 10rpx;
					}
				}
				.im-right{
					font-size: 22rpx;
					color: #999999;
				}
			}
		}
	}
	.dp-main{
		width: 94%;
		height: 222rpx;
		border-radius: 16rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		.dm-body{
			width: 94%;
			margin: 0 auto;
			.db-title{
				height: 60rpx;
				line-height: 60rpx;
				font-size: 22rpx;
			}
			.db-item{
				height: 50rpx;
				display: flex;
				align-items: center;
				.di-left{
					font-size: 20rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
	.fb-btn{
		width: 300rpx;
		height: 82rpx;
		margin: 80rpx auto;
		background-image: url(../../static/btn_zhuce_zhuce.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		font-size: 30rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 82rpx;
	}
</style>
