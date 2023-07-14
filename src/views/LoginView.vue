<template>
    <div class="container">
            
        <div class="logo">
            <img src="../components/icons/logo-cryptosafe.svg" alt="Logo de CryptoSaFe"/>
            <div style="text-shadow: rgba(0, 0, 0, 0.25) 0 2px " class="titulos">
                <span style="color: #F7931A; font-size: 36px">Crypto</span><span style="color: #00146B; font-size: 36px;">SaFe</span>
            </div>
        </div>

        <form class="form" @submit.prevent="submitForm">
            <div class="inner-container">
                <div class="box">
                    <h1>Iniciar Sesion</h1>
                    <input type="text" id="id" v-model="id" placeholder="Usuario"/>
                    <input type="password" id="password"  v-model="password" placeholder="Contraseña"/>
                    <button type="submit">Ingresar</button>
                    <RouterLink to="/" style="color: #000000">Cancelar</RouterLink>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { defineComponent,ref } from 'vue';
import { useAuthStore } from '../stores/login';
import { useRouter } from 'vue-router';
import apiClient from '../services/apiClient';

export default defineComponent({
  setup() {
    const id = ref('');
    const password = ref('');

    const authStore = useAuthStore();
    const router = useRouter();

    const submitForm = () => {
      if (id.value && password.value) {
        authStore.setCredentials(id.value, password.value);
        router.push({ name: 'home' });

        const credentials = { id: id.value, password: password.value };
        apiClient.login(credentials)
          .then(response => {
            // Aquí puedes manejar la respuesta de la solicitud de inicio de sesión
            console.log(response.data); // Por ejemplo, imprimir la respuesta en la consola
          })
          .catch(error => {
            // Aquí puedes manejar los errores de la solicitud de inicio de sesión
            console.error(error);
          });
      } else {
        alert('Por favor, completa ambos campos.');
      }
    };

    return {
      id,
      password,
      submitForm,
    };
  },
});
</script>



<style scoped>
.container {  display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "logo"
      "form";
}

.logo { 
    grid-area: logo;
    background-color: rgb(224, 224, 224);
    display: flex;
    padding: 0.5rem;
    box-shadow: 0px 2px rgba(0, 0, 0, 0.25);
    justify-content: center;
}

.form{
    grid-area: form;
    height: 80vh;
    display: grid;
    justify-items: center;
  }
  .inner {
    position: absolute;
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
    margin-top: 5rem;
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
    color:#000;
    border:0;
    border-radius: 19px;
  }
  .box input:focus,.box input:active,.box button:focus,.box button:active{
    outline:none;
  }
  .box button{
    background:#F7931A;
    border:0;
    color:#000000;
    padding:10px;
    font-size:18px;
    width:150px;
    margin:30px auto;
    display:block;
    cursor:pointer;
    border-radius: 19px;
  }
  .box button:active{
    background:#dd8213;
  }
  .box p{
    font-size:14px;
    text-align:center;
  }
  .box p span{
    cursor:pointer;
    color:#4d4c4c;
  }
</style>