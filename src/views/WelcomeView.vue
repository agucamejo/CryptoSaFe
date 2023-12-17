<template>
  <div class="welcome-page"> 
    <header class="header-welcome">
      <a href="#">
        <img src="../components/icons/logo-cryptosafe.svg" alt="Logo CryptoSaFe" title="CryptoSaFe"/>
        <span class="titles logo-crypto">Crypto</span><span class="titles logo-safe">SaFe</span>
      </a>
      <RouterLink to="/login" class="login-btn">Iniciar Sesión</RouterLink>
    </header>

    <section class="banner">
      <h2 class="banner-title" >Gestión de criptomonedas en un solo lugar</h2>
      <p class="banner-p">Disfrute de acceso total a las cryptos más populares desde una  plataforma única y optimizada. Ingrese en el mundo de DeFi y aproveche oportunidades financieras revolucionarias.</p>
      <img class="banner-img" src="../assets/img/save-coins.png" alt="Ilustración de caja fuerte con criptomonedas" title="Gestión de criptomonedas"/>
    </section>

    <div class="slider" v-if="coinData.length">
      <div class="slider-track">
        <div class="slide" v-for="(data, index) in coinData" :key="index"> <!--Recorre coinData y se asigna una key a cada elemento. -->
          <div class="crypto">
            <h4 :style="colors[index % colors.length]">{{ data.coin }}</h4> <!--Asigna colores de manera aleatoria -->
            <p>Venta <span>{{ formattedNumber(data.ask) }}</span></p>
            <p>Compra <span>{{ formattedNumber(data.bid) }}</span></p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>Cargando...</div>
        
    <section class="advantages">
      <h2 class="advantages-title">La libertad financiera al alcance de tu mano</h2>
      <div class="adventage-1">
        <img class="photo-1" src="../assets/img/sell-change.png" alt="Ilustración de intercambio de monedas" title="Compra y venta de criptomonedas"/>
        <h4 class="title-1">Compra y venta de criptomonedas</h4>
        <p class="text-1">Facilita la adquisición y comercialización de <br/>cryptos de manera segura y eficiente.</p>
      </div>
      <div class="adventage-2">
        <img class="photo-2" src="../assets/img/money-bag.png" alt="Ilustración de bolsa de dinero" title="Fondos actuales"/>
        <h4 class="title-2">Control de tus fondos actuales</h4>
        <p class="text-2">Permite el seguimiento completo, preciso y <br/>en tiempo real de tus financias.</p>
      </div>
      <div class="adventage-3">
        <img class="photo-3" src="../assets/img/stats-image.png" alt="Ilustración de caja fuerte y estadísticas" title="Movimientos históricos"/>
        <h4 class="title-3">Consulta de movimientos históricos</h4>
        <p class="text-3">Registro detallado que facilita la toma de decisiones y <br/>la gestión eficiente de fondos.</p>
      </div>
    </section>
        
    <section class="learn">
      <hr>
      <p class="learn-title">Si no te sientes seguro o eres nuevo en este ámbito, no te preocupes</p>
      <p>En CryptoSaFe, te brindamos la información necesaria para que puedas incursionar en el mundo de las criptomonedas, persiguiendo tus metas económicas.<br/>
      <br/>Para más información, visita la sección <b>Aprender</b>.</p>
    </section>

    <footer class="footer-welcome">
      <div :id="'logos-container'">
        <a href="https://github.com/agucamejo" target="_blank"><img :class="'logos-footer'" src="../components/icons/github-icon.svg" alt="Logo de GitHub" title="Github"></a> 
        <a href="https://www.linkedin.com/in/agustin-camejo/" target="_blank"><img :class="'logos-footer'" src="../components/icons/linkedin-icon.svg" alt="Logo de LinkedIn" title="LinkedIn"></a>
      </div>
      <p>Copyright © 2023 - Agustin Camejo</p>
    </footer>
  </div>
</template>

<script>
import { formattedNumber } from '../components/methods/correctNumber';

export default {
  data() {
    return {
      coinData: [], //Almacena info actualizada de las cryptos
      colors: ['color: #143F6B', 'color:#B504D9', 'color:#422DB8','color:#08726E','color:#0079FF', 'color:#DF0000', 'color:#FF0060', 'color:#8B1874', 'color:#54B435'],
      formattedNumber: formattedNumber,
    };
  },
  async created() { // Se ejecuta cuando el componente se crea, antes de montar el DOM.
    const coins = ["BNB", "BTC", "BUSD", "DAI", "ETH", "MATIC", "SOL", "USDC", "USDT"];
    const promises = coins.map(async coin => {
      try {
        const response = await fetch(`https://criptoya.com/api/tiendacrypto/${coin}/ars/0.1`);
        const data = await response.json();
        return {
          coin: coin,
          ask: data.ask,
          bid: data.bid,
        };
      } catch (error) {
        return null;
      }
    });

    try {
      const results = await Promise.all(promises);
      this.coinData = results.filter(result => result !== null);
    } catch (error) {
      console.error("Error al obtener los datos de las criptomonedas:", error);
    }
  }
};
</script>

<style scoped>
.welcome-page {  
  display: grid;
  grid-template-columns: 0.4fr 1.6fr;
  grid-template-rows: 0.2fr 1.2fr 0.175fr 2.7fr 0.8fr 0.3fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "header header"
    "banner banner"
    "slider slider"
    "advantages advantages"
    "learn learn"
    "footer footer";
}

a{
  display: flex;
  align-items: center;
}

.header-welcome { 
  grid-area: header;
  background-color: rgb(224, 224, 224);
  display: flex;
  padding: 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
	align-items: center;
	justify-content: space-between;
	right: 0;
  box-shadow: 0px 2px rgba(0, 0, 0, 0.25);
}

.login-btn{
  background: rgba(247, 147, 26, 0.69); 
  border-radius: 26px; 
  border: none; 
  margin: 0.7rem; 
  padding: 0.6rem;
  font-size: 18px; 
  font-weight: 500; 
  text-decoration: none;
}
  
.banner { 
  grid-area: banner;
  display: grid; 
  grid-auto-rows: 1fr; 
  grid-template-columns: 1.2fr 0.4fr; 
  grid-template-rows: 0.3fr 0.3fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "banner-title banner-img"
    "banner-p banner-img"; 
  font-weight: 500;
  font-size: 20px;
  background: linear-gradient(283deg, rgba(255, 122.40, 0, 0.37) 0%,
    rgba(0, 10.20, 255, 0.09) 100%,
    rgba(15.96, 3.87, 154.91, 0) 100%);
}

.banner-title { 
  grid-area: banner-title;
  padding: 10rem 0rem 0rem 6rem; 
  font-weight: 500;
  font-size: 40px;
}
.banner-p { 
  grid-area: banner-p;
  padding: 0rem 0rem 0rem 6rem;  
  width: 57vw; 
  letter-spacing: 1.10px;
}
.banner-img { 
  grid-area: banner-img;
  padding-top: 1rem;
}
    
.slider { 
  grid-area: slider; 
  background: #FFCEA1; 
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden; 
}

.slider .slider-track{
  display: flex;
  justify-content: space-between;
  animation: scroll 50s linear infinite;
  -webkit-animation: scroll 50s linear infinite;
}

.slider span{
  font-weight: 500;
}

.slider p{
  font-weight: 700;
  padding: 0.8rem;
} 

.slider h4{
  margin: 0 1rem;
}

.crypto{ 
  display: flex;
  justify-content: center; 
  align-items: center;
  margin: 0rem 3rem;
}

@keyframes scroll{
  0%{
    -webkit-transform: translateX(80%);
    transform: translateX(80%);
  }
  100%{
    -webkit-transform: translateX(-170%);
    transform: translateX(-170%);
  }
}

.advantages { 
  grid-area: advantages;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 0.1fr 0.1fr 0.1fr;
  grid-auto-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "adventages-title"
    "adventage-1"
    "adventage-2"
    "adventage-3";
  justify-items: center;
}

.advantages h4{
  font-weight: 600;
  font-size: 25px;
  display: grid;
  align-items: end;
}

.advantages p{
  font-weight: 400;
  font-size: 20px;
}

.advantages img{
  width: 20rem;
}

.advantages-title { 
  grid-area: adventages-title;
  text-align: center; 
  color: #00146B; 
  font-size: 40px; 
  padding-top: 4rem;
}
  
.adventage-1 {  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "photo-1 title-1 title-1"
    "photo-1 text-1 text-1"
    "photo-1 text-1 text-1";
  grid-area: adventage-1;
}
  
.photo-1 { 
  grid-area: photo-1;
}
  
.title-1 { 
  grid-area: title-1;
}
  
.text-1 { grid-area: text-1; }
  
.adventage-2 {  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "title-2 title-2 photo-2"
    "text-2 text-2 photo-2"
    "text-2 text-2 photo-2";
  grid-area: adventage-2;
  justify-items: end;
}
  
.photo-2 { 
  grid-area: photo-2;
}
  
.title-2 { 
  grid-area: title-2;
}
  
.text-2 {
  grid-area: text-2;
  text-align: end; 
}
  
.adventage-3 {  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "photo-3 title-3 title-3"
    "photo-3 text-3 text-3"
    "photo-3 text-3 text-3";
  grid-area: adventage-3;
}
  
.photo-3 { 
  grid-area: photo-3; 
}
  
.text-3 { grid-area: text-3; }
  
.title-3 { 
  grid-area: title-3;
}
  
hr {
  border: 0.1px solid #000000;
  width: 100%; 
}
  
.learn { 
  grid-area: learn;
  text-align: center;
  font-weight: 400;
  padding: 2rem 12rem 5rem 12rem;
  font-size: 20px;
  word-break: break-word;
}

.learn-title{
  font-size: 35px;
  padding: 1.3rem 0rem;
}

.footer-welcome { 
  grid-area: footer;
  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;
  background-color: rgb(212, 211, 211);
  font-size: 18px;  
  font-weight: 400;
  padding: 2rem;
}

#logos-container{
  display: flex;
  justify-content: center;
}

.logos-footer{
  width: 30px; 
  margin-left: 10px;
}
</style>