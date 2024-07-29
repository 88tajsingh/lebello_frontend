<template>{{ form }}
    <DefaultCard :cardTitle="id ? `Edit Designer` : `Add New Designer`">
        <DomainComponent :domains="items" @customChange="(id) => form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Fileds">
                    <div class="px-6">
                        <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *" placeholder="Add title"
                            v-model="form.title" :errMessage="errors.title" :errors="errors" />
                      
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug" placeholder="slug"
                            v-model="form.slug"  />

                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Product Url" placeholder=""
                            v-model="form.product_url" />

                            <div class="mr-2 mt-5 h-auto ">
                                <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => productData.isOpen = true"> {{
                                        productData.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in productData.images" :key="file" :src="$filePath(file.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                    </div>
                    </Accordion>
                    <div class="mt-5">
                        <Accordion :open="true" header="Description">
                            <div class="px-5 pt-2">
                                    <TinyMCE v-model="form.description" />
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
                                        label="Select " v-model="form.status" />
                                </div>
                                <div class="col-span-1 w-full">
                                    <div class="flex flex-col ">
                                    <InputLabel for="Visibility" value="Visibility" />
                                    <Select :options="PublishOptions" showfield="label" class="w-full" valueField="value"
                                        label="Select " v-model="form.visibility" />
                                </div>
                                    <div v-if="form.visibility === 'Password protected'" class="mt-2">
                                        <TextInput type="password" label="Password" class="block mr-2 w-full" v-model="form.password"
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
                        <Accordion :open="true" header="Tags">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.tags' :dropdown="true"
                                    valueField="id" showField="name" :data="productType"
                                    @checked-items="(checked) => form.tags = checked" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Product Category Type">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.product_category_types' :dropdown="true"
                                    valueField="id" showField="name" :data="ProductCategory"
                                    @checked-items="(checked) => form.product_category_types = checked" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Product Type">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.product_types' :dropdown="true"
                                    valueField="id" showField="name" :data="productType"
                                    @checked-items="(checked) => form.product_types = checked" />
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
                    </div>
                </div>
            </div>

        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="featureData.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="featureData.images" :singleFile="true"
            :closeModal="() => { featureData.isOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="productData.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="productData.images" :singleFile="true"
            :closeModal="() => { productData.isOpen = false }" :selectedFiles="handlePropductFiles" />
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
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import { getProductCategoryTypeTree,getProductTypeTree } from '@/helper/Apis'
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import DesignerServices from '@/services/DesignerServices';
import { PublishOptions, statusData } from '@/json/data';
import { useStore } from 'vuex';

const store = useStore();

const emit = defineEmits(['handleApi']);
const errors = ref({})
const ProductCategory = ref([]);
const productType = ref([]);
const loading = ref(false)
const form = ref({ status: '',visibility:'' });
const PreviousDomain = ref(null)
const masterId = ref(null)

// images variables 
const featureData = ref({
    isOpen: false,
    mediaName: 'feature Image',
    images: []
})

const productData = ref({
    isOpen: false,
    mediaName: 'Upload Product Image ',
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
const handlePropductFiles = (data) => {
    const object = handleFiles(data);
    productData.value.isOpen = false
    productData.value.images = data;
    productData.value.mediaName = object.mediaName;
    form.value.product_image = object.media_ids[0]
}


const handleSubmit = () => {
    delete form.value?.domain;
    if (validateForm()) {
        if (props.id !== null)
            handleEditDesigner({ ...form.value })
        else
            handleAddDesigner({ ...form.value })
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

// api calls 
const handleGetDesigner = async (payload) => {
    try {
        const res = await DesignerServices.getDesigners(payload);
        if (res.status === 200 && res.data.success) {
            if (res.data.data?.length > 0) {
                form.value = res.data.data[0]
                PreviousDomain.value = form.value.domain_id;
                masterId.value = form.value.master_project_id;
            }
        }
    } catch (e) {
        console.error('Error while getting Project:', e);
    }
}

const handleAddDesigner = async (payload) => {
    try {
        const res = await DesignerServices.addDesigners(payload);
        console.log(res);
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/designer');
        }
    } catch (e) {
        console.error('Error while adding Project:', e);
    } finally {
        loading.value = false;
    }
}

const handleEditDesigner = async (payload) => {
    loading.value = true;

    if (form.value.domain_id !== PreviousDomain.value) {
        delete form.value.id;
    } else {
        // clone existing  in other domain 
        form.value = { ...form.value, master_project_id: masterId.value };
    }
    try {
        const res = await DesignerServices.editDesigners({ ...form.value });
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/designer');
        }
    } catch (e) {
        console.error('Error while editing Project:', e);
    } finally {
        loading.value = false;
    }
}

// productCategoryTree sorting 
const productCategoryTree = async (payload) => {
    productType.value = await getProductTypeTree(payload)
    loading.value = false;
}
// productCategoryTree sorting 
const productTree = async (payload) => {
    ProductCategory.value = await getProductCategoryTypeTree(payload)
    loading.value = false;
}

// onMounted(() => {
//     if (props.id !== undefined && props.id !== null && props.id !== '') {
//         handleGetDesigner({ id: props.id });
//     }
//     productCategoryTree();
//     productTree();
// }
// );
onMounted(() => {
    if (props.id !== undefined && props.id !== null && props.id !== ' ') {
        console.log("store.getters.getDomain.id", store.getters.getDomain.id)
        handleGetDesigner({ id: props.id, domain_id: store.getters.getDomain.id });
        form.value.domain_id = store.getters.getDomain.id
    }
})

watch(
    () => form.value.domain_id,
    () => {
        productCategoryTree({ domain_id: store.getters.getDomain.id });
        productTree({ domain_id: store.getters.getDomain.id });
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