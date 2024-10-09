<template>
  <DefaultCard :cardTitle="form.id ? `Edit Store Category ` : `Add Store Category`">
    <DomainComponent @customChange="(id) => (form.domain_id = id)" :deleteService="StoreServices.deleteStoreCategory"
      masterKey="master_store_category_id" :masterDeleteService="StoreServices.deleteMasterProductCategory"
      routeTo="store-category" />

    <template v-if="form.id" v-slot:header>
      <MasterSlugForm :form="form" @update-slug="() => fetchStoreCategoryData()"
        :SlugUpdateservices="StoreServices.masterProductCategorySlugUpdate"
        masteridKeyName="master_store_category_id" />
    </template>
    <form @submit.prevent="handleSubmit">
      <div class="p-6.5 grid grid-cols-2 gap-6">
        <div class="flex flex-col">
          <TextInput type="text" class=" " :class="{ 'border-red': errors.name }" placeholder="" v-model="form.name"
            :errMessage="errors.name" @update:model="clearError('name')" label="Name" :hasCheckBox="checkBoxFlag"
            @update:checkValue="(value) => {
              checkedFields.name = value
            }
              " />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The name is how it appears on your site.
          </p>
        </div>
        <div class="flex flex-col">
          <TextInput type="text" class="block mr-2 h-[40px] w-full" placeholder="" v-model="form.slug" label="Slug"
            disabled />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The “slug” is the URL-friendly version of the name. It is usually all lowercase and
            contains only letters, numbers, and hyphens.
          </p>
        </div>
        <div class="flex flex-col w-full mt-6">
          <TextInput type="text" class="block mr-2 w-full" label="Category Page Title Tag %category_name%"
            placeholder="" v-model="form.category_page_title" :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => {
              checkedFields.category_page_title = value
            }
              " />
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2 w-full"
            label="Product Page Title %category_name% %product_name% %product_price%" placeholder=""
            v-model="form.product_page_title" :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => {
              checkedFields.product_page_title = value
            }
              " />
        </div>
        <div class="flex flex-col">
          <InputLabel for="Parent Material" value="Parent Store Category " />
          <Select :options="storeCategoryTree" :defaultZero="true" showfield="name" class="w-full" valueField="id"
            label="Select " v-model="form.parent_store_catgory" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            Assign a parent term to create a hierarchy. The term Jazz, for example, would be the
            parent of Bebop and Big Band.
          </p>
        </div>

        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2 w-full" label="Description" placeholder="" :isTextarea="true"
            rows="4" v-model="form.description" :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => {
              checkedFields.description = value
            }
              " />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The description is not prominent by default; however, some themes may show it.
          </p>
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2 w-full" label="Category Page Description %category_name%"
            placeholder="" :isTextarea="true" rows="4" v-model="form.category_page_description"
            :hasCheckBox="checkBoxFlag" @update:checkValue="(value) => {
              checkedFields.category_page_description = value
            }
              " />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The description is not prominent by default; however, some themes may show it.
          </p>
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2 w-full"
            label="Product Page Description %category_name% %product_name% %product_price%" placeholder=""
            :isTextarea="true" rows="4" v-model="form.product_page_description" :hasCheckBox="checkBoxFlag"
            @update:checkValue="(value) => {
              checkedFields.product_page_description = value
            }
              " />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The description is not prominent by default; however, some themes may show it.
          </p>
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2 w-full"
            label="Product Page Keywords %category_name% %product_name% %product_price%" placeholder=""
            :isTextarea="true" rows="4" v-model="form.product_page_keyword" :hasCheckBox="checkBoxFlag"
            @update:checkValue="(value) => {
              checkedFields.product_page_keyword = value
            }
              " />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The description is not prominent by default; however, some themes may show it.
          </p>
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2 w-full" label="Category Page Keywords %category_name%" placeholder=""
            :isTextarea="true" rows="4" v-model="form.category_page_keyword" :hasCheckBox="checkBoxFlag"
            @update:checkValue="(value) => {
              checkedFields.category_page_keyword = value
            }
              " />
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
import _ from 'lodash'
import { useStore } from 'vuex'
import { useRouter,onBeforeRouteLeave } from 'vue-router'
import { onMounted, ref, watch, computed } from 'vue'
import { getStoreCategoryTree } from '@/helper/Apis'
import StoreServices from '@/services/StoreServices'
import { clearError, showToast, getGlobalUpdateData } from '@/helper/functions'
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
const checkedFields = ref({})
const checkBoxFlag = ref(Boolean(form.value.id))
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
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean)
    loading.value = true
    try {
      const { deleted_at,domain, created_at, slug, domains_data, default_domain, updated_at, ...payload } =
        form.value
      if (!form.value?.domains_data?.includes(form.value.domain_id)) {
        delete payload.id
      }
      const action = store.getters.editData
        ? StoreServices.editStoreCategory
        : StoreServices.addStoreCategory
      const { status, data } = await action(payload)
      if (status === 200 && data.success) {
        if (hasCheckedFields) {
          handleGlobalUpdate();
        }
        else {
          showToast(data.message, 'success');
          router.push('/store-category')
          store.dispatch('clearEditData')
        }

      } else if (status === 400) {
        showToast(data.message, 'error')
      }
    } catch (error) {
      showToast(error, 'error')
      console.error(
        `Error while ${store.getters.editData ? 'editing' : 'adding'} store category:`,
        error
      )
    } finally {
      loading.value = false
    }
  }
}

// Global Update Handler
const handleGlobalUpdate = async () => {
  const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value)
  if (_.isEmpty(globalUpdate)) return

  const payload = {
    master_store_category_id: form.value.master_store_category_id,
    global_keys: globalUpdate
  }

  try {
    const { status, data } = await StoreServices.globalProductCategoryUpdate(payload)
    status === 200 && data.success
      ? showToast(data.message, 'success')
      : showToast(data.message, 'error')
    if (status === 200 && data.success) router.push('/store-category')
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
const fetchStoreCategoryData = async () => {
  loading.value = true
  const payload = {
    master_store_category_id: form.value.master_store_category_id,
    domain_id: form.value.domain_id
  }
  try {
    const { status, data } = await StoreServices.getStoreCategory(payload)
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
  handleStoreCategoryTree(store.getters.getDomain.id)
})

watch(
  () => form.value.domain_id,
  (newDomainId) => {
    // Fetch tree data
    handleStoreCategoryTree(newDomainId)
    // Check if newDomainId is present in domains_data and fetch
    if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
      fetchStoreCategoryData()
    } else {
      console.log('data not in array', form.value?.domains_data)
    }
  }
)

// Computed Property
const buttonText = computed(() => {
  return form.value.id
    ? 'Update'
    : 'Submit'
})

onBeforeRouteLeave((to, from, next) => {
    store.dispatch('clearEditData');
    next();
});

</script>
