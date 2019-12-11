<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				我的邀请
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="miTitle">
			邀请好友加入
		</view>
		<view class="miCode">
			{{userId}}
		</view>
		<view class="miBtn" @tap="shares()">
			分享邀请码
		</view>
		<!-- 分享 -->
		<uni-popup ref="shares" type="bottom" :custom="true">
			<view class="share-main">
				<view class="sm-title">
					点击分享
				</view>
				<view class="sm-type">
					<view class="st-item" @tap="shareWeChats()">
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
				userId : uni.getStorageSync("userId"),
				logo : '/static/icon.png'
			}
		},
		onLoad(){
			this.imgUrl = this._Api.imgUrl
		},
		methods:{
			shares(){
				this.$refs.shares.open()
			},
			closeShare(){
				this.$refs.shares.close()
			},
			// 分享到微信
			shareWeChats(){
				if(!this.userId){
					this.isLogin();
				}else{
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 0,
					    href: "http://47.104.185.192:8080/didi/registe.html?invitationCode="+this.userId,
					    title: "尚品商城",
					    summary: "这款软件不错哦，进来可以拿到我的邀请码哦，快来加入我吧~",
					    imageUrl: this.imgUrl + "/jeeplus/userfiles/1/upload//marguerite/advert/mgltAdvertTable/2019/11/2019Ud1117mV15124R21.png",
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
					    href: "http://47.104.185.192:8080/didi/registe.html?invitationCode="+this.userId,
					    title: "尚品商城",
					    summary: "这款软件不错哦，进来可以拿到我的邀请码哦，快来加入我吧~",
					    imageUrl: this.logo,
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
	page{
		background-color: #F5F5F5;
	}
	.miTitle{
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 28rpx;
	}
	.miCode{
		width: 94%;
		height: 60rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 26rpx;
	}
	.miBtn{
		width: 300rpx;
		height: 82rpx;
		margin: 100rpx auto;
		background-image: url(../../static/btn_zhuce_zhuce.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		font-size: 30rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 82rpx;
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
</style>
