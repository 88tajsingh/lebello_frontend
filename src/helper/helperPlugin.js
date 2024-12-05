import { isAuthenticated,showToast, clearError,filePath,normalFilePath } from './functions';

const HelpersPlugin = {
  install(app) {
    app.config.globalProperties.$isAuthenticated = isAuthenticated;
    app.config.globalProperties.$clearError = clearError;
    app.config.globalProperties.$filePath = filePath;
    app.config.globalProperties.$normalFilePath = normalFilePath;
    app.config.globalProperties.$showToast = showToast;
  }
};

export default HelpersPlugin;
