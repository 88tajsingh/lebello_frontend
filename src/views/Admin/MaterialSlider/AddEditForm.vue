<template>{{ form }}
    <DefaultCard :cardTitle="form.id ? `Edit Material Slider` : `Add Material Slider`">
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
                </div>
                <div class="col-span-4">
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
                                    @click="() => imageData.featured_image.isOpen = true"> {{
                                        imageData.featured_image.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in imageData.featured_image.images" :key="file"
                                        :src="$filePath(file.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file.alternative_text || 'image'">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="imageData.featured_image.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => { imageData.featured_image.isOpen = false }" :selectedFiles="handleFeaturedImageFiles" />
    </popupModal>



    <Loader :isLoading="loading" :fullPage="true" />
</template>
<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from "vue";
import { showToast } from '@/helper/functions'
import { handleFileUpdate } from '@/helper/functions';
import { PublishOptions,statusData} from '@/json/data';
import Accordion from "@/components/Admin-components/Accordion.vue";
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import MaterialSliderServices from '@/services/MaterialSliderServices.js';
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'

// store and router
const store = useStore();
const router = useRouter();

// reactive state
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || { status: '', visibility: '' });
const PreviousDomain = ref(null);


const imageData = ref({
    featured_image : { isOpen: false, mediaName: 'Featured Image', images: [] },
});

const handleFeaturedImageFiles = (data) => handleFileUpdate('featured_image', data, false, imageData, form);


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
            const action = store.getters.editData ? MaterialSliderServices.editMaterialSlider : MaterialSliderServices.addMaterialSlider;
            if (form.value.domain_id !== PreviousDomain.value) delete form.value.id;
            const { deleted_at, created_at, updated_at, featured_image_url, ...refinedPayload } = form.value;
            const res = await action({ ...refinedPayload });
            if (res.status === 200 && res.data.success) {
                showToast(res.data.message, 'success');
                router.push('/material-slider');
            }
        } catch (e) {
            console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} Material Sliders:`, e);
        } finally {
            loading.value = false;
        }
    }
};

// Lifecycle Hooks
onMounted(() => {
    PreviousDomain.value = store.getters.getDomain.id;
    // imageData.value.featured_image=
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