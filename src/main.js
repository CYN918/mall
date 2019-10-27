// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import 'jquery'
Vue.use(Mint);
import common from './common'
Vue.use(common);

import 'mint-ui/lib/style.css';
Vue.config.productionTip = false

import './assets/reset.css'

import Ellipsis from '@/components/common/VueEllipsis'
Vue.use(Ellipsis);

import axios from './http.js'
Vue.prototype.$http = axios;

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);


//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex);
import store from './store/index.js'

import Navigation from 'vue-navigation'
Vue.use(Navigation, {router})


let Base64 = require('js-base64').Base64;

//引入ydui
// import YDUI from 'vue-ydui';  相当于import YDUI from 'vue-ydui/ydui.rem.js' 
// import 'vue-ydui/dist/ydui.rem.css';
// import 'vue-ydui/dist/ydui.base.css';
// import {TimeLine, TimeLineItem} from 'vue-ydui/dist/lib.rem/timeline';

// Vue.component(TimeLine.name, TimeLine);
// Vue.component(TimeLineItem.name, TimeLineItem);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
