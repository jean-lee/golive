import Vue from 'vue';
import VueRouter from 'vue-router';
import LiveIndex from '@/views/live/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Live',
    component: LiveIndex,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
