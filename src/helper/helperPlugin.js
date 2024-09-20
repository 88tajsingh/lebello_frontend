import { isAuthenticated,showToast, clearError,filePath,checkPermissions,handleErrorResponse } from './functions';

const HelpersPlugin = {
  install(app) {
    app.config.globalProperties.$isAuthenticated = isAuthenticated;
    app.config.globalProperties.$clearError = clearError;
    app.config.globalProperties.$filePath = filePath;
    app.config.globalProperties.$showToast = showToast;
    app.config.globalProperties.$checkPermissions = checkPermissions;
    app.config.globalProperties.$handleErrorResponse = handleErrorResponse;
  }
};

export default HelpersPlugin;
