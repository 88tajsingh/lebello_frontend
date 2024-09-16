<template>
  <DefaultCard :cardTitle="form.id ? `Edit Contract Type` : `Add Contract Type`">
    <DomainComponent @customChange="(id) => form.domain_id = id" :deleteService="ContractServices.deleteContractType"
      masterKey="master_contract_type_id" :masterDeleteService="ContractServices.deleteMasterContractType"
      routeTo="contract-type"></DomainComponent>

    <template v-if="form.id" v-slot:header>
      <MasterSlugForm :form="form" @update-slug="fetchContractTypeData"
        :SlugUpdateservices="ContractServices.masterContractTypeSlugUpdate" masteridKeyName="master_contract_type_id" />
    </template>
    <form @submit.prevent="handleSubmit">
      <div class="p-6.5 grid grid-cols-2 gap-6">
        <div class="flex flex-col ">
          <TextInput type="text" class=" " placeholder="" v-model="form.contract_name" label="Name"
            :hasCheckBox="checkBoxFlag" @update:checkValue="value => checkedFields.contract_name = value" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The name is how it appears on your site.
          </p>
        </div>
        <div class="flex flex-col ">
          <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Slug" placeholder="" v-model="form.slug"
            disabled="true" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains
            only
            letters, numbers, and hyphens.
          </p>
        </div>
        <div class="flex flex-col ">
          <InputLabel for="Parent Contract Type" value="Parent Contract Type" />
          <Select :options="contractTypeTreeListData" :defaultZero='true' showfield="contract_name" class="w-full"
            valueField="id" label="Select Contract Type" v-model="form.parent_contract_type" :errorClass="selectError"
            @update:modelValue="clearError('parent_contract_type')" errMessage="Should not be own parent" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of
            Bebop
            and Big Band.
          </p>
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Contract Sub Page Meta Title" placeholder=""
            v-model="form.sub_page_meta_title" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.sub_page_meta_title = value" />
        </div>
        <div class="flex flex-col ">
          <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Contract Sub Page Meta Keywords"
            placeholder="" v-model="form.sub_page_meta_keywords" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.sub_page_meta_keywords = value" />
        </div>
        <div class="flex flex-col ">
          <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Contract Project Meta Title" placeholder=""
            v-model="form.project_page_meta_title" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.project_page_meta_title = value" />
        </div>
        <div class="flex flex-col ">
          <TextInput type="text" class="block mr-2 h-[40px] w-full" label="Contract Project Meta Keywords"
            placeholder="" v-model="form.project_page_meta_keywords" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.project_page_meta_keywords = value" />
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Description" placeholder="" :isTextarea="true"
            rows="4" v-model="form.description" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.description = value" />
          <p class="text-sm text-[#646970] text-[11.5px]">
            The description is not prominent by default; however, some themes may show it.
          </p>
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Contract Sub Page Meta Description" placeholder=""
            :isTextarea="true" rows="4" v-model="form.sub_page_meta_description" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.sub_page_meta_description = value" />
        </div>
        <div class="flex flex-col w-full">
          <TextInput type="text" class="block mr-2  w-full" label="Contract Project Meta Description" placeholder=""
            :isTextarea="true" rows="4" v-model="form.project_page_meta_description" :hasCheckBox="checkBoxFlag"
            @update:checkValue="value => checkedFields.project_page_meta_description = value" />
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
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { contractTypeTreeList } from '@/helper/Apis'
import ContractServices from '@/services/ContractServices'
import _ from 'lodash';
import { showToast, getGlobalUpdateData } from '@/helper/functions'
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Button from '@/components/Admin-components/Buttons/Button.vue';

// Reactive state
const store = useStore();
const router = useRouter();
const errors = ref({});
const selectError = ref(false);
const loading = ref(false);
const form = ref(store.getters.editData || { parent_contract_type: 0 });
const contractTypeTreeListData = ref([]);
const checkedFields = ref({});
const checkBoxFlag = ref(Boolean(form.value.id));

// Validate form data
const validateForm = () => {
  errors.value = {};
  if (!form.value.contract_name) {
    errors.value.contract_name = 'Name is required';
    return false;
  }
  if (selectError.value)
    return false;

  return true;
};

// Submit form data (add or edit contract type)
const handleSubmit = async () => {
  if (!validateForm()) return;
  const hasCheckedFields = Object.values(checkedFields.value).some(Boolean);

  loading.value = true;

  // Prepare payload for API call
  const { deleted_at, created_at, updated_at, featured_image_url, slug, domains_data, default_domain, default_master, ...payload } = form.value;
  if (!form.value?.domains_data?.includes(form.value.domain_id)) delete payload.id;

  try {
    const service = store.getters.editData ? ContractServices.editContractType : ContractServices.addContractType;
    const res = await service(payload);

    if (res.status === 200 && res.data.success) {
      if (hasCheckedFields)
        handleGlobalUpdate();
      else {
        showToast(res.data.message, 'success');
        router.push('/contract-type');
      }
    } else if (res.status === 400) {
      showToast(res.data.data.error || 'Something went wrong', 'error');
    }
  } catch (e) {
    console.error('Error:', e);
    showToast('An error occurred', 'error');
  } finally {
    loading.value = false;
  }
};

const handleGlobalUpdate = async () => {
  const globalUpdate = getGlobalUpdateData(form.value, checkedFields.value);
  if (_.isEmpty(globalUpdate)) return;

  const payload = {
    master_contract_type_id: form.value.master_contract_type_id,
    global_keys: globalUpdate
  };

  try {
    const { status, data } = await ContractServices.globalContractTypeUpdate(payload);
    status === 200 && data.success ? showToast(data.message, 'success') : showToast(data.message, 'error');
    if (status === 200 && data.success) router.push('/contract-type');
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error(`Error while ${store.getters.editData ? 'editing' : 'adding'} product type:`, error);
  } finally {
    loading.value = false;
  }
};


// fetch the data 
const fetchContractTypeData = async () => {
  loading.value = true;
  const payload = { master_contract_type_id: form.value.master_contract_type_id, domain_id: form.value.domain_id };
  try {
    const { status, data } = await ContractServices.getContractType(payload);
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

// Fetch contract type tree list
const fetchContractTreeList = async (domainId) => {
  contractTypeTreeListData.value = await contractTypeTreeList({ domain_id: domainId });
};

// clear error message
const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};


// Set PreviousDomain and fetch initial data on component mount
onMounted(() => {
  fetchContractTreeList(store.getters.getDomain.id);
});

// Watch for changes to domain_id in form and update contract type tree list
watch(() => form.value.domain_id, (newDomainId) => {
  fetchContractTreeList(newDomainId);
  form.value.parent_contract_location = 0;
  if (Array.isArray(form.value.domains_data) && form.value.domains_data.includes(newDomainId)) {
    fetchContractTypeData();
  }
});

// Watchers
watch(() => form.value.parent_contract_type, (newValue) => {
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
