<template>
    <DefaultCard :cardTitle="store.getters.editData ? `Edit Material` : `Add Material`">
        <form @submit.prevent="handleSubmit">
            <DomainComponent @customChange="(id) => form.domain_id = id"></DomainComponent>
            <div class="p-6.5 grid grid-cols-2 gap-6">
                <div class="flex flex-col ">
                    <InputLabel for="Name" value="Name" />
                    <TextInput type="text" class=" " :class="{ 'border-red': errors.name }" placeholder=""
                        v-model="form.name" :errMessage="errors.name" @update:model="clearError('name')" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        The name is how it appears on your site.
                    </p>
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Slug" value="Slug" />
                    <TextInput type="text" class="block mr-2 h-[40px] w-full" :class="{ 'border-red-500': errors.slug }"
                        placeholder="" v-model="form.slug" :errMessage="errors.slug"
                        @update:model="clearError(errors, 'slug')" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains
                        only
                        letters, numbers, and hyphens.
                    </p>
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Parent Material" value="Parent Material" />
                    <Select :options="MaterialTreeListData" showfield="name" class="w-full" :defaultZero='true'
                        valueField="id" label="Select Parent Material" v-model="form.parent_material" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of
                        Bebop
                        and Big Band.
                    </p>
                    <InputError class="mt-2" :message="errors?.parent_material" />
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Display in Material Options" value="Display in Material Options" />
                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                        label="Select Material Options" v-model="form.display_material_option" />
                    <InputError class="mt-2" :message="errors?.display_material_option" />
                </div>
                <div class="flex flex-col w-full">
                    <InputLabel for="Material Price" value="Material Price" />
                    <TextInput type="text" class="block mr-2 h-[40px] w-full"
                        :class="{ 'border-red-500': errors.material_price }" placeholder=""
                        v-model="form.material_price" :errMessage="errors.material_price"
                        @update:model="clearError(errors, 'material_price')" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains
                        only
                        letters, numbers, and hyphens.
                    </p>
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Yellow Banner Display On Material Images"
                        value="Yellow Banner Display On Material Images" />
                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                        label="Select an option" v-model="form.yellow_banner_material_image" />
                    <InputError class="mt-2" :message="errors?.yellow_banner_material_image" />
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Show New Badge" value="Show New Badge" />
                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                        label="Select an option" v-model="form.show_new_badge" />
                    <InputError class="mt-2" :message="errors?.show_new_badge" />
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Label" value="Label" />
                    <TextInput type="text" class="block mr-2 h-[40px] w-full"
                        :class="{ 'border-red-500': errors.label }" placeholder="" v-model="form.label"
                        :errMessage="errors.label" @update:model="clearError(errors, 'label')" />
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Material Code" value="Material Code" />
                    <TextInput type="text" class="block mr-2 h-[40px] w-full"
                        :class="{ 'border-red-500': errors.material_code }" placeholder="" v-model="form.material_code"
                        :errMessage="errors.material_code" @update:model="clearError(errors, 'material_code')" />
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Group Name" value="Group Name" />
                    <TextInput type="text" class="block mr-2 h-[40px] w-full"
                        :class="{ 'border-red-500': errors.group_name }" placeholder="" v-model="form.group_name"
                        :errMessage="errors.group_name" @update:model="clearError(errors, 'group_name')" />
                </div>
                <div class="flex flex-col mt-1">
                    <InputLabel for="Label Background Color" value="Label Background Color" />
                    <div class="flex gap-2">
                        <TextInput type="color" class="block h-[40px] min-w-[200px] px-2 rounded-lg"
                            :class="{ 'border-red': errors.label_background_color }" placeholder=""
                            v-model="form.label_background_color" :errMessage="errors.label_background_color" />
                        <TextInput type="text" class="block mr-2 h-[40px] min-w-[10px]"
                            :class="{ 'border-red': errors.label_background_color }" placeholder=""
                            v-model="form.label_background_color" />
                    </div>
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Trade Mark Label" value="Trade Mark Label" />
                    <TextInput type="text" class="block mr-2 h-[40px] w-full"
                        :class="{ 'border-red-500': errors.trade_mark_label }" placeholder=""
                        v-model="form.trade_mark_label" :errMessage="errors.trade_mark_label"
                        @update:model="clearError(errors, 'trade_mark_label')" />
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Show New Badge 2021" value="Show New Badge 2021" />
                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value"
                        label="Select an option" v-model="form.show_new_badge_2021" />

                    <InputError class="mt-2" :message="errors?.show_new_badge_2021" />
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Single Color" value="Single Color" />
                    <Select :options="colors" showfield="name" class="w-full" valueField="value" label="Select Color"
                        v-model="form.single_color" />
                    <InputError class="mt-2" :message="errors.single_color" />
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Multiple Color" value="Multiple Color" />
                    <MultiSelect v-model="form.multiple_color" :options="colors" placeHolder="Select multiple color" />
                    <InputError class="mt-2" :message="errors?.multiple_color" />
                </div>
                <div class="flex flex-col w-full">
                    <InputLabel for="Featured_image" value="Featured_image" />

                    <!-- <ImageUpload2 @file-selected="form.media_id = $event"
                    :accepted-formats="['jpg', 'jpeg', 'png']" /> -->

                    <div class="py-2 rounded-lg px-2 border border-stroke"
                        @click="() => imageData.media_id.isOpen = true"> {{
                            imageData.media_id.mediaName }}</div>
                </div>
                <div class="flex flex-col w-full">
                    <InputLabel for="Description" value="Description" />
                    <TextInput type="text" class="block mr-2  w-full" :class="{ 'border-red-500': errors.description }"
                        placeholder="" :isTextarea="true" :rows="4" v-model="form.description"
                        :errMessage="errors.description" @update:model="clearError(errors, 'description')" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        The description is not prominent by default; however, some themes may show it.
                    </p>
                </div>
                <div class="flex flex-col w-full">
                    <div class="mt-3 flex overflow-x-auto">
                       
                        <img v-if="imageData.media_id.images?.length" :src="$filePath(imageData.media_id.images[0].file_url)"
                            class="inline-block w-auto h-34 mr-4"
                            :alt="imageData.media_id.images[0]?.alternative_text || 'image'">
                    </div>
                </div>
            </div>

            <button type="submit"
                class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Submit
            </button>
        </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.media_id.isOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.media_id.images" :singleFile="false"
            :closeModal="() => { imageData.media_id.isOpen = false; }" :selectedFiles="handleFiles" />
    </popupModal>

    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from 'lodash';
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import MultiSelect from '@/components/Admin-components/form-components/MultiSelect.vue'
import InputError from '@/components/Admin-components/form-components/InputError.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { MaterialTreeList } from '@/helper/Apis'
import MaterialsServices from '@/services/MaterialsServices'
import { clearError, showToast, handleFileUpdate } from '@/helper/functions'
import { onMounted, ref, watch, } from 'vue'
import { trueFalse, colors, } from '@/json/data'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// Store and router
const store = useStore();
const router = useRouter();

// Reactive state
const errors = ref({});
const loading = ref(false);
const form = ref(store.getters.editData || {
    parent_material: 0,
    display_material_option: null,
    yellow_banner_material_image: null,
    show_new_badge: null,
    single_color: null,
    show_new_badge_2021: null
});
const PreviousDomain = ref(store.getters.getDomain?.id || null);
const MaterialTreeListData = ref([]);
// Close the modal
const closeModal = () => {
    imageData.value.media_id.isOpen = false;
};
// Image data for various categories
const imageData = ref({
    media_id: { isOpen: false, mediaName: 'Feature Image', images: [] },
});

// Handlers for file updates
const handleFiles = (data) => {
    handleFileUpdate('media_id ', data, false, imageData, form);
    console.log()
    imageData.value.media_id.isOpen = false
};

// Validate form fields
const validateForm = () => {
    errors.value = {};
    if (!form.value.name) {
        errors.value.name = 'Name is required';
        return false;
    }
    return true;
};

// Handle form submission (add or edit materials)
const handleSubmit = async () => {
    if (!validateForm()) return;

    loading.value = true;
    const { deleted_at, created_at, updated_at, featured_image_url, ...payload } = form.value;

    if (payload.domain_id !== PreviousDomain.value) delete payload.id;

    try {
        const service = store.getters.editData ? MaterialsServices.editMaterial : MaterialsServices.addMaterial;
        const res = await service(payload);

        console.log(res.message)
        if (res.status === 200 && res.data.success) {
            showToast(res.data.message, 'success');
            router.push('/materials');
        } else if (res.status_code === 400) {
            showToast(res.message, 'error');
        }
    } catch (e) {
        console.error('Error:', e);
        showToast(e.response?.message, 'error');
    } finally {
        loading.value = false;
    }
};

// Fetch material tree data
const materialTree = async (payload) => {
    try {
        MaterialTreeListData.value = await MaterialTreeList(payload);
    } catch (e) {
        console.error('Error fetching material tree:', e);
    }
};

// Initialize component state
onMounted(() => {
    if (store.getters.editData) {
        imageData.value.media_id.mediaName = store.getters.editData?.featured_image_url || 'Select Media';
        imageData.value.media_id.images = store.getters.editData?.featured_image_url;
    }
    materialTree({ domain_id: store.getters.getDomain?.id });
});

// Watch for domain_id changes to update material tree data
watch(() => form.value.domain_id, () => {
    materialTree({ domain_id: form.value.domain_id });
});

</script>
