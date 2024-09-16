<script setup>
import AdminLayout from "@/Layouts/AdminLayout.vue";
import { useStore } from 'vuex';

const store = useStore();

</script>

<template>
    <div>
        <div class="pt-2 ">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-2">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class=" px-6 py-2 text-gray-900 text-2xl"> welcome , </div>
                    <div class="px-6 py-2 text-gray-900">You're logged in with <b> {{ store?.getters?.user?.email }}</b>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>