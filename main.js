import Vue from 'vue'
import App from './App'
import Api from '@/common/requests.js'
import Tools from '@/common/methods.js'

import validCode from './components/uni-mm/validCode.vue'

Vue.component('validcode',validCode)
Vue.prototype._Api = new Api.request
Vue.prototype.myTools = new Tools.myTools
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
