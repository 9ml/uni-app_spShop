<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				我的钱包
			</view>
			<view class="t-right" @tap="goBankCard()">
				银行卡管理
			</view>
		</view>
		<view class="space_nav"></view>
		<view class="mw-all">
			<view class="ma-icon">
				<image src="../../static/icon_qb_qb.png" mode=""></image>
			</view>
			<view class="ma-fonts">
				我的余额
			</view>
			<view class="ma-nums">
				￥{{userWallet}}
			</view>
		</view>
		<view class="btn-all">
			<view class="cz-btn" @tap="addMyWallet()">
				充值
			</view>
			<view class="tx-btn" @tap="cutMyWallet()">
				提现
			</view>
		</view>
		<view class="zd" @tap="goBill()">
			账单明细
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId : uni.getStorageSync('userId'),
				// 账户余额
				userWallet : 0
			}
		},
		onLoad(options) {
			this.userWallet = options.userWallet
		},
		methods: {
			// 账单
			goBill(){
				uni.navigateTo({
					url:"./pillMX"
				})
			},
			// 银行卡
			goBankCard(){
				uni.navigateTo({
					url:"./bankCard"
				})
			},
			// 充值
			addMyWallet(){
				uni.navigateTo({
					url:"./rechargeOfBalance"
				})
			},
			// 提现
			cutMyWallet(){
				uni.navigateTo({
					url:"./moneyTX?moneynum="+this.userWallet
				})
			}
		}
	}
</script>

<style lang="scss">
	.topNav{
		.t-left{
			width: 20%;
			text-align: left;
			padding-left: 20rpx;
		}
		.t-right{
			width: 20%;
			font-size: 24rpx;
			margin-top: 40rpx;
		}
	}
	.mw-all{
		.ma-icon{
			width: 60px;
			height: 60px;
			margin: 50rpx auto 10rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.ma-fonts{
			font-size: 26rpx;
			text-align: center;
		}
		.ma-nums{
			height: 100rpx;
			line-height: 100rpx;
			font-weight: bold;
			font-size: 50rpx;
			text-align: center;
		}
	}
	.btn-all{
		margin-top: 150rpx;
		view{
			width: 250rpx;
			height: 60rpx;
			text-align: center;
			margin: 0 auto;
			line-height: 60rpx;
			font-size: 24rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			border-radius: 10rpx;
			overflow: hidden;
		}
		.cz-btn{
			background-image: url(../../static/icon_cz_qb.png);
			color: #FFFFFF;
		}
		.tx-btn{
			margin-top: 30rpx;
			background-image: url(../../static/icon_tx_qb.png);
			color: #00CB00;
		}
	}
	.zd{
		font-size: 26rpx;
		text-align: center;
		margin-top: 80rpx;
	}
</style>
