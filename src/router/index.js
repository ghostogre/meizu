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
    }
  ]
})
