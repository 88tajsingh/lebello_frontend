<template>
  <div class=" bg-white   border-t-2 pb-10 border-[#f3f3f3]">
    <div class="grid">
      <div v-for="(faq, index) in faqs" :key="index" class="py-5 border-b-2 px-16 border-[#f3f3f3] ">
        <details class="group transition-all duration-500 ease-in ">
          <summary @click="toggleFAQ(index)"
            class="flex  justify-between  items-center text-[#64748b] font-graphik text-[23px] cursor-pointer list-none hover:text-green">
            <span class="text-2xl font-normal" :class="{ 'text-black ': faq?.open }">{{
              faq?.header
            }}</span>
            <span class=" transition-all duration-300 ease-in-out"
              :class="{ 'group-open:rotate-90 ': faq?.open, 'text-[#64748b] ': faq?.open }">
              <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"
                transform="rotate(-90)">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </summary>
          <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
            <div v-if="faq?.header === 'Specifications'" class="spec-section">
              <div class="grid grid-cols-1 font-graphik text-[14px] text-textColorBlack md:grid-cols-4 gap-4">
                <div v-for="(spe, spindex) in faq?.Specifications" class='pr-4' :key="spindex">
                  <p class="text-base font-graphik mt-5">{{ spe?.name }}</p>
                  <p>
                     <strong>{{ spe?.sku }}</strong>
                  </p>
                  <p>{{ spe?.frame }}</p>
                  <p>{{ spe?.dimension }}</p>
                  <p>{{ spe?.seatHeight }}</p>
                </div>
              </div>
            </div>
          </transition>
            <div>
              <ul class="flex  list-none flex-row flex-wrap mb-3" role="tablist" data-twe-nav-ref>
                <li v-for="(tab, tindex) in faq?.tabs" :key="tindex" role="presentation">
                  <a :href="'#' + tab?.id" :class="{
                    'mt-3 block  px-4 pt-3 text-[13px]  pb-4 uppercase leading-tight  hover:text-blue :text-primary': true,
                    'disabled pointer-events-none': tab?.disabled,
                    'text-green border-b border-green': activeTab === tab?.id
                  }" :data-twe-toggle="tab?.id" data-twe-nav-active role="tab" :aria-controls="tab?.id"
                    :aria-selected="tab?.active" @click.prevent="activateTab(tab, index)">{{ tab?.name }}</a>
                </li>
              </ul>

              <!--Tabs content-->
              <div class="mb-6">
                <div v-for="(tab, index) in faq?.tabs" :key="index" :class="{
                  hidden: !tab?.active,
                  'opacity-100 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block':
                    tab.active,
                  'opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block':
                    !tab?.active
                }" :id="tab?.id" role="tabpanel" :aria-labelledby="tab?.id + '-tab'" data-twe-tab-active>
                  <div v-if="Array.isArray(tab?.content)">
                  
                    <div v-if="tab?.active" class="container w-5/6">
                      <div class="grid grid-cols-5 justify-items-start ">
                        <div v-for="(itr, index) in tab?.content" :key="index" class="bg-white">
                          <div class="w-48 h-48 mx-auto mb-10">
                            <div class="w-full h-full relative overflow-hidden">
                              <img :src="itr?.imageSrc" alt="Material Image"
                                class="object-cover w-[185px] h-[185px] pr-2" />
                              <div class="text-center absolute bottom-1">
                                <p class=" p-[4px] px-[6px] font-graphik text-[14px] text-Black666 bg-[#ffffffc9]">
                                  {{ itr?.name }}
                                </p>
                              </div>
                            </div>
                            <p class="text-gray-600 font-graphik text-[13px] text-Black666">{{ itr?.code }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="typeof tab?.content === 'string'">
                    <p class="font-graphik text-[14px]  text-gray-600">
                      Our outdoor materials are made from HDPE - High Density Polyethylene synthetic
                      fibers. The material has a high UV and weather resistants. The fibers are
                      characterized by there durability and performance during temperature
                      fluctuations. Resistant to pool water, sea salt, and changes in climate with a
                      high tensile strength of &gt; 230 kg/cm2. Easy maintenance and free of toxins
                      that is 100% recyclable and friendly on the environment. Our products can be
                      left outside all year round and is able to withstand temperatures from -20°C to
                      +55°C. We offer two types of material sizes Round and Peel Fibers. Please refer
                      to the color chart to view the available product options. Fibers exceed ISO
                      4892-2 Compliance. Our Fibers are 100% recyclable and are non-toxic to the
                      environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref(0)

const faqs = ref([
  {
    header: 'Specifications',
    Specifications: [
      {
        name: '',
        sku: '',
        frame: 'About the 4L Arrow.',
        dimension: 'Please download the cut sheet for further information',
        seatHeight: ''
      },
      {
        name: '',
        sku: '',
        frame: '4L Arrow Cushions.',
        dimension: 'Cushions in G2 - G5 fabrics.',
        seatHeight: ''
      }
    ],
    open: false
  },
  {
    header: 'Lebello Fibers',
    tabs: [
      {
        active:true,
        id: 0,
        name: 'PEEL FIBERS',
        content: [
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Curacao',
            group: 'Peel Fibers',
            code: '550',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Curacao-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Violet',
            group: 'Peel Fibers',
            code: '515',
            imageSrc: 'http://lebello.com/wp-content/uploads/thumbs/515-violet-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Curacao',
            group: 'Peel Fibers',
            code: '550',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Curacao-peel-fibre-185x185-185X185.png'
          }
        ]
      },
      {
        id: 1,
        name: 'CORE FIBERS',
        content: [
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Curacao',
            group: 'Peel Fibers',
            code: '550',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Curacao-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Violet',
            group: 'Peel Fibers',
            code: '515',
            imageSrc: 'http://lebello.com/wp-content/uploads/thumbs/515-violet-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Curacao',
            group: 'Peel Fibers',
            code: '550',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Curacao-peel-fibre-185x185-185X185.png'
          }
        ]
      },
      { id: 2, name: 'DESCRIPTION', content: 'Tab 4 content' }
    ],
    open: false
  },
  {
    header: 'RopeTek®',
    tabs: [
      {
        active: true,
        id: '0',
        name: 'PEEL FIBERS',
        content: [
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Curacao',
            group: 'Peel Fibers',
            code: '550',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Curacao-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Violet',
            group: 'Peel Fibers',
            code: '515',
            imageSrc: 'http://lebello.com/wp-content/uploads/thumbs/515-violet-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Curacao',
            group: 'Peel Fibers',
            code: '550',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Curacao-peel-fibre-185x185-185X185.png'
          }
        ]
      },
      {
        id: '1',
        name: 'CORE FIBERS',
        content: [
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Curacao',
            group: 'Peel Fibers',
            code: '550',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Curacao-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Violet',
            group: 'Peel Fibers',
            code: '515',
            imageSrc: 'http://lebello.com/wp-content/uploads/thumbs/515-violet-185x185-185X185.png'
          },
          {
            name: 'Beige',
            group: 'Peel Fibers',
            code: '012',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Beige-peel-fibre-185x185-185X185.png'
          },
          {
            name: 'Curacao',
            group: 'Peel Fibers',
            code: '550',
            imageSrc:
              'http://lebello.com/wp-content/uploads/thumbs/Curacao-peel-fibre-185x185-185X185.png'
          }
        ]
      },
      { id: '2', name: 'DESCRIPTION', content: 'Tab 4 content' }
    ],
    open: false
  }
])
const beforeEnter = (el) => {
  el.style.height = '0';
};

const enter = (el) => {
  el.style.height = el.scrollHeight + 'px';
};

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + 'px';
};

const leave = (el) => {
  el.style.height = '0';
};


const activateTab = (tab, index) => {
  if (!tab.disabled) {
    activeTab.value = tab.id
    faqs.value[index]?.tabs.forEach((t) => {
      t.active = t.id === tab.id
    })
  }
}
const toggleFAQ = (index) => {
  faqs.value[index].open = !faqs.value[index].open
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: height .5s ease-in-out;
  overflow: hidden;
}

.fade-enter,
.fade-leave-to {
  height: 0;
}
</style>
