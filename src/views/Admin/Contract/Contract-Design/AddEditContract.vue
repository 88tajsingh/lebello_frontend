<template>
    <DefaultCard :cardTitle="form.id ? `Edit Contract` : `Add New Contract`">
        <DomainComponent @customChange="(id) => form.domain_id = id"></DomainComponent>
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
                                <TextInput id="MetaKeywords" :isTextarea="true" :='4' type="text"
                                    class="block w-[180px] mr-2 " v-model="form.seo_meta_keywords"
                                    placeholder="Meta Keywords" label="Meta Keywords" />
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
                                    @click="() => imageData.contract_slider_image.isOpen = true"> {{
                                        imageData.contract_slider_image.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in imageData.contract_slider_image.images" :key="file"
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
                                    @click="() => imageData.contract_logo.isOpen = true"> {{
                                        imageData.contract_logo.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">

                                    <img v-for="file in  imageData.contract_logo.images" :key="file"
                                        :src="$filePath(file.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file.alternative_text || 'image'">
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
                                    <InputLabel for="status" value="Status" />
                                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
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
                                <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => imageData.featured_image.isOpen = true"> {{
                                        imageData.featured_image.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in  imageData.featured_image.images" :key="file" :src="$filePath(file.file_url)"
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
                                        @click="() => imageData.gallery.isOpen = true"> {{
                                            imageData.gallery.mediaName }}</div>
                                    <div class=" mt-3 flex overflow-x-auto">
                                        <img v-for="file in imageData.gallery.images" :key="file"
                                            :src="$filePath(file.file_url)" class="inline-block w-auto h-34 mr-4"
                                            :alt="file.alternative_text || 'image'">
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
                                    valueField="value" label="Select Parent Material" v-model="form.simple_fields" />
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
                                        <ColorPicker label="Select BG Color" v-model="form.contract_title_color" />
                                    </div>

                                </div>
                                <div class="">
                                    <ColorPicker label="Text Color" v-model="form.sub_heading_text_color" />
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
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.featured_image.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => { imageData.featured_image.isOpen = false }"
            :selectedFiles="(data) => handleFileUpdate('featured_image', data)" />
    </popupModal>

    <!-- Gallery Image Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.gallery.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.gallery.images" :singleFile="false"
            :closeModal="() => { imageData.gallery.isOpen = false }"
            :selectedFiles="(data) => handleFileUpdate('gallery', data)" />
    </popupModal>

    <!-- Contract Logo Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.contract_logo.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.contract_logo.images" :singleFile="true"
            :closeModal="() => { imageData.contract_logo.isOpen = false }"
            :selectedFiles="(data) => handleFileUpdate('contract_logo', data)" />
    </popupModal>

    <!-- Slider Image Modal -->
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.contract_slider_image.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.contract_slider_image.images" :singleFile="true"
            :closeModal="() => { imageData.contract_slider_image.isOpen = false }"
            :selectedFiles="(data) => handleFileUpdate('contract_slider_image', data)" />
    </popupModal>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
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
import { PublishOptions, trueFalse, withBgWithoutBg, oldNewContract, capsNOCaps, productData } from '@/json/data';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// store and router
const router = useRouter();
const store = useStore();

// Reactive state
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || { status: '', simple_fields: false, description: '', visibility: '' });
const PreviousDomain = ref(null);
const contractLocation = ref([]);
const contractType  = ref([]);


// Image data for various categories
const imageData = ref({
    featured_image: { isOpen: false, mediaName: 'Feature Image', images: [] },
    gallery: { isOpen: false, mediaName: 'Gallery Image', images: [] },
    contract_logo: { isOpen: false, mediaName: 'Logo Image', images: [] },
    contract_slider_image: { isOpen: false, mediaName: 'Main Slider Image', images: [] }
});

// Handle file updates for different image types
const handleFileUpdate = (type, data) => {
    const { media_ids, mediaName } = handleFiles(data);
    imageData.value[type] = { isOpen: false, mediaName, images: data };
    form.value[`${type}`] = media_ids[0];
};

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

    loading.value = true;
    const { featured_image_url, ...payload } = form.value;
    if (payload.domain_id !== PreviousDomain.value) delete payload.id;

    try {
        const service = store.getters.editData ? ContractServices.editNewContract : ContractServices.addNewContract;
        const res = await service(payload);

        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/Contract-Design');
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        loading.value = false;
    }
};

// Fetch contract location and type data
const fetchContractData = async () => {
    contractLocation.value = await contractLoctionTreeList({ domain_id: store.getters.getDomain?.id });
    contractType.value = await contractTypeTreeList({ domain_id: store.getters.getDomain?.id });
};

// Initialize component state
onMounted(() => {
    PreviousDomain.value = store.getters.getDomain?.id;

    if (store.getters.editData) {
        const { featured_image_url, contract_logo_url, contract_slider_image_url, gallery_urls } = store.getters.editData;
        imageData.value.featured_image.images = [featured_image_url];
        imageData.value.featured_image.mediaName = featured_image_url;
        imageData.value.contract_logo.images = [contract_logo_url];
        imageData.value.contract_logo.mediaName = contract_logo_url;
        imageData.value.contract_slider_image.images = [contract_slider_image_url];
        imageData.value.contract_slider_image.mediaName = contract_slider_image_url;
        imageData.value.gallery.images = [gallery_urls];
    }
});

// Watch for domain_id changes to update contract data
watch(() => form.value.domain_id, fetchContractData);



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