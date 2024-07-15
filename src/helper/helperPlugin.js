import { isAuthenticated, clearError,filePath,toggleSelection } from './functions';

const HelpersPlugin = {
  install(app) {
    app.config.globalProperties.$isAuthenticated = isAuthenticated;
    app.config.globalProperties.$clearError = clearError;
    app.config.globalProperties.$filePath = filePath;
    app.config.globalProperties.$toggleSelection = toggleSelection;
  }
};

export default HelpersPlugin;
