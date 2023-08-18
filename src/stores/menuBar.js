import { defineStore } from 'pinia';

export const useActiveOptionStore = defineStore('activeOption', {
  state: () => ({
    activeOption: localStorage.getItem('activeOption') || 'inicio',
  }),
  actions: {
    setActiveOption(option) {
      this.activeOption = option;

      localStorage.setItem('activeOption', option);
    },
    clearActiveOption() {
      this.activeOption = 'inicio';
    },
  },
});
