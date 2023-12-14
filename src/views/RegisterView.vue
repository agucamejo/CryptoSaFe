<template>
    <div class="modal fade" id="registro">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Regístrate</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="register( this.email, this.password )">  
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
              <!-- REPASSWORD -->
              <div class="input-group mb-3">
              <span class="input-group-text">Repite Password</span>
              <input v-model="repassword" 
                      type="password"
                      required="true" 
                      class="form-control">
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { 
  getAuth,
  createUserWithEmailAndPassword,
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
    register(email, password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('¡Registrado', user, '!');
        router.push({ name: 'login' });
        window.location.reload();
      })
      .catch((error) => {
          const errorCode = error.code;
          this.errorMessage = error.message;
          alert(this.errorMessage, errorCode);
      });
    },        
  }
}
</script>