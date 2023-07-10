<script setup>
import '../assets/ShoppingView.css'
import MenuBar from '../components/MenuBar.vue'
import GeneralFooter from '../components/GeneralFooter.vue'
import GeneralHeader from '../components/GeneralHeader.vue';
</script>
<template>
  <div class="container">
    <div class="logo"></div>
    <div class="section-name"><GeneralHeader></GeneralHeader></div>
    <div class="menu"><MenuBar></MenuBar></div>
    <div class="main-content"></div>
    <div class="footer"><GeneralFooter></GeneralFooter></div>
  </div>
</template>