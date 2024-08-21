import './assets/main.css'
import './assets/css/satoshi.css'
import './assets/css/style.css'
import "@bhplugin/vue3-datatable/dist/style.css";
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import store from "./store";
import HelpersPlugin from './helper/helperPlugin';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import InputError from './components/Admin-components/form-components/InputError.vue';
import InputLabel from './components/Admin-components/form-components/InputLabel.vue';
import apiPlugin from './helper/apiPlugin';
import DomainComponent  from '@/components/Admin-components/form-components/DomainComponent.vue'
import EditSvg  from '@/components/Admin-components/svg/EditSvg.vue'
import DeleteSvg  from '@/components/Admin-components/svg/DeleteSvg.vue'
import Loader from '@/components/Admin-components/Loader.vue';
import {Tabs, Tab} from 'vue3-tabs-component';
import MasterSlugForm from './components/Admin-components/MasterSlugForm.vue';
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import ColorInput from '@/components/Admin-components/form-components/ColorInput.vue'
import TextInput from '@/components/Admin-components/form-components/TextInput.vue'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Checkbox from '@/components/Admin-components/form-components/CheckBox.vue';
import PopupModal from '@/components/Admin-components/Modals/PopupModal.vue'
import Select from '@/components/Admin-components/form-components/Select.vue'
import SingleCheck from '@/components/Admin-components/form-components/SingleCheck.vue';
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import DeleteModal from './components/Admin-components/Modals/DeleteModal.vue';
import DatePicker from  '@/components/Admin-components/form-components/DatePicker.vue'
import RadioButton from '@/components/Admin-components/form-components/RadioButton.vue';
import Toast from 'vue-toastification';
import _ from 'lodash';
import 'vue-toastification/dist/index.css';

const options = {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    draggable: true,
    draggablePercent: 0.6,
    transition: "Vue-Toastification__bounce",
    containerClassName: "my-toast-container",
    toastClassName: "my-toast",
    hideProgressBar: false,
    closeButton: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true
  };

const app = createApp(App)
app.use(apiPlugin)
app.use(HelpersPlugin)
app.use(Toast, options);
app.use(router)
app.use(ToastPlugin)
.use(store)
.use(createPinia())
.component('Tabs', Tabs)
.component('Tab', Tab)
app.use(VueApexCharts)
app.component('Loader', Loader);
app.component('Button', Button);
app.component('Select', Select);
app.component('EditSvg', EditSvg);
app.component('Checkbox', Checkbox);
app.component('DeleteSvg', DeleteSvg);
app.component('ColorPicker', ColorInput);
app.component('MasterSlugForm', MasterSlugForm);
app.component('TextInput', TextInput);
app.component('PopupModal', PopupModal);
app.component('DatePicker', DatePicker);
app.component('PageHeader', PageHeader);
app.component('InputError', InputError);
app.component('GetLibrary', GetLibrary);
app.component('InputLabel', InputLabel);
app.config.globalProperties.$lodash = _;
app.component('DeleteModal', DeleteModal);
app.component('RadioButton', RadioButton);
app.component('SingleCheck', SingleCheck);
app.component('DomainComponent', DomainComponent);
app.component('RouterLink', router.options.history.routerLink);
app.mount('#app')
