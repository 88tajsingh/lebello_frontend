<template>
  <div>
    <div class="text-lg breadcrumbs py-[3px] lg:py-1">
      <ul class="flex">
        <li 
          v-for="(breadcrumb, index) in props?.breadcrumbData" 
          :key="`breadcrumb-${index}`"
          class="text-Black666 text-[15px] font-graphik cursor-pointer hover:text-blue" 
          :class="{ 'text-green text-[16px]': index == 0 }"
        >
          <p @click="onBreadcrumbClick(breadcrumb)">
            {{ breadcrumb?.name }}
            <span v-if="index < breadcrumbData?.length - 1" class="m-1">{{ props?.seprate }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

// Define the props passed into the component
const props = defineProps(['breadcrumbData', 'seprate', 'color']);
const emit = defineEmits(['setSessionData']);

// Access the router instance
const router = useRouter();

// Handle click on breadcrumb and emit event to parent
function onBreadcrumbClick(breadcrumb) {
  // Store contract_type_id in sessionStorage
  if (breadcrumb.contractTypeId) {
    sessionStorage.setItem('contractTypeId', breadcrumb.contractTypeId);
    router.push(breadcrumb.link);
  }
  else {
    router.push(breadcrumb.link);
  }
  
}
</script>
