<template>
    <div class="flex justify-between px-1 mb-2">
      <vue3-datatable  class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
    :hasCheckbox="true":cloneHeaderInFooter="true"  :stickyHeader="false"
    :rows="props.data" :columns="cols" :loading="dataTableLoding" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search" @change="changePage">
      <template #name="data">
        <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
          {{ data.value.name }}
          <!-- <div v-if="isRowHovered(data.value)">overed</div> -->
        </div>
      </template>
      <template #image="data">
        <img :src="$filePath(data.value.image)" alt="Material Image" style="max-width: 50px; max-height: 50px" />
      </template>
      <template #actions="data">
        <div class="flex gap-3">
          <div @click="() => {router.push({ name: 'materials-edit', params: { id: data.value.id } }) }" id="edit svg">
            <EditSvg />
          </div>
          <div id="delete svg" @click="() => { material_id = data.value; openDeleteModal(); }">
            <DeleteSvg />
          </div>
          <!-- <Button :onClick="editModal" bg_th_color="bg-[#2271b1] text-white px-3 py-2" class="m-0 py-1 px-2" @click="()=>{editData=data.value}">Edit</Button>
        <Button  class="m-0 px-2" :onClick="openDeleteModal" bg_th_color="bg-red border-red text-white" @click="()=>{material_id=data.value}">Delete</Button> -->

        </div>
      </template>
    </vue3-datatable>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Vue3Datatable from '@bhplugin/vue3-datatable';
  import { materialsData } from '@/json/data.js';
  import TextInput from '@/components/Admin-components/form-components/TextInput.vue';
  import Select from '@/components/Admin-components/form-components/Select.vue';
  import Button from '@/components/Admin-components/Buttons/Button.vue';

  const props= defineProps(['data'])
  const bulkOption = ref([]);
  const isSearchAble = ref(false);
  const loading = ref(false);
  const hasCheckbox = ref(false);
  const search = ref('');
  const actionSelected = ref('');
  const cols = ref([
    { field: 'image', title: 'Image' },
    { field: 'name', title: 'Name', filter: true },
    { field: 'description', title: 'Description' },
    { field: 'slug', title: 'Slug' },
    { field: 'count', title: 'Count' },
    { field: 'actions', title: 'Actions' },
  ]);
  const rows = ref(materialsData);
  const actionsFlag = ref(null);
  const modalIsOpen = ref(false);
  
  const openModal = () => {
    modalIsOpen.value = true;
  };
  
  const applyBulkAction = () => {
    // Implement your logic for bulk action here
  };
  
  const handleMouseEnter = (data) => {
    actionsFlag.value = data.value.name;
  };
  
  const handleMouseLeave = () => {
    actionsFlag.value = null;
  };
  
  const isRowHovered = (value) => {
    return actionsFlag.value === value.name;
  };
  </script>
  
  <style scoped>
  .bh-pagesize {
    width: 72px !important;
  }
  </style>
  