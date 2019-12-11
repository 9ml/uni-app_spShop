<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				订单详情
			</view>
			<view class="t-right"></view>
		</view>
		<view class="top-main">
			<view class="tm-bg">
				<image src="../../static/bg_dfk.png" mode=""></image>
			</view>
			<view class="tm-fonts">
				待付款
			</view>
		</view>
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
		<!-- 商品信息 -->
		<view class="goods-mian" v-for="(g,g_idx) in userGoodsInfo" :key="g_idx">
			<view class="gm-gInfo" @tap="goGoodsInfo(g.goodsId)">
				<view class="gg-img">
					<image :src="g.goodsMainImg" mode=""></image>
				</view>
				<view class="gg-desc">
					<view class="gd-name">
						{{g.goodsName}}
					</view>
					<view class="gd-type">
						<text>颜色:{{g.goodsColor}};尺码:{{g.goodsSize}};</text>
					</view>
					<view class="gd-sh">
						七天无理由退换
					</view>
				</view>
				<view class="gd-price">
					<view class="gp-price">
						￥{{g.lastPrice}}
					</view>
					<view class="gp-nums">
						X{{g.goodsAmount}}
					</view>
				</view>
			</view>
		</view>
		<view class="goods-mian">
			<view class="gm-nums">
				<view class="gn-left">
					配送方式
				</view>
				<view class="gn-right">
					<view class="gr-fonts">
						普通配送
					</view>
				</view>
			</view>
			<view class="gm-nums">
				<view class="gn-left">
					订单备注
				</view>
				<view class="gn-right">
					<view class="gr-fonts">
						{{userOrderInfo.orderRemark}}
					</view>
				</view>
			</view>
			<view class="gm-all">
				<text class="ga-a">
					共{{totalNums}}件
				</text>
				<text class="ga-b">
					小计:
				</text>
				<text class="ga-c">
					￥{{userOrderInfo.orderAmount}}
				</text>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order-main">
			<view class="om-body">
				<view class="ob-name">
					<text>
						订单信息
					</text>
				</view>
				<view class="ob-item ob-top">
					<view class="oi-left">
						订单编号：{{userOrderInfo.orderNum}}
					</view>
					<view class="oi-right" @tap="copyNums()">
						复制
					</view>
				</view>
				<view class="ob-item">
					下单时间：{{userOrderInfo.createTime}}
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="bom-space"></view>
		<view class="bom-main">
			<view class="bm-left"></view>
			<view class="bm-right">
				<view class="br-btn-qx" @tap="delOrder()">
					取消订单
				</view>
				<view class="br-btn-zf" @tap="goPay()">
					去支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 订单信息
				userOrderInfo : "",
				// 商品信息
				userGoodsInfo : [],
				// 总数量
				totalNums : 0
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
				this._Api.userOrderInfo({
					orderNum : this.orderNum
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						res.data.forEach((i)=>{
							this.totalNums += i.goodsAmount
							i.lastPrice = i.orderGoodsPrice / i.goodsAmount
							i.goodsMainImg = this.imgUrl + i.goodsMainImg
						})
						this.userOrderInfo = res.data[0];
						res.data[0].createTime = this.myTools.formatDateTime(res.data[0].createTime,'str');
						this.userGoodsInfo = res.data;
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 取消订单
			delOrder(){
				uni.navigateTo({
					url:'../index/cancellationOrder?orderNum='+this.orderNum
				})
			},
			// 去支付
			goPay(){
				uni.navigateTo({
					url:'../index/cashier?orderNum='+this.orderNum
				})
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
			// 复制
			copyNums(){
				uni.setClipboardData({
				    data: this.userOrderInfo.orderNum,
				    success: function () {
				        console.log('success');
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.topNav{
		background-color: rgba($color: #FFFFFF, $alpha: 0);
	}
	.top-main{
		position: relative;
		.tm-bg{
			height: 300rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.tm-fonts{
			height: 60rpx;
			position: absolute;
			left: 36rpx;
			bottom: 50rpx;
			font-size: 30rpx;
			color: #FFFFFF;
			font-weight: bold;
			line-height: 60rpx;
			z-index: 9;
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
	.goods-mian{
		width: 94%;
		margin: 0 auto 18rpx;
		border-radius: 16rpx;
		padding-bottom: 20rpx;
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
			.gb-left{
				width: 14%;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 22rpx;
			}
			.gb-inp{
				width: 80%;
				height: 60rpx;
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
	.order-main{
		width: 94%;
		height: 150rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		.om-body{
			width: 94%;
			margin: 0 auto;
			.ob-name{
				height: 46rpx;
				line-height: 46rpx;
				font-size: 24rpx;
				text{
					height: 22rpx;
					padding-left: 10rpx;
					border-left: 4rpx solid #FA6400;
				}
			}
			.ob-item{
				height: 50rpx;
				line-height: 50rpx;
				font-size: 20rpx;
				color: #808080;
			}
			.ob-top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.oi-right{
					color: #FF584C;
				}
			}
		}
	}
	.bom-space{
		height: 120rpx;
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
		justify-content: space-between;
		.bm-left{
			width: 30%;
			height: 70rpx;
			text-align: center;
			line-height: 70rpx;
			.bl-name{
				font-size: 24rpx;
			}
			.bl-price{
				font-size: 26rpx;
				color: #FF584C;
				margin-left: 10rpx;
			}
		}
		.bm-right{
			width: 50%;
			height: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			view{
				width: 142rpx;
				height: 50rpx;
				text-align: center;
				font-size: 24rpx;
				line-height: 50rpx;
				border-radius: 25rpx;
			}
			.br-btn-qx{
				border: 1rpx solid #666666;
				color: #666666;
			}
			.br-btn-zf{
				border: 1rpx solid #FF584C;
				color: #FF584C;
				margin-left: 20rpx;
			}
		}
	}
</style>
