const ApiConfig = {
  register: '/register',
  login: '/login',
  refreshToken: '/refresh-token',
  logout: '/logout',
  updateProfile: '/update-profile',
  forgetPassword: '/reset/password/email',
  updatePassword: '/update-password',
  getSwatchesMaterialList: '/get-swatches-material-list',

  // materials config
  getMaterial: '/material-list',
  addMaterial: '/create-material',
  editMaterial: '/edit-material',
  deleteMaterial: '/delete-material',
  materialStatus: 'update-material-status',
  getMaterialTeeeList: '/get-material-tree-list',
  materialSorting: '/sort-data',
  deleteMasterMaterial: '/delete-master-material',
  masterMaterialSlugUpdate: '/master-material-slug-update',
  globalMaterialUpdate: '/global-material-update',
  taxonomySort: '/add-taxanomy-order',
  bulkDeleteMaterial: '/mterial-bulk-delete',

  // swatches config
  getSwatches: '/get-swatches',
  addSwatches: '/add-swatches',
  editSwatches: '/update-swatches',
  deleteSwatches: '/delete-swatches',
  swatchesSorting: '/sort-data',
  bulkDeleteSwatches: '/bulk-swatches-delete',
  masterSwatchesSlugUpdate: '/master-swatch-slug-update',
  globalSwatchDataUpdate: '/global-swatch-update',
  deleteMasterSwatch: '/delete-master-swatch',

  // folders
  getFolder: '/get-folders',
  getFolderChild: '/get-folder-child',
  addFolder: '/add-folder',
  editFolder: '/update-folder',
  deleteFolder: '/delete-folder',

  // media
  getMedia: '/get-media',
  getMediaChild: '/get-media-items',
  addMedia: '/add-media',
  editMedia: '/update-media',
  deleteMedia: '/delete-media',

  // pages
  getPages: '/pages-list',
  addPages: '/add-pages',
  editPages: '/update-pages',
  deletePages: '/delete-pages',
  PagesSorting: '/sort-data',
  globalPageUpdate: '/global-page-update',
  deletePageMaster: '/delete-master-page',
  masterPageSlugUpdate: '/master-page-slug-update',
  // bulkDeletePages :'/bulk-Pages-delete',

  // contract design
  getNewContract: '/get-contract-design',
  addNewContract: '/add-contract-design',
  editNewContract: '/update-contract-design',
  deleteNewContract: '/delete-contract-design',
  bulkNewContract: '/bulk-delete-contract-design',
  masterContractDesignSlugUpdate: '/master-contract-design-slug-update',
  globalContractDesignUpdate: '/global-contract-design-update',
  deleteMasterContractDesign: '/delete-master-contract-design',

  // Contract Type Tree List
  getContract: '/get-contract-type',
  addContract: '/add-contract-type',
  editContract: '/update-contract-type',
  deleteContract: '/delete-contract-type',
  getContractTreeList: '/get-contract-tree-type',
  bulkDeletecontract: '/delete-bulk-contract-type',
  contractTaxonomySort: '/add-taxanomy-order',
  masterContractTypeSlugUpdate: '/master-contract-type-slug-update',
  globalContractTypeUpdate: '/global-contract-type-update',
  deleteMasterContractType: '/delete-master-contract-type',

  // Contract location Tree List
  getContractLocation: '/get-contract-location',
  addContractLocation: '/add-contract-location',
  editContractLocation: '/update-contract-location',
  deleteContractLocation: '/delete-contract-location',
  bulkDeleteLocation: '/bulk-delete-contract-location',
  getContractLocationTreeList: '/get-contract-location-tree-list',
  contractLocationTaxonomySort: '/add-taxanomy-order',
  masterContractLocationSlugUpdate: '/master-contract-location-slug-update',
  globalContractLocationUpdate: '/global-contract-location-update',
  deleteMasterContractLocation: '/delete-master-contract-location',

  // domain
  getDomains: '/domain-list',
  addDomains: '/add-domain',
  deleteDomains: '/delete-domain',

  //  countries
  getAllCountries: '/get-countries',
  getCountries: '/get-country-list',

  // Currencies
  getCurrenciesList: '/get-currency-list',
  getAllCurrencies: '/get-currencies',

  //exchange rates
  getExchangeRatesList: '/get-exchange-rate',
  addExchangeRates: '/add-exchange-rate',
  editExchangeRates: '/update-exchange-rate',
  deleteExchangeRates: '/delete-exchange-rate',

  // Tags
  getTags: '/get-tags',
  addTags: '/add-tag',
  editTags: '/update-tag',
  globalUpdateTags: '/global-tag-update',
  masterSlugUpdate: '/master-tag-slug-update',
  masterSlugDelete: '/delete-master-tag',
  deleteTags: '/delete-tag',
  bulkDeleteTags: '/bulk-delete-tag',

  // Designer
  getDesigners: '/get-designers',
  addDesigners: '/add-designer',
  editDesigners: '/update-designer',
  deleteDesigners: '/delete-designer',
  bulkDeleteDesigners: '/bulk-delete-designer',
  globalDesignersUpdate: '/global-designer-update',
  deleteMasterDesigners: '/delete-master-designer',
  masterDesignersSlugUpdate: '/master-designer-slug-update',

  // Dealers
  getDealer: '/get-dealers',
  addDealer: '/add-dealers',
  editDealer: '/update-dealers',
  deleteDealer: '/delete-dealer',
  bulkDeleteDealer: '/bulk-delete-dealer',
  masterSlugDealerUpdate: '/master-dealer-slug-update',
  globalDealerUpdate: '/global-dealer-update',
  deleteMasterDealer: '/delete-master-dealer',

  // --------------------------------------   Products   ----------------------------------------------------
  // products types
  getProductType: '/get-product-type',
  addProductType: '/add-product-type',
  editProductType: '/update-product-type',
  deleteProductType: '/delete-product-type',
  bulkDeleteProductType: '/bulk-delete-product-type',
  getProductTypeTreeList: '/product-type-tree-list',
  globalUpdateProductType: '/global-product-type-update',
  mastetrDeleteProductType: '/delete-master-product-type',
  masterSlugUpdateProductType: '/master-product-type-slug-update',

  // products types
  getProductCategoryType: '/get-product-category-type',
  addProductCategoryType: '/add-product-category-type',
  editProductCategoryType: '/update-product-category-type',
  deleteProductCategoryType: '/delete-product-category-type',
  bulkDeleteProductCategoryType: '/bulk-delete-product-category-type',
  getProductCategoryTypeTreeList: '/product-category-type-tree-list',
  productSlugUpdate: '/master-product-category-type-slug-update',
  slugUpdateProductCategoryType: '/master-product-category-type-slug-update',
  deleteMasterProductCategoryType: '/delete-master-product-category-type',
  globalUpdateMasterProductCategoryType: '/global-product-category-type-update',

  // products Contract
  getProductContract: '/get-contract-list',
  addProductContract: '/add-contract',
  editProductContract: '/update-contract',
  deleteProductContract: '/delete-contract',
  bulkDeleteProductContract: '/delete-bulk-contract',
  getProductContractTree: '/get-contract-tree-list',
  masterSlugProductContract: '/master-contract-slug-update',
  globalUpdateProductContract: '/global-contract-update',
  deleteMasterProductContract: '/delete-master-contract',

  // products Series
  getProductSeries: '/get-product-series',
  addProductSeries: '/add-product-series',
  editProductSeries: '/update-product-series',
  deleteProductSeries: '/delete-product-series',
  bulkDeleteProductSeries: '/delete-bulk-product-series',
  getProductSeriesTree: '/get-product-series-tree-list',
  masterProductSeriesSlugUpdate: '/master-product-series-slug-update',
  globalProductSeriesUpdate: '/global-product-series-update',
  deleteMasterProductSeries: '/delete-master-product-series',

  // ---------------------------------------  store  -------------------------------------
  // store category
  getStoreCategory: '/get-store-category',
  addStoreCategory: '/add-store-category',
  editStoreCategory: '/update-store-category',
  deleteStoreCategory: '/delete-store-category',
  bulkDeleteStoreCategory: '/bulk-delete-store-category',
  getProductStoreCategory: '/get-store-category-tree-list',
  deleteMasterProductCategory: '/delete-master-store-category',
  globalProductCategoryUpdate: '/global-store-category-update',
  masterProductCategorySlugUpdate: '/master-store-category-slug-update',

  // store Product
  getStoreProduct: '/get-store-product',
  addStoreProduct: '/add-store-product',
  editStoreProduct: '/update-store-product',
  deleteStoreProduct: '/delete-store-product',
  bulkDeleteStoreProduct: '/bulk-delete-store-product',
  masterStoreProductSlugUpdate: '/master-store-product-slug-update',
  globalStoreProductUpdate: '/global-store-product-update',
  masterDeleteStoreProduct: '/delete-master-store-product',

  // -------------------------------- Project ---------------------------------------------
  // Projects
  getProjects: '/get-project-list',
  addProjects: '/add-project',
  editProjects: '/update-project',
  deleteProjects: '/delete-project',
  bulkDeleteProjects: '/bulk-delete-project',
  masterProjectsSlugUpdate: '/master-project-slug-update',
  globalProjectsUpdate: '/global-project-update',
  deleteMasterProjects: '/delete-master-project',

  // Project category
  getProjectCategory: '/get-project-category',
  addProjectCategory: '/add-project-category',
  editProjectCategory: '/update-project-category',
  deleteProjectCategory: '/delete-project-category',
  bulkDeleteProjectCategory: '/bulk-delete-project-category',
  getProductProjectCategory: '/get-project-category-tree-list',
  getProjectCategorytree: '/get-project-category-tree-list',
  masterProjectCategorysSlugUpdate: '/master-project-category-slug-update',
  globalProjectsCategoryUpdate: '/global-project-category-update',
  deleteMasterProjectsCategory: '/delete-master-project-category',

  // ------------------------------------- Post --------------------------------
   // post
   getPost: '/get-post',
   addPost: '/add-post',
   editPost: '/update-post',
   deletePost: '/delete-post',
   bulkDeletePost: '/bulk-delete-post',
  
  // Post categories
  getPostCategory: '/post-category-list',
  addPostCategory: '/add-post-category',
  editPostCategory: '/update-post-category',
  deletePostCategory: '/delete-post-category',
  bulkDeletePostCategory: '/bulk-delete-post-category',
  getPostCategoryTree: '/post-category-tree-list',

 



  //Company
  getCompany: '/get-company',
  addCompany: '/add-company',
  editCompany: 'update-company',
  deleteCompany: 'delete-company',
  bulkDeleteCompany: 'bulk-delete-company',

  // Material SLider
  getMaterialSliders: '/get-material-slider',
  addMaterialSlider: '/add-material-slider',
  editMaterialSlider: '/update-material-slider',
  deleteMaterialSlider: '/delete-material-slider',
  bulkDeleteMaterialSlider: '/bulk-delete-material-slider',

  // Home SLider
  getHomeSlider: '/get-home-slider',
  addHomeSlider: '/add-home-slider',
  editHomeSlider: '/update-home-slider',
  deleteHomeSlider: '/delete-home-slider',
  bulkDeleteHomeSlider: '/bulk-delete-home-slider',
  masterHomeSliderSlugUpdate: '/master-home-slider-slug-update',
  globalHomeSliderUpdate: '/global-home-slider-update',
  DeleteMasterHomeSlider: '/delete-master-home-slider',
}

export default ApiConfig
