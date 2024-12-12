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
// import Loader from '@/components/Admin-components/Loader.vue';

// Lazy load components
const components = {
  Loader: defineAsyncComponent(() => import('@/components/Admin-components/Loader.vue')),
  Button: defineAsyncComponent(() => import('@/components/Admin-components/Buttons/Button.vue')),
  Select: defineAsyncComponent(() => import('@/components/Admin-components/form-components/Select.vue')),
  InputError: defineAsyncComponent(() => import('@/components/Admin-components/form-components/InputError.vue')),
  InputLabel: defineAsyncComponent(() => import('@/components/Admin-components/form-components/InputLabel.vue')),
  DomainComponent: defineAsyncComponent(() => import('@/components/Admin-components/form-components/DomainComponent.vue')),
  EditSvg: defineAsyncComponent(() => import('@/components/Admin-components/svg/EditSvg.vue')),
  CompareSvg: defineAsyncComponent(() => import('@/components/Admin-components/svg/CompareSvg.vue')),
  DeleteSvg: defineAsyncComponent(() => import('@/components/Admin-components/svg/DeleteSvg.vue')),
  ColorInput: defineAsyncComponent(() => import('@/components/Admin-components/form-components/ColorInput.vue')),
  TextInput: defineAsyncComponent(() => import('@/components/Admin-components/form-components/TextInput.vue')),
  Checkbox: defineAsyncComponent(() => import('@/components/Admin-components/form-components/CheckBox.vue')),
  PopupModal: defineAsyncComponent(() => import('@/components/Admin-components/Modals/PopupModal.vue')),
  SingleCheck: defineAsyncComponent(() => import('@/components/Admin-components/form-components/SingleCheck.vue')),
  PageHeader: defineAsyncComponent(() => import('@/components/Admin-components/PageHeader.vue')),
  DeleteModal: defineAsyncComponent(() => import('@/components/Admin-components/Modals/DeleteModal.vue')),
  DatePicker: defineAsyncComponent(() => import('@/components/Admin-components/form-components/DatePicker.vue')),
  RadioButton: defineAsyncComponent(() => import('@/components/Admin-components/form-components/RadioButton.vue')),
  MasterSlugForm: defineAsyncComponent(() => import('@/components/Admin-components/MasterSlugForm.vue')),
  GetLibrary: defineAsyncComponent(() => import('@/views/Admin/Media-section/MediaSection.vue')),
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