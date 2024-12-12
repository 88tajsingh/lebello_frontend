import { defineAsyncComponent } from 'vue';

export const Reset = defineAsyncComponent(() => import('@/components/frontend-components/Svg/ResetIcon.vue'));
export const Facebook = defineAsyncComponent(() => import('@/components/frontend-components/Svg/Facebook-Svg.vue'));
export const Close = defineAsyncComponent(() => import('@/components/frontend-components/Svg/Close-Svg.vue'));
export const Search = defineAsyncComponent(() => import('@/components/frontend-components/Svg/Search-Svg.vue'));
export const Menu = defineAsyncComponent(() => import('@/components/frontend-components/Svg/Menu-Svg.vue'));
export const Arrow = defineAsyncComponent(() => import('@/components/frontend-components/Svg/Arrow-Svg.vue'));
export const FullScreen = defineAsyncComponent(() => import('@/components/frontend-components/Svg/FullScreen.vue'));
export const Mail = defineAsyncComponent(() => import('@/components/frontend-components/Svg/mail.vue'));
export const Printer = defineAsyncComponent(() => import('@/components/frontend-components/Svg/Printer.vue'));
export const Houzz = defineAsyncComponent(() => import('@/components/frontend-components/Svg/Houzz.vue'));
export const Pinterest = defineAsyncComponent(() => import('@/components/frontend-components/Svg/Pinterest.vue'));
export const Twitter = defineAsyncComponent(() => import('@/components/frontend-components/Svg/Twitter.vue'));
export const Instagram = defineAsyncComponent(() => import('@/components/frontend-components/Svg/Instagram.vue'));

export default {
  Reset,
  Facebook,
  Close,
  Search,
  Menu,
  Arrow,
  FullScreen,
  Mail,
  Printer,
  Houzz,
  Pinterest,
  Twitter,
  Instagram,
};
