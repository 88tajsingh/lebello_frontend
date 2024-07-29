<template>
    <DefaultCard :cardTitle="id ? `Edit Contract` : `Add New Contract`">
        <DomainComponent  @customChange="(id) => form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <div>
                        <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title" placeholder="Add title"
                            v-model="form.title" :errMessage="errors.title" :errors="errors" />
                        <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug" placeholder="slug"
                            v-model="form.slug" :errMessage="errors.slug" />
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Description">
                            <div class="px-5 pt-2">
                                <div class="px-2">
                                    <TinyMCE v-model="form.description" />
                                </div>
                                <InputError class="mt-2" :message="errors?.description" />
                                <span class="text-sm pl-2">Put Material Description.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Seo Options">
                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id="TitleTag" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.seo_title_tag" placeholder="Title Tag" label="Title Tag" />
                                <span>Custom title tag.</span>
                            </div>
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.seo_meta_description"
                                    placeholder="Meta Description" label="Meta Description"
                                    :message="errors.seo_meta_description" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="MetaKeywords" :isTextarea="true" :='4' type="text" class="block w-[180px] mr-2 "
                                    v-model="form.seo_meta_keywords" placeholder="Meta Keywords"
                                    label="Meta Keywords" />
                                <span>Seperate each term with comma.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Contract Slide">
                            <div class='mx-5 mb-2'>
                                <div class=' mb-2'>
                                    <InputLabel for="ContractLogo" value="Show on Contract HomePage Slide" />
                                    <span>
                                        <singleCheckBox id="checkbox1"
                                            label="Checked this option to show this contract on contract home slide section."
                                            v-model:modelValue="form.contract_home_page_slide"></singleCheckBox>
                                    </span>
                                </div>
                                <TextInput id="TitleBackground" type="text" class="block w-full mr-2 mb-2 h-[33px]"
                                    v-model="form.contract_background_title" placeholder="" label="Title Background		
                          " />
                          <ColorPicker v-model="form.contract_title_color" />
                                <TextInput id="LocationBackground	" type="text" class="block w-full mb-2 mr-2 h-[33px]"
                                    v-model="form.contract_location_background" placeholder="" label="Location Background			
                          " />
                                <TextInput id="LocationColor" type="text" class="block w-full mr-2 mb-2 h-[33px]"
                                    v-model="form.contract_location_color" placeholder="" label="Location Color			
                          " />
                          <InputLabel for="SliderImage" value="SliderImage" />
                                <div class="py-2 rounded-lg mb-2 px-2 border border-stroke"
                                    @click="() => sliderImageData.isOpen = true"> {{
                                        sliderImageData.mediaName }}</div>
                                        <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in sliderImageData.images" :key="file"
                                        :src="$filePath(file.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file.alternative_text || 'image'">
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Contract Logo">
                            <div class=" px-6  h-auto ">
                                <div class="py-2 min-h-10 rounded-lg px-2 border border-stroke"
                                    @click="() => contractLogoData.isOpen = true"> {{
                                        contractLogoData.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                 
                                    <img v-for="file in contractLogoData.images" :key="file"
                                        :src="$filePath(file.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Featured Products ">
                            <div class="w-52 ml-auto mr-5">
                                <Select :options="statusData" showfield="name" class="w-full" valueField="value"
                                label="Select an option" v-model="form.status" />
                            </div>
                            <div class=" px-6  h-auto ">

                            </div>
                        </Accordion>
                    </div>

                </div>

                <div class="col-span-4">
                    <Accordion header="Publish" open="false">
                        <div class="px-1 py-3">
                            <!-- <div class="flex justify-between mb-2">
                                <LinkBtn :buttonText="'Preview'" />
                                <Button type="submit" class=" text-sm ml-auto px-2">
                                    Save Draft
                                </Button>
                            </div>
                            <div id="wraper status">
                                <div>
                                    <span class="text-sm flex items-center m-auto">
                                        <svg fill="#000000" height="15px" width="15px" version="1.1" id="Layer_1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
                                            xml:space="preserve">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                stroke-linejoin="round">
                                            </g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M256,0c-70.592,0-128,57.408-128,128c0,63.296,46.229,115.861,106.667,126.08v236.587 c0,11.776,9.536,21.333,21.333,21.333c11.797,0,21.333-9.557,21.333-21.333V254.08C337.771,243.861,384,191.296,384,128 C384,57.408,326.592,0,256,0z M234.667,128c-11.776,0-21.333-9.557-21.333-21.333s9.557-21.333,21.333-21.333 S256,94.891,256,106.667S246.443,128,234.667,128z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <span class="ml-1">
                                            Status:
                                            <strong class="text-gray-600"> Draft</strong>
                                        </span>
                                        <Button v-if="!showHidePublish?.Status" type=""
                                            @click="showHidePublish.Status = !showHidePublish?.Status"
                                            class="ml-2 text-sm border-none underline">
                                            Edit
                                        </Button>
                                    </span>
                                </div>
                                <div v-if="showHidePublish.Status">
                                    <Dropdown :options="menuItems" @optionSelected="handleOptionSelected" />
                                    <LinkBtn click="route('add.swatches')" class=" " buttonText="ok" />
                                    <Button type="" @click="showHidePublish.Status = !showHidePublish.Status"
                                        class="ml-2 text-sm border-none underline">
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                            <div id="wraper Visibility">
                                <div>
                                    <span class="text-sm flex items-center m-auto">
                                        <svg width="15px" height="15px" viewBox="0 0 16 16" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" fill="text-gray-700">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                stroke-linejoin="round">
                                            </g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path fill="#444"
                                                    d="M8 3.9c-6.7 0-8 5.1-8 5.1s2.2 4.1 7.9 4.1 8.1-4 8.1-4-1.3-5.2-8-5.2zM5.3 5.4c0.5-0.3 1.3-0.3 1.3-0.3s-0.5 0.9-0.5 1.6c0 0.7 0.2 1.1 0.2 1.1l-1.1 0.2c0 0-0.3-0.5-0.3-1.2 0-0.8 0.4-1.4 0.4-1.4zM7.9 12.1c-4.1 0-6.2-2.3-6.8-3.2 0.3-0.7 1.1-2.2 3.1-3.2-0.1 0.4-0.2 0.8-0.2 1.3 0 2.2 1.8 4 4 4s4-1.8 4-4c0-0.5-0.1-0.9-0.2-1.3 2 0.9 2.8 2.5 3.1 3.2-0.7 0.9-2.8 3.2-7 3.2z">
                                                </path>
                                            </g>
                                        </svg>
                                        <span class="ml-1">
                                            Visibility:
                                            <strong class="text-gray-600"> Public</strong>
                                        </span>
                                        <Button v-if="!showHidePublish.Visibility" type=""
                                            @click="showHidePublish.Visibility = !showHidePublish.Visibility"
                                            class="ml-2 text-sm border-none underline">
                                            Edit
                                        </Button></span>
                                </div>
                                <div v-if="showHidePublish.Visibility">
                                    <RadioBtn :options="options" :onChange="handleOptionChange"
                                        class="flex flex-col mb-1" />
                                    <LinkBtn click="route('add.swatches')" class=" " :buttonText="'ok'" />
                                    <Button type="" @click="showHidePublish.Visibility = !showHidePublish.Visibility"
                                        class="ml-2 text-sm border-none underline">
                                        Cancel</Button>
                                </div>
                            </div> -->
                            <div class="px-4">
                                <div class="flex flex-col ">
                                    <InputLabel for="status" value="Status" />
                                    <Select :options="trueFalse" showfield="name" class="w-full"  valueField="value" label="Select Parent Material"
                                    v-model="form.status" />
                                </div>
                                <div class="col-span-1 w-full">
                                    <input-label for="parentOrder" value="Visibility" />
                                    <div class="flex items-center  gap-2">
                                        <RadioButton v-for="option in PublishOptions" :key="option.value"
                                            name="Visibility" :value="option.value" :label="option.label"
                                            :modelValue="form.visibility"
                                            @update:modelValue="form.visibility = $event" />
                                    </div>
                                    <div v-if="form.visibility === 'Password protected'" class="">
                                        <TextInput type="password" class="block mr-2 w-full" v-model="form.password"
                                            placeholder="Password" />
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
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Contract Information">
                            <div class="px-6 h-auto ">
                                <TextInput id="Location" type="text" class="block w-[180px] mr-2  h-[33px]"
                                    v-model="form.contract_info_location" placeholder="Location" label="Location" />
                                <p class="mb-1">Put the contract location.</p>
                                <TextInput id="Designer" type="text" class="block w-[180px] mr-2 mb-1 h-[33px]"
                                    v-model="form.contract_info_designer" placeholder="Designer" label="Designer" />
                                <p class="mb-1">Put the designer name here.</p>

                                <TextInput id="Client" type="text" class="block mb-1 w-[180px] mr-2 h-[33px]"
                                    v-model="form.contract_info_client" placeholder="Client" label="Client" />
                                <p class="mb-1">Put the client name here.</p>

                                <TextInput id="Project " type="text" class="block mb-1 w-[180px] mr-2 h-[33px]"
                                    v-model="form.contract_info_project_link" placeholder="Project Link"
                                    label="Project Link " />
                                <p class="mb-1">Put the project link URL here. Do not start with 'http://'. Example:
                                    projectlink.com</p>

                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Featured Option">
                            <div class="mt-2 px-6 flex h-auto ">
                                <singleCheckBox id="FeaturedOption" label="If set as featured, it will be displayed
                                    at the top of
                                    'Contract Design' page" v-model:modelValue="form.featured_option"></singleCheckBox>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Contract Type">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :dropdown="true" valueField="id" showField="contract_name"
                                    :checkedData='form.contract_type' :data="contractType"
                                    @checked-items="(checked)=>{form.contract_type = checked }" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Contract Location">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.contract_location' :dropdown="true"
                                    valueField="id" showField="contract_location" :data="contractLocation"
                                    @checked-items="(checked)=>form.contract_location=checked" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Featured image">
                            <div class="px-6  h-auto ">
                                <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
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
                        <div class="mt-4">
                        <Accordion :open="true" header="Gallery">
                            <div class="px-6  h-auto ">
                                <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => galleryData.isOpen = true"> {{
                                        galleryData.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in galleryData.images" :key="file" :src="$filePath(file.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                        </Accordion>
                    </div>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Simple Fields">
                            <div class="mt-2 px-6 flex h-auto">
                                    <Select :options="options" showfield="name" class="w-full" :defaultZero='true' valueField="value" label="Select Parent Material"
                                    v-model="form.simple_fields" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Sub Heading Settings">
                            <div class="mt-2 px-6  h-auto">
                                <div>
                                    <div class="">
                                        <RadioButton v-for="option in withBgWithoutBg" :key="option.value"
                                            name="Visibility" :value="option.value" :label="option.label"
                                            :modelValue="iswithBg" @update:modelValue="iswithBg = $event" />
                                    </div>
                                    <div v-if="iswithBg" class="">
                                        <ColorPicker  label="Select BG Color" v-model="form.contract_title_color" />
                                    </div>

                                </div>
                                <div class="">
                                    <ColorPicker  label="Text Color" v-model="form.sub_heading_text_color" />
                                </div>

                                <TextInput type="text" class="block mr-2 mb-2 h-[40px] " placeholder=""
                                    label="Heading Font Size" v-model="form.heading_font_size" />

                                <div class="">
                                    <InputLabel for="-HeadingCase" value="Heading Case" />
                                    <RadioButton v-for="option in capsNOCaps" :key="option.value" name="Visibility"
                                        :value="option.value" :label="option.label" :modelValue="form.contract_design"
                                        @update:modelValue="form.contract_design = $event" />
                                </div>
                                <TextInput type="text" class="block mr-2 mb-2 h-[40px] " placeholder=""
                                    label="Transparent %" v-model="form.heading_transparent_percentage" />
                            </div>
                        </Accordion>
                    </div>

                    <div class="mt-5">
                        <Accordion :open="true" header="Contract design">
                            <div class="mt-2 px-6 flex h-auto">
                                <div class="">
                                    <RadioButton v-for="option in oldNewContract" :key="option.value" name="Visibility"
                                        :value="option.value" :label="option.label" :modelValue="form.contract_design"
                                        @update:modelValue="form.contract_design = $event" />
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>

        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="featureData.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="featureData.images" :singleFile="true"
            :closeModal="() => { featureData.isOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="galleryData.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="galleryData.images" :singleFile="false"
            :closeModal="() => { galleryData.isOpen = false }" :selectedFiles="handleGalleryFiles" />
    </popupModal>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="contractLogoData.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="contractLogoData.images" :singleFile="true"
            :closeModal="() => { contractLogoData.isOpen = false }" :selectedFiles="handleContractLogoFiles" />
    </popupModal>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="sliderImageData.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="sliderImageData.images" :singleFile="true"
            :closeModal="() => { sliderImageData.isOpen = false }" :selectedFiles="handleSliderImageFiles" />
    </popupModal>
    <Loader :isLoading="loading" :fullPage="true" />
</template>
<script setup>
import router from '@/router';
import { defineEmits } from 'vue';
import { ref, onMounted,watch } from "vue";
import { handleFiles } from '@/helper/functions';
import { showToast } from '@/helper/functions'
import ContractServices from '@/services/ContractServices';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import { contractLoctionTreeList, contractTypeTreeList } from '@/helper/Apis'
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import RadioButton from '@/components/Admin-components/form-components/RadioButton.vue';
import singleCheckBox from '@/components/Admin-components/form-components/SingleCheck.vue'
import { PublishOptions, trueFalse, withBgWithoutBg, oldNewContract, capsNOCaps,productData } from '@/json/data';
import { useStore } from 'vuex';

const store = useStore();

const emit = defineEmits(['handleApi']);
const errors = ref({})
const iswithBg = ref(false)
const contractType = ref([]);
const contractLocation = ref([]);
const loading = ref(false)
const form = ref({ status: '', simple_fields:false,description:'' });
const PreviousDomain = ref(null)
const masterId = ref(null)

// images variables 
const featureData = ref({
    isOpen: false,
    mediaName: 'feature Image',
    images: []
})
const galleryData = ref({
    isOpen: false,
    mediaName: 'gallery Image',
    images: []
})
const contractLogoData = ref({
    isOpen: false,
    mediaName: 'Logo Image',
    images: []
})
const sliderImageData = ref({
    isOpen: false,
    mediaName: 'Main Slider Image',
    images: []
})

// images functions 
const handleFeatureFiles = (data) => {
    const object = handleFiles(data);
    featureData.value.isOpen = false
    featureData.value.images = data;
    featureData.value.mediaName = object.mediaName;
    form.value.featured_image = object.media_ids[0]
}
const handleGalleryFiles = (data) => {
    const object = handleFiles(data);
    galleryData.value.isOpen = false
    galleryData.value.images = data;
    galleryData.value.mediaName = object.mediaName;
    form.value.gallery = object.media_ids
}
const handleContractLogoFiles = (data) => {
    console.log(data)
    const object = handleFiles(data);
    contractLogoData.value.isOpen = false
    contractLogoData.value.images = data;
    contractLogoData.value.mediaName = object.mediaName;
    form.value.contract_logo = object.media_ids[0]
}
const handleSliderImageFiles = (data) => {
    const object = handleFiles(data);
    sliderImageData.value.isOpen = false
    sliderImageData.value.images = data;
    sliderImageData.value.mediaName = object.mediaName;
    form.value.contract_slider_image = object.media_ids[0]
}

const handleSubmit = () => {
    delete form.value?.domain;
    if (validateForm()) {
        if (props.id !== null)
            handleEditContract({ ...form.value })
        else
            handleAddContract({ ...form.value })
    }
}

const validateForm = () => {
    let isValid = true
    errors.value = {}
    if (!form.value.title) {
        errors.value.title = 'Title is required'
        isValid = false
    }
    return isValid
}
const props = defineProps({
    id: {
        type: String,
        default: null,
    }
});
const options = [{ name: 'Inherit from parent (No parent found)', value: 0 },
{ name: 'Contract Logo', value: 1 }]

// api calls 
const handleGetContract = async (payload) => {
    try {
        const res = await ContractServices.getNewContract(payload);
        if (res.status === 200 && res.data.success) {
            if (res.data.data?.length > 0) {
                form.value = res.data.data[0]
                PreviousDomain.value = form.value.domain_id;
                masterId.value = form.value.master_material_id;  
                featureData.value.images = [form.value.featured_image_url]
                featureData.value.mediaName = form.value.featured_image_url
                contractLogoData.value.images = [form.value.contract_logo_url]
                contractLogoData.value.mediaName = form.value.contract_logo_url
                sliderImageData.value.images = [form.value.contract_slider_image_url]
                sliderImageData.value.mediaName = form.value.contract_slider_image_url
                galleryData.value.images = [form.value.gallery_urls]
                // galleryData.value.mediaName = form.value.gallery_urls
            }
        }
    } catch (e) {
        console.error('Error while getting contract:', e);
    }
}

const handleAddContract = async (payload) => {
    try {
        const res = await ContractServices.addNewContract(payload);
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/Contract-Design');
        }
    } catch (e) {
        console.error('Error while adding contract:', e);
    } finally {
        loading.value = false;
    }
}

const handleEditContract = async (payload) => {
    loading.value = true;

    if (form.value.domain_id !== PreviousDomain.value) {
    delete form.value.id;
  }else{
      // clone existing  in other domain 
        form.value = { ...form.value, master_material_id: masterId.value };
  }

    try {
        const res = await ContractServices.editNewContract({...form.value});
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/Contract-Design');
        }
    } catch (e) {
        console.error('Error while editing contract:', e);
    } finally {
        loading.value = false;
    }
}

// contractLoctionTree sorting 
const contractLoctionTree = async (payload) => {
    contractLocation.value = await contractLoctionTreeList(payload)
    loading.value = false;
}
// contractLoctionTree sorting 
const contractTypeTree = async (payload) => {
    contractType.value = await contractTypeTreeList(payload)
    loading.value = false;
}

// onMounted(() => {
//     if (props.id !== undefined && props.id !== null && props.id !== '') {
//         handleGetContract({ id: props.id });
//     }
//     contractLoctionTree();
//     contractTypeTree();
// }
// );
onMounted(()=>{
    if(props.id !== undefined && props.id !== null && props.id !== ' ' ) {
        console.log("store.getters.getDomain.id",store.getters?.getDomain?.id)
        handleGetContract({id:props.id,domain_id:store.getters?.getDomain?.id});
        form.value.domain_id = store.getters?.getDomain.id
    }
})

watch(
    () => form.value.domain_id,
    () => {
        contractLoctionTree({domain_id:store.getters?.getDomain?.id});
        contractTypeTree({domain_id:store.getters?.getDomain?.id});
         }
);


</script>
<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>