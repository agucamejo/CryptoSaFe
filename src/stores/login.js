import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    id: localStorage.getItem('id') || '',
    password: localStorage.getItem('password') || '',
  }),
  actions: {
    setCredentials(id, password) {
      this.id = id;
      this.password = password;

      localStorage.setItem('id', id);
      localStorage.setItem('password', password);
      localStorage.setItem('activeOption', 'inicio');
    },
  },
});