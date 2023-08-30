<script setup>
import MenuBar from '../components/MenuBar.vue'
import GeneralFooter from '../components/GeneralFooter.vue'
import GeneralHeader from '../components/GeneralHeader.vue';
import PurchaseSection from '../components/PurchaseSection.vue';
</script>

<template>
  <div class="container">
    <div class="logo"></div>
    <div class="section-name"><GeneralHeader></GeneralHeader></div>
    <div class="menu"><MenuBar></MenuBar></div>
    <div class="main-content">
      <PurchaseSection />
    </div>
    <div class="footer"><GeneralFooter></GeneralFooter></div>
  </div>
</template>

<style scoped>
.container {  
  display: grid;
  grid-template-columns: 0.4fr 1.6fr;
  grid-template-rows: 100px auto auto;
  grid-auto-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "logo section-name"
    "menu main-content"
    "menu footer";
}
  
.main-content { grid-area: main-content;}
  
.logo { grid-area: logo; }
  
.menu { grid-area: menu; }
  
.section-name { grid-area: section-name; }
  
.footer { grid-area: footer; }
</style>