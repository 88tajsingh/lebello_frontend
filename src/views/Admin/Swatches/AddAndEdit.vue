<template>
    <DefaultCard :cardTitle="store.getters.editData ? `Edit Swatches` : `Add Swatches`">
        <DomainComponent @customChange="(id) => form.domain_id = id" @domainArray="(array) => form.domain_all = array"
            :deleteService="SwatchesServices.deleteSwatches" masterKey="master_swatch_id"
            :masterDeleteService="SwatchesServices.deleteMasterSwatch" routeTo="swatches">
        </DomainComponent>
        <template v-if="form.id" v-slot:header>
            <MasterSlugForm :form="form" @update-slug="() => fetchSwatchData()"
                :SlugUpdateservices='SwatchesServices.masterSwatchesSlugUpdate' masteridKeyName='master_swatch_id' />
        </template>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Title *">
                        <div class="px-7">
                            <TextInput type="text" id="addTitle" class="block mr-2 h-[40px] w-full" label=""
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title" :errors="errors"
                                @update:modelValue="$clearError(errors, 'title')" :hasCheckBox="checkBoxFlag"
                                @update:checkValue="(value) => { checkedFields.title = value }" />

                        </div>
                    </Accordion>
                    <div class="mt-5 ">
                        <Accordion :open="true" header="Description">
                            <div class="px-3 pt-2 flex">
                                <SingleCheck v-if="form.id" label="" v-model="checkedFields.description"></SingleCheck>
                                <div class="w-full">
                                    <TinyMCE v-model="form.description" />
                                    <span class="text-sm pl-2">The material term id. This is generated from material
                                        taxonomy.
                                        Please do not make any changes here.</span>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5 ">
                        <Accordion :open="true" header=" Material teaser text ">
                            <div class="px-3 pt-2 flex">
                                <SingleCheck v-if="form.id" label="" v-model="checkedFields.material_text_overlay">
                                </SingleCheck>
                                <div class="w-full">
                                    <TinyMCE v-model="form.material_text_overlay" />
                                    <span class="text-sm pl-2">Put Material Description.</span>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-4">
                        <Accordion :open="true" header="Trade Mark Label">
                            <div class=" px-6">
                                <TextInput id="trade_mark_label" type="text" class="block w-full mr-2 h-[33px]"
                                    v-model="form.trade_mark_label" placeholder="Trade Mark Label" label="
                                " :message="errors?.trade_mark_label" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.trade_mark_label = value }" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <CommonSection header="Material Options" :form="form" :fields="materialOptionsFields"
                            :hasCheckBox="checkBoxFlag" :checkedFields="checkedFields" />
                    </div>
                    <div class="mt-5">
                        <CommonSection :form="form" :fields="swatchSeoFields" :hasCheckBox="checkBoxFlag"
                            :checkedFields="checkedFields" />
                    </div>
                    <div class="mt-5">
                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Slug (Read Only)">
                            <div class="px-5 items-center text-gray-600 text-sm">
                                <TextInput id="slug" :rows=4 type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.slug" placeholder="Slug " label="" :message="errors.slug" disabled />
                            </div>
                        </Accordion>
                    </div>
                </div>
                <div class="col-span-4">
                    <PublishAccordion header="Publish" :="false" :options="statusData" :form="form"
                        :hasCheckBox="checkBoxFlag" :onSubmitHandler="handleSubmit" :checkedFields="checkedFields" />
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Materials Template">
                            <div class="mt-2 px-6 flex h-auto ">
                                <div class=" m-auto ">
                                    <SingleCheck id="material_template" label="Use New Material Template"
                                        v-model:modelValue="form.material_template"></SingleCheck>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Materials">
                            <div class="mt-2 px-6 flex h-auto ">
                                <div class="w-full">

                                    <SingleCheck v-if="form.id" label="Select for global update"
                                        v-model="checkedFields.materials"></SingleCheck>
                                    <Checkbox :nexted=true :checkedData="form.materials" :dropdown="true"
                                        valueField="id" showField="name" :data="MaterialTreeListData"
                                        @checked-items="handleCheckedItems" />
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Swatches Options Material">
                            <div class="my-5 px-6  h-auto ">
                                <TextInput id="material_teaser_text" type="text" class="block w-full mr-2 h-[33px]"
                                    v-model="form.material_teaser_text" placeholder="" label="Material text overlay"
                                    :message="errors.material_teaser_text" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.material_teaser_text = value }" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Featured image">
                            <div class="my-5 px-6 h-auto">
                                <InputLabel for="Featured_image" value="Featured_image" />
                                <div class=" flex  w-full h-auto ">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.featured_image">
                                    </SingleCheck>
                                    <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                        @click="() => imageData.featured_image.IsOpen = true"> {{
                                            imageData.featured_image.mediaName }}</div>
                                </div>
                                <div class="mt-3 flex overflow-x-auto">
                                    <img v-if="imageData.featured_image?.images[0]?.file_url"
                                        :src="$filePath(imageData.featured_image?.images[0]?.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="form.title" />
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>

        </form>
    </DefaultCard>

    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.featured_image.IsOpen">
        <GetLibrary btnName="Select file" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => imageData.featured_image.IsOpen = false" :selectedFiles="handleFeatureFiles" />
    </popupModal>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from 'lodash';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { useStore } from 'vuex';
import { ref, onMounted, watch, computed } from "vue";
import { showToast, handleFileUpdate, getGlobalUpdateData } from '@/helper/functions'
import { MaterialTreeList } from '@/helper/Apis';
import { statusData } from '@/json/data';
import { materialOptionsFields, swatchSeoFields } from '@/json/fields';
import SwatchesServices from '@/services/SwatchesServices';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import SingleCheck from '@/components/Admin-components/form-components/SingleCheck.vue'
import PublishAccordion from '@/components/Admin-components/common/PublishAccordion.vue';
import CommonSection from '@/components/Admin-components/common/CommonSection.vue';
// Store and Router
const store = useStore();
const router = useRouter();

// Reactive State
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || { status: 1, description: ' ', material_template: false, materials: [] });
const MaterialTreeListData = ref([]);
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))

// image data
const imageData = ref({
    featured_image: { IsOpen: false, mediaName: ' Feature Media', images: [] }
});

// Image Handlers
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, imageData, form, false);

// Form Validation
const validateForm = () => {
    errors.value = {};
    if (!form.value.title) {
        errors.value.title = 'Title is required';
        return false;
    }
    if (form.value.status === null || form.value.status === undefined || form.value.status === '') {
        errors.value.status = 'Please select status';
        return false;
    }
    return true;
};

const handleCheckedItems = (checkedItems) => {
    form.value = { ...form.value, materials: checkedItems }
};

// Submit Handler
const handleSubmit = async () => {
    if (!validateForm()) return
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
    !form.value.domain_all && delete form.value.domain_all
    loading.value = true;
    try {
        const action = store.getters.editData ? SwatchesServices.editSwatches : SwatchesServices.addSwatches;
        const { deleted_at, domain, created_at, updated_at, featured_image_url, ...payload } = form.value;
        if (!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id
        const { status, data } = await action(payload);
        if (status === 200 && data.success) {
            if (hasCheckedFields) {
                handleGlobalUpdate();
            }
            else {
                showToast(data.message, 'success');
                store.dispatch('clearEditData');
                router.push('/swatches');
            }
        }
        else if (status === 400 || status === 403) {
            showToast(data.message, 'error');
        }
    } catch (e) {
        console.error(`Error ${store.getters.editData ? 'editing' : 'adding'} swatches:`, e);
        showToast(e, 'error');
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
        master_swatch_id: form.value.master_swatch_id,
        global_keys: globalUpdate
    }

    try {
        const { status, data } = await SwatchesServices.globalSwatchDataUpdate(payload)
        status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
        if (status === 200 && data.success) router.push('/swatches')
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
    } finally {
        loading.value = false
    }
}


// Fetch Perticular Domain Data
const fetchSwatchData = async () => {
    loading.value = true
    const payload = { master_swatch_id: form.value.master_swatch_id, domain_id: form.value.domain_id }
    try {
        const { status, data } = await SwatchesServices.getSwatches(payload)
        if (status === 200 && data.success) {
            const dataValue = data.data[0]
            store.dispatch('setEdit', dataValue)
            Object.assign(form.value, dataValue)
            loading.value = false
        }
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error('Error while fetching data:', error)
        loading.value = false
    }
    finally {
        loading.value = false;
    }
}

// Fetch Initial Data
const fetchMaterialTreeData = async (payload) => {
    try {
        MaterialTreeListData.value = await MaterialTreeList({ domain_id: payload });
    } catch (e) {
        console.error('Error fetching material tree data:', e);
    }
};

// Lifecycle Hooks
onMounted(() => {
    if (store?.getters?.editData) {
        imageData.value.featured_image.mediaName = store.getters?.editData?.featured_image_data?.file_url || 'Select Featured Image';
        imageData.value.featured_image.images = [store.getters?.editData?.featured_image_data];
        fetchMaterialTreeData(store?.getters?.editData.domain_id);

    }
});

// Check if domain_id is present in domains_data and fetch  data if so
watch(() => form.value.domain_id, (newDomainId) => {
    console.log("called watch")
    fetchMaterialTreeData(newDomainId);
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchSwatchData();
    }
});

// Computed Property
const buttonText = computed(() => {
    return (form.value.id ? 'Update' : 'Submit')
})

onBeforeRouteLeave((to, from, next) => {
    store.dispatch('clearEditData');
    next();
});
</script>