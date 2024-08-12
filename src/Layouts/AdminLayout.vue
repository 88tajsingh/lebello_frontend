<script setup>
import HeaderArea from "@/components/Admin-components/Header/HeaderArea.vue";
import SidebarArea from "@/components/Admin-components/Sidebar/SidebarArea.vue";
import { RouterView } from 'vue-router'
import { checkAndRefreshToken } from "@/helper/functions";

setInterval(checkAndRefreshToken, 50000)
</script>
<template>
    <div class="flex h-screen overflow-hidden bg-[#f0f0f1]">
        <SidebarArea />
        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <HeaderArea />
            <main>
                <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-[#f0f0f1]">         
                        <RouterView> </RouterView>                 
                </div>
            </main>
        </div>
    </div>
</template>
