<template>
    <div class="container">
            
        <div class="logo">
            <img src="../components/icons/logo-cryptosafe.svg" alt="Logo de CryptoSaFe"/>
            <div style="text-shadow: rgba(0, 0, 0, 0.25) 0 2px " class="titulos">
                <span style="color: #F7931A; font-size: 36px">Crypto</span><span style="color: #00146B; font-size: 36px;">SaFe</span>
            </div>
        </div>

        <div class="form">
            <div class="inner-container">
                <div class="box">
                    <h1>Iniciar Sesion</h1>
                    <input type="text" placeholder="Usuario"/>
                    <input type="text" placeholder="Contraseña"/>
                    <button><RouterLink to="/home" style="color: #000000; text-decoration: none;">Ingresar</RouterLink></button>
                    <RouterLink to="/" style="color: #000000">Cancelar</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/LoginView.css'
</script>