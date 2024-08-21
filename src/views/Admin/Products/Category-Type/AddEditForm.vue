<template>{{ form }}
    <DefaultCard  :cardTitle="form.id ? `Edit Product Contract Type ` : `Add Product Contract Type`">
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
            <div class="flex flex-col ">
                <InputLabel for="Parent Material" value="Parent Product Category " />
                <Select :options="getProductCategoryList" :defaultZero='true' showfield="name" class="w-full" valueField="id" label="Select "
                    v-model="form.parent_product_category_type" />
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
           
        </div>
        <button type="submit"
            class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Submit
        </button>
    </form>
</DefaultCard>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { getProductCategoryTypeTree } from '@/helper/Apis'
import { clearError,showToast } from '@/helper/functions'
import { onMounted, ref,watch } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ProductServices from '@/services/ProductServices'

// Store and Router
const store = useStore()
const router = useRouter()

// Reactive State
const errors = ref({})
const loading = ref(false)
const form = ref({
  ...store.getters.editData,
  parent_product_category_type: store.getters.editData?.parent_product_category_type ?? 0
})
const PreviousDomain = ref(null)
const getProductCategoryList = ref([])

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
      if (form.value.domain_id !== PreviousDomain.value) delete form.value.id
      const { deleted_at, created_at, updated_at, ...payload } = form.value

      const action = store.getters.editData ? ProductServices.editProductCategoryType : ProductServices.addProductCategoryType
      const { status, data } = await action(payload)
      if (status === 200 && data.success) {
        showToast(data.message, 'success')
        router.push('/product-category-type')
      } else if (status === 400) {
        showToast(data.message, 'error')
      }
    } catch (error) {
      showToast('Something went wrong', 'error')
      console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product category type:`, error)
    } finally {
      loading.value = false
    }
  }
}

// Fetch Product Category Type Tree
const fetchProductCategoryTypeTree = async (domainId) => {
  try {
    getProductCategoryList.value = await getProductCategoryTypeTree({ domain_id: domainId })
  } catch (error) {
    console.error('Error fetching product category type tree:', error)
  }
}

// Lifecycle Hooks
onMounted(() => {
  PreviousDomain.value = store.getters.getDomain.id
  fetchProductCategoryTypeTree(store.getters.getDomain.id)
})

// Watchers
watch(
  () => form.value.domain_id,
  (newDomainId) => {
    fetchProductCategoryTypeTree(newDomainId)
  }
)
</script>