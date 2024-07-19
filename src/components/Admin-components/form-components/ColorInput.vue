<template>
    <div>
        <InputLabel :for="props.label"> {{ props.label }}</InputLabel>
        <div class="flex items-center space-x-2">
            <input type="color" v-model="color"
                class="w-12 h-9  rounded-lg border  bg-transparent outline-none  focus-visible:shadow-none"
                @input="updateColor" />
            <input type="text" v-model="color"
                class="w-28 h-8 rounded-lg border border-gray-4 bg-transparent outline-none focus:border-primary focus-visible:shadow-none text-center"
                @input="updateColor" />
            <Button type="submit" @click="clearColor" bg_th_color="text-white bg-[#2271B1] hover:bg-[#0a4b78]"
                class=" text-sm ml-auto px-3 py-[5px]">
                Clear
            </Button>
        </div>
    </div>
</template>

<script setup>
import InputLabel from './InputLabel.vue';
import { ref, watch, defineEmits, defineProps } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: 'Color'
    }
})

const emit = defineEmits(['update:modelValue'])

const color = ref(props.modelValue)

watch(color, (newColor) => {
    emit('update:modelValue', newColor)
})

const updateColor = () => {
    emit('update:modelValue', color.value)
}

const clearColor = () => {
    color.value = '#000000'
    emit('update:modelValue', color.value)
}
</script>