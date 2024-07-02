<template>
    <PageHeader>Rearrange Postion of Right Navigation
    </PageHeader>
    <Dreagable v-model:list="list" @update:list="handleListUpdate" parentfield="navName" Classes="mt-3 border-[#ccc]">
    </Dreagable>
    <Button type="" bg_th_color=" mt-5 text-white bg-[#2271B1] hover:bg-[#0a4b78]" class="text-sm ml-auto px-3 py-1">
        Save
    </Button>

</template>
<script setup>
import { ref } from 'vue';
import PageHeader from '@/components/Admin-components/PageHeader.vue'
import Button from "@/components/Admin-components/Buttons/Button.vue";
import Dreagable from "@/components/Admin-components/Dreag-able.vue";
const sortedData = ref([])
const list =
    ref([
        {
            "navName": "RopeTek",
            "rightNav": "383",
            "rightNavId": "3261"
        },
        {
            "navName": "Lebello Fibers",
            "rightNav": "349",
            "rightNavId": "2744"
        },
        {
            "navName": "Knittex",
            "rightNav": "419",
            "rightNavId": "3437"
        },
        {
            "navName": "Surface Tex",
            "rightNav": "433",
            "rightNavId": "3451"
        },
        {
            "navName": "Performance Fabrics",
            "rightNav": "348",
            "rightNavId": "2730"
        },
        {
            "navName": "",
            "rightNav": "437",
            "rightNavId": ""
        },
        {
            "navName": "Colored Surfaces",
            "rightNav": "340",
            "rightNavId": "2596"
        },
        {
            "navName": "Pixie Weaving",
            "rightNav": "350",
            "rightNavId": "14339"
        },
        {
            "navName": "",
            "rightNav": "",
            "rightNavId": ""
        }
    ]
    )
function handleListUpdate(updatedList) {
    console.log('Updated list in parent:', updatedList);
    sortedData.value = updatedList;
    console.log("sortedData", sortedData.value)
};
</script>
