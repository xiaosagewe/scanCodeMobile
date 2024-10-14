import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'CovidMobileLogin',
    component: () =>
      import(
        /* webpackChunkName: "index" */ '../views/Index/index.jsx'
      ),
  },
  {
    path: '/index2',
    name: 'CovidMobileLogin2',
    component: () =>
      import(
        /* webpackChunkName: "inde2x" */ '../views/Index2/index.vue'
      ),
  },
  {
    path: '/codeDetail',
    name: 'CovidMobileLogin3',
    component: () =>
      import(
        /* webpackChunkName: "index3" */ '../views/codeDetail/index.vue'
      ),
  },
  {
    path: '/setPassword',
    name: 'CovidMobileLogin4',
    component: () =>
      import(
        /* webpackChunkName: "setPassword" */ '../views/SetPassword/index.vue'
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
