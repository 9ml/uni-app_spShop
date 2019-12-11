<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				确认订单
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<!-- 地址信息 -->
		<view class="adress-main" @tap="choseMyAdress()">
			<view class="am-left">
				<image src="../../static/icon_dz.png" mode=""></image>
			</view>
			<view class="am-middle" v-if="noAdress">
				请设置收货地址
			</view>
			<view class="am-middle" v-if="haveAdress">
				<view class="amm-top">
					<text class="at-name">{{userAdressInfo.consigneeName}}</text>
					<text class="at-phone">{{userAdressInfo.consigneePhone}}</text>
				</view>
				<view class="amm-bom">
					{{userAdressInfo.consigneeAddress}}
				</view>
			</view>
			<view class="am-right">
				<image src="../../static/icon_jr_dd.png" mode=""></image>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="goods-mian" v-for="(g,g_idx) in userChoseGoodsInfo" :key="g_idx">
			<view class="gm-gInfo" @tap="goGoodsInfo(g.goodsId)">
				<view class="gg-img">
					<image :src="g.goodsMainImg" mode=""></image>
				</view>
				<view class="gg-desc">
					<view class="gd-name">
						{{g.goodsName}}
					</view>
					<view class="gd-type">
						<text>颜色:{{g.goodsColor}};尺码:{{g.goodsSize}};</text>
					</view>
					<view class="gd-sh">
						七天无理由退换
					</view>
				</view>
				<view class="gd-price">
					<view class="gp-price">
						￥{{g.lastPrice}}
					</view>
					<view class="gp-nums">
						X{{g.goodsAmount}}
					</view>
				</view>
			</view>
			<view class="gm-nums">
				<view class="gn-left">
					购买数量
				</view>
				<view class="gn-right">
					<view class="gr-item" @tap="userHandleGoods(g,-1)">
						-
					</view>
					<view class="gr-item gr-m">
						{{g.goodsAmount}}
					</view>
					<view class="gr-item" @tap="userHandleGoods(g,1)">
						+
					</view>
				</view>
			</view>
			<view class="gm-all">
				<text class="ga-a">
					共{{g.goodsAmount}}件
				</text>
				<text class="ga-b">
					小计:
				</text>
				<text class="ga-c">
					￥{{g.totalPrice}}
				</text>
			</view>
		</view>
		<view class="goods-mian">
			<view class="gm-nums" @tap="ChosePsStyle()">
				<view class="gn-left">
					配送方式
				</view>
				<view class="gn-right">
					<view class="gr-fonts">
						快递配送
					</view>
					<view class="gr-icon">
						<image src="../../static/icon_jr_dd.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="gm-bz">
				<view class="gb-left">
					订单备注
				</view>
				<view class="gb-inp">
					<input type="text" v-model="userBz" placeholder="选填" />
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="bom-space"></view>
		<view class="bom-main">
			<view class="bm-left">
				<text class="bl-a">
					共{{goodsNums}}件
				</text>
				<text class="bl-b">
					小计:
				</text>
				<text class="bl-c">
					￥{{totalPrice}}
				</text>
			</view>
			<view class="bm-right" @tap="submitOrder()">
				提交订单
			</view>
		</view>
		<!-- 弹出层 -->
		<uni-popup ref="sendStyle" type="bottom" :custom="true">
			<view class="sendMain">
				<view class="sm-title">
					配送方式
				</view>
				<view class="sc-main">
					<view class="sm-chose">
						<view class="sc-name">
							<text>普通配送</text>
							<text class="sn-middle">快递</text>
							<text>免邮</text>
						</view>
						<view class="sc-icon">
							<image src="../../static/icon_xz_qx.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="sm-btn" @tap="choseSure()">
					确定
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				// 用户地址信息
				userAdressInfo : '',
				// 用户所选商品信息
				userChoseGoodsInfo : [],
				// 商品数量
				goodsNums : 0,
				// 商品总价格
				totalPrice : 0,
				// 购买类型
				buyType : 0,
				// 备注
				userBz : '',
				// 用户信息
				userId : uni.getStorageSync('userId'),
				// 购物车商品id集合
				goodsNumsList : [],
				// 购物车商品id集合
				goodsTrolleyId : [],
				noAdress : true,
				haveAdress : false,
				isSetAdress : false,
				allPrice : 0
			}
		},
		onLoad(options) {
			this.imgUrl = this._Api.imgUrl
			this.goodsNumsList = uni.getStorageSync("buyList");
			// 选择地址
			if(!uni.getStorageSync("consigneeId")){
				this.consigneeId = ""
			}else{
				this.consigneeId = uni.getStorageSync("consigneeId")
			}
			// 页面加载调用接口
			this.getAdressInfo();
			this.getGoodsInfos();
		},
		methods: {
			// 地址信息
			getAdressInfo(){
				this._Api.getConfirmAdressInfo({
					userId : this.userId,
					consigneeId : this.consigneeId
				},res=>{
					console.log(res)
					if(res.meta.code === 200){
						this.noAdress = false
						this.haveAdress = true
						this.isSetAdress = false
						this.userAdressInfo = res.data
						this.consigneeId = this.userAdressInfo.id
					}else{
						this.isSetAdress = true
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 商品信息
			getGoodsInfos(){
				this._Api.shopCarSubmitOrderGoodsInfo({
					id : this.goodsNumsList
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.goodsNums = 0
						this.totalPrice = 0
						this.allPrice = 0
						res.data.forEach((item)=>{
							item.lastPrice = this.myTools.countPrice(item.goodsPrice,item.goodsDiscount)
							item.totalPrice = item.goodsAmount * item.lastPrice
							item.allPrice = item.goodsAmount * item.goodsPrice
							this.goodsNums += item.goodsAmount
							this.totalPrice += item.totalPrice
							this.allPrice += item.allPrice
							item.goodsMainImg = this.imgUrl + item.goodsMainImg
						})
						this.userChoseGoodsInfo = res.data;
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			goGoodsInfo(goodsId){
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
			},
			// 减 || 加
			userHandleGoods(val,way){
				if(way > 0){
					val.goodsAmount ++
					this._Api.shopCarAddOrCut({
						id : val.id,
						status : 1
					},res=>{
						console.log(res)
						if(res.meta.code === 200){
							this.getGoodsInfos();
						}else{
							uni.showToast({
								title:res.meta.msg,
								icon:'none',
								duration:1500
							})
						}
					})
				}else{
					if(val.goodsAmount === 1){}else{
						val.goodsAmount --
						this._Api.shopCarAddOrCut({
							id : val.id,
							status : 0
						},res=>{
							console.log(res)
							if(res.meta.code === 200){
								this.getGoodsInfos();
							}else{
								uni.showToast({
									title:res.meta.msg,
									icon:'none',
									duration:1500
								})
							}
						})
					}
				}
				// 重复循环计算，导致数量异常，特此警告
				// val.totalPrice = val.goodsAmount * val.goodsPrice
				// this.goodsNums = 0
				// this.totalPrice = 0
				// this.userChoseGoodsInfo.forEach((item)=>{
				// 	console.log(item.goodsAmount);
				// 	// this.goodsNums += item.goodsAmount
				// 	// this.totalPrice += item.totalPrice
				// })
			},
			// 选择配送方式
			ChosePsStyle(){
				this.$refs.sendStyle.open();
			},
			choseSure(){
				this.$refs.sendStyle.close();
			},
			// 提交订单
			submitOrder(){
				if(this.isSetAdress){
					uni.showToast({
						title:"请先设置收货地址再提交订单哦~",
						icon:"none",
						duration:1500
					})
					return false;
				}else{
					this._Api.shopCarSubmitOrder({
						userId : this.userId,
						id : this.goodsNumsList,
						consigneeId : this.consigneeId,
						orderPrice : this.allPrice,
						orderAmount : this.totalPrice,
						promType : "普通",
						orderRemark : this.userBz
					},res=>{
						console.log(res);
						if(res.meta.code === 200){
							uni.showToast({
								title:"提交成功",
								icon:"none",
								duration:1500
							})
							uni.setStorageSync("buyType",1)
							setTimeout(()=>{
								uni.navigateTo({
									url:"./cashier?orderNum="+res.data
								})
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
			choseMyAdress(){
				uni.setStorageSync("choseAdressType",3);
				uni.navigateTo({
					url:"../mine/myAdress"
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.adress-main{
		width: 94%;
		height: 140rpx;
		margin: 18rpx auto 18rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.am-left{
			width: 12%;
			height: 46rpx;
			text-align: center;
			image{
				width: 46rpx;
				height: 46rpx;
			}
		}
		.am-middle{
			width: 78%;
			height: 80rpx;
			view{
				height: 40rpx;
				line-height: 40rpx;
			}
			.amm-top{
				font-size: 22rpx;
				.at-phone{
					color: #666666;
					margin-left: 20rpx;
				}
			}
			.amm-bom{
				font-size: 24rpx;
			}
		}
		.am-right{
			width: 8%;
			height: 46rpx;
			line-height: 46rpx;
			text-align: center;
			image{
				width: 16rpx;
				height: 24rpx;
			}
		}
	}
	.goods-mian{
		width: 94%;
		// height: 500rpx;
		margin: 0 auto 20rpx;
		border-radius: 16rpx;
		background-color: #FFFFFF;
		.gm-gName{
			width: 94%;
			height: 50rpx;
			margin: 0 auto;
			font-size: 22rpx;
			line-height: 50rpx;
		}
		.gm-gInfo{
			width: 94%;
			height: 160rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			.gg-img{
				width: 24%;
				height: 140rpx;
				text-align: center;
				image{
					width: 150rpx;
					height: 140rpx;
				}
			}
			.gg-desc{
				width: 60%;
				height: 140rpx;
				.gd-name{
					height: 60rpx;
					font-size: 22rpx;
					overflow: hidden;
				}
				.gd-type{
					height: 40rpx;
					line-height: 40rpx;
					overflow: hidden;
					font-size: 20rpx;
					text{
						padding: 4rpx;
						background-color: #F1F1F1;
						border-radius: 6rpx;
					}
				}
				.gd-sh{
					height: 40rpx;
					line-height: 40rpx;
					font-size: 20rpx;
					color: #FF584C;
				}
			}
			.gd-price{
				width: 16%;
				height: 140rpx;
				text-align: right;
				font-size: 20rpx;
				.gp-price{
					color: #FF584C;
				}
				.gp-nums{
					color: #999999;
				}
			}
		}
		.gm-nums{
			width: 94%;
			height: 70rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.gn-left{
				font-size: 22rpx;
			}
			.gn-right{
				display: flex;
				align-items: center;
				.gr-item{
					width: 40rpx;
					height: 40rpx;
					border-radius: 6rpx;
					background-color: #F1F1F1;
					font-size: 22rpx;
					text-align: center;
					line-height: 40rpx;
				}
				.gr-m{
					margin: 0 4rpx 0 4rpx;
				}
				.gr-fonts{
					height: 30rpx;
					line-height: 30rpx;
					font-size: 20rpx;
					margin-right: 10rpx;
				}
				.gr-icon{
					height: 30rpx;
					line-height: 30rpx;
					image{
						width: 16rpx;
						height: 22rpx;
					}
				}
			}
		}
		.gm-bz{
			width: 94%;
			height: 70rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			.gb-left{
				width: 14%;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 22rpx;
			}
			.gb-inp{
				width: 80%;
				height: 60rpx;
				input{
					width: 100%;
					height: 100%;
					font-size: 22rpx;
					color: #666666;
				}
			}
		}
		.gm-all{
			width: 94%;
			height: 70rpx;
			margin: 0 auto;
			font-size: 22rpx;
			line-height: 70rpx;
			text-align: right;
			.ga-a{
				color: #666666;
				margin-right: 20rpx;
			}
			.ga-c{
				color: #FF584C;
			}
		}
	}
	.bom-space{
		height: 100rpx;
	}
	.bom-main{
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		z-index: 99;
		display: flex;
		align-items: center;
		.bm-left{
			width: 70%;
			height: 70rpx;
			text-align: right;
			line-height: 70rpx;
			font-size: 22rpx;
			.bl-a{
				color: #666666;
				margin-right: 20rpx;
			}
			.bl-c{
				color: #FF584C;
			}
		}
		.bm-right{
			width: 142rpx;
			height: 50rpx;
			margin: 0 auto;
			text-align: center;
			font-size: 24rpx;
			line-height: 50rpx;
			color: #FFFFFF;
			background-image: url(../../static/bg_zf.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
	}
	.sendMain{
		width: 100%;
		height: 400rpx;
		position: relative;
		background-color: #FFFFFF;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		.sm-title{
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: 28rpx;
		}
		.sc-main{
			border-bottom: 1rpx solid #F1F1F1;
			.sm-chose{
				width: 90%;
				margin: 0 auto;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.sc-name{
					height: 60rpx;
					line-height: 60rpx;
					font-size: 24rpx;
					.sn-middle{
						margin: 0 20rpx 0 20rpx;
					}
				}
				.sc-icon{
					height: 60rpx;
					image{
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
		}
		.sm-btn{
			width: 90%;
			height: 80rpx;
			position: absolute;
			bottom: 20rpx;
			left: 50%;
			margin-left: -45%;
			background-image: url(../../static/bg_qd_cs.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			font-size: 30rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
		}
	}
</style>
