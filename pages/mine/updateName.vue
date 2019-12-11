<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				修改昵称
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="un-main">
			<input type="text" v-model="userName" placeholder="请输入你要修改的昵称">
		</view>
		<view class="un-ts">
			请输入3-40个字符，可由中英文、数字组成
		</view>
		<view class="un-btn" @tap="makeSure()">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId : uni.getStorageSync('userId'),
				// 用户名
				userName : ''
			}
		},
		onLoad() {
			// this.userInfo = getApp().globalData
		},
		methods: {
			makeSure(){
				this._Api.updateMyName({
					userName : this.userName,
					id : this.userId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:"修改成功",
							icon:"none",
							duration:1500
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:"./personalData"
							})
						},1500)
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:"none",
							duration:1500
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F4F4;
	}
	.un-main{
		width: 94%;
		height: 80rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 18rpx auto 10rpx;
		input{
			width: 100%;
			height: 100%;
			text-align: center;
			font-size: 26rpx;
		}
	}
	.un-ts{
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 26rpx;
		color: #999999;
	}
	.un-btn{
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
