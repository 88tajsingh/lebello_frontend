<template>
    <DefaultCard :cardTitle="form.id ? `Edit Dealer` : `Add New Dealer`">
        <DomainComponent @customChange="(id) => form.domain_id = id"
      :deleteService="DealersServices.deleteDealer"
       masterKey="master_dealer_id" :masterDeleteService="DealersServices.deleteMasterDealer"
      routeTo="dealer"
       ></DomainComponent>
       <template v-if="form.id" v-slot:header>
            <MasterSlugForm
        :form="form"
        @update-slug="()=>fetchPagesData()"
        :SlugUpdateservices = 'DealersServices.masterSlugDealerUpdate'
        masteridKeyName='master_dealer_id'
      />
    </template>        
    <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Fileds">
                        <div class="px-6">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *"
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title"
                                :errors="errors"  
                                :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => { checkedFields.title = value }" />

                            <div class="flex mt-3 flex-col ">
                                <InputLabel for="status" value="Select Template" />
                                <Select :options="TemplateVersion" showfield="name" class="w-full" valueField="value"
                                    label="Select " v-model="form.dealer_page_template"
                                    :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => { checkedFields.dealer_page_template = value }"
                                    />
                                <p>Default First Version will active.</p>
                            </div>
                        </div>
                    </Accordion>
                    <div class="mt-3  ">
                        <Accordion :open="true" header="Description">
                            
                            <div class="mx-3 flex">
                                <SingleCheck v-if="form.id" label="" v-model="checkedFields.description"></SingleCheck>
                                <div class="w-full">

                                    <TinyMCE v-model="form.description" />
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3  ">
                        <Accordion :open="true" header="Day time banner Gallery images">
                            <div class="mx-3 flex">
                                <SingleCheck v-if="form.id" label="" v-model="checkedFields.day_banner_images"></SingleCheck>
                                <div class="col-span-2 w-full border border-gray rounded-lg">
                                    <div class="mt-2 ml-3  ">
                                        <div class="text-gray-4 text-[13px]"> images</div>
                                        <div class=" flex flex-wrap">
                                            <div class="relative p-1" v-for="(slide, index) in imageData.day_banner_images.images"
                                                :key="`slide-${index}`">
                                                <img class=" border border-gray-4 m-1 p-2 h-[168px] w-[156px]"
                                                    :src="$filePath(slide.file_url)">
                                                <div @click="() => handleRemoveDayImage(slide)"
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
                            <div class="mx-3 flex">
                                <SingleCheck v-if="form.id" label="" v-model="checkedFields.night_banner_images"></SingleCheck>
                                <div class="col-span-2 w-full border border-gray rounded-lg">

                                    <div class="mt-2 ml-3  ">
                                        <div class="text-gray-4 text-[13px]">images</div>
                                        <div class=" flex flex-wrap">
                                            <div class="relative p-1"
                                                v-for="(slide, index) in imageData.night_banner_images.images"
                                                :key="`slide-${index}`">
                                                <img class=" border border-gray-4 m-1 p-2 h-[168px] w-[156px]"
                                                    :src="$filePath(slide.file_url)">
                                                <div @click="() => handleRemoveNightImage(slide)"
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
                                        placeholder="" v-model="form.latitude"
                                        :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.latitude = value }"  />
                                    <p>put the latitude coordinate.</p>
                                </div>
                                <div class="mt-2">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Longitude *"
                                        placeholder="" v-model="form.longitude" 
                                        :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.longitude = value }" />
                                    <p>Put the longitude coordinate.</p>
                                </div>

                                <div class="mt-2">
                                    <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                        class="block w-[180px] mr-2 " v-model="form.bubble_info" placeholder=""
                                        label="Buble info"
                                        :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.bubble_info = value }"  />
                                    <span>Most search engines use a maximum of 160 chars for the description.
                                    </span>
                                </div>
                                <div class="mt-2">
                                    <InputLabel for="status" value="Show Dealer Page" />
                                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                        label="Select " v-model="form.show_dealer_page"
                                        :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.show_dealer_page = value }"  />
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
                                    :message="errors.seo_title"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.title = value }"  />
                                <span>Custom title tag.</span>
                            </div>
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_description"
                                    placeholder="Meta Description" label="Meta Description"
                                    :message="errors.seo_meta_description"
                                    :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.seo_meta_description = value }" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_keywords"
                                    placeholder="Meta Keywords" label="Meta Keywords"
                                    :message="errors.seo_meta_keywords" 
                                    :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.seo_meta_keywords = value }"/>
                                <span>Seperate each term with comma.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Dealer page Content">
                            <div class="mt-2 px-6  h-auto ">
                                <TextInput id="seo_title" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.country_name" placeholder="" label="Country Name	"
                                    :message="errors.country_name"
                                    :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.country_name = value }" />
                            </div>
                            <div class="mt-2 px-6  h-auto ">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.slider_address"
                                    placeholder="Meta Keywords" label="Slider Address"
                                    :message="errors.slider_address"
                                    :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.slider_address = value }" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="large text ">
                            <div class="mt-2 px-6  h-auto ">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.agent_description"
                                    placeholder="Meta Keywords" label="Agent Description"
                                    :message="errors.agent_description"
                                    :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.agent_description = value }" />
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
                                        label="Select " v-model="form.status"
                                        :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.status = value }" />
                                </div>
                                
                            </div>
                        </div>
                        <div class="bg-[#f6f7f7] flex py-3">
                            <Button type="submit" bg_th_color="text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                                class=" text-sm ml-auto px-3 py-2">
                                {{ buttonText }}
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
                                        placeholder="" v-model="form.email"
                                        :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.email = value }" />
                                </div>
                                <div class="mt-3">
                                    <TextInput type="number" class="block mr-2 h-[40px] w-full"
                                        label="Dealer contact number" placeholder="" v-model="form.contact_number"
                                        :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.contact_number = value }" />
                                </div>
                                <div class="flex flex-col ">
                                    <InputLabel for="status" value="Dealer Territory" />
                                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                        label="Select " v-model="form.territory"
                                        :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.territory = value }"
                                        />
                                    <span>Select one territory. If none selected it will not be displayed on the
                                        list.</span>
                                </div>
                                <div class="mt-3">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Company Name"
                                        placeholder="" v-model="form.company_name" 
                                        :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.company_name = value }"/>
                                </div>

                                <div class="mt-3">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="City"
                                        placeholder="" v-model="form.city"
                                        :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.city = value }" />
                                </div>
                                <div class="mt-3">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Weather City"
                                        placeholder="" v-model="form.weather_city" 
                                        :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.weather_city = value }"/>
                                </div>
                                <div class="mt-3">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Time Zone"
                                        placeholder="" v-model="form.timezone"
                                        :hasCheckBox="checkBoxFlag"
          @update:checkValue="(value) => { checkedFields.timezone = value }" />
                                </div>
                                <div class="mr-2 mt-3  h-auto ">
                                    <div class="  h-auto ">
                                        <InputLabel for="company_logo" value="Company Logo" />
                                        <div class=" flex  w-full h-auto ">
                            <SingleCheck v-if="form.id" label="" v-model="checkedFields.featured_image"></SingleCheck>
                            <div class="py-2 rounded-lg px-2 w-full border border-stroke"
                                            @click="() => imageData.company_logo.isOpen = true"> {{
                                                imageData.company_logo.mediaName }}</div>
                    </div>
                                        
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
                                        <div class=" flex  w-full h-auto ">
                            <SingleCheck v-if="form.id" label="" v-model="checkedFields.featured_image"></SingleCheck>
                            <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                            @click="() => imageData.thumb_image.isOpen = true"> {{
                                                imageData.thumb_image.mediaName }}</div>
                    </div>
                                        
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
            :closeModal="() => imageData.company_logo.isOpen = false" :selectedFiles="handleCompanyLogoFiles" />
    </popupModal>

    <!-- Thumb Image Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.thumb_image.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.thumb_image.images" :singleFile="true"
            :closeModal="() => imageData.thumb_image.isOpen = false" :selectedFiles="handleThumbImageFiles" />
    </popupModal>

    <!-- Day Banner Images Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.day_banner_images.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.day_banner_images.images"
            :singleFile="false" :closeModal="() => imageData.day_banner_images.isOpen = false"
            :selectedFiles="handleDayBannerFiles" />
    </popupModal>

    <!-- Night Banner Images Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.night_banner_images.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.night_banner_images.images"
            :singleFile="false" :closeModal="() => imageData.night_banner_images.isOpen = false"
            :selectedFiles="handleNightBannerFiles" />
    </popupModal>

    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from  "lodash";
import { ref, onMounted, watch,computed } from "vue";
import { handleFileUpdate,getGlobalUpdateData,showToast } from '@/helper/functions';
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
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))

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

// remove image form gallery
const handleRemoveDayImage = (slide) => {
    const index = imageData.value.day_banner_images.images.findIndex(item => item.id === slide.id);
        if (index !== -1) {
          imageData.value.day_banner_images.images.splice(index, 1);
          form.value.day_banner_images.splice(index, 1);}
}
// remove image form gallery
const handleRemoveNightImage = (slide) => {
    const index = imageData.value.night_banner_images.images.findIndex(item => item.id === slide.id);
        if (index !== -1) {
          imageData.value.night_banner_images.images.splice(index, 1);
          form.value.night_banner_images.splice(index, 1);}
}


// Form Validation
const validateForm = () => {
    errors.value = {};
    if (!form.value.title) {
        errors.value.title = 'Title is required';
        return false;
    }
    return true;
};

const handleSubmit = async () => {
    if (!validateForm('page_title', 'Page Title', form, errors)) return
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
    hasCheckedFields ? handleGlobalUpdate() : handleAddEditApi()
}
// Submit Handler
const handleAddEditApi = async () => {
    delete form.value?.domain;
    
        loading.value = true;
        try {
            const action = store.getters.editData ? DealersServices.editDealer: DealersServices.addDealer;
            const {deleted_at, created_at,slug,domains_data,night_banner_images_data,day_banner_images_data,default_domain,default_master, updated_at, featured_image_url, ...payload}= form.value;
            if (!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id
            const res = await action(payload);
            if (res.status === 200 && res.data.success) {
                showToast(res.data.message, 'success');
                router.push('/dealer');9
            }
        } catch (e) {
            console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} Dealers:`, e);
        } finally {
            loading.value = false;
        }
    
};

// Global Update Handler
const handleGlobalUpdate = async () => {
  loading.value = true;
    const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
    if (_.isEmpty(globalUpdate)) return

    const payload = {
      master_dealer_id: form.value.master_dealer_id,
        global_keys: globalUpdate
    }

    try {
        const { status, data } = await DealersServices.globalDealerUpdate(payload)
        status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
        if (status === 200 && data.success) router.push('/dealer')
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
    } finally {
        loading.value = false
    }
}

// Fetch Perticular Domain Data
const fetchPagesData = async () => {
  loading.value = true
    const payload = { master_dealer_id: form.value.master_dealer_id, domain_id: form.value.domain_id }
    try {
        const { status, data } = await DealersServices.getDealer(payload)
        if (status === 200 && data.success) {
            const dataValue = data.data[0]
            store.dispatch('setEdit', dataValue)
            Object.assign(form.value, dataValue)
            loading.value=false
        }
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error('Error while fetching data:', error)
        loading.value=false
    }
    finally{
    loading.value=false;
  }
}

// Lifecycle Hooks
onMounted(() => {
  if (store.getters.editData) {
        imageData.value.day_banner_images.mediaName = store.getters?.editData?.day_banner_images_data?.file_url || 'Select Images';
        imageData.value.day_banner_images.images = store.getters?.editData?.day_banner_images_data;
        imageData.value.night_banner_images.mediaName = store.getters?.editData?.night_banner_images_data?.file_url || 'Select Images';
        imageData.value.night_banner_images.images = store.getters?.editData?.night_banner_images_data;
        
    }
});

// Check if domain_id is present in domains_data and fetch data if so
watch(() => form.value.domain_id, (newDomainId) => {
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchPagesData();
    } else {
        console.log('data not in array', form.value?.domains_data);
    }
});

// Computed Property
const buttonText = computed(() => {
    return Object.values(checkedFields.value).some(Boolean) ? 'Global Update' : (form.value.id ? 'Update' : 'Submit')
})

</script>