import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './App.Router'

Vue.use(VueResource);
Vue.use(router);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
