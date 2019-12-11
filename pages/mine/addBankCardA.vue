<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				添加银行卡
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="abc-top">
			<text class="at-fonts">银行卡类型</text>
			<text class="at-type">建设银行</text>
		</view>
		<view class="inp-main">
			<view class="im-item">
				<view class="ii-left">
					持卡人
				</view>
				<view class="ii-mid">
					<input type="text" v-model="userName" placeholder="请输入持卡人姓名" />
				</view>
				<view class="ii-right">
					<image src="../../static/icon_ckr_tj.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="inp-main">
			<view class="im-item">
				<view class="ii-left">
					卡号
				</view>
				<view class="ii-mid">
					<input type="text" v-model="userCode" placeholder="请输入银行卡号" />
				</view>
				<view class="ii-right">
					<image src="../../static/icon_gb_tj.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="abc-btn" @tap="nextTap()">
			下一步
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId : uni.getStorageSync("userId"),
				userName : "",
				userCode : ""
			}
		},
		methods: {
			nextTap(){
				if(!this.userName){
					uni.showToast({
						title:"持卡人姓名不能为空",
						icon:'none',
						duration:1500
					})
					return false;
				}else if(!this.userCode){
					uni.showToast({
						title:"银行卡号不能为空",
						icon:'none',
						duration:1500
					})
					return false;
				}
				// else if(!(/^1[3456789]\d{9}$/.test(this.bindPhone))){
				// 	uni.showToast({
				// 		title:"银行卡号格式不正确",
				// 		icon:'none',
				// 		duration:1500
				// 	})
				// 	return false;
				// }
				uni.navigateTo({
					url:"./addBankCardB?userName="+this.userName+"&userCode="+this.userCode
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
		font-size: 28rpx;
		line-height: 60rpx;
		margin: 0 auto;
		.at-type{
			margin-left: 26rpx;
			color: #576B95;
		}
	}
	.inp-main{
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #F1F1F1;
		.im-item{
			width: 90%;
			height: 90rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			.ii-left{
				width: 16%;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 26rpx;
			}
			.ii-mid{
				width: 70%;
				height: 60rpx;
				input{
					width: 100%;
					height: 100%;
					font-size: 26rpx;
				}
			}
			.ii-right{
				width: 14%;
				text-align: right;
				height: 60rpx;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-top: 10rpx;
				}
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
