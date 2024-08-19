<template>
    <DefaultCard :cardTitle="form.id ? `Edit Home Slider` : `Add Home Slider`">
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
                        <Accordion :open="true" header="Slider Text">
                            <div class="px-5 pt-2">
                                <div class="px-2">
                                    <TinyMCE v-model="form.slider_text" />
                                </div>
                                <InputError class="mt-2" :message="errors?.description" />
                                <span class="text-sm pl-2">Put Material Description.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Product Title & Product Url">
                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id="TitleTag" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.product_title" placeholder="" label="Title" />
                                <span class="">Enter your product title here.</span>

                            </div>
                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id="TitleTag" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.product_url" placeholder="" label="Link URL" />
                                <span class="">Enter the URL where the slider will link to.</span>
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
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Featured image">
                            <div class="px-6  h-auto ">
                                <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => imageData.featured_image.isOpen = true"> {{
                                        imageData.featured_image.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in imageData.featured_image.images" :key="file" :src="$filePath(file.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file?.alternative_text || 'image'">
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Home Slider Heading">
                            <div class="mt-2 px-6  h-auto">
                                <div>
                                    <div class="  mt-2 items-center text-gray-600 text-sm">
                                        <TextInput id="Product Title" type="text" class="block w-[180px] mr-2 h-[33px]"
                                            v-model="form.slider_product_title" placeholder="" label="Product Title" />
                                    </div>
                                    <div class="  mt-2 items-center text-gray-600 text-sm">
                                        <TextInput id="Button Text" type="text" class="block w-[180px] mr-2 h-[33px]"
                                            v-model="form.slider_button_text" placeholder="" label="Button Text" />
                                    </div>
                                    <div class="  mt-2 items-center text-gray-600 text-sm">
                                        <TextInput id="Button Link" type="text" class="block w-[180px] mr-2 h-[33px]"
                                            v-model="form.slider_button_link" placeholder=""
                                            label="Product Link / Button Link" />
                                    </div>
                                    <div class="py-4">
                                        <RadioButton v-for="option in withBgWithoutBg" :key="option.value"
                                            name="Visibility" :value="option.value" :label="option.label"
                                            :modelValue="iswithBg" @update:modelValue="iswithBg = $event" />
                                    </div>
                                    <div v-if="iswithBg" class="">
                                        <ColorPicker label="Select BG Color" v-model="form.slider_heading_bg" />
                                    </div>

                                </div>
                                <div class="">
                                    <ColorPicker label="Text Color" v-model="form.slider_text_color" />
                                </div>

                                <TextInput type="slider_font_size" class="block mr-2 mb-2 h-[40px] " placeholder=""
                                    label="Heading Font Size" v-model="form.slider_font_size" />

                                <div class="">
                                    <InputLabel for="HeadingCase" value="Heading Case" />
                                    <RadioButton v-for="option in capsNOCaps" :key="option.value" name="Visibility"
                                        :value="option.value" :label="option.label"
                                        :modelValue="form.slider_heading_case"
                                        @update:modelValue="form.slider_heading_case = $event" />
                                </div>
                                <TextInput type="text" class="block  mb-2 h-[40px] " placeholder=""
                                    label="Transparent %" v-model="form.slider_transparent" />
                                <div class="mt-2  flex h-auto">
                                    <Select :options="sliderMenu" showfield="name" class="w-full" :defaultZero='true'
                                        valueField="value" label="Select Menu Color" v-model="form.slider_menu_color" />
                                </div>
                                <div class="mt-3  flex h-auto">
                                    <div class="  h-auto w-full ">
                                         <div class="py-2 rounded-lg px-2 w-full border border-stroke"
                                           @click="() => imageData.slider_video_source.isOpen = true"> {{
                                          imageData.slider_video_source.mediaName }}</div>
                                </div>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>

        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="imageData.featured_image.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => { imageData.featured_image.isOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="imageData.slider_video_source.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="imageData.slider_video_source.images" :singleFile="true"
            :closeModal="() => { imageData.slider_video_source.isOpen = false }" :selectedFiles="handleVideoFiles" />
    </popupModal>

    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { handleFileUpdate  } from '@/helper/functions';
import { showToast } from '@/helper/functions'
import HomeSliderServices from '@/services/HomeSliderServices';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import RadioButton from '@/components/Admin-components/form-components/RadioButton.vue';
import { PublishOptions, trueFalse, withBgWithoutBg, capsNOCaps } from '@/json/data';
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

// Setup router and store
const router = useRouter();
const store = useStore();

// Reactive state
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || { status: '', slider_menu_color: '', visibility: '' });
const PreviousDomain = ref(null);

// Slider menu options
const sliderMenu = [
    { name: 'Light', value: 'light' },
    { name: 'Medium', value: 'medium' },
    { name: 'Dark', value: 'dark' },
    { name: 'Gray', value: 'gray' },
];

// Image Data Object
const imageData = ref({
    featured_image: { isOpen: false, mediaName: 'Feature Image', images: [] },
    slider_video_source : { isOpen: false, mediaName: 'Upload Video MP4', images: [] }
});

// Image Handlers  and true  for multiple file  and for  single file false 
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, false, imageData, form);
const handleVideoFiles = (data) => handleFileUpdate('slider_video_source', data,false, imageData, form);

// Validate form fields
const validateForm = () => {
    errors.value = {};
    if (!form.value.title) {
        errors.value.title = 'Title is required';
        return false;
    }
    return true;
};

// Submit form (add or edit slider)
const handleSubmit = async () => {
    if (!validateForm()) return; // Validate form fields
    delete form.value?.featured_image_url
    delete form.value?.slider_video_source_url
    
    loading.value = true;
    try {
        // Determine if editing or adding a new slider
        const isEditing = !!store.getters.editData;
        if (isEditing && form.value.domain_id !== PreviousDomain.value) {
            delete form.value.id;
        }
        const {created_at,deleted_at,updated_at, ...payload } = form.value
        const action = isEditing ? HomeSliderServices.editHomeSlider : HomeSliderServices.addHomeSlider;
        const res = await action(payload);

        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/home-slider');
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        loading.value = false;
    }
};

// Initialize component state
onMounted(() => {
    PreviousDomain.value = store.getters.getDomain?.id;
    if (store.getters.editData) {
        const { featured_image_url, slider_video_source_url } = store.getters.editData;
        imageData.value.featured_image.value = { images: [featured_image_url], mediaName: featured_image_url };
        imageData.value.slider_video_source.value = { images: [slider_video_source_url], mediaName: slider_video_source_url };
    }
});

// Watch for domain_id changes
watch(() => form.value.domain_id, async () => {
    // Perform necessary actions when domain_id changes
});
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