(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/applyForRefund"],{1312:function(e,o,t){"use strict";var n=function(){var e=this,o=e.$createElement;e._self._c;e._isMounted||(e.e0=function(o){return e.myTools.navBack()})},a=[];t.d(o,"a",function(){return n}),t.d(o,"b",function(){return a})},"319e":function(e,o,t){"use strict";t.r(o);var n=t("1312"),a=t("d3bf");for(var s in a)"default"!==s&&function(e){t.d(o,e,function(){return a[e]})}(s);t("8591");var r=t("2877"),i=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,null,null);o["default"]=i.exports},8591:function(e,o,t){"use strict";var n=t("be1c"),a=t.n(n);a.a},"98d7":function(e,o,t){"use strict";(function(e){t("80f6"),t("921b");n(t("66fd"));var o=n(t("319e"));function n(e){return e&&e.__esModule?e:{default:e}}e(o.default)}).call(this,t("6e42")["createPage"])},b601:function(e,o,t){"use strict";(function(e,t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n={data:function(){return{array:["订单信息拍错(规格)","不想要了","拍重复了","收货信息填写错误","缺货"],index:0,userGoodsInfo:"",refundReason:"",refundExplain:"",userChoseImgList:[],getServerImgList:[],isUpload:!0,userId:e.getStorageSync("userId")}},onLoad:function(e){this.baseUrl=this._Api.baseUrl,this.imgUrl=this._Api.imgUrl,this.orderGoodsId=e.orderGoodsId,this.refundReason=this.array[this.index],this.getGoodsInfoDFK()},methods:{getGoodsInfoDFK:function(){var o=this;this._Api.getOneGoodsInfo({orderGoodsId:this.orderGoodsId},function(n){console.log(t(n," at pages\\mine\\applyForRefund.vue:116")),200===n.meta.code?(n.data.goodsMainImg=o.imgUrl+n.data.goodsMainImg,n.data.lastPrice=n.data.orderGoodsPrice/n.data.goodsAmount,o.userGoodsInfo=n.data):e.showToast({title:n.msg,icon:"none",duration:1500})})},upLoadImgs:function(){var o=this;e.chooseImage({success:function(t){var n=t.tempFilePaths[0];e.uploadFile({url:o.baseUrl+"/orderInfo/uploadAfterImg",filePath:n,name:"file",formData:{id:o.userId,uploadPath:"afterImg"},success:function(t){if(200===t.statusCode)if(o.getServerImgList.length<3){var a=JSON.parse(t.data).body.url;o.getServerImgList[o.getServerImgList.length]=a,o.userChoseImgList[o.userChoseImgList.length]=n,o.isUpload=!1,o.isUpload=!0}else e.showToast({title:"最多上传3张图片哦~",icon:"none",duration:1500});else e.showToast({title:t.errMsg,icon:"none",duration:1500})}})}})},sureRefund:function(){var o=this.getServerImgList.join("|");console.log(t(o," at pages\\mine\\applyForRefund.vue:173")),this._Api.submitRefund({userId:this.userId,orderNum:this.userGoodsInfo.orderNum,orderGoodsId:this.orderGoodsId,afterReason:this.refundReason,afterMoney:this.userGoodsInfo.orderGoodsPrice,afterExplain:this.refundExplain,afterImg:o},function(o){console.log(t(o," at pages\\mine\\applyForRefund.vue:183")),200===o.meta.code?(e.showToast({title:"提交成功，请耐心等待店家审核",icon:"none",duration:1500}),setTimeout(function(){e.reLaunch({url:"/pages/mine/myOrder?idx=0"})},1500)):e.showToast({title:o.meta.msg,icon:"none",duration:1500})})},bindPickerChange:function(e){console.log(t("picker发送选择改变，携带值为",this.array[e.target.value]," at pages\\mine\\applyForRefund.vue:205")),this.index=e.target.value,this.refundReason=this.array[e.target.value]},goGoodsInfo:function(o){this._Api.checkPtGoodsInfo({goodsId:o},function(n){if(console.log(t(n," at pages\\mine\\applyForRefund.vue:213")),200===n.meta.code)if(console.log(t(n.data.length," at pages\\mine\\applyForRefund.vue:215")),0===n.data.length)e.navigateTo({url:"../index/goodsInfoNormal?goodsId="+o});else{var a=[],s=[];n.data.forEach(function(e){a[a.length]=e.id,s[s.length]=e.ptSize}),e.navigateTo({url:"../index/goodsInfo?goodsId="+o+"&arr="+a+"&num="+s})}})}}};o.default=n}).call(this,t("6e42")["default"],t("0de9")["default"])},be1c:function(e,o,t){},d3bf:function(e,o,t){"use strict";t.r(o);var n=t("b601"),a=t.n(n);for(var s in n)"default"!==s&&function(e){t.d(o,e,function(){return n[e]})}(s);o["default"]=a.a}},[["98d7","common/runtime","common/vendor"]]]);