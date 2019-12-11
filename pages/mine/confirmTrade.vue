<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				确认交易
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="ct-main">
			<view class="cm-space"></view>
			<view class="cm-top">
				充值
			</view>
			<view class="cm-mid">
				￥0.00
			</view>
			<view class="cm-bom">
				收款方：XXX
			</view>
		</view>
		<view class="ct-btn">
			立即支付
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.ct-main{
		width: 94%;
		height: 300rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 18rpx auto 18rpx;
		text-align: center;
		.cm-space{
			height: 30rpx;
		}
		.cm-top{
			height: 50rpx;
			line-height: 50rpx;
			font-size: 30rpx;
		}
		.cm-mid{
			height: 80rpx;
			line-height: 80rpx;
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		.cm-bom{
			height: 60rpx;
			line-height: 60rpx;
			font-size: 30rpx;
		}
	}
	.ct-btn{
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
