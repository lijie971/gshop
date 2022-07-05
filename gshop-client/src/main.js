import Vue from 'vue'
import App from './App.vue'

//引入VueRouter
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//引入路由器
import router from './router/index.js'

//引入store
import store from '@/store'

//Star组件(注册为全局组件)
import Star from '@/components/Star/Star.vue'
Vue.component(Star.name, Star)

//引入ElementUI组件库
import ElementUI from 'element-ui';
//引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

import { Button } from 'mint-ui'
//注册mint-ui(为全局组件标签)
Vue.component(Button.name, Button)  //<mt-button>


//引入mock数据
import "@/mock/mockServer.js"

//引入图片懒加载
import VueLazyload from 'vue-lazyload'

const loadimage = require('@/assets/atm.gif')

Vue.use(VueLazyload, {
  loading: loadimage
})

//时间过滤器
import "@/fiters/fiters.js"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')