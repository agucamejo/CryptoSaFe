//Gestiona la opción activa en el menú de la aplicación.
import { defineStore } from 'pinia';

export const useActiveOptionStore = defineStore('activeOption', {
  state: () => ({
    activeOption: localStorage.getItem('activeOption') || 'inicio', //Estado inicial de la store
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