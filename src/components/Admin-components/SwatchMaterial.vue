<template>
    <div>
      <div class="flex">
        <div class="w-1/2 px-1">SWATCHES</div>
        <div class="w-1/2 px-1">MATERIALS</div>
      </div>
      <div class="flex h-[200px] overflow-y-auto">
        <!-- Left Panel -->
        <div class="w-1/2 border-r">
          <ul>
            <li v-for="item in materialSwatchesList" :key="item.id"
                class="flex text-[#2272B1] justify-between items-center p-2 cursor-pointer hover:bg-[#eaf2fa]"
                :class="{ 'bg-gray opacity-80': isSelected(item) }"
                @click="toggleSwatchSelection(item)">
              <span class="text-[#2272B1]">{{ item.title }}</span>
              <span class="text-[10px] text-Black666">SWATCHES</span>
            </li>
          </ul>
        </div>
  
        <!-- Right Panel -->
        <div class="w-1/2 pl-4">
          <div v-if="selectedSwatchesData.length">
            <div v-for="swatch in selectedSwatchesData" :key="swatch.swatch" class="mb-4">
              <!-- Swatch Title -->
              <div class="flex justify-between">
                <h4 class="text-[#2272B1]">
                  {{
                    materialSwatchesList && materialSwatchesList.find(item => item.id === swatch.swatch)?.title
                  }}
                </h4>
                <span class="text-[12px]">SWATCHES</span>
              </div>
              <!-- Materials for the Swatch -->
              <ul>
                <li v-for="material in materialSwatchesList.find(s => s.id === swatch.swatch)?.materials_data || []"
                    :key="material.id" class="flex items-center mb-2">
                  <div class="flex w-full justify-between">
                    <span>
                      <input type="checkbox"
                             :id="'material-' + material.id" class="mr-2"
                             @change="handleCheckboxChange(material.id, swatch.swatch, $event)" />
                      <label :for="'material-' + material.id" class="text-[#2272B1]">{{ material.name }}</label>
                    </span>
                    <span class="text-[10px]">MATERIAL</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <p class="text-gray-500">No swatches selected</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    materialSwatchesList: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmits(['updateSelectedSwatchesData']);
  
  const selectedSwatchesData = ref([]);
  const selectedSwatchIds = ref([]);
  
  const toggleSwatchSelection = (item) => {
        if (!Array.isArray(selectedSwatchesData.value)) {
            console.error("selectedSwatchesData is not an array", selectedSwatchesData.value);
            selectedSwatchesData.value = [];
        }
        const existingSwatch = selectedSwatchesData.value.find(swatch => swatch.swatch === item.id);

        if (!existingSwatch) {
            const materialsSelected = item.materials?.length > 0; 
            if (materialsSelected) {
                selectedSwatchesData.value.push({
                    swatch: item.id, 
                    materials: item.materials.filter(material => material.selected) 
                });
                selectedSwatchIds.value.push(item.id);
            }
        }
    };

    const isSelected = (item) => selectedSwatchIds.value.includes(item.id);

    const handleCheckboxChange = (materialId, swatchId, event) => {
        const { checked } = event.target;
        const swatch = selectedSwatchesData.value.find(s => s.swatch === swatchId);

        if (swatch) {
            if (checked) {
                if (!swatch.materials.includes(materialId)) {
                    swatch.materials.push(materialId);
                }
            } else {
                swatch.materials = swatch.materials.filter(id => id !== materialId);
            }
        } else {
            selectedSwatchesData.value.push({
                swatch: swatchId,
                materials: checked ? [materialId] : []
            });
            selectedSwatchIds.value.push(swatchId);
        }
        emit('updateSelectedSwatchesData', selectedSwatchesData.value);

    };

  watch(selectedSwatchesData, (newData) => {
    emit('updateSelectedSwatchesData', newData);
  });
  </script>