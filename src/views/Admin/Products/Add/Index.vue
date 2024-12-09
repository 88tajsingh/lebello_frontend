<template>
  <PageHeader> Product </PageHeader>
  <div class="flex content-between justify-between px-1 mb-2">
    <div class="flex">
      <Select v-if="permissions.write" cusClass="h-[38px] border-boxdark" :options="bulkOption" showfield="text"
        valueField="value" label="Bulk Options" v-model="bulkActionSelected" />
      <Button v-if="permissions.write" class="px-2 py-2 m-auto"
        @click="() => { bulkActionSelected ? bulkPopup = true : '' }">Apply</Button>
      <!-- <div class="flex">
        <Button v-if="permissions.write" @click="compareData" class="px-2 py-2 ">Compare </Button>  
      </div> -->
      <div class="max-w-52 mr-2">

        <Select :options="getDomainsList" showfield="name" class="w-full " valueField="id" label="All Domain"
          v-model="paginationData.domain_id" />
      </div>
      <div class="max-w-52">
        <Select :options="statusData" showfield="name" class="w-full" valueField="value" label="All Records"
          v-model="paginationData.status" />
      </div>

    </div>
    <div class="flex">
      <TextInput type="text" class="block bg-white mr-2 h-[40px] w-full" placeholder="Search" v-model="search" />
      <Button v-if="permissions.write"
        @click="() => { router.push({ name: 'Product-from' }); store.dispatch('clearEditData'); }" class="px-2 py-2">Add
        Product </Button>
    </div>
  </div>
  <div class="bg-white rounded-[20px]">
    <vue3-datatable class="next-prev-pagination" ref="datatable" skin="bh-table-striped bh-table-hover "
      :hasCheckbox="true" :cloneHeaderInFooter="true" :stickyHeader="false" :rows="rows" :columns="product"
      :loading="getLoading" :totalRows="totalRows" :isServerMode="true" :pageSize="10" :search="search"
      @change="changePages">
      <template #name="data">
        <div @mouseenter="handleMouseEnter(data)" @mouseleave="handleMouseLeave()">
          {{ data.value.name }}
          <!-- <div v-if="isRowHovered(data.value)">overed</div> -->
        </div>
      </template>
      <template #featured_image_url="data">
        <img :src="$filePath(data.value?.featured_image_url?.file_url)" alt="Contract Image"
          style="max-width: 50px; max-height: 50px" />
      </template>
      <template #status="data">
        <span v-if="data.value.status === 1">Draft</span>
        <span v-else-if="data.value.status === 2">Pending Review</span>
        <span v-else-if="data.value.status === 3">Publish</span>
        <span v-else>Status not selected</span>
      </template>
      <template v-if="permissions.write" #actions="data">
        <div class="flex gap-3">
          <div @click="() => handelEditClick(data.value)" id="edit svg">
            <!-- router.push({ name:'Contract-edit',params: { id: data.value.id }})  -->
            <EditSvg />
          </div>
          <div @click="() => compareData(data.value)">
            <CompareSvg />
          </div>
          <div id="delete svg" @click="openDeleteModal(data.value)">
            <DeleteSvg />
          </div>
        </div>
      </template>
    </vue3-datatable>
  </div>

  <PopupModal modalTitle="Add Pages" custonClasses="w-[1000px] h-[600px]" v-model:isOpen="modalIsOpen">
    <AddEditForm @handleApi="handleAddPages" />
  </PopupModal>
  <PopupModal modalTitle="Edit Pages" custonClasses="w-[1000px] h-[600px]" v-model:isOpen="editIsOpen">
    <AddEditForm :pagesData="editData" @handleApi="handleEditPages" />
  </PopupModal>
  <DeleteModal v-model:isOpen="deleteModalIsOpen" :modalTitle="'Delete Product '" @delete="handleDeleteProduct">
    Do you want to delete?
  </DeleteModal>

  <DeleteModal v-model:isOpen="bulkPopup" :modalTitle="'Delete Multiple Product '" @delete="handleBulkActions()">
    Do you want to delete ?
  </DeleteModal>

  <PopupModal modalTitle="Compare Products" custonClasses="w-[1000px]  h-[600px]" v-model:isOpen="conpareIsOpen">
    <div class="overflow-x-auto max-h-screen">
      <table class="min-w-full border-collapse">
        <thead>
          <tr>
            <th class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Field</th>
            <th class="border px-4 py-2 bg-gray" v-for="item in compareIsData" :key="item.id">
              {{ getDomainsList.find((x) => x.id === item.domain_id)?.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Domain Name</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ getDomainsList.find((x) => x.id === item.domain_id)?.name }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Title</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.title }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Trade Mark Label</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.trade_mark_label ? item.trade_mark_label : 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Description</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id"
              v-html="item.description ? item.description : 'N/A'"></td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">SEO Title Tag</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.seo_title ? item.seo_title : 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">SEO Meta Description</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.meta_description ? item.meta_description : 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">SEO Meta Keywords</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.meta_keywords ? item.meta_keywords : 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Featured Product</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.featured_product ? 'True' : 'False' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Product Title</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.new_product_title ? item.new_product_title : 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Display Product</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.display_archive_products ? 'True' : 'False' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Material Swatches</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.material_swatches ? item.material_swatches : 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Materials</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ materialNames[item.domain_id] || 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Product Content</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id"
              v-html="item.content ? item.content : 'N/A'"></td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Highlight Title</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.product_label }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Select Template</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.product_template ? item.product_template : 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Product Series</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ productSeriesTree[item.domain_id] || 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Contract</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ productContractTree[item.domain_id] || 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Product Type</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ productTypeTree[item.domain_id] || 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Product Category Type</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ productCategoryTypeTree[item.domain_id] || 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Product Text Label</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              {{ item.product_label ? item.product_label : 'N/A' }}
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Featured Image</td>
            <td class="border px-4 py-2" v-for="item in compareIsData" :key="item.id">
              <img :src="$filePath(item.featured_image_url?.file_url)" alt="Featured Image" class="w-12 h-12" />
            </td>
          </tr>
          <tr>
            <td class="sticky top-0 left-0 z-20 border py-2 bg-gray px-4 whitespace-nowrap">Gallery</td>
            <td v-for="item in compareIsData" :key="item.id" class="border px-4 py-2">
              <div class="flex flex-wrap gap-1">
                <template v-for="image in item.gallery_urls" :key="image.id">
                  <img :src="$filePath(image.file_url)" :alt="'Gallery Image ' + image.id" class="w-12 h-12" />
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PopupModal>
  <!-- <Loader :isLoading="loading" :fullPage="true" /> -->
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import StoreProductServices from '@/services/StoreProductServices';
import ProductServices from '@/services/ProductServices';
import AddEditForm from  './AddEditForm.vue'
import { useRouter } from 'vue-router';
import { showToast } from '@/helper/functions';
import { getDomains } from '@/helper/Apis';
import { product, statusData } from '@/json/data';
import { MaterialTreeList, getProductSeriesTree, getProductContractTree, getProductCategoryTypeTree, getProductTypeTree } from '@/helper/Apis'
import { useStore } from 'vuex';

const router = useRouter();
const store =  useStore();
const materialNames = ref({});
const bulkActionSelected = ref(null)
const loading = ref(false);
const search = ref('');
const datatable = ref(null);
const permissions = store.getters.user.permissions;
const paginationData = ref({ limit: 10, page: 1, domain_id: '', status: '' })
const bulkOption = [{ text: 'Delete', value: 'Delete' }];
const getDomainsList = ref([])
const getLoading = ref(false);
const editData = ref({});
const rows = ref([]);
const actionsFlag = ref(null);
const bulkPopup = ref(null);
const modalIsOpen = ref(false);
const editIsOpen = ref(false);
const conpareIsOpen = ref(false);
const compareIsData = ref([]);
const deleteModalIsOpen = ref(false);
const totalRows = ref('')
const productContractTree = ref([]);
const productSeriesTree = ref([]);
const productTypeTree = ref([]);
const productCategoryTypeTree = ref([]);
const materialSwatchesList = ref([]);
const apiCallStoreProduct = ref(true);

const handelEditClick = (data) => {
  console.log("data",data);
 store.dispatch('setEdit', data) 
  const id =data.domain_id
  store.dispatch('setDomain', {id:id});
  router.push({ name: 'Product-from' });
}

const openDeleteModal = (data) => {
  deleteModalIsOpen.value = true;
  editData.value = data.id;
  console.log(data.id)
};

const handleMouseEnter = (data) => {
  actionsFlag.value = data.value.name;
};

const handleMouseLeave = () => {
  actionsFlag.value = null;
};

const compareData = async (product) => {
  conpareIsOpen.value = true;
  loading.value = true;

  try {
    const master_product_id = product.master_product_id;
    const { status, data } = await ProductServices.getProduct({ master_product_id });

    if (status === 200 && data.success) {
      compareIsData.value = data.data;
    } else {
      console.error('Error fetching product data:', data.message || 'Unknown error');
      showToast(data.message || 'Unknown error', 'error');
    }
  } catch (error) {
    console.error('Error occurred while fetching product:', error);
    showToast('Something went wrong', 'error');
  } finally {
    loading.value = false;
  }
};

const changePages = (page) => {
  const { pagesize, current_page } = page;
  paginationData.value = { ...paginationData.value, limit: pagesize, page: current_page }
  handleGetProduct(paginationData.value);
}
// api calls
const handleGetProduct = async (payload) => {
  getLoading.value = true;
  try {
    const service = apiCallStoreProduct.value ? StoreProductServices.getStoreProduct : ProductServices.getProduct
      // console.log("service",service());
    const res = await service(payload);
    if (res.status === 200 && res.data.success) {
      rows.value = res.data.data;
      totalRows.value = res.data.total_records;
    }
  } catch (e) {
    console.error('Error while getting contract locations:', e);
  } finally {
    getLoading.value = false;
  }
};

const handleDeleteProduct = async () => {
  loading.value = true;
  try {
    const service = apiCallStoreProduct.value ? StoreProductServices.deleteStoreProduct : ProductServices.deleteProduct
    const res = await service({ id: editData.value });
    if (res.status === 200 && res.data.success) {
      rows.value = rows.value.filter(item => item.id !== editData.value)
      showToast(res.data.message, 'success');
      deleteModalIsOpen.value = false;
      editData.value = null;
    }
    else if (res.status === 400) {
      showToast(res.data.message, 'error');
    }
  } catch (e) {
    console.error('Error while deleting contract location:', e);
  } finally {
    loading.value = false;
  }
};

// Bulk delete
const handleBulkActions = async () => {
  const selected = datatable.value.getSelectedRows();
  const ids = selected.map(item => item.id);
  if (!ids.length) return showToast('Please select atleast one product to delete', 'error');
  if (bulkActionSelected.value === 'Delete') {
    loading.value = true;
    try {
      const service = apiCallStoreProduct.value ? StoreProductServices.bulkDeleteStoreProduct : ProductServices.BulkDeleteProduct
      const res = await service({ id: ids });
      if (res.status === 200 && res.data.success) {
        showToast(res.data.message, 'success');
        await handleGetProduct();
      }
      else if (res.status === 400) {
        showToast(res.data.message, 'error');
      }
    } catch (e) {
      console.error('Error while bulk deleting contract locations:', e);
    } finally {
      loading.value = false;
    }
  }
};

const getDomainList = async (payload) => {
  getDomainsList.value = await getDomains(payload)
  const defaultDomain = getDomainsList.value.filter(site => site.default === 1)[0];
  // paginationData.value.domain_id = defaultDomain.id
  store.dispatch('setDomain', defaultDomain);
}
const fetchTreeData = async (fetchFunction, payload) => {
  const treeData = await fetchFunction({ domain_id: payload });
  const item = treeData.find(item => item.id == payload);
  return item ? item.name : 'N/A';
};

async function fetchData() {

  const fetchFunctions = {
    materialTreeList: fetchTreeData.bind(null, MaterialTreeList),
    typeTree: fetchTreeData.bind(null, getProductTypeTree),
    contractTree: fetchTreeData.bind(null, getProductContractTree),
    seriesTree: fetchTreeData.bind(null, getProductSeriesTree),
    categoryTypeTree: fetchTreeData.bind(null, getProductCategoryTypeTree),
  };

  for (const item of compareIsData.value) {
    const domainId = item.domain_id;

    const promises = [
      fetchFunctions.materialTreeList(domainId).then(name => {
        materialNames.value[domainId] = name;
      }),
      fetchFunctions.typeTree(domainId).then(name => {
        productTypeTree.value[domainId] = name;
      }),
      fetchFunctions.contractTree(domainId).then(name => {
        productContractTree.value[domainId] = name;
      }),
      fetchFunctions.seriesTree(domainId).then(name => {
        productSeriesTree.value[domainId] = name;
      }),
      fetchFunctions.categoryTypeTree(domainId).then(name => {
        productCategoryTypeTree.value[domainId] = name;
      }),
    ];

    await Promise.all(promises);
  }
}


onMounted(() => {
  getDomainList();
  handleGetProduct(paginationData.value);

}
);

watch(
  () => compareIsData.value,
  (newValue) => {
    if (newValue.length > 0) {
      fetchData();
    }
  }
);
watch(
  () => paginationData.value.domain_id,
  () => {
    const defaultDomain = getDomainsList.value.filter(site => site.id == paginationData.value.domain_id);
    store.dispatch('setDomain', defaultDomain[0]);
    handleGetProduct(paginationData.value);
  }
)

watch(
  () => paginationData.value.status,
  () => {
    handleGetProduct(paginationData.value);
  }
);
</script>