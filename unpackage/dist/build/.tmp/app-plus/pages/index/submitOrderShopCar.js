(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/submitOrderShopCar"],{"65fd":function(o,e,t){"use strict";(function(o,s){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){return t.e("components/uni-popup/uni-popup").then(t.bind(null,"3ed9"))},i={components:{uniPopup:n},data:function(){return{userAdressInfo:"",userChoseGoodsInfo:[],goodsNums:0,totalPrice:0,buyType:0,userBz:"",userId:o.getStorageSync("userId"),goodsNumsList:[],goodsTrolleyId:[],noAdress:!0,haveAdress:!1,isSetAdress:!1,allPrice:0}},onLoad:function(e){this.imgUrl=this._Api.imgUrl,this.goodsNumsList=o.getStorageSync("buyList"),o.getStorageSync("consigneeId")?this.consigneeId=o.getStorageSync("consigneeId"):this.consigneeId="",this.getAdressInfo(),this.getGoodsInfos()},methods:{getAdressInfo:function(){var e=this;this._Api.getConfirmAdressInfo({userId:this.userId,consigneeId:this.consigneeId},function(t){console.log(s(t," at pages\\index\\submitOrderShopCar.vue:208")),200===t.meta.code?(e.noAdress=!1,e.haveAdress=!0,e.isSetAdress=!1,e.userAdressInfo=t.data,e.consigneeId=e.userAdressInfo.id):(e.isSetAdress=!0,o.showToast({title:t.meta.msg,icon:"none",duration:1500}))})},getGoodsInfos:function(){var e=this;this._Api.shopCarSubmitOrderGoodsInfo({id:this.goodsNumsList},function(t){console.log(s(t," at pages\\index\\submitOrderShopCar.vue:230")),200===t.meta.code?(e.goodsNums=0,e.totalPrice=0,e.allPrice=0,t.data.forEach(function(o){o.lastPrice=e.myTools.countPrice(o.goodsPrice,o.goodsDiscount),o.totalPrice=o.goodsAmount*o.lastPrice,o.allPrice=o.goodsAmount*o.goodsPrice,e.goodsNums+=o.goodsAmount,e.totalPrice+=o.totalPrice,e.allPrice+=o.allPrice,o.goodsMainImg=e.imgUrl+o.goodsMainImg}),e.userChoseGoodsInfo=t.data):o.showToast({title:t.meta.msg,icon:"none",duration:1500})})},goGoodsInfo:function(e){this._Api.checkPtGoodsInfo({goodsId:e},function(t){if(console.log(s(t," at pages\\index\\submitOrderShopCar.vue:258")),200===t.meta.code)if(console.log(s(t.data.length," at pages\\index\\submitOrderShopCar.vue:260")),0===t.data.length)o.navigateTo({url:"./goodsInfoNormal?goodsId="+e});else{var n=[],i=[];t.data.forEach(function(o){n[n.length]=o.id,i[i.length]=o.ptSize}),o.navigateTo({url:"./goodsInfo?goodsId="+e+"&arr="+n+"&num="+i})}})},userHandleGoods:function(e,t){var n=this;t>0?(e.goodsAmount++,this._Api.shopCarAddOrCut({id:e.id,status:1},function(e){console.log(s(e," at pages\\index\\submitOrderShopCar.vue:287")),200===e.meta.code?n.getGoodsInfos():o.showToast({title:e.meta.msg,icon:"none",duration:1500})})):1===e.goodsAmount||(e.goodsAmount--,this._Api.shopCarAddOrCut({id:e.id,status:0},function(e){console.log(s(e," at pages\\index\\submitOrderShopCar.vue:305")),200===e.meta.code?n.getGoodsInfos():o.showToast({title:e.meta.msg,icon:"none",duration:1500})}))},ChosePsStyle:function(){this.$refs.sendStyle.open()},choseSure:function(){this.$refs.sendStyle.close()},submitOrder:function(){if(this.isSetAdress)return o.showToast({title:"请先设置收货地址再提交订单哦~",icon:"none",duration:1500}),!1;this._Api.shopCarSubmitOrder({userId:this.userId,id:this.goodsNumsList,consigneeId:this.consigneeId,orderPrice:this.allPrice,orderAmount:this.totalPrice,promType:"普通",orderRemark:this.userBz},function(e){console.log(s(e," at pages\\index\\submitOrderShopCar.vue:354")),200===e.meta.code?(o.showToast({title:"提交成功",icon:"none",duration:1500}),o.setStorageSync("buyType",1),setTimeout(function(){o.navigateTo({url:"./cashier?orderNum="+e.data})},1500)):o.showToast({title:e.meta.msg,icon:"none",duration:1500})})},choseMyAdress:function(){o.setStorageSync("choseAdressType",3),o.navigateTo({url:"../mine/myAdress"})}}};e.default=i}).call(this,t("6e42")["default"],t("0de9")["default"])},8948:function(o,e,t){},aa01:function(o,e,t){"use strict";var s=t("8948"),n=t.n(s);n.a},bef5:function(o,e,t){"use strict";var s,n=function(){var o=this,e=o.$createElement;o._self._c;o._isMounted||(o.e0=function(e){return o.myTools.navBack()})},i=[];t.d(e,"b",function(){return n}),t.d(e,"c",function(){return i}),t.d(e,"a",function(){return s})},cb66:function(o,e,t){"use strict";(function(o){t("1b93"),t("921b");s(t("66fd"));var e=s(t("f586"));function s(o){return o&&o.__esModule?o:{default:o}}o(e.default)}).call(this,t("6e42")["createPage"])},f586:function(o,e,t){"use strict";t.r(e);var s=t("bef5"),n=t("f7e3");for(var i in n)"default"!==i&&function(o){t.d(e,o,function(){return n[o]})}(i);t("aa01");var r,d=t("f0c5"),a=Object(d["a"])(n["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],r);e["default"]=a.exports},f7e3:function(o,e,t){"use strict";t.r(e);var s=t("65fd"),n=t.n(s);for(var i in s)"default"!==i&&function(o){t.d(e,o,function(){return s[o]})}(i);e["default"]=n.a}},[["cb66","common/runtime","common/vendor"]]]);