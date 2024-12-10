<template>
    <li class="accordion__item broder-t border-red">
      <div 
        class="accordion__trigger"
        :class="{'accordion__trigger_active': visible}"
        @click="open">
        <slot name="accordion-trigger"></slot>
      </div>
  
      <transition 
        name="accordion"
        @enter="start"
        @after-enter="end"
        @before-leave="start"
        @after-leave="end">
  
        <div class="accordion__content"
          v-show="visible">
          <ul>
            <!-- This slot will handle all the content that is passed to the accordion -->
            <slot name="accordion-content"></slot>
          </ul>
        </div>
      </transition>
    </li>
  </template>
  
  
  <script>
  export default {
    props: {},
    inject: ["Accordion"],
    data() {
      return {
        index: null
      };
    },
    computed: {
      visible() {
        return this.index == this.Accordion.active;
      }
    },
    methods: {
      open() {
        if (this.visible) {
          this.Accordion.active = null;
        } else {
          this.Accordion.active = this.index;
        }
      },
      start(el) {
        el.style.height = el.scrollHeight + "px";
      },
      end(el) {
        el.style.height = "";
      }
    },
    created() {
      this.index = this.Accordion.count++;
    }
  };
  </script>
  
  <style scoped>
  .accordion__item {
    cursor: pointer;
    padding: 0px 60px;
    border-bottom: 1px solid #ebebeb;
    border-top: 1px solid #ebebeb;
    position: relative;
  }
  
  .accordion__trigger {
    display: flex;
    justify-content: space-between;
  }
  
  .accordion-enter-active,
  .accordion-leave-active {
    will-change: height, opacity;
    transition: height 0.6s ease-in-out, opacity 0.6s ease-in-out;
    overflow: hidden;
  }
  
  .accordion-enter,
  .accordion-leave-to {
    height: 0 !important;
    opacity: 0;
  }
  </style>
  