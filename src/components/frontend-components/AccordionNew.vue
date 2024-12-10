<template>
    <div class="w-full mx-auto border-t border-gray-4">
        <!-- Accordion -->
        <div v-for="(item, index) in items" :key="index" class="border-b border-gray-4">
            <!-- Parent Item -->
            <div 
                class="flex w-1/3 border justify-between items-center p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
                @click="toggleParent(index)"
            >
                <div>
                    <span class="font-medium">{{ item.title }}</span>
                </div>
                <Icons.Arrow size="13px" fillColor="#64748b" strokeWidth="22.77" direction="left" />
            </div>

            <!-- Child Items -->
            <div v-if="activeParent === index" class="bg-gray-50">
                <div 
                    v-for="(child, childIndex) in item.children" 
                    :key="childIndex"
                    class="border-t border-gray-4 cursor-pointer transition"
                    @click="openPopup(item, child)"
                >
                    <div class="flex items-center justify-between w-1/3 p-3 pl-6">
                        <span class="text-gray-700">{{ child.name }}</span>
                        <span class="pr-1">
                            <Icons.Arrow size="13px" fillColor="#64748b" strokeWidth="22.77" direction="left" />
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Popup -->
        <Transition name="nested">
            <div 
                v-if="showPopup" 
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-[9999]"
            >
                <div 
                    class="outer absolute top-0 bottom-0 right-0 bg-white shadow-screen w-3/4 md:w-2/4 z-50 p-6"
                    @click.stop
                >
                    <div class="inner max-w-4xl mx-auto p-6">
                        <!-- Back button -->
                        <div class="flex gap-10">
                            <span>
                                <button class="mb-4 flex pt-2 text-gray-500" @click="closePopup">
                                    <Icons.Arrow size="20px" fillColor="#64748b" strokeWidth="22.77" direction="right" />
                                </button>
                            </span>
                        <!-- Title -->
                        <div>
                            <h1 class="text-3xl font-bold mb-4">{{ popupTitle }}</h1>
                            <p class="text-gray-600 mb-6">{{ popupDescription }}</p>
                            <div>
                                <select v-model="selectedChildName" @change="updateSelectedChild"
                                    class="border border-gray-300 rounded px-4 w-36">
                                    <option v-for="child in currentItem.children" :key="child.name" :value="child.name">
                                        {{ child.name }}
                                    </option>
                                </select>
                            </div>
                            <!-- Images Grid -->
                            <div class="grid grid-cols-4 gap-4 mt-4 h-[320px] overflow-y-auto scrollbar-hide overflow-hidden">
                                <div v-for="image in selectedChildImages" :key="image" class="bg-gray-100 aspect-square">
                                    <img :src="image" alt="" class="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
<script setup>
import { ref,watch } from "vue";
import Icons from "./Svg/Icons";
const items = ref([
    {
        title: "B Chair",
        description: "B Chair is now available in our exclusive timeless pixie weave design language. A chair that provides functionality with its open frame design allowing access to a self-storage compartment for personal belongings. ",
        children: [
            {
                name: "Galfasa G4",
                images: [
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                ],
            },
            {
                name: "Structures G4",
                images: [
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                ],
            },
        ],
    },
    {
        title: "Aqua Weave G4",
        description: "Child A is a flexible material with a modern design.",
        children: [
            {
                name: "Child A",
                images: [
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                ],
            },
            {
                name: "Child B",
                images: ["https://via.placeholder.com/150"],
            },
        ],
    },
    {
        title: "Colored Surfaces",
        description: "Option 1 features vibrant and dynamic colors.",
        children: [
            {
                name: "Option 1",
                images: [
                    "https://via.placeholder.com/150",
                    "https://via.placeholder.com/150",
                ],
            },
            {
                name: "Option 2",
                images: ["https://via.placeholder.com/150"],
            },
        ],
    },
]);

const activeParent = ref(null);
const showPopup = ref(false);
const popupTitle = ref("");
const popupDescription = ref("");
const currentItem = ref({});
const selectedChildName = ref("");
const selectedChildImages = ref([]);

const toggleParent = (index) => {
    activeParent.value = activeParent.value === index ? null : index;
};

const openPopup = (parent, child) => {
    currentItem.value = parent;
    popupTitle.value = parent.title;
    popupDescription.value = parent.description;
    selectedChildName.value = child.name;
    selectedChildImages.value = child.images;
    showPopup.value = true;
};

const closePopup = () => {
    showPopup.value = false;
    popupTitle.value = "";
    popupDescription.value = "";
    selectedChildImages.value = [];
};

watch(selectedChildName, (newChildName) => {
    const child = currentItem.value.children.find((c) => c.name === newChildName);
    selectedChildImages.value = child ? child.images : [];
});
</script>

<style>
.outer,
.inner {
    padding: 30px;
    min-height: 100px;
}

.nested-enter-active,
.nested-leave-active {
    transition: all 0.6s ease-in-out;
}

.nested-enter-from,
.nested-leave-to {
    transform: translateX(50px);
    opacity: 0;
}
</style>