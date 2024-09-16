<template>
    {{ form }}
    <DefaultCard :cardTitle="form.id ? `Edit Company` : `Add New Company`">
        <DomainComponent @customChange="(id) => form.domain_id = id" :deleteService="CompanyServices.deleteCompany"
            masterKey="master_company_id" :masterDeleteService="CompanyServices.masterCompanySlugUpdate"
            routeTo="company" />
        <template v-if="form.id" v-slot:header>
            <MasterSlugForm :form="form" @update-slug="() => fetchMaterialSliderData()"
                :SlugUpdateservices='CompanyServices.masterCompanySlugUpdate' masteridKeyName='master_company_id' />
        </template>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Fileds">
                        <div class="px-6">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *"
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title" :errors="errors"
                                :hasCheckBox="checkBoxFlag"
                                @update:checkValue="(value) => { checkedFields.title = value }" />
                        </div>
                        <div class="px-6 mt-3">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug (Read Only)"
                                placeholder="Add title" v-model="form.slug" :errMessage="errors.slug" :errors="errors"
                                disabled />
                        </div>
                    </Accordion>
                    <div class="mt-3  ">
                        <Accordion :open="true" header="Description">
                            <div class="mx-3 flex">
                                <SingleCheck v-if="form.id" label="" v-model="checkedFields.description"></SingleCheck>
                                <TinyMCE v-model="form.description" />
                            </div>
                        </Accordion>
                    </div>

                    <div class="mt-5">
                        <Accordion :open="true" header="Seo Options">

                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id="seo_title" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.seo_title" placeholder="Title Tag" label="Title Tag"
                                    :message="errors.seo_title" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.seo_title = value }" />
                                <span>Custom title tag.</span>
                            </div>
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_description"
                                    placeholder="Meta Description" label="Meta Description"
                                    :message="errors.seo_meta_description" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.seo_meta_description = value }" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_keywords"
                                    placeholder="Meta Keywords" label="Meta Keywords"
                                    :message="errors.seo_meta_keywords" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.seo_meta_keywords = value }" />
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
                                        placeholder="Put the company sub title" v-model="form.sub_title"
                                        :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.sub_title = value }" />
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
                                            label="Select " v-model="form.status" :hasCheckBox="checkBoxFlag"
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
                    </div>

                    <div class="mt-4">
                        <div class="mr-2 mt-3  h-auto ">
                            <div class="  h-auto ">
                                <InputLabel for="featured_image" value="Featured Image" />
                                <div class=" flex  w-full h-auto ">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.featured_image">
                                    </SingleCheck>
                                    <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                        @click="() => imageData.featured_image.IsOpen = true"> {{
                                            imageData.featured_image.mediaName }}</div>
                                </div>

                                <div class="flex flex-col w-full">
                                    <div class=" mt-3 flex overflow-x-auto">
                                        <img v-if="imageData.featured_image.images[0]"
                                            v-for="file in imageData.featured_image.images" :key="file"
                                            :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                            :alt="file?.alternative_text || 'image'" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.featured_image.IsOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => { imageData.featured_image.IsOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>



    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from 'lodash';
import { ref, onMounted, computed, watch } from "vue";
import { showToast, handleFileUpdate, getGlobalUpdateData } from '@/helper/functions'
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import CompanyServices from '@/services/CompanyServices';
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import { PublishOptions, statusData } from '@/json/data';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { commonApiCalls } from '@/helper/Apis';

// store and router
const router = useRouter();
const store = useStore();
// Reactive state
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || { status: '', visibility: '' });
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))

// State for featured image handling
const imageData = ref({
    featured_image: { IsOpen: false, mediaName: 'Select Feature Media', images: [] },
})

const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, false, imageData, form);

// Validate form data
const validateForm = () => {
    errors.value = {};
    if (!form.value.title) {
        errors.value.title = 'Title is required';
        return false;
    }
    return true;
};

// const handleSubmit = async () => {
//     if (!validateForm()) return
//     const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
//     // hasCheckedFields ? handleGlobalUpdate() : handleAddEditApi()
// }

// Submit form data (add or edit company)
const handleSubmit = async () => {
    if (!validateForm()) return
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)

    loading.value = true;
    const { slug, domains_data, featured_image_data, default_domain, featured_image_url, ...payload } = form.value;
    if (!form.value?.domains_data?.includes(form.value.domain_id)) {
        delete payload.id;
    }

    try {
        const service = store.getters.editData ? CompanyServices.editCompany : CompanyServices.addCompany;
        const res = await service(payload);

        if (res.status === 200 && res.data.success) {
            store.dispatch('clearEditData');
            if (hasCheckedFields) {
                handleGlobalUpdate();
            }
            else {
                showToast(res.data.message, 'success');
                router.push('/company');
            }
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
        master_company_id: form.value.master_company_id,
        global_keys: globalUpdate
    }

    try {
        const { status, data } = await CompanyServices.globalCompanyUpdate(payload)
        status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
        if (status === 200 && data.success) router.push('/company')
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
    } finally {
        loading.value = false
    }
}


// Fetch Perticular Domain Data
const fetchMaterialSliderData = async () => {
    loading.value = true
    const payload = { master_company_id: form.value.master_company_id, domain_id: form.value.domain_id }
    try {
        const { status, data } = await CompanyServices.getCompany(payload)
        if (status === 200 && data.success) {
            const dataValue = data.data[0]
            store.dispatch('setEdit', dataValue)
            Object.assign(form.value, dataValue)
        }
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error('Error while fetching data:', error)
    }
    finally {
        loading.value = false;
    }
}

// Set  on component mount
onMounted(() => {
    if (store.getters.editData) {
        imageData.value.featured_image.images = [store.getters.editData?.featured_image_data];
        imageData.value.featured_image.mediaName = store.getters.editData?.featured_image_data.file_url;

    }
});


watch(() => form.value.domain_id, (newDomainId) => {
    // Check if newDomainId is present in domains_data and fetch 
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchMaterialSliderData();
    } else {
        console.log('data not in array', form.value?.domains_data);
    }
});

// Computed Property
const buttonText = computed(() => {
    return (form.value.id ? 'Update' : 'Submit')
})
</script>

<style scoped></style>