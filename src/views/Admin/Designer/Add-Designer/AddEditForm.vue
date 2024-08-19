<template>
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
                                <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => imageData.product_image.isOpen = true"> {{
                                        imageData.product_image.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in imageData.product_image.images" :key="file" :src="$filePath(file)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file?.alternative_text || 'image'">
                                </div>
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
                                    valueField="id" showField="name" :data="TagsData"
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
                                    @click="() => imageData.featured_image.isOpen = true"> {{
                                        imageData.featured_image.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in imageData.featured_image.images" :key="file" :src="$filePath(file)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file?.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>

        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="imageData.featured_image.isOpen">
    <GetLibrary
      btnName="Select File"
      :getFlag="true"
      :selected="imageData.featured_image.images"
      :singleFile="false" 
      :closeModal="() => { imageData.featured_image.isOpen = false; }"
      :selectedFiles="handleFeatureFiles"
    />
  </popupModal>

  <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="imageData.product_image.isOpen">
    <GetLibrary
      btnName="Select File"
      :getFlag="true"
      :selected="imageData.product_image.images"
      :singleFile="false" 
      :closeModal="() => { imageData.product_image.isOpen = false; }"
      :selectedFiles="handleProductFiles"
    />
  </popupModal>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { handleFileUpdate } from '@/helper/functions';
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
import { useRouter } from 'vue-router';
import CommonServices from '@/services/CommonServices';

// store and router
const router = useRouter();
const store = useStore();

// Reactive state
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData||{
    status: '',
    visibility: '',
    tags: [],
    domain_id: store.getters.getDomain?.id || null,
    featured_image: '',
    product_image: '',
    product_types: [],
    product_category_types: []
});
const PreviousDomain = ref(null);
const ProductCategory = ref([]);
const TagsData = ref([]);
const productType = ref([]);

// Image data for various categories
const imageData = ref({
    featured_image : { isOpen: false, mediaName: 'Feature Image', images: [] },
    product_image : { isOpen: false, mediaName: 'Upload Product Image', images: [] }
});

// Handlers for file updates
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, false, imageData, form);
const handleProductFiles = (data) => {handleFileUpdate('product_image', data, false, imageData, form);
console.log(imageData.value.product_image.images)
}


// Validate form fields
const validateForm = () => {
    errors.value = {};
    if (!form.value.title) {
        errors.value.title = 'Title is required';
        return false;
    }
    return true;
};

// Handle form submission (add or edit designer)
const handleSubmit = async () => {
    if (!validateForm()) return;

    loading.value = true;
    const { featured_image_url, product_image_url, ...payload } = form.value;
    if (payload.domain_id !== PreviousDomain.value) delete payload.id;

    try {
        const service = store.getters.editData ? DesignerServices.editDesigners : 
        DesignerServices.addDesigners;
        const res = await service(payload);

        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/designer');
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        loading.value = false;
    }
};

// Fetch product and category data
const fetchProductData = async () => {
    ProductCategory.value = await getProductCategoryTypeTree({ domain_id: store.getters.getDomain?.id });
    productType.value = await getProductTypeTree({ domain_id: store.getters.getDomain?.id });
};

// Fetch tags data
const fetchTagsData = async () => {
    try {
        const res = await CommonServices.getTags({ domain_id: store.getters.getDomain?.id });
        if (res.status === 200 && res.data.success) {
            TagsData.value = res.data.data;
        }
    } catch (e) {
        console.error('Error while getting tags:', e);
    }
};

// Initialize component state
onMounted(() => {
    PreviousDomain.value = store.getters.getDomain?.id;

    if (store.getters.editData) {
        imageData.value.featured_image.images = [store?.getters?.editData?.featured_image_url]|| [];
        imageData.value.featured_image.mediaName = store?.getters.editData?.featured_image_url || 'Feature Image';
        imageData.value.product_image.images = [store.getters.editData?.product_image_url] || [];
        imageData.value.product_image.mediaName = store.getters.editData?.product_image_url || 'Product Image';
    }
    
    fetchProductData();
    fetchTagsData();
});

// Watch for domain_id changes to update product and category data
watch(() => form.value.domain_id, () => {
    fetchTagsData();
    fetchProductData();
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