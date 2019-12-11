<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				余额充值
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="chose-main" v-for="(p,p_idx) in typeList" @tap="choseThis(p_idx)" :key="p_idx">
			<view class="chose-item">
				<view class="ci-left">
					<view class="cl-icon">
						<image :src="p.ticon" mode=""></image>
					</view>
					<view class="cl-fonts">
						{{p.tname}}
					</view>
				</view>
				<view class="ci-right" :class="[current === p_idx ? 'ac' : '']"></view>
			</view>
		</view>
		<view class="inp-main">
			<view class="im-space"></view>
			<view class="im-top">
				<view class="it-fonts">
					充值金额
				</view>
				<view class="it-input">
					<input type="text" placeholder="¥0.00" placeholder-style="color:#000000;" />
				</view>
			</view>
			<view class="im-bom">
				确认支付
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList : [
					{
						tid : 1,
						ticon : '/static/btn_weixi.png',
						tname : '微信'
					},
					{
						tid : 2,
						ticon : '/static/icon_zfb_syt.png',
						tname : '支付宝'
					},
				],
				current : 0,
			}
		},
		onLoad(){
			
		},
		methods:{
			choseThis(idx){
				this.current = idx
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.chose-main{
		border-bottom: 1rpx solid #E4E4E4;
		.chose-item{
			width: 90%;
			height: 100rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.ci-left{
				display: flex;
				align-items: center;
				.cl-icon{
					width: 70rpx;
					height: 70rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.cl-fonts{
					margin-left: 20rpx;
					font-size: 24rpx;
				}
			}
			.ci-right{
				width: 30rpx;
				height: 30rpx;
				background-image: url(../../static/icon_wx_qx.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			.ac{
				width: 30rpx;
				height: 30rpx;
				background-image: url(../../static/icon_xz_qx.png);
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
		}
	}
	.inp-main{
		width: 96%;
		height: 400rpx;
		margin: 20rpx auto 0;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		.im-space{
			height: 100rpx;
		}
		.im-top{
			width: 600rpx;
			height: 100rpx;
			margin: 0 auto;
			border-bottom: 1rpx solid #E4E4E4;
			display: flex;
			text-align: center;
			align-items: center;
			.it-fonts{
				width: 140rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 20rpx;
				color: #333333;
			}
			.it-input{
				width: 320rpx;
				height: 80rpx;
				input{
					width: 100%;
					height: 100%;
					color: #000000;
					font-size: 42rpx;
				}
			}
		}
		.im-bom{
			width: 300rpx;
			height: 82rpx;
			margin: 50rpx auto;
			background-image: url(../../static/btn_zhuce_zhuce.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			font-size: 30rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 82rpx;
		}
	}
</style>
