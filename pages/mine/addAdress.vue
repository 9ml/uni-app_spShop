<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				添加收货地址
			</view>
			<view class="t-right" @click="saveNewAdress()">
				保存
			</view>
		</view>
		<view class="space_nav"></view>
		<view class="aa-item">
			<view class="ai-left">
				收货人:
			</view>
			<view class="ai-right">
				<input type="text" v-model="userName" placeholder="请输入收货人名称">
			</view>
		</view>
		<view class="aa-item">
			<view class="ai-left">
				手机号:
			</view>
			<view class="ai-right">
				<input type="text" v-model="userPhone" placeholder="请输入收货人手机号">
			</view>
		</view>
		<view class="aa-area">
			<view class="aa-left">
				详细地址:
			</view>
			<view class="aa-right">
				<textarea v-model="userAdress" placeholder="请输入详细地址" />
			</view>
		</view>
		<view class="aa-bom">
			<view class="ab-left">
				设为默认地址
			</view>
			<view class="ab-icon" @tap="changeMoRen()">
				<image :src="isMoRenIcon" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMoRenIcon : '../../static/icon_kg_tj.png',
				isMoRenAdress : 0,
				userId : uni.getStorageSync('userId'),
				userName : '',
				userPhone : '',
				userAdress : ''
			}
		},
		onLoad() {
			// this.userInfo = getApp().globalData
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			saveNewAdress(){
				if(!(/^1[3456789]\d{9}$/.test(this.userPhone))){
					uni.showToast({
						title:"手机号格式有误！",
						icon:"none",
						duration:1500
					})
					return;
				}
				this._Api.addUserAdreses({
					consigneeName : this.userName,
					consigneePhone : this.userPhone,
					consigneeAddress : this.userAdress,
					idDefault : this.isMoRenAdress,
					userId : this.userId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:"添加成功",
							icon:"none",
							duration:1500
						})
						setTimeout(()=>{
							uni.redirectTo({
							    url: './myAdress'
							});
						},1500)
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			changeMoRen(){
				this.isMoRenIcon == "../../static/icon_kg_tj.png" ? (this.isMoRenIcon = "../../static/icon_lg_bj.png",this.isMoRenAdress = 1) : (this.isMoRenIcon = "../../static/icon_kg_tj.png",this.isMoRenAdress = 0)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F4F4;
	}
	.topNav{
		.t-right{
			margin-top: 40rpx;
			font-size: 26rpx;
			color: #FF584C;
		}
	}
	.aa-item{
		width: 94%;
		height: 82rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 18rpx auto 18rpx;
		display: flex;
		align-items: center;
		.ai-left{
			width: 18%;
			height: 60rpx;
			font-size: 26rpx;
			text-align: center;
			line-height: 60rpx;
		}
		.ai-right{
			width: 80%;
			height: 60rpx;
			input{
				width: 100%;
				height: 100%;
				font-size: 26rpx;
			}
		}
	}
	.aa-area{
		width: 94%;
		height: 200rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 18rpx auto 18rpx;
		display: flex;
		.aa-left{
			width: 18%;
			height: 60rpx;
			font-size: 26rpx;
			text-align: center;
			line-height: 60rpx;
		}
		.aa-right{
			width: 80%;
			height: 170rpx;
			margin-top: 16rpx;
			textarea{
				width: 100%;
				height: 100%;
				font-size: 26rpx;
			}
		}
	}
	.aa-bom{
		width: 94%;
		height: 82rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 18rpx auto 18rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.ab-left{
			height: 40rpx;
			line-height: 40rpx;
			margin-left: 16rpx;
			font-size: 26rpx;
		}
		.ab-icon{
			height: 40rpx;
			margin-right: 16rpx;
			image{
				width: 70rpx;
				height: 40rpx;
			}
		}
	}
</style>
