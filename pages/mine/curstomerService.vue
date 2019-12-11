<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				客服
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="cs-item" @tap="goTalkWith()">
			<view class="ci-left">
				<view class="cl-icon"></view>
				<view class="cl-fonts">
					<text class="cf-name">
						在线客服
					</text>
					<text class="cf-desc">
						立即咨询
					</text>
				</view>
			</view>
			<view class="ci-right">
				<image src="../../static/icon_jr.png" mode=""></image>
			</view>
		</view>
		<view class="cs-item">
			<view class="ci-left">
				<view class="cl-icon"></view>
				<view class="cl-fonts">
					<text class="cf-name">
						电话客服
					</text>
					<text class="cf-desc">
						{{CSPhoneNum.servicePhone}}
					</text>
				</view>
			</view>
			<view class="ci-right">
			</view>
		</view>
		<web-view v-if="isGoCurstomer" src="https://chat.mqimg.com/dist/standalone.html?eid=170899"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 客服电话
				CSPhoneNum : '',
				isGoCurstomer : false
			}
		},
		onLoad() {
			this.getCSPhone();
		},
		methods: {
			// 客服电话
			getCSPhone(){
				this._Api.getCSphoneNum({},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.CSPhoneNum = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 在线客服
			goTalkWith(){
				// uni.navigateTo({
				// 	url:'./onlineTalk'
				// })
				this.isGoCurstomer = true
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F4F4;
	}
	.cs-item{
		width: 94%;
		height: 80rpx;
		background-color: #FFFFFF;
		margin: 18rpx auto 18rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.ci-left{
			display: flex;
			margin-left: 20rpx;
			align-items: center;
			.cl-icon{
				width: 18rpx;
				height: 18rpx;
				border-radius: 50%;
				background-color: #00FF00;
			}
			.cl-fonts{
				margin-left: 20rpx;
				font-size: 24rpx;
				.cf-desc{
					margin-left: 20rpx;
					color: #666666;
				}
			}
		}
		.ci-right{
			width: 16rpx;
			margin-right: 20rpx;
			height: 60rpx;
			image{
				width: 16rpx;
				height: 24rpx;
			}
		}
	}
</style>
