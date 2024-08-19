<template>
    <DefaultCard :cardTitle="store.getters.editData ? `Edit Swatches` : `Add Swatches`">
        <DomainComponent @customChange="(id) => form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Title *">
                        <div class="px-7">
                            <TextInput type="text" id="addTitle" class="block mr-2 h-[40px] w-full" label=""
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title" :errors="errors"
                                :class="{ 'border-red': errors.title }" />
                            <!-- @update:checkValue="form.isTitle = $event" hasCheckBox -->

                        </div>
                    </Accordion>
                    <div class="mt-5">
                        <Accordion :open="true" header="Description">
                            <div class="px-5     pt-2">
                                <TinyMCE v-model="form.description" />
                                <span class="text-sm pl-2">Put Material Description.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-4">
                        <Accordion :open="true" header="Trade Mark Label">
                            <div class=" px-6">
                                <TextInput id="trade_mark_label" type="text" class="block w-full mr-2 h-[33px]"
                                    v-model="form.trade_mark_label" placeholder="Trade Mark Label" label="
                                " :message="errors?.trade_mark_label" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">
                        <Accordion :open="true" header="Material Options">
                            <div class="my-5 px-6 flex h-auto items-center">
                                <div class=" items-center text-gray-600 text-sm">
                                    <TextInput type="number" class="block w-[180px] mr-2 h-[33px]"
                                        v-model="form.material_term_key" placeholder="Term key" label="Term key"
                                        :message="errors.material_term_key" />
                                    <span>The material term id. This is generated from material taxonomy.
                                        Please do not make any changes here.
                                    </span>
                                </div>
                            </div>
                            <div class="px-6 items-center text-gray-600 text-sm">
                                <TextInput id="material_item" type="number" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.material_item" placeholder="Material item" label="Material item"
                                    :message="errors.material_item" />

                                <span>Put material taxonomy term id. Seperate with commas.</span>
                            </div>
                            <div class="px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id="material_group_name" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.material_group_name" placeholder="Group Name" label="Group Name" />
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
                                    class="block w-[180px] mr-2 " v-model="form.seo_meta_description"
                                    placeholder="Meta Description" label="Meta Description"
                                    :message="errors.seo_meta_description" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :='4' type="text"
                                    class="block w-[180px] mr-2 " v-model="form.seo_meta_keywords"
                                    placeholder="Meta Keywords" label="Meta Keywords"
                                    :message="errors.seo_meta_keywords" />
                                <span>Seperate each term with comma.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-5">

                    </div>
                    <div class="mt-5">
                        <Accordion open="false" header="Slug">
                            <div class="px-5 items-center text-gray-600 text-sm">
                                <TextInput id="slug" :rows=4 type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.slug" placeholder="Slug" label="" :message="errors.slug" />
                            </div>
                        </Accordion>
                    </div>
                </div>

                <div class="col-span-4">
                    <Accordion header="Publish" open="false">
                        <div class="px-1 py-3">
                            <div class="flex justify-between mb-2 px-2">
                                <div>
                                    <Button type="button" class=" text-sm ml-auto px-2 py-1">
                                        preview
                                    </Button>
                                </div>
                                <div>
                                    <Button type="submit" class=" text-sm ml-auto px-2 py-1">
                                        Save Draft
                                    </Button>
                                </div>
                            </div>
                            <div class="px-2">
                                <div>
                                    <InputLabel for="status" value="Status" />
                                    <Select :options="statusData" showfield="name" class="w-full" valueField="value"
                                        label="Select an option" v-model="form.status" />
                                </div>
                                <div class="col-span-1 w-full mt-2 ">
                                    <input-label for="parentOrder" value="Visibility" />
                                    <div class="flex items-center  gap-2">
                                        <RadioButton v-for="option in PublishOptions" :key="option.value"
                                            name="Visibility" :value="option.value" :label="option.label"
                                            :modelValue="form.visibility"
                                            @update:modelValue="form.visibility = $event" />
                                    </div>
                                    <div v-if="form.visibility === 'Password protected'" class="">
                                        <TextInput type="password" class="block mr-2 w-full" v-model="form.passowrd"
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
                        <Accordion :open="true" header="Materials Template">
                            <div class="mt-2 px-6 flex h-auto ">
                                <div class=" m-auto ">
                                    <singleCheckBox id="material_template" label="Use New Material Template"
                                        v-model:modelValue="form.material_template"></singleCheckBox>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Materials">
                            <div class="mt-2 px-6 flex h-auto ">
                                <div class="w-full">
                                    <Checkbox :nexted=true :checkedData="form.materials" :dropdown="true"
                                        valueField="id" showField="name" :data="MaterialTreeListData"
                                        @checked-items="handleCheckedItems" />
                                    <!-- <div v-else>sdfsdf</div> -->
                                </div>
                            </div>
                        </Accordion>
                    </div>

                    <!-- <div class="mt-3 ">
                        <Accordion :open="true" header="Tab Posiotion Options">
                            <div class="mt-2 px-6 flex h-auto ">
                            </div>
                        </Accordion>
                    </div> -->
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Swatches Options Material">
                            <div class="my-5 px-6  h-auto ">
                                <TextInput id="material_teaser_text" type="text" class="block w-full mr-2 h-[33px]"
                                    v-model="form.material_teaser_text" placeholder="" label="Material text overlay"
                                    :message="errors.material_teaser_text" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Featured image">
        <div class="my-5 px-6 h-auto">
            <InputLabel for="Featured_image" value="Featured_image" />
            <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => imageData.featured_image.IsOpen = true"> {{
                                        imageData.featured_image.mediaName }}</div>
            <div class="mt-3 flex overflow-x-auto">
                <img 
                    :src="$filePath(imageData.featured_image?.images[0]?.file_url)"
                    class="inline-block w-auto h-34 mr-4"
                    :alt="form.title"
                />
            </div>
        </div>
    </Accordion>
                    </div>
                </div>
            </div>

        </form>
    </DefaultCard>

    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="imageData.featured_image.IsOpen">
        <GetLibrary btnName="Select file" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="()=>imageData.featured_image.IsOpen=false" :selectedFiles="handleFeatureFiles" />
    </popupModal>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import { useRouter } from 'vue-router'; 
import { useStore } from 'vuex';
import { ref, onMounted, watch } from "vue";
import { showToast,handleFileUpdate  } from '@/helper/functions'
import { MaterialTreeList } from '@/helper/Apis';
import { PublishOptions, statusData } from '@/json/data';
import SwatchesServices from '@/services/SwatchesServices';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import singleCheckBox from '@/components/Admin-components/form-components/SingleCheck.vue'

// Store and Router
const store = useStore();
const router = useRouter();

// Reactive State
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || { status: null, description: ' ', material_template: false, materials: [] });
const PreviousDomain = ref(null);
const MaterialTreeListData = ref([]);
const imageData = ref({
    featured_image: { IsOpen: false, mediaName: ' Feature Media', images: [] }
});

// Image Handlers
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, false, imageData, form);

// Form Validation
const validateForm = () => {
    errors.value = {};
    if (!form.value.title) {
        errors.value.title = 'Title is required';
        return false;
    }
    return true;
};

const handleCheckedItems = (checkedItems) => {
    form.value = { ...form.value, materials: checkedItems }
};

// Submit Handler
const handleSubmit = async () => {
    if (validateForm()) {
        loading.value = true;
        try {
            const action = store.getters.editData ? SwatchesServices.editSwatches : SwatchesServices.addSwatches;
            if (form.value.domain_id !== PreviousDomain.value) delete form.value.id;
            const { deleted_at, created_at, updated_at, featured_image_url, ...payload } = form.value;
            const { status, data } = await action(payload);
            if (status === 200 && data.success) {
                showToast(`Swatches ${store.getters.editData ? 'edited' : 'added'} successfully`, 'success');
                store.dispatch('clearEditData');
                router.push('/swatches');
            } else {
                showToast('Something went wrong', 'error');
            }
        } catch (e) {
            console.error(`Error ${store.getters.editData ? 'editing' : 'adding'} swatches:`, e);
            showToast('Something went wrong', 'error');
        } finally {
            loading.value = false;
        }
    }
};

// Fetch Initial Data
const fetchMaterialTreeData = async () => {
    try {
        const domainId = store.getters.getDomain.id;
        MaterialTreeListData.value = await MaterialTreeList({ domain_id: domainId });
    } catch (e) {
        console.error('Error fetching material tree data:', e);
    }
};

// Lifecycle Hooks
onMounted(() => {
    PreviousDomain.value = store.getters.getDomain.id;
    fetchMaterialTreeData();
});

watch(
    () => form.value.domain_id,
    () => {
        fetchMaterialTreeData();
    }
);

</script>

<style>
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