import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: () =>
      import(
        /* webpackChunkName: "inde2x" */ '../views/Index2/index.vue'
      ),
  },
  {
    path: '/scanCodeIndex',
    name: 'scanCodeIndex',
    component: () =>
      import(
        /* webpackChunkName: "inde2x" */ '../views/ScanCodeIndex/index.vue'
      ),
  },
  {
    path: '/scanCodeSuccess',
    name: 'scanCodeSuccess',
    component: () =>
      import(
        /* webpackChunkName: "inde2x" */ '../views/ScanCodeSuccess/index.vue'
      ),
  },
  {
    path: '/scanCodeFail',
    name: 'scanCodeFail',
    component: () =>
      import(
        /* webpackChunkName: "inde2x" */ '../views/ScanCodeFail/index.vue'
      ),
  },
  {
    path: '/codeDetail',
    name: 'codeDetail',
    component: () =>
      import(
        /* webpackChunkName: "index3" */ '../views/codeDetail/index.vue'
      ),
  },
  {
    path: '/setPassword',
    name: 'setPassword',
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
