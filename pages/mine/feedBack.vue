<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				意见反馈
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="fb-item">
			<input type="text" v-model="title" placeholder="请输入标题" />
		</view>
		<view class="fb-area">
			<textarea v-model="content" placeholder="请输入反馈内容" />
		</view>
		<view class="fb-phone">
			联系方式
		</view>
		<view class="fb-item bom">
			<input type="text" v-model="userPhone" placeholder="请输入手机号" />
		</view>
		<view class="fb-btn" @tap="makeSureFB()">
			确认反馈
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId : uni.getStorageSync('userId'),
				title : '',
				content : '',
				userPhone : ''
			}
		},
		onLoad() {
			// this.userInfo = getApp().globalData
		},
		methods: {
			makeSureFB(){
				if(!this.title){
					uni.showToast({
						title:"标题不能为空",
						icon:"none",
						duration:1500
					});
					return false;
				}else if(!this.content){
					uni.showToast({
						title:"内容不能为空",
						icon:"none",
						duration:1500
					});
					return false;
				}else if(!this.userPhone){
					uni.showToast({
						title:"手机号不能为空",
						icon:"none",
						duration:1500
					});
					return false;
				}else if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){
					uni.showToast({
						title:"手机号格式有误！",
						icon:"none",
						duration:1500
					})
					return false;
				}
				this._Api.feedBack({
					userId : this.userId,
					title : this.title,
					content : this.content,
					phone : this.userPhone,
				},res=>{
					console.log(res)
					if(res.meta.code === 200){
						uni.showToast({
							title:"反馈成功",
							icon:'none',
							duration:1500
						})
						setTimeout(()=>{
							uni.switchTab({
								url:"./mine"
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
	page{
		background-color: #F5F5F5;
	}
	.fb-item{
		width: 94%;
		height: 78rpx;
		margin: 18rpx auto 18rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		input{
			width: 94%;
			height: 100%;
			margin: 0 auto;
			font-size: 26rpx;
		}
	}
	.fb-area{
		width: 94%;
		height: 200rpx;
		margin: 0 auto;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		textarea{
			width: 94%;
			height: 100%;
			margin: 0 auto;
			font-size: 26rpx;
			padding-top: 10rpx;
		}
	}
	.fb-phone{
		width: 88%;
		height: 60rpx;
		margin: 0 auto;
		line-height: 60rpx;
		font-size: 26rpx;
	}
	.bom{
		margin-top: 0;
	}
	.fb-btn{
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
