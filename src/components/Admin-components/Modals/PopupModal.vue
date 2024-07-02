<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center py-2 px-28 bg-black bg-opacity-50 z-999999 ">
      <div class="modal-container bg-white rounded-lg shadow-lg max-w-full  w-full h-full overflow-y-auto">
        <div class="modal-header flex justify-between items-center mt-4 ml-3 px-4  bg-gray-200 rounded-t-lg">
          <h3 class="text-lg font-semibold">{{ modalTitle }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal-body  overflow-y-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';



export default defineComponent({
  props: {
    modalTitle: String,
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:isOpen'],
  setup(props, { emit }) {
    

    watch(() => props.modalTitle, (newVal) => {
      title.value = newVal;
    });

    const closeModal = () => {
      emit('update:isOpen', false);
    };

    return {
      
      closeModal
    };
  }
});
</script>

<style scoped>
.modal-container {
  width: 100%;
}

.modal-header {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.modal-body {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #cec6c6; 
  border-radius : 20px; 

}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius : 20px; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>
