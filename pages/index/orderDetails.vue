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
		<view class="space_nav"></view>
		<!-- 地址信息 -->
		<view class="adress-main">
			<view class="am-left">
				<image src="../../static/icon_dz.png" mode=""></image>
			</view>
			<view class="am-middle">
				<view class="amm-top">
					<text class="at-name">李XX</text>
					<text class="at-phone">12345678910</text>
				</view>
				<view class="amm-bom">
					江苏省徐州市铜山区铜山万达123号
				</view>
			</view>
			<view class="am-right">
				<image src="../../static/icon_jr_dd.png" mode=""></image>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="goods-mian">
			<view class="gm-gName">
				机核铺
			</view>
			<view class="gm-gInfo">
				<view class="gg-img">
					<image src="../../static/4.png" mode=""></image>
				</view>
				<view class="gg-desc">
					<view class="gd-name">
						吉考斯工业xPLAYSTATION拼接撞色纯棉短袖T恤
					</view>
					<view class="gd-type">
						<text>颜色:黑色;尺码:XL;</text>
					</view>
					<view class="gd-sh">
						七天无理由退换
					</view>
				</view>
				<view class="gd-price">
					<view class="gp-price">
						￥123.00
					</view>
					<view class="gp-nums">
						X1
					</view>
				</view>
			</view>
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
						不要发圆通
					</view>
				</view>
			</view>
			<view class="gm-all">
				<text class="ga-a">
					共一件
				</text>
				<text class="ga-b">
					小计:
				</text>
				<text class="ga-c">
					￥123.00
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
						订单编号：32323235612451215421
					</view>
					<view class="oi-right">
						复制
					</view>
				</view>
				<view class="ob-item">
					下单时间：2019.03.26
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="bom-main">
			<view class="bm-left"></view>
			<view class="bm-right">
				<view class="br-btn-qx">
					查看物流
				</view>
				<view class="br-btn-zf">
					去评价
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
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
		height: 420rpx;
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
				color: #FFFFFF;
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			.br-btn-qx{
				background-image: url(../../static/bg_qx.png);
			}
			.br-btn-zf{
				background-image: url(../../static/bg_zf.png);
				margin-left: 20rpx;
			}
		}
	}
</style>
