<template>
  <!-- <div class="ml-96"><Languages/></div> -->
  <PageHeader> Home Slider</PageHeader>
  <div class="flex  content-between justify-between   mb-2">
    <div class="flex">
      <Select cusClass="h-[40px] border-box" :options="bulkOptions" showfield="text" valueField="value"
        label="Bulk Options" v-model="bulkActionSelected" />
      <Button class="px-2 py-2 m-auto" @click="handleBulkActions()">Apply</Button>
      <div class="w-52">
        <Select :options="getDominsList" showfield="name" class="w-full" valueField="id" label="Select Domain" v-model="domain_id" />
      </div>
    </div>
    <div class="flex rounded-lg bg-transparent">
      <TextInput type="text" class="block bg-white  mr-2 rounded-lg h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button @click="() => {router.push({ name: 'home-slider-form'}); store.dispatch('clearEditData'); }"class="px-2 py-2 m-auto whitespace-nowrap">Add Home Slider</Button>
    </div>  
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
    :hasCheckbox="true":cloneHeaderInFooter="true"  :stickyHeader="false"
    :rows="data" :columns="sliderCols" :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changePage">
      <template #name="data">
        <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
          {{ data.value.name }}
          <!-- <div v-if="isRowHovered(data.value)">overed</div> -->
        </div>
      </template>
      <template #featured_image_url="data">
        <img :src="$filePath(data.value.featured_image_url)" alt="Material Image" style="max-width: 50px; max-height: 50px" />
      </template>
      <template #actions="data">
        <div class="flex gap-3">
          <div @click="() => { router.push({ name: 'home-slider-form' }); store.dispatch('setEdit', data.value); }" id="edit svg">
            <EditSvg />
          </div>
          <div id="delete svg" @click="() => { material_id = data.value; openDeleteModal(); }">
            <DeleteSvg />
          </div>
        </div>
      </template>
    </vue3-datatable>
  </div>

  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Material'" @delete="handleDeleteHomeSlider">
    Do you want to delete ?
  </DeleteModal>
  <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import DeleteModal from '@/components/Admin-components/Modals/DeleteModal.vue'
import { ref, onMounted,watch } from 'vue'
import { showToast } from '@/helper/functions'
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import { getDomins } from '@/helper/Apis'
import { sliderCols,bulkOptions } from '@/json/data'
import Select from '@/components/Admin-components/form-components/Select.vue'
import HomeSliderServices from '@/services/HomeSliderServices'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()

// States
const bulkActionSelected = ref(null)
const search = ref('')
const material_id = ref('')
const loading = ref(false)
const dataTableLoding = ref(false)
const data = ref([])
const totalRows = ref(0)
const datatable = ref(null)
const deleteModalIsOpen = ref(false)
const domain_id = ref('')
const getDominsList = ref([])

// Methods
const openDeleteModal = () => { deleteModalIsOpen.value = true }

const changePage = async (page) => {
  await handleGetHomeSlider({ limit: page.pagesize, page: page.current_page })
}

// get current page
const handleGetHomeSlider = async (payload) => {
  try {
    const { status, data: responseData } = await HomeSliderServices.getHomeSlider(payload)
    if (status === 200 ) {
      data.value = responseData.data || []
      totalRows.value = responseData.total_records || 0
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// delte single record
const handleDeleteHomeSlider = async () => {
  try {
    const { status, data } = await HomeSliderServices.deleteHomeSlider({ id: material_id.value.id })
    if (status === 200) {
      showToast(data.message, 'success')
      data.value = data.value.filter(item => item.id !== material_id.value.id)
      deleteModalIsOpen.value = false
    } else {
      showToast(data.message, 'error')
    }
  } catch (error) {
    console.error('Error deleting:', error)
  } finally {
    loading.value = false
  }
}

// bulk delete
const handleBulkActions = async () => {
  if (bulkActionSelected.value === 'delete') {
    const selected = datatable.value.getSelectedRows()
    const ids = selected.map(item => item.id)
    try {
      const { status, data } = await HomeSliderServices.BulkDeleteHomeSlider({ id: ids })
      if (status === 200 && data.success) {
        showToast(data.message, 'success')
        await handleGetHomeSlider({ limit: 10, page: 1, domain_id: domain_id.value })
      }
    } catch (error) {
      console.error('Error during bulk delete:', error)
    }
  }
}

// get the domain
const getDomainList = async () => {
  try {
    const domains = await getDomins()
    getDominsList.value = domains
    const defaultDomain = domains.find(site => site.default === 1)
    domain_id.value = defaultDomain.id
    store.dispatch('setDomain', defaultDomain)
  } catch (error) {
    console.error('Error fetching domains:', error)
  }
}

// Lifecycle hooks
onMounted(() => {
  getDomainList()
})

watch(
    () => domain_id.value,
    () => {
      const defaultDomain = getDominsList.value.filter(site => site.id == domain_id.value );
      store.dispatch('setDomain', defaultDomain[0]);
      handleGetHomeSlider({limit:10,page:1,domain_id:domain_id.value});
    }
);
</script>