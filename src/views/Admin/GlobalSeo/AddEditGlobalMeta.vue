<template>
    <DefaultCard :cardTitle="form.id ? `Edit Meta Tag` : `Add New Meta Tag`">
        <DomainComponent @customChange="(id) => (form.domain_id = id)" :deleteService="GlobalMetaTags.deleteMetaTags"
            routeTo="global-seo" />
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="p-6.5 grid grid-cols-2 gap-6">
                <div class="flex flex-col">
                    <TextInput type="text" class=" " :class="{ 'border-red': errors.key }" placeholder=""
                        v-model="form.key" label="Key" :errMessage="errors.key"
                        :errorClass="errors.key ? 'border-red-500' : ''"
                        @update:modelValue="$clearError(errors, 'key')" />
                </div>

                <div class="flex flex-col">
                    <TextInput type="text" class=" " :class="{ 'border-red': errors.meta_title }" placeholder=""
                        v-model="form.meta_title" :errMessage="errors.meta_title" label="Meta Title" />
                </div>

                <div class="flex flex-col">
                    <TextInput type="text" class=" " :class="{ 'border-red': errors.meta_keywords }" placeholder=""
                        v-model="form.meta_keywords" :errMessage="errors.meta_keywords" label="Meta Keywords" />
                </div>

                <div class="flex flex-col w-full">
                    <TextInput type="text" class="block mr-2 w-full" label="Meta Description" placeholder=""
                        :isTextarea="true" :rows="4" v-model="form.meta_description" />
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
import _ from 'lodash'
import { ref, watch, computed } from 'vue'
import { showToast } from '@/helper/functions'
import GlobalMetaTags from '@/services/GlobalMetaTagServices';
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// Store and Router
const store = useStore()
const router = useRouter()

// Reactive State
const errors = ref({})
const loading = ref(false)
const form = ref({
    ...store.getters.editData,
    status: '',
})

// Form Validation
const validateForm = () => {
    errors.value = {}
    if (!form.value.key) {
        errors.value.key = 'Key is required'
        return false
    }
    return true
}

/**
 * Handles form submission for adding/editing global SEO meta tags
 * @async
 * @function
 * @returns {undefined}
 */
const handleSubmit = async () => {
    if (!validateForm()) return
    loading.value = true
    try {
        const action = store.getters.editData
            ? GlobalMetaTags.editMetaTags
            : GlobalMetaTags.addMetaTags
        const {
            deleted_at,
            created_at,
            updated_at,
            ...payload
        } = form.value
        if (!form.value?.domains_data?.includes(form.value.domain_id)) {
            delete payload.id
        }
        const { status, data } = await action(payload)
        if (status === 200 && data.success) {
            showToast(data.message, 'success');
            router.push('/global-seo')
        } else if (status === 400) {
            showToast(data.message, 'error')
        }
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} global-seo:`, error)
    } finally {
        loading.value = false
    }
}


// Fetch Perticular Domain Data
const fetchMetaTagData = async () => {
    loading.value = true
    const payload = { key: form.value.key, domain_id: form.value.domain_id }
    try {
        const { status, data } = await GlobalMetaTags.getMetaTags(payload)
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

// Watchers
watch(() => form.value.domain_id, (newDomainId) => {
    // Check if newDomainId is present in domains_data and fetch 
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
        fetchMetaTagData();
    }
});

// Computed Property
const buttonText = computed(() => {
    return form.value.id ? 'Update' : 'Submit'
})
</script>