import { defineAsyncComponent } from 'vue';

export default {
  Reset: defineAsyncComponent(() => import('./ResetIcon.vue')),
  Facebook: defineAsyncComponent(() => import('./Facebook-Svg.vue')),
  Close: defineAsyncComponent(() => import('./Close-Svg.vue')),
  Search: defineAsyncComponent(() => import('./Search-Svg.vue')),
  Menu: defineAsyncComponent(() => import('./Menu-Svg.vue')),
  Arrow: defineAsyncComponent(() => import('./Arrow-Svg.vue')),
  FullScreen: defineAsyncComponent(() => import('./FullScreen.vue')),
};
