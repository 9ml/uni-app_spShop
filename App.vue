<script>
	export default {
		globalData:{
			userId : ''
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			var args = plus.runtime.arguments;
			var getArr = args.split("=");
			if(getArr[1] === "shareGoods"){
				uni.navigateTo({
					url:"/pages/index/goodsInfoNormal?goodsId="+getArr[2]
				})
			}else if(getArr[1] === "assemble"){
				uni.navigateTo({
					url:"/pages/index/goodsInfoCT?goodsId="+getArr[2]+"&ptInfoTableId="+getArr[3]+"&ptGoodsTableId="+getArr[4]
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
			plus.runtime.arguments = ""
		},
		methods:{
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.topNav{
		width: 100%;
		height: 120rpx;
		background-color: #FFFFFF;
		display: flex;
		padding-top: 10rpx;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 9999;
		.t-left{
			width: 10%;
			height: 30rpx;
			margin-top: 4rpx;
			text-align: center;
			image{
				width: 20rpx;
				height: 30rpx;
			}
		}
		.t-main{
			height: 30rpx;
			font-size: 30rpx;
			text-align: center;
			line-height: 60rpx;
		}
		.t-right{
			width: 10%;
		}
	}
	.space_nav{
		height: 130rpx;
	}
</style>
