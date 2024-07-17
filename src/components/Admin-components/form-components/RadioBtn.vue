<!-- RadioButton.vue -->
<template>
    <div class="w-auto" v-bind="$attrs">
        <label v-for="(option, index) in options" :key="index">
            <input
                type="radio"
                :id="option.title"
                :name="'radioOption'"
                :value="option.title"
                @change="handleOptionChange"
            />
            {{ option.title }}
            <div v-if="selected === 'Option2'  && option.title === 'Option2'">
                <TextInput
                    id="title"
                    type="text"
                    class="block w-full  h-[31px] my-1"
                    v-model="username"
                    placeholder=" "
                    lable=""
                />
            </div>
        </label>
    </div>
</template>

<script setup>
import { ref } from "vue";
import TextInput from "./TextInput.vue";
const props = defineProps({
    options: Array,
    onChange: Function,
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },

});
const selected = ref("");
const handleOptionChange = (e) => {
    selected.value = e.target.value;
    props.onChange(e.target.value);
};
</script>
