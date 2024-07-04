import './assets/main.css'
import './assets/css/satoshi.css'
import './assets/css/style.css'
import "@bhplugin/vue3-datatable/dist/style.css";
import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import store from "./store";
import HelpersPlugin from './helper/helperPlugin';
import apiPlugin from './helper/apiPlugin';
import EditSvg  from '@/components/Admin-components/svg/EditSvg.vue'
import DeleteSvg  from '@/components/Admin-components/svg/DeleteSvg.vue'
import Loader from '@/components/Admin-components/Loader.vue';
import {Tabs, Tab} from 'vue3-tabs-component';
import TextInput from '@/components/Admin-components/form-components/TextInput.vue'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Checkbox from '@/components/Admin-components/form-components/CheckBox.vue';

const app = createApp(App)
app.component('RouterLink', router.options.history.routerLink);
app.component('Loader', Loader);
app.component('TextInput', TextInput);
app.component('Button', Button);
app.component('Checkbox', Checkbox);
app.component('EditSvg', EditSvg);
app.component('DeleteSvg', DeleteSvg);
app.use(router)
.use(store)
.use(createPinia())
app.use(VueApexCharts)
app.use(apiPlugin)
app.use(HelpersPlugin)
app.mount('#app')
