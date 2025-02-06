<template>
  <footer class="main_footer">
    <div class="sm:m-0 md2:flex footer_container">
      <div id="app" class="xl:flex">
        <div class="footer_new_grid grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-4 w-full md:gap-6">
          <div class="menu_main_foot px-0 min-w-[400px]" v-for="(section, index) in sections" :key="index">
            <h3 class="mb-2 text-[16px] text-current font-graphikMedium">
              {{ section?.title }}
            </h3>
            <div class="text-sm">
              <p v-for="(item, i) in section?.items" :key="i"
                class="text-[14px] leading-6 text-current font-graphikLight" :class="{
                  'mt-8': item && item.text === 'Collection 24',
                }">
                <a v-if="item?.link" :href="item?.link" target="_blank">{{ item?.text }}</a>
                <span class="text-[14px] leading-6 text-current font-graphikLight" v-else>{{ item.text }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="right_news">
        <h3 class="mb-3 text-[15px] text-current font-graphikMedium">
          Newsletter Sign Up
        </h3>
        <div class="">
          <form
            action="https://lebello.us8.list-manage.com/subscribe/post?u=dd1c823536a67c191fdf3aa91&amp;id=17b118c684"
            method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate"
            target="_blank" novalidate="novalidate">
            <div id="mc_embed_signup_scroll">
              <div class="flex items-center sm:gap-4 md2:gap-5">
                <div class="w-3/3 md2:w-full">
                  <input type="email" value="" name="EMAIL" placeholder="Email Address" required=""
                    class="w-3/3 focus-visible:outline-none focus-visible:border-black focus-visible:ring-0 required email bg-transparent text-[14px] md:w-[240px]"
                    id="mce-EMAIL" aria-required="true" />
                </div>
                <div class="md2:w-full sm:w-1/4 ml-3">
                  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                    class="button border rounded-3xl border-current text-current uppercase text-[12px] py-2 px-5 font-graphikLight ring-0 focus:outline-none focus:ring-0 focus:border-0" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <span class="block mt-5 text-current font-graphikLight text-[14px]">© 2024 Lebello All rights
          reserved.<br />Ropetek®, Knittex®
          are trademarks of Lebello USA
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const sections = ref([
  {
    title: "Contact",
    items: [
      { text: " sales@lebello.com", link: "mailto:sales@lebello.com" },
      { text: "T +1 310 878 4578" },
      { text: "F +1 530 309 4286" },
    ],
  },
  {
    title: "Social",
    items: [
      { text: "FaceBook", link: "#/" },
      { text: "Instagram", link: "#/" },
      { text: "Pinterest", link: "#/" },
      { text: "Houzz", link: "#/" },
      { text: "Youtube", link: "#/" },
    ],
  },
  {
    title: "Sitemap",
    items: [
      { text: "Company" },
      { text: "Contact", link: "#/" },
      { text: "Find a Retailer", link: "#/" },
      { text: "Press", link: "#/" },
    ],
  },
  {
    title: " ",
    items: [
      { text: "Collection 24", link: "#/" },
      { text: "Library & Tools", link: "#/" },
      { text: "Materials", link: "#/" },
      { text: "Search" },
      { text: "Catalogue", link: "#/" },
    ],
  },
]);

const props = defineProps({
  extraClasses:{
    type: Array,
    default: () => ['text-black','bg-[#ddd7ce]'],  
  },
});
</script>

<style scoped>
.main_footer {
  background-color: #dad6cd;
  color: #514f4c;
  padding: 56px 0px;
}
.main_footer .footer_container {
  padding: 0px 124px;
}
.right_news input#mc-embedded-subscribe:hover {
  background: #ce8d39 !important;
  color: #fff !important;
  border: 1px solid #ce8d39 !important;
}
.right_news input#mc-embedded-subscribe {
  background: none !important;
  border: 1px solid #333333 !important;
  color: #333333 !important;
  transition: all 0.5s;
  cursor: pointer;
}

@media (max-width: 1879px) {
  .main_footer .footer_container {
    padding: 0px 94px;
  }
}

@media (max-width: 1699px) {
  .main_footer .footer_container {
    padding: 0px 82px;
  }
}

@media (max-width: 1199px) {
  .main_footer .footer_container{
    padding: 0px 52px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
}
.menu_main_foot {
  min-width: auto !important;
}
}

@media (max-width: 991px) {
  .main_footer .footer_container {
    padding: 0px 32px;
  }
}

@media(max-width:767px){
  .right_news {
    margin-top: 20px;
    row-gap: 0px;
}
.main_footer .footer_container{
  row-gap: 0px;
}
.main_footer p {
  margin-top: 0px !important;
}
.main_footer p {
  margin-top: 0px !important;
}
.footer_new_grid {
  row-gap: 0px !important;
}
.footer_new_grid .menu_main_foot {
  margin-bottom: 20px;
  min-width: auto !important;
}
.footer_new_grid .menu_main_foot:nth-child(3), .footer_new_grid .menu_main_foot:nth-child(4) {
  margin-bottom: 0px;
}
.footer_new_grid .menu_main_foot:nth-child(4) h3 {
  margin: 0px !important;
}
.main_footer {
  padding: 36px 0px;
}
}

@media (max-width: 574px) {
  .main_footer .footer_container {
    padding: 0px 22px;
  }
}
</style>
