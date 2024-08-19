<template>
    <DefaultCard  :cardTitle="form.id ? `Edit Store Category ` : `Add Store Category`">
        <DomainComponent :domains="items" @customChange="(id)=>form.domain_id = id"></DomainComponent>
        <form @submit.prevent="handleSubmit">
        <div class="p-6.5 grid grid-cols-2 gap-6">
            <div class="flex flex-col ">
                <TextInput type="text" class=" " :class="{ 'border-red': errors.name }"
                    placeholder="" v-model="form.name" :errMessage="errors.name"
                    @update:model="clearError('name')" label="Name" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The name is how it appears on your site.
                </p>
            </div>
            <div class="flex flex-col ">
                <TextInput type="text" class="block mr-2 h-[40px] w-full" 
                    placeholder="" v-model="form.slug" label="Slug" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only
                    letters, numbers, and hyphens.
                </p>
            </div>
            <div class="flex flex-col w-full mt-6">
                <TextInput type="text" class="block mr-2  w-full"
                label="Category Page Title Tag %category_name%"
                     placeholder="" 
                    v-model="form.category_page_title" 
                    />
            </div>
            <div class="flex flex-col w-full ">
                <TextInput type="text" class="block mr-2  w-full"
                label="Product Page Title %category_name% %product_name% %product_price%"
                     placeholder="" 
                    v-model="form.product_page_title" 
                    />
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Parent Material" value="Parent Store Category " />
                <Select :options="storeCategoryTree" :defaultZero='true' showfield="name" class="w-full" valueField="id" label="Select "
                    v-model="form.parent_store_catgory" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop
                    and Big Band.
                </p>
            </div>
       
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Description"
                     placeholder="" :isTextarea="true" rows="4"
                    v-model="form.description" 
                    />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Category Page Description %category_name%"
                     placeholder="" :isTextarea="true" rows="4"
                    v-model="form.category_page_description" 
                    />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Product Page Description %category_name% %product_name% %product_price%"
                     placeholder="" :isTextarea="true" rows="4"
                    v-model="form.product_page_description" 
                    />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Product Page Keywords %category_name% %product_name% %product_price%"
                     placeholder="" :isTextarea="true" rows="4"
                    v-model="form.product_page_keyword" 
                    />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Category Page Keywords %category_name%"
                     placeholder="" :isTextarea="true" rows="4"
                    v-model="form.category_page_keyword" 
                    />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
           
           
        </div>
        <button type="submit"
            class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
           {{ id ? `Update ` : `Submit` }}
        </button>
    </form>
</DefaultCard>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, ref,watch } from 'vue'
import { getStoreCategoryTree } from '@/helper/Apis'
import StoreServices from '@/services/StoreServices'
import { clearError,showToast } from '@/helper/functions'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'

// Store and Router
const store = useStore()
const router = useRouter()

// Reactive State
const errors = ref({})
const loading = ref(false)
const form = ref({
  ...store.getters.editData,
  parent_store_catgory: store.getters.editData?.parent_store_catgory ?? 0
})
const PreviousDomain = ref(null)
const storeCategoryTree = ref([])

// Form Validation
const validateForm = () => {
  errors.value = {}
  if (!form.value.name) {
    errors.value.name = 'Name is required'
    return false
  }
  return true
}

// Submit Handler
const handleSubmit = async () => {
  if (validateForm()) {
    loading.value = true
    try {
      if (form.value.domain_id !== PreviousDomain.value) {
        delete form.value.id
      }
      const { deleted_at, created_at, updated_at, ...payload } = form.value
      const action = store.getters.editData ? StoreServices.editStoreCategory : StoreServices.addStoreCategory
      const { status, data } = await action(payload)
      if (status === 200 && data.success) {
        showToast(data.message, 'success')
        store.dispatch('clearEditData')
        router.push('/store-category')
      } else if (status === 400) {
        showToast(data.message, 'error')
      }
    } catch (error) {
      showToast('Something went wrong', 'error')
      console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} store category:`, error)
    } finally {
      loading.value = false
    }
  }
}

// Fetch Store Category Tree
const handleStoreCategoryTree = async (domainId) => {
  try {
    storeCategoryTree.value = await getStoreCategoryTree({ domain_id: domainId })
  } catch (error) {
    console.error('Error fetching store category tree:', error)
  }
}

// Lifecycle Hooks
onMounted(() => {
  PreviousDomain.value = store.getters.getDomain.id
  handleStoreCategoryTree(store.getters.getDomain.id)
})

// Watchers
watch(
  () => form.value.domain_id,
  (newDomainId) => {
    handleStoreCategoryTree(newDomainId)
    form.value.parent_store_catgory = 0
  }
)
</script>