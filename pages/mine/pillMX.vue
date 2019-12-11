<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				账单明细
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="pmx" v-for="(m,m_idx) in gotInfo" :key="m_idx">
			<view class="pm-item">
				<view class="pi-left">
					<view class="pl-top">
						{{m.withdraw}}
					</view>
					<view class="pl-bom">
						{{m.createTime}}
					</view>
				</view>
				<view class="pi-rihgt">
					<view class="pr-top">
						成功
					</view>
					<view class="pr-bom">
						{{m.isAddOrCut}}{{m.money}}
					</view>
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
				gotInfo : []
			}
		},
		onLoad() {
			this.getInfo();
		},
		methods: {
			getInfo(){
				this._Api.showWithdrawMoney({
					userId : this.userId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						res.data.forEach((i)=>{
							if(i.withdraw === "支付" || i.withdraw === "提现"){
								i.isAddOrCut = "-"
							}else{
								i.isAddOrCut = "+"
							}
						})
						this.gotInfo = res.data
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
	}
</script>

<style lang="scss">
	.pmx{
		border-bottom: 1px solid #E4E4E4;
		.pm-item{
			width: 90%;
			height: 110rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.pi-left .pl-top,
			.pi-rihgt .pr-top{
				height: 50rpx;
				line-height: 50rpx;
				font-size: 28rpx;
			}
			.pi-left .pl-bom,
			.pi-rihgt .pr-bom{
				font-size: 24rpx;
			}
			.pi-left .pl-bom{
				color: #999999;
			}
			.pi-rihgt .pr-bom{
				color: #FF854C;
			}
		}
	}
</style>
