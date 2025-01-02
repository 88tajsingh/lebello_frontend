<template>
    <section class="prod-deta-main py-10 bg-[#e6e1db]">
        <div class="container mx-auto">
            <div class=" relative grid grid-cols-1 lg:grid-cols-12 gap-8">
                <!-- Left Column -->
                <div class=" border  min-h-[400px] lg:col-span-7 px-10 ">
                    <div class="text-black pl-7">
                        <nav class="border-b">
                            <div class="flex text-[16px] font-graphik">
                                <button v-for="tab in tabs" :key="tab.id"
                                    class="py-2 px-4 w-1/3 text-center font-medium" :class="{
                                        'bg-gray-100 border-b-2 border-yellow-600 text-yellow-600': activeTab === tab.id,
                                        'border-b-2 border-[#c5c0bc] text-gray-500': activeTab !== tab.id
                                    }" @click="activeTab = tab.id">
                                    {{ tab.label }}
                                </button>
                            </div>
                        </nav>
                        <div class="py-6">
                            <!-- Description Tab -->
                            <div v-show="activeTab === 'description'" class="text-sm">
                                <p class="font-MyriadPro text-[16px] leading-8">
                                    {{ product.description }}
                                </p>
                            </div>

                            <!-- Specifications Tab -->
                            <div v-show="activeTab === 'specifications'" class="text-black font-graphik text-[13px]">
                                <div class="flex space-x-4 mb-10">
                                    <img v-for="(image, index) in product.specificationImages" :key="index" :src="image"
                                        :alt="`Size ${index + 1}`" />
                                </div>
                                <div class="max-w-[200px] font-graphik font-semibold">
                                    <a v-for="link in product.specificationLinks" :key="link.text" :href="link.url"
                                        class="flex items-center justify-between mt-2">
                                        <span class="underline">{{ link.text }}</span>
                                        <Arrow size="10px" direction="left" :strokeWidth="22.5"
                                            fillColor="currentColor" />
                                    </a>
                                    <h6 class="text-yellow-600 mt-4 text-[17px]">{{ product.familyViewText }}</h6>
                                    <a :href="product.seriesLink.url" class="flex items-center justify-between mt-2">
                                        <span class="underline">{{ product.seriesLink.text }}</span>
                                        <Arrow size="10px" direction="left" :strokeWidth="22.5"
                                            fillColor="currentColor" />
                                    </a>
                                </div>
                            </div>

                            <!-- Inspirational Scene Tab -->
                            <div v-show="activeTab === 'inspirational'" class="grid grid-cols-3 gap-4">
                                <img v-for="(scene, index) in product.inspirationalScenes" :key="index"
                                    :src="scene.image" :alt="scene.alt" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="col-span-5 relative">
                    <div class="absolute w-full right-0  bg-[#fffaf7] transition-all duration-1000 z-50"
                        :style="{ top: accordionHeight }">
                        <!-- Accordion Header -->
                        <button @click="toggleAccordion"
                            class="w-full flex items-center justify-between p-6 text-left bg-[#e7e3de] font-['PT_Serif']">
                            <span class="text-2xl text-[#776352]">TUBO DOUBLE SOFA</span>
                            <div class="transition-transform text-[#776352] duration-500" :class="{ 'rotate-180': isOpen }">
                                <Arrow size="28px" direction="top" :strokeWidth="22.5" fillColor="currentColor" />
                            </div>
                        </button>

                        <!-- Accordion Content -->
                        <div
                            class="bg-[#fffaf7] overflow-hidden transition-all duration-1000 ${isOpen ? 'max-h-[calc(100vh-80px)]' : 'max-h-0'">
                            <!-- 3D Material Selection -->
                            <div v-show="isOpen" class="border-b border-[#c3c3c3] mx-[70px] py-8">
                                <div class="px-[14px]">
                                    <h4 class="text-lg text-[#c59233] mb-3 font-normal">Select 3D Material Combination
                                    </h4>
                                    <p class="text-xs text-[#4b4b4b] mb-2 font-light">Recommended Configuration Please
                                        select the configuration</p>
                                    <select
                                        class="w-full max-w-[204px] p-2 border border-[#cccccc] rounded-md bg-transparent text-xs text-[#4b4b4b]">
                                        <option v-for="config in configurations" :key="config">
                                            {{ config }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <!-- Product Material Selection -->
                            <div v-show="isOpen" class="px-[70px] py-[23.4px]">
                                <h4 class="text-lg text-[#c59233] mb-3 font-normal">Product Material Selection</h4>
                                <div class="grid grid-cols-2 gap-4">
                                    <!-- Frame Color -->
                                    <div class="space-y-1">
                                        <p class="text-xs text-[#4b4b4b] font-light">
                                            Frame Color <br />
                                            Select Frame Color
                                        </p>
                                        <select
                                            class="w-full max-w-[204px] p-2 border border-[#cccccc] rounded-md bg-transparent text-xs text-[#4b4b4b]">
                                            <option v-for="color in frameColors" :key="color">
                                                {{ color }}
                                            </option>
                                        </select>
                                    </div>

                                    <!-- Seat Cushion -->
                                    <div class="space-y-1">
                                        <p class="text-xs text-[#4b4b4b] font-light">
                                            Seat Cushion + Pillow <br />
                                            with Quick Dry Foam
                                        </p>
                                        <select
                                            class="w-full max-w-[204px] p-2 border border-[#cccccc] rounded-md bg-transparent text-xs text-[#4b4b4b]">
                                            <option v-for="option in cushionOptions" :key="option">
                                                {{ option }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-xs text-[#4b4b4b] font-light">
                                            Hardware <br />
                                            Select Legs Tip
                                            
                                        </p>
                                        <select
                                            class="w-full max-w-[204px] p-2 border border-[#cccccc] rounded-md bg-transparent text-xs text-[#4b4b4b]">
                                            <option v-for="option in cushionOptions" :key="option">
                                                {{ option }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!-- Price Section -->
                            <div class="px-[26px] pr-[70px] pb-[30px]" :class="isOpen ? 'pt-[50px]' : 'pt-[190px]'">
                                <div class="flex  justify-end items-center gap-2 text-[22px] font-medium text-[#c59233]">
                                    <span class="font-bold">Price:</span>
                                    <strong class="">$845</strong>
                                </div>

                                <div class="flex justify-end items-end gap-3 mt-4 mb-2">
                                    <div class="text-right">
                                        <span class="text-xs text-[#4b4b4b] font-medium">Qty:</span>
                                        <div>
                                            <input type="text" value="2"
                                            class="w-[56px] mt-1 px-2 py-1 rounded-lg text-center bg-transparent focus:outline-none" />
                                        </div>
                                       
                                    </div>

                                    <button class="px-5 py-2 bg-[#232323] text-white rounded-2xl text-sm uppercase">
                                        ADD TO CART
                                    </button>
                                </div>

                                <p class="text-[10px] text-[#333333]">SKU: TUB-SF</p>

                                <div class="flex justify-between items-center border-t border-[#c3c3c3] mt-1 pt-2">
                                    <div class="flex gap-1">
                                        <Facebook bgColor="#dddddd" bgSize="33px" svgSize="15px" svgColor="#ffffff"
                                            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)" title="Facebook"
                                            hoverBgColor="#ce8d39" href="https://www.houzz.com"
                                            hoverSvgColor="#000000" />
                                        <Houzz bgColor="#dddddd" bgSize="33px" svgSize="15px" svgColor="#FFFFFF"
                                            hoverBgColor="#ce8d39" hoverSvgColor="#ffffff" href="https://www.houzz.com"
                                            title="Houzz Share" />
                                        <Pinterest bgColor="#dddddd" bgSize="33px" svgSize="15px" svgColor="#ffffff"
                                            hoverBgColor="#ce8d39" hoverSvgColor="#ffffff" href="https://pinterest.com"
                                            title="Pinterest" />
                                    </div>
                                    <div class="text-right text-xs text-[#4b4b4b] leading-[22px]">
                                        Special order<br />
                                        Ships in 10-12 weeks<br />
                                        Ships via Freight
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { Arrow, Facebook, Pinterest, Houzz } from '../frontend-components/Svg/Icons';

const activeTab = ref('description');
const quantity = ref(1);
const isOpen = ref(false)
const accordionHeight = ref('-120px')


const tabs = ref([
    { id: 'description', label: 'DESCRIPTION' },
    { id: 'specifications', label: 'SPECIFICATIONS' },
    { id: 'inspirational', label: 'INSPIRATIONAL SCENE' }
]);

const configurations = [
    'Configuration 1',
    'Configuration 2',
    'Configuration 3',
    'Configuration 4'
]

const frameColors = [
    '8012 Red Brown',
    '8012 Red Brown',
    '8012 Red Brown',
    '8012 Red Brown'
]

const cushionOptions = [
    '3015 Salt',
    '3015 Salt',
    '3015 Salt',
    '3015 Salt'
]

const toggleAccordion = () => {
    isOpen.value = !isOpen.value
    accordionHeight.value = isOpen.value ? '-400px' : '-120px'
}

const product = ref({
    description: `The modern Tubo sofa and club loungers feature soft curved and classical shapes with a simple elegant frame and large round cushions. Available in a range of technical fabrics, Tubo features a cataphorese metal powder-coated frame. The design evokes a classical yet timeless feel with large tall privacy options and additional curved pillow options–suitable for both residential or commercial contracts with endless bespoke options. The Tubo sofa and loungers' collection is designed by French designer Christophe Pillet.`,
    specificationImages: [
        '/src/assets/lebello/images/store-size-one.png',
        '/src/assets/lebello/images/store-size-two.png'
    ],
    specificationLinks: [
        { text: 'DOWNLOAD CUT SHEET', url: '#' },
        { text: 'SEND ENQUIRE', url: '#' }
    ],
    familyViewText: 'VIEW TUBO FAMILY',
    seriesLink: { text: 'VIEW TUBO SERIES', url: '#' },
    inspirationalScenes: [
        { image: '/src/assets/lebello/images/lebello-tubo_club-chair-outdoor-302X202.png', alt: 'Scene 1' },
        { image: '/src/assets/lebello/images/lebello_tubo-club-chair-302X202.png', alt: 'Scene 2' },
        { image: '/src/assets/lebello/images/lebello-tubo-club-chair-side-view-302X202.png', alt: 'Scene 3' },
        { image: '/src/assets/lebello/images/Lebello-Tubo_Club_chair-302X202.png', alt: 'Scene 4' }
    ]
});
</script>

<style scoped>
/* Additional styles, if needed */
</style>