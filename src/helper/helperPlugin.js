import { isAuthenticated, clearError } from './functions';

const HelpersPlugin = {
  install(app) {
    app.config.globalProperties.$isAuthenticated = isAuthenticated;
    app.config.globalProperties.$isAuthenticated = isAuthenticated;
    app.config.globalProperties.$clearError = clearError;
  }
};

export default HelpersPlugin;
