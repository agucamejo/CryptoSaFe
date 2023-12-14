import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AppSpinner from 'vue-spinner/src/ScaleLoader.vue';
import './assets/base.css'

const app = createApp(App)
app.use(store);
app.use(router)

app.mount('#app')

app.component('AppSpinner', AppSpinner);

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import store from './stores/login';

const firebaseConfig = {
  apiKey: "AIzaSyBsGS9VFidUixCuN--njk-JnkcKEdt3biE",
  authDomain: "cryptosafe-13a7d.firebaseapp.com",
  projectId: "cryptosafe-13a7d",
  storageBucket: "cryptosafe-13a7d.appspot.com",
  messagingSenderId: "393846629769",
  appId: "1:393846629769:web:1914da7aeae6f38e3f2d58",
  measurementId: "G-GEE9RQHG8N"
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
const application = initializeApp(firebaseConfig);
const db = getFirestore(application);
const auth = getAuth();

export { db, auth, storage };

onAuthStateChanged(auth, (user) => {
  if (user) {
      const usuarioActivo ={
        email: user.email,
        uid: user.uid
      }
     store.dispatch('detectarUsuario', usuarioActivo)
  } else {
    store.dispatch('detectarUsuario', user)
  } 
});
app.mixin({
  data() {
    return {
      isLoading: true,
    };
  },
});