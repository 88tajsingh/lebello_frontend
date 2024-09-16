<template>
    <DefaultCard :cardTitle="form.id ? `Edit Product Category Type ` : `Add Product Category Type`">
        <DomainComponent @customChange="(id) => form.domain_id = id"
            :deleteService="ProjectServices.deleteProjectCategory" masterKey="master_project_category_id"
            :masterDeleteService="ProjectServices.deleteMasterProjectsCategory" routeTo="Project-category" />
        <template v-if="form.id" v-slot:header>
            <MasterSlugForm :form="form" @update-slug="() => fetchProjectCategoryData()"
                :SlugUpdateservices='ProjectServices.masterProjectCategorysSlugUpdate'
                masteridKeyName='master_project_category_id' />
        </template>
        <form @submit.prevent="handleSubmit">
            <div class="p-6.5 grid grid-cols-2 gap-6">
                <div class="flex flex-col ">
                    <TextInput type="text" class=" " :class="{ 'border-red': errors.name }" placeholder=""
                        v-model="form.name" :errMessage="errors.name" @update:model="clearError('name')" label="Name"
                        :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => { checkedFields.name = value }" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        The name is how it appears on your site.
                    </p>
                </div>
                <div class="flex flex-col ">
                    <TextInput type="text" class="block mr-2 h-[40px] w-full" placeholder="" v-model="form.slug"
                        label="Slug (Read Only)" disabled />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains
                        only
                        letters, numbers, and hyphens.
                    </p>
                </div>
                <div class="flex flex-col ">
                    <InputLabel for="Parent Material" value="Parent Product Category " />
                    <Select :options="projectCategoryTree" :defaultZero='true' showfield="name" class="w-full"
                        valueField="id" label="Select " v-model="form.parent_project_category" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of
                        Bebop
                        and Big Band.
                    </p>
                </div>

                <div class="flex flex-col w-full">
                    <TextInput type="text" class="block mr-2  w-full" label="Description" placeholder=""
                        :isTextarea="true" rows="4" v-model="form.description" :hasCheckBox="checkBoxFlag"
                        @update:checkValue="(value) => { checkedFields.description = value }" />
                    <p class="text-sm text-[#646970] text-[11.5px]">
                        The description is not prominent by default; however, some themes may show it.
                    </p>
                </div>

            </div>
            <button type="submit"
                class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                {{ buttonText }}
            </button>
        </form>
    </DefaultCard>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from 'lodash';
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { getProjectCategoryTree } from '@/helper/Apis'
import { clearError, showToast, getGlobalUpdateData } from '@/helper/functions'
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ProjectServices from '@/services/ProjectServices'

// Store and Router
const store = useStore();
const router = useRouter();

// Reactive State
const errors = ref({});
const loading = ref(false);
const form = ref({
    ...store.getters.editData,
    parent_project_category: store.getters.editData?.parent_project_category ?? 0
});
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))
const projectCategoryTree = ref([]);

// Form Validation
const validateForm = () => {
    errors.value = {};
    if (!form.value.name) {
        errors.value.name = 'Name is required';
        return false;
    }
    return true;
};

// Submit Handler
const handleSubmit = async () => {
    if (!validateForm('name', 'Name', form, errors)) return
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
    loading.value = true;
    try {
        const { deleted_at, created_at, slug, domains_data, default_domain, updated_at, ...payload } = form.value;
        if (!form.value?.domains_data?.includes(form.value.domain_id)) {
            delete payload.id;
        }
        const action = store.getters.editData ? ProjectServices.editProjectCategory : ProjectServices.addProjectCategory;
        const { status, data } = await action(payload);
        if (status === 200 && data.success) {
            if (hasCheckedFields) {
                handleGlobalUpdate();
            }
            else {
                showToast(data.message, 'success');
                store.dispatch('clearEditData');
                router.push('/Project-category');
            }

        } else if (status === 400) {
            showToast(data.message, 'error');
        }
    } catch (error) {
        showToast('Something went wrong', 'error');
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} project category:`, error);
    } finally {
        loading.value = false;
    }

};

// Global Update Handler
const handleGlobalUpdate = async () => {
    const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
    if (_.isEmpty(globalUpdate)) return

    const payload = {
        master_project_category_id: form.value.master_project_category_id,
        global_keys: globalUpdate
    }

    try {
        const { status, data } = await ProjectServices.globalProjectsCategoryUpdate(payload)
        status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
        if (status === 200 && data.success) router.push('/Project-category')
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
    } finally {
        loading.value = false
    }
}


// Fetch Perticular Domain Data
const fetchProjectCategoryData = async () => {
    loading.value = true
    const payload = { master_project_category_id: form.value.master_project_category_id, domain_id: form.value.domain_id }
    try {
        const { status, data } = await ProjectServices.getProjectCategory(payload)
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

// Fetch Project Category Tree
const fetchProjectCategoryTree = async (domainId) => {
    try {
        projectCategoryTree.value = await getProjectCategoryTree({ domain_id: domainId });
    } catch (error) {
        console.error('Error fetching project category tree:', error);
    }
};

// Lifecycle Hooks
onMounted(() => {
    fetchProjectCategoryTree(store.getters.getDomain.id);
});

// Watchers
watch(() => form.value.domain_id, (newDomainId) => {
    // Fetch tree data
    form.value.parent_project_category = 0
    fetchProjectCategoryTree({ domain_id: form.value.domain_id });

    // Check if newDomainId is present in domains_data and fetch 
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchProjectCategoryData();
    } else {
        console.log('data not in array', form.value?.domains_data);
    }
});


// Computed Property
const buttonText = computed(() => {
    return Object.values(checkedFields.value).some(Boolean) ? 'Global Update' : (form.value.id ? 'Update' : 'Submit')
})
</script>