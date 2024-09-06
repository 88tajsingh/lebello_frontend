<template>
    <DefaultCard :cardTitle="form.id ? `Edit Contract` : `Add New Contract`">
        
        <!-- domain select delete master delete  -->
        <DomainComponent @customChange="(id) => form.domain_id = id" :deleteService="ContractServices.deleteNewContract"
            masterKey="master_contract_design_id" :masterDeleteService="ContractServices.deleteMasterContractDesign"
            routeTo="Contract-Design"></DomainComponent>
        <!-- slug update  -->
        <template v-if="form.id" v-slot:header>
            <MasterSlugForm :form="form" @update-slug="fetchDomainContractData"
                :SlugUpdateservices="ContractServices.masterContractDesignSlugUpdate"
                masteridKeyName="master_contract_design_id" />
        </template>

        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    
                    <div>
                        <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title" placeholder="Add title"
                            v-model="form.title" :errMessage="errors.title" :errors="errors" :hasCheckBox="checkBoxFlag"
                            @update:checkValue="value => checkedFields.title = value" />
                        <div class="mt-3">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug (Read Only)"
                                placeholder="Slug" disabled="true" v-model="form.slug" :errMessage="errors.slug" />
                        </div>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Description">
                            <div class="px-5 pt-2">
                                <div class="px-2 flex w-full">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.description">
                                    </SingleCheck>
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
                                    v-model="form.seo_title_tag" placeholder="Title Tag" label="Title Tag"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.seo_title_tag = value" />
                                <span>Custom title tag.</span>
                            </div>
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.seo_meta_description"
                                    placeholder="Meta Description" label="Meta Description"
                                    :message="errors.seo_meta_description" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.seo_meta_description = value" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="MetaKeywords" :isTextarea="true" :='4' type="text"
                                    class="block w-[180px] mr-2 " v-model="form.seo_meta_keywords"
                                    placeholder="Meta Keywords" label="Meta Keywords" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.seo_meta_keywords = value" />
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
                                        Select  option to show this contract on contract home slide section.
                                    </span>
                                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                        label="Select an option" v-model="form.contract_home_page_slide" 
                                        :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.contract_home_page_slide = value"/>
                                </div>
                                <TextInput id="TitleBackground" type="text" class="block w-full mr-2 mb-2 h-[33px]"
                                    v-model="form.contract_background_title" placeholder="" label="Title Background		
                          " :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.contract_background_title = value" />

                                <ColorPicker v-model="form.contract_title_color" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.contract_title_color = value" />

                                <TextInput id="LocationBackground	" type="text" class="block w-full mb-2 mr-2 h-[33px]"
                                    v-model="form.contract_location_background" placeholder="" label="Location Background			
                          " :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.contract_location_background = value" />

                                <TextInput id="LocationColor" type="text" class="block w-full mr-2 mb-2 h-[33px]"
                                    v-model="form.contract_location_color" placeholder="" label="Location Color			
                          " :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.contract_location_color = value" />


                                <div class="flex flex-col w-full">
                                    <InputLabel for="SliderImage" value="SliderImage" />
                                    <div class=" flex  w-full h-auto ">
                                        <SingleCheck v-if="form.id" label=""
                                            v-model="checkedFields.contract_slider_image">
                                        </SingleCheck>
                                        <div class="py-2 rounded-lg w-full mb-2 px-2 border border-stroke"
                                            @click="() => imageData.contract_slider_image.isOpen = true"> {{
                                                imageData.contract_slider_image.mediaName }}</div>
                                    </div>
                                </div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-if="imageData.contract_slider_image.images[0]"
                                        v-for="file in imageData.contract_slider_image.images" :key="file"
                                        :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file?.alternative_text || 'image'">
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Contract Logo">
                            <div class=" px-6  h-auto ">
                                <div class=" flex  w-full h-auto ">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.contract_logo">
                                    </SingleCheck>
                                    <div class="py-2 rounded-lg w-full mb-2 px-2 border border-stroke"
                                        @click="() => imageData.contract_logo.isOpen = true"> {{
                                            imageData.contract_logo.mediaName }}</div>
                                </div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-if="imageData.contract_logo.images[0]"
                                        v-for="file in imageData.contract_logo.images" :key="file"
                                        :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file?.alternative_text || 'image'">
                                </div>
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
                                    <InputLabel for="statu1s" value="Status" />
                                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                        label="Select Status" v-model="form.status" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="value => checkedFields.status = value" />
                                </div>
                            </div>
                        </div>
                        <div class="bg-[#f6f7f7] flex py-3">
                            <Button type="submit" bg_th_color="text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                                class=" text-sm ml-auto px-3 py-2">
                                {{buttonText}}
                            </Button>
                        </div>
                    </Accordion>

                    <div class="mt-3 ">
                        <Accordion :open="true" header="Contract Information">
                            <div class="px-6 h-auto ">
                                <TextInput id="Location" type="text" class="block w-[180px] mr-2  h-[33px]"
                                    v-model="form.contract_info_location" placeholder="Location" label="Location"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.contract_info_location = value" />
                                <p class="mb-1">Put the contract location.</p>

                                <TextInput id="Designer" type="text" class="block w-[180px] mr-2 mb-1 h-[33px]"
                                    v-model="form.contract_info_designer" placeholder="Designer" label="Designer"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.contract_info_designer = value" />
                                <p class="mb-1">Put the designer name here.</p>

                                <TextInput id="Client" type="text" class="block mb-1 w-[180px] mr-2 h-[33px]"
                                    v-model="form.contract_info_client" placeholder="Client" label="Client"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.contract_info_client = value" />
                                <p class="mb-1">Put the client name here.</p>

                                <TextInput id="Project " type="text" class="block mb-1 w-[180px] mr-2 h-[33px]"
                                    v-model="form.contract_info_project_link" placeholder="Project Link"
                                    label="Project Link " :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.contract_info_project_link = value" />
                                <p class="mb-1">Put the project link URL here. Do not start with 'http://'. Example:
                                    projectlink.com</p>

                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Featured Option">
                            <div class="mt-2 px-6  h-auto ">
                                <p>
                                   Select an option yes, it will be displayed
                                    at the top of
                                    'Contract Design' page
                                </p>
                                <Select :options="trueFalse" showfield="name" class="w-full" valueField="value" label="Select an option"
                                    v-model="form.featured_option" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.featured_option = value" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Contract Type">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :dropdown="true" valueField="id" showField="contract_name"
                                    :checkedData='form.contract_type' :data="contractType"
                                    @checked-items="(checked) => { form.contract_type = checked }" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Contract Location">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.contract_location' :dropdown="true"
                                    valueField="id" showField="contract_location" :data="contractLocation"
                                    @checked-items="(checked) => form.contract_location = checked" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Featured image">
                            <div class="px-6  h-auto ">
                                <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                <div class=" flex  w-full h-auto ">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.featured_image">
                                    </SingleCheck>
                                    <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                        @click="() => imageData.featured_image.isOpen = true"> {{
                                            imageData.featured_image.mediaName }}</div>
                                </div>
                                <div class=" mt-3 flex overflow-x-auto">

                                    <img v-if="imageData.featured_image.images[0]"
                                        v-for="file in imageData.featured_image.images" :key="file"
                                        :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file?.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                        </Accordion>
                        <div class="mt-4">
                            <Accordion :open="true" header="Gallery">
                                <div class="px-6  h-auto ">
                                    <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                    <div class=" flex  w-full h-auto ">
                                        <SingleCheck v-if="form.id" label="" v-model="checkedFields.gallery">
                                        </SingleCheck>
                                        <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                            @click="() => imageData.gallery.isOpen = true"> {{
                                                imageData.gallery.mediaName }}</div>
                                    </div>
                                    <div class=" mt-3 flex overflow-x-auto">
                                        <img v-for="file in imageData.gallery.images" :key="file"
                                            :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                            :alt="file?.alternative_text || 'image'">
                                    </div>
                                    <InputError class="mt-2" :message="errors?.featured_image" />
                                </div>
                            </Accordion>
                        </div>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Simple Fields">
                            <div class="mt-2 px-6 flex h-auto">
                                <Select :options="options" showfield="name" class="w-full" :defaultZero='true'
                                    valueField="value" label="Select Parent Material" v-model="form.simple_fields"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.simple_fields = value" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Sub Heading Settings">
                            <div class="mt-2 px-6  h-auto">
                                <div>
                                    <div class="my-3">
                                        <RadioButton v-for="option in withBgWithoutBg" :key="option.value"
                                            name="Visibility" :value="option.value" :label="option.label"
                                            :modelValue="iswithBg" @update:modelValue="iswithBg = $event" />
                                    </div>
                                    <div v-if="iswithBg" class="">
                                        <ColorPicker label="Select BG Color" v-model="form.contract_title_color"
                                            :hasCheckBox="checkBoxFlag"
                                            @update:checkValue="value => checkedFields.contract_title_color = value" />
                                    </div>

                                </div>
                                <div class="my-3">
                                    <ColorPicker label="Text Color" v-model="form.sub_heading_text_color"
                                        :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="value => checkedFields.sub_heading_text_color = value" />
                                </div>

                                <TextInput type="text" class="block mr-2 mb-2 h-[40px] " placeholder=""
                                    label="Heading Font Size" v-model="form.heading_font_size"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.heading_font_size = value" />

                                <div class="my-3">
                                    <InputLabel for="-HeadingCase" value="Heading Case" />
                                    <div class='flex gap-3'>
                                        <SingleCheck v-if="form.id" label="" v-model="checkedFields.contract_design">
                                        </SingleCheck>
                                        <RadioButton v-for="option in capsNOCaps" :key="option.value" name="Visibility"
                                        :value="option.value" :label="option.label" :modelValue="form.contract_design"
                                        @update:modelValue="form.contract_design = $event" />
                                    </div>
                                </div>
                                <TextInput type="text" class="block mr-2 mb-2 h-[40px] " placeholder=""
                                    label="Transparent %" v-model="form.heading_transparent_percentage"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="value => checkedFields.heading_transparent_percentage = value" />
                            </div>
                        </Accordion>
                    </div>

                    <!-- <div class="mt-5">
                        <Accordion :open="true" header="Contract design">
                            <div class="mt-2 px-6 flex h-auto">
                                <div class="">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.contract_design">
                                    </SingleCheck>
                                    <RadioButton v-for="option in oldNewContract" :key="option.value" name="Visibility"
                                        :value="option.value" :label="option.label" :modelValue="form.contract_design"
                                        @update:modelValue="form.contract_design = $event" />
                                </div>
                            </div>
                        </Accordion>
                    </div> -->
                </div>
            </div>

        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.featured_image.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => { imageData.featured_image.isOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>

    <!-- Gallery Image Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.gallery.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.gallery.images" :singleFile="false"
            :closeModal="() => { imageData.gallery.isOpen = false }" :selectedFiles="handlegalleryFiles" />
    </popupModal>

    <!-- Contract Logo Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.contract_logo.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.contract_logo.images" :singleFile="true"
            :closeModal="() => { imageData.contract_logo.isOpen = false }" :selectedFiles="handleContractLogoFiles" />
    </popupModal>

    <!-- Slider Image Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.contract_slider_image.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.contract_slider_image.images"
            :singleFile="true" :closeModal="() => { imageData.contract_slider_image.isOpen = false }"
            :selectedFiles="handleContractSliderImageFiles" />
    </popupModal>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from 'lodash';
import { ref, onMounted, watch, computed } from "vue";
import { showToast, getGlobalUpdateData, handleFileUpdate } from '@/helper/functions'
import ContractServices from '@/services/ContractServices';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import { contractLoctionTreeList, contractTypeTreeList } from '@/helper/Apis'
import RadioButton from '@/components/Admin-components/form-components/RadioButton.vue';
import { trueFalse, withBgWithoutBg, oldNewContract, capsNOCaps, productData } from '@/json/data';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// store and router
const router = useRouter();
const store = useStore();

// Reactive state
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || { status: '', simple_fields: false, description: '', contract_home_page_slide: 0 });
const PreviousDomain = ref(null);
const contractLocation = ref([]);
const contractType = ref([]);
const checkedFields = ref({})
const iswithBg = ref()
const checkBoxFlag = ref(Boolean(form.value.id))


// Image data for various categories
const imageData = ref({
    featured_image: { isOpen: false, mediaName: 'Feature Image', images: [] },
    gallery: { isOpen: false, mediaName: 'Gallery Image', images: [] },
    contract_logo: { isOpen: false, mediaName: 'Logo Image', images: [] },
    contract_slider_image: { isOpen: false, mediaName: 'Main Slider Image', images: [] }
});

// Handle file updates for different image types
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, false, imageData, form);
const handlegalleryFiles = (data) => handleFileUpdate('gallery', data, true, imageData, form);
const handleContractLogoFiles = (data) => handleFileUpdate('contract_logo', data, false, imageData, form);
const handleContractSliderImageFiles = (data) => handleFileUpdate('contract_slider_image', data, false, imageData, form);


// Validate form fields
const validateForm = () => {
    errors.value = {};
    if (!form.value.title) {
        errors.value.title = 'Title is required';
        return false;
    }
    return true;
};



// Handle form submission (add or edit contract)
const handleSubmit = async () => {
    if (!validateForm()) return;
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
    loading.value = true;
    const { featured_image_data, slug, domains_data, contract_logo_data, contract_slider_image_data, default_domain, gallery_urls, contract_location_data, contract_type_data, ...payload } = form.value;
    if (!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id;

    try {
        const service = store.getters.editData ? ContractServices.editNewContract : ContractServices.addNewContract;
        const res = await service(payload);

        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            if(hasCheckedFields){
                handleGlobalUpdate();
            }
            else
            router.push('/Contract-Design');
        
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        loading.value = false;
    }
};

// Global Update Handler
const handleGlobalUpdate = async () => {
    const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
    if (_.isEmpty(globalUpdate)) return

    const payload = {
        master_contract_design_id: form.value.master_contract_design_id,
        global_keys: globalUpdate
    }

    try {
        const { status, data } = await ContractServices.globalContractDesignUpdate(payload)
        status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
        if (status === 200 && data.success) router.push('/Contract-Design')
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
    } finally {
        loading.value = false
    }
}

// Fetch Perticular Domain Data
const fetchDomainContractData = async () => {
    loading.value = true
    const payload = { master_contract_design_id: form.value.master_contract_design_id, domain_id: form.value.domain_id }
    try {
        const { status, data } = await ContractServices.getNewContract(payload)
        if (status === 200 && data.success) {
            const dataValue = data.data[0]
            store.dispatch('setEdit', dataValue)
            Object.assign(form.value, dataValue)
        }
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error('Error while fetching data:', error)
    }
    finally{
        loading.value = false;
    }
}

// Fetch contract location and type data
const fetchContractData = async () => {
    contractLocation.value = await contractLoctionTreeList({ domain_id: store.getters.getDomain?.id });
    contractType.value = await contractTypeTreeList({ domain_id: store.getters.getDomain?.id });
};

// Initialize component state
onMounted(() => {
    if (store.getters.editData) {
        const { featured_image_data, contract_logo_data, contract_slider_image_data, gallery_urls } = store.getters.editData;
        console.log(contract_slider_image_data)
        imageData.value.featured_image.images = [featured_image_data];
        imageData.value.featured_image.mediaName = featured_image_data?.file_url || 'featured images';
        imageData.value.contract_logo.images = [contract_logo_data];
        imageData.value.contract_logo.mediaName = contract_logo_data?.file_url || 'Contract logo image';
        imageData.value.contract_slider_image.images = [contract_slider_image_data];
        imageData.value.contract_slider_image.mediaName = contract_slider_image_data?.file_url || 'Slider image';;
        imageData.value.gallery.images = gallery_urls;
        imageData.value.gallery.mediaName = gallery_urls?.map(item => item.file_url).join(', ') || 'Gallery images';

    }
});

// Watch for domain_id changes to update contract data
watch(() => form.value.domain_id, fetchContractData);
watch(() => form.value.domain_id, (newDomainId) => {
    // Fetch product type tree and reset parent product type
    fetchContractData({ domain_id: form.value.domain_id });

    // Check if newDomainId is present in domains_data and fetch product type data if so
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchDomainContractData();
    } else {
        console.log('data not in array', form.value?.domains_data);
    }
});
// Computed Property
const buttonText = computed(() => {
    return (form.value.id ? 'Update' : 'Submit')
})
</script>