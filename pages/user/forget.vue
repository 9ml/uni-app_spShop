<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				忘记密码
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
		<view class="inp-main">
			<view class="im-left">
				新密码
			</view>
			<view class="im-input">
				<input type="password" v-model="uPwd" placeholder="请输入新密码" />
			</view>
		</view>
		<view class="inp-main">
			<view class="im-left">
				确认密码
			</view>
			<view class="im-input">
				<input type="password" v-model="uPwds" placeholder="请确认新密码" />
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
				uPhone : '',
				uCode : '',
				uPwd : '',
				uPwds : '',
				getBtn : true,
				getSec : false,
				secends : 60
			}
		},
		onLoad(options) {
			console.log(options);
		},
		methods: {
			// 获取验证码
			getCode(){
				if(!this.uPhone){
					uni.showToast({
						title : "手机号不能为空",
						icon : "none",
						duration : 1500
					})
					return;
				}else if(!(/^1[3456789]\d{9}$/.test(this.uPhone))){
					uni.showToast({
						title : "手机号格式不正确",
						icon : "none",
						duration : 1500
					})
					return;
				}
				this._Api.sendForgetCode({
					userPhone : this.uPhone
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:"发送成功，请注意查收",
							icon:'none',
							duration:1500
						})
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
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 确定
			makeSure(){
				if(!this.uPhone){
					uni.showToast({
						title:"手机号不能为空",
						icon:"none",
						duration:1500
					})
					return false;
				}else if(!(/^1[3456789]\d{9}$/.test(this.uPhone))){
					uni.showToast({
						title:"手机号格式有误",
						icon:"none",
						duration:1500
					})
					return false;
				}else if(!this.uCode){
					uni.showToast({
						title:"验证码不能为空",
						icon:"none",
						duration:1500
					})
					return false;
				}else if(!this.uPwd){
					uni.showToast({
						title:"新密码不能为空",
						icon:"none",
						duration:1500
					})
					return false;
				}else if(!this.uPwds){
					uni.showToast({
						title:"确认密码不能为空",
						icon:"none",
						duration:1500
					})
					return false;
				}else if(this.uPwd !== this.uPwds){
					uni.showToast({
						title:"两次密码不一致",
						icon:"none",
						duration:1500
					})
					return false;
				}
				this._Api.forgetPwdForPhone({
					userPhone : this.uPhone,
					code : this.uCode,
					userPwd : this.uPwd
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:'修改成功，即将跳转登录',
							icon:'none',
							duration:1500
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'./login'
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