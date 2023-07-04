import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    activeOption: 'inicio',
  }),
  actions: {
    setActiveOption(option) {
      this.activeOption = option;
    },
  },
});
