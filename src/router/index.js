import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue'),
      alias: '/login',
      meta: {
        bodyClass: 'custom-body-style', 
      },
    },

    // admin
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/DashboardView.vue')
    },
    {
      path: '/admin-projects',
      name: 'admin-projects',
      component: () => import('../views/admin/ProjectView.vue')
    },
    {
      path: '/admin-create-project',
      name: 'admin-create-project',
      component: () => import('../views/admin/CreateProject.vue')
    },
    {
      path: '/admin-monitoring',
      name: 'admin-monitoring',
      component: () => import('../views/admin/MonitoringView.vue')
    },
    {
      path: '/admin-history',
      name: 'admin-history',
      component: () => import('../views/admin/HistoryView.vue')
    },

    {
      path: '/admin-schedule',
      name: 'admin-schedule',
      component: () => import('../views/admin/Schedule.vue')
    },


    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/Unauthorized.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    }
  ]
})


export default router
