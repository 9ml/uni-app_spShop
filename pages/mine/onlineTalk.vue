<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				在线咨询
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="user-a">
			<view class="a-user">
				<view class="au-header">
					<image src="../../static/user.png" mode=""></image>
				</view>
				<view class="au-name">
					客服001
				</view>
			</view>
			<view class="a-words">
				<text>您好！请问什么问题</text>
			</view>
		</view>
		<view class="user-b">
			<view class="b-user">
				<view class="bu-header">
					<image src="../../static/user.png" mode=""></image>
				</view>
				<view class="bu-name">
					小茄子
				</view>
			</view>
			<view class="b-words">
				<text>你好，有个问题想咨询一下</text>
			</view>
		</view>
		<view class="user-a">
			<view class="a-user">
				<view class="au-header">
					<image src="../../static/user.png" mode=""></image>
				</view>
				<view class="au-name">
					客服001
				</view>
			</view>
			<view class="a-words">
				<text>您好！请问什么问题</text>
			</view>
		</view>
		<view class="user-b">
			<view class="b-user">
				<view class="bu-header">
					<image src="../../static/user.png" mode=""></image>
				</view>
				<view class="bu-name">
					小茄子
				</view>
			</view>
			<view class="b-words">
				<text>你好，有个问题想咨询一下</text>
			</view>
		</view>
		<!-- 输入框 -->
		<view class="bom-main">
			<view class="bm-body">
				<view class="bb-icon">
					<image src="../../static/icon_tj_zx.png" mode=""></image>
				</view>
				<view class="bb-inp">
					<input type="text" placeholder="请输入要发送的内容">
				</view>
				<view class="bb-btn">
					发送
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onReady() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F4F4;
	}
	.user-a{
		width: 90%;
		margin: 30rpx auto 0;
		.a-user{
			display: flex;
			align-items: center;
			.au-header{
				width: 64rpx;
				border-radius: 50%;
				overflow: hidden;
				height: 64rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.au-name{
				font-size: 24rpx;
				margin-left: 10rpx;
			}
		}
		.a-words{
			margin-top: 10rpx;
			text{
				padding: 16rpx;
				background-color: #FFFFFF;
				border-radius: 16rpx;
				font-size: 26rpx;
			}
		}
	}
	.user-b{
		width: 90%;
		margin: 30rpx auto 0;
		.b-user{
			display: flex;
			align-items: center;
			flex-direction: row-reverse;
			.bu-name{
				font-size: 24rpx;
				margin-right: 10rpx;
			}
			.bu-header{
				width: 64rpx;
				border-radius: 50%;
				overflow: hidden;
				height: 64rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.b-words{
			margin-top: 10rpx;
			text-align: right;
			text{
				padding: 16rpx;
				background-color: #FFFFFF;
				border-radius: 16rpx;
				font-size: 26rpx;
			}
		}
	}
	.bom-main{
		width: 100%;
		height: 100rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		.bm-body{
			width: 96%;
			height: 100rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.bb-icon{
				width: 10%;
				text-align: center;
				height: 40rpx;
				image{
					width: 40rpx;
					height: 40rpx;
				}
			}
			.bb-inp{
				width: 74%;
				height: 60rpx;
				background-color: #F4F4F4;
				border-radius: 30rpx;
				input{
					width: 100%;
					height: 100%;
					padding-left: 20rpx;
					font-size: 24rpx;
				}
			}
			.bb-btn{
				width: 12%;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				border: 1rpx solid #FF584C;
				border-radius: 25rpx;
				font-size: 22rpx;
				color: #FF584C;
				margin-left: 10rpx;
			}
		}
	}
</style>
