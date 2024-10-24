<template>
  <NavBar :absolute="true" />
  <div class="relative overflow-hidden">
    <div class="relative">
  <img class="object-cover w-screen h-screen"
       src="https://lebello.com/wp-content/uploads/2020/01/boston_morning.jpg" />
  <div class="absolute bottom-9 left-1/2 transform -translate-x-1/2 lg:translate-x-0 lg:left-20  text-white font-light text-[40px] opacity-80 font-GraphikLight">
    Boston
  </div>
</div>

    <div class="hidden  lg:block absolute left-1/2 bottom-5 animate-bounce mx-auto">
      <div @click="()=>scrollDown('sideText1')"
        class="text-5xl text-white font-sans hover:bg-[#0e0e0e89] bg-opacity-5 ease-in duration-300 px-3 py-1">
        <span class="transition ease-out duration-1000">
          <svg width="24px" height="24px" viewBox="0 0 1024 1024" class="icon" xmlns="http://www.w3.org/2000/svg" fill="#fafafa" stroke="#fafafa" stroke-width="73.728">
            <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#ffffff"></path>
          </svg>
        </span>
      </div>
    </div>
    <div class="absolute top-24 right-0 mx-auto">
      <img src="https://lebello.com/wp-content/themes/lebello-ep/images/logo2.png" />
    </div>
    
    <div class="absolute top-64 right-0 pr-3 h-96 z-50" ref="closeMenu">
      <v-card id="mySidenav" :dark="active" @click="active = true"
        :class="{ 'w-[230px] right-0 z-50': isOpen, 'w-[230px] right-[-270px]': !isOpen }"
        class="sidenav bg-white z-50 h-full absolute top-0 transition-all duration-500 overflow-x-hidden">
        <div class="flex border border-gray-400 items-center">
          <div class="sticky top-3 p-4 border-r mr-4 border-gray-400">
            <MenuSvg size="15px" fillColor="black" />
          </div>
          <div>
            <h3 class="text-[14px] font-medium">
              <a href="https://www.lebello.com/listItem/" class="uppercase text-graphikMedium text-textColorBlack">Company</a>
            </h3>
          </div>
        </div>
        <div class="text-black">
          <div v-for="(item, index) in items" :key="index" class="border-0" :class="{'rounded-t-lg': index === 0, 'rounded-b-lg': index === items.length - 1}">
            <h2 :id="'heading' + index" class="mb-0">
              <button @click="toggleAccordion(index)" :aria-expanded="activeIndex === index"
                :aria-controls="'collapse' + index"
                class="group relative flex w-full items-center hover:text-blue border-0 px-5 py-2 text-left transition hover:z-[2] focus:z-[3] focus:outline-none"
                :class="{'text-primary shadow-border-b hover:text-blue dark:bg-surface-dark dark:text-primary dark:shadow-white/10': activeIndex === index}"
                type="button">
                {{ item.title }}
                <span class="-me-1 ms-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out" :class="{'rotate-0': activeIndex !== index, 'rotate-[-180deg]': activeIndex === index}">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="10px" height="10px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div :id="'collapse' + index" v-show="activeIndex === index" class="pl-7 py-0" :aria-labelledby="'heading' + index" data-twe-collapse-item data-twe-parent="#accordionExample">
              <div v-if="item.subMenu">
                <ul class="">
                  <PerfectScrollbar class="max-h-52">
                    <li class="hover:text-green font-graphikLight text-[13px]" v-for="(sub, itemIndex) in item.subMenu" :key="itemIndex">
                      <a href="#" class="font-graphikLight text-[13px]">{{ sub.name }}</a>
                    </li>
                  </PerfectScrollbar>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </v-card>
      <span v-if="!active" @click="openNav" class="text-9xl text-white">
        <MenuSvg size="30px" />
      </span>
    </div>
    <div class="lg:absolute bottom-10 p-5 lg:p-20 text-white w-full h-auto">
      <div class="lg:flex justify-between">
        <div class="bg-darkTrasparent p-4 lg:w-80 mb-4 lg:mb-0">
          <h3 class="text-[18px] uppercase">{{ data.location }}</h3>
          <div class="text-[15px] font-light">
            <p>
              <span class="decoration-2">{{ data.companyName }}</span><br>
              <span>{{ data.address }}</span><br>
              <span>{{ data.city }}, {{ data.state }} {{ data.zip }}</span><br>
              <span>{{ data.phone1 }}</span><br>
              <span>{{ data.phone2 }}</span><br>
              <a :href="'mailto:' + email" target="_blank">{{ data.email }}</a>
            </p>
          </div>
        </div>
        <div class="bg-darkTrasparent p-2 py-4">
          <div class="w-64">
            <ul class="grid grid-cols-3">
              <li class="col-span-1 m-auto mb-2">
                <svg fill="#ffffff" width="45px" height="45px" viewBox="0 0 32.00 32.00" id="Outlined" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"></path>
                    <path d="M17,7H15v8.52a2,2,0,0,0,.75,1.56l4.63,3.7,1.24-1.56L17,15.52Z"></path>
                  </g>
                </svg>
              </li>
              <li class="col-span-2 pb-2 text-[18px]">
                <span>Local Information</span>
                <p class="font-light text-[15px]">{{ data.currentTime }} Boston</p>
              </li>
              <li class="col-span-1 mx-auto">
                <img :src="weatherIcon" :alt="weatherDescription" />
              </li>
              <li class="col-span-2 text-semibold text-[18px]">
                <span>Current Weather</span>
                <p class="font-light text-[15px] pt-1">
                  Thursday<br>
                  Min {{ data.minTemperature }}°C - Max {{ data.maxTemperature }}°C <br />
                  Humidity: {{ data.humidity }}%<br>
                  Wind: {{ data.windSpeed }} km/h
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-5 px-20" id="sideText1">
    <BreadcrumbSection :breadcrumbData="breadcrumbData" seprate="/" />
  </div>
  <div class="flex w-full overflow-hidden m-auto bg-[#f3f3f3] font-GraphikLight justify-center">
  <div class="p-5 md:w-1/2 md:pl-14">
    <div class="flex flex-col w-full">
      <div class="  md:p-6 rounded-lg">
        <h2 class="mb-2 text-[27px] font-graphikLight text-textColorBlack">Agent Information</h2>
        <div class="text-blue text-[18px] font-normal pb-4">Perigold, Boston</div>
        <img class="pb-4" src="https://lebello.com/wp-content/uploads/2020/01/Logo_Perigold.png" alt="Perigold Logo">

        <p class="text-textColorBlack">
          Please contact Perigold <br> for residential sales enquiries in Boston and NE Customers.<br><br>
          Tel: <a href="tel:+18447560804" class="text-blue-500">+1 844 756-0804</a><br>
          Fax: <a href="tel:+16173914669" class="text-blue-500">+1 617 391-4669</a><br>
          Website: <a href="https://www.perigold.com/" target="_blank" class="text-blue-500">www.perigold.com</a>
        </p>

        <div class="mt-5 text-[13px] font-graphikMedium uppercase hover:text-green">
          <a href="https://maps.google.com/?q=42.351230,-71.067570" target="_blank">Send Directions to your phone <i class="fa fa-angle-right ml-3"></i></a>
        </div>

        <div class="social-call mt-4">
          <a href="mailto:ProductInfo@wayfair.com" class="bg-green text-white py-3 px-3 uppercase text-[13px] rounded-full mr-2">Send email</a>
          <a href="tel:+18447560804" class="bg-green text-white py-3 px-4 uppercase text-[13px] rounded-full">Call</a>
        </div>
      </div>
    </div>
  </div>

  <div class="w-1/2 hidden md:block">
    <div class="google-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755342.9117362631!2d-72.15293861816771!3d42.30929052085871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3652d0d3d311b%3A0x787cbf240162e8a0!2sBoston%2C%20MA%2C%20USA!5e0!3m2!1sen!2sin!4v1714653422618!5m2!1sen!2sin"
        width="700" height="470" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</div>

  <LogoSection/>
  <Footer />
</template>


<script setup>
import NavBar from "@/components/frontend-components/Nav-bar.vue";
import BreadcrumbSection from "@/components/frontend-components/BreadcrumbSection.vue";
import LogoSection from "@/components/frontend-components/Logo-section.vue";
import Footer from "@/components/frontend-components/Footer-section.vue";
import { ref } from 'vue'
import { scrollDown } from "@/helper/frontendHelpers";
import MenuSvg from '@/components/frontend-components/Svg/Menu-Svg.vue';
import { onClickOutside } from '@vueuse/core'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/style.css';

const data = {
  location: "United States",
  companyName: "Perigold",
  address: "4 Copley Place, Floor 7",
  city: "Boston",
  state: "MA",
  zip: "02116",
  phone1: "+1 844 756-0804",
  phone2: "+1 617 391-4669",
  email: "ProductInfo@wayfair.com",
  currentTime: '02:07 AM',
  minTemperature: 6.75,
  maxTemperature: 10.06,
  weatherIcon: 'http://openweathermap.org/img/w/04n.png',
  weatherDescription: 'Clouds, overcast clouds',
  humidity: 84,
  windSpeed: 3.09
};


const breadcrumbData = ref([
  { name: 'Contract Design', link: '/' },
  { name: 'Hotels & Resorts', link: '/' },
]);

// side menu 
const closeMenu = ref(null)
const closeSideMenu = () => {
  isOpen.value = false;
  active.value = false;
};
onClickOutside(closeMenu, closeSideMenu);

const isOpen = ref(false)
const active = ref(false)

const openNav = () => {

  active.value = true
  isOpen.value = true
}

const activeIndex = ref(null);

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};


const items = ref([
  {
    title: "Residential",
    subMenu: [
      { name: "overview", url: "#" },
      { name: "Barneys New York CO-OP", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
      { name: "University of Queensland", url: "#" },
      { name: "Taylor Family Digital Library, University of Calgary", url: "#" },
    ],
  },
]);
</script>