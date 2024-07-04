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
      @start="dragStart" @end="dragEnd">
    <div v-for="group in list" :key="group" class="group">
          <div class="bg-white  text-san border  mt-1 py-2 px-3  text-[13px]"
            :class="Classes"
          >{{ group[parentfield] }}</div>
          <draggable class="list-group w-full" :list="group.children" @change="log">
            <div
              class="list-group-item text-sans bg-white border ml-4 mt-1 py-2 px-3  text-[13px]"
              v-for="element in group.children"
              :key="element"
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
  
  const drag = ref(false)

  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
    },
  props: {
    list: {
      type: Array,
    
    },
    Classes: {
      type: String,
    },
    parentfield: {
      type: String,
    },
    childField: {
      type: String,
    },
  },
  data() {
      return {
        localList: [], 
      };
    },
    watch: {
      list(newValue) {
        this.localList = [...newValue]; 
      },
    },
    methods: {
      log(event) {
        // console.log(event);
      },
      dragStart(event) {
        // console.log('Drag start:', event);
      },
      dragEnd(event) {
        this.$emit('update:list', this.localList);
      },
    },
    mounted() {
      this.localList = [...this.list]; 
    },
  });
  </script>
  
  <style scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.7;
  background: #c8ebfb;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
  