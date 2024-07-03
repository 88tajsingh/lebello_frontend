<template>
    <form @submit.prevent="handleSubmit">
        <div class="p-6.5 grid grid-cols-2 gap-6">
            <div class="flex flex-col ">
                <InputLabel for="Name" value="Name" />
                <TextInput type="text" class="block mr-2 h-[40px] w-full" :class="{ 'border-red': errors.name }"
                    placeholder="" v-model="form.name" :errMessage="errors.name"
                    @update:model="clearError(errors, 'name')" />
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
                <Select :options="parentMaterial" showfield="name" class="w-full" valueField="value"
                    label="Select an option" v-model="form.parent_material" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop
                    and Big Band.
                </p>
                <InputError class="mt-2" :message="errors?.parent_material" />
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Display in Material Options" value="Display in Material Options" />
                <Select :options="trueFalse" showfield="name" class="w-full" valueField="value" label="Select an option"
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
            <div class="flex flex-col ">
                <InputLabel for="Label Background Color" value="Label Background Color" />
                <div class="flex gap-2">
                    <TextInput type="color" class="block h-[40px] min-w-[200px] px-2 rounded-lg"
                        :class="{ 'border-red-500': errors.label_background_color }" placeholder="" v-model="form.label_background_color"
                        :errMessage="errors.label_background_color" @update:model="clearError(errors, 'label_background_color')" />

                    <TextInput type="text" class="block mr-2 h-[40px] min-w-[220px]"
                        :class="{ 'border-red-500': errors.label_background_color }" placeholder="" v-model="form.label_background_color"
                        @update:model="clearError(errors, 'label_background_color')" />
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
                <Select :options="colors" showfield="name" class="w-full" valueField="value" label="Select an option"
                    v-model="form.single_color" />
                <InputError class="mt-2" :message="errors.single_color" />
            </div>
            <div class="flex flex-col ">
                <InputLabel for="Multiple Color" value="Multiple Color" />
                <MultiSelect v-model="form.multiple_color" :options="colors" placeHolder="Select multiple color"  />
                <InputError class="mt-2" :message="errors?.multiple_color" />
            </div>
            <div class="flex flex-col w-full">
                <InputLabel for="Featured_image" value="Featured_image" />
                <ImageUpload2 @file-selected="form.media_id = $event"
                    :accepted-formats="['jpg', 'jpeg', 'png']" />
                <InputError class="mt-2" :message="errors?.media_id" />
            </div>
            <div class="flex flex-col w-full">
                <InputLabel for="Description" value="Description" />
                <TextInput type="text" class="block mr-2 h-[36px] w-full"
                    :class="{ 'border-red-500': errors.description }" placeholder="" :isTextarea="true" :rows="4"
                    v-model="form.description" :errMessage="errors.description"
                    @update:model="clearError(errors, 'description')" />
                <p class="text-sm text-[#646970] text-[11.5px]">
                    The description is not prominent by default; however, some themes may show it.
                </p>
            </div>
        </div>
        <button type="submit"
            class="flex mt-5 px-52 mb-10 m-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Submit
        </button>
    </form>
    
</template>

<script setup>
import DefaultCard from '@/components/Admin-components/DefaultCard.vue'
import MultiSelect from '@/components/Admin-components/form-components/MultiSelect.vue'
import Button from '@/components/Admin-components/Buttons/Button.vue'
import TextInput from '@/components/Admin-components/form-components/TextInput.vue'
import InputError from '@/components/Admin-components/form-components/InputError.vue'
import InputLabel from '@/components/Admin-components/form-components/InputLabel.vue'
import Select from '@/components/Admin-components/form-components/Select.vue'
import ImageUpload2 from "@/components/Admin-components/form-components/ImageUpload2.vue"
import { useRoute } from 'vue-router'
import { clearError } from '@/helper/functions'
import { ref, watch, watchEffect } from 'vue'
import { trueFalse, colors, parentMaterial } from '@/json/data'
import { defineEmits } from 'vue';

const route = useRoute()
const swatchId = ref(route.params.id)
const errors = ref({})
const props =defineProps({
    material: {
        type: Object,
    },
    options: {
        type: Object,
        default: () => { }
    },
    formHeader:{
        type: String,
    },
    formHeader:{
        type: String,
    },
})
const emit = defineEmits(['handleApi']);

watch(
    () => props.material, (newValue) => {
  form.value = {...newValue};
}
)

const form = ref({...props.material })

const validateForm = () => {
    let isValid = true
    errors.value = {}

    if (!form.value.name) {
        errors.value.name = 'Name is required'
        isValid = false
    }

    // if (!form.value.slug) {
    //     errors.value.slug = 'Slug is required'
    //     isValid = false
    // }
    // if (!form.value.parent_material) {
    //     errors.value.parent_material = 'parent_material is required'
    //     isValid = false
    // }
    // if (!form.value.description) {
    //     errors.value.description = 'description is required'
    //     isValid = false
    // }
    // if (!form.value.material_price) {
    //     errors.value.material_price = 'price is required'
    //     isValid = false
    // }

    return isValid
}

const handleSubmit = async () => {
    try {

        if (validateForm()) {  
            emit('handleApi', {...form.value}); 
        }
    } catch (e) {
        console.error('Error material add edit :', e)
    }
}
</script>

<style>
.e-ddl.e-input-group.e-control-wrapper .e-input {
    font-size: 20px;
    font-family: emoji;
    color: #ab3243;
    background: #000505;
}

.e-ddl.e-input-group.e-control-wrapper .e-input {
    font-size: 20px;
    font-family: emoji;
    color: #ab3243;
    background: #32a5ab;
}

.custom-file-upload {
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    transition: background-color 0.3s ease;
}

.custom-file-upload:hover {
    background-color: #e2e2e2;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>
