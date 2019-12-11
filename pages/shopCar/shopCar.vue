<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left"></view>
			<view class="t-main">
				购物车
			</view>
			<view class="t-right" @tap="handles()">
				<view class="hands" v-if="isLogin">
					{{handleType}}
				</view>
			</view>
		</view>
		<view class="space_nav"></view>
		<view class="notLogin" v-if="notLogin" @tap="goLogin()">
			请先登录
		</view>
		<view class="nothingGoods" v-if="nothingGoods">
			您的购物车没有东西哦，去逛逛吧~
		</view>
		<view class="tnums-main" v-if="isLogin">
			共{{goodsList.length}}件宝贝
		</view>
		<!-- 商品列表 -->
		<view class="shops-main" v-for="(goods_item,goods_idx) in goodsList" :key="goods_idx">
			<view class="sm-body">
				<view class="sb-goods">
					<view class="sg-icon">
						<view class="noCheckIcon" :class="{'isCheckIcon' : goods_item.isChose}" @tap="choseOrCancel(goods_item)"></view>
					</view>
					<view class="sg-img">
						<image :src="goods_item.goodsMainImg" mode=""></image>
					</view>
					<view class="sg-info" @tap="goGoodsInfo(goods_item.goodsId)">
						<view class="si-name">
							{{goods_item.goodsName}}
						</view>
						<view class="si-type">
							<text>颜色:{{goods_item.goodsColor}};尺寸:{{goods_item.goodsSize}};</text>
						</view>
						<view class="si-price">
							￥{{goods_item.lastPrice}}
						</view>
					</view>
				</view>
				<view class="sb-nums">
					<view class="sn-item" @tap="changeCount(goods_item,-1)">
						-
					</view>
					<view class="sn-item">
						{{goods_item.goodsAmount}}
					</view>
					<view class="sn-item" @tap="changeCount(goods_item,1)">
						+
					</view>
				</view>
			</view>
		</view>
		<view class="bom-main" v-if="isLogin">
			<view class="bm-left">
				<view class="noCheckAll" :class="{'isCheckAll' : isCheckAll}" @tap="checkAll()"></view>
				<view class="bl-name">
					全选
				</view>
			</view>
			<view class="bm-right">
				<view class="br-fonts" v-if="isPayOrDel">
					<text class="bf-name">合计:</text>
					<text class="bf-price">￥{{allPrice}}.00</text>
				</view>
				<view class="b-btn" @tap="userHandles(handleKinds)">
					<text>{{handleKinds}}({{coutAll}})</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 用户信息
				userId : 0,
				// 商品列表
				goodsList : [],
				// 未登录
				notLogin : true,
				// 登录
				isLogin : false,
				// 购物车为空
				nothingGoods : false,
				// 是否全选
				isCheckAll : false,
				// 选中商品数量
				coutAll : 0,
				// 总价格
				allPrice : 0,
				// 管理
				handleType : '管理',
				// 结算 || 删除
				handleKinds : '结算',
				isPayOrDel : true,
				// 结算列表
				buyList : [],
				// 删除列表
				delList : []
			}
		},
		onLoad(){
		},
		onShow(){
			this.getShopCarInfo()
			this.buyList = []
			this.delList = []
			this.coutAll = 0
			this.isCheckAll = false
		},
		watch:{
			goodsList:{
				deep : true,
				handler(val,oldval){
				    this._totalPrice()
				    this._totalCount()
				}
			}
		},
		methods: {
			// 获取购物车信息
			getShopCarInfo(){
				this.userId = uni.getStorageSync('userId')
				this.imgUrl = this._Api.imgUrl;
				if(!this.userId){
					this.notLogin = true
					this.isLogin = false
				}else{
					this._Api.getMyShopCar({
						userId : this.userId
					},res=>{
						console.log(res);
						if(res.meta.code === 200){
							if(res.data.length === 0){
								this.notLogin = false
								this.isLogin = false
								this.nothingGoods = true
								this.goodsList = []
							}else{
								this.notLogin = false
								this.isLogin = true
								this.nothingGoods = false
								res.data.forEach((item)=>{
									item.goodsMainImg = this.imgUrl + item.goodsMainImg
									item.isChose = false
									item.choseCount = 0
									item.lastPrice = this.myTools.countPrice(item.goodsPrice,item.goodsDiscount)
								})
								this.goodsList = res.data
							}
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
			// 购物车跳转
			goGoodsInfo(idx){
				console.log(idx)
				uni.navigateTo({
					url:"../index/goodsInfoNormal?goodsId="+idx
				})
			},
			// 加 || 减
			changeCount(val,way){
			    if (way > 0){
			        val.goodsAmount ++
					this._Api.shopCarAddOrCut({
						id : val.id,
						status : 1
					},res=>{
						console.log(res)
						if(res.meta.code === 200){
							// this.getShopCarInfo();
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
								// this.getShopCarInfo();
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
			},
			// 选择每件商品
			choseOrCancel(item){
				!item.isChose ? this._goodsTrue(item) : this._goodsFales(item)
			},
			_goodsTrue(item){
				if(item.isChose){}else{
					item.isChose = true
					++ item.choseCount
					this.coutAll += item.choseCount
					this.coutAll === this.goodsList.length ? this.isCheckAll = true
						: this.isCheckAll = false
				}
			},
			_goodsFales(item){
				item.isChose = false
				-- item.choseCount
				-- this.coutAll
				this.isCheckAll = false
			},
			// 全选
			checkAll(){
				this.isCheckAll = !this.isCheckAll
				this.isCheckAll ?
					this.goodsList.forEach((item)=>{this._goodsTrue(item)}):
					this.goodsList.forEach((item)=>{this._goodsFales(item)})
			},
			// 总价格
			_totalPrice(){
			    this.allPrice = 0
			    this.goodsList.forEach((item)=>{
					if(item.isChose){
						this.allPrice += item.lastPrice * item.goodsAmount
					}
			    })
			},
			// 总数量
			_totalCount(){
			    this.coutAll = 0
			    this.goodsList.forEach((item)=>{
			        this.coutAll += item.choseCount
			    })
			},
			// 操作
			handles(){
				this.handleType == '管理' ?
					(this.handleType = '完成',this.handleKinds = '删除',this.isPayOrDel = false):
					(this.handleType = '管理',this.handleKinds = '结算',this.isPayOrDel = true)
			},
			// 结算 || 删除
			userHandles(handleKinds){
				if(handleKinds == '结算'){
					if(this.coutAll === 0){
						uni.showToast({
							title:"请选择要购买的商品",
							icon:'none',
							duration:1500
						})
					}else{
						this.goodsList.forEach((item,idx)=>{
							if(item.isChose){
								this.buyList[this.buyList.length] = item.id
							}
						})
						uni.setStorageSync("buyList",this.buyList)
						uni.navigateTo({
							url:'../index/submitOrderShopCar'
						})
					}
				}else{
					if(this.coutAll === 0){
						uni.showToast({
							title:"请选择要删除的商品",
							icon:'none',
							duration:1500
						})
					}else{
						uni.showModal({
						    title: '提示',
						    content: '确定要从购物车删除吗',
						    success: (res)=> {
						        if(res.confirm){
									this.goodsList.forEach((item)=>{
										if(item.isChose){
											console.log(item)
											this.delList[this.delList.length] = item.id
										}
									});
									this._Api.shopCarDelGoods({
										id : this.delList
									},res=>{
										console.log(res);
										if(res.meta.code === 200){
											this.getShopCarInfo();
											this.isCheckAll = false;
											uni.showToast({
												title:'删除成功',
												icon:'none',
												duration:1500
											});
											this.goodsList = [];
										}else{
											uni.showToast({
												title:res.meta.msg,
												icon:'none',
												duration:1500
											})
										}
									})
						        }else if(res.cancel){
									this.delList.length = 0;
						        }
						    }
						});
					}
				}
			},
			// 登录
			goLogin(){
				uni.navigateTo({
					url: "../user/login"
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.topNav{
		.t-right{
			margin-top: 40rpx;
			.hands{
				font-size: 26rpx;
			}
		}
	}
	.notLogin{
		height: 100rpx;
		line-height: 100rpx;
		font-size: 24rpx;
		color: #FF584C;
		font-weight: bold;
		text-align: center;
	}
	.nothingGoods{
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 24rpx;
		color: #333333;
	}
	.tnums-main{
		width: 90%;
		height: 70rpx;
		font-size: 26rpx;
		line-height: 70rpx;
		margin: 0 auto;
	}
	.shops-main{
		width: 94%;
		height: 200rpx;
		margin: 0 auto 18rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		.sm-body{
			width: 96%;
			margin: 0 auto;
			position: relative;
			.sb-title{
				height: 44rpx;
				line-height: 44rpx;
				font-size: 22rpx;
			}
			.sb-goods{
				height: 140rpx;
				display: flex;
				align-items: center;
				.sg-icon{
					width: 8%;
					.noCheckIcon{
						width: 30rpx;
						height: 30rpx;
						margin: 0 auto;
						background-image: url(../../static/icon_wx_qx.png);
						background-repeat: no-repeat;
						background-size: 100%;
					}
					.isCheckIcon{
						width: 30rpx;
						height: 30rpx;
						margin: 0 auto;
						background-image: url(../../static/icon_xz_qx.png);
						background-repeat: no-repeat;
						background-size: 100%;
					}
				}
				.sg-img{
					width: 24%;
					height: 130rpx;
					text-align: center;
					image{
						width: 146rpx;
						height: 130rpx;
					}
				}
				.sg-info{
					width: 56%;
					height: 130rpx;
					.si-name{
						height: 60rpx;
						font-size: 22rpx;
						overflow: hidden;
					}
					.si-type{
						height: 40rpx;
						line-height: 40rpx;
						text{
							font-size: 20rpx;
							padding: 4rpx;
							background-color: #F1F1F1;
							border-radius: 6rpx;
						}
					}
					.si-price{
						height: 40rpx;
						line-height: 40rpx;
						font-size: 20rpx;
						color: #FF584C;
					}
				}
			}
			.sb-nums{
				width: 120rpx;
				height: 50rpx;
				position: absolute;
				display: flex;
				align-items: center;
				justify-content: space-between;
				right: 20rpx;
				bottom: 20rpx;
				.sn-item{
					width: 36rpx;
					height: 36rpx;
					background-color: #F1F1F1;
					border-radius: 6rpx;
					font-size: 22rpx;
					text-align: center;
					line-height: 36rpx;
				}
			}
		}
	}
	.bom-main{
		width: 88%;
		height: 60rpx;
		margin: 0 auto 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		view{
			display: flex;
			align-items: center;
		}
		.bm-left{
			.noCheckAll{
				width: 30rpx;
				height: 30rpx;
				background-image: url(../../static/icon_wx_qx.png);
				background-repeat: no-repeat;
				background-size: 100%;
			}
			.isCheckAll{
				width: 30rpx;
				height: 30rpx;
				background-image: url(../../static/icon_xz_qx.png);
				background-repeat: no-repeat;
				background-size: 100%;
			}
			.bl-name{
				font-size: 26rpx;
				margin-left: 10rpx;
			}
		}
		.bm-right{
			.br-fonts{
				font-size: 26rpx;
				.bf-price{
					color: #FF584C;
					margin: 0 10rpx 0 10rpx;
				}
			}
			.b-btn{
				width: 130rpx;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				background-image: url(../../static/bg_zf.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				text{
					margin: 0 auto;
				}
			}
		}
	}
</style>
