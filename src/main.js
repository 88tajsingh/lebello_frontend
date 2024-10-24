import { createApp, defineAsyncComponent } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import store from './store';
import HelpersPlugin from './helper/helperPlugin';
import Toast from 'vue-toastification';

// CSS Imports
import './assets/main.css';
import './assets/css/satoshi.css';
import './assets/css/style.css';
import '@bhplugin/vue3-datatable/dist/style.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-toastification/dist/index.css';
import Loader from '@/components/Admin-components/Loader.vue';

// Lazy load components
defineAsyncComponent
// Toast options
const toastOptions = {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  draggable: true,
  draggablePercent: 0.6,
  transition: 'Vue-Toastification__bounce',
  containerClassName: 'my-toast-container',
  toastClassName: 'my-toast',
  hideProgressBar: false,
  closeButton: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
};

// Create Vue app
const app = createApp(App);

app.use(HelpersPlugin);
app.use(Toast, toastOptions);
app.use(router);
app.use(store);
app.use(createPinia());

// Register components normally
app.component('Loader', components.Loader);
app.component('Button', components.Button);
app.component('Select', components.Select);
app.component('InputError', components.InputError);
app.component('InputLabel', components.InputLabel);
app.component('DomainComponent', components.DomainComponent);
app.component('EditSvg', components.EditSvg);
app.component('CompareSvg', components.CompareSvg);
app.component('DeleteSvg', components.DeleteSvg);
app.component('ColorInput', components.ColorInput);
app.component('TextInput', components.TextInput);
app.component('Checkbox', components.Checkbox);
app.component('PopupModal', components.PopupModal);
app.component('SingleCheck', components.SingleCheck);
app.component('PageHeader', components.PageHeader);
app.component('DeleteModal', components.DeleteModal);
app.component('DatePicker', components.DatePicker);
app.component('RadioButton', components.RadioButton);
app.component('MasterSlugForm', components.MasterSlugForm);
app.component('GetLibrary', components.GetLibrary);

// Mount the app
app.mount('#app');