(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/login"],{"189f":function(o,e,t){"use strict";t.r(e);var n=t("f975"),s=t.n(n);for(var i in n)"default"!==i&&function(o){t.d(e,o,function(){return n[o]})}(i);e["default"]=s.a},"32c1":function(o,e,t){"use strict";t.r(e);var n=t("af47"),s=t("189f");for(var i in s)"default"!==i&&function(o){t.d(e,o,function(){return s[o]})}(i);t("c3e1");var d,a=t("f0c5"),u=Object(a["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],d);e["default"]=u.exports},"7c8d":function(o,e,t){},"93d1":function(o,e,t){"use strict";(function(o){t("1b93"),t("921b");n(t("66fd"));var e=n(t("32c1"));function n(o){return o&&o.__esModule?o:{default:o}}o(e.default)}).call(this,t("6e42")["createPage"])},af47:function(o,e,t){"use strict";var n,s=function(){var o=this,e=o.$createElement;o._self._c},i=[];t.d(e,"b",function(){return s}),t.d(e,"c",function(){return i}),t.d(e,"a",function(){return n})},c3e1:function(o,e,t){"use strict";var n=t("7c8d"),s=t.n(n);s.a},f975:function(o,e,t){"use strict";(function(o,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{choseList:[{typeId:1,name:"密码登录"},{typeId:2,name:"验证码登录"}],current:0,uPhone:"",uPwd:"",uCode:"",getBtn:!0,getSec:!1,secends:60}},onLoad:function(){this.goodsId=o.getStorageSync("goodsId"),this.ptInfoTableId=o.getStorageSync("ptInfoTableId"),this.ptGoodsTableId=o.getStorageSync("ptGoodsTableId"),console.log(t(this.goodsId," at pages\\user\\login.vue:91"))},methods:{changeItem:function(o){this.current=o},pwdLogin:function(){var e=this;this.uPhone?/^1[3456789]\d{9}$/.test(this.uPhone)?this.uPwd?this._Api.phonePwdLogin({userPhone:this.uPhone,userPwd:this.uPwd},function(n){console.log(t(n," at pages\\user\\login.vue:125")),200===n.meta.code?(o.setStorageSync("userId",n.data),o.showToast({title:"登录成功",icon:"none",duration:1500}),e.goodsId&&0!==e.goodsId?""!==e.goodsId&&0!==e.goodsId&&setTimeout(function(){o.reLaunch({url:"/pages/index/goodsInfoCT?goodsId="+e.goodsId+"&ptInfoTableId="+e.ptInfoTableId+"&ptGoodsTableId="+e.ptGoodsTableId})},1500):setTimeout(function(){o.switchTab({url:"../index/index"})},1500)):o.showToast({title:n.meta.msg,icon:"none",duration:1500})}):o.showToast({title:"密码不能为空！",icon:"none",duration:1500}):o.showToast({title:"手机号格式有误！",icon:"none",duration:1500}):o.showToast({title:"手机号不能为空！",icon:"none",duration:1500})},getCode:function(){var e=this;this.uPhone?/^1[3456789]\d{9}$/.test(this.uPhone)?this._Api.getLoginCode({userPhone:this.uPhone},function(t){if(200===t.meta.code){o.showToast({title:"发送成功，请注意查收",icon:"none",duration:1500}),e.getBtn=!1,e.getSec=!0;var n=60,s=setInterval(function(){n--,e.secends=n,0==n&&(clearInterval(s),e.getBtn=!0,e.getSec=!1)},1e3)}else o.showToast({title:t.meta.msg,icon:"none",duration:1500})}):o.showToast({title:"手机号格式不正确！",icon:"none",duration:1500}):o.showToast({title:"手机号不能为空！",icon:"none",duration:1500})},codeLogin:function(){var e=this;this.uPhone?/^1[3456789]\d{9}$/.test(this.uPhone)?this.uCode?this._Api.phoneCodeLogin({userPhone:this.uPhone,code:this.uCode},function(n){console.log(t(n," at pages\\user\\login.vue:232")),200===n.meta.code?(o.setStorageSync("userId",n.data),o.showToast({title:"登录成功",icon:"none",duration:1500}),e.goodsId&&0!==e.goodsId?""!==e.goodsId&&0!==e.goodsId&&setTimeout(function(){o.reLaunch({url:"/pages/index/goodsInfoCT?goodsId="+e.goodsId+"&ptInfoTableId="+e.ptInfoTableId+"&ptGoodsTableId="+e.ptGoodsTableId})},1500):setTimeout(function(){o.switchTab({url:"../index/index"})},1500)):o.showToast({title:n.meta.msg,icon:"none",duration:1500})}):o.showToast({title:"验证码不能为空！",icon:"none",duration:2e3}):o.showToast({title:"手机号格式有误！",icon:"none",duration:2e3}):o.showToast({title:"手机号不能为空！",icon:"none",duration:2e3})},wxLogin:function(){var e=this;o.login({provider:"weixin",scopes:"auth_user",success:function(n){console.log(t(n," at pages\\user\\login.vue:268")),o.getUserInfo({provider:"weixin",success:function(n){console.log(t(n," at pages\\user\\login.vue:273")),e._Api.weChatLogin({openId:n.userInfo.openId,wxName:n.userInfo.nickName,wxImg:n.userInfo.avatarUrl,inviteCode:""},function(n){console.log(t(n," at pages\\user\\login.vue:280")),200===n.meta.code?(o.setStorageSync("userId",n.data),o.showToast({title:"登录成功",icon:"none",duration:1500}),e.goodsId&&0!==e.goodsId?""!==e.goodsId&&0!==e.goodsId&&setTimeout(function(){o.reLaunch({url:"/pages/index/goodsInfoCT?goodsId="+e.goodsId+"&ptInfoTableId="+e.ptInfoTableId+"&ptGoodsTableId="+e.ptGoodsTableId})},1500):setTimeout(function(){o.switchTab({url:"../index/index"})},1500)):o.showToast({title:n.meta.msg,icon:"none",duration:1500})})}})},fail:function(e){o.showModal({title:"提示",content:"微信登陆发生了错误",success:function(o){console.log(t(o," at pages\\user\\login.vue:317"))}})}})}}};e.default=n}).call(this,t("6e42")["default"],t("0de9")["default"])}},[["93d1","common/runtime","common/vendor"]]]);