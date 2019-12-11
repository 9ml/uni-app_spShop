module.exports = {

	get: function(url, data, callback, headers) {
		uni.request({
			url: url,
			data: data,
			method: "GET",
			dataType: "json",
			header: headers,
			success: (res) => {
				callback(res.data);
			},
			fail: () => {
				uni.hideLoading()
				uni.stopPullDownRefresh()
				uni.showToast({
					title: "网络请求失败",
					icon: "none"
				});
			},
			complete: () => {

			}
		});
	},

	post: function(url, data, callback, errorback=()=>{}, contentType, headers) {
		switch (contentType) {
			case "form":
				var headerObj = {
					'content-type': 'application/x-www-form-urlencoded'
				};
				break;
			case "json":
				var headerObj = {
					'content-type': 'application/json'
				};
				break;
			default:
				var headerObj = {
					'content-type': 'application/x-www-form-urlencoded'
				};
		}
		for (var k in headers) {
			headerObj[k] = headers[k];
		}
		uni.request({
			url: url,
			data: data,
			method: "POST",
			dataType: "json",
			header: headerObj,
			success: (res) => {
				if(res.data.code === 401) {
					uni.showModal({
						title:'提示',
						content:'登录信息已过期请重新登录',
						confirmColor:'#007AFF',
						showCancel:false,
						success: () => {
							uni.reLaunch({
								url:'/pages/other/login'
							})
						}
					})
				} else {
					callback(res.data);
				}
			},
			fail: (error) => {
				uni.showToast({
					title: "网络请求失败",
					icon: "none"
				});
				uni.hideLoading()
				uni.stopPullDownRefresh()
				errorback(error)
			},
			complete: () => {

			}
		});
	},

	imgUpload: function(url,data,imgName,callback) {
		uni.chooseImage({
			count: 1,
			success: (chooseImageRes) => {
				const tempFilePaths = chooseImageRes.tempFilePaths;
				uni.showLoading({
					title:'上传中',
					mask:true
				})
				uni.uploadFile({
					url: url,
					filePath: tempFilePaths[0],
					name: imgName,
					formData: data,
					success: (uploadFileRes) => {
						callback(uploadFileRes.data);
					},
					fail: () => {
						uni.showToast({
							title: "网络请求失败",
							icon: "none"
						});
					},
					complete() {
						uni.hideLoading()
					}
				})
			}
		})
	}
}
