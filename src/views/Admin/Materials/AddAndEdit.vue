<template>
    <DefaultCard :cardTitle="store.getters.editData ? `Edit Material` : `Add Material`">
        <DomainComponent @customChange="(id) => form.domain_id = id" @domainArray="(array) => form.domain_all = array" :deleteService="MaterialsServices.deleteMaterial"
            masterKey="master_material_id" :masterDeleteService="MaterialsServices.deleteMasterMaterial"
            routeTo="materials" />
        <template v-if="form.id" v-slot:header>
            <MasterSlugForm :form="form" @update-slug="() => fetchMaterialData()"
                :SlugUpdateservices='MaterialsServices.masterMaterialSlugUpdate' masteridKeyName='master_material_id' />
        </template>
        <form @submit.prevent="handleSubmit">
        <div class="p-6.5 grid grid-cols-2 gap-6">
            <div class="flex flex-col">
                <TextInput ref="nameInput" type="text" label='Name' :class="{ 'border-red': errors.name }"
                    placeholder="" v-model="form.name" :errMessage="errors.name"
                    @update:modelValue="$clearError(errors, 'name')" :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.name = value }" 
                    :id="'name-input'" />
                <p class="text-sm text-[#646970] text-[11.5px]" :class="{ 'ml-8': form.id }">
                    The name is how it appears on your site.
                </p>
            </div>
            <div class="flex flex-col">
                <TextInput type="text" label='Slug (Read Only)' disabled class="block mr-2 h-[40px] w-full"
                    :class="{ 'border-red-500': errors.slug }" placeholder="" v-model="form.slug"
                    :errMessage="errors.slug" @update:model="clearError(errors, 'slug')" 
                    :id="'slug-input'" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains
                    only letters, numbers, and hyphens.
                </p>
            </div>
            <div class="flex flex-col">
                <Select ref="parentInput" :options="MaterialTreeListData" title="Parent Material" showfield="name"
                    class="w-full" :defaultZero='true' valueField="id" label="Select Parent Material"
                    v-model="form.parent_material" :errorClass='errors.parent_material'
                    :errMessage="errors.parent_material"
                    @update:modelValue="$clearError(errors, 'parent_material')" 
                    :id="'parent-material-select'" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of
                    Bebop and Big Band.
                </p>
                <InputError class="mt-2" :message="errors?.parent_material" />
            </div>
            <div class="flex flex-col">
                <Select :options="trueFalse" title="Display in Material Options" showfield="name" class="w-full"
                    valueField="value" label="Select Material Options" v-model="form.display_material_option"
                    :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.display_material_option = value }"
                    :id="'display-material-option-select'" />
                <InputError class="mt-2" :message="errors?.display_material_option" />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Material Price"
                    :class="{ 'border-red-500': errors.material_price }" placeholder=""
                    v-model="form.material_price" :errMessage="errors.material_price" :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.material_price = value }"
                    @update:model="clearError(errors, 'material_price')" 
                    :id="'material-price-input'" />
                <p class="text-sm text-[#646970] text-[11.5px]" :class="{ 'ml-8': form.id }">
                    The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains
                    only letters, numbers, and hyphens.
                </p>
            </div>
            <div class="flex flex-col">
                <Select :options="trueFalse" title="Yellow Banner Display On Material Images" showfield="name"
                    class="w-full" valueField="value" label="Select an option"
                    v-model="form.yellow_banner_material_image" :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.yellow_banner_material_image = value }"
                    :id="'yellow-banner-select'" />
            </div>
            <div class="flex flex-col">
                <Select :options="trueFalse" title="Show New Badge" showfield="name" class="w-full"
                    valueField="value" label="Select an option" v-model="form.show_new_badge"
                    :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.show_new_badge = value }"
                    :id="'show-new-badge-select'" />
            </div>
            <div class="flex flex-col">
                <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Label"
                    :class="{ 'border-red-500': errors.label }" placeholder="" v-model="form.label"
                    :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => { checkedFields.label = value }"
                    :errMessage="errors.label" @update:model="clearError(errors, 'label')" 
                    :id="'label-input'" />
            </div>
            <div class="flex flex-col">
                <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Material Code"
                    :class="{ 'border-red-500': errors.material_code }" placeholder="" v-model="form.material_code"
                    :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.material_code = value }"
                    :errMessage="errors.material_code" @update:model="clearError(errors, 'material_code')" 
                    :id="'material-code-input'" />
            </div>
            <div class="flex flex-col">
                <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Group Name"
                    :class="{ 'border-red-500': errors.group_name }" placeholder="" v-model="form.group_name"
                    :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => { checkedFields.group_name = value }"
                    :errMessage="errors.group_name" @update:model="clearError(errors, 'group_name')" 
                    :id="'group-name-input'" />
            </div>
            <div class="flex flex-col mt-1">
                <ColorInput label="Label Background Color" v-model="form.label_background_color"
                    :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.label_background_color = value }" 
                    :id="'label-background-color-picker'" />
            </div>
            <div class="flex flex-col">
                <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Trade Mark Label"
                    :class="{ 'border-red-500': errors.trade_mark_label }" placeholder=""
                    v-model="form.trade_mark_label" :errMessage="errors.trade_mark_label"
                    :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.trade_mark_label = value }"
                    @update:model="clearError(errors, 'trade_mark_label')" 
                    :id="'trade-mark-label-input'" />
            </div>
            <div class="flex flex-col">
                <Select ref="badgeInput" :options="trueFalse" title="Show New Badge 2021" showfield="name"
                    class="w-full" valueField="value" label="Select an option" v-model="form.show_new_badge_2021"
                    :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.show_new_badge_2021 = value }"
                    :errorClass='errors.show_new_badge_2021' :errMessage="errors.show_new_badge_2021"
                    @update:modelValue="$clearError(errors, 'show_new_badge_2021')" 
                    :id="'show-new-badge-2021-select'" />
            </div>
            <div class="flex flex-col">
                <Select :options="colors" title="Single Color" showfield="name" class="w-full" valueField="value"
                    label="Select Color" v-model="form.single_color" :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.single_color = value }" 
                    :id="'single-color-select'" />
            </div>
            <div class="flex flex-col">
                <MultiSelect v-model="form.multiple_color" label="Multiple Color" :options="colors"
                    placeHolder="Select multiple color" :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.multiple_color = value }" 
                    :id="'multiple-color-select'" />
                <InputError class="mt-2" :message="errors?.multiple_color" />
            </div>
            <div class="flex flex-col w-full">
                <InputLabel for="featured-image" :class="{ 'ml-8': form.id }" value="Featured Image" />
                <div class="flex w-full h-auto">
                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.media_id"></SingleCheck>
                    <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                        @click="() => imageData.media_id.IsOpen = true"> {{ imageData.media_id.mediaName }}</div>
                </div>
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2 w-full" label='Description'
                    :class="{ 'border-red-500': errors.description }" placeholder="" :isTextarea="true" :rows="4"
                    v-model="form.description" :errMessage="errors.description"
                    @update:model="clearError(errors, 'description')" :hasCheckBox="checkBoxFlag"
                    @update:checkValue="(value) => { checkedFields.description = value }" 
                    :id="'description-input'" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
            <div class="flex flex-col w-full">
                <div class="mt-3 flex overflow-x-auto">
                    <img v-if="imageData.media_id.images[0]" v-for="file in imageData.media_id.images" :key="file"
                        :src="$filePath(file?.file_url)" class="inline-block w-auto h-34 mr-4"
                        :alt="file?.alternative_text || ''" />
                </div>
            </div>
        </div>

        <button type="submit"
            class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            {{ buttonText }}
        </button>
    </form>
    </DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]"
        v-model:isOpen="imageData.media_id.IsOpen">
        <GetLibrary btnName="Select File" :getFlag="true" :selected="imageData.media_id.images" :singleFile="true"
            :closeModal="() => { imageData.media_id.IsOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>

    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from 'lodash';
import SingleCheck from '@/components/Admin-components/form-components/SingleCheck.vue';
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import MultiSelect from '@/components/Admin-components/form-components/MultiSelect.vue'
import InputError from '@/components/Admin-components/form-components/InputError.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { MaterialTreeList } from '@/helper/Apis'
import MaterialsServices from '@/services/MaterialsServices'
import { showToast, handleFileUpdate, getGlobalUpdateData } from '@/helper/functions'
import { onMounted, ref, watch, computed } from 'vue'
import { trueFalse, colors, } from '@/json/data'
import { useRouter,onBeforeRouteLeave } from 'vue-router';
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
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))
const MaterialTreeListData = ref([]);

// Image data for various categories
const imageData = ref({
    media_id: { IsOpen: false, mediaName: 'Select Feature Media', images: [] },
})

const handleFeatureFiles = (data) => handleFileUpdate('media_id', data, imageData, form,false);

// Form Validation
const validateForm = () => {
    errors.value = {};

    if (!form.value.name) {
        errors.value.name = 'Name is required';
        return false;
    }

    if (form.value.show_new_badge_2021 === null || form.value.show_new_badge_2021 === undefined || form.value.show_new_badge_2021 === '') {
        errors.value.show_new_badge_2021 = 'Show New Badge 2021 is required';
        return false;
    }

    if (form.value.parent_material == form.value.id) {
        errors.value.parent_material = 'Parent Material cannot be same as Material Name';
        return false;
    }

    return true;
};

// Handle form submission (add or edit materials)
const handleSubmit = async () => {
    if (!validateForm()) return
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
    !form.value.domain_all && delete form.value.domain_all
    const { deleted_at, created_at,domian, updated_at, slug, domains_data, default_domain, default_master, media_id_url, ...payload } = form.value;
    if (!form.value?.domains_data?.includes(form.value.domain_id)) {
        delete payload.id;
    }
    const service = store.getters.editData ? MaterialsServices.editMaterial : MaterialsServices.addMaterial;

    try {
        const { status, data } = await service(payload);

        if (status === 200 && data.success) {
            if (hasCheckedFields) {
                handleGlobalUpdate();
            }
            else {
                showToast(data.message, 'success');
                router.push('/materials');
            }
        } else if (status === 400) {
            showToast(data.message, 'error');
        } else if (status === 403) {
            showToast(data.message, 'error');
        }
    } catch (error) {
        showToast(data.message, 'error');
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} material:`, error);
    } finally {
        loading.value = false;
    }
};


// Global Update Handler
const handleGlobalUpdate = async () => {
    const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
    if (_.isEmpty(globalUpdate)) return

    const payload = {
        master_material_id: form.value.master_material_id,
        global_keys: globalUpdate
    }
    try {
        const { status, data } = await MaterialsServices.globalMaterialUpdate(payload)
        status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
        if (status === 200 && data.success) router.push('/materials')
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
    } finally {
        loading.value = false
    }
}


// Fetch Perticular Domain Data
const fetchMaterialData = async () => {
    loading.value = true
    const payload = { master_material_id: form.value.master_material_id, domain_id: form.value.domain_id }
    try {
        const { status, data } = await MaterialsServices.getMaterials(payload)
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
        imageData.value.media_id.mediaName = store.getters?.editData?.media_data?.file_url || 'Select Media';
        imageData.value.media_id.images = [store.getters?.editData?.media_data];
        materialTree({ domain_id: store.getters.getDomain?.id });
    }
});

watch(() => form.value.domain_id, (newDomainId) => {
    // Fetch tree data
    form.value.parent_material = 0
    materialTree({ domain_id: form.value.domain_id });

    // Check if newDomainId is present in domains_data and fetch 
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchMaterialData();
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