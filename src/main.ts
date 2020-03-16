// ---------------------------------------- 样式 ----------------------------------------
import '@/assets/styles/reset.styl';
import '@/assets/styles/utils.styl';
import '@/assets/styles/_common.styl';
import '@/assets/styles/_videojs.styl';
import '@/assets/styles/_comment_danmu.styl';


// ---------------------------------------- plugins ----------------------------------------
import Vue from 'vue';
import '@/permission';

import ElementUI from 'element-ui';
import BaseDialog from '@/components/base-dailog.vue';


// ---------------------------------------- 挂载 ----------------------------------------
Vue.use(ElementUI);
Vue.component('base-dialog', BaseDialog);

// ---------------------------------------- 组件 ----------------------------------------
import App from '@/App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
