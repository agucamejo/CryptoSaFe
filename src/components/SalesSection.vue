<template>
  <div class="purchase-sales-main">
    <div class="selects">
      <div id="select-venta">
        <p>Moneda a vender:</p>
        <select v-model="saleCoin" @change="fetchExchangeData">
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
                
      <div id="select-cobro">
        <p>Moneda de cobro:</p>
        <select v-model="paymentCoin" @change="fetchExchangeData">
          <option value="ars">$ARS</option>
          <!-- <option value="usd">US$</option> -->
        </select>
      </div>
    </div>

    <div v-if="loading">Cargando...</div>
    <div class="calculator" v-else>
      <div class="converter">
        <p>Monto a vender de {{ saleCoin.toUpperCase() }}:</p>
        <input type="number" v-model="saleValue" @input="convertSaleCoin" />
        <p :style="'margin-top: 2rem'">Equivale a {{ paymentCoin.toUpperCase() }}:</p>
        <input type="number" v-model="paymentValue" @input="convertPaymentCoin"/>
      </div>
      <div class="bill">
        <h3>Resumen de venta</h3>
        <div class="details">
          <p>Valor en {{ paymentCoin.toUpperCase() }} :</p>
          <p><b>$</b> 1,00</p>
        </div>
        <div class="details">
          <p>Equivalente en {{ (saleCoin.toUpperCase()) }} :</p>
          <p v-if="data"><b>$</b> {{ formattedNumber(data.bid) }}</p>
        </div>
        <div class="details">
          <p>Venta de {{ saleCoin.toUpperCase() }} :</p>
          <p><b>$</b> {{ formattedNumber(saleValue) }}</p>
        </div>
        <div class="details">
          <p>Equivalente en ${{ paymentCoin.toUpperCase() }} sin comisiones :</p>
          <p><b>$</b> {{ formattedNumber((saleValue * data.bid)) }}</p>
        </div>
        <hr>
        <div class="details">
          <p>Total a recibir: (comisiones incluídas)</p>
          <p><b>$</b> {{ formattedNumber((saleValue * data.totalBid)) }}</p>
        </div>
        <button type="submit" @click="showConfirmation = true">Confirmar venta</button>
      </div>
    </div>

    <div v-if="showConfirmation" class="confirmation-overlay">
      <div class="confirmation-form">
        <button class="close" @click="showConfirmation = false">&times;</button>
        <input type="text" v-model="username" placeholder="ID de usuario" />
        <input type="password" v-model="password" placeholder="Contraseña" />
        <button @click="validateAndConfirm" class="confirmation-button">Finalizar venta</button>
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
import { postTransaction, getTransactionsByUserId } from '../services/apiClient';
import { sendFormattedDate } from './methods/correctDate';
import { formattedNumber } from './methods/correctNumber';

export default {
  data() {
    return {
      transactions: [],
      userId: localStorage.getItem('id'),
      totalARS: 0,
      saleCoin: 'btc',
      paymentCoin: 'ars',
      data: null,
      loading: true,
      saleValue: ref(''),
      paymentValue: ref(''),
      showConfirmation: false,
      username: '',
      password: '',
      showModal: false,
      modalMessage: '',
      formattedNumber: formattedNumber,
      groupedTransactions: {},
    };
  },
  async mounted() {
    await this.fetchExchangeData();
    await this.fetchTransactionHistory();
  },
  methods: {
    async fetchExchangeData() {
      try {
        const response = await fetch(`https://criptoya.com/api/tiendacrypto/${this.saleCoin}/${this.paymentCoin}/0.1`);
        const data = await response.json();
        this.loading = false;
        this.data = data;
      } catch (error) {
        console.error(error);
      }
    },
    convertSaleCoin() {
      this.paymentValue = this.saleValue * this.data.bid;
    },
    convertPaymentCoin() {
      this.saleValue = this.paymentValue / this.data.bid;
    },
    async validateAndConfirm() {
      const storedId = localStorage.getItem('id');
      const storedPassword = localStorage.getItem('password');
      const currentDate = new Date();
      const formattedDate = sendFormattedDate(currentDate);

      if (this.username.trim() === storedId && this.password.trim() === storedPassword) {
        
        if (this.saleValue <= 0 || this.paymentValue <= 0) {
          this.modalMessage = 'El monto y el valor deben ser mayores a 0.';
          this.showModal = true;
          return;
        }

        const userCryptoBalance = this.groupedTransactions[this.saleCoin];
        if (!userCryptoBalance) {
          this.modalMessage = 'No tienes fondos de esta criptomoneda para realizar esta venta.';
          this.showModal = true;
          return;
        }
        if (this.saleValue > userCryptoBalance.totalCrypto) {
          this.modalMessage = 'No tienes suficientes fondos de esta criptomoneda para realizar esta venta.';
          this.showModal = true;
          return;
        }

        const transactionData = {
          user_id: this.username,
          action: 'sales',
          crypto_code: this.saleCoin,
          crypto_amount: this.saleValue.toString(),
          money: this.paymentValue.toString(),
          datetime: formattedDate,
        };

        try {
          await this.sendTransactionData(transactionData);
        } catch (error) {
          console.error(error);
        }
      } 
      else {
        this.modalMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        this.showModal = true;
      }
    },

    async sendTransactionData(transactionData) {
      try {
        await postTransaction(transactionData);
        this.saleCoin = 'btc';
        this.paymentCoin = 'ars';
        this.saleValue = '';
        this.paymentValue = '';
        this.showConfirmation = false;
        this.username = '';
        this.password = '';

        this.modalMessage = 'Su venta fue ejecutada con éxito!!!';
        this.showModal = true;
      } catch (error) {
        this.modalMessage = 'Ha ocurrido un error al procesar la venta. Por favor, inténtelo de nuevo más tarde.';
        this.showModal = true;
      }
    },

    async fetchTransactionHistory() {
      try {
        const response = await getTransactionsByUserId(this.userId);
        this.groupedTransactions = {};
        response.data.forEach((transaction) => {
          const { crypto_code, action, crypto_amount } = transaction;
          if (action === 'purchase') {
            if (!this.groupedTransactions[crypto_code]) {
              this.groupedTransactions[crypto_code] = {
                totalCrypto: parseFloat(crypto_amount),
              };
            } else {
              this.groupedTransactions[crypto_code].totalCrypto += parseFloat(crypto_amount);
            }
          } else if (action === 'sales') {
            if (!this.groupedTransactions[crypto_code]) {
              this.groupedTransactions[crypto_code] = {
                totalCrypto: -parseFloat(crypto_amount),
              };
            } else {
              this.groupedTransactions[crypto_code].totalCrypto -= parseFloat(crypto_amount);
            }
          }
        });
  
        this.transactions = Object.keys(this.groupedTransactions).map((crypto_code) => ({
          crypto_code,
          crypto_amount: this.groupedTransactions[crypto_code].totalCrypto,
        }));
  
        this.transactions = this.transactions.filter((transaction) => transaction.crypto_amount > 0);
      } catch (error) {
        this.modalMessage = 'Ha ocurrido un error al cargar el historial de transacciones.';
        this.showModal = true;
      }
    },
  },
};
</script>