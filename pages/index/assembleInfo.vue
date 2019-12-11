<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				确认订单
			</view>
			<view class="t-right" @tap="shares()">
				<image src="../../static/icon_fx_pt.png" mode=""></image>
			</view>
		</view>
		<view class="space_nav"></view>
		<!-- 地址信息 -->
		<view class="adress-main">
			<view class="am-left">
				<image src="../../static/icon_dz.png" mode=""></image>
			</view>
			<view class="am-middle">
				<view class="amm-top">
					<text class="at-name">{{userOrderInfo.consigneeName}}</text>
					<text class="at-phone">{{userOrderInfo.consigneePhone}}</text>
				</view>
				<view class="amm-bom">
					{{userOrderInfo.consigneeAddress}}
				</view>
			</view>
			<view class="am-right">
				<!-- <image src="../../static/icon_jr_dd.png" mode=""></image> -->
			</view>
		</view>
		<!-- 邀请好友 -->
		<view class="invitation-main" @tap="shares()">
			邀请好友，开始拼团
		</view>
		<!-- 商品信息 -->
		<view class="goods-mian">
			<view class="gm-gInfo">
				<view class="gg-img">
					<image :src="userOrderInfo.goodsMainImg" mode=""></image>
				</view>
				<view class="gg-desc">
					<view class="gd-name">
						{{userOrderInfo.goodsName}}
					</view>
					<view class="gd-type">
						<text>颜色:{{userOrderInfo.goodsColor}};尺码:{{userOrderInfo.goodsSize}};</text>
					</view>
					<view class="gd-sh">
						七天无理由退换
					</view>
				</view>
				<view class="gd-price">
					<view class="gp-price">
						￥{{userOrderInfo.lastPrice}}
					</view>
					<view class="gp-nums">
						X{{userOrderInfo.goodsAmount}}
					</view>
				</view>
			</view>
			<view class="gm-nums">
				<view class="gn-left">
					购买数量
				</view>
				<view class="gn-right">
					<view class="gr-item unable">
						-
					</view>
					<view class="gr-item gr-m">
						1
					</view>
					<view class="gr-item unable">
						+
					</view>
				</view>
			</view>
			<view class="gm-nums">
				<view class="gn-left">
					配送方式
				</view>
				<view class="gn-right">
					<view class="gr-fonts">
						快递配送
					</view>
					<view class="gr-icon">
						<!-- <image src="../../static/icon_jr_dd.png" mode=""></image> -->
					</view>
				</view>
			</view>
			<view class="gm-bz">
				<view class="gb-left">
					订单备注
				</view>
				<view class="gb-inp">
					{{userOrderInfo.orderRemark}}
				</view>
			</view>
			<view class="gm-all">
				<text class="ga-a">
					共{{userOrderInfo.goodsAmount}}件
				</text>
				<text class="ga-b">
					小计:
				</text>
				<text class="ga-c">
					￥{{userOrderInfo.orderPrice}}
				</text>
			</view>
		</view>
		<!-- 底部 -->
		<view class="bom-main">
			<view class="bm-left"></view>
			<view class="bm-right">
				拼团中
			</view>
		</view>
		<!-- 分享 -->
		<uni-popup ref="shares" type="bottom" :custom="true">
			<view class="share-main">
				<view class="sm-title">
					点击分享
				</view>
				<view class="sm-type">
					<view class="st-item" @tap="shareWeChats()">
						<view class="si-icon">
							<image src="../../static/btn_wx_fx.png" mode=""></image>
						</view>
						<view class="si-fonts">
							微信
						</view>
					</view>
					<view class="st-item" @tap="shareCircleOfFriends()">
						<view class="si-icon">
							<image src="../../static/btn_pyq_fx.png" mode=""></image>
						</view>
						<view class="si-fonts">
							朋友圈
						</view>
					</view>
				</view>
				<view class="sm-lines"></view>
				<view class="sm-btn" @tap="closeShare()">
					取消
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				userId : uni.getStorageSync("userId"),
				// 订单信息
				userOrderInfo : "",
			}
		},
		onLoad(options) {
			this.imgUrl = this._Api.imgUrl
			this.orderNum = options.orderNum
			this.getOrderInfo();
		},
		methods:{
			// 订单信息
			getOrderInfo(){
				this._Api.showPtOrderInfoDetail({
					orderNum : this.orderNum
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						res.data.goodsMainImg = this.imgUrl + res.data.goodsMainImg
						res.data.lastPrice = res.data.orderAmount / res.data.goodsAmount
						this.userOrderInfo = res.data;
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			shares(){
				this.$refs.shares.open()
			},
			closeShare(){
				this.$refs.shares.close()
			},
			// 分享到微信
			shareWeChats(){
				if(!this.userId){
					this.isLogin();
				}else{
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 0,
					    href: "http://47.104.185.192:8080/didi/assemble.html?goodsId="+this.userOrderInfo.goodsId+"&ptInfoTableId="+this.userOrderInfo.ptInfoTableId+"&ptGoodsTableId="+this.userOrderInfo.ptGoodsTableId,
					    title: "尚品商城",
					    summary: "我正在使用尚品商城APP拼团，快来加入我一起拼团吧~",
					    imageUrl: this.userOrderInfo.goodsMainImg,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}
			},
			// 分享到朋友圈
			shareCircleOfFriends(){
				if(!this.userId){
					this.isLogin();
				}else{
					uni.share({
					    provider: "weixin",
					    scene: "WXSenceTimeline",
					    type: 0,
					    href: "http://47.104.185.192:8080/didi/assemble.html?goodsId="+this.userOrderInfo.goodsId+"&ptInfoTableId="+this.userOrderInfo.ptInfoTableId+"&ptGoodsTableId="+this.userOrderInfo.ptGoodsTableId,
					    title: "尚品商城",
					    summary: "我正在使用尚品商城APP拼团，快来加入我一起拼团吧~",
					    imageUrl: this.userOrderInfo.goodsMainImg,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.topNav{
		.t-right{
			margin-top: 30rpx;
			text-align: center;
			image{
				width: 30rpx;
				height: 30rpx;
			}
		}
	}
	.adress-main{
		width: 94%;
		height: 140rpx;
		margin: 18rpx auto 18rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.am-left{
			width: 12%;
			height: 46rpx;
			text-align: center;
			image{
				width: 46rpx;
				height: 46rpx;
			}
		}
		.am-middle{
			width: 78%;
			height: 80rpx;
			view{
				height: 40rpx;
				line-height: 40rpx;
			}
			.amm-top{
				font-size: 22rpx;
				.at-phone{
					color: #666666;
					margin-left: 20rpx;
				}
			}
			.amm-bom{
				font-size: 24rpx;
			}
		}
		.am-right{
			width: 8%;
			height: 46rpx;
			line-height: 46rpx;
			text-align: center;
			image{
				width: 16rpx;
				height: 24rpx;
			}
		}
	}
	.invitation-main{
		width: 710rpx;
		height: 50rpx;
		margin: 18rpx auto 18rpx;
		background-image: url(../../static/bg_yq.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		text-align: center;
		line-height: 50rpx;
		font-size: 24rpx;
		color: #FFFFFF;
	}
	.goods-mian{
		width: 94%;
		height: 500rpx;
		margin: 0 auto 18rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		.gm-gName{
			width: 94%;
			height: 50rpx;
			margin: 0 auto;
			font-size: 22rpx;
			line-height: 50rpx;
		}
		.gm-gInfo{
			width: 94%;
			height: 160rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			.gg-img{
				width: 24%;
				height: 140rpx;
				text-align: center;
				image{
					width: 150rpx;
					height: 140rpx;
				}
			}
			.gg-desc{
				width: 60%;
				height: 140rpx;
				.gd-name{
					height: 60rpx;
					font-size: 22rpx;
					overflow: hidden;
				}
				.gd-type{
					height: 40rpx;
					line-height: 40rpx;
					font-size: 20rpx;
					text{
						padding: 4rpx;
						background-color: #F1F1F1;
						border-radius: 6rpx;
					}
				}
				.gd-sh{
					height: 40rpx;
					line-height: 40rpx;
					font-size: 20rpx;
					color: #FF584C;
				}
			}
			.gd-price{
				width: 16%;
				height: 140rpx;
				text-align: right;
				font-size: 20rpx;
				.gp-price{
					color: #FF584C;
				}
				.gp-nums{
					color: #999999;
				}
			}
		}
		.gm-nums{
			width: 94%;
			height: 70rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.gn-left{
				font-size: 22rpx;
			}
			.gn-right{
				display: flex;
				align-items: center;
				.gr-item{
					width: 40rpx;
					height: 40rpx;
					border-radius: 6rpx;
					background-color: #F1F1F1;
					font-size: 22rpx;
					text-align: center;
					line-height: 40rpx;
				}
				.unable{
					color: #C0C0C0;
				}
				.gr-m{
					margin: 0 4rpx 0 4rpx;
				}
				.gr-fonts{
					height: 30rpx;
					line-height: 30rpx;
					font-size: 20rpx;
					margin-right: 10rpx;
				}
				.gr-icon{
					height: 30rpx;
					line-height: 30rpx;
					image{
						width: 16rpx;
						height: 22rpx;
					}
				}
			}
		}
		.gm-bz{
			width: 94%;
			height: 70rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.gb-left{
				width: 14%;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 22rpx;
			}
			.gb-inp{
				font-size: 24rpx;
				input{
					width: 100%;
					height: 100%;
					font-size: 22rpx;
					color: #666666;
				}
			}
		}
		.gm-all{
			width: 94%;
			height: 70rpx;
			margin: 0 auto;
			font-size: 22rpx;
			line-height: 70rpx;
			text-align: right;
			.ga-a{
				color: #666666;
				margin-right: 20rpx;
			}
			.ga-c{
				color: #FF584C;
			}
		}
	}
	.bom-main{
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		z-index: 99;
		display: flex;
		align-items: center;
		.bm-left{
			width: 70%;
			height: 70rpx;
			text-align: right;
			line-height: 70rpx;
			font-size: 22rpx;
			.bl-a{
				color: #666666;
				margin-right: 20rpx;
			}
			.bl-c{
				color: #FF584C;
			}
		}
		.bm-right{
			width: 142rpx;
			height: 50rpx;
			margin: 0 auto;
			text-align: center;
			font-size: 24rpx;
			line-height: 50rpx;
			color: #FFFFFF;
			background-image: url(../../static/bg_zf.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
	}
	.share-main{
		height: 350rpx;
		background-color: #FFFFFF;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.sm-title{
			height: 80rpx;
			font-size: 28rpx;
			line-height: 80rpx;
			text-align: center;
		}
		.sm-type{
			height: 180rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.st-item{
				width: 30%;
				text-align: center;
				.si-icon{
					image{
						width: 80rpx;
						height: 80rpx;
					}
				}
				.si-fonts{
					font-size: 24rpx;
				}
			}
		}
		.sm-lines{
			height: 10rpx;
			background-color: #F4F4F4;
		}
		.sm-btn{
			height: 80rpx;
			font-size: 26rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
</style>
