<template>
     <a href="https://www.facebook.com/share.php?u=https://lebello.com/products/b-chair-1-2/&title=B Chair"
                  target="_blank" title="Facebook"
                  class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full mx-2 hover:bg-green-500">
                  <svg :width="props.size" :height="props.size" viewBox="-5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fcfcfc" stroke="#fcfcfc">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)" fill="#ffffff">
                          <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path
                              d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z"
                              id="facebook-[#fcfcfc]"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
  </template>
  
  <script setup>
  
  const props = defineProps({
    size: {
      type: String,
      default: "30px",
    },
    fillColor: {
      type: String,
      default: "#868383",
    },
  });
  </script>
  