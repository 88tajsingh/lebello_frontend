<template>
    <div>
        <InputLabel :for="props.label" :class="{'ml-8': hasCheckBox, 'ml-1': !hasCheckBox}"> {{ props.label }}</InputLabel>
        <div class="flex items-center space-x-2">
            <!-- SingleCheck Component -->
            <SingleCheck
                v-if="hasCheckBox"
                :id="`${props.label}Checkbox`"
                label=""
                v-model="checked"
            ></SingleCheck>
            
            <!-- Color Input -->
            <input
                type="color"
                v-model="color"
                class="w-12 h-9 rounded-lg border bg-transparent outline-none focus-visible:shadow-none"
                @input="updateColor"
            />
            <input
                type="text"
                v-model="color"
                class="w-28 h-8 rounded-lg border border-gray-4 bg-transparent outline-none focus:border-primary focus-visible:shadow-none text-center"
                @input="updateColor"
            />
            <Button
                @click="clearColor"
                bg_th_color="text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                class="text-sm ml-auto px-3 py-[5px]"
            >
                Clear
            </Button>
        </div>
    </div>
</template>

<script setup>
import InputLabel from './InputLabel.vue';
import SingleCheck from './SingleCheck.vue';
import { ref, watch, defineEmits, defineProps } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: 'Color'
    },
    hasCheckBox: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue', 'update:checkValue']);

const color = ref(props.modelValue);
const checked = ref(false);

watch(color, (newColor) => {
    emit('update:modelValue', newColor);
});

watch(checked, (newChecked) => {
    emit('update:checkValue', newChecked);
});

const updateColor = () => {
    emit('update:modelValue', color.value);
};

const clearColor = () => {
    color.value = '#000000';
    emit('update:modelValue', color.value);
};

</script>
