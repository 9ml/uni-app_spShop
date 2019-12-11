<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				全部评价
			</view>
			<view class="t-right"></view>
		</view>
		<view class="space_nav"></view>
		<!-- 评论 -->
		<view class="comment" v-for="(comment_item,comment_idx) in evaluatesList" :key="comment_idx">
			<view class="comment-main">
				<view class="cm-body">
					<view class="cb-header">
						<view class="ch-img">
							<image :src="comment_item.userImg" mode=""></image>
						</view>
						<view class="ch-name">
							{{comment_item.userName}}
						</view>
					</view>
					<view class="cb-time">
						<view class="ct-time">
							{{comment_item.createTime}}
						</view>
						<view class="ct-info">
							{{comment_item.goodsSize}}
						</view>
					</view>
					<view class="cb-des">
						{{comment_item.evenluationContent}}
					</view>
					<view class="cb-imgs">
						<view class="bi-item" v-for="(img_item,img_idx) in comment_item.evenluationImg" :key="img_idx">
							<image :src="img_item" mode=""></image>
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
				// 全部评论
				evaluatesList : [],
			}
		},
		onLoad(options) {
			console.log(options)
			this.imgUrl = this._Api.imgUrl
			this.goodsId = options.goodsId
			this.evaluates()
		},
		methods: {
			// 商品评论
			evaluates(){
				this._Api.evaluate({
					goodsId : this.goodsId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						res.data.forEach((item)=>{
							if(item.userImg.indexOf("http") != -1){}else{
								item.userImg = this.imgUrl + item.userImg
							}
							item.createTime = this.myTools.formatDateTime(item.createTime,'str');
							item.evenluationImg = this.myTools.imgAddUrl(item.evenluationImg,this.imgUrl);
						})
						this.evaluatesList = res.data
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
	.comment{
		padding: 10rpx 0 10rpx 0;
		border-bottom: 10rpx solid #F4F4F4;
		.comment-main{
			width: 96%;
			margin: 0 auto;
			.cm-body{
				.cb-header{
					height: 60rpx;
					display: flex;
					align-items: center;
					.ch-img{
						width: 52rpx;
						height: 52rpx;
						border-radius: 50%;
						overflow: hidden;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.ch-name{
						height: 52rpx;
						font-size: 26rpx;
						margin-left: 10rpx;
						line-height: 52rpx;
					}
				}
				.cb-time{
					width: 90%;
					height: 30rpx;
					margin: 0 auto;
					font-size: 20rpx;
					color: #808080;
					display: flex;
					align-items: center;
					.ct-time{
						margin-right: 20rpx;
					}
				}
				.cb-des{
					width: 90%;
					margin: 10rpx auto 10rpx;
					font-size: 22rpx;
				}
				.cb-imgs{
					width: 90%;
					margin: 0 auto;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.bi-item{
						width: 33%;
						height: 170rpx;
						text-align: center;
						border-radius: 10rpx;
						overflow: hidden;
						image{
							width: 200rpx;
							height: 160rpx;
						}
					}
				}
			}
		}
	}
</style>
