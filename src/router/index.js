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
      path: '/admin-schedule/:id',
      name: 'admin-schedule',
      component: () => import('../views/admin/Schedule.vue'),
      props: true
    },
    {
      path: '/detail-schedule/:id/:idProyek',
      name: 'detail-schedule',
      component: () => import('../views/admin/DetailSchedule.vue'),
      props: true
    },
    {
      path: '/admin-divisi',
      name: 'admin-divisi',
      component: () => import('../views/admin/Divisi.vue'),
      props: true
    },

    // manager
    {
      path: '/manager-dashboard',
      name: 'manager-dashboard',
      component: () => import('../views/manager/DashboardView.vue')
    },
    {
      path: '/manager-projects',
      name: 'manager-projects',
      component: () => import('../views/manager/ProjectView.vue')
    },
    {
      path: '/manager-create-project',
      name: 'manager-create-project',
      component: () => import('../views/manager/CreateProject.vue')
    },
    {
      path: '/manager-monitoring',
      name: 'manager-monitoring',
      component: () => import('../views/manager/MonitoringView.vue')
    },
    {
      path: '/manager-history',
      name: 'manager-history',
      component: () => import('../views/manager/HistoryView.vue')
    },
    {
      path: '/manager-schedule/:id',
      name: 'manager-schedule',
      component: () => import('../views/manager/Schedule.vue'),
      props: true
    },
    {
      path: '/manager-detail-schedule/:id/:idProyek',
      name: 'manager-detail-schedule',
      component: () => import('../views/manager/DetailSchedule.vue'),
      props: true
    },
    {
      path: '/manager-user',
      name: 'manager-user',
      component: () => import('../views/manager/Users.vue'),
      props: true
    },
    
  
    // user
    {
      path: '/user-dashboard',
      name: 'user-dashboard',
      component: () => import('../views/user/DashboardView.vue')
    },
    {
      path: '/user-projects',
      name: 'user-projects',
      component: () => import('../views/user/ProjectView.vue')
    },
    {
      path: '/user-create-project',
      name: 'user-create-project',
      component: () => import('../views/user/CreateProject.vue')
    },
    {
      path: '/user-monitoring',
      name: 'user-monitoring',
      component: () => import('../views/user/MonitoringView.vue')
    },
    {
      path: '/user-history',
      name: 'user-history',
      component: () => import('../views/user/HistoryView.vue')
    },

    {
      path: '/user-schedule/:id',
      name: 'user-schedule',
      component: () => import('../views/user/Schedule.vue'),
      props: true
    },
    {
      path: '/user-detail-schedule/:id',
      name: 'user-detail-schedule',
      component: () => import('../views/user/DetailSchedule.vue'),
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/admin/Profile.vue')
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
