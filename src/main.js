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

// Lazy load components
const components = {
  Loader: () => import('@/components/Admin-components/Loader.vue'),
  Button: () => import('@/components/Admin-components/Buttons/Button.vue'),
  Select: () => import('@/components/Admin-components/form-components/Select.vue'),
  InputError: () => import('@/components/Admin-components/form-components/InputError.vue'),
  InputLabel: () => import('@/components/Admin-components/form-components/InputLabel.vue'),
  DomainComponent: () => import('@/components/Admin-components/form-components/DomainComponent.vue'),
  EditSvg: () => import('@/components/Admin-components/svg/EditSvg.vue'),
  CompareSvg: () => import('@/components/Admin-components/svg/CompareSvg.vue'),
  DeleteSvg: () => import('@/components/Admin-components/svg/DeleteSvg.vue'),
  ColorInput: () => import('@/components/Admin-components/form-components/ColorInput.vue'),
  TextInput: () => import('@/components/Admin-components/form-components/TextInput.vue'),
  Checkbox: () => import('@/components/Admin-components/form-components/CheckBox.vue'),
  PopupModal: () => import('@/components/Admin-components/Modals/PopupModal.vue'),
  SingleCheck: () => import('@/components/Admin-components/form-components/SingleCheck.vue'),
  PageHeader: () => import('@/components/Admin-components/PageHeader.vue'),
  DeleteModal: () => import('@/components/Admin-components/Modals/DeleteModal.vue'),
  DatePicker: () => import('@/components/Admin-components/form-components/DatePicker.vue'),
  RadioButton: () => import('@/components/Admin-components/form-components/RadioButton.vue'),
  MasterSlugForm: () => import('@/components/Admin-components/MasterSlugForm.vue'),
  GetLibrary: () => import('@/views/Admin/Media-section/MediaSection.vue'),
};

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
app.component('Loader', Loader);
app.component('Button', Button);
app.component('Select', Select);
app.component('InputError', InputError);
app.component('InputLabel', InputLabel);
app.component('DomainComponent', DomainComponent);
app.component('EditSvg', EditSvg);
app.component('CompareSvg', CompareSvg);
app.component('DeleteSvg', DeleteSvg);
app.component('ColorInput', ColorInput);
app.component('TextInput', TextInput);
app.component('Checkbox', Checkbox);
app.component('PopupModal', PopupModal);
app.component('SingleCheck', SingleCheck);
app.component('PageHeader', PageHeader);
app.component('DeleteModal', DeleteModal);
app.component('DatePicker', DatePicker);
app.component('RadioButton', RadioButton);
app.component('MasterSlugForm', MasterSlugForm);
app.component('GetLibrary', GetLibrary);

// Mount the app
app.mount('#app');