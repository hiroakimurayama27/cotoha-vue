import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

// Bootstrap - start
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
// Bootstrap - end

// axios - start
Vue.use(VueAxios, axios)
// axios - end

// vue-json-tree-view - start
import TreeView from "vue-json-tree-view"
Vue.use(TreeView)
// vue-json-tree-view - end

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
