<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				绑定手机
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<!-- 输入框 -->
		<view class="inp-main">
			<view class="im-left">
				手机号
			</view>
			<view class="im-input">
				<input type="text" v-model="uPhone" placeholder="请输入手机号" />
			</view>
		</view>
		<view class="inp-main">
			<view class="im-left">
				验证码
			</view>
			<view class="im-input">
				<input type="text" v-model="uCode" placeholder="请输入验证码" />
			</view>
			<view class="im-right" v-if="getBtn" @tap="getCode()">
				获取验证码
			</view>
			<view class="im-right isget" v-if="getSec">
				{{secends}}秒后再试
			</view>
		</view>
		<view class="registerBtn" @tap="sureBind()">
			确认绑定
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				uPhone : '',
				uCode : '',
				getBtn : true,
				getSec : false,
				secends : 60
			}
		},
		onLoad(options) {
			console.log(options)
			this.openId = options.openId
		},
		methods: {
			// 获取验证码
			getCode(){
				this._Api.weChatBindPhoneGetCode({
					userPhone : this.uPhone
				},res=>{
					console.log(res);
					if(res.code === 0){
						uni.showToast({
							title:"发送成功，请注意查收",
							icon:'none',
							duration:1500
						});
						this.getBtn = false
						this.getSec = true
						let secendsFloor = 60
						let secWork = setInterval(()=>{
							secendsFloor --
							this.secends = secendsFloor
							if(secendsFloor == 0){
								clearInterval(secWork);
								this.getBtn = true
								this.getSec = false
							}
						},1000)
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 确认绑定
			sureBind(){
				this._Api.weChatBindPhone({
					openId : this.openId,
					userPhone : this.uPhone,
					code : this.uCode
				},res=>{
					console.log(res)
					if(res.code === 0){
						uni.setStorageSync("userId",res.data)
						// getApp().globalData.userId = res.data
						uni.showToast({
							title:"绑定成功",
							icon:'none',
							duration:1500
						})
						setTimeout(()=>{
							uni.switchTab({
								url:"../index/index"
							})
						},1500)
					}else{
						uni.showToast({
							title:res.msg,
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
		margin: 50rpx auto;
		background-image: url(../../static/btn_zhuce_zhuce.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		font-size: 30rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
	}
</style>