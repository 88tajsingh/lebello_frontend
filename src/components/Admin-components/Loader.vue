<template>
    <div class="vl-parent">
        <loading :active="isLoading"
                 :is-full-page="fullPage"
                 @update:active="isLoading = $event"
                 @update:is-full-page="fullPage = $event"/>
    </div>
</template>
<script setup>
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/css/index.css';
    const props = defineProps({
        isLoading: Boolean,
        fullPage: Boolean,
    });    
</script>
