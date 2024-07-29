const ApiConfig = {
  register: '/register',
  login: '/login',
  logout: '/logout',
  updateProfile: '/update-profile',
  forgetPassword: '/reset/password/email',
  updatePassword: '/update-password',

  // materials config
  getMaterial: '/material-list',
  addMaterial: '/create-material',
  editMaterial: '/edit-material',
  deleteMaterial: '/delete-material',
  materialStatus: 'update-material-status',
  getMaterialTeeeList: '/get-material-tree-list',
  materialSorting: '/sort-data',
  taxonomySort: '/add-taxanomy-order',
  bulkDeleteMaterial: '/mterial-bulk-delete',

  // swatches config
  getSwatches: '/get-swatches',
  addSwatches: '/add-swatches',
  editSwatches: '/update-swatches',
  deleteSwatches: '/delete-swatches',
  swatchesSorting: '/sort-data',
  bulkDeleteSwatches: '/bulk-swatches-delete',
  // materialStatus: 'update-material-status',

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
  // bulkDeletePages :'/bulk-Pages-delete',

  // contract design
  getNewContract: '/get-contract-design',
  addNewContract: '/add-contract-design',
  editNewContract: '/update-contract-design',
  deleteNewContract: '/delete-contract-design',
  bulkNewContract: '/bulk-delete-contract-design',

  // Contract Type Tree List
  getContract: '/get-contract-type',
  addContract: '/add-contract-type',
  editContract: '/update-contract-type',
  deleteContract: '/delete-contract-type',
  getContractTreeList: '/get-contract-tree-type',
  bulkDeletecontract: '/delete-bulk-contract-type',
  contractTaxonomySort: '/add-taxanomy-order',

  // Contract location Tree List
  getContractLocation: '/get-contract-location',
  addContractLocation: '/add-contract-location',
  editContractLocation: '/update-contract-location',
  deleteContractLocation: '/delete-contract-location',
  bulkDeleteLocation: '/bulk-delete-contract-location',
  getContractLocationTreeList: '/get-contract-location-tree-list',
  contractLocationTaxonomySort: '/add-taxanomy-order',

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
  deleteTags: '/delete-tag',
  bulkDeleteTags: '/bulk-delete-tag',

  // --------------------------------------   Products   ----------------------------------------------------
  // products types
  getProductType: '/get-product-type',
  addProductType: '/add-product-type',
  editProductType: '/update-product-type',
  deleteProductType: '/delete-product-type',
  bulkDeleteProductType: '/bulk-delete-product-type',
  getProductTypeTreeList: '/product-type-tree-list',

  // products types
  getProductCategoryType: '/get-product-category-type',
  addProductCategoryType: '/add-product-category-type',
  editProductCategoryType: '/update-product-category-type',
  deleteProductCategoryType: '/delete-product-category-type',
  bulkDeleteProductCategoryType: '/bulk-delete-product-category-type',
  getProductCategoryTypeTreeList: '/product-category-type-tree-list',

  // products Contract
  getProductContract: '/get-contract-list',
  addProductContract: '/add-contract',
  editProductContract: '/update-contract',
  deleteProductContract: '/delete-contract',
  bulkDeleteProductContract: '/delete-bulk-contract',
  getProductContractTree: '/get-contract-tree-list',

  // products Series
  getProductSeries: '/get-product-series',
  addProductSeries: '/add-product-series',
  editProductSeries: '/update-product-series',
  deleteProductSeries: '/delete-product-series',
  bulkDeleteProductSeries: '/delete-bulk-product-series',
  getProductSeriesTree: '/get-product-series-tree-list',

  // ---------------------------------------  store  -------------------------------------
  // store category

  getStoreCategory: '/get-store-category',
  addStoreCategory: '/add-store-category',
  editStoreCategory: '/update-store-category',
  deleteStoreCategory: '/delete-store-category',
  bulkDeleteStoreCategory: '/bulk-delete-store-category',
  getProductStoreCategory: '/get-store-category-tree-list',

  // -------------------------------- Project ---------------------------------------------
  // Projects
  getProjects: '/get-project-list',
  addProjects: '/add-project',
  editProjects: '/update-project',
  deleteProjects: '/delete-project',
  bulkDeleteProjects: '/bulk-delete-project',
  // Project category
  getProjectCategory: '/get-project-category',
  addProjectCategory: '/add-project-category',
  editProjectCategory: '/update-project-category',
  deleteProjectCategory: '/delete-project-category',
  bulkDeleteProjectCategory: '/bulk-delete-project-category',
  getProductProjectCategory: '/get-project-category-tree-list',
  getProjectCategorytree: '/get-project-category-tree-list'
}

export default ApiConfig
