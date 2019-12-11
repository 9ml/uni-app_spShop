<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				修改收货地址
			</view>
			<view class="t-right" @tap="save()">
				保存
			</view>
		</view>
		<view class="space_nav"></view>
		<view class="aa-item">
			<view class="ai-left">
				收货人:
			</view>
			<view class="ai-right">
				<input type="text" v-model="userThisAdressInfo.consigneeName" placeholder="请输入收货人名称">
			</view>
		</view>
		<view class="aa-item">
			<view class="ai-left">
				手机号:
			</view>
			<view class="ai-right">
				<input type="text" v-model="userThisAdressInfo.consigneePhone" placeholder="请输入收货人手机号">
			</view>
		</view>
		<view class="aa-area">
			<view class="aa-left">
				详细地址:
			</view>
			<view class="aa-right">
				<textarea v-model="userThisAdressInfo.consigneeAddress" placeholder="请输入详细地址" />
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
		<view class="del-btn" @click="delThisAdress()">
			删除收货地址
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId : uni.getStorageSync('userId'),
				userThisAdressInfo : '',
				isMoRenIcon : '../../static/icon_kg_tj.png',
				isMoRenAdress : 0,
			}
		},
		onLoad(options) {
			this.consigneeId = options.consigneeId
			this.getThisAdress()
		},
		methods: {
			getThisAdress(){
				this._Api.getUserThisAdreses({
					id : this.consigneeId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.userThisAdressInfo = res.data
						this.isMoRenAdress = res.data.idDefault
						if(this.isMoRenAdress === 1){
							this.isMoRenIcon = "../../static/icon_lg_bj.png"
						}
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			delThisAdress(){
				uni.showModal({
				    title: '提示',
				    content: '确定删除此地址吗？',
				    success: (res)=> {
				        if (res.confirm) {
							this._Api.delUserThisAdreses({
								id : this.consigneeId
							},res=>{
								console.log(res);
								if(res.meta.code === 200){
									uni.showToast({
										title:"删除成功",
										icon:"none",
										duration:1500
									});
									setTimeout(()=>{
										uni.redirectTo({
											url:"./myAdress"
										})
									},1500)
								}else{
									uni.showToast({
										title:res.meta.msg,
										icon:"none",
										duration:1500
									});
								}
							})
				        } else if (res.cancel) {
				            // console.log('用户点击取消');
				        }
				    }
				});
			},
			save(){
				if(!(/^1[3456789]\d{9}$/.test(this.userThisAdressInfo.consigneePhone))){
					uni.showToast({
						title:"手机号格式有误！",
						icon:"none",
						duration:1500
					})
					return;
				}
				this._Api.updateUserThisAdreses({
					userId : this.userId,
					id : this.consigneeId,
					consigneeName : this.userThisAdressInfo.consigneeName,
					consigneePhone : this.userThisAdressInfo.consigneePhone,
					consigneeAddress : this.userThisAdressInfo.consigneeAddress,
					idDefault : this.isMoRenAdress
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						uni.showToast({
							title:"保存成功",
							icon:'none',
							duration:1500
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:"./myAdress"
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
	.del-btn{
		width: 700rpx;
		height: 80rpx;
		margin: 50rpx auto 0;
		background-image: url(../../static/bg_qd_cs.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		font-size: 28rpx;
		text-align: center;
		line-height: 80rpx;
		color: #FFFFFF;
	}
</style>
