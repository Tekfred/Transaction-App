import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/Mainlayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import MyAccounts from '@/views/MyAccounts.vue'
import Transfers from '@/views/Transfers.vue'
import Payments from '@/views/Payments.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: 'my-accounts',
          name: 'my-accounts',
          component: MyAccounts,
        },
        {
          path: 'transfers',
          name: 'transfers',
          component: Transfers,
        },
        {
          path: 'payments',
          name: 'payments',
          component: Payments,
        },
      ],
    },
  ],
})

export default router
