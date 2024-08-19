<template>
    <DefaultCard :cardTitle="form.id ? `Edit Projects` : `Add New Project`">
        <DomainComponent :domains="items" @customChange="(id) => form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5 ">
                <div class="col-span-8">
                    <Accordion :open="true" header="Fileds">
                        <div class="px-6">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *"
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title"
                                :errors="errors" />

                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug" placeholder="slug"
                                v-model="form.slug" :errMessage="errors.slug" />
                        </div>
                    </Accordion>
                    <div class="mt-3 ">
                        <Accordion :open="true" header="Categories">
                            <div class="mt-2 px-6 flex h-auto ">
                                <Checkbox :nexted=true :checkedData='form.project_categories' :dropdown="true"
                                    valueField="id" showField="name" :data="projectCategories"
                                    @checked-items="(checked) => form.project_categories = checked" />
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
                                    @click="() => imageData.featured_image.IsOpen = true"> {{
                                        imageData.featured_image.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in imageData.featured_image.images" :key="file" :src="$filePath(file.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file?.alternative_text || 'image'">
                                </div>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </div>

        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="imageData.featured_image.IsOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => { imageData.featured_image.IsOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>


    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { handleFileUpdate } from '@/helper/functions';
import { showToast } from '@/helper/functions'
import ProjectServices from '@/services/ProjectServices';
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import { getProjectCategoryTree, } from '@/helper/Apis'
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import { PublishOptions, statusData } from '@/json/data';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// Store and Router
const store = useStore();
const router = useRouter();

// Reactive State
const errors = ref({});
const loading = ref(false);
const form = ref({ 
    ...store.getters.editData, 
    status: '', 
    project_categories: [] 
});
const PreviousDomain = ref(null);
const projectCategories = ref([]);
const imageData = ref({
    featured_image: { IsOpen: false, mediaName: 'Select Feature Media', images: [] },
})

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

// Submit Handler
const handleSubmit = async () => {
    delete form.value?.domain;
    if (validateForm()) {
        loading.value = true;
        try {
            const action = store.getters.editData ? ProjectServices.editProjects : ProjectServices.addProjects;
            if (form.value.domain_id !== PreviousDomain.value) {
                delete form.value.id;
            }
            const { deleted_at, created_at,featured_image_url, updated_at, ...payload } = form.value;
            const { status, data } = await action(payload);
            if (status === 200 && data.success) {
                showToast(data.message, 'success');
                router.push('/projects');
            } else if (status === 400) {
                showToast(data.message, 'error');
            }
        } catch (error) {
            showToast('Something went wrong', 'error');
            console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} project:`, error);
        } finally {
            loading.value = false;
        }
    }
};

// Fetch Project Category Tree
const fetchProjectCategoryTree = async (domainId) => {
    try {
        projectCategories.value = await getProjectCategoryTree({ domain_id: domainId });
    } catch (error) {
        console.error('Error fetching project category tree:', error);
    }
};

// Lifecycle Hooks
onMounted(() => {
    PreviousDomain.value = store.getters.getDomain.id;
    fetchProjectCategoryTree(PreviousDomain.value);
    imageData.value.featured_image.images= [{file_url:store.getters.editData.featured_image_url}]
});

// Watchers
watch(
    () => form.value.domain_id,
    (newDomainId) => {
        fetchProjectCategoryTree(newDomainId);
        form.value.project_categories = [];
    }
);
</script>
