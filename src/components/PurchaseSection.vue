<template>
  <div class="purchase-sales-main">
    <div class="selects">
      <div id="select-compra">
        <p>Moneda a comprar:</p>
        <select v-model="purchaseCoin" @change="fetchExchangeData">
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
        <select v-model="paymentCoin" @change="fetchExchangeData">
          <option value="ars">$ARS</option>
          <!-- <option value="usd">US$</option> -->
        </select>
      </div>
    </div>

    <div v-if="loading">Cargando...</div>
    <div class="calculator" v-else>
      <div class="converter">
        <p>Monto a comprar de {{ purchaseCoin.toUpperCase() }}:</p>
        <input type="number" v-model="purchaseValue" @input="convertPurchaseCoin"/>
        <p :style="'margin-top: 2rem'">Equivale a {{ paymentCoin.toUpperCase() }}:</p>
        <input type="number" v-model="paymentValue" @input="convertPaymantCoin"/>
      </div>
      <div class="bill">
        <h3>Resumen de compra</h3>
        <div class="details">
          <p>Valor en {{ paymentCoin.toUpperCase() }} :</p>
          <p><b>$</b> 1,00</p>
        </div>
        <div class="details">
          <p>Equivalente en {{ (purchaseCoin.toUpperCase()) }} :</p>
          <p v-if="data"><b>$</b> {{ formattedNumber(data.ask) }}</p>
        </div>
        <div class="details">
          <p>Compra de {{ purchaseCoin.toUpperCase() }} :</p>
          <p><b>$</b> {{ formattedNumber(purchaseValue) }}</p>
        </div>
        <div class="details">
          <p>Equivalente en ${{ paymentCoin.toUpperCase() }} sin comisiones :</p>
          <p><b>$</b> {{ formattedNumber((purchaseValue * data.ask)) }}</p>
        </div>
        <hr>
        <div class="details">
          <p>Total a pagar: (comisiones incluídas)</p>
          <p><b>$</b> {{ formattedNumber((purchaseValue * data.totalAsk)) }}</p>
        </div>

        <button type="submit" @click="showConfirmation = true">Confirmar compra</button>
      </div>
    </div>

    <div v-if="showConfirmation" class="confirmation-overlay">
      <div class="confirmation-form">
        <button class="close" @click="showConfirmation = false">&times;</button>
        <input type="text" v-model="username" placeholder="ID de usuario" />
        <input type="password" v-model="password" placeholder="Contraseña" />
        <button @click="validateAndConfirm" class="confirmation-button">Finalizar compra</button>
      </div>
    </div>

    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <p>{{ modalMessage }}</p>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref } from 'vue';
import { postTransaction } from '../services/apiClient';
import { sendFormattedDate } from './methods/correctDate';
import { formattedNumber } from './methods/correctNumber';

export default {
  data() {
    return {
      purchaseCoin: 'btc',
      paymentCoin: 'ars',
      data: null,
      loading: true,
      purchaseValue: ref(''),
      paymentValue: ref(''),
      showConfirmation: false,
      username: '',
      password: '',
      showModal: false,
      modalMessage: '',
      formattedNumber: formattedNumber,
    };
  },
  async mounted() {
    await this.fetchExchangeData();
  },
  methods: {
    async fetchExchangeData() {
      try {
        const response = await fetch(`https://criptoya.com/api/tiendacrypto/${this.purchaseCoin}/${this.paymentCoin}/0.1`);
        const data = await response.json();
        this.loading = false;
        this.data = data;
      } catch (error) {
        console.error(error);
      }
    },
    convertPurchaseCoin() {
      this.paymentValue = this.purchaseValue * this.data.ask;
    },
    convertPaymantCoin() {
      this.purchaseValue = this.paymentValue / this.data.ask;
    },
    async validateAndConfirm() {
      const storedId = localStorage.getItem('id');
      const storedPassword = localStorage.getItem('password');
      const formattedDate = sendFormattedDate(new Date());

      if (this.username.trim() === storedId && this.password.trim() === storedPassword) {
        if (this.purchaseValue <= 0 || this.paymentValue <= 0) {
          this.modalMessage = 'El monto y el valor deben ser mayores a 0.';
          this.showModal = true;
          return;
        }

        const transactionData = {
          user_id: this.username,
          action: 'purchase',
          crypto_code: this.purchaseCoin,
          crypto_amount: this.purchaseValue.toString(),
          money: this.paymentValue.toString(),
          datetime: formattedDate,
        };

        try {
          await this.sendTransactionData(transactionData);
        } catch (error) {
          console.error(error);
        }
      } else {
        this.modalMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        this.showModal = true;
      }
    },
    async sendTransactionData(transactionData) {
      try {
        await postTransaction(transactionData);
        this.purchaseCoin = 'btc';
        this.paymentCoin = 'ars';
        this.purchaseValue = '';
        this.paymentValue = '';
        this.showConfirmation = false;
        this.username = '';
        this.password = '';

        this.modalMessage = '¡Su compra fue ejecutada con éxito!';
        this.showModal = true;
      } catch (error) {
        this.modalMessage = 'Ha ocurrido un error al procesar la compra. Por favor, inténtelo de nuevo más tarde.';
        this.showModal = true;
      }
    },
  },
};
</script>