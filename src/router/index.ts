import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import PostsList from '../views/PostsList.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: PostsList,
  },
  {
    path: '/dodaj-kartke',
    name: 'add-post',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "addcart" */ '../views/EditSinglePost.vue'),
  },
  {
    path: '/kartka/:id',
    name: 'kartka',
    component: () => import(/* webpackChunkName: "post" */ '../views/SinglePost.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
