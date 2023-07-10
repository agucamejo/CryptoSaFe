<template>
    <div class="header">
        <p class="titulos" :style="'font-weight:400'">{{activeOption.toUpperCase()}}</p>
    </div>
</template>

<style>
.header{
    width: 75%;
    border-bottom: 1.2px solid #8c8c8c;
    position: absolute;
    top:0;
    padding: 0.65rem 0rem 0.08rem 0rem;
    text-align: center;
}
</style>

<script>
import { useActiveOptionStore } from '../stores/menuBar';

export default {
  // ...
  setup() {
    const activeOptionStore = useActiveOptionStore();
    const activeOption = activeOptionStore.activeOption;

    return {
      activeOption,
    };
  },
};
</script>
