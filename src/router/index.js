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
      component: () => import('../views/Auth/SigninView.vue')
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
      component: () => import('../Layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/components/Admin-components/Header/ProfilePopup.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/dashboard',
          name: 'dashboard1',
          component: () => import('../views/Dashboard.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/swatches',
          name: 'swatches',
          component: () => import('../views/Admin/Swatches/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/swatches-add',
          name: 'swatches-add',
          component: () => import('../views/Admin/Swatches/AddAndEdit.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/swatches-edit/',
          name: 'swatches-edit',
          component: () => import('../views/Admin/Swatches/AddAndEdit.vue'),
          meta: { requiresAuth: true },
          props: true
        },
        {
          path: '/materials',
          name: 'materials',
          component: () => import('../views/Admin/Materials/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/materials-form',
          name: 'materials-form',
          component: () => import('../views/Admin/Materials/AddAndEdit.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/navigation-order',
          name: 'NavigationOrder',
          component: () => import('../views/Admin/Swatches/NavigationOrder.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/ReOrder',
          name: 'ReOrder',
          component: () => import('../views/Admin/Swatches/ReOrder.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/TaxonomyOrder',
          name: 'TaxonomyOrder',
          component: () => import('../views/Admin/Swatches/TaxonomyOrder.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/pages',
          name: 'Pages',
          component: () => import('../views/Admin/Pages/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/pages-form',
          name: 'pages-form',
          component: () => import('../views/Admin/Pages/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/pages-edit/',
          name: 'pages-edit',
          component: () => import('../views/Admin/Pages/AddEditForm.vue'),
          props: true,
          meta: { requiresAuth: true }
        },
        {
          path: '/media',
          name: 'Media-section',
          component: () => import('../views/Admin/Media-section/MediaSection.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/Contract-Design',
          name: 'Contract-design',
          component: () => import('../views/Admin/Contract/Contract-Design/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/contract-form',
          name: 'Contract-form',
          component: () => import('../views/Admin/Contract/Contract-Design/AddEditContract.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/contract-edit/:id',
          name: 'Contract-edit',
          component: () => import('../views/Admin/Contract/Contract-Design/AddEditContract.vue'),
          meta: { requiresAuth: true },
          props: true
        },
        {
          path: '/contract-type',
          name: 'Contract-type',
          component: () => import('../views/Admin/Contract/Contract-type/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/contract-type-form',
          name: 'Contract-type-form',
          component: () => import('../views/Admin/Contract/Contract-type/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/contract-location',
          name: 'Contract-location',
          component: () => import('../views/Admin/Contract/contract-location/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/contract-loaction-form',
          name: 'Contract-location-from',
          component: () => import('../views/Admin/Contract/contract-location/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/contract-taxonomy-order',
          name: 'Contract-taxonomy-order',
          component: () => import('../views/Admin/Contract/TaxonomyOrder.vue'),
          meta: { requiresAuth: true },
          props: true
        },
        {
          path: '/domains',
          name: 'Domains',
          component: () => import('../views/Admin/General-Settings/Domains/Index.vue'),
          meta: { requiresAuth: true },
          props: true
        },
        {
          path: '/currency',
          name: 'Currency',
          component: () => import('../views/Admin/General-Settings/Currency/Index.vue'),
          meta: { requiresAuth: true },
          props: true
        },

        {
          path: '/tags',
          name: 'Tags',
          component: () => import('../views/Admin/Tags/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/tags-form',
          name: 'Tags-form',
          component: () => import('../views/Admin/Tags/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/tags-edit/:id',
          name: 'Tags-edit',
          component: () => import('../views/Admin/Tags/AddEditForm.vue'),
          meta: { requiresAuth: true },
          props: true
        },
        {
          path: '/designer',
          name: 'Designer',
          component: () => import('../views/Admin/Designer/Add-Designer/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/designer-add',
          name: 'Designer-add',
          component: () => import('../views/Admin/Designer/Add-Designer/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/designer-edit/:id',
          name: 'Designer-edit',
          component: () => import('../views/Admin/Designer/Add-Designer/AddEditForm.vue'),
          meta: { requiresAuth: true },
          props: true
        },
        {
          path: '/designer-taxonomyOrder',
          name: 'designer-TaxonomyOrder',
          component: () => import('../views/Admin/Designer/TaxonomyOrder.vue'),
          meta: { requiresAuth: true },
          props: true
        },
        {
          path: '/designer-reOrder',
          name: 'designer-ReOrder',
          component: () => import('../views/Admin/Designer/ReOrder.vue'),
          meta: { requiresAuth: true },
          props: true
        },
        {
          path: '/dealer',
          name: 'Dealer',
          component: () => import('../views/Admin/Dealers/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/dealer-add',
          name: 'Dealer-add',
          component: () => import('../views/Admin/Dealers/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/dealer-edit/',
          name: 'Dealer-edit',
          component: () => import('../views/Admin/Dealers/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },

        // ---------------------------------Company ROutes--------------------------------------------//
        {
          path: '/company',
          name: 'company',
          component: () => import('../views/Admin/Company/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/company-form',
          name: 'company-form',
          component: () => import('../views/Admin/Company/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        // -------------------------------- products path ---------------------------------------------
        {
          path: '/product-contract',
          name: 'Product-contract',
          component: () => import('../views/Admin/Products/Contract/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/product-contract-from',
          name: 'Product-contract-from',
          component: () => import('../views/Admin/Products/Contract/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/product-type',
          name: 'Product-type',
          component: () => import('../views/Admin/Products/Type/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/product-type-from',
          name: 'Product-type-from',
          component: () => import('../views/Admin/Products/Type/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/product-category-type',
          name: 'Product-category-type',
          component: () => import('../views/Admin/Products/Category-Type/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/product-category-type-from',
          name: 'Product-category-type-from',
          component: () => import('../views/Admin/Products/Category-Type/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/product-series',
          name: 'product-series-type',
          component: () => import('../views/Admin/Products/Series/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/product-series-from',
          name: 'product-series-from',
          component: () => import('../views/Admin/Products/Series/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/product-taxonomyOrder',
          name: 'Product-taxonomyOrder',
          component: () => import('../views/Admin/Products/TaxonomyOrder.vue'),
          meta: { requiresAuth: true },
          props: true
        },

        // ----------------------------------- store  -----------------------------------------
        {
          path: '/store-category',
          name: 'Store-category',
          component: () => import('../views/Admin/Store/Category/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/store-category-form',
          name: 'Store-category-form',
          component: () => import('../views/Admin/Store/Category/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/store-product',
          name: 'Store-product',
          component: () => import('../views/Admin/Store/Product/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/store-product-form',
          name: 'Store-product-form',
          component: () => import('../views/Admin/Store/Product/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        // ----------------------------------- Project -----------------------------------------
        {
          path: '/projects',
          name: 'projects',
          component: () => import('../views/Admin/Project/Add/Index.vue'),
          meta: { requiresAuth: true },
          props: true
        },
        {
          path: '/project-form',
          name: 'Project-form',
          component: () => import('../views/Admin/Project/Add/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/project-category',
          name: 'Project-category',
          component: () => import('../views/Admin/Project/Category/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/project-category-form',
          name: 'Project-category-form',
          component: () => import('../views/Admin/Project/Category/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/project-taxonomy',
          name: 'Project-taxonomy',
          component: () => import('../views/Admin/Project/TaxonomyOrder.vue'),
          meta: { requiresAuth: true },
          props: true
        },
        // ----------------------------------- Material Slider  -----------------------------------------
        {
          path: '/material-slider',
          name: 'material-slider',
          component: () => import('../views/Admin/MaterialSlider/Index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/material-slider-add',
          name: 'material-slider-add',
          component: () => import('../views/Admin/MaterialSlider/AddEditForm.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/material-slider-edit/:id',
          name: 'material-slider-edit',
          component: () => import('../views/Admin/MaterialSlider/AddEditForm.vue'),
          meta: { requiresAuth: true },
          props: true
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = store.getters.token || localStorage.getItem('token')
  if (to.name === 'login' && isAuthenticated(token)) {
    next('/dashboard')
  } else if (to.meta.requiresAuth && !isAuthenticated(token)) {
    next('/login')
  } else {
    next()
  }
})

export default router
