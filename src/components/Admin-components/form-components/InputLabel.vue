<script setup>
defineProps({
    value: {
        type: String,
    },
    for:{
        type: String,
    }
});
</script>

<template>
    <label  :for="value" v-bind="$attrs" class="block mb-1  font-medium">
        <span v-if="value">{{ value }}</span>
        <span v-else><slot /></span>
    </label>
</template>
