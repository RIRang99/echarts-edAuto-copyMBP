import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EDA',
      component: () => import('@/views/EDA.vue')
    }
  ]
})

export default router