<template>
    <DefaultCard :cardTitle="form.id ? `Edit Contract` : `Add New Contract`">
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
                            <div class="px-4">
                                <div class="flex flex-col ">
                                    <InputLabel for="status" value="Status" />
                                    <Select :options="trueFalse" showfield="name" class="w-full"
                                        valueField="value" label="Select " v-model="form.status" />
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
const form = ref(store.getters.editData ||{ status: '', simple_fields:false,description:'',visibility:'' });
const PreviousDomain = ref(null)

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
    try {
        if (validateForm()) {
            if (store.getters.editData === null) {
                handleAddContract({ ...form.value })
            }
            else {
                if (form.value.domain_id !== PreviousDomain.value) {
                    delete form.value.id;
                }
                const { deleted_at, created_at, updated_at, featured_image_url,contract_logo_url,
                    contract_slider_image_url, ...refinedPayload } = form.value;
                handleEditContract({ ...refinedPayload })
            }
        }
    } catch (e) {
        console.error('Error contract design add edit :', e)
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

const options = [{ name: 'Inherit from parent (No parent found)', value: 0 },
                    { name: 'Contract Logo', value: 1 }]

// api calls 
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
    try {
        const res = await ContractServices.editNewContract(payload);
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


onMounted(()=>{
    PreviousDomain.value = store.getters?.getDomain?.id;
    if(store.getters.editData){
     featureData.value.images = [store.getters.editData.featured_image_url]
     featureData.value.mediaName = store.getters.editData.featured_image_url
     contractLogoData.value.images = [store.getters.editData.contract_logo_url]
     contractLogoData.value.mediaName = store.getters.editData.contract_logo_url
     sliderImageData.value.images = [store.getters.editData.contract_slider_image_url]
     sliderImageData.value.mediaName = store.getters.editData.contract_slider_image_url
     galleryData.value.images = [store.getters.editData.gallery_urls]
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