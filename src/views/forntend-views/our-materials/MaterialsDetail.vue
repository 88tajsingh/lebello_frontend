<template>
   
    <NavBar :absolute="false" />
    <div class="mx-10">
        <div class="overflow-x-hidden md:mx-10 mx-5 pb-10 mt-4 border-t border-gray-4">
            <div
                class="`overflow-x-hidden grid grid-cols-1 ${contractDesignData.contract_design !== 'New Contract Design' ? 'lg:grid-cols-5' : 'lg:grid-cols-12'}`">
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
                    <div v-html="swatchDetailData?.description"
                        class="text-[16px] text-Black666 font-medium font-graphikLight pt-2">
                    </div>
                    <div class="pt-16 pb-5 border border-b-gray-4 ">
                        <h1 class=" font-graphik text-[25px] text-black font-medium ">
                            {{ swatchDetailData?.title }}
                        </h1>
                    </div>
                    <div>
                        <ul class="flex  list-none flex-row flex-wrap mb-3" role="tablist" data-twe-nav-ref>
                            <li v-for="(tab, tindex) in swatchDetailData.material_data" :key="tindex"
                                role="presentation">
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
                        <div class="mb-6">
                            <div v-for="(tab, index) in swatchDetailData.material_data" :key="index">
                                <!-- Display the tab content only if it's the active tab -->
                                <div v-if="tab.id === activeTab" :id="tab?.id" role="tabpanel"
                                    :aria-labelledby="tab?.id + '-tab'" data-twe-tab-active>
                                    <div v-if="Array.isArray(tab.material_children)">
                                        <div v-if="tab.id === activeTab" class="container w-5/6">
                                            <div class="grid grid-cols-4 justify-items-start">
                                                <!-- Only display children of the active material tab -->
                                                <div v-if="tab.id === activeTab"
                                                    v-for="(itr, index) in tab.material_children" :key="index">
                                                    <div class="mb-10">
                                                        <div class="w-full h-full relative overflow-hidden">
                                                            <img :src="$filePath(itr?.media_data?.file_url)"
                                                                alt="Material Image"
                                                                class="object-cover w-[185px] h-[185px]" />
                                                            <div class="text-center absolute bottom-1">
                                                                <p
                                                                    class="p-[4px] px-[6px] font-graphik text-[14px] text-Black666 bg-[#ffffffc9]">
                                                                    {{ itr.name }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p
                                                            class="text-gray-600 font-graphik text-[13px] pt-2 text-Black666">
                                                            <span>{{ itr.name }}</span>
                                                            <span
                                                                class="float-right bg-[#70d94c] text-white rounded-lg px-2 border border-[#70d94c] hover:bg-white hover:text-[#70d94c]">
                                                                order </span>
                                                        </p>
                                                        <span class="text-[#70d94c] text-[13px]">2025 NEW</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- listing right -->
                <div class="hidden lg:block pl-4 min-w-52">
                    <div class="font-graphik text-[20px] text-blue mx-auto px-auto border border-b-gray-4 font-medium ">
                        Materials</div>
                    <div v-for="(item, key) in materialDetailSidebar" :key="key" class="">
                        <h2 :id="'heading' + item.id" class="mb-0 border border-b-gray-4">
                            <button @click="toggleAccordion(key, item)" :aria-expanded="activeIndex === item.id"
                                :aria-controls="'collapse' + item.id"
                                class="group relative flex  w-full items-center hover:text-primary border-0  py-2 text-left transition hover:z-[2] focus:z-[3] focus:outline-none"
                                :class="{ 'text-primary dark:bg-surface-dark dark:text-primary': activeIndex === item.id }"
                                type="button" @mouseover="hoverKey = key" @mouseleave="hoverKey = null">
                                {{ item.title }}
                                <span @click.stop="toggleAction(key, item)"
                                    class=" ms-auto  transition-transform duration-200 ease-in-out"
                                    :class="{ 'rotate-0': activeIndex !== item.id, 'rotate-[-180deg]': activeIndex === item.id }">
                                    <Icons.Arrow size="15px"
                                        fillColor="currentColor"
                                        strokeWidth="22.77" direction="top" />
                                </span>
                            </button>

                        </h2>
                        <div :id="'collapse' + item.id" v-show="activeIndex === item.id" class="pl-7 py-0"
                            :aria-labelledby="'heading' + item.id" data-twe-collapse-item
                            data-twe-parent="#accordionExample">
                            <div v-if="item?.material_data" class="text-blue font-semibold">
                                <li v-for="(sub, itemIndex) in item.material_data" :key="itemIndex" class="list-none">
                                    <a @click.prevent="handleClick(sub, item)"
                                        class="font-graphikLight text-[13px] cursor-pointer">
                                        {{ sub.name }} </a>
                                </li>
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
import { onMounted, ref, watch } from "vue";
import Icons from "@/components/frontend-components/Svg/Icons";
import { getSwatchDetail } from "@/helper/frontendHelpers";
import { useRouter } from "vue-router";

const router = useRouter();
const materialDetailSidebar = ref([]);
const swatchDetailData = ref([]);
const breadcrumbData = ref([]);
const activeIndex = ref(null);
const hoverKey = ref(null);
const slug = ref(router.currentRoute.value.params.slug);
const activeTab = ref(0)
const loading = ref(false);

const handleswatchDetailData = async () => {
    loading.value = true;
    const { status, data } = await getSwatchDetail(slug.value);
    if (status === 200 && data.success) {
        swatchDetailData.value = data.data.swatch_data[0];
        materialDetailSidebar.value = data.data.swatch_side_bar;
        activeTab.value = swatchDetailData.value?.material_data[0]?.id;
        activeIndex.value = swatchDetailData.value.id;
    }
    loading.value = false;
}

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
    }
};

const handleClick = (sub, item) => {

    if (sub.id !== activeIndex.value) {
        sessionStorage.setItem('materialDetail', item.id);
        slug.value = item.slug;
        router.push({ name: 'materialDetail', params: { slug: item.slug } });
    }
    activeTab.value = sub.id;
};

onMounted(() => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    handleswatchDetailData();
});

const toggleAction = (index, sub) => {
    activeIndex.value = activeIndex.value === sub.id ? null : sub.id;
};
const toggleAccordion = (index, sub) => {
    activeIndex.value = activeIndex.value === sub.id ? null : sub.id;
    sessionStorage.setItem('materialDetail', sub.id);
    slug.value = sub.slug;
    router.push({ name: 'materialDetail', params: { slug: sub.slug } });

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

watch(
    () => slug.value,
    () => {
        handleswatchDetailData();
    }
);
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
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
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