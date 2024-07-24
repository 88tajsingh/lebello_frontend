<!-- RecursiveDraggable.vue -->
<template>
    <div class="group">
      <div class="bg-white text-san border mt-1 py-2 px-3 text-[13px]" :class="Classes">
        {{ item[parentfield] }}
      </div>
      <draggable class="list-group w-full" v-model="item.children" @change="log"
        @start="dragStart"
        @end="dragEnd"
      >
        <div v-for="(child, childIndex) in item.children" :key="childIndex" class="list-group-item text-sans bg-white border ml-4 mt-1 py-2 px-3 text-[13px]">
          {{ child[childField] }}
          <RecursiveDraggable v-if="child.children && child.children.length" :item="child" :parentfield="parentfield" :childField="childField" :Classes="Classes" @update:children="updateChildren" />
        </div>
      </draggable>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { VueDraggableNext } from 'vue-draggable-next';
  
  export default defineComponent({
    name: 'RecursiveDraggable',
    components: {
      draggable: VueDraggableNext,
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
      parentfield: {
        type: String,
        required: true,
      },
      childField: {
        type: String,
        required: true,
      },
      Classes: {
        type: String,
        required: true,
      },
    },
    methods: {
      log(event) {
        // Optional: Log the event if needed
        // console.log(event);
      },
      dragStart(event) {
        // Optional: Log drag start event if needed
        // console.log('Drag start:', event);
      },
      dragEnd(event) {
        this.$emit('update:children', this.item.children); // Emit updated children to parent component
      },
      updateChildren(updatedChildren) {
        this.item.children = updatedChildren; // Update children data
        this.$emit('update:children', this.item.children); // Emit updated children to parent component
      },
    },
  });
  </script>
  