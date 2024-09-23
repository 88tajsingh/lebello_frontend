import { logout, MaterialTreeList } from "./Apis";

const apiPlugin = {
  install(app) {
    app.config.globalProperties.$logout = logout;
    app.config.globalProperties.$MaterialTreeList = MaterialTreeList;
    // app.config.globalProperties.$clearError = clearError;
  }
};

export default apiPlugin;
