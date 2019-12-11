<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				确认付款
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="payNums">
			￥699.99
		</view>
		<view class="payType">
			<view class="pt-main">
				<view class="pm-name">
					付款方式
				</view>
				<view class="pm-chose">
					<view class="pc-fonts">
						账户余额
					</view>
					<view class="pc-icon">
						<image src="../../static/icon_jr.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="payBtn">
			立即付款
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.payNums{
		height: 160rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 56rpx;
	}
	.payType{
		width: 94%;
		height: 100rpx;
		margin: 0 auto;
		border-radius: 16rpx;
		background-color: #F5F5F5;
		.pt-main{
			width: 90%;
			height: 100rpx;
			margin: 0 auto;
			display: flex;
			font-size: 26rpx;
			justify-content: space-between;
			align-items: center;
			.pm-name{
				color: #666666;
			}
			.pm-chose{
				display: flex;
				align-items: center;
				.pc-fonts{
					height: 30rpx;
					line-height: 30rpx;
					margin-right: 10rpx;
				}
				.pc-icon{
					height: 30rpx;
					margin-bottom: 4rpx;
					image{
						width: 14rpx;
						height: 22rpx;
					}
				}
			}
		}
	}
	.payBtn{
		width: 260rpx;
		height: 72rpx;
		margin: 60rpx auto;
		background-image: url(../../static/btn_zhuce_zhuce.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		font-size: 30rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
	}
</style>
