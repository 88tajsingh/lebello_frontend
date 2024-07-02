<template>
  <PageHeader> Swatches</PageHeader>
    <div class="flex  content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select cusClass="h-[38px] border-boxdark	  " :options="bulkOption" showfield="text" valueField="value" label="Bulk Options" v-model="actionSelected" />
      <Button class="px-2 py-2 m-auto">Apply</Button>
    </div>
    <div class="flex">
      <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full"  placeholder="Search" v-model="search"  />
      <Button :onclick="openModal" class="px-2 py-2 "> <router-link to='/swatches-add'>Add Swatches</router-link> </Button>
    </div>
  </div>
  <div class="bg-white">
    <vue3-datatable skin="bh-table-striped bh-table-hover "  :hasCheckbox="true" :loading="false"
    :rows="swatches" :columns="cols" paginationInfo="showing {0} to {1} of {2}" showNumbersCount="3"
    class="next-prev-pagination" :cloneHeaderInFooter="true"
    rowClass=""
    :search="search"
    >
    <template #name="data">
      <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
        {{ data.value.name }}
        <div v-if="isRowHovered(data.value)">overed</div>
      </div>
    </template>
    <template #src="data">
      <img :src="data.value.src" alt="Material Image" style="max-width: 50px; max-height: 50px" />
    </template>
    <template #actions="data">
      <div class="flex">
        <Button :onclick="openModal"bg_th_color="bg-[#2271b1] text-white px-3 py-2" class="m-0 py-1 px-2" @click="viewUser(data.value)">Edit</Button>
          <Button Button :onclick="openModal" class="m-0  px-2" @click="deleteUser(data.value)"
          bg_th_color="bg-red border-red text-white "
          >Delete</Button>
      </div>
  </template>
  </vue3-datatable>
  </div>  
  <PopupModal modalTitle="Add Materials" v-model:isOpen="modalIsOpen">
    <AddAndEdit />
  </PopupModal>
</template>

<script setup>
import {swatches} from '@/json/data.js'
import PageHeader  from '@/components/Admin-components/PageHeader.vue'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Select from "@/components/Admin-components/form-components/Select.vue";
import TextInput from "@/components/Admin-components/form-components/TextInput.vue";
import { ref, computed } from "vue";
const username = ref("");
const actionSelected = ref('')
const search = ref('')

const bulkOption = [
  { text: "Bulk Action", value: "dashboard" },
  { text: "Edit", value: "settings" },
  { text: "Move to trash", value: "earnings" },
];

const cols = ref([
  { field: 'src', title: 'Thumbs', slot: true },
  { field: 'title', title: 'Title', filter: true },
  { field: 'date', title: 'Date' },
  { field: 'actions', title: 'Actions' },
])

const tableHeaders = [
  { text: "Thumbs", },
  { text: "Title",   },
  { text: "Date",  },
  { text: "actions", },
];

const actionsFlag = ref(null)
const modalIsOpen = ref(false)
const customModalTitle = 'Custom Modal Title'

const openModal = () => {
  modalIsOpen.value = true
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
</script>
<style scoped >
.bh-pagination-info .bh-pagesize{
  width : 70px !important
}
</style>