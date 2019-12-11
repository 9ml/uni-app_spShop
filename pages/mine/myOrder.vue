<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				我的订单
			</view>
			<view class="t-right" @tap="goSearch()">
				<image src="/static/icon_ss.png" mode=""></image>
			</view>
		</view>
		<view class="space_nav"></view>
		<view class="mo-chose">
			<view class="mh-item" :class="current === mc_idx ? 'ac' : ''" @tap="choseEach(mc_idx,mc_item.cnl_name)" v-for="(mc_item,mc_idx) in choseNavList" :key="mc_idx">
				{{mc_item.cnl_name}}
			</view>
		</view>
		<view class="qb-main">
			<view class="qm-item" v-for="(i,i_idx) in myOrderInfoList" :key="i_idx">
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
						<view class="qn-sh" v-if="i.isTKingFonts">
							正在退款
						</view>
						<view class="qn-sh" v-if="i.isTKSecFonts">
							退款成功
						</view>
						<view class="qn-sh" v-if="i.isTKFailFonts">
							退款失败
						</view>
					</view>
					<view class="qg-price">
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
						<view class="qb-zf" v-if="i.isSHXQ" @tap="goSH(i.orderId)">
							查看详情
						</view>
						<view class="qb-zf" v-if="i.isTKing" @tap="goTKInfo(i.orderGoodsId)">
							退款中
						</view>
						<view class="qb-zf" v-if="i.isTKSec" @tap="goTKInfo(i.orderGoodsId)">
							退款成功
						</view>
						<view class="qb-zf" v-if="i.isTKFail" @tap="goTKInfo(i.orderGoodsId)">
							退款失败
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
				choseNavList : [
					{
						cnl_id : 1,
						cnl_name : '全部'
					},
					{
						cnl_id : 2,
						cnl_name : '待付款'
					},
					{
						cnl_id : 3,
						cnl_name : '待发货'
					},
					{
						cnl_id : 4,
						cnl_name : '待收货'
					},
					{
						cnl_id : 5,
						cnl_name : '已完成'
					},
					{
						cnl_id : 6,
						cnl_name : '待评价'
					},
					{
						cnl_id : 7,
						cnl_name : '售后'
					}
				],
				current : 0,
				// 用户信息
				userId : uni.getStorageSync('userId'),
				// 订单信息
				myOrderInfoList : []
			}
		},
		onLoad(options) {
			this.imgUrl = this._Api.imgUrl
			let jumpIdx = parseInt(options.idx)
			let jumpTypes = options.types
			this.choseEach(jumpIdx,jumpTypes)
		},
		onBackPress() {
			uni.reLaunch({
				url:'/pages/mine/mine'
			})
		},
		methods: {
			// 获取订单信息
			choseEach(idx,types){
				this.current = idx
				this.myOrderInfoList = []
				if(idx === 0){
					// 全部订单信息
					this._Api.myAllOrder({
						userId : this.userId
					},res=>{
						console.log(res);
						if(res.meta.code === 200){
							let getInfos = res.data
							let gotInfos = []
							Object.keys(getInfos).forEach((i)=>{
								getInfos[i].forEach((j)=>{
									if(j.orderStatus === "待付款"){
										j.isZF = true
									}else if(j.orderStatus === "待发货"){
										j.isDFHXQ = true
									}else if(j.orderStatus === "待收货"){
										j.isWL = true
										j.isSH = true
									}else if(j.orderStatus === "已完成"){
										j.isWL = true
										j.isTk = true
									}else if(j.orderStatus === "待评价"){
										j.isPJ = true
									}else if(j.orderStatus === "售后"){
										if(j.isAfter === "退款中"){
											j.isTKing = true
											j.isTKingFonts = true
										}else if(j.isAfter === "退款完成" || j.isAfter === "退款成功"){
											j.isTKSec = true
											j.isTKSecFonts = true
										}else{
											j.isTKFail = true
											j.isTKFailFonts = true
										}
									}
									j.goodsMainImg = this.imgUrl + j.goodsMainImg
									j.lastPrice = j.orderAmount / j.goodsAmount
									gotInfos[gotInfos.length] = j;
								})
							})
							this.myOrderInfoList = gotInfos
						}else{
							uni.showToast({
								title:res.meta.msg,
								icon:'none',
								duration:1500
							})
						}
					})
				}else if(idx === 5){
					this._Api.showWaitGoodsInfo({
						userId : this.userId
					},res=>{
						console.log(res);
						if(res.meta.code === 200){
							let getInfos = res.data
							let gotInfos = []
							Object.keys(getInfos).forEach((i)=>{
								getInfos[i].forEach((j)=>{
									j.isPJ = true
									j.goodsMainImg = this.imgUrl + j.goodsMainImg
									gotInfos[gotInfos.length] = j;
								})
							})
							this.myOrderInfoList = gotInfos
						}else{
							uni.showToast({
								title:res.meta.msg,
								icon:'none',
								duration:1500
							})
						}
					})
				}else{
					this._Api.myAllKindsOrder({
						userId : this.userId,
						orderStatus : types
					},res=>{
						console.log(res);
						if(res.meta.code === 200){
							let getInfos = res.data
							let gotInfos = []
							Object.keys(getInfos).forEach((i)=>{
								getInfos[i].forEach((j)=>{
									if(j.orderStatus === "待付款"){
										j.isZF = true
									}else if(j.orderStatus === "待发货"){
										j.isDFHXQ = true
									}else if(j.orderStatus === "待收货"){
										j.isWL = true
										j.isSH = true
									}else if(j.orderStatus === "已完成"){
										j.isWL = true
										j.isTk = true
									}else if(j.orderStatus === "待评价"){
										j.isPJ = true
									}else if(j.orderStatus === "售后"){
										if(j.isAfter === "退款中"){
											j.isTKing = true
											j.isTKingFonts = true
										}else if(j.isAfter === "退款完成" || j.isAfter === "退款成功"){
											j.isTKSec = true
											j.isTKSecFonts = true
										}else{
											j.isTKFail = true
											j.isTKFailFonts = true
										}
									}
									j.goodsMainImg = this.imgUrl + j.goodsMainImg
									j.lastPrice = j.orderAmount / j.goodsAmount
									gotInfos[gotInfos.length] = j;
								})
							})
							this.myOrderInfoList = gotInfos
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
					url:'./refundInfo?orderId='+idx
				})
			},
			// 退款
			goTk(idx){
				uni.navigateTo({
					url:'/pages/mine/applyForRefund?orderGoodsId='+idx
				})
			},
			// 搜索
			goSearch(){
				uni.navigateTo({
					url:'./searchMyOrder'
				})
			},
			// 退款详情
			goTKInfo(idx){
				uni.navigateTo({
					url:'./refundInfo?orderGoodsId='+idx
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F4F4;
	}
	.topNav{
		.t-right{
			margin-top: 30rpx;
			image{
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
	.mo-chose{
		width: 96%;
		height: 100rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.mh-item{
			width: 12%;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 22rpx;
			text-align: center;
		}
		.ac{
			border-bottom: 4rpx solid #FF584C;
		}
	}
	.qb-main{
		width: 96%;
		margin: 0 auto;
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
