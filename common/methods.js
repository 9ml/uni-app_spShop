function myTools() {
	const defaultSetting = {

	}
	this.defaultSetting = defaultSetting
	buildMyTools()
}
function buildMyTools() {
	// 时间戳转日期格式
	myTools.prototype.formatDateTime = function(timeStamp, returnType) {
		var date = new Date();
		// date.setTime(timeStamp * 1000);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		if (returnType === 'str') {
			return y + '-' + m + '-' + d
			// return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
		}
		if (returnType === 'time') {
			return h + ":" + minute
		}
		return [y, m, d, h, minute, second];
	}
	// 自定义导航返回
	myTools.prototype.navBack = function(){
		uni.navigateBack({
			delta: 1
		})
	}
	// 截取图片字符串 (并添加服务器地址)
	myTools.prototype.imgAddUrl = function(words,url){
		let strArr = words.split("|")
		let getImgArr = [];
		for(let i = 0;i < strArr.length;i++){
			getImgArr[getImgArr.length] = url + strArr[i];
		}
		return getImgArr;
	}
	// 结算折扣价格
	myTools.prototype.countPrice = function(original,discount){
		return original - discount;
	}
	// 毫秒转时间
	myTools.prototype.timesChange = function(msTime) {
		var days = parseInt(msTime / (1000 * 60 * 60 * 24));
		var hours = parseInt((msTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = parseInt((msTime % (1000 * 60 * 60)) / (1000 * 60));
		// var seconds = (msTime % (1000 * 60)) / 1000;
		var seconds = parseInt((msTime % (1000 * 60)) / 1000);
		// return "剩余" + days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
		return [days,hours,minutes,seconds]
	}
}

export default {
	myTools
}