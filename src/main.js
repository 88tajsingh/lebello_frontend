import './assets/main.css';
import './assets/css/satoshi.css';
import './assets/css/style.css';
import '@bhplugin/vue3-datatable/dist/style.css';
import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import store from './store';
import HelpersPlugin from './helper/helperPlugin';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Lazy load components
const Loader = defineAsyncComponent(() => import('@/components/Admin-components/Loader.vue'));
const Button = defineAsyncComponent(() => import('@/components/Admin-components/Buttons/Button.vue'));
const Select = defineAsyncComponent(() => import('@/components/Admin-components/form-components/Select.vue'));
const InputError = defineAsyncComponent(() => import('@/components/Admin-components/form-components/InputError.vue'));
const InputLabel = defineAsyncComponent(() => import('@/components/Admin-components/form-components/InputLabel.vue'));
const DomainComponent = defineAsyncComponent(() => import('@/components/Admin-components/form-components/DomainComponent.vue'));
const EditSvg = defineAsyncComponent(() => import('@/components/Admin-components/svg/EditSvg.vue'));
const DeleteSvg = defineAsyncComponent(() => import('@/components/Admin-components/svg/DeleteSvg.vue'));
const ColorInput = defineAsyncComponent(() => import('@/components/Admin-components/form-components/ColorInput.vue'));
const TextInput = defineAsyncComponent(() => import('@/components/Admin-components/form-components/TextInput.vue'));
const Checkbox = defineAsyncComponent(() => import('@/components/Admin-components/form-components/CheckBox.vue'));
const PopupModal = defineAsyncComponent(() => import('@/components/Admin-components/Modals/PopupModal.vue'));
const SingleCheck = defineAsyncComponent(() => import('@/components/Admin-components/form-components/SingleCheck.vue'));
const PageHeader = defineAsyncComponent(() => import('@/components/Admin-components/PageHeader.vue'));
const DeleteModal = defineAsyncComponent(() => import('@/components/Admin-components/Modals/DeleteModal.vue'));
const DatePicker = defineAsyncComponent(() => import('@/components/Admin-components/form-components/DatePicker.vue'));
const RadioButton = defineAsyncComponent(() => import('@/components/Admin-components/form-components/RadioButton.vue'));
const MasterSlugForm = defineAsyncComponent(() => import('@/components/Admin-components/MasterSlugForm.vue'));
const GetLibrary = () => import('@/views/Admin/Media-section/MediaSection.vue');

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
  pauseOnFocusLoss: true
};

// Create Vue app
const app = createApp(App);
app.use(HelpersPlugin);
app.use(Toast, toastOptions);
app.use(router);
app.use(store).use(createPinia());

// Register components
app.component('Loader', Loader);
app.component('Button', Button);
app.component('Select', Select);
app.component('InputError', InputError);
app.component('InputLabel', InputLabel);
app.component('DomainComponent', DomainComponent);
app.component('EditSvg', EditSvg);
app.component('DeleteSvg', DeleteSvg);
app.component('ColorPicker', ColorInput);
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
app.component('RouterLink', router.options.history.routerLink);

// Mount the app
app.mount('#app');