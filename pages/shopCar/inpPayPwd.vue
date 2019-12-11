<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				请输入支付密码
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="content">
			<validcode class="inps" :maxlength="6" :isPwd="true" @finish="getPwd"></validcode>
		</view>
		<view class="payBtn" @tap="goDFH()">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad() {},
		methods: {
			getPwd(val){
				console.log(val);
			},
			goDFH(){
				uni.navigateTo({
					url:'../mine/orderDFH'
				})
			}
		}
	};
</script>

<style lang="scss">
	.content{
		margin-top: 100rpx;
		height: 200rpx;
	}
	.payBtn{
		width: 260rpx;
		height: 72rpx;
		margin: 40rpx auto;
		background-image: url(../../static/btn_zhuce_zhuce.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		font-size: 30rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
	}
</style>
