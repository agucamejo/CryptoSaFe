<template>
  <div class="header">
    <p class="titles" :style="'font-weight:400'">{{activeOption.toUpperCase()}}</p>
  </div>
</template>

<script>
import { useActiveOptionStore } from '../stores/menuBar.js';

export default {
  setup() {
    const activeOptionStore = useActiveOptionStore(); //Se obtiene el estado de la opción activa
    const activeOption = activeOptionStore.activeOption;

    return {
      activeOption,
    };
  },
};
</script>

<style scoped>
.header{
  width: 75%;
  border-bottom: 1.2px solid #8c8c8c;
  position: absolute;
  top:0;
  padding: 0.65rem 0rem 0.08rem 0rem;
  text-align: center;
}
</style>