import { defineStore } from 'pinia';

export const useActiveOptionStore = defineStore('activeOption', {
  state: () => ({
    activeOption: localStorage.getItem('activeOption') || 'inicio',
  }),
  actions: {
    setActiveOption(option) {
      this.activeOption = option;

      // Guardar la opción activa en localStorage
      localStorage.setItem('activeOption', option);
    },
    clearActiveOption() {
      this.activeOption = 'inicio';
    },
  },
});
