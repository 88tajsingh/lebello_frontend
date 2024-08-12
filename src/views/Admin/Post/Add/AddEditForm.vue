<template>{{ form }}
    <DefaultCard :cardTitle="form.id ? `Edit Post` : `Add New Post`">
        <DomainComponent :domains="items" @customChange="(id) => form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Title">
                        <div class="px-6">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *"
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title"
                                :errors="errors" />
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug "
                                placeholder="Add title" v-model="form.slug" :errMessage="errors.slug" />
                        </div>
                    </Accordion>
                    <div class="mt-3">
                        <Accordion :open="true" header="Description">
                            <div class="px-5     pt-2">
                                <TinyMCE v-model="form.description" />
                            </div>
                        </Accordion>
                    </div>       
                    <div class="mt-3">
                        <Accordion :open="true" header="Seo Options">
                            
                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                <TextInput id="seo_title" type="text" class="block w-[180px] mr-2 h-[33px]"
                                    v-model="form.seo_title" placeholder="Title Tag" label="Title Tag" />
                                <span>Custom title tag.</span>
                            </div>
                            <div class="px-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_description" :isTextarea="true" :rows=4 type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_description"
                                    placeholder="Meta Description" label="Meta Description" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                            <div class="mx-6 mt-3 items-center text-gray-600 text-sm">
                                <TextInput id="seo_meta_keywords" :isTextarea="true" :='4' type="text"
                                    class="block w-[180px] mr-2 " v-model="form.meta_keywords"
                                    placeholder="Meta Keywords" label="Meta Keywords" />
                                <span>Seperate each term with comma.</span>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-3">
                        <Accordion :open="true" header="News Options">
                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                    <ColorPicker v-model="form.title_background_color" label='Title Background'/>
                                   
                                </div>
                            <div class=" px-6 mt-2 items-center text-gray-600 text-sm">
                                    <ColorPicker v-model="form.title_color" label='Title Color'/>
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
                                    <Select :options="trueFalse" showfield="name" class="w-full"
                                        valueField="value" label="Select " v-model="form.status" />
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
                        <Accordion :open="true" header="Post Settings">
                            <div class="mt-2 px-6  h-auto ">
                                    <singleCheckBox id="FeaturedOption" label="Stick to the top of the blog"
                                        v-model:modelValue="form.stick_to_top_of_blog">
                                    </singleCheckBox>
                                    <singleCheckBox id="FeaturedOption" label="Pending review"
                                        v-model:modelValue="form.pending_review">
                                    </singleCheckBox>
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
                                    class="block w-[180px] mr-2 " v-model="form.excerpt"
                                    placeholder="Meta Description" label="Write an excerpt (optional)" />
                                <span>Most search engines use a maximum of 160 chars for the description.
                                </span>
                            </div>
                        </Accordion>
                        </div>
                    <div class="mt-3 ">
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
                        </div>
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Featured image">
                            <div class="px-6  h-auto ">
                                <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => featureData.isOpen = true"> {{
                                        featureData.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in featureData.images" :key="file" :src="$filePath(file)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <div class="mt-4 ">
                        <Accordion :open="true" header="Gallery">
                            <div class="px-6  h-auto ">
                                <div class="py-2 rounded-lg px-2 border border-stroke"
                                    @click="() => galleryData.isOpen = true"> {{
                                        galleryData.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in galleryData.images" :key="file" :src="$filePath(file)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
                                </div>
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
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="galleryData.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="galleryData.images" :singleFile="true"
            :closeModal="() => { galleryData.isOpen = false }" :selectedFiles="handleGalleryFiles" />
    </popupModal>


    <Loader :isLoading="loading" :fullPage="true" />
</template>
<script setup>
import router from '@/router';
import { defineEmits } from 'vue';
import { ref, onMounted, watch } from "vue";
import { showToast, handleFiles, } from '@/helper/functions'
import { getPostCategoryTree } from '@/helper/Apis';
import { PublishOptions, productOptionsType,trueFalse } from '@/json/data';
import TinyMCE from "@/components/Admin-components/TinyMCE.vue";
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';
import singleCheckBox from '@/components/Admin-components/form-components/SingleCheck.vue'
import { useStore } from 'vuex';
import CommonServices from '@/services/CommonServices';
import PostServices from '@/services/PostServices';

const store = useStore();

const emit = defineEmits(['handleApi']);
const errors = ref({})
const postCategoryTree = ref([]);
const productsSpecsIndex = ref(0);
const loading = ref(false)
const TagsData = ref([]);
const form = ref(store.getters.editData || { status: '',visibility:'' });
const SliderSelects = ref([]);
const PreviousDomain = ref(null)

const featureData = ref({
    isOpen: false,
    mediaName: 'Image',
    images: []
})
const galleryData = ref({
    isOpen: false,
    mediaName: 'Image',
    images: []
})

const handleFeatureFiles = (data) => {
    const object = handleFiles(data);
    featureData.value.isOpen = false
    featureData.value.images = data;
    featureData.value.mediaName = object.mediaName;
    console.log(productsSpecsIndex.value)
    form.value.featured_image = object.media_ids[0]
}
const handleGalleryFiles = (data) => {
    const object = handleFiles(data);
    galleryData.value.isOpen = false
    galleryData.value.images = data;
    galleryData.value.mediaName = object.mediaName;
    form.value.gallery = object.media_ids
}


const handleSubmit = () => {
    delete form.value?.domain;
    if (validateForm()) {
        if (store.getters.editData === null) {
            handleAddPost({ ...form.value })
        }
        else {
            if (form.value.domain_id !== PreviousDomain.value) {
                delete form.value.id;
            }
            const { deleted_at, created_at, updated_at, ...refinedPayload } = form.value;
            handleEditPost({ ...refinedPayload })
        }
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

const handleGetTags = async (payload) => {
    //   getLoading.value = true;
    try {
        const res = await CommonServices.getTags(payload);
        if (res.status === 200 && res.data.success) {
            TagsData.value = res.data.data;
        }
    } catch (e) {
        console.error('Error while getTags:', e);
    } finally {
        // getLoading.value = false;
    }
};

const handleAddPost = async (payload) => {
    try {
        const res = await PostServices.addPost(payload);
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/post');
        }
    } catch (e) {
        console.error('Error while adding store Product:', e);
    } finally {
        loading.value = false;
    }
}

const handleEditPost = async (payload) => {
    loading.value = true;
    try {
        const res = await PostServices.editStoreProduct(payload);
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/post');
        }
    } catch (e) {
        console.error('Error while editing Store product:', e);
    } finally {
        loading.value = false;
    }
}

const handlePostCategoryTree = async (payload) => {
    postCategoryTree.value = await getPostCategoryTree(payload)
}
onMounted(() => {
    PreviousDomain.value = store.getters.getDomain.id;
    SliderSelects.value = store.getters.editData?.slider_urls
    handleGetTags({ domain_id: store.getters.getDomain.id })
    handlePostCategoryTree({ domain_id: store.getters.getDomain.id })
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