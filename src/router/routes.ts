import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: 'home',
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'aurora',
        path: 'aurora',
        components: {
          default: () => import('pages/AuroraPage.vue'),
          leftDrawer: () => import('layouts/drawers/LeftMainDrawer.vue'),
          header: () => import('layouts/headers/MainHeader.vue'),
        },
      },
      {
        name: 'home',
        path: 'home',
        components: {
          default: () => import('pages/HomePage.vue'),
          leftDrawer: () => import('layouts/drawers/LeftMainDrawer.vue'),
          header: () => import('layouts/headers/MainHeader.vue'),
        },
      },
      {
        name: 'onebot',
        path: 'onebot',
        components: {
          default: () => import('pages/OnebotPage.vue'),
          leftDrawer: () => import('layouts/drawers/LeftMainDrawer.vue'),
          header: () => import('layouts/headers/MainHeader.vue'),
        },
      },
      {
        name: 'block-adventure',
        path: 'block-adventure',
        components: {
          default: () => import('pages/BlockAdventurePage.vue'),
          leftDrawer: () => import('layouts/drawers/LeftMainDrawer.vue'),
          header: () => import('layouts/headers/MainHeader.vue'),
        },
      }
    ],
  },

  // Always leave this as the last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
