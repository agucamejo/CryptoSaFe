<template>
    <div class="container">
        
        <div class="logo">
            <img src="../components/icons/logo-cryptosafe.svg" alt="Logo de CryptoSaFe"/>
            <div style="text-shadow: rgba(0, 0, 0, 0.25) 0 2px " class="titulos">
                <span style="color: #F7931A; font-size: 36px">Crypto</span><span style="color: #00146B; font-size: 36px;">SaFe</span>
            </div>
        </div>


        <div class="input">
            <button style="background: rgba(247, 147, 26, 0.69); border-radius: 26px; border: none; margin: 0.7rem; padding: 0.6rem;">        
                <RouterLink to="/login" style="color: black; font-size: 18px; font-weight: 500; text-decoration: none">Iniciar Sesión</RouterLink>
            </button>
        </div>


        <div class="banner">
            <h2 class="banner-title" style="font-size: 40px">Gestión de criptomonedas en un solo lugar</h2>
            <p class="banner-p">Disfrute de acceso total a las mejores criptos desde una plataforma única y optimizada. Ingrese en el mundo de DeFi y aproveche oportunidades financieras revolucionarias.</p>
            <img class="banner-img" src="../assets/img/save-coins.png" alt="ilustration of cryptos coins"/>
        </div>


        <div class="values">
            <div class="crypto-1">
                <img src="../assets/img/Bitcoin-valor.png" />
                <h4 style="color: #F07D46">Venta: <br> <span>1.000.000</span></h4>
                <h4 style="color: #F07D46">Compra: <br> <span>1.000.000</span></h4>
            </div>
            
            <div class="crypto-2">
                <img src="../assets/img/Ethereum-valor.png" />
                <h4 style="color: #464544">Venta: <br> <span>1.000.000</span></h4>
                <h4 style="color: #464544">Compra: <br> <span>1.000.000</span></h4>
            </div>
            
            <div class="crypto-3">
                <img src="../assets/img/Potcoin-valor.png" />
                <h4 style="color: #FF529F">Venta: <br> <span>1.000.000</span></h4>
                <h4 style="color: #FF529F">Compra: <br> <span>1.000.000</span></h4>
            </div>
            
            <div class="crypto-4">
                <img src="../assets/img/IOTA-valor.png" />
                <h4 style="color: #602CA3">Venta: <br> <span>1.000.000</span></h4>
                <h4 style="color: #602CA3">Compra: <br> <span>1.000.000</span></h4>
            </div>
        </div>
        
        
        <div class="advantages">
            <h2 class="advanteges-title" style="text-align: center; color: #00146B; font-size: 40px; padding-top: 4rem;">El futuro de tu libertad financiera al <br/>alcance de tu mano</h2>
            <div class="adventage-1">
                <img class="photo-1" src="../assets/img/sell-change.png" />
                <h4 class="title-1">Compra y venta de criptomonedas </h4>
                <p class="text-1">Facilita la adquisición y comercialización de <br/>cryptos de manera segura y eficiente.</p>
            </div>
            <div class="adventage-2">
                <img class="photo-2" src="../assets/img/money-bag.png" />
                <h4 class="title-2">Control de tus fondos actuales</h4>
                <p class="text-2">Permite el seguimiento completo, preciso y <br/>en tiempo real de activos financieros.</p>
            </div>
            <div class="adventage-3">
                <img class="photo-3" src="../assets/img/stats-image.png" />
                <h4 class="title-3">Consulta de movimientos históricos</h4>
                <p class="text-3">Registro detallado que facilita la toma de decisiones y <br/>la gestión eficiente de fondos.</p>
            </div>
        </div>
        
        <div class="cta-learn">
            <hr>
            <p style="font-size: 35px; padding-top: 2rem">Si no te sientes seguro o eres nuevo en este ámbito, no te preocupes</p>
            <p style="margin-top: 1rem">En CryptoSaFe, te brindamos la información necesaria para que puedas incursionar en el mundo de las criptomonedas, persiguiendo tus metas económicas.<br/>
                <br/>Para más información, visita la sección Aprender.</p>
        </div>

        <div class="footer">
            <div>
                <div :id="'logos-container'">
                    <img :class="'logos-footer'" src="../components/icons/github-icon.svg" alt="Logo GitHub">
                    <img :class="'logos-footer'" src="../components/icons/linkedin-icon.svg" alt="Logo LinkedIn">
                </div>
                <p>Copyright © 2023 - Agustin Camejo</p>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/WelcomeView.css'
</script>