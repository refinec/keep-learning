import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/vcharts'
import VueECharts from 'vue-echarts'
import './style/index.css'
const ECharts = require('echarts')
// import * as ECharts from 'echarts'
Vue.config.productionTip = false
Vue.prototype.$echarts = ECharts
Vue.component('vue-chart', VueECharts)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
