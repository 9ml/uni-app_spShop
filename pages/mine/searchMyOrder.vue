<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				<view class="space_tm"></view>
				<view class="tm-main">
					<view class="tm-icon">
						<image src="../../static/icon_ss.png" mode=""></image>
					</view>
					<view class="tm-inp">
						<input type="text" focus v-model="searchMain" placeholder="搜索订单" />
					</view>
				</view>
			</view>
			<view class="t-right" @tap="search()">
				<view class="space_tm"></view>
				搜索
			</view>
		</view>
		<view class="space_nav"></view>
		<view class="qb-main">
			<view class="qm-item" v-for="(i,i_idx) in searchRes" :key="i_idx">
				<view class="qi-title">
					<view class="qt-gType">
						{{i.orderStatus}}
					</view>
				</view>
				<view class="qi-goods">
					<view class="qg-img" @tap="goGoodsInfo(i.goodsId)">
						<image :src="i.goodsMainImg" mode=""></image>
					</view>
					<view class="qg-name" @tap="goGoodsInfo(i.goodsId)">
						<view class="qn-name">
							{{i.goodsName}}
						</view>
						<view class="qn-sh" v-if="i.isSHCN">
							仅退款，退款成功
						</view>
					</view>
					<view class="qg-price" @tap="goGoodsInfo(i.goodsId)">
						<view class="qp-price">
							￥{{i.lastPrice}}
						</view>
						<view class="qp-nums">
							X{{i.goodsAmount}}
						</view>
					</view>
					<view class="qg-btn">
						<view class="qb-ck" v-if="i.isWL" @tap="goWL(i.logisticsCode)">
							查看物流
						</view>
						<view class="qb-zf" v-if="i.isZF" @tap="goPay(i.orderNum)">
							立即支付
						</view>
						<view class="qb-zf" v-if="i.isDFHXQ" @tap="goDFH(i.orderNum)">
							订单详情
						</view>
						<view class="qb-zf" v-if="i.isSH" @tap="goDSH(i.orderNum)">
							确认收货
						</view>
						<view class="qb-zf" v-if="i.isTk" @tap="goTk(i.orderGoodsId)">
							退款
						</view>
						<view class="qb-zf" v-if="i.isPJ" @tap="goPJ(i.orderGoodsId)">
							去评价
						</view>
						<view class="qb-zf" v-if="i.isSHXQ" @tap="goSH(i.orderGoodsId)">
							查看详情
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
				userId : uni.getStorageSync('userId'),
				searchMain : "",
				searchRes : []
			}
		},
		onLoad() {
			this.imgUrl = this._Api.imgUrl
		},
		methods: {
			// 点击搜索
			search(){
				this._Api.likeSearchOrderInfo({
					userId : this.userId,
					keyWord : this.searchMain
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						res.data.forEach((i)=>{
							i.goodsMainImg = this.imgUrl + i.goodsMainImg
							i.lastPrice = i.orderAmount / i.goodsAmount
							if(i.orderStatus === "待付款"){
								i.isZF = true
							}else if(i.orderStatus === "待发货"){
								i.isDFHXQ = true
							}else if(i.orderStatus === "待收货"){
								i.isWL = true
								i.isSH = true
							}else if(i.orderStatus === "已完成"){
								i.isWL = true
								i.isTk = true
							}else if(i.orderStatus === "待评价"){
								i.isPJ = true
							}else if(i.orderStatus === "售后"){
								i.isSHXQ = true
								i.isSHCN = true
							}
						})
						this.searchRes = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 跳转
			// 支付
			goPay(nums){
				uni.navigateTo({
					url:'./orderDFK?orderNum='+nums
				})
			},
			// 跳转商品详情
			goGoodsInfo(idx){
				this._Api.checkPtGoodsInfo({
					goodsId : idx
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						console.log(res.data.length);
						if(res.data.length === 0){
							uni.navigateTo({
								url:"../index/goodsInfoNormal?goodsId="+idx
							})
						}else{
							let ptArr = []
							let ptNum = []
							res.data.forEach((i)=>{
								ptArr[ptArr.length] = i.id
								ptNum[ptNum.length] = i.ptSize
							})
							uni.navigateTo({
								url:"../index/goodsInfo?goodsId="+idx+"&arr="+ptArr+"&num="+ptNum
							})
						}
					}
				});
			},
			// 发货
			goDFH(nums){
				uni.navigateTo({
					url:'./orderDFH?orderNum='+nums
				})
			},
			// 收货
			goDSH(nums){
				uni.navigateTo({
					url:"./orderDSH?orderNum="+nums
				})
			},
			// 物流
			goWL(codes){
				uni.navigateTo({
					url:'../index/logisticsInfo?logisticsCode='+codes
				})
			},
			// 评价
			goPJ(idx){
				uni.navigateTo({
					url:'./faBuWord?orderGoodsId='+idx
				})
			},
			// 售后
			goSH(idx){
				uni.navigateTo({
					url:'./refundInfo?orderGoodsId='+idx
				})
			},
			// 退款
			goTk(idx){
				uni.navigateTo({
					url:'/pages/mine/applyForRefund?orderGoodsId='+idx
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F1F1F1;
	}
	// 导航头样式
	.topNav{
		.t-left{
			width: 8%;
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
		.t-right{
			width: 12%;
			.space_tm{
				height: 24rpx;
			}
			font-size: 28rpx;
			text-align: center;
			color: #FF584C;
		}
	}
	.qb-main{
		width: 96%;
		margin: 18rpx auto;
		.qm-item{
			height: 240rpx;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			margin-bottom: 18rpx;
			.qi-title{
				width: 94%;
				height: 60rpx;
				font-size: 22rpx;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.qi-goods{
				width: 94%;
				height: 150rpx;
				margin: 0 auto;
				display: flex;
				position: relative;
				justify-content: space-between;
				align-items: center;
				.qg-btn{
					position: absolute;
					bottom: 6rpx;
					display: flex;
					align-items: center;
					right: 6rpx;
					view{
						width: 120rpx;
						height: 40rpx;
						border-radius: 20rpx;
						font-size: 20rpx;
						line-height: 40rpx;
						text-align: center;
					}
					.qb-ck{
						color: #666666;
						border: 1rpx solid #666666;
						margin-right: 10rpx;
					}
					.qb-zf{
						color: #FF584C;
						border: 1rpx solid #FF584C;
					}
				}
				.qg-img{
					width: 24%;
					text-align: center;
					height: 124rpx;
					image{
						width: 144rpx;
						height: 100%;
					}
				}
				.qg-name{
					width: 56%;
					height: 124rpx;
					.qn-name{
						height: 94rpx;
						overflow: hidden;
						font-size: 24rpx;
					}
					.qn-sh{
						height: 30rpx;
						line-height: 30rpx;
						font-size: 22rpx;
						color: #FF584C;
					}
				}
				.qg-price{
					width: 20%;
					text-align: right;
					height: 124rpx;
					font-size: 24rpx;
					.qp-price{
						color: #FF584C;
					}
					.qp-nums{
						color: #999999;
					}
				}
			}
		}
	}
</style>
