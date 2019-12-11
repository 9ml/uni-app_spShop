<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				个人资料
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="pd-item">
			<view class="pi-left">
				头像
			</view>
			<view class="pi-middle">
				点击头像可修改
			</view>
			<view class="pi-rihgt" @tap="updateHeader()">
				<view class="pr-header">
					<image :src="userMain.userImg" mode=""></image>
				</view>
				<view class="pr-icon">
					<image src="../../static/icon_jr_c.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="pd-item" @tap="goUpdateName()">
			<view class="pi-left">
				昵称
			</view>
			<view class="pi-rihgt">
				<view class="pr-header">
					{{userMain.userName}}
				</view>
				<view class="pr-icon">
					<image src="../../static/icon_jr_c.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 用户信息
				userMain : "",
				isWXLogin : false
			}
		},
		onLoad() {
			this.imgUrl = this._Api.imgUrl;
			this.baseUrl = this._Api.baseUrl;
			this.userId = uni.getStorageSync("userId");
			this.getMyInfo();
		},
		methods: {
			getMyInfo(){
				this._Api.getUserInfo({
					id : this.userId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						if(res.data.userImg.indexOf("http") != -1){
							this.isWXLogin = true
						}else{
							res.data.userImg = this.imgUrl + res.data.userImg
						}
						this.userMain = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 修改头像
			updateHeader(){
				if(this.isWXLogin){
					uni.showToast({
						title:"微信登录暂不支持修改头像哦~",
						icon:'none',
						duration:1500
					})
				}else{
					uni.chooseImage({
					    success: (res) => {
					        var paths = res.tempFilePaths[0];
					        uni.uploadFile({
					            url: this.baseUrl + '/userInfo/uploadHeaderImg',
					            filePath: paths,
					            name: 'file',
					            formData: {
									id : this.userId,
									uploadPath : 'header'
					            },
					            success: (res) => {
									let getInfo = JSON.parse(res.data).body.url
									if(res.statusCode === 200){
										this._Api.updateMyHeader({
											id : this.userId,
											userImg : getInfo
										},res=>{
											console.log(res);
											if(res.meta.code === 200){
												this.getMyInfo()
												uni.showToast({
													title:"修改成功",
													icon:"none",
													duration:1500
												})
											}else{
												uni.showToast({
													title:res.msg,
													icon:'none',
													duration:1500
												})
											}
										})
									}else{
										uni.showToast({
											title:res.msg,
											icon:'none',
											duration:1500
										})
									}
					            }
					        });
					    }
					});
				}
			},
			// 修改昵称
			goUpdateName(){
				if(this.isWXLogin){
					uni.showToast({
						title:"微信登录暂不支持修改昵称哦~",
						icon:'none',
						duration:1500
					})
				}else{
					uni.navigateTo({
						url:"./updateName"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F4F4;
	}
	.pd-item{
		width: 94%;
		height: 90rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		margin: 18rpx auto 18rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.pi-left{
			width: 16%;
			text-align: center;
		}
		.pi-middle{
			width: 60%;
			color: #999999;
		}
		.pi-rihgt{
			width: 20%;
			height: 80rpx;
			text-align: right;
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			.pr-header{
				margin: 0 16rpx 10rpx 0;
				image{
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
				}
			}
			.pr-icon{
				image{
					width: 18rpx;
					height: 30rpx;
				}
			}
		}
	}
</style>
