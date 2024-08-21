<template>{{ form }}
    <DefaultCard  :cardTitle="form.id ? `Edit Product Contract Type ` : `Add Product Contract Type`">
        <DomainComponent :domains="items" @customChange="(id)=>form.domain_id = id"
          :deleteService="ProductServices.deleteProductCategoryType" masterKey="master_product_category_type_id"
          :masterDeleteService="ProductServices.deleteMasterProductCategoryType" routeTo="product-category-type"
          ></DomainComponent>
        <template v-if="form.id" v-slot:header>
            <MasterSlugForm
        :form="form"
        @update-slug="()=>fetchProductCategoryTypeData()"
        :SlugUpdateservices = 'ProductServices.slugUpdateProductCategoryType'
        masteridKeyName='master_product_category_type_id'
      />
    </template>
        <form @submit.prevent="handleSubmit">
        <div class="p-6.5 grid grid-cols-2 gap-6">
            <div class="flex flex-col ">
                <TextInput type="text" class=" " :class="{ 'border-red': errors.name }"
                    placeholder="" v-model="form.name" :errMessage="errors.name"
                    @update:model="clearError('name')" label="Name"
                     :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => { checkedFields.name = value }"
                    />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The name is how it appears on your site.
                </p>
            </div>
            <div class="flex flex-col ">
                <TextInput type="text" class="block mr-2 h-[40px] w-full" 
                    placeholder="" disabled="true" v-model="form.slug" label="Slug" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only
                    letters, numbers, and hyphens.
                </p>
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Parent Material" value="Parent Product Category " />
                <Select :options="getProductCategoryList" :defaultZero='true' showfield="name" class="w-full" valueField="id" label="Select "
                    v-model="form.parent_product_category_type"
                    
                    />
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
                     :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => { checkedFields.description = value }"
                    />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
           
        </div>
        <button type="submit"
            class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            {{buttonText}}
        </button>
    </form>
</DefaultCard>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { getProductCategoryTypeTree } from '@/helper/Apis'
import { clearError,showToast,validateForm,getGlobalUpdateData } from '@/helper/functions'
import { onMounted, ref,watch,computed } from 'vue'
import { useRouter } from 'vue-router';
import _ from 'lodash';
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
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))
const PreviousDomain = ref(null)
const getProductCategoryList = ref([])


// Handle Form Submission
const handleSubmit = async () => {
  if (!validateForm('name', 'Name', form, errors)) return
  const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
  hasCheckedFields ? handleGlobalUpdate() : handleAddEditApi()
}

// Submit Handler
const handleAddEditApi = async () => {
    loading.value = true
    try {
      const { deleted_at, created_at, updated_at, ...payload } = form.value
      if (!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id

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

// Global Update Handler
const handleGlobalUpdate = async () => {
  const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
  if (_.isEmpty(globalUpdate)) return

  const payload = {
    master_product_category_type_id: form.value.master_product_category_type_id,
    global_keys: globalUpdate
  }

  try {
    const { status, data } = await ProductServices.globalUpdateProductCategoryType(payload)
    status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error')
    if (status === 200 && data.success) router.push('/product-category-type')
  } catch (error) {
    showToast('Something went wrong', 'error')
    console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error)
  } finally {
    loading.value = false
  }
}


// Fetch Product category Type Data
const fetchProductCategoryTypeData = async () => {
  const payload =  { master_product_category_type_id: form.value.master_product_category_type_id, domain_id: form.value.domain_id }
  console.log(payload)
  try {
    const { status, data } = await ProductServices.getProductCategoryType(payload)
    if (status === 200 && data.success) {
      const dataValue = data.data[0]
      store.dispatch('setEdit', dataValue)
      Object.assign(form.value, dataValue)
    }
  } catch (error) {
    showToast('Something went wrong', 'error')
    console.error('Error while fetching data:', error)
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
  fetchProductCategoryTypeTree(store.getters.getDomain.id)
})

watch(() => form.value.domain_id, (newDomainId) => {
  // Fetch product type tree and reset parent product type
  fetchProductCategoryTypeTree(newDomainId);
  form.value.parent_product_category_type = 0;

  // Check if newDomainId is present in domains_data and fetch product type data if so
  if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
    fetchProductCategoryTypeData();
  } else {
    console.log('data not in array', form.value?.domains_data);
  }
});

// Computed Property
const buttonText = computed(() => {
  return Object.values(checkedFields.value).some(Boolean) ? 'Global Update' : (form.value.id ? 'Update' : 'Submit')
})
</script>