<template>
  <DefaultCard :cardTitle="form.id ? `Edit Tags` : `Add Tags`">
    <DomainComponent @customChange="(id) => (form.domain_id = id)"
      :deleteService="CommonServices.deleteTags" masterKey="master_tag_id"
      :masterDeleteService="CommonServices.masterSlugDelete" routeTo="tags">
    </DomainComponent>
    <template v-if="form.id" v-slot:header>
      <form  class="flex  my-auto" @submit.prevent="updateSlug">
        <TextInput
        type="text"
        class="block mr-2 h-[40px] w-full"
        placeholder="Master Slug"
        v-model="slugUpdate"
        />
        <button type="submit"
        :disabled="slugUpdate===form.slug"
        class="flex px-5 items-center justify-center rounded bg-primary text-[15px]  font-sm text-gray hover:bg-opacity-90">
       Update Slug
      </button>
      </form>
  </template>

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
           disabled="true"  label="Slug (Read only)" />
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
import { commonApiCalls,  } from '@/helper/Apis'
import { showToast } from '@/helper/functions'
import { onMounted, ref, watch, computed } from 'vue'
import _ from 'lodash'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// Access the Vuex store
const store = useStore()
const router = useRouter()

// Reactive state variables
const loading = ref(false)
const form = ref(store.getters.editData || {})
const checkedFields = ref({})
const checkBoxFlag = ref(form.value.id ? true :false)
const errors = ref({})
const slugUpdate = ref(form.value.slug)


// Function to handle fetching and updating form data
const handleGetTags = async () => {
  
    try {
    const payload = { master_tag_id: form.value.master_tag_id, domain_id: form.value.domain_id }
      const res = await CommonServices.getTags(payload);
      if (res.status === 200 && res.data.success) {
         const data= res.data.data[0];
          store.dispatch('setEdit', data);
           Object.assign(form.value, data)
      }
    } catch (e) {
      showToast('Something went wrong', 'error')
      console.error('Error while getting contract locations:', e);
    } finally {
      
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
  if(!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id
  // if (payload.domain_id !== PreviousDomain.value) delete payload.id
  const service = store.getters.editData ? CommonServices.editTags : CommonServices.addTags
  try {
      const res = await service(payload);
      if (res.status === 200) {
        showToast(res.data.message, 'success')
        router.push(`/tags`)
      } else if (res.status === 400) {
        showToast(res.data.message, 'error')
      }
      else {
        showToast(res.data.message, 'error')
      }
    } catch (error) {
      showToast('Something went wrong', 'error')
      console.error('Error:', error)
    } finally {
      loading.value = false
    }
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

// master slug update
const updateSlug = async () => {
  loading.value = true
    try {
      const {master_tag_id} = form.value
      const res = await CommonServices.masterSlugUpdate({master_tag_id,slug:slugUpdate.value});
      if (res.status === 200) {
        showToast(res.data.message, 'success')
        const data= {...form.value,slug:slugUpdate.value}
        handleGetTags();
      } else if (res.status === 400) {
        showToast(res.data.message, 'error')
      }
    } catch (error) {
      showToast('Something went wrong', 'error')
      console.error('Error:', error)
    } finally {
      loading.value = false
    }
  };

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
