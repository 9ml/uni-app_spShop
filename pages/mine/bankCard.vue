<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				银行卡
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="bc-main" v-for="(c,c_idx) in cardInfo" :key="c_idx">
			<view class="bm-icon">
				<image src="../../static/icon_jsyh.png" mode=""></image>
			</view>
			<view class="bm-fonts">
				<view class="bf-name">
					{{c.cardName}}
				</view>
				<view class="bf-type">
					储蓄卡
				</view>
				<view class="bf-nums">
					****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;8899
				</view>
			</view>
		</view>
		<view class="bc-bom" @tap="goAddBnakCard()">
			<text>+</text> 添加银行卡
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId : uni.getStorageSync("userId"),
				cardInfo : []
			}
		},
		onLoad() {
			this.getInfo();
		},
		methods: {
			getInfo(){
				this._Api.showMyBankInfo({
					userId : this.userId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.cardInfo = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			goAddBnakCard(){
				uni.navigateTo({
					url:"./addBankCardA"
				})
			}
		}
	}
</script>

<style lang="scss">
	.bc-main{
		width: 94%;
		height: 200rpx;
		border-radius: 16rpx;
		margin: 20rpx auto 0;
		overflow: hidden;
		background-color: #004F9C;
		display: flex;
		align-items: center;
		.bm-icon{
			width: 20%;
			text-align: center;
			height: 80rpx;
			image{
				width: 80rpx;
				height: 100%;
			}
		}
		.bm-fonts{
			height: 120rpx;
			view{
				height: 40rpx;
				line-height: 40rpx;
			}
			.bf-name{
				font-size: 26rpx;
				color: #FFFFFF;
			}
			.bf-type{
				font-size: 24rpx;
				color: #E1E1E1;
			}
			.bf-nums{
				font-size: 26rpx;
				color: #FFFFFF;
			}
		}
	}
	.bc-bom{
		width: 90%;
		height: 50rpx;
		font-size: 28rpx;
		color: #999999;
		line-height: 50rpx;
		margin: 0 auto;
		text{
			margin-right: 10rpx;
		}
	}
</style>
