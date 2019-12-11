<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left">
			</view>
			<view class="t-main">
				<view class="space_tm"></view>
				<view class="tm-main" @tap="goSearch()">
					<view class="tm-icon">
						<image src="../../static/icon_ss.png" mode=""></image>
					</view>
					<view class="tm-inp">
						<input type="text" placeholder="搜索商品" />
					</view>
				</view>
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<!-- 轮播图 -->
		<view class="banner">
			<swiper class="swiper" autoplay="true" interval="3000" indicator-dots="true" indicator-color="#999999" indicator-active-color="#FA6400" duration="500">
			    <swiper-item v-for="(banner_item,banner_idx) in bannerList" :key="banner_idx" @tap="choseBanner(banner_item.mgltGoodsInfo.id)">
			        <image :src="banner_item.advertImg" mode=""></image>
			    </swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="kinds">
			<view class="k-items" v-for="(kinds_item,kinds_idx) in kindsList" :key="kinds_idx" @tap="choseKinds(kinds_idx)">
				<view class="ki-icon">
					<image :src="kinds_item.categoryImg" mode=""></image>
				</view>
				<view class="ki-fonts">
					{{kinds_item.name}}
				</view>
			</view>
			<view class="k-items" @tap="choseKinds(7)">
				<view class="ki-icon">
					<image src="../../static/btn_gd.png" mode=""></image>
				</view>
				<view class="ki-fonts">
					更多
				</view>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="tjGoods">
			<view class="tg-icon">
				<image src="../../static/icon_zuo.png" mode=""></image>
			</view>
			<view class="tg-font">
				推荐商品
			</view>
			<view class="tg-icon">
				<image src="../../static/icon_you.png" mode=""></image>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="tjGoodsMain">
			<view class="goodsItem" v-for="(goods_item,goods_idx) in goodsList" :key="goods_idx" @tap="choseGoods(goods_item.goodsId)">
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
				// 轮播图
				bannerList : [],
				// 分类
				kindsList : [],
				// 推荐商品
				goodsList : [],
				baseUrl : ""
			}
		},
		onLoad() {
			// 页面加载调用
			this.bannerImg();
			this.allKinds();
			this.recommendShops();
			this.imgUrl = this._Api.imgUrl;
		},
		methods: {
			// 搜索跳转
			goSearch(){
				uni.navigateTo({
					url:"./search"
				})
			},
			// 轮播图
			bannerImg(){
				this._Api.getBanner({},res=> {
					console.log(res);
					if(res.meta.code === 200){
						res.data.forEach((i)=>{
							i.advertImg = this.imgUrl + i.advertImg
						})
						this.bannerList = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 点击轮播图
			choseBanner(goodsId){
				console.log(goodsId)
				this._Api.checkPtGoodsInfo({
					goodsId : goodsId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						console.log(res.data.length);
						if(res.data.length === 0){
							uni.navigateTo({
								url:"./goodsInfoNormal?goodsId="+goodsId
							})
						}else{
							let ptArr = []
							let ptNum = []
							res.data.forEach((i)=>{
								ptArr[ptArr.length] = i.id
								ptNum[ptNum.length] = i.ptSize
							})
							uni.navigateTo({
								url:"./goodsInfo?goodsId="+goodsId+"&arr="+ptArr+"&num="+ptNum
							})
						}
					}
				});
				// uni.navigateTo({
				// 	url:'./goodsInfo?goodsId='+goodsId
				// })
			},
			// 分类
			allKinds(){
				this._Api.allKinds({},res=> {
					// console.log(res);
					if(res.meta.code === 200){
						res.data.forEach((i)=>{
							i.categoryImg = this.imgUrl + i.categoryImg
						})
						this.kindsList = res.data;
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 分类跳转
			choseKinds(idx){
				uni.navigateTo({
					url:"./classificationDesc?idx="+idx
				})
			},
			// 推荐商品
			recommendShops(){
				this._Api.recommendShops({},res=> {
					// console.log(res);
					if(res.meta.code === 200){
						res.data.forEach((i)=>{
							i.goodsMainImg = this.imgUrl + i.goodsMainImg
							i.lastPrice = this.myTools.countPrice(i.goodsPrice,i.goodsDiscount);
						})
						this.goodsList = res.data;
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 商品跳转
			choseGoods(goodsId){
				this._Api.checkPtGoodsInfo({
					goodsId : goodsId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						console.log(res.data.length);
						if(res.data.length === 0){
							uni.navigateTo({
								url:"./goodsInfoNormal?goodsId="+goodsId
							})
						}else{
							let ptArr = []
							let ptNum = []
							res.data.forEach((i)=>{
								ptArr[ptArr.length] = i.id
								ptNum[ptNum.length] = i.ptSize
							})
							uni.navigateTo({
								url:"./goodsInfo?goodsId="+goodsId+"&arr="+ptArr+"&num="+ptNum
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.topNav{
		.t-left,
		.t-right{
			width: 0;
		}
		.t-main{
			width: 710rpx;
			height: 80rpx;
			.space_tm{
				height: 24rpx;
			}
			.tm-main{
				width: 100%;
				height: 60rpx;
				border-radius: 30rpx;
				display: flex;
				align-items: center;
				background-color: #E5E5E5;
				.tm-icon{
					width: 10%;
					text-align: center;
					height: 40rpx;
					image{
						width: 40rpx;
						height: 40rpx;
					}
				}
				.tm-inp{
					width: 90%;
					height: 50rpx;
					input{
						width: 100%;
						height: 100%;
						text-align: left;
						font-size: 26rpx;
					}
				}
			}
		}
	}
	.banner{
		width: 96%;
		height: 350rpx;
		margin: 10rpx auto 0;
		overflow: hidden;
		border-radius: 20rpx;
		.swiper{
			width: 100%;
			height: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.kinds{
		width: 94%;
		height: 320rpx;
		margin: 20rpx auto 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.k-items{
			width: 22%;
			height: 140rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			.ki-icon{
				width: 100%;
				height: 80rpx;
				text-align: center;
				image{
					width: 80rpx;
					height: 100%;
				}
			}
			.ki-fonts{
				width: 100%;
				height: 40rpx;
				line-height: 40rpx;
				font-size: 26rpx;
				text-align: center;
				color: #666666;
			}
		}
	}
	.tjGoods{
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.tg-icon{
			width: 60rpx;
			height: 60rpx;
			image{
				width: 100%;
				height: 16rpx;
			}
		}
		.tg-font{
			font-size: 30rpx;
			margin: 0 16rpx 0 16rpx;
		}
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