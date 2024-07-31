<template>
    <DefaultCard :cardTitle="form.id ? `Edit Company` : `Add New Company`">
        <DomainComponent :domains="items" @customChange="(id) => form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Fileds">
                        <div class="px-6">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *"
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title"
                                :errors="errors" />
                        </div>
                    </Accordion>
                    <div class="mt-3  ">
                        <Accordion :open="true" header="Description">
                            <div class="mx-3">
                                <TinyMCE v-model="form.description" />
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
                </div>

                <div class="col-span-4">
                    <div class="">
                        <Accordion :open="true" header="Sub Title">
                            <div class="px-3">
                                <div class="mt-3">
                                    <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Sub title"
                                        placeholder="Put the company sub title" v-model="form.sub_title" />
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-4">
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
                                        <DatePicker v-model="form.publish" label="Publish Date"
                                            format="yyyy-mm-dd hh:mm:ss" dayjsFormat='YYYY-MM-DD HH:mm:ss'
                                            :use12-hour="false" />
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
                    </div>

                    <div class="mt-4">
                        <div class="mr-2 mt-3  h-auto ">
                            <div class="  h-auto ">
                                <InputLabel for="featured_image" value="Featured Image" />
                                <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => featured_image.isOpen = true"> {{
                                        featured_image.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in featured_image.images" :key="file"
                                        :src="$filePath(file.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="featured_image.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="featured_image.images" :singleFile="true"
            :closeModal="() => { featured_image.isOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>



    <Loader :isLoading="loading" :fullPage="true" />
</template>
<script setup>
import router from '@/router';
import { defineEmits } from 'vue';
import { ref, onMounted, watch } from "vue";
import { handleFiles } from '@/helper/functions';
import { showToast } from '@/helper/functions'
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import CompanyServices from '@/services/CompanyServices';
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import { PublishOptions, statusData, dealerTerritory, TemplateVersion, trueFalse } from '@/json/data';
import { useStore } from 'vuex';
const store = useStore();
const emit = defineEmits(['handleApi']);
const errors = ref({})
const loading = ref(false)
const form = ref(store.getters.editData || { status: '', visibility: '', });
const PreviousDomain = ref(null)
// images variables 
const featured_image = ref({
    isOpen: false,
    mediaName: 'Featured Image',
    images: []
})


// images functions 
const handleFeatureFiles = (data) => {
    const object = handleFiles(data);
    featured_image.value.isOpen = false
    featured_image.value.images = data;
    featured_image.value.mediaName = object.mediaName;
    form.value.featured_image = object.media_ids[0]
}


const handleSubmit = () => {
    delete form.value?.domain;
    if (validateForm()) {
        if (store.getters.editData === null)
            handleAddCompany({ ...form.value })
        else
            handleEditCompany({ ...form.value })
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
const handleAddCompany = async (payload) => {
    try {
        const res = await CompanyServices.addCompany(payload);
        console.log(res);
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/company');
        }
    } catch (e) {
        console.error('Error while adding Company:', e);
    } finally {
        loading.value = false;
    }
}


const handleEditCompany = async (payload) => {
    loading.value = true;
    if (form.value.domain_id !== PreviousDomain.value) {
        delete form.value.id;
    }
    // Remove specific keys from the payload
    const { deleted_at, created_at, updated_at, featured_image_url, ...refinedPayload } = form.value;
    try {
        console.log({ ...refinedPayload })
        const res = await CompanyServices.editCompany({ ...refinedPayload });
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            store.dispatch('clearEditData');
            router.push('/company');
        }
    } catch (e) {
        console.error('Error while editing Company:', e);
    } finally {
        loading.value = false;
    }
};


onMounted(() => {
    PreviousDomain.value = store.getters.getDomain.id
})
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