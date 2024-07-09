<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/template-components/Breadcrumbs/BreadcrumbDefault.vue'
import ProfileCard from '@/components/template-components/ProfileCard.vue'
// import DefaultLayout from '@/layouts/GuestLayout.vue'

const pageTitle = ref('Profile')
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-242.5">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <ProfileCard />
    </div>
  </DefaultLayout>
</template>
