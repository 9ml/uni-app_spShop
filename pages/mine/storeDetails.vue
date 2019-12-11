<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main"></view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="top-main">
			<view class="tm-logo">
				<image :src="storeInfos.storeAvatar" mode=""></image>
			</view>
			<view class="tm-name">
				{{storeInfos.storeName}}
			</view>
		</view>
		<view class="m-name">
			店铺详情
		</view>
		<view class="b-shops">
			<view class="bs-item" v-for="(sg_item,sg_idx) in storeGoods" :key="sg_idx" @tap="goGoodsInfo(sg_idx)">
				<view class="bi-img">
					<image :src="sg_item.goodsMainImg" mode=""></image>
				</view>
				<view class="bi-name">
					{{sg_item.goodsName}}
				</view>
				<view class="bi-desc">
					<view class="bp-price">
						￥{{sg_item.goodsPrice}}
					</view>
					<view class="bp-nums">
						已拼{{sg_item.goodsSales}}件
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 店铺信息
				storeInfos : '',
				// 店铺商品
				storeGoods : []
			}
		},
		onLoad(options) {
			console.log(options)
			this.storeId = options.storeId
			this.storeName = options.storeName
			this.storeLogo = options.storeLogo
			this.getStoreInfo();
			this.getStoreGoods();
		},
		methods: {
			// 店铺信息
			getStoreInfo(){
				this._Api.getStoreInfo({
					storeId : this.storeId
				},res=>{
					console.log(res);
					if(res.code === 0){
						this.storeInfos = res.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 店铺商品
			getStoreGoods(){
				this._Api.storeGoods({
					storeId : this.storeId
				},res=>{
					console.log(res)
					if(res.code === 0){
						this.storeGoods = res.data
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none",
							duration:1500
						})
					}
				})
			},
			// 跳转商品信息
			goGoodsInfo(idx){
				uni.navigateTo({
					url:"../index/goodsInfo?goodsId="+this.storeGoods[idx].goodsId
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F1F1F1;
	}
	.top-main{
		height: 200rpx;
		.tm-logo{
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			overflow: hidden;
			margin: 20rpx auto 0;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.tm-name{
			height: 60rpx;
			line-height: 60rpx;
			font-size: 30rpx;
			text-align: center;
		}
	}
	.m-name{
		width: 90%;
		height: 60rpx;
		margin: 0 auto;
		font-size: 26rpx;
	}
	.b-shops{
		width: 90%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.bs-item{
			width: 30%;
			box-shadow: 5rpx 5rpx 10rpx #C0C0C0;
			margin: 0 30rpx 30rpx 0;
			overflow: hidden;
			border-radius: 16rpx;
			background-color: #FFFFFF;
			height: 290rpx;
			.bi-img{
				width: 94%;
				height: 180rpx;
				margin: 0 auto;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.bi-name{
				width: 94%;
				height: 60rpx;
				margin: 0 auto;
				font-size: 20rpx;
				overflow: hidden;
			}
			.bi-desc{
				width: 94%;
				height: 50rpx;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.bp-price{
					font-size: 22rpx;
					color: #FF584C;
				}
				.bp-nums{
					font-size: 18rpx;
					color: #808080;
				}
			}
		}
	}
	.bs-item:nth-child(3),
	.bs-item:nth-child(6),
	.bs-item:nth-child(9),
	.bs-item:nth-child(12),
	.bs-item:nth-child(15),
	.bs-item:nth-child(18),
	.bs-item:nth-child(21){
		margin-right: 0 !important;
	}
</style>
