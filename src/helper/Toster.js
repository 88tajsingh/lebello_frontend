import Toast from 'vue3-toastify';
import 'vue3-toastify/dist/vue3-toastify.css';

const plugin = {
  install(app) {
    app.use(Toast);
  }
};

export default plugin;
