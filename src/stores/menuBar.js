import { createStore } from 'vuex';

const menuBarStore = createStore({
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

export default menuBarStore;