<template>
	<view >
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				商品列表
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<!-- 商品列表 -->
		<view class="tjGoodsMain">
			<view class="goodsItem" v-for="(goods_item,goods_idx) in goodsList" :key="goods_idx" @tap="choseGoods(goods_item.id)">
				<view class="goodsImg">
					<image :src="goods_item.goodsMainImg" mode=""></image>
				</view>
				<view class="goodsInfo">
					<view class="goodsName">
						{{goods_item.goodsName}}
					</view>
					<view class="goodsMore">
						<view class="goodsPrice">
							￥{{goods_item.lastPrice}}
						</view>
						<view class="goodsBNums">
							已售{{goods_item.goodsSales}}件
						</view>
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
				// 商品列表
				goodsList : []
			}
		},
		onLoad(options) {
			this.imgUrl = this._Api.imgUrl;
			this.getGoodsInfo(options.categoryId)
		},
		methods: {
			getGoodsInfo(idx){
				this._Api.getAllFLChildGetGoodsInfo({
					categoryId : idx
				},res=>{
					console.log(res)
					if(res.meta.code === 200){
						res.data.forEach((i)=>{
							i.goodsMainImg = this.imgUrl + i.goodsMainImg
							i.lastPrice = this.myTools.countPrice(i.goodsPrice,i.goodsDiscount)
						})
						this.goodsList = res.data
						console.log(this.goodsList)
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			choseGoods(idx){
				this._Api.checkPtGoodsInfo({
					goodsId : idx
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						console.log(res.data.length);
						if(res.data.length === 0){
							uni.navigateTo({
								url:"./goodsInfoNormal?goodsId="+idx
							})
						}else{
							let ptArr = []
							let ptNum = []
							res.data.forEach((i)=>{
								ptArr[ptArr.length] = i.id
								ptNum[ptNum.length] = i.ptSize
							})
							uni.navigateTo({
								url:"./goodsInfo?goodsId="+idx+"&arr="+ptArr+"&num="+ptNum
							})
						}
					}
				});
				// uni.navigateTo({
				// 	url:'/pages/index/goodsInfoNormal?goodsId='+idx
				// })
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F4F4;
	}
	.tjGoodsMain{
		width: 92%;
		margin: 20rpx auto 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		.goodsItem{
			width: 48%;
			height: 460rpx;
			margin-bottom: 24rpx;
			border-radius: 10rpx;
			overflow: hidden;
			box-shadow: 5rpx 5rpx 10rpx #EAEAEA;
			background-color: #FFFFFF;
			.goodsImg{
				width: 100%;
				height: 350rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.goodsInfo{
				height: 110rpx;
				.goodsName{
					width: 96%;
					height: 60rpx;
					margin: 0 auto;
					font-size: 24rpx;
					overflow: hidden;
				}
				.goodsMore{
					width: 96%;
					height: 50rpx;
					margin: 0 auto;
					padding: 0 6rpx 0 6rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 22rpx;
					.goodsPrice{
						color: #FF584C;
					}
					.goodsBNums{
						color: #999999;
					}
				}
			}
		}
	}
</style>
