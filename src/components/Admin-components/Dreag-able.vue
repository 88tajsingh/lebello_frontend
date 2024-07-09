<template>
  <div class="text-[#555] text-sans">
    <transition-group type="transition" :name="'flip-list'">
      <draggable class="dragArea list-group w-full" v-model="localList"
                 :component-data="{
                   tag: 'ul',
                   type: 'transition-group',
                   name: !drag ? 'flip-list' : null
                 }"
                 @change="log"
                 @start="dragStart"
                 @end="dragEnd"
      >
        <div v-for="(group, groupIndex) in list" :key="groupIndex" class="group">
          <div class="bg-white text-san border mt-1 py-2 px-3 text-[13px]" :class="Classes">
            {{ group[parentfield] }}
          </div>
          <draggable class="list-group w-full" v-model="group.children" @change="log"
             @start="dragStart"
                 @end="dragEnd"
          >
            <div class="list-group-item text-sans bg-white border ml-4 mt-1 py-2 px-3 text-[13px]"
                 v-for="(element, elementIndex) in group.children"
                 :key="elementIndex"
            >
              {{ element[childField] }}
            </div>
          </draggable>
        </div>
      </draggable>
    </transition-group>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    Classes: {
      type: String,
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
  },
  data() {
    return {
      localList: [],
      drag: false, // Assuming you control drag state somewhere else in your component
    };
  },
  watch: {
    list: {
      handler(newValue) {
        this.localList = [...newValue]; // Ensure localList reflects changes in prop list
      },
      immediate: true, // Trigger initial update
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
      this.$emit('update:list', this.localList); // Emit updated list to parent component
    },
  },
});
</script>
