import {
	get,
	post,
	imgUpload 
} from './mAjax.js'

function loading() {
	uni.showLoading({
		title: '请稍后',
		mask: true
	})
}

function request() {
	this.baseUrl = 'http://47.104.185.192:8080/jeeplus'
	this.imgUrl = 'http://47.104.185.192:8080'
	buildRequest(this.baseUrl)
}

function buildRequest(baseUrl) {
	// 注册-获取验证码
	request.prototype.getRegisterCode = function(params, callBack) {
		post(baseUrl + '/sendCode/sendRegisterCode', params, callBack)
	}
	// 注册
	request.prototype.register = function(params, callBack) {
		post(baseUrl + '/userRegister/registerForPhonePwd', params, callBack)
	}
	// 登录-获取验证码
	request.prototype.getLoginCode = function(params, callBack) {
		post(baseUrl + '/sendCode/sendLoginCode', params, callBack)
	}
	// 验证码登录
	request.prototype.phoneCodeLogin = function(params, callBack) {
		post(baseUrl + '/userLogin/loginForCode', params, callBack)
	}
	// 密码登录
	request.prototype.phonePwdLogin = function(params, callBack) {
		post(baseUrl + '/userLogin/loginForPwd', params, callBack)
	}
	// 微信登录
	request.prototype.weChatLogin = function(params, callBack) {
		post(baseUrl + '/userLogin/wxLogin', params, callBack)
	}
	// 微信登录 - 绑定手机号发送验证码
	request.prototype.weChatBindPhoneGetCode = function(params, callBack) {
		post(baseUrl + '/sendValidateNumber/sendBangPhoneValidateNumber', params, callBack)
	}
	// 微信登录 - 绑定手机号
	request.prototype.weChatBindPhone = function(params, callBack) {
		post(baseUrl + '/weixin/wxLoginForPhone', params, callBack)
	}
	// 忘记密码 - 发送验证码
	request.prototype.sendForgetCode = function(params, callBack) {
		post(baseUrl + '/sendCode/sendForgetCode', params, callBack)
	}
	// 忘记密码 - 修改密码
	request.prototype.forgetPwdForPhone = function(params, callBack) {
		post(baseUrl + '/userLogin/forgetPwdForPhone', params, callBack)
	}
	// 原密码修改密码
	request.prototype.forgetPwdForOld = function(params, callBack) {
		post(baseUrl + '/userInfo/forgetPwdForOld', params, callBack)
	}
	// 轮播图
	request.prototype.getBanner = function(params, callBack) {
		post(baseUrl + '/indexInfo/advertInfo', params, callBack)
	}
	// 分类展示
	request.prototype.allKinds = function(params, callBack) {
		post(baseUrl + '/indexInfo/categoryInfo', params, callBack)
	}
	// 推荐商品
	request.prototype.recommendShops = function(params, callBack) {
		post(baseUrl + '/indexInfo/recommendInfo', params, callBack)
	}
	// 搜索历史
	request.prototype.searchHistory = function(params, callBack) {
		post(baseUrl + '/searchInfo/showHistory', params, callBack)
	}
	// 删除搜索历史
	request.prototype.deleteHistorySearch = function(params, callBack) {
		post(baseUrl + '/searchInfo/delHistory', params, callBack)
	}
	// 搜索
	request.prototype.search = function(params, callBack) {
		post(baseUrl + '/searchInfo/doSearch', params, callBack)
	}
	// 商品详细信息
	request.prototype.shopDesc = function(params, callBack) {
		post(baseUrl + '/goodsInfo/showGoodsInfo', params, callBack)
	}
	// 商品评论
	request.prototype.evaluate = function(params, callBack) {
		post(baseUrl + '/goodsInfo/showComment', params, callBack)
	}
	// 商品颜色
	request.prototype.getColors = function(params, callBack) {
		post(baseUrl + '/goodsInfo/showGoodsColor', params, callBack)
	}
	// 商品尺寸
	request.prototype.getSizes = function(params, callBack) {
		post(baseUrl + '/goodsInfo/showGoodsSize', params, callBack)
	}
	// 	是否收藏
	request.prototype.isCollect = function(params, callBack) {
		post(baseUrl + '/goodsInfo/checkCollectGoods', params, callBack)
	}
	// 	收藏
	request.prototype.userCollection = function(params, callBack) {
		post(baseUrl + '/goodsInfo/addCollectGoods', params, callBack)
	}
	// 	取消收藏
	request.prototype.userDelCollection = function(params, callBack) {
		post(baseUrl + '/goodsInfo/cancelCollectGoods', params, callBack)
	}
	// 提交订单默认地址信息
	request.prototype.getConfirmAdressInfo = function(params, callBack) {
		post(baseUrl + '/orderInfo/previewConsigneeInfo', params, callBack)
	}
	// 提交订单已选商品信息
	request.prototype.getConfirmGoodsInfo = function(params, callBack) {
		post(baseUrl + '/orderInfo/previewOrderInfo', params, callBack)
	}
	// 提交订单
	request.prototype.confirmOrder = function(params, callBack) {
		post(baseUrl + '/orderInfo/addOrderInfo', params, callBack)
	}
	// 支付订单
	request.prototype.payForOrder = function(params, callBack) {
		post(baseUrl + '/orderInfo/payOrderInfos', params, callBack)
	}
	// 用户信息
	request.prototype.getUserInfo = function(params, callBack) {
		post(baseUrl + '/userInfo/showMyInfo', params, callBack)
	}
	// 用户所有收货地址
	request.prototype.getUserAllAdreses = function(params, callBack) {
		post(baseUrl + '/userInfo/showConsignee', params, callBack)
	}
	// 添加收货地址
	request.prototype.addUserAdreses = function(params, callBack) {
		post(baseUrl + '/userInfo/addConsignee', params, callBack)
	}
	// 用户单个收货地址
	request.prototype.getUserThisAdreses = function(params, callBack) {
		post(baseUrl + '/userInfo/showDanConsigneeInfo', params, callBack)
	}
	// 修改收货地址
	request.prototype.updateUserThisAdreses = function(params, callBack) {
		post(baseUrl + '/userInfo/updateConsignee', params, callBack)
	}
	// 删除收货地址
	request.prototype.delUserThisAdreses = function(params, callBack) {
		post(baseUrl + '/userInfo/delConsigneeInfo', params, callBack)
	}
	// 	收藏的店铺
	request.prototype.getMyCollectionGoods = function(params, callBack) {
		post(baseUrl + '/userInfo/showMyCollectInfo', params, callBack)
	}
	// 	加入到购物车
	request.prototype.addShopCar = function(params, callBack) {
		post(baseUrl + '/goodsInfo/addTrolleyGoods', params, callBack)
	}
	// 	修改昵称
	request.prototype.updateMyName = function(params, callBack) {
		post(baseUrl + '/userInfo/updateUserName', params, callBack)
	}
	// 	修改头像
	request.prototype.updateMyHeader = function(params, callBack) {
		post(baseUrl + '/userInfo/updateHeaderImg', params, callBack)
	}
	// 	店铺信息
	request.prototype.getStoreInfo = function(params, callBack) {
		post(baseUrl + '/user/showStoreInfo', params, callBack)
	}
	// 	店铺商品
	request.prototype.storeGoods = function(params, callBack) {
		post(baseUrl + '/user/showStoreCollectGoods', params, callBack)
	}
	// 	余额
	request.prototype.getMyWallet = function(params, callBack) {
		post(baseUrl + '/user/showWallet', params, callBack)
	}
	// 	客服电话
	request.prototype.getCSphoneNum = function(params, callBack) {
		post(baseUrl + '/userInfo/showServicePhone', params, callBack)
	}
	// 	意见反馈
	request.prototype.feedBack = function(params, callBack) {
		post(baseUrl + '/userInfo/addFeedBack', params, callBack)
	}
	// 	我的购物车
	request.prototype.getMyShopCar = function(params, callBack) {
		post(baseUrl + '/trolleyInfo/showMyTrolleyGoods', params, callBack)
	}
	// 	支付宝支付
	request.prototype.aliPayMoney = function(params, callBack) {
		post(baseUrl + '/carts/payAlis', params, callBack)
	}
	// 	订单信息
	request.prototype.userOrderInfo = function(params, callBack) {
		post(baseUrl + '/orderInfo/showOrderInfoDetail', params, callBack)
	}
	// 	取消订单
	request.prototype.userdelOrder = function(params, callBack) {
		post(baseUrl + '/orderInfo/cancelOrderInfo', params, callBack)
	}
	// 	购物车批量删除
	request.prototype.shopCarDelGoods = function(params, callBack) {
		post(baseUrl + '/trolleyInfo/removeTrolley', params, callBack)
	}
	// 	购物车 + || -
	request.prototype.shopCarAddOrCut = function(params, callBack) {
		post(baseUrl + '/trolleyInfo/changeTrolleyGoodsAmount', params, callBack)
	}
	// 	购物车提交订单商品显示
	request.prototype.shopCarSubmitOrderGoodsInfo = function(params, callBack) {
		post(baseUrl + '/trolleyInfo/previewTrolleyOrder', params, callBack)
	}
	// 	购物车提交订单
	request.prototype.shopCarSubmitOrder = function(params, callBack) {
		post(baseUrl + '/trolleyInfo/addTrolleyOrder', params, callBack)
	}
	// 	我的订单 - 全部
	request.prototype.myAllOrder = function(params, callBack) {
		post(baseUrl + '/orderInfo/showMyALLOrderInfo', params, callBack)
	}
	// 	我的订单 - 状态
	request.prototype.myAllKindsOrder = function(params, callBack) {
		post(baseUrl + '/orderInfo/showStatusOrderInfo', params, callBack)
	}
	// 	所有分类
	request.prototype.getAllFL = function(params, callBack) {
		post(baseUrl + '/indexInfo/showAllType', params, callBack)
	}
	// 	所有分类 - 子分类列表
	request.prototype.getAllFLChildKinds = function(params, callBack) {
		post(baseUrl + '/indexInfo/showChildType', params, callBack)
	}
	// 	所有分类 - 子分类查询商品
	request.prototype.getAllFLChildGetGoodsInfo = function(params, callBack) {
		post(baseUrl + '/indexInfo/showTypeGoods', params, callBack)
	}
	// 	确认收货
	request.prototype.makeSureAcceptGoods = function(params, callBack) {
		post(baseUrl + '/orderInfo/takeGoods', params, callBack)
	}
	// 	发布评价
	request.prototype.addEvenluation = function(params, callBack) {
		post(baseUrl + '/orderInfo/doCommentInfo', params, callBack)
	}
	// 	物流
	request.prototype.logisticsInfo = function(params, callBack) {
		post(baseUrl + '/logis/logistics', params, callBack)
	}
	// 	退款商品
	request.prototype.getOneGoodsInfo = function(params, callBack) {
		post(baseUrl + '/orderInfo/refundOrderInfo', params, callBack)
	}
	// 	提交退款
	request.prototype.submitRefund = function(params, callBack) {
		post(baseUrl + '/orderInfo/doRefundOrder', params, callBack)
	}
	// 	待评价信息
	request.prototype.showWaitGoodsInfo = function(params, callBack) {
		post(baseUrl + '/orderInfo/showWaitGoodsInfo', params, callBack)
	}
	// 	账单明细
	request.prototype.showWithdrawMoney = function(params, callBack) {
		post(baseUrl + '/userInfo/showWithdrawMoney', params, callBack)
	}
	// 	银行卡信息
	request.prototype.showMyBankInfo = function(params, callBack) {
		post(baseUrl + '/userInfo/showMyBankInfo', params, callBack)
	}
	// 	银行卡信息
	request.prototype.addBankInfo = function(params, callBack) {
		post(baseUrl + '/userInfo/addBankInfo', params, callBack)
	}
	// 	提现到银行卡
	request.prototype.doWithdraw = function(params, callBack) {
		post(baseUrl + '/userInfo/doWithdraw', params, callBack)
	}
	// 	判断商品是否是拼团商品
	request.prototype.checkPtGoodsInfo = function(params, callBack) {
		post(baseUrl + '/ptGoodsInfo/checkPtGoodsInfo', params, callBack)
	}
	// 	拼团提交订单预览
	request.prototype.previewPtOrder = function(params, callBack) {
		post(baseUrl + '/ptGoodsInfo/previewPtOrder', params, callBack)
	}
	// 	拼团提交订单
	request.prototype.initiatePt = function(params, callBack) {
		post(baseUrl + '/ptGoodsInfo/initiatePt', params, callBack)
	}
	// 	该商品正在拼的团
	request.prototype.showPtingGoods = function(params, callBack) {
		post(baseUrl + '/ptGoodsInfo/showPtingGoods', params, callBack)
	}
	// 	系统消息
	request.prototype.showSystemMessage = function(params, callBack) {
		post(baseUrl + '/userInfo/showSystemMessage', params, callBack)
	}
	// 	参与拼团
	request.prototype.joinPtGoods = function(params, callBack) {
		post(baseUrl + '/ptGoodsInfo/joinPtGoods', params, callBack)
	}
	// 	生成二维码
	request.prototype.generateCode = function(params, callBack) {
		post(baseUrl + '/userInfo/generateCode', params, callBack)
	}
	// 	搜索订单
	request.prototype.likeSearchOrderInfo = function(params, callBack) {
		post(baseUrl + '/orderInfo/likeSearchOrderInfo', params, callBack)
	}
	// 	订单消息通知
	request.prototype.showOrderMessage = function(params, callBack) {
		post(baseUrl + '/userInfo/showOrderMessage', params, callBack)
	}
	// 	查询订单状态
	request.prototype.findOrderInfoStatus = function(params, callBack) {
		post(baseUrl + '/orderInfo/findOrderInfoStatus', params, callBack)
	}
	// 	退款状态
	request.prototype.showAfterOrderGoods = function(params, callBack) {
		post(baseUrl + '/orderInfo/showAfterOrderGoods', params, callBack)
	}
	// 	拼团订单详情
	request.prototype.showPtOrderInfoDetail = function(params, callBack) {
		post(baseUrl + '/orderInfo/showPtOrderInfoDetail', params, callBack)
	}
	// 	参团详情
	request.prototype.showPtInfoTableInfo = function(params, callBack) {
		post(baseUrl + '/ptGoodsInfo/showPtInfoTableInfo', params, callBack)
	}
	// 	绑定银行卡验证码
	request.prototype.sendBankCode = function(params, callBack) {
		post(baseUrl + '/sendCode/sendBankCode', params, callBack)
	}
	// 	微信支付
	request.prototype.wxAppPay = function(params, callBack) {
		post(baseUrl + '/weixin/wxAppPay', params, callBack)
	}
}

export default {
	request
}
