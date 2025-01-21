<template>
  <section class="breadcrem_section bg-white">
    <div class="product_container">
      <nav class="breadcrem_text">
        <ul >
          <li
            v-for="(item, index) in breadcrumbData"
            :key="index"
            class=""
          >
            <span v-if="index > 0" class="">/</span>
            <router-link
              :to="item.href"
              :class="[
                'transition-colors duration-500 hover:text-[#cc9933]',
                { 'text-[#cc9933]': item.isActive }
              ]"
            >
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

// Define props
defineProps({
  breadcrumbData: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>

.breadcrem_text ul {
  display: flex;
  align-items: center;
  column-gap: 12px;
}
.breadcrem_text ul li {
  font-size: 16px;
  line-height: 18px;
  color: #000000;
}
.breadcrem_text ul li a.active_link {
  color: #cc9933;
}
.breadcrem_text ul li a {
  transition: all 0.5s;
}
.breadcrem_text ul li a:hover {
  color: #cc9933;
}
.breadcrem_section {
  padding: 38px 0px;
}
.breadcrem_text ul li {
    display: flex;
    column-gap: 10px;
}

@media (max-width: 1699px) {
  .breadcrem_section {
    padding: 28px 0px;
  }
}

@media(max-width:1199px){
  .product_container {
    padding: 0px 52px;
}
}

@media(max-width:991px){
  .product_container {
    padding: 0px 32px;
}

}

@media(max-width:574px){
  .breadcrem_section {
    padding: 22px 0px;
}
.product_container {
    padding: 0px 22px;
}
/* .breadcrem_text ul li[data-v-1680cfa2] {
    font-size: 14px;
    line-height: 14px;
} */
}
</style>