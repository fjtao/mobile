import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueClipboard from 'vue-clipboard2';
import "amfe-flexible";
import "./css/border_1px.scss";
// 引入rem插件
import 'lib-flexible/flexible'
// 引入自定义toast
import './components/Toast/toast.css';
import Toast from './components/Toast/index';
import api from '../public/js/api.min';
import apilink from '../public/js/apilink.min';
Vue.use(api);
Vue.use(apilink);
Vue.use(Toast);
Vue.use(VueClipboard);
Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://192.168.1.129/dianhua/public/api/login";
Vue.prototype.axios = axios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
