import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const isUserLoggedIn = false;


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/quadro',
    name: 'quadro',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/QuadroView.vue'),

    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/whiteboardView',
    name: 'WhiteboardView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/WhiteboardView.vue'),

    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    if (isUserLoggedIn) {
      next()
    }else{
    next('/')
    }

  }else{
    next();
  }
})

export default router
