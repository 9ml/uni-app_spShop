<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				退款详情
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="ri-top">
			<view class="rt-a">
				{{gotInfo.isAfter}}
			</view>
			<view class="rt-b">
				{{gotInfo.createTime}}
			</view>
		</view>
		<view class="rp-main">
			<view class="rf-price">
				<view class="rp-left">
					退款总金额
				</view>
				<view class="rp-right">
					￥{{gotInfo.orderAmount}}
				</view>
			</view>
		</view>
		<view class="rt-main">
			<view class="r-ms" v-if="TKing">
				<view class="rm-top">
					您已成功发起退款申请，请耐心等待商家处理
				</view>
			</view>
			<view class="r-ms" v-if="TKSec">
				<view class="rm-top">
					退款成功
				</view>
			</view>
			<view class="r-ms" v-if="TKFail">
				<view class="rm-top">
					退款失败
				</view>
			</view>
			<view class="r-desc" v-if="TKing">
				商家同意或未处理，系统将退钱给您<br />
				如果商家拒绝，您可以修改退款申请后再次发起，商家会重新处理
			</view>
			<view class="r-desc" v-if="TKSec">
				退款成功
			</view>
			<view class="r-desc" v-if="TKFail">
				退款失败
			</view>
			<view class="r-bth" @tap="goUpdate()">
				修改申请
			</view>
		</view>
		
		<view class="tk-title">
			退款信息
		</view>
		<view class="tk-gMain">
			<view class="tkg-body">
				<view class="tb-img">
					<image :src="gotInfo.goodsMainImg" mode=""></image>
				</view>
				<view class="tb-desc">
					<view class="td-top">
						{{gotInfo.goodsName}}
					</view>
					<view class="td-bom">
						<text>颜色:{{gotInfo.goodsColor}};尺码:{{gotInfo.goodsSize}};</text>
					</view>
				</view>
				<view class="td-price">
					<view class="tp-top">
						￥{{gotInfo.lastPrice}}.00
					</view>
					<view class="tp-bom">
						X{{gotInfo.goodsAmount}}
					</view>
				</view>
			</view>
		</view>
		<view class="bom-item">
			退款原因：{{gotInfo.afterReason}}
		</view>
		<view class="bom-item">
			退款金额：￥{{gotInfo.orderAmount}}.00
		</view>
		<view class="bom-item">
			申请件数：{{gotInfo.goodsAmount}}件
		</view>
		<view class="bom-item">
			申请时间：{{gotInfo.afCreateTime}}
		</view>
		<view class="bom-item">
			退款编号：{{gotInfo.afterId}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gotInfo : "",
				TKing : false,
				TKSec : false,
				TKFail : false
			}
		},
		onLoad(options) {
			this.imgUrl = this._Api.imgUrl
			this.orderGoodsId = options.orderGoodsId
			this.getInfo();
		},
		methods: {
			getInfo(){
				this._Api.showAfterOrderGoods({
					orderGoodsId : this.orderGoodsId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						if(res.data.isAfter === "退款中"){
							this.TKing = true
						}else if(res.data.isAfter === "退款完成" || res.data.isAfter === "退款成功"){
							this.TKSec = true
						}else if(res.data.isAfter === "退款失败"){
							this.TKFail = true
						}
						res.data.createTime = this.myTools.formatDateTime(res.data.createTime,'str');
						res.data.afCreateTime = this.myTools.formatDateTime(res.data.afCreateTime,'str');
						res.data.lastPrice = res.data.orderAmount / res.data.goodsAmount
						res.data.goodsMainImg = this.imgUrl + res.data.goodsMainImg
						this.gotInfo = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			goUpdate(){
				uni.navigateTo({
					url:'./applyForRefund?orderGoodsId='+this.orderGoodsId
				})
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F4F4;
	}
	.ri-top{
		height: 200rpx;
		background-color: #FF584C;
		view{
			width: 90%;
			height: 50rpx;
			margin: 0 auto;
			line-height: 50rpx;
			color: #FFFFFF;
			font-size: 28rpx;
			font-weight: bold;
		}
		.rt-a{
			padding-top: 50rpx;
		}
	}
	.rp-main{
		background-color: #FFFFFF;
		.rf-price{
			width: 90%;
			height: 80rpx;
			margin: 0 auto 18rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 26rpx;
			.rp-right{
				color: #FF584C;
			}
		}
	}
	.rt-main{
		height: 270rpx;
		position: relative;
		background-color: #FFFFFF;
		.r-ms{
			border-bottom: 1rpx solid #E4E4E4;
			.rm-top{
				width: 90%;
				height: 60rpx;
				margin: 0 auto;
				line-height: 60rpx;
				font-size: 22rpx;
			}
		}
		.r-desc{
			width: 90%;
			height: 200rpx;
			margin: 18rpx auto 0;
			font-size: 26rpx;
			color: #AEAEAE;
		}
		.r-bth{
			width: 120rpx;
			height: 40rpx;
			border: 1rpx solid #808080;
			color: #808080;
			border-radius: 20rpx;
			text-align: center;
			line-height: 40rpx;
			font-size: 22rpx;
			position: absolute;
			bottom: 30rpx;
			right: 30rpx;
		}
	}
	.tk-title{
		width: 90%;
		height: 60rpx;
		margin: 0 auto;
		line-height: 60rpx;
		font-size: 22rpx;
	}
	.tk-gMain{
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
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
	.bom-item{
		width: 90%;
		height: 40rpx;
		margin: 0 auto;
		line-height: 40rpx;
		font-size: 20rpx;
		color: #666666;
	}
</style>
