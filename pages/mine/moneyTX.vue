<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				余额提现
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="mt-top">
			<view class="mt-left">
				到账银行卡
			</view>
			<view class="mt-right">
				<view class="mr-card">
					建设银行(6699)
				</view>
				<view class="mr-time">
					2小时内到账
				</view>
			</view>
		</view>
		<view class="inp-main">
			<view class="im-space"></view>
			<view class="im-top">
				<view class="it-fonts">
					提现金额
				</view>
				<view class="it-input">
					<input type="text" v-model="drawMoney" placeholder="¥0.00" placeholder-style="color:#000000;" />
				</view>
			</view>
			<view class="im-mid">
				<text class="imm-left">当前余额{{userWallet}}元</text>
				<text class="imm-right" @tap="allTx()">全部提现</text>
			</view>
			<view class="im-bom" @tap="withdraw()">
				确认提现
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId : uni.getStorageSync("userId"),
				drawMoney : "",
				userWallet : 0
			}
		},
		onLoad(options) {
			this.userWallet = options.moneynum
		},
		methods: {
			withdraw(){
				if(this.drawMoney > this.userWallet){
					uni.showToast({
						title:"提现金额不能大于余额哦",
						icon:'none',
						duration:1500
					})
					return false;
				}
				this._Api.doWithdraw({
					userId : this.userId,
					withdratAccount : "",
					money : this.drawMoney
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:"提现成功",
							icon:'none',
							duration:1500
						})
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			allTx(){
				this.drawMoney = this.userWallet
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.mt-top{
		width: 86%;
		margin: 20rpx auto 20rpx;
		display: flex;
		.mt-left{
			height: 50rpx;
			line-height: 50rpx;
			font-size: 28rpx;
		}
		.mt-right{
			margin-left: 30rpx;
			view{
				height: 50rpx;
				line-height: 50rpx;
			}
			.mr-card{
				font-size: 28rpx;
				color: #66779C;
			}
			.mr-time{
				font-size: 26rpx;
				color: #999999;
			}
		}
	}
	.inp-main{
		width: 96%;
		height: 400rpx;
		margin: 20rpx auto 0;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		.im-space{
			height: 40rpx;
		}
		.im-top{
			width: 600rpx;
			height: 100rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid #E4E4E4;
			display: flex;
			text-align: center;
			align-items: center;
			.it-fonts{
				width: 140rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 20rpx;
				color: #333333;
			}
			.it-input{
				width: 320rpx;
				height: 80rpx;
				input{
					width: 100%;
					height: 100%;
					color: #000000;
					font-size: 42rpx;
				}
			}
		}
		.im-mid{
			width: 600rpx;
			height: 60rpx;
			margin: 0 auto;
			line-height: 60rpx;
			font-size: 22rpx;
			.imm-right{
				color: #7584A5;
				margin-left: 10rpx;
			}
		}
		.im-bom{
			width: 300rpx;
			height: 82rpx;
			margin: 40rpx auto;
			background-image: url(../../static/btn_zhuce_zhuce.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			font-size: 30rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 82rpx;
		}
	}
</style>
