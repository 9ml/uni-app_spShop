<template>
	<view>
		<!-- 导航头 -->
		<view class="topNav">
			<view class="t-left" @tap="myTools.navBack()">
				<image src="../../static/btn_back_zhuce.png" mode=""></image>
			</view>
			<view class="t-main">
				<view class="space_tm"></view>
				<view class="tm-main">
					<view class="tm-icon">
						<image src="../../static/icon_ss.png" mode=""></image>
					</view>
					<view class="tm-inp">
						<input type="text" focus v-model="searchMain" placeholder="搜索商品" />
					</view>
				</view>
			</view>
			<view class="t-right" @tap="search()">
				<view class="space_tm"></view>
				搜索
			</view>
		</view>
		<view class="space_nav"></view>
		<!-- 历史搜索 -->
		<view v-show="isSearchHistory" class="search-main">
			<view class="sm-top">
				<view class="st-title">
					历史搜索
				</view>
				<view class="st-delIcon" @tap="delTsShow()">
					<image src="../../static/icon_shch.png" mode=""></image>
				</view>
			</view>
			<view class="sm-main">
				<view class="smm-item" v-for="(searchItems,searchIdx) in searchHistoryList" :key="searchIdx" @tap="tapFonts(searchItems.searchContent)">
					{{searchItems.searchContent}}
				</view>
			</view>
		</view>
		<!-- 商品信息 -->
		<view v-show="isSearchRes" class="searchShop-main">
			<view class="ssm-title">
				<view class="st-item" :class="current_a === s_idx ? 'ac' : ''" @tap="choseType(s_idx)" v-for="(s_title,s_idx) in searchResTitle" :key="s_idx">
					{{s_title.srt_fonts}}
				</view>
			</view>
			<!-- 销量 -->
			<view v-show="current_a === 0" class="ssm-shops">
				<view class="ss-item" v-for="(search_item,search_idx) in searchRes" :key="search_idx" @tap="tapGoods(search_item.id)">
					<view class="si-img">
						<image :src="search_item.goodsMainImg" mode=""></image>
					</view>
					<view class="si-descMain">
						<view class="sd-title">
							{{search_item.goodsName}}
						</view>
						<view class="sd-c">
							<!-- 网面 | 透气 -->
						</view>
						<view class="sd-bom">
							<view class="sb-price">
								￥{{search_item.goodsPrice}}
							</view>
							<view class="sb-payNums">
								{{search_item.goodsSales}}人付款
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 价格 -->
			<view v-show="current_a === 1" class="ssm-shops">
				<view class="ss-item" v-for="(search_item,search_idx) in searchRes" :key="search_idx" @tap="tapGoods(search_item.id)">
					<view class="si-img">
						<image :src="search_item.goodsMainImg" mode=""></image>
					</view>
					<view class="si-descMain">
						<view class="sd-title">
							{{search_item.goodsName}}
						</view>
						<view class="sd-c">
							<!-- 网面 | 透气 -->
						</view>
						<view class="sd-bom">
							<view class="sb-price">
								￥{{search_item.goodsPrice}}
							</view>
							<view class="sb-payNums">
								{{search_item.goodsSales}}人付款
							</view>
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
				userId : uni.getStorageSync('userId'),
				// 历史搜索信息
				searchHistoryList:[],
				// 标题
				searchResTitle:[
					{
						srt_id : 1,
						srt_fonts : '价格'
					},
					{
						srt_id : 2,
						srt_fonts : '销量'
					}
				],
				// 搜索信息
				searchRes : [],
				current_a : 0,
				searchMain : '',
				isSearchHistory : true,
				isSearchRes : false
			}
		},
		onLoad() {
			this.imgUrl = this._Api.imgUrl
			this.searchHistory();
		},
		methods: {
			// 搜索历史
			searchHistory(){
				if(!this.userId){
					this.isSearchHistory = false
				}else{
					this._Api.searchHistory({
						userId : this.userId
					},res=>{
						console.log(res);
						if(res.meta.code === 200){
							this.searchHistoryList = res.data
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
			// 点击删除按钮提示
			delTsShow(){
				if(this.searchHistoryList.length == 0){
					uni.showToast({
						title:"无搜索历史，无需重复删除",
						icon:"none",
						duration:1500
					})
				}else{
					uni.showModal({
					    title: '提示',
					    content: '确定删除所有历史记录吗？',
					    success: (res)=> {
					        if(res.confirm){
					            this.deleteHistorySearch()
					        }else if(res.cancel){
					            // console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			// 删除搜索历史
			deleteHistorySearch(){
				this._Api.deleteHistorySearch({
					userId : this.userId
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.searchHistory();
						uni.showToast({
							title:"删除成功",
							icon:'none',
							duration:1500
						})
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 切换销量 || 价格
			choseType(idx){
				this.current_a = idx;
				this.search();
			},
			// 点击搜索
			search(){
				this._Api.search({
					userId : this.userId,
					keyword : this.searchMain,
					storts : this.current_a
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						this.isSearchHistory = false;
						this.isSearchRes = true;
						res.data.forEach((i)=>{
							i.goodsMainImg = this.imgUrl + i.goodsMainImg
						})
						this.searchRes = res.data
					}else{
						uni.showToast({
							title:res.meta.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
			// 点击搜索历史
			tapFonts(fonts){
				this.searchMain = fonts;
				this.search();
			},
			// 选择商品
			tapGoods(idx){
				this._Api.checkPtGoodsInfo({
					goodsId : idx
				},res=>{
					console.log(res);
					if(res.meta.code === 200){
						console.log(res.data.length);
						if(res.data.length === 0){
							uni.navigateTo({
								url:"./goodsInfoNormal?goodsId="+idx
							})
						}else{
							let ptArr = []
							let ptNum = []
							res.data.forEach((i)=>{
								ptArr[ptArr.length] = i.id
								ptNum[ptNum.length] = i.ptSize
							})
							uni.navigateTo({
								url:"./goodsInfo?goodsId="+idx+"&arr="+ptArr+"&num="+ptNum
							})
						}
					}
				});
				// uni.navigateTo({
				// 	url:"./goodsInfoNormal?goodsId="+idx
				// })
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F1F1F1;
	}
	// 导航头样式
	.topNav{
		.t-left{
			width: 8%;
		}
		.t-main{
			width: 710rpx;
			height: 80rpx;
			.space_tm{
				height: 24rpx;
			}
			.tm-main{
				width: 100%;
				height: 60rpx;
				border-radius: 30rpx;
				display: flex;
				align-items: center;
				background-color: #E5E5E5;
				.tm-icon{
					width: 10%;
					text-align: center;
					height: 40rpx;
					image{
						width: 40rpx;
						height: 40rpx;
					}
				}
				.tm-inp{
					width: 90%;
					height: 50rpx;
					input{
						width: 100%;
						height: 100%;
						text-align: left;
						font-size: 26rpx;
					}
				}
			}
		}
		.t-right{
			width: 12%;
			.space_tm{
				height: 24rpx;
			}
			font-size: 28rpx;
			text-align: center;
			color: #FF584C;
		}
	}
	// 历史搜索
	.search-main{
		.sm-top{
			width: 90%;
			height: 60rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.st-title{
				font-size: 28rpx;
			}
			.st-delIcon{
				width: 30rpx;
				height: 42rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.sm-main{
			width: 90%;
			padding-bottom: 20rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin: 0 auto;
			.smm-item{
				width: 18%;
				height: 50rpx;
				padding: 10rpx;
				overflow: hidden;
				margin-right: 20rpx;
				background-color: #F5F5F5;
				margin-top: 20rpx;
				border-radius: 30rpx;
				text-align: center;
				font-size: 24rpx;
				line-height: 50rpx;
			}
		}
	}
	// 商品信息
	.searchShop-main{
		width: 96%;
		margin: 0 auto;
		.ssm-title{
			height: 80rpx;
			display: flex;
			align-items: center;
			.ac{
				font-size: 32rpx !important;
				border-bottom: 4rpx solid #FF584C;
				color: #FF584C;
			}
			.st-item{
				width: 50%;
				height: 60rpx;
				font-size: 30rpx;
				text-align: center;
				line-height: 60rpx;
			}
		}
		.ssm-shops{
			.ss-item{
				height: 230rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.si-img{
					width: 34%;
					height: 200rpx;
					text-align: center;
					image{
						width: 240rpx;
						height: 100%;
					}
				}
				.si-descMain{
					width: 64%;
					.sd-title{
						font-size: 28rpx;
					}
					.sd-c{
						height: 60rpx;
						line-height: 60rpx;
						font-size: 22rpx;
						color: #999999;
					}
					.sd-bom{
						height: 50rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.sb-price{
							font-size: 30rpx;
							color: #FF584C;
						}
						.sb-payNums{
							font-size: 22rpx;
							color: #999999;
						}
					}
				}
			}
		}
	}
</style>
