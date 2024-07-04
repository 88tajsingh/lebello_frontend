<template>
  <div>
    <div v-for="item in nestedData" :key="item.id">
      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input type="checkbox"
                 :checked="isChecked(item.id)"
                 @change="toggleChecked(item.id)"
                 class="mr-2">
          <span>{{ item.name }}</span>
        </label>
        <button @click="toggleChildren(item)"
                class="text-lg focus:outline-none">
          {{ item.expanded ? '▼' : '►' }}
        </button>
      </div>
      <div v-show="item.expanded && item.children" class="ml-8">
        <div v-for="child in item.children" :key="child.id" class="mt-2">
          <label class="flex items-center">
            <input type="checkbox"
                   :checked="isChecked(child.id)"
                   @change="toggleChecked(child.id)"
                   class="mr-2">
            <span>{{ child.name }}</span>
          </label>
        </div>
      </div>
    </div>
    <!-- <div v-if="checkedIds.length > 0" class="mt-2">
      <p class="text-gray-800">Checked IDs: {{ checkedIds.join(', ') }}</p>
    </div> -->
  </div>
</template>

<script setup>
  import { reactive, defineProps, defineEmits, computed } from 'vue';

  const emit = defineEmits(['checked-items']);

  const props = defineProps({
    data: {
      type: Array,
      default: [],
    },
  });

  const nestedData = reactive([...props.data]);
  const checkedItems = reactive([]);

  const toggleChecked = (id) => {
    const index = checkedItems.indexOf(id);
    if (index === -1) {
      checkedItems.push(id);
    } else {
      checkedItems.splice(index, 1);
    }
    getCheckedIds();
  };

  const isChecked = (id) => {
    return checkedItems.includes(id);
  };

  const toggleChildren = (item) => {
    item.expanded = !item.expanded;
  };

  const getCheckedIds = () => {
    emit('checked-items', checkedItems);
    console.log('Checked IDs:', checkedItems);
  };

  const checkedIds = computed(() => checkedItems);
</script>

<style scoped>
</style>
