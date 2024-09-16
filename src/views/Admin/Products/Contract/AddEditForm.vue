<template>
  <DefaultCard :cardTitle="form.id ? `Edit Product Contract` : `Add Product Contract`">
    <DomainComponent @customChange="(id) => form.domain_id = id" :deleteService="ProductServices.deleteProductContract"
      masterKey="master_contract_id" :masterDeleteService="ProductServices.deleteMasterProductContract"
      routeTo="product-contract"></DomainComponent>

    <template v-if="form.id" v-slot:header>
      <MasterSlugForm :form="form" @update-slug="fetchProductContractData"
        :SlugUpdateservices="ProductServices.masterSlugProductContract" masteridKeyName="master_contract_id" />
    </template>

    <form @submit.prevent="handleSubmit">
      <div class="p-6.5 grid grid-cols-2 gap-6">
        <div class="flex flex-col">
          <TextInput type="text" :class="{ 'border-red': errors.name }" v-model="form.name" :errMessage="errors.name"
            @update:modelValue="clearError('name')" label="Name" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.name = value" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The name is how it appears on your site.
          </p>
        </div>

        <div class="flex flex-col">
          <TextInput type="text" class="block mr-2 h-[40px] w-full" v-model="form.slug" label="Slug (Read Only)"
            disabled :hasCheckBox="checkBoxFlag" @update:checkValue="value => checkedFields.slug = value" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters,
            numbers, and hyphens.
          </p>
        </div>

        <div class="flex flex-col">
          <InputLabel for="Parent Material" value="Parent Product Contract" />
          <!-- <Select :options="productContractList" :defaultZero="true" label="Parent Product Contract" showfield="name" class="w-full" valueField="id"
            v-model="form.parent_contract" /> -->
          <Select :options="productContractList" :defaultZero="true" label="Parent Product Contract" showfield="name"
            class="w-full" valueField="id" :errorClass="selectError" @update:modelValue="clearError('parent_contract')"
            errMessage="Should not be own parent" v-model="form.parent_contract" />

          <p class="text-sm text-[#646970] text-[11.5px]">
            Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop and Big
            Band.
          </p>
        </div>

        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2 w-full" label="Description" placeholder="" :isTextarea="true"
            :rows="4" v-model="form.description" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.description = value" />
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
import _ from 'lodash';
import DefaultCard from '@/components/Admin-components/DefaultCard.vue';
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue';
import { getProductContractTree } from '@/helper/Apis';
import ProductServices from '@/services/ProductServices';
import { showToast, getGlobalUpdateData } from '@/helper/functions';
import { onMounted, ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// Store and Router
const store = useStore();
const router = useRouter();

// Reactive State
const errors = ref({});
const loading = ref(false);
const selectError = ref(false);
const form = ref({
  ...store.getters.editData,
  parent_contract: store.getters.editData?.parent_contract ?? 0,
});
const checkedFields = ref({});
const checkBoxFlag = ref(Boolean(form.value.id));
const productContractList = ref([]);

// Methods
const validateForm = () => {
  errors.value = {};
  if (!form.value.name) {
    errors.value.name = 'Name is required';
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  if (validateForm()) {
    const hasCheckedFields = Object.values(checkedFields.value).some(Boolean);

    loading.value = true;
    try {
      const { deleted_at, created_at, slug, domains_data, default_domain, default_master, updated_at, ...payload } = form.value;
      if (!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id;

      const action = store.getters.editData ? ProductServices.editProductContract : ProductServices.addProductContract;
      const { status, data } = await action(payload);
      if (status === 200 && data.success) {
        if (hasCheckedFields) {
          handleGlobalUpdate();
        }
        else {
          showToast(data.message, 'success');
          store.dispatch('clearEditData');
          router.push('/product-contract');
        }
      } else if (status === 400) {
        showToast(data.message, 'error');
      }
    } catch (error) {
      showToast('Something went wrong', 'error');
      console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product contract:`, error);
    } finally {
      loading.value = false;
    }
  }
};

const handleGlobalUpdate = async () => {
  const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value);
  if (_.isEmpty(globalUpdate)) return;

  const payload = {
    master_contract_id: form.value.master_contract_id,
    global_keys: globalUpdate
  };

  try {
    const { status, data } = await ProductServices.globalUpdateProductContract(payload);
    status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error');
    if (status === 200 && data.success) router.push('/product-contract');
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error);
  } finally {
    loading.value = false;
  }
};

const fetchProductContractData = async () => {
  loading.value = true;
  const payload = { master_contract_id: form.value.master_contract_id, domain_id: form.value.domain_id };
  try {
    const { status, data } = await ProductServices.getProductContract(payload);
    if (status === 200 && data.success) {
      const dataValue = data.data[0];
      store.dispatch('setEdit', dataValue);
      Object.assign(form.value, dataValue);
    }
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error('Error while fetching data:', error);
  }
  finally {
    loading.value = false;
  }
};

const fetchProductContractTree = async (domainId) => {
  try {
    productContractList.value = await getProductContractTree({ domain_id: domainId });
  } catch (error) {
    console.error('Error fetching product contract tree:', error);
  }
};



// clear error message
const clearError = (field) => {
  console.log("field", field);
  if (errors.value[field]) {
    delete errors.value[field];
  }
};

// Lifecycle Hooks
onMounted(() => {
  fetchProductContractTree(store.getters.getDomain?.id);
});

// Watchers
watch(() => form.value.domain_id, (newDomainId) => {
  fetchProductContractTree(newDomainId);
  form.value.parent_contract = 0;
  if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
    fetchProductContractData();
  }
});

// Watchers
watch(() => form.value.parent_contract, (newValue) => {
  if (newValue == form.value.id)
    selectError.value = true;
  else
    selectError.value = false;
});

// Computed Properties
const buttonText = computed(() => {
  return (form.value.id ? 'Update' : 'Submit');
});
</script>

<style scoped></style>
