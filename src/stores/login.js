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

      // Guardar ID y contraseña en localStorage
      localStorage.setItem('id', id);
      localStorage.setItem('password', password);
    },
  },
});

