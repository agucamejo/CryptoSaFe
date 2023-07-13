<template>
    <div>
      <ul v-for="question in questions" :key="question.id">
        <li>
          <h3>{{ question.question }}</h3> <br>
        </li>
        <li>
            <p>{{ question.answer }}</p>
        </li>
      </ul>
    </div>
  </template>

<script>
import learnData from '@/services/learn.json';

export default {
  data() {
    return {
      questions: []
    };
  },
  created() {
    this.questions = learnData.questions;
  }
};
</script>

<style scoped>
ul{
    padding: 1.5rem 6rem 0rem 1.5rem;
}

</style>