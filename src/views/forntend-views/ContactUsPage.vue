<template>
  <NavBar :absolute="true" />
  <!-- main image section -->
  <div class="relative overflow-hidden">
    <img class="object-cover w-screen h-screen"
      src="https://lebello.com/wp-content/uploads/2020/01/boston_morning.jpg" />
    <!-- down arrow -->
    <div class="absolute left-1/2 bottom-5 animate-bounce mx-auto">
      <div @click="scrollToTarget"
        class="text-5xl text-white font-sans hover:bg-[#0e0e0e89] bg-opacity-5 ease-in duration-300 px-3 py-1">
        <span href="#" class="transition  ease-out duration-1000	">
          <svg @click="scrollToTarget" width="24px" height="24px" viewBox="0 0 1024 1024" class="icon" version="1.1"
            xmlns="http://www.w3.org/2000/svg" fill="#fafafa" stroke="#fafafa" stroke-width="73.728">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#ffffff"></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
    <!-- lebellow icon right top -->
    <div class="absolute top-24 right-0 mx-auto">
      <img src="https://lebello.com/wp-content/themes/lebello-ep/images/logo2.png" />
    </div>
    <!-- menu item -->
    <div class="absolute top-64 right-0 pr-3 h-96 z-50" ref="closeMenu">
      <v-card id="mySidenav" :dark="active" @click="active = true"
        :class="{ 'w-[230px] right-[0px]  z-50': isOpen, 'w-[230px] right-[-270px]': !isOpen }"
        class="sidenav bg-white z-50 h-full absolute top-0 right-0 transition-all duration-500 overflow-x-hidden">
        <div class="flex border border-gray-400 items-center">
          <div class="sticky top-3 p-4 border-r mr-4 border-gray-400 bg-transparent">
            <MenuSvg size="15px" fillColor="black" />
          </div>
          <div class="h-auto">
            <h3 class="text-[14px] font-medium">
              <a href="https://www.lebello.com/listItem/"
                class="uppercase text-graphikMedium text-[14px] text-textColorBlack">Comapny</a>
            </h3>
          </div>
        </div>
        <div id="" class="text-black">
          <div v-for="(item, index) in items" :key="index" class="border-0" :class="{
            'rounded-t-lg': index === 0,
            'rounded-b-lg': index === items.length - 1,
          }">
            <h2 :id="'heading' + index" class="mb-0">
              <button @click="toggleAccordion(index)" :aria-expanded="activeIndex === index"
                :aria-controls="'collapse' + index"
                class="group relative flex w-full items-center hover:text-blue border-0 px-5 py-2 text-left transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none"
                :class="{
                  ' text-primary shadow-border-b hover:text-blue dark:bg-surface-dark dark:text-primary dark:shadow-white/10':
                    activeIndex === index,
                }" type="button">
                {{ item.title }}
                <span class="-me-1 ms-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out" :class="{
                  'rotate-0': activeIndex !== index,
                  'rotate-[-180deg]': activeIndex === index,
                }">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="10px" height="10px" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div :id="'collapse' + index" v-show="activeIndex === index" class="pl-7 py-0"
              :aria-labelledby="'heading' + index" data-twe-collapse-item data-twe-parent="#accordionExample">
              <div v-if="item.subMenu">
                <ul class="">
                  <PerfectScrollbar class="max-h-52">

                    <li class="hover:text-green  font-graphikLight text-[13px]" v-for="(sub, itemIndex) in item.subMenu"
                      :key="itemIndex">
                      <a href="#" class="font-graphikLight text-[13px]">{{
                        sub.name
                      }}</a>
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
    <!-- text details box  -->
    <div class="absolute bottom-9 p-1  text-white w-full  h-auto">
      <div class=" flex justify-between p-20 ">
        <div class="bg-darkTrasparent p-4 w-80 h-auto ">
          <h3 class="  text-[18px] uppercase">{{ data.location }}</h3>
          <div class=" text-[15px] font-light ">
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
        <div class="bg-darkTrasparent  p-2 py-4">
          <div class="w-64">
            <ul class="grid grid-cols-3  ">
              <li class="col-span-1  m-auto mb-2 ">
                <svg fill="#ffffff" width="45px" height="45px" viewBox="0 0 32.00 32.00" id="Outlined"
                  xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00032">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>Outlined Circle</title>
                    <g id="Fill">
                      <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z">
                      </path>
                      <path d="M17,7H15v8.52a2,2,0,0,0,.75,1.56l4.63,3.7,1.24-1.56L17,15.52Z">
                      </path>
                    </g>
                  </g>
                </svg>
              </li>
              <li class="col-span-2 pb-2 text-[18px]">
                <span>Local Information</span>
                <p class=" font-light text-[15px] ">{{ data.currentTime }} Boston</p>
              </li>
              <li class="col-span-1 mx-auto">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="64px" height="64px" viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve"
                  fill="#ffffff" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#ffffff">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="Base" display="none"> </g>
                    <g id="Dibujo">
                      <g>
                        <path
                          d="M72.556,42.187C73.501,40.271,74,38.166,74,36c0-7.72-6.28-14-14-14c-4.601,0-8.895,2.281-11.496,6.021 C48.336,28.016,48.17,28,48.001,28c-7.664,0-14.219,5.012-16.311,12.184C31.113,40.079,30.508,40,30.001,40 c-6.066,0-11,4.935-11,11s4.934,11,11,11h36c6.065,0,11-4.935,11-11C77.001,47.392,75.247,44.194,72.556,42.187z M60,26 c5.514,0,10,4.486,10,10c0,1.548-0.36,3.05-1.036,4.417C68.019,40.152,67.028,40,66.001,40c-0.508,0-1.112,0.079-1.69,0.184 c-1.608-5.511-5.854-9.735-11.21-11.401C54.939,27.03,57.397,26,60,26z M66.001,58h-36c-3.859,0-7-3.141-7-7s3.141-7,7-7 c0.277,0,0.723,0.068,1.193,0.162V46c0,1.104,0.896,2,2,2c1.104,0,2-0.896,2-2v-3.219C36.267,36.528,41.63,32,48.001,32 c6.372,0,11.736,4.53,12.807,10.786V46c0,1.104,0.896,2,2,2s2-0.896,2-2v-1.837C65.279,44.069,65.727,44,66.001,44 c3.859,0,7,3.141,7,7S69.86,58,66.001,58z">
                        </path>
                        <path
                          d="M60,18c1.104,0,2-0.896,2-2v-4c0-1.104-0.896-2-2-2c-1.105,0-2,0.896-2,2v4C58,17.104,58.895,18,60,18z">
                        </path>
                        <path d="M84,34h-4c-1.105,0-2,0.896-2,2s0.895,2,2,2h4c1.104,0,2-0.896,2-2S85.104,34,84,34z">
                        </path>
                        <path
                          d="M74.143,23.857c0.512,0,1.023-0.195,1.414-0.586l2.828-2.828c0.781-0.781,0.781-2.047,0-2.828 c-0.781-0.781-2.047-0.781-2.828,0l-2.828,2.828c-0.781,0.781-0.781,2.047,0,2.828C73.119,23.662,73.631,23.857,74.143,23.857z">
                        </path>
                        <path
                          d="M44.443,23.271c0.391,0.391,0.902,0.586,1.414,0.586c0.512,0,1.023-0.195,1.414-0.586c0.781-0.781,0.781-2.047,0-2.828 l-2.828-2.828c-0.781-0.781-2.047-0.781-2.828,0c-0.781,0.781-0.781,2.047,0,2.828L44.443,23.271z">
                        </path>
                      </g>
                    </g>
                  </g>
                </svg>
                <img :src="weatherIcon" :alt="weatherDescription">
              </li>
              <li class="col-span-2 text-semibold  text-[18px] ">
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
    <div class="absolute bottom-12 left-20 text-white font-light text-[40px] opacity-80 font-GraphikLight">
      Boston</div>
  </div>
  <div class="py-5 px-20" id="sideText1">
    <BreadcrumbSection :breadcrumbData="breadcrumbData" seprate="/" />
  </div>
  <!-- text and map section -->
  <div class="flex w-full overflow-hidden m-auto bg-[#f3f3f3]  font-GraphikLight ">
    <div class="w-1/2  pl-14 ">
      <div class="flex w-full flex-col ">
        <div class="w-full   p-6 rounded-lg">
          <h2 class=" mb-2 text-[27px] font-graphikLight text-textColorBlack ">Agent Information</h2>
          <div class="text-blue text-[18px] font-normal pb-4">Perigold, Boston</div>
          <img class="pb-4" src="https://lebello.com/wp-content/uploads/2020/01/Logo_Perigold.png">
          <div class="font-graphikLight w-full text-textColorBlack">
            <p class="font-graphikLight w-full text-Black666">Please contact Perigold <br> for residential sales
              enquires
              in Boston and NE Customers.<br>
              <br>
              Tel : <a href="tel:+18447560804" class="text-blue-500">+1 844 756-0804</a><br>
              Fax: <a href="tel:+16173914669" class="text-blue-500">+1 617 391-4669</a><br>
              Website: <a href="https://www.perigold.com/" target="_blank" class="text-blue-500">www.perigold.com</a>
            </p>
          </div>
          <div class=" uppercase  font-graphikMedium hover:text-green hover:no-underline mt-5 text-[13px]">
            <a href="https://maps.google.com/?q=42.351230,-71.067570" target="_blank">Send Directions to
              your phone <i class="fa fa-angle-right ml-3 "></i></a>
          </div>

          <div class="social-call mt-4 ">
            <a href="mailto:ProductInfo@wayfair.com"
              class="bg-green text-white py-3 px-3 uppercase text-[13px] rounded-full mr-2 font-graphikLight">Send
              email</a>
            <a href="tel:+18447560804"
              class="bg-green text-white py-3 px-4 uppercase text-[13px] rounded-full font-graphikLight ">Call</a>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1/2  ">
      <div class="google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755342.9117362631!2d-72.15293861816771!3d42.30929052085871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3652d0d3d311b%3A0x787cbf240162e8a0!2sBoston%2C%20MA%2C%20USA!5e0!3m2!1sen!2sin!4v1714653422618!5m2!1sen!2sin"
          width="700" height="470" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </div>
  <!-- logo section -->
  <LogoSection />
  <!-- footer -->
  <Footer />
</template>


<script setup>
import NavBar from "@/components/frontend-components/Nav-bar.vue";
import BreadcrumbSection from "@/components/frontend-components/BreadcrumbSection.vue";
import LogoSection from "@/components/frontend-components/Logo-section.vue";
import Footer from "@/components/frontend-components/Footer-section.vue";
import { ref } from 'vue'
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

const scrollToTarget = () => {
  const targetDiv = document.getElementById('sideText1');
  const startPosition = window.pageYOffset;
  const targetPosition = targetDiv.getBoundingClientRect().top + window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000; // Duration of the scroll in milliseconds
  let startTime = null;

  const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed / duration) * distance + startPosition;
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      window.scrollTo(0, targetPosition);
    }
  };

  requestAnimationFrame(animateScroll);
}

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