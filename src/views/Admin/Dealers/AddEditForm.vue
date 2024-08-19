<template>
    <DefaultCard :cardTitle="form.id ? `Edit Dealer` : `Add New Dealer`">
        <DomainComponent  @customChange="(id) => form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Fileds">
                        <div class="px-6">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *"
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title"
                                :errors="errors" />

                            <div class="flex mt-3 flex-col ">
                                <InputLabel for="status" value="Select Template" />
                                <Select :options="TemplateVersion" showfield="name" class="w-full" valueField="value"
                                    label="Select " v-model="form.dealer_page_template" />
                                <p>Default First Version will active.</p>
                            </div>
                        </div>
                    </Accordion>
                    <div class="mt-3  ">
                        <Accordion :open="true" header="Description">
                            <div class="mx-3">
                                <TinyMCE v-model="form.description" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3  ">
                        <Accordion :open="true" header="Day time banner Gallery images">
                            <div class="mx-3">
                                <div class="col-span-2 w-full border border-gray rounded-lg">
                                    <div class="mt-2 ml-3  ">
                                        <div class=" flex flex-wrap">
                                            <div class="relative p-1" v-for="(slide, index) in imageData.day_banner_images.images"
                                                :key="`slide-${index}`">
                                                <img class=" border border-gray-4 m-1 p-2 h-[168px] w-[156px]"
                                                    :src="$filePath(slide.file_url)">
                                                <div @click="() => handleRemoveImage(slide)"
                                                    class=" absolute top-2 right-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <button @click="() => imageData.day_banner_images.isOpen = true" type="button"
                                            class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-primary  font-medium text-gray hover:bg-opacity-90">
                                            Gallery
                                        </button>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3  ">
                        <Accordion :open="true" header="Day time banner Gallery images">
                            <div class="mx-3">
                                <div class="col-span-2 w-full border border-gray rounded-lg">
                                    <div class="mt-2 ml-3  ">
                                        <div class=" flex flex-wrap">
                                            <div class="relative p-1"
                                                v-for="(slide, index) in imageData.night_banner_images.images"
                                                :key="`slide-${index}`">
                                                <img class=" border border-gray-4 m-1 p-2 h-[168px] w-[156px]"
                                                    :src="$filePath(slide.file_url)">
                                                <div @click="() => handleRemoveImage(slide)"
                                                    class=" absolute top-2 right-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                        class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <button @click="() => imageData.night_banner_images.isOpen = true" type="button"
                                            class="flex px-3 py-1 col-span-2 mt-5  mb-4 ml-4  justify-center rounded bg-primary  font-medium text-gray hover:bg-opacity-90">
                                            Gallery
                                        </button>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Location Coordinations">
                            <div class="mt-2 px-6  h-auto ">
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Latitude"
                                        placeholder="" v-model="form.latitude" />
                                    <p>put the latitude coordinate.</p>
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Longitude *"
                                        placeholder="" v-model="form.longitude" />
                                    <p>Put the longitude coordinate.</p>
                                </div>

                                <div class="mt-2">
                                    <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                        class="block w-[180px] mr-2 " v-model="form.bubble_info" placeholder=""
                                        label="Buble info" />
                                    <span>Most search engines use a maximum of 160 chars for the description.
                                    </span>
                                </div>
                                <div class="mt-2">
                                    <InputLabel for="status" value="Show Dealer Page" />
                                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                        label="Select " v-model="form.show_dealer_page" />
                                    <p>Default First Version will active.</p>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Seo Options">

                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id="seo_title" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.seo_title" placeholder="Title Tag" label="Title Tag"
                                    :message="errors.seo_title" />
                                <span>Custom title tag.</span>
                            </div>
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_description"
                                    placeholder="Meta Description" label="Meta Description"
                                    :message="errors.seo_meta_description" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_keywords"
                                    placeholder="Meta Keywords" label="Meta Keywords"
                                    :message="errors.seo_meta_keywords" />
                                <span>Seperate each term with comma.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Dealer page Content">
                            <div class="mt-2 px-6  h-auto ">
                                <TextInput id="seo_title" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.country_name" placeholder="" label="Country Name	"
                                    :message="errors.country_name" />
                            </div>
                            <div class="mt-2 px-6  h-auto ">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.slider_address"
                                    placeholder="Meta Keywords" label="Slider Address"
                                    :message="errors.slider_address" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="large text ">
                            <div class="mt-2 px-6  h-auto ">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.agent_description"
                                    placeholder="Meta Keywords" label="Agent Description"
                                    :message="errors.agent_description" />
                            </div>
                        </Accordion>
                    </div>

                </div>

                <div class="col-span-4">
                    <Accordion header="Publish" open="false">
                        <div class="px-1 py-3">
                            <div class="px-4">
                                <div class="flex flex-col ">
                                    <InputLabel for="status" value="Status" />
                                    <Select :options="statusData" showfield="name" class="w-full" valueField="value"
                                        label="Select " v-model="form.status" />
                                </div>
                                <div class="col-span-1 w-full">
                                    <div class="flex flex-col ">
                                        <InputLabel for="Visibility" value="Visibility" />
                                        <Select :options="PublishOptions" showfield="label" class="w-full"
                                            valueField="value" label="Select " v-model="form.visibility" />
                                    </div>
                                    <div v-if="form.visibility === 'Password protected'" class="mt-2">
                                        <TextInput type="password" label="Password" class="block mr-2 w-full"
                                            v-model="form.password" placeholder="Password" />
                                    </div>
                                </div>
                                <div class="col-span-1 w-full">
                                    <DatePicker v-model="form.publish" label="Publish Date" format="yyyy-mm-dd hh:mm:ss"
                                        dayjsFormat='YYYY-MM-DD HH:mm:ss' :use12-hour="false" />
                                </div>
                            </div>
                        </div>
                        <div class="bg-[#f6f7f7] flex py-3">
                            <Button type="submit" bg_th_color="text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                                class=" text-sm ml-auto px-3 py-2">
                                Publish
                            </Button>
                        </div>
                    </Accordion>
                    <!-- <div class="mt-4 ">
                        <Accordion :open="true" header="Featured image">
                            <div class="px-6  h-auto ">
                                <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => featureData.isOpen = true"> {{
                                        featureData.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in featureData.images" :key="file" :src="$filePath(file.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                        </Accordion>
                    </div> -->
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Dealer Info">
                            <div class="px-3">
                                <div class="mt-3">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Dealer email"
                                        placeholder="" v-model="form.email" />
                                </div>
                                <div class="mt-3">
                                    <TextInput type="number" class="block mr-2 h-[40px] w-full"
                                        label="Dealer contact number" placeholder="" v-model="form.contact_number" />
                                </div>
                                <div class="flex flex-col ">
                                    <InputLabel for="status" value="Dealer Territory" />
                                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                        label="Select " v-model="form.territory" />
                                    <span>Select one territory. If none selected it will not be displayed on the
                                        list.</span>
                                </div>
                                <div class="mt-3">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Company Name"
                                        placeholder="" v-model="form.company_name" />
                                </div>

                                <div class="mt-3">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="City"
                                        placeholder="" v-model="form.city" />
                                </div>
                                <div class="mt-3">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Weather City"
                                        placeholder="" v-model="form.weather_city" />
                                </div>
                                <div class="mt-3">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Time Zone"
                                        placeholder="" v-model="form.timezone" />
                                </div>
                                <div class="mr-2 mt-3  h-auto ">
                                    <div class="  h-auto ">
                                        <InputLabel for="company_logo" value="Company Logo" />
                                        <div class="py-2 rounded-lg px-2 border border-stroke"
                                            @click="() => imageData.company_logo.isOpen = true"> {{
                                                imageData.company_logo.mediaName }}</div>
                                        <div class=" mt-3 flex overflow-x-auto">
                                            <img v-for="file in imageData.company_logo.images" :key="file"
                                                :src="$filePath(file.file_url)" class="inline-block w-auto h-34 mr-4"
                                                :alt="file?.alternative_text || 'image'">
                                        </div>
                                        <InputError class="mt-2" :message="errors?.featured_image" />
                                    </div>
                                </div>
                                <div class="mr-2 mt-3  h-auto ">
                                    <div class="  h-auto ">
                                        <InputLabel for="thumb_image" value="Dealer thumb image" />
                                        <div class="py-2 rounded-lg px-2 border border-stroke"
                                            @click="() => imageData.thumb_image.isOpen = true"> {{
                                                imageData.thumb_image.mediaName }}</div>
                                        <div class=" mt-3 flex overflow-x-auto">
                                            <img v-for="file in imageData.thumb_image.images" :key="file"
                                                :src="$filePath(file.file_url)" class="inline-block w-auto h-34 mr-4"
                                                :alt="file?.alternative_text || 'image'">
                                        </div>
                                        <InputError class="mt-2" :message="errors?.featured_image" />
                                    </div>
                                </div>

                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>
        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.company_logo.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.company_logo.images" :singleFile="true"
            :closeModal="() => closeModal('company_logo')" :selectedFiles="handleCompanyLogoFiles" />
    </popupModal>

    <!-- Thumb Image Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.thumb_image.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.thumb_image.images" :singleFile="true"
            :closeModal="() => closeModal('thumb_image')" :selectedFiles="handleThumbImageFiles" />
    </popupModal>

    <!-- Day Banner Images Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.day_banner_images.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.day_banner_images.images"
            :singleFile="false" :closeModal="() => closeModal('day_banner_images')"
            :selectedFiles="handleDayBannerFiles" />
    </popupModal>

    <!-- Night Banner Images Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.night_banner_images.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.night_banner_images.images"
            :singleFile="false" :closeModal="() => closeModal('night_banner_images')"
            :selectedFiles="handleNightBannerFiles" />
    </popupModal>

    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { handleFileUpdate } from '@/helper/functions';
import { showToast } from '@/helper/functions'
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import DealersServices from '@/services/DealersServices';
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import { PublishOptions, statusData, dealerTerritory, TemplateVersion, trueFalse } from '@/json/data';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// store and router
const store = useStore();
const router = useRouter();

// reactive state
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || {
    status: '',
    visibility: '',
    dealer_page_template: 'First Version (OLD)'
});
const PreviousDomain = ref(null);

// Image Data Object
const imageData = ref({
    company_logo: { isOpen: false, mediaName: 'Company Logo', images: [] },
    thumb_image: { isOpen: false, mediaName: 'Dealer Thumb Image', images: [] },
    day_banner_images: { isOpen: false, mediaName: 'Day Banner Image', images: [] },
    night_banner_images: { isOpen: false, mediaName: 'Night Banner Image', images: [] }
});

// Image Handlers  and true  for multiple file  and for  single file false 
const handleCompanyLogoFiles = (data) => handleFileUpdate('company_logo', data, false, imageData, form);
const handleThumbImageFiles = (data) => handleFileUpdate('thumb_image', data,false, imageData, form);
const handleDayBannerFiles = (data) => handleFileUpdate('day_banner_images', data, true,imageData, form);
const handleNightBannerFiles = (data) => handleFileUpdate('night_banner_images', data, true,imageData, form);

// Form Validation
const validateForm = () => {
    errors.value = {};
    if (!form.value.title) {
        errors.value.title = 'Title is required';
        return false;
    }
    return true;
};

// Submit Handler
const handleSubmit = async () => {
    delete form.value?.domain;
    if (validateForm()) {
        loading.value = true;
        try {
            const action = store.getters.editData ? DealersServices.editDealer: DealersServices.addDealer;
            if (form.value.domain_id !== PreviousDomain.value) delete form.value.id;
            const res = await action({ ...form.value });
            if (res.status === 200 && res.data.success) {
                showToast(res.data.message, 'success');
                router.push('/dealer');
            }
        } catch (e) {
            console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} Dealers:`, e);
        } finally {
            loading.value = false;
        }
    }
};

// Lifecycle Hooks
onMounted(() => {
    PreviousDomain.value = store.getters.getDomain.id;
});

</script>