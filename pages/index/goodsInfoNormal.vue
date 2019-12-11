<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav" v-show="isShow">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				宝贝详情
			</view>
			<view class="t-right"></view>
		</view>
		<!-- 展示图 -->
		<view class="goodsBanner">
			<swiper class="swiper" indicator-dots="true" indicator-color="#FFFFFF" indicator-active-color="#FA6400">
				<swiper-item v-for="(banner_item,banner_idx) in bannerList" :key="banner_idx">
					<image :src="banner_item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="gbTop">
				<view class="backIcon" @tap="myTools.navBack()">
					<image src="../../static/icon_fh_xq.png" mode=""></image>
				</view>
				<view class="shareIcon" @tap="shares()">
					<image src="../../static/icon_fx_xq.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 名称详情 -->
		<view class="goodsInfo">
			<view class="goodsDesc">
				<view class="goodsPrice">
					￥{{goodsInfo.lastPrice}}
				</view>
				<view class="goodsBNums">
					商品销量 <text>{{goodsInfo.goodsSales}}</text>
				</view>
			</view>
			<view class="goodsName">
				{{goodsInfo.goodsName}}
			</view>
		</view>
		<!-- 颜色尺寸 颜色尺寸-->
		 <!-- @tap="choseGoods()" -->
		<view class="lookCans">
			<view class="lm-name">
				选择
			</view>
			<text class="left">选择</text>
			<text class="middle">颜色</text>
			<text class="right">尺码</text>
			<view class="lm-desc">
				<text>共{{colorList.length}}种颜色可选</text>
			</view>
		</view>
		<!-- 参数 -->
		<view class="choseType" @tap="cans()">
			<view class="ct-left">
				<view class="cl-name">
					参数
				</view>
				<view class="cl-fonts">
					商品具体参数
				</view>
			</view>
			<view class="ct-icon">
				<image src="../../static/icon_jr.png" mode=""></image>
			</view>
		</view>
		<view class="bgLine"></view>
		<!-- 评论 -->
		<view class="comment-main">
			<view class="cm-title">
				<view class="cm-name">
					宝贝评价({{evaluateAll.length}})
				</view>
				<view class="cm-look" @tap="lookAllComment()">
					<view class="cl-font">
						查看全部
					</view>
					<view class="cl-icon">
						<image src="../../static/icon_jr.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="cm-body" v-show="isevaluate">
				<view class="cb-header">
					<view class="ch-img">
						<image :src="evaluateFirst.userImg" mode=""></image>
					</view>
					<view class="ch-name">
						{{evaluateFirst.userName}}
					</view>
				</view>
				<view class="cb-time">
					<view class="ct-time">
						{{evaluateFirst.createTime}}
					</view>
					<view class="ct-info">
						{{evaluateFirst.goodsSize}}
					</view>
				</view>
				<view class="cb-des">
					{{evaluateFirst.evenluationContent}}
				</view>
				<view class="cb-imgs">
					<view class="bi-item" v-for="(pl_item,pl_idx) in evaluateImg" :key="pl_idx">
						<image :src="pl_item" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 详情展示 -->
		<view class="goods-iName">
			<view class="gi-line"></view>
			<view class="gi-fonts">
				宝贝详情
			</view>
			<view class="gi-line"></view>
		</view>
		<view class="goodsShow">
			<view class="gs-title">
				平铺展示
			</view>
			<view class="gs-img" v-for="(pp_item,pp_idx) in tiledDisplay" :key="pp_idx">
				<image :src="pp_item" mode="widthFix"></image>
			</view>
			<!-- <view class="gs-title">
				面料
			</view>
			<view class="gs-img" v-for="(ml_item,ml_idx) in fabricDisplay" :key="ml_idx">
				<image :src="ml_item" mode=""></image>
			</view> -->
		</view>
		<!-- 底部 -->
		<view class="bom-space"></view>
		<view class="bottomMain">
			<view class="bm-left">
				<view class="bl-item" @tap="goKF()">
					<view class="bi-icon">
						<image src="../../static/icon_kf.png" mode=""></image>
					</view>
					<view class="bi-fonts">
						客服
					</view>
				</view>
				<view class="bl-item" @tap="collection()">
					<view class="bi-icon">
						<image :src="isCollectionIcon" mode=""></image>
					</view>
					<view class="bi-fonts">
						{{isCollectionFonts}}
					</view>
				</view>
			</view>
			<view class="bm-right">
				<view class="jrgwc" @tap="addMyShopCar()">
					加入购物车
				</view>
				<!-- <view class="ddgm" @tap="buyAlone()">
					单独购买
				</view> -->
				<view class="fqpt" @tap="buyAlone()">
					单独购买
				</view>
			</view>
		</view>
		<!-- 分享 -->
		<uni-popup ref="shares" type="bottom" :custom="true">
			<view class="share-main">
				<view class="sm-title">
					点击分享
				</view>
				<view class="sm-type">
					<view class="st-item" @tap="shareWeChat()">
						<view class="si-icon">
							<image src="../../static/btn_wx_fx.png" mode=""></image>
						</view>
						<view class="si-fonts">
							微信
						</view>
					</view>
					<view class="st-item" @tap="shareCircleOfFriends()">
						<view class="si-icon">
							<image src="../../static/btn_pyq_fx.png" mode=""></image>
						</view>
						<view class="si-fonts">
							朋友圈
						</view>
					</view>
				</view>
				<view class="sm-lines"></view>
				<view class="sm-btn" @tap="closeShare()">
					取消
				</view>
			</view>
		</uni-popup>
		<!-- 参数 -->
		<uni-popup ref="cans" type="bottom" :custom="true">
			<view class="cans-main">
				<view class="csm-title">
					商品具体参数
				</view>
				<view class="csm-item">
					<view class="ci-left">
						参数
					</view>
					<view class="ci-right">
						{{goodsInfo.goodsParameter}}
					</view>
				</view>
				<view class="csm-item">
					<view class="ci-left">
						尺码
					</view>
					<view class="ci-right">
						{{goodsInfo.goodsSizes}}
					</view>
				</view>
				<!-- <view class="csm-item">
					<view class="ci-left">
						上市日期
					</view>
					<view class="ci-right">
						{{goodsInfo.lingDate}}
					</view>
				</view> -->
				<view class="csm-item">
					<view class="ci-left">
						其他
					</view>
					<view class="ci-right">
						{{goodsInfo.goodsRests}}
					</view>
				</view>
				<view class="csm-btn" @tap="closeCans()">
					确定
				</view>
			</view>
		</uni-popup>
		<!-- 选择 -->
		<uni-popup ref="choseType" type="bottom" :custom="true">
			<view class="type-main">
				<view class="tm-clIcon" @tap="closeCT()">
					<image src="../../static/icon_gb_xz.png" mode=""></image>
				</view>
				<view class="tm-goodsInfo">
					<view class="tg-imgs">
						<image :src="goodsInfo.goodsMainImg" mode=""></image>
					</view>
					<view class="tg-info">
						<view class="ti-price">
							￥{{goodsInfo.lastPrice}}
						</view>
						<view class="ti-kc">
							库存{{goodsStock}}件
						</view>
						<view class="ti-chose">
							已选{{isChoseColor}},{{isChoseSize}}
						</view>
					</view>
				</view>
				<view class="tm-color">
					<view class="tc-title">
						颜色分类
					</view>
					<view class="tc-main" v-if="isHaveColor">
						<view class="tm-item" :class="current_c === color_idx ? 'ac' : ''" v-for="(color_item,color_idx) in colorList" @tap="changeColor(color_idx,color_item.goodsColor)" :key="color_idx">
							<view class="ti-img">
								<image :src="goodsInfo.goodsMainImg" mode=""></image>
							</view>
							<view class="ti-fonts">
								{{color_item.goodsColor}}
							</view>
						</view>
					</view>
				</view>
				<view class="tm-color">
					<view class="tc-title">
						尺码
					</view>
					<view class="tc-main" v-if="isHaveSize">
						<view class="tm-item" :class="current_s === size_idx ? 'ac' : ''" v-for="(size_item,size_idx) in sizeList" @tap="changeSize(size_idx,size_item.goodsSize)" :key="size_idx">
							{{size_item.goodsSize}}
						</view>
					</view>
				</view>
				<view class="tm-nums">
					<view class="tn-name">
						购买数量
					</view>
					<view class="tn-handle">
						<view class="th-item" @tap="cutNums()">
							-
						</view>
						<view class="th-item nums">
							{{buyNum}}
						</view>
						<view class="th-item" @tap="addNums()">
							+
						</view>
					</view>
				</view>
				<view class="tm-btn" @tap="goBuy()">
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
				userId : uni.getStorageSync('userId'),
				// 导航头
				isShow : false,
				// 商品详细信息
				goodsInfo : "",
				// 商品展示图
				bannerList : [],
				// 平铺展示图
				tiledDisplay : [],
				// 面料展示图
				fabricDisplay : [],
				// 全部评论
				evaluateAll : [],
				// 第一条评论
				evaluateFirst : '',
				// 评论展示图片
				evaluateImg : [],
				// 显示评论
				isevaluate : true,
				// 商品颜色
				colorList : [],
				// 商品尺寸
				sizeList : [],
				current_c : 0,
				current_s : 0,
				// 选择界面图片
				choseMiniShow : '',
				// 已选颜色
				isChoseColor : '',
				// 已选尺码
				isChoseSize : '',
				// 库存
				goodsStock : '',
				// 购买数量
				buyNum : 1,
				// 购买类型：拼团 / 单独
				buyType : "",
				// 颜色+尺寸共用 id
				goodsTypeId : 0,
				// 是否打开了弹出层
				isShowUp : 0,
				// 收藏图标
				isCollectionIcon : '../../static/icon_sc.png',
				// 收藏文字
				isCollectionFonts : '收藏',
				isHaveColor : false,
				isHaveSize : false
			}
		},
		onLoad(options) {
			this.goodsId = options.goodsId
			console.log(this.goodsId)
			this.imgUrl = this._Api.imgUrl;
			// 页面加载调用
			this.goodsDesc();
			this.evaluates();
			this.getGoodsColor();
		},
		onBackPress(options){
			// 监听页面返回
			// console.log(options)
			if(this.isShowUp === 1){
				this.$refs.shares.close()
				this.$refs.choseType.close()
				this.$refs.cans.close()
				this.isShowUp = 0
				return true;
			}else{
				return false;
			}
		},
		methods:{
			// 获取到滚动的值
			onPageScroll: function(Object) {
				// console.log(Object.scrollTop);
				if(Object.scrollTop >= 70){
					this.isShow = true
				}else{
					this.isShow = false
				}
			},
			// 商品详细信息
			goodsDesc(){
				this._Api.shopDesc({
					goodsId : this.goodsId,
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						res.data.lastPrice = this.myTools.countPrice(res.data.goodsPrice,res.data.goodsDiscount);
						res.data.goodsMainImg = this.imgUrl + res.data.goodsMainImg
						res.data.goodsSizes = res.data.goodsSizes.substr(1);
						this.goodsInfo = res.data;
						this.isCollection();
						this.bannerList = this.myTools.imgAddUrl(res.data.goodsImg,this.imgUrl);
						this.tiledDisplay = this.myTools.imgAddUrl(res.data.tileShow,this.imgUrl);
						this.fabricDisplay = this.myTools.imgAddUrl(res.data.shellFarbic,this.imgUrl);
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 商品评论
			evaluates(){
				this._Api.evaluate({
					goodsId : this.goodsId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.evaluateAll = res.data
						if(res.data.length !== 0){
							if(res.data[0].userImg.indexOf("http") != -1){}else{
								res.data[0].userImg = this.imgUrl + res.data[0].userImg
							}
							this.evaluateImg = this.myTools.imgAddUrl(res.data[0].evenluationImg,this.imgUrl);
							this.evaluateFirst = res.data[0]
							this.evaluateFirst.createTime = this.myTools.formatDateTime(this.evaluateFirst.createTime,'str');
						}else{
							this.isevaluate = false;
							this.evaluateImg = [];
						}
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 商品属性
			getGoodsColor(){
				this._Api.getColors({
					goodsId : this.goodsId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						if(res.data.length === 0){}else{
							res.data.forEach((i)=>{
								if(!i.goodsColor){}else{
									this.isHaveColor = true
									this.isChoseColor = res.data[0].goodsColor
								}
							})
						}
						this.colorList = res.data
						this.getGoodsSize();
						// this.choseMiniShow = res.data[0].goodsImg
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 商品尺码
			getGoodsSize(){
				this._Api.getSizes({
					goodsId : this.goodsId,
					goodsColor : this.isChoseColor
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						if(res.data.length === 0){}else{
							res.data.forEach((i)=>{
								if(!i.goodsSize){}else{
									this.isHaveSize = true
									this.changeSize(0,res.data[0].goodsSize)
									this.goodsStock = res.data[0].goodsInventory
								}
							})
						}
						this.sizeList = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 单独购买
			buyAlone(){
				this.buyType = "普通"
				this.isShowUp = 1
				this.$refs.choseType.open()
			},
			// 拼团购买
			buyTeam(){
				this.buyType = "拼团";
				this.isShowUp = 1
				this.$refs.choseType.open()
			},
			// 加入购物车
			addMyShopCar(){
				this.buyType = 2
				this.isShowUp = 1
				this.$refs.choseType.open()
			},
			// 选择颜色
			changeColor(idx,color){
				this.current_c = idx
				this.isChoseColor = color
				this.choseMiniShow = this.colorList[idx].goodsImg
				this.getGoodsSize();
			},
			// 查看全部评价
			lookAllComment(){
				uni.navigateTo({
					url:"./allComment?goodsId="+this.goodsId
				})
			},
			// 选择尺码
			changeSize(idx,size){
				this.current_s = idx
				this.isChoseSize = size
			},
			cutNums(){
				if(this.buyNum <=1){
					uni.showToast({
						title:"不能再少了哦",
						icon:'none',
						duration:1500
					})
				}else{
					this.buyNum --
				}
			},
			addNums(){
				this.buyNum ++
			},
			// 用户是否收藏
			isCollection(){
				if(!this.userId){}else{
					this._Api.isCollect({
						userId : this.userId,
						goodsId : this.goodsId
					},res=>{
						console.log(res);
						if(res.meta.code === 200){
							this.isCollectionIcon = '../../static/icon_ysc.png'
							this.isCollectionFonts = "已收藏"
						}
					})
				}
			},
			// 用户是否登录
			isLogin(){
				uni.showModal({
				    title:'提示',
				    content:'您未登录，是否去登录？',
				    success:(res)=>{
				        if(res.confirm){
							uni.redirectTo({
								url: "../user/login"
							});
				        }else if(res.cancel){
				            // console.log('用户点击取消');
				        }
				    }
				});
			},
			// 收藏
			collection(){
				if(!this.userId){
					this.isLogin()
				}else{
					if(this.isCollectionFonts == "已收藏"){
						uni.showModal({
						    title: '提示',
						    content: '是否取消收藏',
						    success: (res)=> {
						        if(res.confirm){
						            this._Api.userDelCollection({
										userId : this.userId,
										goodsId : this.goodsId
									},res=>{
										console.log(res)
										if(res.meta.code === 200){
											uni.showToast({
												title:"取消收藏成功",
												icon:'none',
												duration:1500
											})
											this.isCollectionIcon = '../../static/icon_sc.png',
											this.isCollectionFonts = '收藏'
										}else{
											uni.showToast({
												title:res.meta.msg,
												icon:'none',
												duration:1500
											})
										}
									})
						        }else if(res.cancel){
						            // console.log('用户点击取消');
						        }
						    }
						});
					}else{
						this._Api.userCollection({
							userId : this.userId,
							goodsId : this.goodsId
						},res=>{
							console.log(res);
							if(res.meta.code === 200){
								this.isCollectionIcon = '../../static/icon_ysc.png'
								this.isCollectionFonts = "已收藏"
								uni.showToast({
									title:"收藏成功",
									icon:"none",
									duration:1500
								})
							}else{
								uni.showToast({
									title:res.meta.msg,
									icon:"none",
									duration:1500
								})
							}
						})
					}
				}
			},
			// 确定
			goBuy(){
				if(!this.userId){
					this.$refs.choseType.close()
					this.isShowUp = 0
					this.isLogin()
				}else{
					for(let i=0;i<this.sizeList.length;i++){
						if(this.sizeList[i].goodsColor == this.isChoseColor && this.sizeList[i].goodsSize == this.isChoseSize){
							this.goodsTypeId = this.sizeList[i].id
						}
					}
					if(this.buyType == "普通"){
						uni.setStorageSync("goodsId",this.goodsId);
						uni.setStorageSync("goodsTypeId",this.goodsTypeId);
						uni.setStorageSync("goodsNums",this.buyNum);
						uni.setStorageSync("buyType",this.buyType);
						// 单独购买
						uni.navigateTo({
							url:"./submitOrder"
						})
					}else if(this.buyType == "拼团"){
						uni.setStorageSync("goodsId",this.goodsId);
						uni.setStorageSync("goodsTypeId",this.goodsTypeId);
						uni.setStorageSync("goodsNums",this.buyNum);
						uni.setStorageSync("buyType",this.buyType);
						// 拼团购买
						uni.navigateTo({
							url:"./submitOrderPT"
						})
					}else if(this.buyType == 2){
						// 加入购物车
						this._Api.addShopCar({
							userId : this.userId,
							goodsId : this.goodsId,
							propertyId : this.goodsTypeId,
							goodsAmount : this.buyNum
						},res=>{
							if(res.meta.code === 200){
								this.$refs.choseType.close()
								this.isShowUp = 0
								uni.showToast({
									title:"加入成功,请在我的购物车查看",
									icon:"none",
									duration:1500
								})
							}else{
								this.$refs.choseType.close()
								uni.showToast({
									title:res.meta.msg,
									icon:"none",
									duration:1500
								})
							}
						})
					}
				}
			},
			// 分享
			shares(){
				this.$refs.shares.open()
				this.isShowUp = 1
			},
			closeShare(){
				this.$refs.shares.close()
				this.isShowUp = 0
			},
			// 参数
			cans(){
				this.$refs.cans.open()
				this.isShowUp = 1
			},
			closeCans(){
				this.$refs.cans.close()
				this.isShowUp = 0
			},
			// 选择
			// choseGoods(){
			// 	this.$refs.choseType.open()
			// },
			closeCT(){
				this.$refs.choseType.close()
				this.isShowUp = 0
			},
			// 客服
			goKF(){
				if(!this.userId){
					this.isLogin()
				}else{
					uni.navigateTo({
						url:"/pages/mine/curstomerService"
					})
				}
			},
			// 分享到微信
			shareWeChat(){
				if(!this.userId){
					this.isLogin();
				}else{
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 0,
					    href: "http://47.104.185.192:8080/didi/share.html?goodsId="+this.goodsInfo.id,
					    title: "尚品商城",
					    summary: "这件商品不错哦，快来看看吧~",
					    imageUrl: this.goodsInfo.goodsMainImg,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}
			},
			// 分享到朋友圈
			shareCircleOfFriends(){
				if(!this.userId){
					this.isLogin();
				}else{
					uni.share({
					    provider: "weixin",
					    scene: "WXSenceTimeline",
					    type: 0,
					    href: "http://47.104.185.192:8080/didi/share.html?goodsId="+this.goodsInfo.id,
					    title: "尚品商城",
					    summary: "这件商品不错哦，快来看看吧~",
					    imageUrl: this.goodsInfo.goodsMainImg,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.goodsBanner{
		height: 752rpx;
		position: relative;
		.swiper{
			width: 750rpx;
			height: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.gbTop{
			width: 94%;
			height: 60rpx;
			position: absolute;
			display: flex;
			justify-content: space-between;
			align-items: center;
			top: 50rpx;
			left: 50%;
			z-index: 999;
			margin-left: -47%;
			.backIcon,
			.shareIcon{
				width: 50rpx;
				height: 50rpx;
				image{
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
	.goodsInfo{
		width: 94%;
		height: 156rpx;
		margin: 0 auto;
		padding-top: 20rpx;
		.goodsDesc{
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goodsPrice{
				font-size: 32rpx;
				font-weight: bold;
				color: #FF584C;
			}
			.goodsBNums{
				font-size: 20rpx;
				color: #5D5D5D;
			}
		}
		.goodsName{
			height: 84rpx;
			font-size: 28rpx;
			overflow: hidden;
		}
	}
	.lookCans{
		width: 94%;
		height: 60rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		.lm-name{
			color: #747474;
		}
		.left{
			margin: 0 10rpx 0 10rpx;
		}
		.middle{
			margin: 0 10rpx 0 0;
		}
		.lm-desc{
			margin-left: 20rpx;
			text{
				padding: 6rpx;
				background-color: #F5F5F5;
				border-radius: 6rpx;
			}
		}
	}
	.choseType{
		width: 94%;
		height: 60rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		.ct-left{
			height: 60rpx;
			display: flex;
			align-items: center;
			.cl-name{
				color: #747474;
				margin-right: 10rpx;
			}
		}
		.ct-icon{
			width: 18rpx;
			height: 24rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.bgLine{
		height: 8rpx;
		background-color: #F4F4F4;
	}
	.comment-main{
		width: 96%;
		margin: 0 auto;
		.cm-title{
			height: 70rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.cm-name{
				font-size: 26rpx;
			}
			.cm-look{
				display: flex;
				align-items: center;
				.cl-font{
					font-size: 24rpx;
					color: #8C8C8C;
					margin-right: 10rpx;
				}
				.cl-icon{
					margin-bottom: 10rpx;
					image{
						width: 16rpx;
						height: 20rpx;
					}
				}
			}
		}
		.cm-body{
			.cb-header{
				height: 60rpx;
				display: flex;
				align-items: center;
				.ch-img{
					width: 52rpx;
					height: 52rpx;
					border-radius: 50%;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.ch-name{
					height: 52rpx;
					font-size: 26rpx;
					margin-left: 10rpx;
					line-height: 52rpx;
				}
			}
			.cb-time{
				width: 90%;
				height: 30rpx;
				margin: 0 auto;
				font-size: 20rpx;
				color: #808080;
				display: flex;
				align-items: center;
				.ct-time{
					margin-right: 20rpx;
				}
			}
			.cb-des{
				width: 90%;
				margin: 10rpx auto 10rpx;
				font-size: 22rpx;
			}
			.cb-imgs{
				width: 90%;
				margin: 0 auto;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.bi-item{
					width: 33%;
					height: 170rpx;
					text-align: center;
					border-radius: 10rpx;
					overflow: hidden;
					image{
						width: 200rpx;
						height: 160rpx;
					}
				}
			}
		}
	}
	.goods-iName{
		height: 60rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #F4F4F4;
		.gi-line{
			width: 60rpx;
			height: 2rpx;
			background-color: #999999;
		}
		.gi-fonts{
			font-size: 20rpx;
			margin: 0 10rpx 0 10rpx;
		}
	}
	.goodsShow{
		width: 96%;
		margin: 0 auto;
		.gs-title{
			height: 60rpx;
			margin: 0 auto;
			font-size: 22rpx;
			line-height: 60rpx;
		}
		.gs-img{
			width: 100%;
			image {
				width: 100%;
			}
		}
	}
	.bom-space{
		height: 98rpx;
	}
	.bottomMain{
		width: 100%;
		height: 98rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		z-index: 99999;
		.bm-left{
			width: 36%;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.lefts{
				margin-left: 10rpx;
			}
			.bl-item{
				width: 33%;
				text-align: center;
				height: 80rpx;
				.bi-icon{
					width: 36rpx;
					height: 36rpx;
					margin: 0 auto;
					margin-bottom: 10rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.bi-fonts{
					font-size: 20rpx;
				}
			}
		}
		.bm-right{
			width: 60%;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			view{
				width: 30%;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				font-size: 22rpx;
				color: #FFFFFF;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				margin: 0;
				padding: 0;
			}
			.jrgwc{
				background-image: url(../../static/bg_jrgwc.png);
			}
			.ddgm{
				background-image: url(../../static/bg_ddgm.png);
			}
			.fqpt{
				background-image: url(../../static/bg_fqpt.png);
			}
		}
	}
	.share-main{
		height: 350rpx;
		background-color: #FFFFFF;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.sm-title{
			height: 80rpx;
			font-size: 28rpx;
			line-height: 80rpx;
			text-align: center;
		}
		.sm-type{
			height: 180rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.st-item{
				width: 30%;
				text-align: center;
				.si-icon{
					image{
						width: 80rpx;
						height: 80rpx;
					}
				}
				.si-fonts{
					font-size: 24rpx;
				}
			}
		}
		.sm-lines{
			height: 10rpx;
			background-color: #F4F4F4;
		}
		.sm-btn{
			height: 80rpx;
			font-size: 26rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
	.cans-main{
		height: 452rpx;
		background-color: #FFFFFF;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.csm-title{
			height: 80rpx;
			font-size: 28rpx;
			line-height: 80rpx;
			text-align: center;
		}
		.csm-item{
			height: 82rpx;
			display: flex;
			align-items: center;
			font-size: 26rpx;
			border-bottom: 2rpx solid #E4E4E4;
			.ci-left{
				width: 20%;
				text-align: center;
			}
			.ci-right{
				color: #666666;
			}
		}
		.csm-btn{
			width: 700rpx;
			height: 80rpx;
			margin: 20rpx auto;
			background-image: url(../../static/bg_qd_cs.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			font-size: 28rpx;
			text-align: center;
			line-height: 80rpx;
			color: #FFFFFF;
		}
	}
	.type-main{
		height: 986rpx;
		background-color: #FFFFFF;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		position: relative;
		.tm-clIcon{
			width: 34rpx;
			height: 34rpx;
			position: absolute;
			top: 0;
			right: 16rpx;
			z-index: 99;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.tm-goodsInfo{
			width: 96%;
			height: 230rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			.tg-imgs{
				width: 240rpx;
				height: 200rpx;
				border-radius: 10rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.tg-info{
				height: 200rpx;
				margin-left: 50rpx;
				view{
					height: 40rpx;
					line-height: 40rpx;
				}
				.ti-price{
					margin-top: 60rpx;
					font-size: 28rpx;
					color: #FF584C;
				}
				.ti-kc{
					font-size: 24rpx;
					color: #999999;
				}
				.ti-chose{
					font-size: 24rpx;
				}
			}
		}
		.tm-color{
			width: 96%;
			margin: 20rpx auto 0;
			.tc-title{
				height: 50rpx;
				font-size: 26rpx;
				line-height: 50rpx;
			}
			.tc-main{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.tm-item{
					padding: 0 10rpx 0 10rpx;
					height: 50rpx;
					border-radius: 10rpx;
					margin: 0 14rpx 20rpx;
					font-size: 24rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #F1F1F1;
					.ti-img{
						width: 52rpx;
						height: 40rpx;
						margin-right: 6rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.ti-fonts{
						font-size: 22rpx;
						margin-left: 6rpx;
					}
				}
				.ac{
					background-color: #FF584C;
					color: #FFFFFF;
				}
			}
		}
		.tm-nums{
			width: 96%;
			height: 60rpx;
			margin: 20rpx auto 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.tn-name{
				font-size: 26rpx;
			}
			.tn-handle{
				display: flex;
				align-items: center;
				.th-item{
					width: 40rpx;
					height: 40rpx;
					border-radius: 10rpx;
					background-color: #F1F1F1;
					font-size: 24rpx;
					text-align: center;
					line-height: 40rpx;
				}
				.nums{
					margin: 0 10rpx 0 10rpx;
				}
			}
		}
		.tm-btn{
			width: 700rpx;
			height: 80rpx;
			background-image: url(../../static/bg_qd_cs.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			font-size: 28rpx;
			text-align: center;
			line-height: 80rpx;
			color: #FFFFFF;
			position: absolute;
			left: 50%;
			margin-left: -350rpx;
			bottom: 20rpx;
		}
	}
</style>
