<template>
    <DefaultCard  :cardTitle="id ? `Edit Product Series ` : `Add Product Series`">
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
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Title"
                     placeholder="" 
                    v-model="form.title" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Sub Title"
                     placeholder="" 
                    v-model="form.sub_title" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Seo Title Tag"
                     placeholder="" 
                    v-model="form.seo_title_tag" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Seo Meta Keyword Tag"
                     placeholder="" 
                    v-model="form.seo_meta_keyword_tag" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Trade Mark Label"
                     placeholder="" 
                    v-model="form.trade_mark_label" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Label"
                     placeholder="" 
                    v-model="form.label" 
                    />
            </div>
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Menu Label"
                     placeholder="" 
                    v-model="form.menu_label" 
                    />

            </div>
            <div class="">
                 <ColorPicker  label="Text Color" v-model="form.label_background_color" />
             </div>
            <div class="flex flex-col ">
                <InputLabel for="Parent Material" value="Parent Product Series " />
                <Select :options="MaterialTreeListData" :defaultZero='true' showfield="name" class="w-full" valueField="id" label="Select Product Series"
                    v-model="form.parent_product_series" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop
                    and Big Band.
                </p>
            </div>
            <div class="flex flex-col ">
                <InputLabel for="DisplayO" value="Display On Home And Series Page Option " />
                    <Select :options="trueFalse" showfield="name" class="w-full" valueField="value" label="Select Material Options"
                    v-model="form.display_on_home" />
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
            <div class="flex flex-col w-full">
                <TextInput type="text" class="block mr-2  w-full"
                label="Seo Meta Description Tag"
                     placeholder="" :isTextarea="true" rows="4"
                    v-model="form.seo_meta_description_tag" 
                    />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
            <div class="flex flex-col w-full ">
                                <singleCheckBox id="FeaturedOption" label="Show in New Menu" v-model:modelValue="form.show_in_menu"></singleCheckBox>
                                <singleCheckBox id="FeaturedOption" label="Show in Collection 19 Menu" v-model:modelValue="form.show_in_yearly_collection"></singleCheckBox>
                              </div>
                              <div class="flex flex-col w-full  ">
                                
                                <!-- <InputLabel for="Featured_image" value="Featured_image" /> -->
                                <div class="py-2  rounded-lg px-2 border border-stroke"
                                    @click="() => featureData.isOpen = true"> {{
                                        featureData.mediaName }}</div>
                                <div class=" mt-3 flex overflow-x-auto">
                                    <img v-for="file in featureData.images" :key="file" :src="$filePath(file.file_url)"
                                        class="inline-block w-auto h-34 mr-4" :alt="file.alternative_text || 'image'">
                                </div>
                                <InputError class="mt-2" :message="errors?.featured_image" />
                           
                                
                              </div>
                            </div>
        <button type="submit"
            class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
           {{ id ? `Update ` : `Submit` }}
        </button>
    </form>
</DefaultCard>
    <Loader :isLoading="loading" :fullPage="true" />
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="featureData.isOpen">
        <GetLibrary btnName="select File" :getFlag="true" :selected="featureData.images" :singleFile="true"
            :closeModal="() => { featureData.isOpen = false }" :selectedFiles="handleFeatureFiles" />
    </popupModal>
</template>

<script setup>
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { getProductSeriesTree } from '@/helper/Apis'
import ProductServices from '@/services/ProductServices'
import { clearError,showToast,handleFiles } from '@/helper/functions'
import { onMounted, ref,watch } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { trueFalse } from '@/json/data'

const store = useStore();
const router = useRouter();

const MaterialTreeListData = ref([])
const loading = ref(false)
const props = defineProps(['id'])
const id = ref(props.id || null)
const form = ref({ parent_product_series:0})
const errors = ref({})
const PreviousDomain = ref(null)
const masterId = ref(null)

// images variables 
const featureData = ref({
    isOpen: false,
    mediaName: 'feature Image',
    images: []
})

const handleFeatureFiles = (data) => {
    const object = handleFiles(data);
    featureData.value.isOpen = false
    featureData.value.images = data;
    featureData.value.mediaName = object.mediaName;
    form.value.featured_image = object.media_ids[0]
}

const validateForm = () => {
    let isValid = true
    errors.value = {}

    if (!form.value.name) {
        errors.value.name = 'Name is required'
        isValid = false
    }
    return isValid
}

const handleSubmit = async () => {
    try {
        if (validateForm()) {
            // emit('handleApi', { ...form.value });
            if(id.value !== null ) 
            handleEditProductSeries( { ...form.value })
            else
            handleAddProductSeries( { ...form.value })
        }
    } catch (e) {
        console.error('Error material add edit :', e)
    }
}
// api for get patents child json parent material listing 
const handleProductSeriesTree = async (payload) => {
  MaterialTreeListData.value = await getProductSeriesTree(payload)
}
// get material
const handleGetProductSeriesById = async (payload) => {
  loading.value = true;
  try {
    const res = await ProductServices.getProductSeries(payload);
    if (res.status === 200 && res.data.success) {
      if (res.data.data?.length > 0) {
        form.value = res.data.data[0];
        PreviousDomain.value = form.value.domain_id;
        masterId.value = form.value.master_material_id; 
        featureData.value.images = [form.value.featured_image_url]
        featureData.value.mediaName = form.value.featured_image_url
      }
    }
  } catch (error) {
    console.error('Error fetching location:', error);
  } finally {
    loading.value = false;
  }
}

const handleAddProductSeries = async (payload) => {
  loading.value = true;
  try {
    const res = await ProductServices.addProductSeries(payload);
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success');
      router.push('/product-series');
    } else if (res.status === 400) {
      showToas(res.data.message, 'error');
    }
  } catch (error) {
    showToast('Something went wrong', 'error');
    console.error('Error adding location:', error);
  } finally {
    loading.value = false;
  }
}

const handleEditProductSeries = async (payload) => {
  loading.value = true;
  if (form.value.domain_id !== PreviousDomain.value) {
    delete form.value.id;
  }else{
      // clone existing  in other domain 
        form.value = { ...form.value, master_material_id: masterId.value };
  }
  delete form.value?.featured_image_url;
  try {
    const res = await ProductServices.editProductSeries({...form.value});
    if (res.status === 200) {
      showToast(res.data.message, 'success');
      router.push('/product-series');
    } else if (res.status === 400) {
      showToast(res.data.message, 'error');
    }
  } catch (error) {
    console.error('Error editing location:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(()=>{
    if(props.id !== undefined && props.id !== null && props.id !== ' ' ) {
        console.log("store.getters.getDomain.id",store.getters.getDomain.id)
        handleGetProductSeriesById({id:props.id,domain_id:store.getters.getDomain.id});
        form.value.domain_id = store.getters.getDomain.id
    }
})

watch(
    () => form.value.domain_id,
    () => {
        handleProductSeriesTree({domain_id:form.value.domain_id});
         }
);
</script>