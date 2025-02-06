<template>
<header class="main_haeder">
    <div class="product_container">
        <div class="desktop_header_main">
            <div class="logo_div">
                <a href="lebello.com"><img src="/public/logo-header.png" alt="Lebello"></a>
            </div>
            <div class="menu_div">
                <ul>
                    <li><a href="https://lebello.com/new-collection/">New </a></li>
                    <li><a href="https://lebello.com/product">Collection 25</a></li>
                    <li><a href="https://lebello.com/product">Category</a></li>
                    <li><a href="https://lebello.com/contract-design/">Contract</a></li>
                    <li><a href="https://lebello.com/contract-design/">Company </a></li>
                    <li><a href="https://lebello.com/contract-design/">Store </a></li>
                    <li><button @click="showModal = true"> <img src="/public/new-search.svg" alt="Saerch"> </button></li>
                </ul>
            </div>
        </div>
        <div class="mobile_header_main">
            <div class="mobile_logo">
                <a href="lebello.com"><img src="/public/logo-header.png" alt="Lebello"></a>
            </div>
            <div class="menu_btn">
                <button @click="openModal=true" class="toggle_menu">
                    <img src="/public/menu-icon.svg" alt="" />
                </button>
            </div>
            <div v-if="openModal" class="transform transition-transform duration-1000 mobile_menu_main">
                <div class="mobile_top_head">
                    <button @click="openModal=false"><img src="/public/close_sign.png"></button>
                    <ul class="top_new_menu mm-list">
                        <li><a href="https://lebello.com/">HOME</a></li>
                        <li><a href="mailto:sales@lebello.com" target="_blank">CONTACT US</a></li>
                    </ul>
                </div>
                <ul class="mobile_menu_ul">
                    <li><a href="https://lebello.com/new-collection/">New <svg data-v-a5c52140="" width="15px" height="15px" fill="#000000" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="10.5"><g data-v-a5c52140="" id="SVGRepo_bgCarrier" stroke-width="0"></g><g data-v-a5c52140="" id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g data-v-a5c52140="" id="SVGRepo_iconCarrier"><path data-v-a5c52140="" d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path></g></svg> </a></li>
                    <li><a href="https://lebello.com/product">Collection 25 <svg data-v-a5c52140="" width="15px" height="15px" fill="#000000" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="10.5"><g data-v-a5c52140="" id="SVGRepo_bgCarrier" stroke-width="0"></g><g data-v-a5c52140="" id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g data-v-a5c52140="" id="SVGRepo_iconCarrier"><path data-v-a5c52140="" d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path></g></svg></a></li>
                    <li><a href="https://lebello.com/product">Category <svg data-v-a5c52140="" width="15px" height="15px" fill="#000000" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="10.5"><g data-v-a5c52140="" id="SVGRepo_bgCarrier" stroke-width="0"></g><g data-v-a5c52140="" id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g data-v-a5c52140="" id="SVGRepo_iconCarrier"><path data-v-a5c52140="" d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path></g></svg></a></li>
                    <li><a href="https://lebello.com/contract-design/">Contract <svg data-v-a5c52140="" width="15px" height="15px" fill="#000000" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="10.5"><g data-v-a5c52140="" id="SVGRepo_bgCarrier" stroke-width="0"></g><g data-v-a5c52140="" id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g data-v-a5c52140="" id="SVGRepo_iconCarrier"><path data-v-a5c52140="" d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path></g></svg></a></li>
                    <li><a href="https://lebello.com/contract-design/">Company <svg data-v-a5c52140="" width="15px" height="15px" fill="#000000" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="10.5"><g data-v-a5c52140="" id="SVGRepo_bgCarrier" stroke-width="0"></g><g data-v-a5c52140="" id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g data-v-a5c52140="" id="SVGRepo_iconCarrier"><path data-v-a5c52140="" d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path></g></svg></a></li>
                    <li><a href="https://lebello.com/contract-design/">Store <svg data-v-a5c52140="" width="15px" height="15px" fill="#000000" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="10.5"><g data-v-a5c52140="" id="SVGRepo_bgCarrier" stroke-width="0"></g><g data-v-a5c52140="" id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g data-v-a5c52140="" id="SVGRepo_iconCarrier"><path data-v-a5c52140="" d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path></g></svg></a></li>
                </ul>
                <div class="menu_bottom_search">
                    <form role="search" action="" method="get" id="searchform">
                        <input placeholder="Search" type="text" name="s" value="">
                        <button type="submit" class="new_submit_btn_menu"><img src="/public/search-btn-mobile.png"></button>
                    </form>
                </div>
            </div>
        </div>
        <SearchModal :show="showModal" @close="showModal = false" />
    </div>
</header>

</template>
<script setup>
import { ref,defineAsyncComponent  } from 'vue';
const SearchModal = defineAsyncComponent(() =>
  import('./SearchModal.vue')
);
const openModal = ref(false)
const showModal = ref(false);


</script>


<style>
.desktop_header_main {
    display: flex;
    align-items: flex-end;
    column-gap: 62px;
}
.product_container {
    padding: 0px 268px 0px 124px;
}
.main_haeder {
    position: absolute;
    z-index: 9999999999999;
    width: 100%;
    background: #00000000;
    padding: 40px 0px;
    -webkit-transition: all 0.7s ease-in-out;
    transition: all 0.7s ease-in-out;
}
.main_haeder:hover {
    background: rgba(14, 14, 14, 0.43);
}
.desktop_header_main .menu_div {
    width: 100%;
}
.desktop_header_main .menu_div ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 62px;
}
.desktop_header_main .logo_div {
    width: 100%;
    max-width: 213px;
}
.desktop_header_main .menu_div ul a {
    font-size: 16px;
    color: #fff;
    text-transform: uppercase;
    display: flex;
    column-gap: 30px;
    align-items: center;
    position: relative;
}
.desktop_header_main .menu_div ul a:after {
    content: "";
    background: url(/src/assets/images/header-right.svg);
    width: 11px;
    height: 17px;
}
.desktop_header_main .menu_div ul li {
    line-height: 0;
}
.mobile_header_main {
    display: none;
}

@media (max-width: 1879px) {
    .product_container {
        padding: 0px 194px 0px 94px;
    }
}
@media (max-width: 1699px) {
    .product_container {
        padding: 0px 122px 0px 82px;
    }
    .desktop_header_main .menu_div ul {
        column-gap: 40px;
    }
    .desktop_header_main .menu_div ul a {
        column-gap: 24px;
    }
}

@media(max-width:1499px){
    .desktop_header_main .menu_div ul a {
        column-gap: 16px;
        font-size: 15px;
    }
    .desktop_header_main .logo_div {
        max-width: 168px;
    }
    .desktop_header_main .menu_div ul li button img {
        max-width: 18px;
    }
    .desktop_header_main .menu_div ul a:after {
        height: 19px;
    }
    .main_haeder {
        padding: 30px 0px;
    }
}

@media(max-width:1300px){
    .desktop_header_main {
        column-gap: 46px;
    }
    .desktop_header_main .menu_div ul {
        column-gap: 28px;
    }
    
    .desktop_header_main .menu_div ul li button img {
        max-width: 16px;
    }
}

@media (max-width: 1199px) {
    .product_container {
        padding: 0px 104px 0px 52px;
    }
    .desktop_header_main .menu_div ul a {
        -moz-column-gap: 14px;
        column-gap: 12px;
        font-size: 14px;
    }
    .desktop_header_main .menu_div ul a:after {
        background-repeat: no-repeat;
        background-size: 82% 100%;
    }
    .desktop_header_main .logo_div {
        max-width: 150px;
    }
    .desktop_header_main .menu_div ul {
        column-gap: 14px;
    }
}
@media (max-width: 991px) {
    .product_container{
        padding: 0px 32px;
    }
    .desktop_header_main {
        display: none;
    }
    .mobile_header_main {
        display: block;
    }
    .mobile_logo img {
        max-width: 161px;
    }
    header.main_haeder {
        background: none !important;
    }
    .menu_btn {
        margin-top: 14px;
    }
    .menu_btn img {
        max-width: 33px;
    }
    .mobile_menu_main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #eae6e1;
        height: 100%;
        z-index: 99999999 !important;
        padding: 30px 80px 0px 30px !important;
    }
    .mobile_menu_main .mobile_top_head {
        display: flex;
        align-items: center;
        column-gap: 32px;
    }
    .mobile_menu_main .mobile_top_head .top_new_menu {
        display: flex;
        align-items: center;
    }
    .mobile_menu_main .mobile_top_head .top_new_menu a {
        color: #ce8d39 !important;
        font-size: 14px !important;
    }
    .mobile_menu_main .mobile_top_head .top_new_menu li {
        line-height: 14px;
        display: flex;
        align-items: center;
    }
    .mobile_menu_main .mobile_top_head .top_new_menu li:nth-child(1):after {
        content: "/";
        color: #ce8d39 !important;
        font-size: 14px !important;
        padding: 0px 10px;
    }
    .mobile_menu_main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #eae6e1;
        height: 100%;
        z-index: 99999999 !important;
        padding: 30px 80px 0px 30px !important;
    }
    .mobile_menu_main .mobile_top_head {
        display: flex;
        align-items: center;
        column-gap: 32px;
    }
    .mobile_menu_main .mobile_top_head .top_new_menu {
        display: flex;
        align-items: center;
    }
    .mobile_menu_main .mobile_top_head .top_new_menu a {
        color: #ce8d39 !important;
        font-size: 14px !important;
    }
    .mobile_menu_main .mobile_top_head .top_new_menu li {
        line-height: 14px;
        display: flex;
        align-items: center;
    }
    .mobile_menu_main .mobile_top_head .top_new_menu li:nth-child(1):after {
        content: "/";
        color: #ce8d39 !important;
        font-size: 14px !important;
        padding: 0px 10px;
    }
    .mobile_menu_main ul.mobile_menu_ul {
        margin-top: 22px;
    }
    .mobile_menu_main ul.mobile_menu_ul a {
        font-size: 16px !important;
        color: #333 !important;
    }
    .mobile_menu_main ul.mobile_menu_ul li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #33333357;
        padding: 15px 0px;
    }
    .menu_bottom_search {
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        background: #eae6e1 !important;
        padding: 50px 80px 50px 30px !important;
    }
    .menu_bottom_search input {
        background: none !important;
        border: 1px solid #33333357 !important;
        width: 100% !important;
        color: #333 !important;
        padding: 16px 14px !important;
        border-radius: 30px;
        font-size: 13px;
        line-height: 30px;
        display: block;
        height: 30px;
        outline: none !important;
        margin: 0px auto;
        box-shadow: none !important;
    }
    .menu_bottom_search input::placeholder {
        color: #333;
    }
    .menu_bottom_search button {
        position: absolute;
        right: 14px;
        top: 10px;
    }
    .menu_bottom_search form {
        position: relative;
    }
    .menu_bottom_search button img {
        max-width: 12px;
    }
    .mobile_menu_main ul.mobile_menu_ul li a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .mobile_menu_main ul.mobile_menu_ul li a svg.icon {
        transform: rotate(-90deg);
    }
    .mobile_menu_main ul.mobile_menu_ul li a:hover {
        color: #ce8d39 !important;
    }
    .mobile_menu_main ul.mobile_menu_ul li a {
        transition: all 0.5s;
    }
    .mobile_menu_main ul.mobile_menu_ul li a svg {
        transition: all 0.5s;
    }
    .mobile_menu_main ul.mobile_menu_ul li a:hover svg {
        stroke: #ce8d39 !important;
        fill: #ce8d39 !important;
    }
    .mobile_menu_main ul.mobile_menu_ul li a:hover svg path {
        fill: #ce8d39 !important;
    }
}

@media (max-width: 574px) {
    .product_container{
        padding: 0px 22px;
    }
}


</style>