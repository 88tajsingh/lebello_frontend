<template>
<header class="main_haeder">
    <div class="product_container">
        <div class="desktop_header_main">
            <div class="logo_div">
                <a href="lebello.com"><img src="/public/logo-header.png" alt="Lebello"></a>
            </div>
            <div class="menu_div">
                <ul>
                    <li><a href="https://lebello.com/new-collection/">New</a></li>
                    <li><a href="https://lebello.com/product">Collection 25</a></li>
                    <li><a href="https://lebello.com/product">Category</a></li>
                    <li><a href="https://lebello.com/contract-design/">Contract</a></li>
                    <li><a href="https://lebello.com/contract-design/">Company </a></li>
                    <li><a href="https://lebello.com/contract-design/">Store </a></li>
                    <li><button> <img src="/public/new-search.svg" alt="Saerch"> </button></li>
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
                <ul>
                    <li><a href="https://lebello.com/new-collection/">New</a></li>
                    <li><a href="https://lebello.com/product">Collection 25</a></li>
                    <li><a href="https://lebello.com/product">Category</a></li>
                    <li><a href="https://lebello.com/contract-design/">Contract</a></li>
                    <li><a href="https://lebello.com/contract-design/">Company </a></li>
                    <li><a href="https://lebello.com/contract-design/">Store </a></li>
                </ul>
            </div>
        </div>
    </div>
</header>

</template>
<script setup>
import { ref } from 'vue';

const openModal = ref(false)


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
    z-index: 9;
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
    
}

@media (max-width: 767px) {
    .product_container{
        padding: 0px 32px;
    }
}
</style>