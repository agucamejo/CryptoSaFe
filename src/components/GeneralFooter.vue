<template>
  <footer>
    <div :id="'logos-container'">
      <a href="https://github.com/agucamejo" target="_blank"><img :class="'logos-footer'" src="../components/icons/github-icon.svg" alt="Logo GitHub" title="Github"></a> 
      <a href="https://www.linkedin.com/in/agustin-camejo/" target="_blank"><img :class="'logos-footer'" src="../components/icons/linkedin-icon.svg" alt="Logo LinkedIn" title="LinkedIn"></a>
    </div>
    <p :style="'font-size:11px '">Copyright © 2023 - Agustin Camejo</p>
  </footer>
</template>

<style scoped>
footer{
  border-top: 1.2px solid #8c8c8c;
  width: 95%;
  padding: 0.52rem 0rem 0rem 0rem;
  margin: 1rem 0rem 0rem 0rem;
  text-align: center;
}

#logos-container{
  display: flex;
  justify-content: center;
}

.logos-footer{
  padding: 0px 8px;
}
</style>