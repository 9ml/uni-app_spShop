<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				修改密码
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<!-- 输入框 -->
		<view class="inp-main">
			<view class="im-left">
				原密码
			</view>
			<view class="im-input">
				<input type="password" v-model="oldPwd" placeholder="请输入原密码" />
			</view>
		</view>
		<view class="inp-main">
			<view class="im-left">
				新密码
			</view>
			<view class="im-input">
				<input type="password" v-model="newPwd" placeholder="请输入新密码" />
			</view>
		</view>
		<view class="inp-main">
			<view class="im-left">
				确认密码
			</view>
			<view class="im-input">
				<input type="password" v-model="newPwds" placeholder="请确认新密码" />
			</view>
		</view>
		<view class="registerBtn" @tap="makeSure()">
			确定
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				oldPwd : '',
				newPwd : '',
				newPwds : '',
				userId : uni.getStorageSync('userId')
			}
		},
		onLoad(options) {
			
		},
		methods: {
			// 确定
			makeSure(){
				if(!this.oldPwd){
					uni.showToast({
						title:"原密码不能为空",
						icon:"none",
						duration:1500
					})
					return false;
				}else if(!this.newPwd){
					uni.showToast({
						title:"新密码不能为空",
						icon:"none",
						duration:1500
					})
					return false;
				}else if(!this.newPwds){
					uni.showToast({
						title:"确认密码不能为空",
						icon:"none",
						duration:1500
					})
					return false;
				}else if(this.newPwd !== this.newPwds){
					uni.showToast({
						title:"两次密码不一致",
						icon:"none",
						duration:1500
					})
					return false;
				}
				this._Api.forgetPwdForOld({
					id : this.userId,
					oldPwd : this.oldPwd,
					newPwd : this.newPwd
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:'密码修改成功',
							icon:'none',
							duration:1500
						})
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/mine/mine'
							})
						}, 1500);
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
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
	.inp-main{
		width: 94%;
		height: 82rpx;
		margin: 16rpx auto 0;
		border-radius: 16rpx;
		position: relative;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		.im-left{
			width: 16%;
			height: 60rpx;
			font-size: 28rpx;
			text-align: center;
			line-height: 60rpx;
		}
		.im-input{
			width: 80%;
			height: 60rpx;
			input{
				width: 100%;
				height: 100%;
				font-size: 28rpx;
			}
		}
		.im-right{
			width: 20%;
			height: 60rpx;
			position: absolute;
			top: 50%;
			margin-top: -30rpx;
			right: 20rpx;
			font-size: 24rpx;
			text-align: center;
			line-height: 60rpx;
			color: #FF584C;
			z-index: 9999;
		}
		.isget{
			color: #666666;
		}
	}
	.tips{
		width: 90%;
		height: 60rpx;
		line-height: 60rpx;
		margin: 0 auto;
		font-size: 26rpx;
		text{
			color: #FF584C;
			margin-left: 20rpx;
		}
	}
	.registerBtn{
		width: 260rpx;
		height: 72rpx;
		margin: 100rpx auto;
		background-image: url(../../static/btn_zhuce_zhuce.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		font-size: 30rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
	}
</style>