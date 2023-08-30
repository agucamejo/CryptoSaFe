<template>
  <div class="login-page">  
    <header class="header-login">
      <a href="#">
        <img src="../components/icons/logo-cryptosafe.svg" alt="Logo de CryptoSaFe" title="CryptoSaFe"/>
        <span class="titles logo-crypto">Crypto</span><span class="titles logo-safe">SaFe</span>
      </a>
    </header>

    <form class="form" @submit.prevent="submitForm">
      <div class="inner-container">
        <div class="box">
          <h1>Iniciar Sesión</h1>
          <input type="text" id="id" v-model="id" placeholder="Usuario"/>
          <input type="password" id="password"  v-model="password" placeholder="Contraseña"/>
          <button type="submit">Ingresar</button>
          <RouterLink to="/">Cancelar</RouterLink>
        </div>
      </div>
    </form>

    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <p>{{ modalMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {useAuthStore} from '../stores/login';
import {useRouter} from 'vue-router';

export default defineComponent({
  setup() {
    const id = ref('');
    const password = ref('');
    const showModal = ref(false);
    const modalMessage = ref('');

    const authStore = useAuthStore();
    const router = useRouter();

    const submitForm = () => {
      const idRegEx = /^[a-zA-Z0-9]+$/;
      const passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
      if (id.value && password.value) {
        if (!idRegEx.test(id.value)) {
          modalMessage.value = 'El nombre de usuario solo puede contener letras y números sin espacios ni caracteres especiales.';
          showModal.value = true;
          return;
        }

        if(!passwordRegEx.test(password.value)){
          modalMessage.value = 'Contraseña incorrecta. \n Debe contener como mínimo 8 caracteres. \n Debe contener como mínimo un número, un caracter especial, una mayúscula y una minúscula.';
          showModal.value = true;
          return;
        }

        authStore.setCredentials(id.value, password.value);
        router.push({ name: 'home' });
      } else {
        modalMessage.value = 'Por favor, completa ambos campos.';
        showModal.value = true;
      }
    };


    return {
      id,
      password,
      showModal,
      modalMessage,
      submitForm,
    };
  },
});
</script>

<style scoped>
.login-page {  
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr auto;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "logo"
    "form";
}

.header-login { 
  grid-area: logo;
  background-color: rgb(224, 224, 224);
  display: flex;
  padding: 0.5rem;
  box-shadow: 0px 2px rgba(0, 0, 0, 0.25);
  justify-content: center;
}

a{
  display: flex;
  align-items: center;
}

.form{
  grid-area: form;
  height: 80vh;
  display: grid;
  justify-items: center;
}

.inner-container{
  width:450px;
  height:450px;
  position:absolute;
}

.box{
  position:absolute;
  height:100%;
  width:100%;
  color:#fff;
  background:rgba(0, 0, 0, 0.09);
  padding:15px 0px;
  border-radius: 25px;
  margin: 5rem 0rem;
  display: grid;
  justify-items: center;
  box-shadow: -1px 0px 25px 0px #133a4a69;
}

.box h1{
  text-align:center;
  margin:30px 0;
  font-size:30px;
  color: #00146B;
}

.box input{
  display:block;
  width:300px;
  margin:18px auto;
  padding:15px;
  background:rgba(0,0,0,0.2);
  border:0;
  border-radius: 19px;
}

.box input:focus,.box input:active,.box button:focus,.box button:active{
  outline:none;
}

.box button{
  background:#F7931A;
  border:0;
  padding:0.625rem;
  font-size:1.125rem;
  width:9.375rem;
  margin: 1.875rem auto;
  display:block;
  cursor:pointer;
  border-radius: 1.188rem;
}

.box button:active{
  background:#dd8213;
}
</style>