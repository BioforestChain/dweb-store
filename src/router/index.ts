import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/HomeView.vue')
    },
    {
      path: '/pc',
      name: 'PC',
      component: () => import('../views/pc/HomePcView.vue'),
    },
    {
      path: '/link',
      name: 'link',
      component: () => import('../views/home/AppLinks.vue'),
    },
    {
      path: '/linkPc',
      name: 'linkPc',
      component: () => import('../views/pc/AppLinks_pc.vue'),
    },
    {
      path: '/contactus',
      name: 'contactus',
      component: () => import('../views/home/Contactus.vue'),
    },
    {
      path: '/contactusPc',
      name: 'contactusPc',
      component: () => import('../views/pc/Contactus_pc.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  // 检测是否在 PC 端
  const isPC = window.innerWidth > 768; // 举例：根据窗口宽度来判断是否在 PC 端

  if (isPC) {
    // 如果在 PC 端，跳转到 PC 页面
    if (to.path === '/' || to.path === '/link') {
      next('/pc');
    } else {
      next();
    }
  } else {
    // 如果在移动端，跳转到移动页面
    if (to.path === '/pc' || to.path === '/linkPc') {
      next('/');
    } else {
      next();
    }
  }
})

router.beforeEach((to, from, next) => {
  // 滚动到页面顶部
  window.scrollTo(0, 0);
  next();
});

export default router
