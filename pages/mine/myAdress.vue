<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				我的收货地址
			</view>
			<view class="t-right" @tap="addNew()">
				添加收货地址
			</view>
		</view>
		<view class="space_nav"></view>
		<view class="ma-item" v-for="(adress_item,adress_idx) in adressList" :key="adress_idx">
			<view class="mi-left">
				<image src="../../static/icon_tx_zl.png" mode=""></image>
			</view>
			<view class="mi-middle" @tap="choseThisAdress(adress_item.id)">
				<view class="mm-top">
					<text class="mt-name">{{adress_item.consigneeName}}</text>
					<text class="mt-phone">{{adress_item.consigneePhone}}</text>
				</view>
				<view class="mm-bom">
					{{adress_item.consigneeAddress}}
				</view>
			</view>
			<view class="mi-right" @tap="update(adress_item.id)">
				编辑
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId : uni.getStorageSync('userId'),
				adressList:[]
			}
		},
		onLoad(options){
			this.choseAdressType = uni.getStorageSync("choseAdressType");
			console.log(this.choseAdressType);
			this.getUserAllAdress();
		},
		methods: {
			// 所有收货地址
			getUserAllAdress(){
				this._Api.getUserAllAdreses({
					userId : this.userId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.adressList = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 添加
			addNew(){
				uni.navigateTo({
					url:"./addAdress"
				})
			},
			// 修改
			update(id){
				uni.navigateTo({
					url:"./updateAdress?consigneeId="+id
				})
			},
			// 选择
			choseThisAdress(idx){
				uni.setStorageSync("consigneeId",idx)
				if(this.choseAdressType === 0){
					uni.navigateTo({
						url:"../index/submitOrder"
					})
				}else if(this.choseAdressType === 1){
					uni.navigateTo({
						url:"../index/submitOrderCT"
					})
				}else if(this.choseAdressType === 2){
					uni.navigateTo({
						url:"../index/submitOrderPT"
					})
				}else if(this.choseAdressType === 3){
					uni.navigateTo({
						url:"../index/submitOrderShopCar"
					})
				}else{
					
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F4F4;
	}
	.topNav{
		.t-left{
			width: 20%;
			text-align: left;
			padding-left: 20rpx;
		}
		.t-right{
			width: 20%;
			font-size: 24rpx;
			margin-top: 40rpx;
		}
	}
	.ma-item{
		width: 94%;
		height: 150rpx;
		margin: 18rpx auto 18rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		.mi-left{
			width: 12%;
			height: 80rpx;
			text-align: center;
			image{
				width: 50rpx;
				height: 50rpx;
				margin-top: 15rpx;
			}
		}
		.mi-middle{
			width: 76%;
			height: 80rpx;
			view{
				height: 40rpx;
				line-height: 40rpx;
				overflow: hidden;
			}
			.mm-top{
				.mt-name{
					font-size: 28rpx;
				}
				.mt-phone{
					margin-left: 20rpx;
					font-size: 22rpx;
					color: #999999;
				}
			}
			.mm-bom{
				font-size: 24rpx;
			}
		}
		.mi-right{
			width: 12%;
			height: 60rpx;
			border-left: 1rpx solid #999999;
			font-size: 26rpx;
			text-align: center;
			line-height: 60rpx;
		}
	}
</style>
