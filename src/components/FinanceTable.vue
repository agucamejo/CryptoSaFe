<template>
  <div>
    <h3>MIS FINANZAS</h3>
    <table v-if="transactions.length > 0">
      <thead>
        <tr>
          <th>Criptomoneda</th> 
          <th>Cantidad</th>
          <th>Dinero en $ARS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction._id">
          <td>{{ transaction.crypto_code.toUpperCase() }}</td>
          <td>{{ formattedNumber(transaction.crypto_amount) }}</td>
          <td><b>$</b> {{ formattedNumber(transaction.money) }}</td>
        </tr>
        <tr>
          <td>TOTAL</td>
          <td>-</td>
          <td><b>$</b> {{ formattedNumber(totalARS) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else>No hay transacciones registradas para este usuario o no posee criptomonedas.</div>

    <div class="chart-container" v-if="transactions.length > 0">
      <hr>
      <DoughnutChart :labels="cryptoLabels" :data="cryptoAmounts" />
    </div>

    <hr>

    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <p>{{ modalMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getTransactionsByUserId } from '../services/apiClient';
import DoughnutChart from './DoughnutChart.vue';
import { formattedNumber } from './methods/correctNumber';

export default {
  components: {
    DoughnutChart, 
  },
  data() {
    return {
      transactions: [],
      userId: localStorage.getItem('id'),
      totalARS: 0,
      showModal: false,
      modalMessage: '',
      formattedNumber: formattedNumber,
    };
  },
  computed: {
    cryptoLabels() {
      return this.transactions.map(transaction => transaction.crypto_code.toUpperCase());
    },
    cryptoAmounts() {
      return this.transactions.map(transaction => transaction.crypto_amount.toFixed(6));
    },
  },
  async mounted() {
    await this.fetchTransactionHistory();
  },
  methods: {
    async fetchTransactionHistory() {
      try {
        const response = await getTransactionsByUserId(this.userId);

        const groupedTransactions = {};
        response.data.forEach((transaction) => {
          const { crypto_code, action, crypto_amount } = transaction;

          if (action === 'purchase') {
            if (!groupedTransactions[crypto_code]) {
              groupedTransactions[crypto_code] = {
                totalCrypto: parseFloat(crypto_amount),
              };
            } else {
              groupedTransactions[crypto_code].totalCrypto += parseFloat(crypto_amount);
            }
          } else if (action === 'sales') {
            if (!groupedTransactions[crypto_code]) {
              groupedTransactions[crypto_code] = {
                totalCrypto: -parseFloat(crypto_amount),
              };
            } else {
              groupedTransactions[crypto_code].totalCrypto -= parseFloat(crypto_amount);
            }
          }
          
        });
        
        this.transactions = Object.keys(groupedTransactions).map((crypto_code) => ({
          crypto_code,
          crypto_amount: groupedTransactions[crypto_code].totalCrypto,
        }));

        for (const transaction of this.transactions) {
          await this.fetchPriceARS(transaction.crypto_code);
        }

        this.transactions = this.transactions.filter((transaction) => transaction.crypto_amount > 0);
        
      } catch (error) {
        this.modalMessage = 'Ha ocurrido un error al cargar el historial de transacciones.';
        this.showModal = true;
      }
    },
    async fetchPriceARS(cryptoCode) { 
      try {
        const response = await axios.get(`https://criptoya.com/api/tiendacrypto/${cryptoCode}/ars/0.1`);
        
        this.transactions.forEach((transaction) => {
          if (transaction.crypto_code === cryptoCode) {
            transaction.money = (transaction.crypto_amount * response.data.totalBid);
            
            this.totalARS = this.transactions.reduce((total, transaction) => {
              return total + parseFloat(transaction.money);
            }, 0);
          }
        });
      } catch (error) {
        this.modalMessage = 'Ha ocurrido un error al obtener el precio en ARS de la criptomoneda.';
        this.showModal = true;
      }
    },
  },
};
</script>

<style scoped>
hr{
  width: 95%;
  margin: 1rem 0rem;
}

table {
  width: 60%;
}

td:first-child{
  padding: 0.2rem 0rem 0.2rem 1rem;
}

tr:last-child{
  background-color: #000000d4;
  border-radius: 0.8rem;
  color: #f5f5f5;
}

tr:last-child:hover{
  background-color: #000000e4;
}
</style>