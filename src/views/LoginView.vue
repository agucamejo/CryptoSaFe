<template>
  <div class="login-page">  
    <header class="header-login">
      <a href="#">
        <img src="../components/icons/logo-cryptosafe.svg" alt="Logo de CryptoSaFe" title="CryptoSaFe"/>
        <span class="titles logo-crypto">Crypto</span><span class="titles logo-safe">SaFe</span>
      </a>
    </header>

    <form @submit.prevent="login( this.email, this.password )">
              <!-- CORREO --> 
              <div class="input-group mb-3">
              <span class="input-group-text">Correo</span>
              <input v-model="email" 
                      type="email"
                      required="true"
                      class="form-control">
              </div>
              <!-- PASSWORD --> 
              <div class="input-group mb-3">
              <span class="input-group-text">Password</span>
              <input v-model="password" 
                      type="password"
                      required="true" 
                      class="form-control">
              </div>
              <div class="d-grid gap-2">
                <button type="submit" 
                  class="btn btn-primary" 
                >
                  Iniciar sesión
                </button>
              </div>
              </form>
  </div>
</template>

<script>
import { 
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { mapGetters } from 'vuex'   
import router from '../router/index';

export default {
  data() {
    return {
      email: '',
      password: '',
      repassword: '',
      errorMessage: '',
    };
  },
  computed: {
    ...mapGetters(['existeUsuario'])
  },
  methods: {    
    login( email, password ) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          alert('¡Sesión iniciada', user, '!');
          const user = userCredential.user;
          router.push({ name: 'home' });
      })
      .catch((error) => {
        const errorCode = error.code;
        this.errorMessage = error.message;
        alert(this.errorMessage, errorCode);
        router.push({ name: 'home' });
      });
    }
  }
}
// import Swal from 'sweetalert2';
// import { defineComponent, ref } from 'vue';
// import store from '../stores/login'; 
// import { useRouter } from 'vue-router';

// export default defineComponent({
//   setup() {
//     const id = ref('');
//     const password = ref('');

//     const authStore = store(); 
//     const router = useRouter();

//     const submitForm = () => {
//       const idRegEx = /^[a-zA-Z0-9]+$/;
//       const passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
//       if (id.value && password.value) {
//         if (!idRegEx.test(id.value)) {
//           Swal.fire({
//           title: 'Atención!',
//           text: 'El ID de usuario no cumple los requisitos.',
//           icon: 'warning',
//           confirmButtonText: 'Entendido'
//         }) 
//           return;
//         }

//         if(!passwordRegEx.test(password.value)){
//           Swal.fire({
//             title: 'Error!',
//             text: 'Contraseña incorrecta, vuelve a intentarlo.',
//             icon: 'error',
//             confirmButtonText: 'Entendido'
//           });
//           return;
//         }

//         authStore.setCredentials(id.value, password.value); //Almacena las credenciales
//         router.push({ name: 'home' });
//       } else {
//         Swal.fire({
//           title: 'Atención!',
//           text: 'Por favor, complete ambos campos.',
//           icon: 'warning',
//           confirmButtonText: 'Entendido'
//         })  
//       }
//     };

//     return {
//       id,
//       password,
//       submitForm,
//     };
//   },
// });
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