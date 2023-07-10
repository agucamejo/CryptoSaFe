import { defineStore } from 'pinia'

export const useActiveOptionStore = defineStore('activeOption', {
  state: () => ({
    activeOption: 'inicio',
  }),
  actions: {
    setActiveOption(option) {
      this.activeOption = option;
    },
  },
});