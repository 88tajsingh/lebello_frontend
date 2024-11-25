<template>
    <NavBar :absolute="false" />
    <div class="mx-10">
        <div class="overflow-x-hidden md:mx-10 mx-5 pb-10 mt-4 border-t border-gray-4">
            <div
                class="`overflow-x-hidden   grid grid-cols-1 ${contractDesignData.contract_design !== 'New Contract Design' ? 'lg:grid-cols-5' : 'lg:grid-cols-12'}`">
                <div class="col-span-12 lg:col-span-4 container pt-10 pb-3  ">
                    <div class="flex ">
                        <h1 class=" font-graphik text-[25px] font-medium text-black">
                           {{ swatchDetailData.title }}
                        </h1>
                    </div>
                </div>
                <!-- Breadcrumb -->
                <div class="border-t border-gray-4">
                    <ul class="flex">
                        <li class="text-Black666 text-[15px] font-graphik hover:text-blue pr-2">
                            <p @click="() => router.push({ name: 'materialsShop' })">
                                Overview
                                <span class="m-1">></span>
                            </p>
                        </li>
                        <li class="text-Black666 text-[15px] font-graphik hover:text-blue">
                            <p>
                                {{ swatchDetailData.title }}
                                <span class="m-1">></span>
                            </p>
                        </li>
                    </ul>
                    <p v-html="swatchDetailData.description" class="text-[16px] text-Black666 font-medium font-graphikLight pt-2">
                     
                    </p>
                    <div class="pt-16 pb-5 border border-b-gray-4 ">
                        <h1 class=" font-graphik text-[25px] text-black font-medium ">
                            {{ swatchDetailData.title }}
                        </h1>
                    </div>
                    <div>
                        <ul class="flex  list-none flex-row flex-wrap mb-3" role="tablist" data-twe-nav-ref>
                            <li v-for="(tab, tindex) in swatchDetailData.material_data" :key="tindex" role="presentation">
                               
                               <a :href="'#' + tab?.id" :class="{
                                    'mt-3 block  px-4 pt-3 text-[13px]  pb-4 uppercase leading-tight  hover:text-blue :text-primary': true,
                                    'disabled pointer-events-none': tab?.disabled,
                                    'text-green border-b border-green': activeTab === tab?.id
                                }" :data-twe-toggle="tab?.id" data-twe-nav-active role="tab" :aria-controls="tab?.id"
                                    :aria-selected="tab?.active" @click.prevent="activateTab(tab, tab.id)">{{ tab?.name
                                    }}</a>
                                    
                            </li>
                        </ul>

                        <!--Tabs content-->
                       <!-- Tabs content -->
<div class="mb-6">
    <div v-for="(tab, index) in swatchDetailData.material_data" :key="index">
        <!-- Display the tab content only if it's the active tab -->
        <div v-if="tab.id===activeTab" :id="tab?.id" role="tabpanel" :aria-labelledby="tab?.id + '-tab'" data-twe-tab-active>
            <div v-if="Array.isArray(tab.material_children)">
                <div v-if="tab.id===activeTab" class="container w-5/6">
                    <div class="grid grid-cols-4 justify-items-start">
                        <!-- Only display children of the active material tab -->
                        <div v-if="tab.id === activeTab" v-for="(itr, index) in tab.material_children" :key="index">
                            <div class="mb-10">
                                <div class="w-full h-full relative overflow-hidden">
                                    <img :src="$filePath(itr.media_data.file_url)" alt="Material Image"
                                         class="object-cover w-[185px] h-[185px]" />
                                    <div class="text-center absolute bottom-1">
                                        <p class="p-[4px] px-[6px] font-graphik text-[14px] text-Black666 bg-[#ffffffc9]">
                                            {{ itr.name }}
                                        </p>
                                    </div>
                                </div>
                                <p class="text-gray-600 font-graphik text-[13px] pt-2 text-Black666">
                                    <span>{{ itr.name }}</span>
                                    <span class="float-right bg-[#70d94c] text-white rounded-lg px-2 border border-[#70d94c] hover:bg-white hover:text-[#70d94c]"> order </span>
                                </p>
                                <span class="text-[#70d94c] text-[13px]">2024 NEW</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

                    </div>
                    <div v-show="isModalOpen"
                        class="overflow-y-auto overflow-x-hidden fixed top-0 ml-auto z-50 justify-center items-center w-full max-h-full">
                        <div class="justify-center items-center m-auto relative p-4 w-full max-w-2xl max-h-full">
                            <!-- Modal content -->
                            <div class="relative top-0 bg-white rounded-lg shadow ease-in duration-300">
                                <div class="bg-[#f7f7f7] p-3">
                                    <div id="carouselExampleControls" class="relative" data-twe-carousel-init
                                        data-twe-ride="carousel">
                                        <!--Carousel items-->
                                        <div
                                            class="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                                            <!--First item-->
                                            <div v-for="(item, index) in contractDesignData?.gallery_urls" :key="index"
                                                :class="[
                                                    'relative',
                                                    'float-left',
                                                    '-mr-[100%]',
                                                    'w-full',
                                                    'object-cover',
                                                    'transition-transform',
                                                    'duration-[600ms]',
                                                    'ease-in-out',
                                                    'motion-reduce:transition-none',
                                                    { hidden: index !== modalactiveIndex },
                                                ]">

                                                <img :src="$filePath(item?.file_url)" :class="''"
                                                    class="block  object-cover fadeimg ease-in  max-w-800 max-h-300 overflow-y-hidden transition-max-height duration-700 linear"
                                                    :alt="item.alt" />

                                                <div class="flex justify-between text-[#595b55]">
                                                    <p class="mt-1 pr-4 text-sm">{{ item?.alt }}</p>
                                                    <p class="mt-1 text-sm">
                                                        image {{ index + 1 }} of {{
                                                            contractDesignData?.gallery_urls?.length
                                                        }}
                                                        <span><img @click="toggleModal"
                                                                src="https://lebello.com/wp-content/themes/lebello-ep/images/chocolat/close2.gif" />
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <!--Carousel controls - prev item-->
                                        <!-- v-if="!modalactiveIndex <= 0" -->
                                        <button v-if="!modalactiveIndex <= 0"
                                            class="absolute left-0 top-0 z-[1] flex w-[50%] items-center m-auto pb-20 h-[90%] align-center transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] text-white hover:text-white hover:opacity-90 focus:text-white"
                                            type="button" @click="prevSlide">
                                            <span class="inline-block h-8 w-8">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="0.5" stroke="currentColor" class="h-24 w-24">
                                                    <!-- Increased height and width by 40px -->
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                </svg>
                                            </span>
                                            <span
                                                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
                                        </button>
                                        <!--Carousel controls - next item-->
                                        <button v-if="modalactiveIndex < contractDesignData?.gallery_urls?.length - 1"
                                            class="absolute bottom-10 right-0 top-0 z-[1] flex w-[50%] justify-right content-right self-right pt-10 pl-auto h-[80%] align-center transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] text-white hover:text-white hover:opacity-90 focus:text-white"
                                            type="button" @click="nextSlide">
                                            <span class="inline-block self-center pb-10 ml-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="0.5" stroke="currentColor" class="h-24 w-24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </span>
                                            <span
                                                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- listing right -->
                <div class="hidden lg:block pl-4 min-w-52">
                    <div
                        class="font-graphik text-[20px] text-blue mx-auto px-auto border border-b-gray-4 font-medium ">
                        Materials</div>
                    <div v-for="(item, key) in contractDesignSidebar" :key="key" class="">
                        <h2 :id="'heading' + key" class="mb-0 border border-b-gray-4">
                            <button @click="toggleAccordion(key)" :aria-expanded="activeIndex === key"
                                :aria-controls="'collapse' + key"
                                class="group relative flex  w-full items-center hover:text-orange border-0  py-2 text-left transition hover:z-[2] focus:z-[3] focus:outline-none"
                                :class="{ 'text-primary dark:bg-surface-dark dark:text-primary': activeIndex === key }"
                                type="button">
                                {{ key }}
                                <span class=" ms-auto  transition-transform duration-200 ease-in-out"
                                    :class="{ 'rotate-0': activeIndex !== key, 'rotate-[-180deg]': activeIndex === key }">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="6px" height="6px"
                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4  w-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </h2>

                        <div :id="'collapse' + key" v-show="activeIndex === key" class="pl-7 py-0"
                            :aria-labelledby="'heading' + key" data-twe-collapse-item
                            data-twe-parent="#accordionExample">

                            <div v-if="item" class="text-orange font-semibold">
                                <ul class=''>
                                    <!-- Overview -->
                                    <li v-if="item.overview" class="">
                                        <a @click.prevent="handleClick(item.overview)"
                                            class="font-graphikLight text-[13px] cursor-pointer ">{{
                                                item.overview.title }}</a>
                                    </li>
                                    <!-- Location -->
                                    <template v-if="Array.isArray(item)">
                                        <li v-for="(sub, itemIndex) in item" :key="itemIndex">
                                            <a @click.prevent="handleClick(sub)"
                                                class="font-graphikLight text-[13px] cursor-pointer">{{
                                                    sub.contract_location || sub.title }}</a>
                                        </li>
                                    </template>
                                    <!-- Contract designs -->
                                    <template v-else-if="item.designs">
                                        <li v-for="(sub, itemIndex) in item.designs" :key="itemIndex">
                                            <a @click.prevent="handleClick(sub)"
                                                class="font-graphikLight text-[13px] cursor-pointer">{{
                                                    sub.title }}</a>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    </div>
    <FooterSection />
</template>

<script setup>
import NavBar from "@/components/frontend-components/Nav-bar.vue";
import FooterSection from "@/components/frontend-components/Footer-section.vue";
import BreadcrumbSection from "@/components/frontend-components/BreadcrumbSection.vue";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import MenuSvg from "@/components/frontend-components/Svg/Menu-Svg.vue";
import { onClickOutside } from "@vueuse/core";
import { getSwatchDetail } from "@/helper/frontendHelpers";
import { useRouter } from "vue-router";
import SideMenu from "@/components/frontend-components/Side-Menu.vue";

const store = useStore();
const router = useRouter();
const contractDesignSidebar = ref([]);
const swatchDetailData = ref([]);
const breadcrumbData = ref([]);
const loading = ref(true);
const id = sessionStorage.getItem('materialDetail');

const activeTab = ref(0)

const handleswatchDetailData = async () => {
    const { status, data } = await getSwatchDetail(id);
    if (status === 200 && data.success) {
        contractDesignSidebar.value = data.data.contract_design_sidebar;
        swatchDetailData.value = data.data.swatch_data[0];
        
        activeTab.value = swatchDetailData.value?.material_data[0]?.id;
    }}



const activateTab = (tab, index) => {
    if (!tab.disabled) {
        activeTab.value = tab.id;
        swatchDetailData.value?.material_data?.forEach((t) => {
            t.active = t.id === tab.id;  
            if (Array.isArray(t.material_children)) {
                t.material_children.forEach(child => {
                    child.active = false;  
                });
            }
        });

        if (Array.isArray(tab.material_children) && tab.material_children.length > 0) {
            tab.material_children[0].active = true;  
        }

        console.log("swatchDetailData after activation:", swatchDetailData.value?.material_data);
    }
};

const isOpenSidebar = ref(false);
const closeMenu = ref(null);
const handleSideMenu = () => {
    isOpenSidebar.value = !isOpenSidebar.value;
};

const closeSideMenu = () => {
    isOpenSidebar.value = false;
};
onClickOutside(closeMenu, closeSideMenu);

const handleClick = (sub) => {
    let route;
    if (sub.title === 'overview' || sub.title === 'Overview') {
        route = { name: 'contractType', params: { slug: sub.slug } };
    } else if (sub.title) {
        route = { name: 'contractDesign', params: { slug: sub.slug } };
    } else {
        route = { name: 'ContractLocation', params: { slug: sub.slug } };
    }
    console.log("sub.title", sub.title);
    if (sub.title === 'overview' || sub.title === 'Overview') {
        sessionStorage.setItem('contract_type_id', sub.id);
    } else if (sub.title) {
        sessionStorage.setItem('contract_design_id', sub.id);
    } else {
        sessionStorage.setItem('contract_location_id', sub.id);
    }

    router.push(route);
};

onMounted(() => {
    handleswatchDetailData();
});``

const toggleAccordion = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};

watch(
    () => swatchDetailData.value,
    () => {

        breadcrumbData.value = [
            { name: 'Contract Design', link: '/contract_designs' },
            {
                name: swatchDetailData.value?.contract_type_data?.[0]?.contract_name,
                link: `/contract_type`,
                contractTypeId: swatchDetailData.value?.contract_type_data?.[0]?.id
            },
            {
                name: swatchDetailData.value?.title || 'Default Title',
                link: `/contract_design/${swatchDetailData.value?.slug || 'default-slug'}`
            }
        ];
    }
);

const activeIndex = ref(0);
const modalactiveIndex = ref(0);

const nextSlide = () => {
    modalactiveIndex.value = (modalactiveIndex.value + 1) % swatchDetailData?.value?.gallery_urls?.length;
};

const prevSlide = () => {
    modalactiveIndex.value =
        (modalactiveIndex.value - 1 + swatchDetailData?.value?.gallery_urls?.length) %
        swatchDetailData?.value?.gallery_urls?.length;
};

const isModalOpen = ref(false);

const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
};

const openSections = ref({});

const toggle = (key) => {
    Object.keys(openSections.value).forEach((k) => {
        openSections.value[k] = false;
    });
    openSections.value[key] = true;
};

const isOpen = (key) => {
    return openSections.value[key];
};

const beforeEnter = async (el) => {
    loading.value = true;
    el.style.height = '0';
    el.style.overflow = 'hidden';
    await handleswatchDetailData();
    loading.value = false;
};

const enter = (el) => {
    el.offsetHeight; // Trigger reflow
    el.style.height = `${el.scrollHeight}px`;
};

const leave = (el) => {
    el.style.height = `${el.scrollHeight}px`;
    el.offsetHeight; // Trigger reflow
    el.style.height = '0';
};
</script>


<style scoped>
.expand-fade-enter-active,
.expand-fade-leave-active {
    transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.expand-fade-enter,
.expand-fade-leave-to {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}

.expand-fade-enter-to,
.expand-fade-leave {
    max-height: 500px;
    /* Adjust this value to the maximum expected height */
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}

.fadeimg {
    animation: fadeInAnimation ease 5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;


}

@keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>