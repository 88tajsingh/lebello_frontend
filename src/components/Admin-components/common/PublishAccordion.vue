<template>
    <Accordion :header="header" :open="true">
        <div class="px-1 py-3">
            <div class="px-4">
                <div class="flex flex-col">
                    <Select :options="options" :title="selectTitle" showfield="name" class="w-full" valueField="value"
                        :label="selectLabel" v-model="form.status" :hasCheckBox="hasCheckBox"
                        @update:checkValue="onCheckboxUpdate" />
                </div>
            </div>
        </div>
        <div class="bg-[#f6f7f7] flex py-3">
            <Button type="submit" bg_th_color="text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                class="text-sm ml-auto px-3 py-2" @click="onSubmit">
                {{ buttonText }}
            </Button>
        </div>
    </Accordion>
</template>

<script setup>
import { computed } from "vue";
import Accordion from '@/components/Admin-components/Accordion.vue'

const props = defineProps({
    header: {
        type: String,
        required: true,
    },
    open: {
        type: Boolean,
        default: true,
    },
    options: {
        type: Array,
        required: true,
    },
    form: {
        type: Object,
        required: true,
    },
    hasCheckBox: {
        type: Boolean,
        default: false,
    },
    selectTitle: {
        type: String,
        default: "Select Option",
    },
    selectLabel: {
        type: String,
        default: "Select an Option",
    },
    onSubmitHandler: {
        type: Function,
        default: () => { },
    },
    onCheckboxUpdate: {
        type: Function,
        default: () => { },
    },
});

const buttonText = computed(() => (props?.form.id ? "Update" : "Submit"));

const onSubmit = () => {
    onSubmitHandler(form);
};
</script>