<template>
  <DefaultCard :cardTitle="form.id ? `Edit Tags` : `Add Tags`">
    <DomainComponent :domains="form.domains_data" @domainArray="(ids) => { }"
      @customChange="(id) => (form.domain_id = id)"
      :deleteService="CommonServices.deleteTags"
      >
    
    </DomainComponent>

    <form @submit.prevent="handleFormSubmit">
      <div class="p-6.5 grid grid-cols-2 gap-6">
        <div class="flex flex-col">
          <TextInput type="text" class=" " :class="{ 'border-red': errors.name }" placeholder="" v-model="form.name"
            :errMessage="errors.name" :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => { checkedFields.name = value }"
            label="Name" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The name is how it appears on your site.
          </p>
        </div>

        <div class="flex flex-col">
          <TextInput type="text" class="block mr-2 h-[40px] w-full" placeholder="" v-model="form.slug"
            :a="checkBoxFlag" @update:checkValue="(value) => { checkedFields.slug = value }" label="Slug" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The “slug” is the URL-friendly version of the name. It is usually all lowercase and
            contains only letters, numbers, and hyphens.
          </p>
        </div>

        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2 w-full" label="Description" placeholder="" :isTextarea="true"
            :rows="4" v-model="form.description" :hasCheckBox="checkBoxFlag"
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
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import CommonServices from '@/services/CommonServices'
import { getGlobalUpdateData, validateForm, checkForGlobalUpdate } from '@/helper/functions'
import { commonApiCalls, commonGetCalls } from '@/helper/Apis'
import { onMounted, ref, watch, computed } from 'vue'
import _ from 'lodash'
import { useStore } from 'vuex'

// Access the Vuex store
const store = useStore()

// Reactive state variables
const loading = ref(false)
const form = ref(store.getters.editData || {})
const checkedFields = ref({})
const checkBoxFlag = ref(form.value.id ? true :false)
const errors = ref({})
const PreviousDomain = ref(null)


// Function to handle fetching and updating form data
const handleGetTags = async () => {
  try {
    const payload = { master_tag_id: form.value.master_tag_id, domain_id: form.value.domain_id }
    const newData = await commonGetCalls(payload, loading)
    if (newData) {
      Object.assign(form.value, newData)
      console.log("newData", newData)
    }
  } catch (error) {
    console.log(error)
  }
}
  
// check the api calls if checked then call globalupdate else call handleAddEditApi
const handleFormSubmit = async () => {
  const hasCheckedFields = Object.values(checkedFields.value).some(value => value)
  if (hasCheckedFields) {
    await handleGlobalUpdate()
  } else {
    await handleAddEditApi()
  }
}

// Function to handle form submission (Add or Edit Tags)
const handleAddEditApi = async () => {
  if (!validateForm('name', 'Name', form, errors)) return

  loading.value = true
  const { deleted_at, created_at, updated_at, domains_data, featured_image_url, ...payload } =
    form.value

  if (payload.domain_id !== PreviousDomain.value) delete payload.id

  const service = store.getters.editData ? CommonServices.editTags : CommonServices.addTags

  commonApiCalls(service, payload, 'tags', loading)

  handleGlobalUpdate()
}

// Function to handle global updates based on checked fields
const handleGlobalUpdate = async () => {
  const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
  if (!_.isEmpty(globalUpdate)) {
    const payload = {
      master_tag_id: form.value.master_tag_id,
      tag_keys: globalUpdate
    }
    commonApiCalls(CommonServices.globalUpdateTags, payload, 'tags', loading)
  }
}

// Initialize component: set previous domain ID
onMounted(() => {
  PreviousDomain.value = store.getters.getDomain.id
})

// Watch for changes in domain_id and handle data fetch
watch(
  () => form.value?.domain_id,
  (newDomainId) => {
    if (Array.isArray(form.value.domains_data) && form.value?.domains_data.includes(newDomainId)) {
      handleGetTags()
    } else {
      console.log('data not in array', form.value?.domains_data)
    }
  }
)

watch(
  () => checkedFields.value,
  () => {
    checkForGlobalUpdate(checkedFields)
  }
)

// Computed property for button text
const buttonText = computed(() => {
  const hasCheckedFields = Object.values(checkedFields.value).some(value => value)
  if (hasCheckedFields) {
    return 'Global Update'
  }
  return form.value.id ? 'Update' : 'Submit'
})
</script>
