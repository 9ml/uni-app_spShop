(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/submitOrderPT"],{"27b9":function(e,o,t){"use strict";var s=function(){var e=this,o=e.$createElement;e._self._c;e._isMounted||(e.e0=function(o){return e.myTools.navBack()})},n=[];t.d(o,"a",function(){return s}),t.d(o,"b",function(){return n})},"2e3f":function(e,o,t){},4900:function(e,o,t){"use strict";(function(e,s){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n=function(){return t.e("components/uni-popup/uni-popup").then(t.bind(null,"1738"))},i={components:{uniPopup:n},data:function(){return{userId:e.getStorageSync("userId"),userAdressInfo:"",userChoseGoodsInfo:"",goodsNums:0,totalPrice:0,buyType:0,userBz:"",pricePT:0,noAdress:!0,haveAdress:!1,isSetAdress:!1}},onLoad:function(){this.imgUrl=this._Api.imgUrl,this.goodsId=e.getStorageSync("goodsId"),this.goodsTypeId=e.getStorageSync("goodsTypeId"),this.goodsNums=e.getStorageSync("goodsNums"),this.buyType=e.getStorageSync("buyType"),this.ptTypeId=e.getStorageSync("ptType"),e.getStorageSync("consigneeId")?this.consigneeId=e.getStorageSync("consigneeId"):this.consigneeId="",this.getAdressInfo(),this.getGoodsInfos()},methods:{getAdressInfo:function(){var o=this;this._Api.getConfirmAdressInfo({userId:this.userId,consigneeId:this.consigneeId},function(t){console.log(s(t," at pages\\index\\submitOrderPT.vue:211")),200===t.meta.code?(o.noAdress=!1,o.haveAdress=!0,o.isSetAdress=!1,o.userAdressInfo=t.data,o.consigneeId=o.userAdressInfo.id):(o.isSetAdress=!0,e.showToast({title:t.meta.msg,icon:"none",duration:1500}))})},getGoodsInfos:function(){var o=this;this._Api.previewPtOrder({ptGoodsTableId:this.ptTypeId,propertyId:this.goodsTypeId},function(t){console.log(s(t," at pages\\index\\submitOrderPT.vue:234")),200===t.meta.code?(t.data.goodsMainImg=o.imgUrl+t.data.goodsMainImg,o.userChoseGoodsInfo=t.data,o.totalPrice=t.data.goodsPrice*o.goodsNums):e.showToast({title:t.meta.msg,icon:"none",duration:1500})})},goGoodsInfo:function(o){this._Api.checkPtGoodsInfo({goodsId:o},function(t){if(console.log(s(t," at pages\\index\\submitOrderPT.vue:252")),200===t.meta.code)if(console.log(s(t.data.length," at pages\\index\\submitOrderPT.vue:254")),0===t.data.length)e.navigateTo({url:"./goodsInfoNormal?goodsId="+o});else{var n=[],i=[];t.data.forEach(function(e){n[n.length]=e.id,i[i.length]=e.ptSize}),e.navigateTo({url:"./goodsInfo?goodsId="+o+"&arr="+n+"&num="+i})}})},goodsAdd:function(){this.goodsNums++,this.getPrice()},goodsCut:function(){this.goodsNums<=1?e.showToast({title:"最少选择一件哦",icon:"none",duration:1500}):(this.goodsNums--,this.getPrice())},getPrice:function(){this.totalPrice=this.userChoseGoodsInfo.goodsPrice*this.goodsNums},ChosePsStyle:function(){this.$refs.sendStyle.open()},choseSure:function(){this.$refs.sendStyle.close()},submitOrder:function(){if(this.isSetAdress)return e.showToast({title:"请先设置收货地址再提交订单哦~",icon:"none",duration:1500}),!1;this._Api.initiatePt({userId:this.userId,ptGoodsTableId:this.ptTypeId,consigneeId:this.consigneeId,propertyId:this.goodsTypeId,goodsAmount:this.goodsNums,orderPrice:this.totalPrice,orderAmount:this.totalPrice,promType:"拼团",orderRemark:this.userBz,couponPrice:0},function(o){console.log(s(o," at pages\\index\\submitOrderPT.vue:323")),200===o.meta.code?(e.showToast({title:"提交成功",icon:"none",duration:1500}),setTimeout(function(){e.navigateTo({url:"./cashier?orderNum="+o.data})},1500)):e.showToast({title:o.meta.msg,icon:"none",duration:1500})})},choseMyAdress:function(){e.setStorageSync("choseAdressType",2),e.navigateTo({url:"../mine/myAdress"})}}};o.default=i}).call(this,t("6e42")["default"],t("0de9")["default"])},"8df7":function(e,o,t){"use strict";t.r(o);var s=t("4900"),n=t.n(s);for(var i in s)"default"!==i&&function(e){t.d(o,e,function(){return s[e]})}(i);o["default"]=n.a},cc36:function(e,o,t){"use strict";(function(e){t("80f6"),t("921b");s(t("66fd"));var o=s(t("e2e2"));function s(e){return e&&e.__esModule?e:{default:e}}e(o.default)}).call(this,t("6e42")["createPage"])},e2e2:function(e,o,t){"use strict";t.r(o);var s=t("27b9"),n=t("8df7");for(var i in n)"default"!==i&&function(e){t.d(o,e,function(){return n[e]})}(i);t("f14f");var d=t("2877"),r=Object(d["a"])(n["default"],s["a"],s["b"],!1,null,null,null);o["default"]=r.exports},f14f:function(e,o,t){"use strict";var s=t("2e3f"),n=t.n(s);n.a}},[["cc36","common/runtime","common/vendor"]]]);