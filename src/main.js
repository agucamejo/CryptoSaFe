import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AppSpinner from 'vue-spinner/src/ScaleLoader.vue';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.component('AppSpinner', AppSpinner);


app.mixin({
  data() {
    return {
      isLoading: true, // Inicialmente, se asume que la página está cargando
    };
  },
});