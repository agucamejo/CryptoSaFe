<script setup>
import '../assets/LearnView.css'
import MenuBar from '../components/MenuBar.vue'
import GeneralFooter from '../components/GeneralFooter.vue'
import GeneralHeader from '../components/GeneralHeader.vue';
import LearnQuestions from '../components/LearnQuestions.vue';

</script>

<script>
export default {
  data() {
    return {
      questions: LearnQuestions.questions
    };
  }
};
</script>

<template>
  <div class="container">
    <div class="logo"></div>
    <div class="section-name"><GeneralHeader></GeneralHeader></div>
    <div class="menu"><MenuBar></MenuBar></div>
    <div class="main-content">
      <LearnQuestions/>
    </div>
    <div class="footer"><GeneralFooter></GeneralFooter></div>
  </div>
</template>

