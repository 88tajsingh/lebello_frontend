<template>
  <div class="mb-5">
    <NavBar :absolute="false" />
  </div>
  <div class="relative ">

    <div class="absolute  top-30 right-0 pr-3 self-center " ref="closeMenu2">
      <SideMenu key="firstKey" :list="list" :handleSideMenu="handleSideMenu2" :isOpen="isOpenSidebarSlider2"
        :mainSlider="false" :showDropDown="false" :showHeading="false" :downDropdown="true" />
    </div>
  </div>
  <div class="mx-20 mt-2">
    <div class="">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755342.9117362631!2d-72.15293861816771!3d42.30929052085871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3652d0d3d311b%3A0x787cbf240162e8a0!2sBoston%2C%20MA%2C%20USA!5e0!3m2!1sen!2sin!4v1714653422618!5m2!1sen!2sin"
        width="1100" height="450" style="border:0;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
      <div class="mt-7 mb-5 ">
        <h2 class="font-graphikLight text-[27px] text-textColorBlack capitalize">Contact Us</h2>
        <hr />
      </div>
      <div v-for="group in dealersDetails" :key="group.heading">
        <h3 class="territory my-heading text-[20px] text-graphik font-normal text-[#3d3d3d] mb-2">{{ group.heading }}
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <DealerCard v-for="dealer in group.dealers" :key="dealer.name" :dealer="dealer" />
        </div>
      </div>
    </div>
  </div>
  <LogoSection/>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
import LogoSection from "@/components/frontend-components/Logo-section.vue";
import Footer from "@/components/frontend-components/Footer-section.vue";
import NavBar from "@/components/frontend-components/Nav-bar.vue";
import SideMenu from "@/components/frontend-components/Side-Menu.vue";
import DealerCard from '@/components/frontend-components/DealersCard.vue'
import { onClickOutside } from "@vueuse/core";

const closeMenu2 = ref(null);
const isOpenSidebarSlider2 = ref(null);
const handleSideMenu2 = () => {
  isOpenSidebarSlider2.value = true;
};
const closeSideMenu2 = () => {
  isOpenSidebarSlider2.value = false;
};
onClickOutside(closeMenu2, closeSideMenu2);

const dealersDetails = ref([
  {
    heading: '',
    dealers: [
      {
        name: "Lebello USA",
        location: "United States",
        address: "Po Box 229, Rancho Santa Fe, CA 92067",
        phone: "+1 310 878 4578",
        fax: "+1 530 309 4286",
        link: "contactUs",
        imgSrc: "https://lebello.com/wp-content/uploads/2013/10/lebello_us-morning.jpg",
      },
    ],
  },
  {
    heading: 'United States',
    dealers: [
      {
        name: "Perigold",
        location: "Boston",
        address: "4 Copley Place, Floor 7, Boston, MA 02116",
        phone: "+1 844 756-0804",
        fax: "+1 617 391-4669",
        link: "contactUs",
        imgSrc: "https://lebello.com/wp-content/uploads/2020/01/boston_morning.jpg",
      },
      {
        name: "LEBELLO USA",
        location: "Los Angeles",
        address: "Po Box 229, Rancho Santa Fe, CA 92067",
        phone: "+1 310 878 4578",
        fax: "+1 530 309 4286",
        link: "contactUs",
        imgSrc: "https://lebello.com/wp-content/uploads/2013/10/lebello-us-night.jpg",
      },
    ],
  },
  {
    heading: 'International Dealers',
    dealers: [
      {
        name: "Design Nation",
        location: "Australia, Brisbane",
        address: "47 McLachlan Street, Fortitude Valley, QLD 4006",
        phone: "+61 07 3254 3700",
        link: "contactUs",
        imgSrc: "https://lebello.com/wp-content/uploads/2013/09/Brisbane-icon.jpg",
      },
      {
        name: "Design Nation",
        location: "Australia, Melbourne",
        address: "77 Cromwell Street, Collingwood, VIC 3066",
        phone: "+61 03 9411 0011",
        link: "contactUs",
        imgSrc: "https://lebello.com/wp-content/uploads/2013/09/Melbourne-icon.jpg",
      },
      {
        name: "Design Nation",
        location: "Australia, Sydney",
        address: "82 George Street, Redfern, NSW 2016",
        phone: "+61 02 9699 8577",
        link: "contactUs",
        imgSrc: "https://lebello.com/wp-content/uploads/2013/09/Sydney-icon.jpg",
      },
      {
        name: "Design Nation",
        location: "Australia, Brisbane",
        address: "47 McLachlan Street, Fortitude Valley, QLD 4006",
        phone: "+61 07 3254 3700",
        link: "contactUs",
        imgSrc: "https://lebello.com/wp-content/uploads/2013/09/Brisbane-icon.jpg",
      },
      {
        name: "Design Nation",
        location: "Australia, Melbourne",
        address: "77 Cromwell Street, Collingwood, VIC 3066",
        phone: "+61 03 9411 0011",
        link: "contactUs",
        imgSrc: "https://lebello.com/wp-content/uploads/2013/09/Melbourne-icon.jpg",
      },
      {
        name: "Design Nation",
        location: "Australia, Sydney",
        address: "82 George Street, Redfern, NSW 2016",
        phone: "+61 02 9699 8577",
        link: "contactUs",
        imgSrc: "https://lebello.com/wp-content/uploads/2013/09/Sydney-icon.jpg",
      },
    ],
  },
])

</script>