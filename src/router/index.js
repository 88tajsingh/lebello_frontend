import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/helper/functions'
import store from '@/store'

const  routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/forntend-views/Index-main.vue')
  },
  {
    path: '/productDetail',//done
    name: 'ProductDetail',
    component: () => import('../views/forntend-views/ProductDetails.vue')
  },
  {
    path: '/product_series/:slug?',//done
    name: 'product_series',
    component: () => import('../views/forntend-views/CategoryPage.vue')
  },
  {
    path: '/contract_location/:slug?',
    name: 'ContractLocation',
    component: () => import('../views/forntend-views/contract/ContractLocation.vue')
  },
  {
    path: '/contract_type/:slug?',
    name: 'contractType',
    component: () => import('../views/forntend-views/contract/ContractType.vue')
  },  
  {
    path: '/contract_design/:slug?',
    name: 'contractDesign',
    component: () => import('../views/forntend-views/contract/ContractDetail.vue')
  },
  {
    path: '/contactUs',//done
    name: 'contactUs',
    component: () => import('../views/forntend-views/ContactUsPage.vue')
  },
  {
    path: '/contract_designs',
    name: 'contractDesigns',
    component: () => import('../views/forntend-views/contract/ContractDesign.vue')
  },
  {
    path: '/dealers',
    name: 'dealers',
    component: () => import('../views/forntend-views/DealersPage.vue')
  },
  {
    path: '/libraryandtools',//done
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
    path: '/demoPage',
    name: 'register',
    component: () => import('../views/forntend-views/DemoPage.vue')
  },
  {
    path: '/materials-shop',
    name: 'materialsShop',
    component: () => import('../views/forntend-views/our-materials/OurMaterials.vue')
  },
  {
    path: '/material/:slug?',
    name: 'materialDetail',
    component: () => import('../views/forntend-views/our-materials/MaterialsDetail.vue')
  },
  {
    path: '/dashboard',
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
        path: '/swatches-form',
        name: 'Swatches-form',
        component: () => import('../views/Admin/Swatches/AddAndEdit.vue'),
        meta: { requiresAuth: true }
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
        path: '/media',
        name: 'Media-section',
        component: () => import('@/views/Admin/Media-section/MediaSection.vue'),
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
        path: '/designer',
        name: 'Designer',
        component: () => import('../views/Admin/Designer/Add-Designer/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/designer-form',
        name: 'Designer-form',
        component: () => import('../views/Admin/Designer/Add-Designer/AddEditForm.vue'),
        meta: { requiresAuth: true }
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
        path: '/dealer-form',
        name: 'Dealer-form',
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
        path: '/product',
        name: 'Product',
        component: () => import('../views/Admin/Products/Add/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/product-form',
        name: 'Product-from',
        component: () => import('../views/Admin/Products/Add/AddEditForm.vue'),
        meta: { requiresAuth: true }
      },
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

      //---------------------------------- post ------------------------------------------
      {
        path: '/post',
        name: 'Post',
        component: () => import('../views/Admin/Post/Add/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/post-form',
        name: 'Post-form',
        component: () => import('../views/Admin/Post/Add/AddEditForm.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/post-category',
        name: 'Post-category',
        component: () => import('../views/Admin/Post/Category/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/post-category-form',
        name: 'Post-category-form',
        component: () => import('../views/Admin/Post/Category/AddEditForm.vue'),
        meta: { requiresAuth: true }
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
      // ---------------------------------------------- home slider --------------------------------
      {
        path: '/home-slider',
        name: 'home-slider',
        component: () => import('../views/Admin/Home-Slider/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/home-slider-form',
        name: 'home-slider-form',
        component: () => import('../views/Admin/Home-Slider/AddEditContract.vue'),
        meta: { requiresAuth: true }
      },
      // ---home-slider-------------------------------- Material Slider  -----------------------------------------
      {
        path: '/material-slider',
        name: 'material-slider',
        component: () => import('../views/Admin/MaterialSlider/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/material-slider-form',
        name: 'material-slider-form',
        component: () => import('../views/Admin/MaterialSlider/AddEditForm.vue'),
        meta: { requiresAuth: true }
      },

      // ----------------------------------- GLOBAL SEO ROUTES  -----------------------------------------
      {
        path: '/global-seo',
        name: 'global-seo',
        component: () => import('../views/Admin/GlobalSeo/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/global-meta-tag-form',
        name: 'global-meta-tag-form',
        component: () => import('../views/Admin/GlobalSeo/AddEditGlobalMeta.vue'),
        meta: { requiresAuth: true }
      },
      // ----------------------------------- USERS ROUTES  -----------------------------------------
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/Admin/User/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/user-form',
        name: 'user-form',
        component: () => import('../views/Admin/User/AddEditUser.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('../views/NotFound404.vue')
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const relatedRoutesMap = {
  '/swatches': '/swatches-form',
  '/materials': '/materials-form',
  '/pages': '/pages-form',
  '/Contract-Design': '/contract-form',
  '/contract-type': '/contract-type-form',
  '/contract-location': '/contract-loaction-form',
  '/tags': '/tags-form',
  '/designer': '/designer-form',
  '/dealer': '/dealer-form',
  '/company': '/company-form',
  '/product': '/product-form',
  '/product-contract': '/product-contract-from',
  '/product-type': '/product-type-from',
  '/product-category-type': '/product-category-type-from',
  '/product-series': '/product-series-from',
  '/post': '/post-form',
  '/post-category': '/post-category-form',
  '/store-category': '/store-category-form',
  '/store-product': '/store-product-form',
  '/projects': '/project-form',
  '/Project-category': '/project-category-form',
  '/home-slider': '/home-slider-form',
  '/material-slider': '/material-slider-form',
  '/global-seo': '/global-meta-tag-form',
  '/users': '/user-form',
  '/dashboard': '/dashboard'
}

const publicPaths = [
  '/login',
  'material:slug?',
  '/forget-password',
  '/register',
  '/', 
  '/contract_location',
  '/productDetail',
  '/category',
  '/contract',
  '/contract_design/:slug?',
  '/contactUs',
  '/contract-design',
  '/dealers',
  '/libraryandtools',
  // '/not-found',
];

router.beforeEach((to, from, next) => {
  const token = store?.getters?.token || localStorage.getItem('token');
  const allowedPaths = store.getters.user?.modules?.route || [];
  const isAuthenticatedUser = isAuthenticated(token);
  // console.log(`Navigating to: ${to.path}`);
  // console.log("token", token);

  // Check for public paths
  if (publicPaths.includes(to.path)) {
    if (to.path === '/login' && isAuthenticatedUser) {
      return next('/dashboard');
    }
    return next(); 
  }

  // Prevent navigating to the same route
  if (to.path === from.path) {
    return next(false);
  }

  // Redirect authenticated users away from login
  if (to.name === '/login' && isAuthenticatedUser) {
    return next('/dashboard');
  }

  // Check for the dashboard route specifically
  if (to.path === '/dashboard' && !isAuthenticatedUser) {
    return next('/login'); 
  }

  // Check for routes requiring authentication
  if (to.meta.requiresAuth) {
    if (!isAuthenticatedUser) {
      return next('/login');
    }

    // Check if the path is allowed
    const isPathAllowed = allowedPaths.includes(to.path) || 
                          allowedPaths.some(path => relatedRoutesMap[path] === to.path);
    
    if (!isPathAllowed) {
      console.log("Redirecting to homepage due to insufficient permissions...");
      return next('/'); 
    }
  }

  next();
});

export default router