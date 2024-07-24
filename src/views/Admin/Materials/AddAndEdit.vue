<template>
    <DefaultCard  :cardTitle="id ? `Edit Material` : `Add Material`"   >
    <form @submit.prevent="handleSubmit">
        <DomainComponent  @customChange="(id)=>form.domain_id = id"></DomainComponent>
        <div class="p-6.5 grid grid-cols-2 gap-6">
            <div class="flex flex-col ">
                <InputLabel for="Name" value="Name" />
                <TextInput type="text" class=" " :class="{ 'border-red': errors.name }"
                    placeholder="" v-model="form.name" :errMessage="errors.name"
                    @update:model="clearError('name')" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The name is how it appears on your site.
                </p>
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Slug" value="Slug" />
                <TextInput type="text" class="block mr-2 h-[40px] w-full" :class="{ 'border-red-500': errors.slug }"
                    placeholder="" v-model="form.slug" :errMessage="errors.slug"
                    @update:model="clearError(errors, 'slug')" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only
                    letters, numbers, and hyphens.
                </p>
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Parent Material" value="Parent Material" />
                <Select :options="MaterialTreeListData" showfield="name" class="w-full" :defaultZero='true' valueField="id" label="Select Parent Material"
                    v-model="form.parent_material" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop
                    and Big Band.
                </p>
                <InputError class="mt-2" :message="errors?.parent_material" />
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Display in Material Options" value="Display in Material Options" />
                <Select :options="trueFalse" showfield="name" class="w-full" valueField="value" label="Select Material Options"
                    v-model="form.display_material_option" />
                <InputError class="mt-2" :message="errors?.display_material_option" />
            </div>
            <div class="flex flex-col w-full">
                <InputLabel for="Material Price" value="Material Price" />
                <TextInput type="text" class="block mr-2 h-[40px] w-full"
                    :class="{ 'border-red-500': errors.material_price }" placeholder="" v-model="form.material_price"
                    :errMessage="errors.material_price" @update:model="clearError(errors, 'material_price')" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only
                    letters, numbers, and hyphens.
                </p>
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Yellow Banner Display On Material Images"
                    value="Yellow Banner Display On Material Images" />
                <Select :options="trueFalse" showfield="name" class="w-full" valueField="value" label="Select an option"
                    v-model="form.yellow_banner_material_image" />
                <InputError class="mt-2" :message="errors?.yellow_banner_material_image" />
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Show New Badge" value="Show New Badge" />
                <Select :options="trueFalse" showfield="name" class="w-full" valueField="value" label="Select an option"
                    v-model="form.show_new_badge" />
                <InputError class="mt-2" :message="errors?.show_new_badge" />
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Label" value="Label" />
                <TextInput type="text" class="block mr-2 h-[40px] w-full" :class="{ 'border-red-500': errors.label }"
                    placeholder="" v-model="form.label" :errMessage="errors.label"
                    @update:model="clearError(errors, 'label')" />
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Material Code" value="Material Code" />
                <TextInput type="text" class="block mr-2 h-[40px] w-full"
                    :class="{ 'border-red-500': errors.material_code }" placeholder="" v-model="form.material_code"
                    :errMessage="errors.material_code" @update:model="clearError(errors, 'material_code')" />
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Group Name" value="Group Name" />
                <TextInput type="text" class="block mr-2 h-[40px] w-full"
                    :class="{ 'border-red-500': errors.group_name }" placeholder="" v-model="form.group_name"
                    :errMessage="errors.group_name" @update:model="clearError(errors, 'group_name')" />
            </div>
            <div class="flex flex-col mt-1">
                <InputLabel for="Label Background Color" value="Label Background Color" />
                <div class="flex gap-2">
                    <TextInput type="color" class="block h-[40px] min-w-[200px] px-2 rounded-lg"
                        :class="{ 'border-red': errors.label_background_color }" placeholder=""
                        v-model="form.label_background_color" :errMessage="errors.label_background_color" />
                    <TextInput type="text" class="block mr-2 h-[40px] min-w-[10px]"
                        :class="{ 'border-red': errors.label_background_color }" placeholder=""
                        v-model="form.label_background_color" />
                </div>
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Trade Mark Label" value="Trade Mark Label" />
                <TextInput type="text" class="block mr-2 h-[40px] w-full"
                    :class="{ 'border-red-500': errors.trade_mark_label }" placeholder=""
                    v-model="form.trade_mark_label" :errMessage="errors.trade_mark_label"
                    @update:model="clearError(errors, 'trade_mark_label')" />
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Show New Badge 2021" value="Show New Badge 2021" />
                <Select :options="trueFalse" showfield="name" class="w-full" valueField="value" label="Select an option"
                    v-model="form.show_new_badge_2021" />

                <InputError class="mt-2" :message="errors?.show_new_badge_2021" />
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Single Color" value="Single Color" />
                <Select :options="colors" showfield="name" class="w-full" valueField="value" label="Select Color"
                    v-model="form.single_color" />
                <InputError class="mt-2" :message="errors.single_color" />
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Multiple Color" value="Multiple Color" />
                <MultiSelect v-model="form.multiple_color" :options="colors" placeHolder="Select multiple color" />
                <InputError class="mt-2" :message="errors?.multiple_color" />
            </div>
            <div class="flex flex-col w-full">
                <InputLabel for="Featured_image" value="Featured_image" />
                <!-- <ImageUpload2 @file-selected="form.media_id = $event"
                    :accepted-formats="['jpg', 'jpeg', 'png']" /> -->
                <div class="py-2 rounded-lg px-2 border border-stroke" @click="() => IsOpen = true"> {{ mediaName }}
                </div>
                <InputError class="mt-2" :message="errors?.media_id" />
            </div>
            <div class="flex flex-col w-full">
                <InputLabel for="Description" value="Description" />
                <TextInput type="text" class="block mr-2  w-full"
                    :class="{ 'border-red-500': errors.description }" placeholder="" :isTextarea="true" :rows="4"
                    v-model="form.description" :errMessage="errors.description"
                    @update:model="clearError(errors, 'description')" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
            <div class="flex flex-col w-full">
                <div class=" mt-3 flex overflow-x-auto">
                    <img v-if="form.image" :src="$filePath(form.image)"
                        class="inline-block w-auto h-34 mr-4" :alt="file?.alternative_text || 'image'">
                </div>
            </div>
        </div>
        <button type="submit"
            class="flex mt-5 px-10 mb-10 ml-10 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Submit
        </button>
    </form>
</DefaultCard>
    <popupModal modalTitle="Media Library" customClasses="w-[1000px] h-[570px]" v-model:isOpen="IsOpen">
        <GetLibrary btnName="Select file" :getFlag="true" :selected="selectedFiles"  :singleFile="true" :closeModal="close"
            :selectedFiles="handleFiles" />
    </popupModal>
    <Loader :isLoading="loading" :fullPage="true" />
</template>

<script setup>
import GetLibrary from '@/views/Admin/Media-section/MediaSection.vue'
// import TextInput from '@/components/Admin-components/TextInput.vue'
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import MultiSelect from '@/components/Admin-components/form-components/MultiSelect.vue'
import InputError from '@/components/Admin-components/form-components/InputError.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import { MaterialTreeList } from '@/helper/Apis'
import MaterialsServices from '@/services/MaterialsServices'
import _ from 'lodash';
import { clearError,showToast } from '@/helper/functions'
import { onMounted, ref, watch, computed} from 'vue'
import { trueFalse, colors, } from '@/json/data'
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

// const props = defineProps(['id']);
const IsOpen = ref(false)
const MaterialTreeListData = ref([])
const loading = ref(false)
const props = defineProps(['id','domain'])
const id = ref(props.id || null)
const PreviousDomain = ref(null)
const masterId = ref(null)

const form = ref({
    parent_material: 0,
    display_material_option:null,
    yellow_banner_material_image:null,
    show_new_badge:null,
    single_color:null,
    show_new_badge_2021:null
})

const mediaName = ref( 'Select Media' || form.image)
const selectedFiles = ref(form.value.image)

const errors = ref({})

const emit = defineEmits(['handleApi']);

watch(
    () => props.material, (newValue) => {
        form.value = { ...newValue };
    }
)



const close = () => {
    IsOpen.value = false;
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
        if (_.isEmpty(form.value.parent_material) || _.isUndefined(form.value.parent_material) || _.isNull(form.value.parent_material)) {
            form.value.parent_material = 0;
        }
        if (validateForm()) {
            // emit('handleApi', { ...form.value });
            if(id.value !== null ) 
            handleEditMaterials( )
            else
            handleAddMaterials( { ...form.value })
        }
    } catch (e) {
        console.error('Error material add edit :', e)
    }
}

const handleFiles = (data) => {
    close();
    // if(singleFile.value === true)
    selectedFiles.value = data
    const media_titles = data.map(item => item.title);
    mediaName.value = media_titles.join(', ');

    // mediaName.value=data[0].title   
    const media_ids = data.map(item => item.id);
    form.value.media_id = media_ids[0];
}
// api for get patents child json parent material listing 
const materialTree = async (payload) => {
  MaterialTreeListData.value = await MaterialTreeList(payload)
}
// get material
const handleGetMaterialsById = async (payload) => {
  loading.value = true;
  try {
    const res = await MaterialsServices.getMaterials(payload);
    if (res.status === 200 && res.data.success) {
      const data = res.data.data;
      if (data && data.length > 0) {
        form.value = data[0];
        PreviousDomain.value = form.value.domain_id;
        masterId.value = form.value.master_material_id;
      }
    }
  } catch (e) {
    console.error("Error while fetching materials:", e);
  } finally {
    loading.value = false;
  }
};

const handleAddMaterials = async (payload) => {
  loading.value = true;
  try {
    const res = await MaterialsServices.addMaterial(payload);
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success');
      router.push('/materials');
    } else if (res.status === 400) {
      showToast(res.message, 'error');
    }
  } catch (e) {
    console.error("Error while adding material:", e);
    showToast('An error occurred', 'error');
  } finally {
    loading.value = false;
  }
};

const handleEditMaterials = async () => {
    // for edit existing  
  if (form.value.domain_id !== PreviousDomain.value) {
    delete form.value.id;
  }
// clone existing  in other domain 
  form.value = { ...form.value, master_material_id: masterId.value };
  loading.value = true;

  try {
    const res = await MaterialsServices.editMaterial(form.value);
    if (res.status === 200 && res.data.success) {
      showToast(res.data.message, 'success');
      router.push('/materials');
    } else if (res.status === 400) {
      showToast(res.data.message, 'error');
    }
  } catch (e) {
    console.error("Error while editing material:", e);
    showToast(e.response?.data?.message || 'An error occurred', 'error');
  } finally {
    loading.value = false;
  }
};

onMounted(()=>{
    if(props.id !== undefined && props.id !== null && props.id !== ' ' ) {
        handleGetMaterialsById({id:props.id,domain_id:store.getters.getDomain.id});
        form.value.domain_id = store.getters.getDomain.id
        materialTree({domain_id:store.getters.getDomain.id});
    }
})

watch(
    () => form.value.domain_id,
    () => {
        materialTree({domain_id:form.value.domain_id});
         }
);

</script>

