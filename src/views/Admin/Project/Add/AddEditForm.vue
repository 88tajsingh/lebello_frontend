<template>
    <DefaultCard :cardTitle="form.id ? `Edit Projects` : `Add New Project`">

        <DomainComponent @customChange="(id) => (form.domain_id = id)" :deleteService="ProjectServices.deleteProjects"
            masterKey="master_project_id" :masterDeleteService="ProjectServices.deleteMasterProjects"
            routeTo="projects" />
        <template v-if="form.id" v-slot:header>
            <MasterSlugForm :form="form" @update-slug="() => fetchMaterialData()"
                :SlugUpdateservices="ProjectServices.masterProjectsSlugUpdate" masteridKeyName="master_project_id" />
        </template>
        <form @submit.prevent="handleSubmit" class="mb-5 m-5">
            <div class="grid grid-cols-12 gap-4 mt-5">
                <div class="col-span-8">
                    <Accordion :open="true" header="Fileds">
                        <div class="px-6">
                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Title *"
                                placeholder="Add title" v-model="form.title" :errMessage="errors.title" :errors="errors"
                                :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => {
                                    checkedFields.title = value
                                }
                                    " />

                            <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug (Read Only)"
                                placeholder="slug" v-model="form.slug" :errMessage="errors.slug" disabled />
                        </div>
                    </Accordion>
                    <div class="mt-3">
                        <Accordion :open="true" header="Categories">
                            <div class="mt-2 px-6 flex h-auto">
                                <Checkbox :nexted="true" :checkedData="form.project_categories" :dropdown="true"
                                    valueField="id" showField="name" :data="projectCategories"
                                    @checked-items="(checked) => (form.project_categories = checked)" />
                            </div>
                        </Accordion>
                    </div>
                </div>

                <div class="col-span-4">
                    <Accordion header="Publish" open="false">
                        <div class="px-1 py-3">
                            <div class="px-4">
                                <div class="flex flex-col">
                                    <InputLabel for="status" value="Status" />
                                    <Select :options="statusData" showfield="name" class="w-full" valueField="value"
                                        label="Select " v-model="form.status" :hasCheckBox="checkBoxFlag"
                                        @update:checkValue="(value) => {
                                            checkedFields.status = value
                                        }
                                            " />
                                </div>
                            </div>
                        </div>
                        <div class="bg-[#f6f7f7] flex py-3">
                            <Button type="submit" bg_th_color="text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                                class="text-sm ml-auto px-3 py-2">
                                {{ buttonText }}
                            </Button>
                        </div>
                    </Accordion>
                    <div class="mt-4">
                        <Accordion :open="true" header="Featured image">
                            <div class="px-6 h-auto">
                                <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                <div class="flex w-full h-auto">
                                    <SingleCheck v-if="form.id" label="" v-model="checkedFields.featured_image">
                                    </SingleCheck>
                                    <div class="py-2 rounded-lg w-full px-2 border border-stroke"
                                        @click="() => (imageData.featured_image.IsOpen = true)">
                                        {{ imageData.featured_image.mediaName }}
                                    </div>
                                </div>

                                <div class="mt-3 flex overflow-x-auto">
                                    <img v-if="imageData.featured_image.images[0]"
                                        v-for="file in imageData.featured_image.images" :key="file"
                                        :src="$filePath(file.file_url)" class="inline-block w-auto h-34 mr-4"
                                        :alt="file?.alternative_text || ''" />
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
        <GetLibrary btnName="select File" :getFlag="true" :selected="imageData.featured_image.images" :singleFile="true"
            :closeModal="() => {
                imageData.featured_image.IsOpen = false
            }
                " :selectedFiles="handleFeatureFiles" />
    </popupModal>

    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import _ from 'lodash'
import { ref, onMounted, watch, computed } from 'vue'
import { handleFileUpdate } from '@/helper/functions'
import { showToast, getGlobalUpdateData } from '@/helper/functions'
import ProjectServices from '@/services/ProjectServices'
import Accordion from '@/components/Admin-components/Accordion.vue'
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import { getProjectCategoryTree } from '@/helper/Apis'
import DatePicker from '@/components/Admin-components/form-components/DatePicker.vue'
import { PublishOptions, statusData } from '@/json/data'
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
    project_categories: []
})
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))
const projectCategories = ref([])
const imageData = ref({
    featured_image: { IsOpen: false, mediaName: 'Select Feature Media', images: [] }
})

const handleFeatureFiles = (data) =>
    handleFileUpdate('featured_image', data, imageData, form,false)

// Form Validation
const validateForm = () => {
    errors.value = {}
    if (!form.value.title) {
        errors.value.title = 'Title is required'
        return false
    }
    return true
}

// Submit Handler
const handleSubmit = async () => {
    if (!validateForm()) return
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
    loading.value = true
    try {
        const action = store.getters.editData
            ? ProjectServices.editProjects
            : ProjectServices.addProjects
        const {
            deleted_at,
            created_at,
            featured_image_url,
            slug,
            domains_data,
            default_domain,
            updated_at,
            ...payload
        } = form.value
        if (!form.value?.domains_data?.includes(form.value.domain_id)) {
            delete payload.id
        }
        const { status, data } = await action(payload)
        if (status === 200 && data.success) {
            if (hasCheckedFields) {
                handleGlobalUpdate();
            }
            else {
                showToast(data.message, 'success');
                router.push('/projects')
            }
        } else if (status === 400) {
            showToast(data.message, 'error')
        }
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} project:`, error)
    } finally {
        loading.value = false
    }
}

// Global Update Handler
const handleGlobalUpdate = async () => {
    const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
    if (_.isEmpty(globalUpdate)) return

    const payload = {
        master_project_id: form.value.master_project_id,
        global_keys: globalUpdate
    }

    try {
        const { status, data } = await ProjectServices.globalProjectsUpdate(payload)
        status === 200 && data.success
            ? showToast(data.message, 'success')
            : showToast(data.message, 'error')
        if (status === 200 && data.success) router.push('/projects')
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error(
            `Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`,
            error
        )
    } finally {
        loading.value = false
    }
}

// Fetch Perticular Domain Data
const fetchMaterialData = async () => {
    loading.value = true
    const payload = {
        master_project_id: form.value.master_project_id,
        domain_id: form.value.domain_id
    }
    try {
        const { status, data } = await ProjectServices.getProjects(payload)
        if (status === 200 && data.success) {
            const dataValue = data.data[0]
            store.dispatch('setEdit', dataValue)
            Object.assign(form.value, dataValue)
        }
    } catch (error) {
        showToast('Something went wrong', 'error')
        console.error('Error while fetching data:', error)
    } finally {
        loading.value = false
    }
}

// Fetch Project Category Tree
const fetchProjectCategoryTree = async (domainId) => {
    try {
        projectCategories.value = await getProjectCategoryTree({ domain_id: domainId })
    } catch (error) {
        console.error('Error fetching project category tree:', error)
    }
}

// Lifecycle Hooks
onMounted(() => {
    if (store.getters.editData) {
        imageData.value.featured_image.images = [store.getters.editData?.featured_image_url]
        imageData.value.featured_image.mediaName = store.getters.editData?.featured_image_url?.file_url || 'Featured Image'
        fetchProjectCategoryTree(store.getters.editData?.domain_id)
    }
})

watch(
    () => form.value.domain_id,
    (newDomainId) => {
        // Fetch tree data
        form.value.project_categories = []
        fetchProjectCategoryTree({ domain_id: newDomainId })

        // Check if newDomainId is present in domains_data and fetch
        if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
            fetchMaterialData()
        }
    }
)

// Computed Property
const buttonText = computed(() => {
    return form.value.id ? 'Update' : 'Submit'
})
</script>