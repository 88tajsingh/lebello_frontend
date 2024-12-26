<template>
  <div class="bg-[rgb(220,214,205)] font-graphikLight">
    <div class="bg-[rgb(220,214,205)]   sm:m-0 md2:flex md2:mx-12 max-w-[1400px]  xl:mx-auto">
      <div id="app" class=" xl:flex  mx-5">
        <div class="grid grid-cols-1 gap-5  sm:grid-cols-1 md:grid-cols-4  py-5  w-full md:gap-6 md2:py-12 ">
          <div class="px-1 min-w-[400px]" v-for="(section, index) in sections" :key="index">
            <h3 class="mb-2 text-[16px] text-textColorBlack font-graphikMedium">
              {{ section?.title }}
            </h3>
            <div class="text-sm">
              <p v-for="(item, i) in section?.items" :key="i"
                class="text-[14px] leading-6 text-textColorBlack font-graphikLight" :class="{
                  'mt-8':
                    item && item.text === 'Collection 24',
                }">
                <a v-if="item?.link" :href="item?.link" target="_blank">{{ item?.text }}</a>
                <span class="text-[14px] leading-6 text-textColorBlack font-graphikLight" v-else>{{ item.text }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="pb-10 ml-2 px-2 lg:px-1 m-auto md:ml-10">
        <h3 class="mb-3 text-[15px] text-textColorBlack font-graphikMedium">
          Newsletter Sign Up
        </h3>
        <div class="">
          <form
            action="https://lebello.us8.list-manage.com/subscribe/post?u=dd1c823536a67c191fdf3aa91&amp;id=17b118c684"
            method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate"
            target="_blank" novalidate="novalidate">
            <div id="mc_embed_signup_scroll">
              <div class="flex items-center  sm:gap-4 md2:gap-5 ">
                <div class="w-3/3 md2:w-full ">
                  <input type="email" value="" name="EMAIL" placeholder="Email Address" required=""
                    class="w-3/3 focus-visible:outline-none focus-visible:border-Black666 focus-visible:ring-0 required email bg-transparent text-[14px] md:w-[240px] "
                    id="mce-EMAIL" aria-required="true" />
                </div>
                <div class="md2:w-full sm:w-1/4 ml-3">
                  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                    class="button border rounded-3xl border-textColorBlack text-textColorBlack uppercase text-[12px] py-2 px-5 ont-graphikLight ring-0 focus:outline-none focus:ring-0 focus:border-0" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <span class="block mt-5 text-textColorBlack font-graphikLight text-[14px]">© 2024 Lebello All rights
          reserved.<br />Ropetek®, Knittex®
          are trademarks of Lebello USA
        </span>
      </div>
    </div>
  </div>
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
</script>
<style scoped></style>
