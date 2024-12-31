  <template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 flex justify-center items-center z-50">
      <div class="bg-black bg-opacity-50 w-1/3 rounded-sm pt-10 shadow-lg overflow-hidden">
        <button @click="closeModal" class="text-gray-600 float-right mr-2 mt-2">
          <svg class="w-6 h-6" fill="none" stroke="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <form  @submit.prevent="handleSearch" role="search">
        <div class="flex items-center border-b border-white mb-4 ml-4">
          <input type="text" placeholder="Search"
           @keydown.enter="handleSearch"
            class="flex-grow p-2 bg-transparent text-white placeholder-white border-none focus-visible:ring-0"
            v-model="searchQuery" style="caret-color: white;" />

          <svg @click="handleSearch" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
                fill="#ffffff"></path>
            </g>
          </svg>
        </div>
      </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router= useRouter();
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const searchQuery = ref("");

const closeModal = () => {
  emit("close");
};

const handleSearch = (event) => {
  if (event) event.preventDefault(); 
  if (searchQuery.value.trim() !== '') {
    router.push({ name: 'search', query: { search: searchQuery.value } });
    search.value = ''; 
  } else {
    console.log('Search query is empty!');
  }
};

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

input::placeholder {
  color: white;
  font-size: 14px;
}
</style>
