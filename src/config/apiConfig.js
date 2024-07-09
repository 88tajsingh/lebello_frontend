
const ApiConfig = {
    register:'/register',
    login: '/login',
    logout: '/logout',
    updateProfile: '/update-profile',
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
    taxonomySort:'/add-taxanomy-order',
    bulkDeleteMaterial:'/mterial-bulk-delete',


    // swatches config
    getSwatches :'/get-swatches',
    addSwatches :'/add-swatches',
    editSwatches:'/update-swatches',
    deleteSwatches :'/delete-swatches',
    swatchesSorting:'/sort-data',
    bulkDeleteSwatches :'/bulk-swatches-delete',
    // materialStatus: 'update-material-status',

    // folders 
    getFolder:'/get-folders',
    getFolderChild:'/get-folder-child',
    addFolder:'/add-folder',
    editFolder:'/update-folder',
    deleteFolder:'/delete-folder',

    // media 
    getMedia:'/get-media',
    getMediaChild:'/get-media-items',
    addMedia:'/add-media',
    editMedia:'/update-media',
    deleteMedia:'/delete-media',

    // pages 
    getPages :'/pages-list?limit=20',
    addPages :'/add-pages',
    editPages:'/update-pages',
    deletePages :'/delete-pages',
    PagesSorting:'/sort-data',
    // bulkDeletePages :'/bulk-Pages-delete',
  };
  
  export default ApiConfig;
  