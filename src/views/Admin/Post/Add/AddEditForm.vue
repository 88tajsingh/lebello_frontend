<template>
    <DefaultCard :cardTitle="form.id ? `Edit Post` : `Add New Post`">
        <DomainComponent @customChange="(id) => form.domain_id = id" :deleteService="PostServices.deletePost"
            masterKey="master_post_id" :masterDeleteService="PostServices.masterDeletePost" routeTo="post" />
        <template v-if="form.id" v-slot:header>
            <MasterSlugForm :form="form" @update-slug="() => fetchPostData()"
                :SlugUpdateservices='PostServices.masterPostSlugUpdate' masteridKeyName='master_post_id' />
        </template>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Title">
                        <div class="px-6">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *"
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title" :errors="errors"
                                :hasCheckBox="checkBoxFlag"
                                @update:checkValue="(value) => { checkedFields.title = value }" />
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug (Read Only) "
                                placeholder="Add title" v-model="form.slug" :errMessage="errors.slug" disabled />
                        </div>
                    </Accordion>

                    <div class="mt-3">
                        <Accordion :open="true" header="Description">
                            <div class="flex px-2">
                                <SingleCheck v-if="form.id" label="" v-model="checkedFields.page_description">
                                </SingleCheck>
                                <TinyMCE v-model="form.page_description" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Seo Options">

                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id="seo_title" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.seo_title" placeholder="Title Tag" label="Title Tag"
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.seo_title = value }" />
                                <span>Custom title tag.</span>
                            </div>
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_description"
                                    placeholder="Meta Description" label="Meta Description" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.meta_description = value }" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :='4' type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_keywords"
                                    placeholder="Meta Keywords" label="Meta Keywords" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.meta_keywords = value }" />
                                <span>Seperate each term with comma.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="News Options">
                            <div class=" px-6 flex mt-2 items-center text-gray-600 text-sm">
                                <ColorPicker v-model="form.title_background_color" label='Title Background'
                                    :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.title_background_color = value }" />
                            </div>
                            <div class=" px-6 mt-2 flex items-center text-gray-600 text-sm">
                                <ColorPicker v-model="form.title_color" label='Title Color' :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.title_color = value }" />
                            </div>
                        </Accordion>
                    </div>
                </div>
                <!-- right side  -->
                <div class="col-span-4">
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
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Post Settings">
                            <div class="mt-2 px-6  h-auto ">
                                <InputLabel for="Stick to the top of the blog" value="Stick to the top of the blog" />
                                <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                    label="Select" v-model="form.stick_to_top_of_blog" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.stick_to_top_of_blog = value }" />
                                <div>
                                    <InputLabel for="Pending review" value="Pending review" />
                                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                                        label="Select" v-model="form.pending_review" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => { checkedFields.pending_review = value }" />
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Tags">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.tags' :dropdown="true" valueField="id"
                                    showField="name" :data="TagsData"
                                    @checked-items="(checked) => form.tags = checked" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="Post Categories">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.store_categories' :dropdown="true"
                                    valueField="id" showField="name" :data="postCategoryTree"
                                    @checked-items="(checked) => form.post_categories = checked" />
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Excerpt">
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="Write_excerpt" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.excerpt" placeholder="Meta Description"
                                    label="Write an excerpt (optional)" :hasCheckBox="checkBoxFlag"
                                    @update:checkValue="(value) => { checkedFields.excerpt = value }" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                        </Accordion>
                    </div>
                    <!-- <div class="mt-3 ">
                        <Accordion :open="true" header="Discussion">
                            <div class="mt-2 px-6  h-auto ">
                                <singleCheckBox id="FeaturedOption" label="Allow comments"
                                    v-model:modelValue="form.allow_comments">
                                </singleCheckBox>
                                <singleCheckBox id="FeaturedOption" label="Allow pingbacks & trackbacks"
                                    v-model:modelValue="form.allow_pingbacks">
                                </singleCheckBox>
                            </div>
                        </Accordion>
                    </div> -->
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Featured image">
                            <div class="px-6  h-auto ">
                                <div class=" flex  w-full h-auto ">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.media_id"></SingleCheck>
                                    <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                        @click="() => imageData.featured_image.IsOpen = true"> {{
                                            imageData.featured_image.mediaName }}</div>
                                </div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in imageData.featured_image.images" :key="file"
                                        :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file?.alternative_text || 'image'" />
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Gallery">
                            <div class="px-6 h-auto">
                                <div class=" flex  w-full h-auto ">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.media_id"></SingleCheck>
                                    <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                        @click="() => imageData.gallery.IsOpen = true">
                                        {{ imageData.gallery.mediaName }}
                                    </div>
                                </div>

                                <div class="mt-3 flex overflow-x-auto">
                                    <img v-for="file in imageData.gallery.images" :key="file"
                                        :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file?.alternative_text || 'image'" />
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
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => { imageData.featured_image.IsOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>

    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.gallery.IsOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.gallery.images" :singleFile="false"
            :closeModal="() => { imageData.gallery.IsOpen = false }" :selectedFiles="handleGalleryFiles" />
    </popupModal>


    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from 'lodash';
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import {trueFalse,statusData } from '@/json/data';
import PostServices from '@/services/PostServices';
import { getPostCategoryTree } from '@/helper/Apis';
import { ref, onMounted, watch, computed } from "vue";
import CommonServices from '@/services/CommonServices';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import Accordion from "@/components/Admin-components/Accordion.vue";
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import { showToast, handleFileUpdate, getGlobalUpdateData } from '@/helper/functions'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';

// Store and Router
const store = useStore();
const router = useRouter();

// Reactive State
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || { status: '', visibility: '' });
const postCategoryTree = ref([]);
const TagsData = ref([]);
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))

const imageData = ref({
    featured_image: { IsOpen: false, mediaName: 'Select Feature Media', images: [] },
    gallery: { IsOpen: false, mediaName: 'Select gallery files', images: [] }
})

// Image Handlers
const handleFeatureFiles = (data) => handleFileUpdate('featured_image', data, false, imageData, form);
const handleGalleryFiles = (data) => handleFileUpdate('gallery', data, true, imageData, form);

// remove image form gallery
const handleRemoveImage = (slide) => {
    const index = imageData.value.gallery.images.findIndex(item => item.id === slide.id);
    console.log(index)
    if (index !== -1) {
        imageData.value.gallery.images.splice(index, 1);
        form.value.gallery.splice(index, 1);
    }
}

// Form Validation
const validateForm = () => {
    errors.value = {};
    if (!form.value.title) {
        errors.value.title = 'Title is required';
        return false;
    }
    return true;
};

// Submit Handler
const handleSubmit = async () => {
   
    if(!validateForm()) return
    const  hasCheckedFields = Object.values(checkedFields.value).some(Boolean)

        loading.value = true;
        try {
            const action = store.getters.editData ? PostServices.editPost : PostServices.addPost;
            const { featured_image_url, gallery_urls, slug,gallery_data, domains_data, default_domain, deleted_at, created_at, updated_at, ...payload } = form.value
            if (!form.value?.domains_data?.includes(form.value.domain_id)) {
                delete payload.id;
            }
            const { status, data } = await action(payload);
            if (status === 200 && data.success) {
                if(hasCheckedFields){
                handleGlobalUpdate();
            }
            else{
                showToast(data.message, 'success');
                router.push('/post');
            }
            }
        } catch (e) {
            console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} post:`, e);
        } finally {
            loading.value = false;
        }
};

// Global Update Handler
const handleGlobalUpdate = async () => {
    const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
    if (_.isEmpty(globalUpdate)) return

    const payload = {
        master_post_id: form.value.master_post_id,
        global_keys: globalUpdate
    }

    try {
        const { status, data } = await PostServices.globalPostUpdate(payload)
        status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
        if (status === 200 && data.success) router.push('/post')
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
    } finally {
        loading.value = false
    }
}


// Fetch Perticular Domain Data
const fetchPostData = async () => {
    loading.value = true
    const payload = { master_post_id: form.value.master_post_id, domain_id: form.value.domain_id }
    try {
        const { status, data } = await PostServices.getPost(payload)
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

// Fetch Tags and Post Category Tree
const fetchInitialData = async (payload) => {
    // console.log("payload",payload)
    try {
        const [{ status: tagStatus, data: tagData },] = await Promise.all([
            CommonServices.getTags(payload)]);4
        if (tagStatus === 200 && tagData.success) TagsData.value = tagData.data;

        postCategoryTree.value = await getPostCategoryTree(payload)
    } catch (e) {
        console.error('Error fetching initial data:', e);
    }
    
};

// Lifecycle Hooks
// Initialize component state
onMounted(() => {
    if (store.getters.editData) {
        imageData.value.featured_image.mediaName = store.getters?.editData?.featured_image_url?.file_url || 'Select Media';
        imageData.value.featured_image.images = [store.getters?.editData?.featured_image_url];
        imageData.value.gallery.mediaName = store.getters?.editData?.gallery_data?.map(item => item.file_url).join(',') || 'Select Gallery images';
        imageData.value.gallery.images = store.getters?.editData?.gallery_data;
        fetchInitialData({domain_id: store.getters.editData?.domain_id});
    }
});

watch(() => form.value.domain_id, (newDomainId) => {
    // Fetch tree data
    fetchInitialData({ domain_id: newDomainId });

    // Check if newDomainId is present in domains_data and fetch 
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchPostData();
    } else {
        console.log('data not in array', form.value?.domains_data);
    }
});


// Computed Property
const buttonText = computed(() => {
    return  (form.value.id ? 'Update' : 'Submit')
})
</script>
