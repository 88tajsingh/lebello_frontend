<template>
  <div>
    <div v-for="item in props.data" :key="item.id">
      <div class="flex items-center justify-between">
        <label class="flex items-center">
          <input type="checkbox"
                 :checked="isChecked(item[valueField])"
                 @change="toggleChecked(item[valueField])"
                 class="mr-2">
                
          <span>{{ item[showField]  }}</span>
        </label>
        <button v-if="props.dropdown" type="button" @click="toggleChildren(item)"
                class="text-lg focus:outline-none">
          <div v-if="item.expanded==false">
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z" fill="#787c82"></path> </g></svg>
          </div>
          <div v-else>
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.6806 13.9783L15.4706 10.7683L13.5106 8.79828C12.6806 7.96828 11.3306 7.96828 10.5006 8.79828L5.32056 13.9783C4.64056 14.6583 5.13056 15.8183 6.08056 15.8183H11.6906H17.9206C18.8806 15.8183 19.3606 14.6583 18.6806 13.9783Z" fill="#787c82"></path> </g></svg>
          </div>
        </button>
      </div>
      <div v-show="item.expanded && item.children" class="ml-8">
        <div v-for="child in item.children" :key="child.id" class="mt-2">
          <label class="flex items-center">
            <input type="checkbox"
                   :checked="isChecked(child[valueField])"
                   @change="toggleChecked(child[valueField])"
                   class="mr-2">
            <span>{{ child[showField] }}</span>
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
  import { reactive,ref, defineProps, defineEmits, computed } from 'vue';

  const emit = defineEmits(['checked-items']);

  const props = defineProps({
    data: {
      type: Array,
      default: [],
    },
    dropdown: {
      type: Boolean,
      default: false,
    },
    showField: {
      type: String,
      default: 'name',
    },
    valueField: {
      type: String,
      default: 'id',
    },
    label: {
      type: String,
      default: 'id',
    },
  });
  const togelFalse = ref(false);
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
