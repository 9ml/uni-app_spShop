<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				取消订单
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="bz-main">
			请选择取消订单的原因(必选)
		</view>
		<view class="c-all" v-for="(item,index) in list" :key="index" @tap="chose(index)">
			<view class="c-body">
				<view class="cb-left">
					{{item.i_name}}
				</view>
				<view class="cb-right" :class="current === index ? 'ac' : ''"></view>
			</view>
		</view>
		<view class="s-btn" @tap="delSure()">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list : [
					{
						i_id : 1,
						i_name : '商品无贷',
						orderStatus : 91
					},
					{
						i_id : 2,
						i_name : '不想要了',
						orderStatus : 92
					},
					{
						i_id : 3,
						i_name : '商品信心填写错误',
						orderStatus : 93
					},
					{
						i_id : 4,
						i_name : '地址信息填写错误',
						orderStatus : 94
					},
					{
						i_id : 5,
						i_name : '商品降价',
						orderStatus : 95
					},
					{
						i_id : 6,
						i_name : '其他原因',
						orderStatus : 96
					},
				],
				current : 0,
				orderStatus : 91,
				userId : uni.getStorageSync('userId')
			}
		},
		onLoad(options) {
			this.orderId = options.orderId
		},
		methods:{
			chose(index){
				this.current = index
				this.orderStatus = this.list[index].orderStatus
			},
			// 提交
			delSure(){
				this._Api.userdelOrder({
					orderNum : this.orderNum
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:"取消订单成功",
							icon:'none',
							duration:1500
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:'../mine/myOrder'
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
		}
	}
</script>

<style lang="scss">
	.bz-main{
		width: 90%;
		height: 50rpx;
		font-size: 24rpx;
		line-height: 50rpx;
		margin: 0 auto;
		color: #666666;
	}
	.c-all{
		border-bottom: 1rpx solid #F4F4F4;
		.c-body{
			width: 90%;
			height: 72rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.cb-left{
				font-size: 22rpx;
			}
			.cb-right{
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
	.s-btn{
		width: 260rpx;
		height: 72rpx;
		margin: 50rpx auto;
		background-image: url(../../static/btn_zhuce_zhuce.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 72rpx;
	}
</style>
