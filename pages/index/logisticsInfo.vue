<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				物流信息
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<!-- 快递名称 -->
		<view class="top-main">
			{{logisticsInfos.expName}}：{{logisticsInfos.number}}
		</view>
		<!-- 快递信息 -->
		<view class="l-main">
			<view class="lm-item" v-for="(l,l_idx) in logisticsInfos.list" :key="l_idx">
				<view class="li-lines"></view>
				<view class="li-time">
					<view class="lt-top">
						{{l.time}}
					</view>
					<!-- <view class="lt-bom">
						15:00
					</view> -->
				</view>
				<view class="li-icon">
					<image src="../../static/icon_ys_wl.png" mode=""></image>
				</view>
				<view class="li-info">
					<!-- <view class="li-top">
						运输中
					</view> -->
					<view class="li-bom">
						{{l.status}}
					</view>
				</view>
			</view>
			<!-- <view class="lm-item">
				<view class="li-lines"></view>
				<view class="li-time">
					<view class="lt-top">
						07-19
					</view>
					<view class="lt-bom">
						15:00
					</view>
				</view>
				<view class="li-icon">
					<image src="../../static/icon_ys_wl.png" mode=""></image>
				</view>
				<view class="li-info">
					<view class="li-top">
						已发货
					</view>
					<view class="li-bom">
						商品正在等待揽收
					</view>
				</view>
			</view>
			<view class="lm-item">
				<view class="li-lines"></view>
				<view class="li-time">
					<view class="lt-top">
						07-19
					</view>
					<view class="lt-bom">
						15:00
					</view>
				</view>
				<view class="li-icon">
					<image src="../../static/icon_ys_wl.png" mode=""></image>
				</view>
				<view class="li-info">
					<view class="li-top">
						已下单
					</view>
					<view class="li-bom">
						买家已下单
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 物流信息
				logisticsInfos : ""
			}
		},
		onLoad(options) {
			this.logisticsCode = options.logisticsCode
			this.getlogisticsInfo();
		},
		methods: {
			getlogisticsInfo(){
				this._Api.logisticsInfo({
					logisticsCode : this.logisticsCode
				},res=>{
					console.log(res);
					if(res.status === '0'){
						this.logisticsInfos = res.result
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.top-main{
		width: 94%;
		height: 60rpx;
		margin: 18rpx auto 18rpx;
		background-color: #FFFFFF;
		font-size: 24rpx;
		line-height: 60rpx;
		border-radius: 16rpx;
		padding-left: 26rpx;
	}
	.l-main{
		width: 96%;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 0 auto;
		// display: flex;
		// flex-wrap: wrap;
		.lm-item{
			width: 98%;
			height: 100rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			position: relative;
			.li-lines{
				width: 4rpx;
				height: 70rpx;
				background-color: #E4E4E4;
				position: absolute;
				bottom: 70rpx;
				left: 104rpx;
			}
			.li-time{
				width: 10%;
				height: 80rpx;
				text-align: right;
				view{
					height: 30rpx;
					line-height: 30rpx;
				}
				.lt-top{
					margin-top: 10rpx;
					font-size: 22rpx;
				}
				.lt-bom{
					font-size: 18rpx;
					color: #808080;
				}
			}
			.li-icon{
				width: 10%;
				height: 80rpx;
				text-align: center;
				image{
					width: 36rpx;
					height: 36rpx;
					margin-top: 20rpx;
				}
			}
			.li-info{
				width: 80%;
				height: 90rpx;
				font-size: 20rpx;
				.li-top{
					height: 30rpx;
					line-height: 30rpx;
					margin-top: 10rpx;
				}
				.li-bom{
					height: 60rpx;
					color: #555555;
					overflow: hidden;
					text{
						color: #FF584C;
					}
				}
			}
		}
	}
</style>
