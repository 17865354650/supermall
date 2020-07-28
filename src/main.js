import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from "vue-lazyload"
import store from "./store"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
// 使用懒加载
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/home2.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
