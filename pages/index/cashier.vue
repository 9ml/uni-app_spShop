<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				收银台
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="type-item" v-for="(type_item,type_idx) in typeList" :key="type_idx" @tap="chose(type_idx)">
			<view class="type-body">
				<view class="tb-left">
					<view class="tl-icon">
						<image :src="type_item.ticon" mode=""></image>
					</view>
					<view class="tl-name">
						{{type_item.tname}}
					</view>
				</view>
				<view class="tb-right" :class="current === type_idx ? 'ac' : ''"></view>
			</view>
		</view>
		<view class="s-btn" @tap="surePay()">
			确认支付
		</view>
		<!-- <view class="tips">
			支付接口未开通，以下两个按钮为模拟跳转，待支付开通去除
		</view>
		<view class="s-btn" @tap="payDS()">
			(单独购买)支付成功
		</view>
		<view class="s-btn" @tap="payPS()">
			(拼团购买)支付成功
		</view>
		<view class="s-btn" @tap="payF()">
			未支付
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList : [
					{
						tid : 1,
						ticon : '../../static/icon_wx_syt.png',
						tname : '微信支付'
					},
					{
						tid : 2,
						ticon : '../../static/icon_zfb_syt.png',
						tname : '支付宝支付'
					},
					{
						tid : 3,
						ticon : '../../static/icon_ye_xz.png',
						tname : '余额支付'
					},
					
				],
				current : 0,
			}
		},
		onLoad(options){
			this.orderNum = options.orderNum
			// 购买类型
			this.buyType = uni.getStorageSync("buyType")
		},
		methods:{
			chose(idx){
				this.current = idx
			},
			surePay(){
				if(this.current === 0){
					// 微信支付
					this._Api.wxAppPay({
						orderNum : this.orderNum
					},res=>{
						console.log(res);
						if(res.meta.code === 200){
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: res.data,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}
					})
				}else if(this.current === 1){
					// 支付宝支付
					
				}else if(this.current === 2){
					// 余额支付
					this._Api.payForOrder({
						orderNum : this.orderNum,
						payName : this.typeList[this.current].tname
					},res=>{
						console.log(res);
						if(res.meta.code === 200){
							uni.showToast({
								title:"支付成功",
								icon:"none",
								duration:1500
							})
							setTimeout(()=>{
								if(this.buyType == "拼团" || this.buyType == "去拼单"){
									uni.navigateTo({
										url:'./assembleInfo?orderNum='+this.orderNum
									})
								}else{
									uni.navigateTo({
										url:'../mine/orderDFH?orderNum='+this.orderNum
									})
								}
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
			},
			// 单独购买支付成功跳转
			payDS(){
				uni.navigateTo({
					url:'../mine/orderDFH?orderId='+this.orderId
				})
			},
			// 拼团购买支付成功跳转
			payPS(){
				uni.navigateTo({
					url:'./assembleInfo?orderId='+this.orderId
				})
			},
			// 未支付跳转
			payF(){
				uni.navigateTo({
					url:'../mine/orderDFK?orderId='+this.orderId
				})
			}
		}
	}
</script>

<style lang="scss">
	.tips{
		height: 200rpx;
		background-color: #333333;
		text-align: center;
		line-height: 200rpx;
		font-size: 26rpx;
		color: #FFFFFF;
	}
	.type-item{
		border-bottom: 1rpx solid #E4E4E4;
		.type-body{
			width: 90%;
			height: 100rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.tb-left{
				display: flex;
				align-items: center;
				.tl-icon{
					height: 60rpx;
					image{
						width: 60rpx;
						height: 60rpx;
					}
				}
				.tl-name{
					height: 60rpx;
					line-height: 60rpx;
					margin-left: 20rpx;
					font-size: 24rpx;
				}
			}
			.tb-right{
				width: 30rpx;
				height: 30rpx;
				background-image: url(../../static/icon_wx_qx.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			.ac{
				width: 30rpx;
				height: 30rpx;
				background-image: url(../../static/icon_xz_qx.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.s-btn{
		width: 260rpx;
		height: 72rpx;
		margin: 50rpx auto;
		background-image: url(../../static/btn_zhuce_zhuce.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
	}
</style>
