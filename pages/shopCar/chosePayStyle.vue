<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				选择付款方式
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="chose-main">
			<view class="cm-body">
				<view class="cb-icon">
					<image src="../../static/icon_ye_xz.png" mode=""></image>
				</view>
				<view class="cb-fonts">
					账户余额(￥100.00)
				</view>
			</view>
		</view>
		<view class="chose-main">
			<view class="cm-body">
				<view class="cb-icon">
					<image src="../../static/icon_wx_xz.png" mode=""></image>
				</view>
				<view class="cb-fonts">
					微信支付
				</view>
			</view>
		</view>
		<view class="chose-main">
			<view class="cm-body">
				<view class="cb-icon">
					<image src="../../static/icon_zfb_zx.png" mode=""></image>
				</view>
				<view class="cb-fonts">
					支付宝支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.chose-main{
		height: 100rpx;
		border-bottom: 1rpx solid #E4E4E4;
		.cm-body{
			width: 90%;
			height: 100rpx;
			display: flex;
			align-items: center;
			margin: 0 auto;
			.cb-icon{
				height: 80rpx;
				image{
					width: 80rpx;
					height: 80rpx;
				}
			}
			.cb-fonts{
				height: 80rpx;
				line-height: 80rpx;
				font-size: 26rpx;
				margin-left: 20rpx;
			}
		}
	}
</style>
