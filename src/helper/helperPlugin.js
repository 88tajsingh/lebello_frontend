import { isAuthenticated,showToast, clearError,filePath,checkPermissions } from './functions';

const HelpersPlugin = {
  install(app) {
    app.config.globalProperties.$isAuthenticated = isAuthenticated;
    app.config.globalProperties.$clearError = clearError;
    app.config.globalProperties.$filePath = filePath;
    app.config.globalProperties.$showToast = showToast;
    app.config.globalProperties.$checkPermissions = checkPermissions;
  }
};

export default HelpersPlugin;
