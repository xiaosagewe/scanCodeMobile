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
    path: '/codeScanToStore',
    name: 'codeScanToStore',
    component: () =>
      import(
        /* webpackChunkName: "codeScanToStore" */ '../views/codeScanToStore/index.vue'
      ),
  },
  {
    path: '/scanCodeIndex',
    name: 'scanCodeIndex',
    component: () =>
      import(
        /* webpackChunkName: "scanCodeIndex" */ '../views/ScanCodeIndex/index.vue'
      ),
  },
  {
    path: '/scanCodeIndex1',
    name: 'scanCodeIndex1',
    component: () =>
      import(
        /* webpackChunkName: "scanCodeIndex1" */ '../views/ScanCodeIndex/index1.vue'
      ),
  },
  {
    path: '/scanCodeSuccess',
    name: 'scanCodeSuccess',
    component: () =>
      import(
        /* webpackChunkName: "scanCodeSuccess" */ '../views/ScanCodeSuccess/index.vue'
      ),
  },
  {
    path: '/scanCodeSuccess1',
    name: 'scanCodeSuccess1',
    component: () =>
      import(
        /* webpackChunkName: "scanCodeSuccess1" */ '../views/ScanCodeSuccess/index1.vue'
      ),
  },
  {
    path: '/scanCodeFail',
    name: 'scanCodeFail',
    component: () =>
      import(
        /* webpackChunkName: "scanCodeFail" */ '../views/ScanCodeFail/index.vue'
      ),
  },
  {
    path: '/codeDetail',
    name: 'codeDetail',
    component: () =>
      import(
        /* webpackChunkName: "codeDetail" */ '../views/codeDetail/index.vue'
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
