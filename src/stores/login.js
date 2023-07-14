import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    id: '',
  }),
  actions: {
    setCredentials(id) {
      this.id = id;
    },
  },
});

