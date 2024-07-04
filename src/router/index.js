import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/helper/functions'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/forntend-views/Index-main.vue')
    },
    {
      path: '/productDetail',
      name: 'ProductDetail',
      component: () => import('../views/forntend-views/ProductDetails.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/forntend-views/CategoryPage.vue')
    },
    {
      path: '/contract',
      name: 'contract',
      component: () => import('../views/forntend-views/ContractPage.vue')
    },
    {
      path: '/contractDetails',
      name: 'contractDetails',
      component: () => import('../views/forntend-views/ContractDetailPage.vue')
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      component: () => import('../views/forntend-views/ContactUsPage.vue')
    },
    {
      path: '/contractDesign',
      name: 'contractDesign',
      component: () => import('../views/forntend-views/ContractDesign.vue')
    },
    {
      path: '/dealers',
      name: 'dealers',
      component: () => import('../views/forntend-views/DealersPage.vue')
    },
    {
      path: '/libraryandtools',
      name: 'library_and_tools',
      component: () => import('../views/forntend-views/library_and_tools.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/SigninView.vue'),
      
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: () => import('../views/Auth/ForgotPassword.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/Register.vue')
    },

    {
      path: '/admin',
      component:()=> import('../Layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component:()=> import('../views/Dashboard.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/dashboard',
          name: 'dashboard1',
          component:()=> import('../views/Dashboard.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/swatches',
          name: 'swatches',
          component:()=> import('../views/Admin/Swatches/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/swatches-add',
          name: 'swatches-add',
          component:()=> import('../views/Admin/Swatches/AddAndEdit.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/swatches/:id',
          name: 'swatches-edit',
          component:()=> import('../views/Admin/Swatches/AddAndEdit.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/materials',
          name: 'materials',
          component: ()=>import('../views/Admin/Materials/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/materials-add',
          name: 'materials-add',
          component:()=> import('../views/Admin/Materials/AddAndEdit.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/materials-edit',
          name: 'materials-edit',
          component:()=> import('../views/Admin/Materials/Edit.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/navigation-order',
          name: 'NavigationOrder',
          component:()=> import('../views/Admin/Swatches/NavigationOrder.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/ReOrder',
          name: 'ReOrder',
          component:()=> import('../views/Admin/Swatches/ReOrder.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/TaxonomyOrder',
          name: 'TaxonomyOrder',
          component:()=> import('../views/Admin/Swatches/TaxonomyOrder.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/pages',
          name: 'Pages',
          component:()=> import('../views/Admin/Pages/Index.vue'),
          meta: { requiresAuth: true }
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (to.meta.requiresAuth && !isAuthenticated(token)) {
    next('/login')
  } else {
    next()
  }
})

export default router
