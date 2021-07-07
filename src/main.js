import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload"

import toast from 'components/common/toast'

Vue.use(toast)
Vue.use(VueLazyload)

Vue.config.productionTip = false
//给$bus附上Vue定义
Vue.prototype.$bus = new Vue()

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
