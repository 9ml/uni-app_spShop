(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/mine"],{"4a1a":function(n,i,t){"use strict";var e=function(){var n=this,i=n.$createElement;n._self._c},c=[];t.d(i,"a",function(){return e}),t.d(i,"b",function(){return c})},"54db":function(n,i,t){},"7a48":function(n,i,t){"use strict";t.r(i);var e=t("4a1a"),c=t("f1e2");for(var o in c)"default"!==o&&function(n){t.d(i,n,function(){return c[n]})}(o);t("baf3");var a=t("2877"),s=Object(a["a"])(c["default"],e["a"],e["b"],!1,null,null,null);i["default"]=s.exports},b09a:function(n,i,t){"use strict";(function(n){t("80f6"),t("921b");e(t("66fd"));var i=e(t("7a48"));function e(n){return n&&n.__esModule?n:{default:n}}n(i.default)}).call(this,t("6e42")["createPage"])},baf3:function(n,i,t){"use strict";var e=t("54db"),c=t.n(e);c.a},dd8a:function(n,i,t){"use strict";(function(n,t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={data:function(){return{userId:0,isLogin:!1,notLogin:!0,choseList_A:[{cid:1,cimg:"../../static/icon_dfk.png",cname:"待付款"},{cid:2,cimg:"../../static/icon_dfh.png",cname:"待发货"},{cid:3,cimg:"../../static/icon_dsh.png",cname:"待收货"},{cid:4,cimg:"../../static/icon_dqs.png",cname:"待签收"},{cid:5,cimg:"../../static/icon_dpj.png",cname:"待评价"},{cid:6,cimg:"../../static/icon_sh.png",cname:"售后"}],choseList_B:[{cb_id:1,cb_name:"我收藏的商品",cb_icon:"../../static/icon_jr.png"},{cb_id:2,cb_name:"我的钱包",cb_icon:"../../static/icon_jr.png"},{cb_id:3,cb_name:"我的收货地址",cb_icon:"../../static/icon_jr.png"},{cb_id:4,cb_name:"客服",cb_icon:"../../static/icon_jr.png"},{cb_id:5,cb_name:"意见反馈",cb_icon:"../../static/icon_jr.png"},{cb_id:6,cb_name:"修改密码",cb_icon:"../../static/icon_jr.png"},{cb_id:7,cb_name:"我的邀请",cb_icon:"../../static/icon_jr.png"}],userMain:""}},onLoad:function(){},onShow:function(){this.getUserInfo()},methods:{getUserInfo:function(){var i=this;this.userId=n.getStorageSync("userId"),this.imgUrl=this._Api.imgUrl,this.userId?this._Api.getUserInfo({id:this.userId},function(e){console.log(t(e," at pages\\mine\\mine.vue:185")),200===e.meta.code?(-1!=e.data.userImg.indexOf("http")||(e.data.userImg=i.imgUrl+e.data.userImg),i.userMain=e.data,i.isLogin=!0,i.notLogin=!1):n.showToast({title:e.meta.msg,icon:"none",duration:1500})}):(this.isLogin=!1,this.notLogin=!0)},goMore:function(i){this.userId?0==i?n.navigateTo({url:"./collection"}):1==i?n.navigateTo({url:"./myWallet?userWallet="+this.userMain.userBalance}):2==i?(n.setStorageSync("choseAdressType",100),n.navigateTo({url:"./myAdress"})):3==i?n.navigateTo({url:"./curstomerService"}):4==i?n.navigateTo({url:"./feedBack"}):5==i?n.navigateTo({url:"./updatePwd"}):6==i&&n.navigateTo({url:"./myInvitation"}):this.isOrLogin()},logout:function(){this.userId?n.showModal({title:"提示",content:"确定退出登录吗",success:function(i){i.confirm?(n.clearStorageSync("userId"),n.showToast({title:"退出成功",icon:"none",duration:1500}),setTimeout(function(){n.reLaunch({url:"/pages/user/login"})},1500)):i.cancel}}):this.isOrLogin()},lookMine:function(){n.navigateTo({url:"./personalData"})},goNotice:function(){n.navigateTo({url:"./notice"})},goLogin:function(){n.navigateTo({url:"../user/login"})},isOrLogin:function(){n.showModal({title:"提示",content:"您未登录，是否去登录？",success:function(i){i.confirm?n.navigateTo({url:"../user/login"}):i.cancel}})},goMyOrderAll:function(){this.userId?n.navigateTo({url:"./myOrder?idx=0"}):this.isOrLogin()},goMyOrder:function(i,t){this.userId?n.navigateTo({url:"./myOrder?idx="+i+"&types="+t}):this.isOrLogin()}}};i.default=e}).call(this,t("6e42")["default"],t("0de9")["default"])},f1e2:function(n,i,t){"use strict";t.r(i);var e=t("dd8a"),c=t.n(e);for(var o in e)"default"!==o&&function(n){t.d(i,n,function(){return e[n]})}(o);i["default"]=c.a}},[["b09a","common/runtime","common/vendor"]]]);