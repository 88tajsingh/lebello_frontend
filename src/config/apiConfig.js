
const ApiConfig = {
    register:'/register',
    login: '/login',
    logout: '/logout',
    forgetPassword: '/reset/password/email',
    updatePassword: '/update-password',

    // materials config
    getMaterial :'/material-list',
    addMaterial :'/create-material',
    editMaterial :'/edit-material',
    deleteMaterial :'/delete-material',
    materialStatus: 'update-material-status',
    getMaterialTeeeList:'/get-material-tree-list',
    materialSorting:'/sort-data',
    taxonomySort:'/sort-data',
    bulkDeleteMaterial:'/mterial-bulk-delete',


    // swatches config
    getSwatches :'/get-swatches',
    addSwatches :'/add-swatches',
    editSwatches:'/update-swatches',
    deleteSwatches :'/delete-swatches',
    swatchesSorting:'/sort-data',
    bulkDeleteSwatches :'/bulk-swatches-delete',
    // materialStatus: 'update-material-status',

  };
  
  export default ApiConfig;
  