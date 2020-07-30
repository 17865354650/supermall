import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from "vue-lazyload"
import store from "./store"
import FastClick from "fastclick"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
// 使用懒加载
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/home2.png')
})

// 解决移动端300毫秒延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
