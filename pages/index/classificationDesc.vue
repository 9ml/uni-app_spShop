<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				商品分类
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<view class="class-main">
			<view class="cm-left-space"></view>
			<view class="cm-left-main">
				<view class="clm-item" v-for="(lnl_item,lnl_idx) in leftNavList" :key="lnl_idx" @tap="choseNav(lnl_idx)" :class="current === lnl_idx ? 'ac' : ''">
					{{lnl_item.name}}
				</view>
			</view>
			<view class="cm-rifht-main">
				<view class="crm-main">
					<view class="cm-item" v-for="(c,c_idx) in childKindsInfo" :key="c_idx" @tap="goGoodsInfo(c.id)">
						<view class="ci-icon">
							<image :src="c.categoryImg" mode=""></image>
						</view>
						<view class="ci-name">
							{{c.name}}
						</view>
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
				// 分类父信息
				leftNavList : [],
				// 分类子信息
				childKindsInfo : [],
				current : 0,
				typeId : 0
			}
		},
		onLoad(options) {
			this.imgUrl = this._Api.imgUrl;
			this.typeId = parseInt(options.idx)
			this.getAllKinds()
		},
		methods: {
			// 所有分类
			getAllKinds(){
				this._Api.getAllFL({},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.leftNavList = res.data
						this.choseNav(this.typeId)
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 获取分类子信息
			choseNav(idx){
				this.current = idx
				if(this.leftNavList.length !== 0){
					var type = this.leftNavList[idx].id
				}
				this._Api.getAllFLChildKinds({
					id : type
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.childKindsInfo = [];
						res.data.forEach((i)=>{
							i.categoryImg = this.imgUrl + i.categoryImg
						})
						this.childKindsInfo = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 跳转
			goGoodsInfo(idx){
				uni.navigateTo({
					url:'./goodsList?categoryId='+idx
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F9F9F9;
	}
	.class-main{
		overflow: auto;
		display: flex;
		.cm-left-space{
			width: 20%;
		}
		.cm-left-main{
			width: 20%;
			height: 100vh;
			background-color: #F4F4F4;
			position: fixed;
			top: 130rpx;
			left: 0;
			z-index: 999;
			.clm-item{
				height: 100rpx;
				line-height: 100rpx;
				font-size: 26rpx;
				text-align: center;
			}
			.ac{
				background-color: #FFFFFF;
			}
		}
		.cm-rifht-main{
			width: 80%;
			padding: 20rpx 0 20rpx 0;
			.crm-main{
				width: 90%;
				margin: 0 auto;
				display: flex;
				align-items: center;
				// justify-content: space-between;
				flex-wrap: wrap;
				.cm-item{
					width: 32%;
					height: 120rpx;
					margin-bottom: 20rpx;
					.ci-icon{
						width: 77rpx;
						margin: 0 auto;
						height: 77rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.ci-name{
						height: 40rpx;
						line-height: 40rpx;
						font-size: 24rpx;
						text-align: center;
					}
				}
			}
		}
	}
</style>
