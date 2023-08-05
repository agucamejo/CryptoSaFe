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
            <p class="banner-p">Disfrute de acceso total a las cryptos más populares desde una  plataforma única y optimizada. Ingrese en el mundo de DeFi y aproveche oportunidades financieras revolucionarias.</p>
            <img class="banner-img" src="../assets/img/save-coins.png" alt="ilustration of cryptos coins"/>
        </div>


        <div class="slider" v-if="coinData.length">
          <div class="slider-track" >
            <div class="slide" v-for="(data, index) in coinData" :key="index">
              <div class="crypto">
                <h4 :class="getRandomColorClass(index)">{{ data.coin }}</h4>
                <p>Venta <span>{{ data.ask }}</span></p>
                <p>Compra <span>{{ data.bid }}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div v-else>Loading...</div>
        
        
        <div class="advantages">
            <h2 class="advanteges-title" style="text-align: center; color: #00146B; font-size: 40px; padding-top: 4rem;">La libertad financiera al alcance de tu mano</h2>
            <div class="adventage-1">
                <img class="photo-1" src="../assets/img/sell-change.png" />
                <h4 class="title-1">Compra y venta de criptomonedas </h4>
                <p class="text-1">Facilita la adquisición y comercialización de <br/>cryptos de manera segura y eficiente.</p>
            </div>
            <div class="adventage-2">
                <img class="photo-2" src="../assets/img/money-bag.png" />
                <h4 class="title-2">Control de tus fondos actuales</h4>
                <p class="text-2">Permite el seguimiento completo, preciso y <br/>en tiempo real de tus financias.</p>
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
                <br/>Para más información, visita la sección <b>Aprender</b>.</p>
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
export default {
  name: "CoinValues",
  data() {
    return {
      coinData: [],
    };
  },
  methods: {
    getRandomColorClass(index) {
      const colors = ['color-red', 'color-blue', 'color-green', 'color-orange', 'color-grey', 'color-purple', 'color-darkgreen', 'color-darkblue', 'color-pink']; // Add more colors as needed
      return colors[index % colors.length]; // Use modulo to loop through the colors
    },
  },
  async created() {
    const fiat = "ARS";
    const vol = 1.0;
    const coins = ["BNB", "BTC", "BUSD", "DAI", "ETH", "MATIC", "SOL", "USDC", "USDT"];

    for (const coin of coins) {
      const endpoint = `https://criptoya.com/api/tiendacrypto/${coin}/${fiat}/${vol}`;
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        this.coinData.push({
          coin: coin,
          ask: data.ask,
          bid: data.bid,
        });
      } catch (error) {
        console.error(`Error fetching data for ${coin}:`, error);
      }
    }
  },
};
</script>



<style scoped>
.color-red {
  color: red;
}

.color-blue {
  color: blue;
}

.color-green {
  color: green;
}

.color-orange {
  color: orange;
}

.color-purple {
  color: purple;
}

.color-grey {
  color: #47423E;
}

.color-darkblue {
  color: #422DB8;
}

.color-pink {
  color: #FF0066;
}
.color-darkgreen {
  color: #08726e;
}
.container {  display: grid;
    grid-template-columns: 0.4fr 1.6fr;
    grid-template-rows: 0.2fr 1.2fr 0.175fr 2.7fr 0.8fr 0.3fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "logo input"
      "banner banner"
      "slider slider"
      "advantages advantages"
      "cta-learn cta-learn"
      "footer footer";
  }
  
  .logo { 
    grid-area: logo;
    background-color: rgb(224, 224, 224);
    display: flex;
    padding: 0.5rem;
    box-shadow: 0px 2px rgba(0, 0, 0, 0.25)
 }
  
  .input { 
    display: flex;
    grid-area: input;
    background-color: rgb(224, 224, 224);
    justify-content: flex-end;
    padding: 0.5rem;
    box-shadow: 0px 2px rgba(0, 0, 0, 0.25)
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
    background: linear-gradient(283deg, rgba(255, 122.40, 0, 0.37) 0%, rgba(0, 10.20, 255, 0.09) 100%, rgba(15.96, 3.87, 154.91, 0) 100%);
 }

    .banner-title { 
        grid-area: banner-title;
        padding: 10rem 0rem 0rem 6rem; 
        font-weight: 500;
    }
    .banner-p { 
        grid-area: banner-p;
        padding: 0rem 0rem 0rem 6rem;  
        width: 57vw; 
        letter-spacing: 1.10px;
    }
    .banner-img { 
      grid-area: banner-img;
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
  }

  .advantages p{
    font-weight: 400;
    font-size: 20px;
  }

  .adventages-title { grid-area: adventages-title; }
  
  .adventage-1 {  display: grid;
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
    width: 20rem; 
  }
  
  .title-1 { 
    grid-area: title-1;
    display: grid;
    align-items: end;
   }
  
  .text-1 { grid-area: text-1; }
  
  .adventage-2 {  display: grid;
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
    width: 20rem; 
  }
  
  .title-2 { 
    grid-area: title-2;
    display: grid;
    align-items: end;
  }
  
  .text-2 {
    grid-area: text-2;
    text-align: end; 
  }
  
  .adventage-3 {  display: grid;
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
    width: 20rem;
  }
  
  .text-3 { grid-area: text-3; }
  
  .title-3 { 
    grid-area: title-3;
    display: grid;
    align-items: end;
  }
  
  hr {
    border: 0.1px solid #000000;
    width: 100%; 
  }
  
  .cta-learn { 
    grid-area: cta-learn;
    text-align: center;
    font-weight: 400;
    padding: 2rem 12rem 5rem 12rem;
    font-size: 20px;
    word-break: break-word;
 }

.footer { 
    grid-area: footer;
    display: grid;
    justify-content: center;
    align-items: center;
    justify-items: center;
    background-color: rgb(212, 211, 211);
    font-size: 18px;  
    font-weight: 400;
    padding: 1rem;
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