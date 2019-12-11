<template>
	<view>
		<view class="topBg">
			<image src="../../static/bg_dneglv.png" mode=""></image>
		</view>
		<view class="space_top"></view>
		<view class="choseItem">
			<view class="pwdName" v-for="(nItem,nIdx) in choseList" @tap="changeItem(nIdx)" :class="current === nIdx ? 'ac' : ''" :key="nIdx">
				{{nItem.name}}
			</view>
		</view>
		<!-- 密码登录 -->
		<view class="logins" v-show="current === 0">
			<view class="space_inp"></view>
			<view class="inp-item">
				<input type="text" v-model="uPhone" placeholder="请输入手机号" />
			</view>
			<view class="inp-item">
				<input type="password" v-model="uPwd" placeholder="请输入密码" />
			</view>
			<view class="chose-item">
				<navigator url="./registe">立即注册</navigator>
				<navigator url="./forget">忘记密码</navigator>
			</view>
			<view class="loginBtn" @tap="pwdLogin()">
				登录
			</view>
		</view>
		<!-- 验证码登录 -->
		<view class="logins" v-show="current === 1">
			<view class="space_inp"></view>
			<view class="inp-item">
				<input type="text" v-model="uPhone" placeholder="请输入手机号" />
			</view>
			<view class="inp-item">
				<input type="text" v-model="uCode" placeholder="请输入验证码" />
				<view class="getCode" v-if="getBtn" @tap="getCode()">
					获取验证码
				</view>
				<view class="getCode isget" v-if="getSec">
					{{secends}}秒后再试
				</view>
			</view>
			<view class="chose-item"></view>
			<view class="loginBtn" @tap="codeLogin()">
				登录
			</view>
		</view>
		<view class="otherType">
			<view class="otName">
				<view class="lines"></view>
				<view class="fonts">
					快速登录
				</view>
				<view class="lines"></view>
			</view>
			<view class="otIcon" @tap="wxLogin()">
				<image src="../../static/btn_weixi.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				choseList : [
					{
						typeId : 1,
						name : '密码登录'
					},
					{
						typeId : 2,
						name : '验证码登录'
					}
				],
				current : 0,
				uPhone : '',
				uPwd : '',
				uCode : '',
				getBtn : true,
				getSec : false,
				secends : 60,
			}
		},
		onLoad() {
			this.goodsId = uni.getStorageSync("goodsId");
			this.ptInfoTableId = uni.getStorageSync("ptInfoTableId");
			this.ptGoodsTableId = uni.getStorageSync("ptGoodsTableId");
			console.log(this.goodsId);
		},
		methods: {
			changeItem(nIdx){
				this.current = nIdx
			},
			// 密码登录
			pwdLogin(){
				if(!this.uPhone){
					uni.showToast({
						title:"手机号不能为空！",
						icon:"none",
						duration:1500
					})
					return;
				}else if(!(/^1[3456789]\d{9}$/.test(this.uPhone))){
					uni.showToast({
						title:"手机号格式有误！",
						icon:"none",
						duration:1500
					})
					return;
				}else if(!this.uPwd){
					uni.showToast({
						title:"密码不能为空！",
						icon:"none",
						duration:1500
					})
					return;
				}
				this._Api.phonePwdLogin({
					userPhone : this.uPhone,
					userPwd : this.uPwd
				},res=> {
					console.log(res);
					if(res.meta.code === 200){
						// getApp().globalData.userId = res.data
						uni.setStorageSync("userId",res.data)
						uni.showToast({
							title:"登录成功",
							icon:'none',
							duration:1500
						});
						if(!this.goodsId || this.goodsId === 0){
							setTimeout(()=>{
								uni.switchTab({
									url:'../index/index'
								});
							},1500)
						}else if(this.goodsId !== "" && this.goodsId !== 0){
							setTimeout(()=>{
								uni.reLaunch({
									url:'/pages/index/goodsInfoCT?goodsId='+this.goodsId+"&ptInfoTableId="+this.ptInfoTableId+"&ptGoodsTableId="+this.ptGoodsTableId
								});
							},1500)
						}
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 获取验证码
			getCode(){
				if(!this.uPhone){
					uni.showToast({
						title:"手机号不能为空！",
						icon:"none",
						duration:1500
					})
					return;
				}else if(!(/^1[3456789]\d{9}$/.test(this.uPhone))){
					uni.showToast({
						title:"手机号格式不正确！",
						icon:"none",
						duration:1500
					})
					return;
				}
				this._Api.getLoginCode({
					userPhone : this.uPhone
				},res=>{
					// console.log(res)
					if(res.meta.code === 200){
						uni.showToast({
							title:"发送成功，请注意查收",
							icon:"none",
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
							icon:"none",
							duration:1500
						})
					}
				})
			},
			// 验证码登录
			codeLogin(){
				if(!this.uPhone){
					uni.showToast({
						title:"手机号不能为空！",
						icon:"none",
						duration:2000
					})
					return;
				}else if(!(/^1[3456789]\d{9}$/.test(this.uPhone))){
					uni.showToast({
						title:"手机号格式有误！",
						icon:"none",
						duration:2000
					})
					return;
				}else if(!this.uCode){
					uni.showToast({
						title:"验证码不能为空！",
						icon:"none",
						duration:2000
					})
					return;
				}
				this._Api.phoneCodeLogin({
					userPhone : this.uPhone,
					code : this.uCode
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.setStorageSync("userId",res.data)
						uni.showToast({
							title:"登录成功",
							icon:'none',
							duration:1500
						});
						if(!this.goodsId || this.goodsId === 0){
							setTimeout(()=>{
								uni.switchTab({
									url:'../index/index'
								});
							},1500)
						}else if(this.goodsId !== "" && this.goodsId !== 0){
							setTimeout(()=>{
								uni.reLaunch({
									url:'/pages/index/goodsInfoCT?goodsId='+this.goodsId+"&ptInfoTableId="+this.ptInfoTableId+"&ptGoodsTableId="+this.ptGoodsTableId
								});
							},1500)
						}
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 微信登录
			wxLogin(){
				uni.login({
					provider: 'weixin',
					scopes : 'auth_user',
					success: (res)=> {
						console.log(res);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: (infoRes)=> {
								console.log(infoRes);
								this._Api.weChatLogin({
									openId : infoRes.userInfo.openId,
									wxName : infoRes.userInfo.nickName,
									wxImg : infoRes.userInfo.avatarUrl,
									inviteCode : ""
								},res=>{
									console.log(res);
									if(res.meta.code === 200){
										uni.setStorageSync("userId",res.data);
										uni.showToast({
											title:"登录成功",
											icon:'none',
											duration:1500
										});
										if(!this.goodsId || this.goodsId === 0){
											setTimeout(()=>{
												uni.switchTab({
													url:'../index/index'
												});
											},1500)
										}else if(this.goodsId !== "" && this.goodsId !== 0){
											setTimeout(()=>{
												uni.reLaunch({
													url:'/pages/index/goodsInfoCT?goodsId='+this.goodsId+"&ptInfoTableId="+this.ptInfoTableId+"&ptGoodsTableId="+this.ptGoodsTableId
												});
											},1500)
										}
									}else{
										uni.showToast({
											title:res.meta.msg,
											icon:'none',
											duration: 1500
										})
									}
								})
							}
						});
					},
					fail: error => {
						uni.showModal({
							title: '提示',
							content: '微信登陆发生了错误',
							success: (data) => {
								console.log(data);
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.topBg{
		width: 100%;
		height: 400rpx;
		position: fixed;
		top: 0;
		z-index: -1;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.space_top{
		height: 150rpx;
	}
	.choseItem{
		width: 60%;
		height: 60rpx;
		margin-left: 36rpx;
		display: flex;
		align-items: center;
		font-size: 34rpx;
		font-weight: bold;
		color: #FFFFFF;
		.pwdName{
			height: 50rpx;
			line-height: 50rpx;
			margin-right: 60rpx;
		}
		.ac{
			border-bottom: 6rpx solid #FFFFFF;
		}
	}
	.logins{
		width: 670rpx;
		height: 460rpx;
		background-color: #FFFFFF;
		margin: 30rpx auto;
		border-radius: 30rpx;
		box-shadow: 5rpx 5rpx 10rpx #F8F8F8;
		.space_inp{
			height: 10rpx;
		}
		.inp-item{
			width: 600rpx;
			height: 60rpx;
			margin: 30rpx auto 0;
			position: relative;
			border-bottom: 2rpx solid #E5E5E5;
			input{
				width: 100%;
				height: 100%;
				font-size: 26rpx;
				padding-left: 6rpx;
			}
			.getCode{
				width: 30%;
				height: 60rpx;
				font-size: 24rpx;
				color: #FF584C;
				position: absolute;
				text-align: center;
				top: 50%;
				margin-top: -30rpx;
				right: 0;
				z-index: 9999;
			}
			.isget{
				color: #666666;
			}
		}
		.chose-item{
			width: 590rpx;
			height: 60rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 26rpx;
			color: #666666;
		}
		.loginBtn{
			width: 300rpx;
			height: 80rpx;
			margin: 40rpx auto;
			color: #FFFFFF;
			font-size: 30rpx;
			line-height: 80rpx;
			text-align: center;
			background-image: url(../../static/btn_zhuce_zhuce.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
	}
	.otherType{
		height: 160rpx;
		margin-top: 200rpx;
		.otName{
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.lines{
				width: 120rpx;
				height: 2rpx;
				background-color: #E5E5E5;
			}
			.fonts{
				font-size: 24rpx;
				color: #666666;
				margin: 0 30rpx 0 30rpx;
			}
		}
		.otIcon{
			width: 92rpx;
			height: 92rpx;
			margin: 0 auto;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
