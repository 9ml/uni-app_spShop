<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				填写银行卡
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="abc-top">
			请选择银行卡类型
		</view>
		<view class="abc-inp">
			<view class="ai-main">
				<view class="am-left">
					银行
				</view>
				<view class="am-right">
					<input type="text" v-model="bankName" placeholder="请选择所属银行" />
				</view>
			</view>
		</view>
		<view class="abc-inp">
			<view class="ai-main">
				<view class="am-left">
					手机号
				</view>
				<view class="am-right">
					<input type="text" v-model="bindPhone" placeholder="请输入银行预约手机号" />
				</view>
			</view>
		</view>
		<view class="abc-inp">
			<view class="ai-main">
				<view class="am-left">
					验证码
				</view>
				<view class="am-right">
					<input type="text" v-model="phoneCode" placeholder="请输入手机验证码" />
				</view>
				<view class="am-get" @tap="getCode()" v-if="get">
					获取验证码
				</view>
				<view class="am-get am-got" v-if="got">
					请{{seconds}}秒后再试
				</view>
			</view>
		</view>
		<view class="abc-btn" @tap="bindCard()">
			绑定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId : uni.getStorageSync("userId"),
				bankName : "",
				bindPhone : "",
				phoneCode : "",
				get : true,
				got : false,
				seconds : 60
			}
		},
		onLoad(options) {
			this.userName = options.userName
			this.userCode = options.userCode
		},
		methods: {
			// 获取验证码
			getCode(){
				if(!this.bindPhone){
					uni.showToast({
						title:"手机号不能为空",
						icon:'none',
						duration:1500
					})
					return false;
				}else if(!(/^1[3456789]\d{9}$/.test(this.bindPhone))){
					uni.showToast({
						title:"手机号格式不正确",
						icon:'none',
						duration:1500
					})
					return false;
				}
				this._Api.sendBankCode({
					userPhone : this.bindPhone
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:"验证码发送成功，请注意查收",
							icon:'none',
							duration:1500
						})
						this.get = false
						this.got = true
						let timer = setInterval(()=>{
							this.seconds --
							if(this.seconds === 0){
								this.get = true
								this.got = false
								this.seconds = 60
								clearInterval(timer);
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
			bindCard(){
				this._Api.addBankInfo({
					userId : this.userId,
					cardholder : this.userName,
					cardNum : this.userCode,
					cardName : this.bankName,
					cardPhone : this.bindPhone,
					code : this.phoneCode
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:"绑定成功",
							icon:'none',
							duration:1500
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:'./bankCard'
							})
						},1500)
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
		background-color: #F5F5F5;
	}
	.abc-top{
		width: 90%;
		height: 60rpx;
		margin: 0 auto;
		line-height: 60rpx;
		font-size: 26rpx;
	}
	.abc-inp{
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #F1F1F1;
		.ai-main{
			width: 90%;
			height: 90rpx;
			margin: 0 auto;
			position: relative;
			display: flex;
			align-items: center;
			.am-left{
				width: 16%;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 26rpx;
			}
			.am-right{
				width: 84%;
				height: 60rpx;
				input{
					width: 100%;
					height: 100%;
					font-size: 26rpx;
				}
			}
			.am-get{
				height: 60rpx;
				line-height: 60rpx;
				font-size: 24rpx;
				color: #FF584C;
				position: absolute;
				right: 0;
				top: 50%;
				margin-top: -30rpx;
				z-index: 999;
			}
			.am-got{
				color: #999999;
			}
		}
	}
	.abc-btn{
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
