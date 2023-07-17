<template>
    <div>
        <div class="container">
            <div class="selects">
                <div id="select-venta">
                    <p>Moneda a vender:</p>
                    <select v-model="monedaVenta" @change="fetchData">
                        <option value="bnb">Binance Coin</option>
                        <option value="btc">Bitcoin</option>
                        <option value="busd">Binance USD</option>
                        <option value="dai">DAI</option>
                        <option value="eth">Ethereum</option>
                        <option value="matic">MATIC</option>
                        <option value="sol">Solana</option>
                        <option value="usdt">Tether</option>
                        <option value="usdc">USD Coin</option>
                    </select>
                </div>
                
                <div id="select-pago">
                    <p>Moneda de pago:</p>
                    <select v-model="monedaPago" @change="fetchData">
                        <option value="ars">$ARS</option>
                        <option value="usd">US$</option>
                    </select>
                </div>
            </div>
            <div v-if="loading">Cargando...</div>
            <div class="calculator" v-else>
                <div class="converter">
                    <p>Monto a vender de {{ monedaVenta.toUpperCase() }}:</p>
                    <input type="number" v-model="valorVenta" @input="convertirMonedaVenta" />
                    <p :style="'margin-top: 2rem'">Equivale a {{ monedaPago.toUpperCase() }}:</p>
                    <input type="number" v-model="valorPago" @input="convertirMonedaPago"/>
                </div>
                <div class="bill">
                    <h3>Resumen de venta</h3>
                    <div class="details">
                      <p>Valor en {{ monedaPago.toUpperCase() }} :</p>
                      <p>{{ 1.00 }}</p>
                    </div>
                    <div class="details">
                      <p>Equivalente en {{ (monedaVenta.toUpperCase()) }} :</p>
                      <p v-if="data">{{ data.bid }}</p>
                    </div>
                    <div class="details">
                      <p>Venta de {{ monedaVenta.toUpperCase() }} :</p>
                      <p>{{ valorVenta }}</p>
                    </div>
                    <div class="details">
                      <p>Equivalente en ${{ monedaPago.toUpperCase() }} sin comisiones :</p>
                      <p>{{ (valorVenta * data.bid) }}</p>
                    </div>
                    <hr>
                    <div class="details">
                      <p>Total a recibir: (comisiones incluídas)</p>
                      <p>{{ (valorVenta * data.totalBid) }}</p>
                    </div>

                    <button type="submit" @click="showConfirmation = true">Confirmar venta</button>
                </div>
            </div>
            <div v-if="showConfirmation">
                <div class="confirmation-form">
                    <input type="text" v-model="username" placeholder="Nombre de usuario" />
                    <input type="password" v-model="password" placeholder="Contraseña" />
                    <button @click="validateAndConfirm">Confirmar venta</button>
                </div>
            </div>
      </div>
    </div>
  </template>
  
  <script>
import { ref } from 'vue';

  export default {
    data() {
      return {
        monedaVenta: 'btc',
        monedaPago: 'ars',
        data: null,
        loading: true,
        valorVenta: ref(''),
        valorPago: ref(''),
        showConfirmation: false,
        username: '',
        password: '',
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        const URL = `https://criptoya.com/api/tiendacrypto/${this.monedaVenta}/${this.monedaPago}/0.1`
        fetch(URL)
          .then(response => response.json())
          .then(data => {
            this.loading = false;
            this.data = data;
          })
          .catch((error) => console.error(error));
      },
      convertirMonedaVenta() {
        this.valorPago = this.valorVenta * this.data.bid;
      },
      convertirMonedaPago() {
        this.valorVenta = this.valorPago / this.data.bid;
      },
      validateAndConfirm() {
        const storedId = localStorage.getItem('id');
        const storedPassword = localStorage.getItem('password');

        // Comprobar si los campos coinciden con los almacenados en el localStorage
        if (this.username === storedId && this.password === storedPassword) {
            // Si la validación es correcta, realizar la compra e enviar la información al servidor para procesar la compra.

            // Después de confirmar la compra, restablecer los valores predeterminados
            this.monedaVenta = 'btc';
            this.monedaPago = 'ars';
            this.valorVenta = '';
            this.valorPago = '';
            this.showConfirmation = false;
            this.username =  '',
            this.password = '',

            alert('Su venta fue ejecutada con éxito!!!');

        } else {
            alert('Credenciales incorrectas. Inténtalo de nuevo.');
        }
      },
    },
  };
  </script>
  
  <style scoped>

.container {  display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 1.5fr;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
    "selects"
    "calculator";
  }

.container select{
  background: linear-gradient(91deg, rgba(0, 10.20, 255, 0.28) 0%, rgba(255, 123, 0, 0.281) 100%);
  border-radius: 12px;
  padding: 0.5rem 1.3rem;
  border: none;
}

.container select:focus{
  outline: none;
}


.container input{
  background: #FFFFFF;
  border-radius: 12px;
  border: none;
  padding: 0.5rem;
}

.container input:focus{
  outline: none;
}

  .selects { 
    grid-area: selects;
    display: flex;
    justify-content: space-around;
 }

  .calculator {  display: grid;
    grid-template-columns: 0.5fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "converter bill"
      "converter bill"
      "converter bill";
    grid-area: calculator;
    background: linear-gradient(180deg, rgba(0, 10.20, 255, 0.28) 0%, rgba(255, 123, 0, 0.281) 100%);
    border-radius: 12px;
    padding: 1rem;
    margin: 1rem 4rem 0rem 0rem;
  }

  .converter { 
    grid-area: converter;
    display: grid;
    align-items: center;
    justify-content: center;
    align-content: center;
  }

  .bill { 
    grid-area: bill;
    background: #FFF;
    border-radius: 12px;
    padding: 1rem;
    display: grid;
    align-content: center;
  }

  .bill button{
    margin: auto;
    background: rgba(0, 10.20, 255, 0.27); 
    border-radius: 12px;
    border: none;
    padding: 0.5rem 1rem;
    font-weight: 700;
  }

 .details{
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 1rem;
 }
  </style>
  