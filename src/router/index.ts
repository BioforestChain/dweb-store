import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/link',
      name: 'link',
      component: () => import('../views/AppLinks.vue')
    },
    {
      path: '/contactus',
      name: 'contactus',
      component: () => import('../views/Contactus.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 滚动到页面顶部
  window.scrollTo(0, 0)
  next()
})

export default router
