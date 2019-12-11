<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				通知
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="n-main" v-for="(s,s_idx) in getSystemInfo" :key="s_idx">
			<view class="nm-body">
				<view class="nb-left">
					<view class="nl-top">
						{{s.messageTitle}}
					</view>
					<view class="nl-bom">
						{{s.messageContent}}
					</view>
				</view>
				<view class="nb-right">
					{{s.createTime}}
				</view>
			</view>
		</view>
		<view class="n-main" v-for="(o,o_idx) in getOrderInfo" @tap="lookOrder(o.orderNum)" :key="o_idx">
			<view class="nm-body">
				<view class="nb-left">
					<view class="nl-top">
						{{o.title}}
					</view>
					<view class="nl-bom">
						{{o.content}}
					</view>
				</view>
				<view class="nb-right">
					{{o.createTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId : uni.getStorageSync("userId"),
				getSystemInfo : [],
				getOrderInfo : []
			}
		},
		onLoad() {
			this.getSystemInfos();
			this.getOrderInfos();
		},
		methods: {
			getSystemInfos(){
				this._Api.showSystemMessage({},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.getInfo = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			getOrderInfos(){
				this._Api.showOrderMessage({
					userId : this.userId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.getOrderInfo = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			lookOrder(nums){
				// if(!nums){}else{
				// 	uni.navigateTo({
				// 		url:'./myOrder?idx='+'0'
				// 	})
				// }
			}
		},
	}
</script>

<style lang="scss">
	.n-main{
		border-bottom: 1rpx solid #F5F5F5;
		.nm-body{
			width: 90%;
			height: 100rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.nb-left{
				.nl-top{
					font-size: 26rpx;
					height: 40rpx;
					line-height: 40rpx;
				}
				.nl-bom{
					height: 60rpx;
					color: #8C8C8C;
					font-size: 26rpx;
					display: -webkit-box;
					overflow: hidden;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
				}
			}
			.nb-right{
				font-size: 22rpx;
				color: #666666;
			}
		}
	}
</style>
