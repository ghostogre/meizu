import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index.vue')
    },
    {
      path: '/category/:id?',
      name: 'category',
      component: () => import('@/views/category.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/views/detail.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/cart.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/order.vue')
    },
    // 动画
    {
      path: '/vsAnimate',
      name: 'vsAnimate',
      component: () => import('@/animate/css/vs.vue')
    },
    {
      path: '/heartAnimate',
      name: 'heartAnimate',
      component: () => import('@/animate/css/twitter.vue')
    },
    {
      path: '/juejin',
      name: 'juejin',
      component: () => import('@/animate/css/juejin.vue')
    },
    {
      path: '/pilipili',
      name: 'pilipili',
      component: () => import('@/animate/css/pilipili.vue')
    }
  ]
})
