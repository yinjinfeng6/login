import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';  // element-ui 样式
import './style/index.css'; // 默认样式
import myplugin from './plugins/myplugins'; // 插件
import store from './store/store'
Vue.use(myplugin);

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  require('./mock/index');
}

let vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
// console.log(vm);