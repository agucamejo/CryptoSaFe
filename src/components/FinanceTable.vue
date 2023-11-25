<template>
  <div>
    <h3>MIS FINANZAS</h3>
    <div v-if="isLoading"> <AppSpinner v-if="isLoading" /></div>
    <div v-else>
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
  </div>
    <div class="chart-container" v-if="transactions.length > 0">
      <hr>
      <DoughnutChart :labels="cryptoLabels" :data="cryptoAmounts" />
    </div>

    <hr>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
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
      isLoading: false,
      transactions: [],
      userId: localStorage.getItem('id'),
      totalARS: 0,
      formattedNumber: formattedNumber,
    };
  },
  computed: { //Calculan etiquetas y valores para el gráfico.
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
    async fetchTransactionHistory() { //Agrupa y procesa transacciones para calcular total en ARS y actualizar transactions.
      try {
        const response = await getTransactionsByUserId(this.userId);
        this.isLoading = true;

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
        Swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error al cargar el historial de transacciones.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        })  
      }
      finally {
        this.isLoading = false; // Indicar que la carga ha terminado
      }
    },
    async fetchPriceARS(cryptoCode) { //Actualiza los valores de dinero en ARS en base a los precios obtenidos de la API
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
        Swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error al obtener el precio en ARS de la criptomoneda.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        })  
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