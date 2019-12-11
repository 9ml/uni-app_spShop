<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left"></view>
			<view class="t-main">
				我的
			</view>
			<view class="t-right" @tap="goNotice()">
				<image src="../../static/icon_tz_wd.png" mode=""></image>
			</view>
		</view>
		<view class="space_nav"></view>
		<!-- 用户信息 -->
		<view class="top-main">
			<view class="tm-bg">
				<image src="../../static/bg_wd.png" mode=""></image>
			</view>
			<view class="tm-main">
				<view class="tm-user" v-if="isLogin" @tap="lookMine()">
					<view class="tu-left">
						<view class="tl-header">
							<image :src="userMain.userImg" mode=""></image>
						</view>	
						<view class="tl-name">
							{{userMain.userName}}
						</view>
					</view>
					<view class="tu-right">
						<image src="../../static/icon_jr_wd.png" mode=""></image>
					</view>
				</view>
				<view class="tm-user" v-if="notLogin" @tap="goLogin()">
					<view class="tu-left">
						<view class="tl-header">
							<image src="../../static/icon_ps_wl.png" mode=""></image>
						</view>
						<view class="tl-name">
							点击登录
						</view>
					</view>
					<view class="tu-right">
						<image src="../../static/icon_jr_wd.png" mode=""></image>
					</view>
				</view>
				<view class="tm-all">
					<view class="ta-top" @tap="goMyOrderAll()">
						<view class="tt-title">
							我的订单
						</view>
						<view class="tt-icon">
							<image src="../../static/icon_jr.png" mode=""></image>
						</view>
					</view>
					<view class="ta-bom">
						<view class="tb-item" v-for="(c_item,c_idx) in choseList_A" :key="c_idx" @tap="goMyOrder(c_item.cid,c_item.cname)">
							<view class="ti-icon">
								<image :src="c_item.cimg" mode=""></image>
							</view>
							<view class="ti-name">
								{{c_item.cname}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 我的 -->
		<view class="mine-item" v-for="(cb_item,cb_idx) in choseList_B" :key="cb_idx" @tap="goMore(cb_idx)">
			<view class="mi-left">
				{{cb_item.cb_name}}
			</view>
			<view class="mi-icon">
				<image :src="cb_item.cb_icon" mode=""></image>
			</view>
		</view>
		<!-- 退出登录 -->
		<view class="logoutBtn" @tap="logout()">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId : 0,
				// 已登录
				isLogin : false,
				// 未登录
				notLogin : true,
				// 选项列表1
				choseList_A : [
					{
						cid : 1,
						cimg : '../../static/icon_dfk.png',
						cname : '待付款'
					},
					{
						cid : 2,
						cimg : '../../static/icon_dfh.png',
						cname : '待发货'
					},
					{
						cid : 3,
						cimg : '../../static/icon_dsh.png',
						cname : '待收货'
					},
					{
						cid : 4,
						cimg : '../../static/icon_dqs.png',
						cname : '待签收'
					},
					{
						cid : 5,
						cimg : '../../static/icon_dpj.png',
						cname : '待评价'
					},
					{
						cid : 6,
						cimg : '../../static/icon_sh.png',
						cname : '售后'
					}
				],
				// 选项列表2
				choseList_B : [
					{
						cb_id : 1,
						cb_name : '我收藏的商品',
						cb_icon : '../../static/icon_jr.png'
					},
					{
						cb_id : 2,
						cb_name : '我的钱包',
						cb_icon : '../../static/icon_jr.png'
					},
					{
						cb_id : 3,
						cb_name : '我的收货地址',
						cb_icon : '../../static/icon_jr.png'
					},
					{
						cb_id : 4,
						cb_name : '客服',
						cb_icon : '../../static/icon_jr.png'
					},
					{
						cb_id : 5,
						cb_name : '意见反馈',
						cb_icon : '../../static/icon_jr.png'
					},
					{
						cb_id : 6,
						cb_name : '修改密码',
						cb_icon : '../../static/icon_jr.png'
					},
					{
						cb_id : 7,
						cb_name : '我的邀请',
						cb_icon : '../../static/icon_jr.png'
					}
				],
				// 用户信息
				userMain : '',
			}
		},
		onLoad() {
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
			// 用户信息
			getUserInfo(){
				this.userId = uni.getStorageSync('userId');
				this.imgUrl = this._Api.imgUrl
				if(!this.userId){
					this.isLogin = false
					this.notLogin = true
				}else{
					this._Api.getUserInfo({
						id : this.userId
					},res=>{
						console.log(res);
						if(res.meta.code === 200){
							if(res.data.userImg.indexOf("http") != -1){}else{
								res.data.userImg = this.imgUrl + res.data.userImg
							}
							this.userMain = res.data
							this.isLogin = true
							this.notLogin = false
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
			goMore(idx){
				if(!this.userId){
					this.isOrLogin();
				}else{
					if(idx == 0){
						uni.navigateTo({
							url:"./collection"
						})
					}else if(idx == 1){
						uni.navigateTo({
							url:"./myWallet?userWallet="+this.userMain.userBalance
						})
					}else if(idx == 2){
						uni.setStorageSync("choseAdressType",100);
						uni.navigateTo({
							url:"./myAdress"
						})
					}else if(idx == 3){
						uni.navigateTo({
							url:"./curstomerService"
						})
					}else if(idx == 4){
						uni.navigateTo({
							url:"./feedBack"
						})
					}else if(idx == 5){
						uni.navigateTo({
							url:"./updatePwd"
						})
					}else if(idx == 6){
						uni.navigateTo({
							url:"./myInvitation"
						})
					}
				}
			},
			// 退出登录
			logout(){
				if(!this.userId){
					this.isOrLogin();
				}else{
					uni.showModal({
					    title: '提示',
					    content: '确定退出登录吗',
					    success:(res)=>{
					        if(res.confirm){
					            uni.clearStorageSync("userId");
					            uni.showToast({
					            	title:"退出成功",
					            	icon:"none",
					            	duration:1500
					            })
					            setTimeout(()=>{
					            	uni.reLaunch({
					            		url:"/pages/user/login"
					            	})
					            },1500)
					        }else if(res.cancel){
					            // console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			// 跳转我的资料
			lookMine(){
				uni.navigateTo({
					url:"./personalData"
				})
			},
			// 跳转通知
			goNotice(){
				uni.navigateTo({
					url:"./notice"
				})
			},
			// 跳转登录
			goLogin(){
				uni.navigateTo({
					url: "../user/login"
				})
			},
			// 用户是否登录
			isOrLogin(){
				uni.showModal({
				    title:'提示',
				    content:'您未登录，是否去登录？',
				    success:(res)=>{
				        if(res.confirm){
							uni.navigateTo({
								url: "../user/login"
							});
				        }else if(res.cancel){
				            // console.log('用户点击取消');
				        }
				    }
				});
			},
			// 我的订单 - 全部
			goMyOrderAll(){
				if(!this.userId){
					this.isOrLogin();
				}else{
					uni.navigateTo({
						url:'./myOrder?idx='+'0'
					})
				}
			},
			// 我的订单
			goMyOrder(idx,types){
				if(!this.userId){
					this.isOrLogin();
				}else{
					uni.navigateTo({
						url:"./myOrder?idx="+idx+"&types="+types
					})
				}
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
			image{
				width: 28rpx;
				height: 34rpx;
			}
		}
	}
	.top-main{
		width: 100%;
		height: 360rpx;
		position: relative;
		.tm-bg{
			width: 100%;
			height: 200rpx;
			position: absolute;
			top: 0;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.tm-main{
			width: 94%;
			height: 300rpx;
			position: absolute;
			z-index: 999;
			top: 40rpx;
			left: 50%;
			margin-left: -47%;
			.tm-user{
				width: 96%;
				height: 100rpx;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.tu-left{
					display: flex;
					align-items: center;
					.tl-header{
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
						overflow: hidden;
						image{
							width: 90rpx;
							height: 90rpx;
						}
					}
					.tl-name{
						font-size: 28rpx;
						font-weight: bold;
						margin-left: 10rpx;
						color: #FFFFFF;
					}
				}
				.tu-right{
					image{
						width: 16rpx;
						height: 24rpx;
					}
				}
			}
			.tm-all{
				height: 180rpx;
				background-color: #FFFFFF;
				border-radius: 16rpx;
				box-shadow: 5rpx 5rpx 10rpx #C0C0C0;
				.ta-top{
					width: 96%;
					height: 60rpx;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.tt-title{
						font-size: 26rpx;
					}
					.tt-icon{
						image{
							width: 16rpx;
							height: 24rpx;
						}
					}
				}
				.ta-bom{
					width: 96%;
					height: 110rpx;
					margin: 0 auto;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.tb-item{
						width: 16%;
						text-align: center;
						height: 90rpx;
						.ti-icon{
							image{
								width: 40rpx;
								height: 40rpx;
							}
						}
						.ti-name{
							font-size: 20rpx;
						}
					}
				}
			}
		}
	}
	.mine-item{
		width: 94%;
		height: 70rpx;
		margin: 0 auto 18rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.mi-left{
			margin-left: 16rpx;
			font-size: 26rpx;
		}
		.mi-icon{
			margin: 0 16rpx 6rpx 0;
			image{
				width: 18rpx;
				height: 24rpx;
			}
		}
	}
	.logoutBtn{
		width: 700rpx;
		height: 70rpx;
		border: 1rpx solid #FF584C;
		margin: 50rpx auto 0;
		border-radius: 16rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FF584C;
	}
</style>
