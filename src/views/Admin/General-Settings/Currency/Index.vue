<template>
  <PageHeader>Currency</PageHeader>
  <div class="flex content-between justify-between px-1 mb-2">
    <!-- <div class="flex">
        <Select cusClass="h-[38px] border-boxdark" :options="bulkOption" showfield="text" valueField="value" label="Bulk Options" v-model="actionSelected" />
        <Button class="px-2 py-2 m-auto">Apply</Button>
      </div> -->
    <div class="flex ml-auto">
      <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button v-if="permissions.write" @click="() => {
        modalIsOpen = true
      }
        " class="px-2 py-2">Add Rate</Button>
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <!-- :totalRows="totalRows" :isServerMode="true" -->
    <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
      :hasCheckbox="false" :cloneHeaderInFooter="true" :stickyHeader="false" :rows="rows" :columns="cols"
      :loading="getLoading" :pageSize="10" :search="search" @change="changePages">
      <template #name="data">
        <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
          {{ data.value.name }}
          <!-- <div v-if="isRowHovered(data.value)">overed</div> -->
        </div>
      </template>
      <template #status="data">
        <span v-if="data.value.status"> Active</span>
        <span v-else> In Active</span>
      </template>
      <template #country="data">
        <span> {{ data.value.country.name }}</span>
      </template>
      <template v-if="permissions.write" #actions="data">
        <div class="flex gap-3">
          <div @click="() => {
            editData = { ...data.value }
            editIsOpen = true
          }
            ">
            <EditSvg />
          </div>
          <div id="delete svg" @click="() => {
            deleteModalIsOpen = true
            editData = data.value.id
          }
            ">
            <DeleteSvg />
          </div>
        </div>
      </template>
    </vue3-datatable>
  </div>

  <PopupModal modalTitle="Add Currency Rate" custonClasses="w-[800px] h-[400px]" v-model:isOpen="modalIsOpen">
    <AddEditForm @handleApi="handleAddDomain" :allCurrencies="allCurrencies" />
  </PopupModal>
  <PopupModal modalTitle="Edit Pages" custonClasses="w-[800px] h-[400px]" v-model:isOpen="editIsOpen">
    <AddEditForm :allCurrencies="allCurrencies" :exchangeData="editData" @handleApi="handleEditPages" />
  </PopupModal>
  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Currency'" @delete="handleDeleteDomain">
    Do you want to delete?
  </DeleteModal>
  <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import { ref, onMounted, toRaw } from 'vue'
import '@bhplugin/vue3-datatable/dist/style.css'
import { showToast } from '@/helper/functions'
import { getAllCurrenciesList } from '@/helper/Apis'
import AddEditForm from './AddEditForm.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import CommonServices from '@/services/CommonServices'
import { useRouter } from 'vue-router'

import store from '@/store'

const router = useRouter()
const actionSelected = ref(null)
const loading = ref(false)
const search = ref('')
const bulkOption = [{ text: 'Delete', value: 'Delete' }]
const cols = ref([
  { field: 'from_currency', title: 'From Currency', slot: true },
  { field: 'to_currency', title: 'To Currency', filter: true },
  { field: 'exchange_rate', title: 'Exchange Rate' },
  { field: 'actions', title: 'Actions' }
])
const getLoading = ref(false)
const editData = ref({})
const rows = ref([])
const allCurrencies = ref([])
const actionsFlag = ref(null)
const modalIsOpen = ref(false)
const editIsOpen = ref(false)
const permissions = store.getters.user.permissions;
const deleteModalIsOpen = ref(false)
const totalRows = ref('')
const pagination = ref({})

const editModal = (data) => {
  editData.value = { ...data.value }
  editIsOpen.value = true
}

const handleMouseEnter = (data) => {
  actionsFlag.value = data.value.name
}

const handleMouseLeave = () => {
  actionsFlag.value = null
}

const isRowHovered = (value) => {
  return actionsFlag.value === value.name
}

const changePages = (page) => {
  const payload = { limit: page.pagesize, page: page.current_page }
  pagination.value = payload
  handleGetDomains(payload)
}

// api calls
const handleGetDomains = async () => {
  try {
    getLoading.value = true
    const res = await CommonServices.getExchangeRates()
    if (res.status === 200 && res.data.success) {
      rows.value = res.data.data
      //   totalRows.value = res.data.total_records;
    }
  } catch (e) {
    console.error('Error while getting domains:', e)
  } finally {
    getLoading.value = false
  }
}

const handleDeleteDomain = async () => {
  try {
    loading.value = true
    const res = await CommonServices.deleteExchangeRates({ id: editData.value })
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success')
      rows.value = rows.value.filter((item) => item.id !== editData.value)
      deleteModalIsOpen.value = false
      editData.value = null
    } else if (res.status === 400) {
      showToast(res.data.message, 'error')
    }
  } catch (e) {
    console.error('Error while deleting domain:', e)
  } finally {
    loading.value = false
  }
}

const handleAddDomain = async (payload) => {
  try {
    loading.value = true
    const res = await CommonServices.addExchangeRates(payload)
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success')
      modalIsOpen.value = false
      handleGetDomains(pagination.value)
    } else {
      showToast('Something went wrong', 'error')
      console.error('Error while adding domain:', res.message)
    }
  } catch (e) {
    console.error('Error while adding domain:', e)
  } finally {
    loading.value = false
  }
}

const handleEditPages = async (payload) => {
  try {
    loading.value = true
    const res = await CommonServices.editExchangeRates(payload)
    if (res.status === 200 && res.data.success === true) {
      loading.value = false
      showToast(' Edit Page sucessfully', 'success')
      editIsOpen.value = false
    }
    if (res.status_code === 400) {
      loading.value = false
      showToast('Somthing went wrong', 'error')

      console.error('Error while editing pages:', res.message)
    }
  } catch (e) {
    loading.value = false
    console.error('Error while editing pages:', e)
  }
}

const getAllCurrencies = async () => {
  allCurrencies.value = await getAllCurrenciesList()
}

onMounted(() => {
  handleGetDomains()
  getAllCurrencies()
})
</script>
