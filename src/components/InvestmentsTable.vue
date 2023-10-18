<template>
  <div>
    <h3>ANÁLISIS DE INVERSIONES</h3>
    <table v-if="results.length > 0">
      <thead>
        <tr>
          <th>Criptomoneda</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in results" :key="result.crypto_code">
          <td>{{ result.crypto_code.toUpperCase() }}</td>
          <td><b>$</b> {{ formattedNumber(result.result) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>No hay resultados para mostrar.</div>
  </div>
</template>

<script>
import axios from 'axios';
import { getTransactionsByUserId } from '../services/apiClient';
import { formattedNumber } from './methods/correctNumber';

export default {
  data() {
    return {
      userId: localStorage.getItem('id'),
      results: [], //Almacenará los resultados del análisis
      formattedNumber: formattedNumber,
    };
  },
  async mounted() {
    await this.analyzeInvestments();
  },
  methods: {
    async fetchPriceARS(cryptoCode) {
      try {
        const response = await axios.get(`https://criptoya.com/api/tiendacrypto/${cryptoCode}/ars/0.1`);
        
        return response.data.totalBid;
      }catch{
        return null;
      }
    },
    async analyzeInvestments() {
      try {
        const response = await getTransactionsByUserId(this.userId);
        const groupedResults = {};

        for (const transaction of response.data) {
          const { crypto_code, action, money, crypto_amount } = transaction;

          if (!groupedResults[crypto_code]) {
            groupedResults[crypto_code] = {
              totalMoney: 0,
              totalCrypto: 0,
            };
          }

          if (action === 'purchase') {
            groupedResults[crypto_code].totalMoney += parseFloat(money);
            groupedResults[crypto_code].totalCrypto += parseFloat(crypto_amount);
          } else if (action === 'sales') {
            groupedResults[crypto_code].totalMoney -= parseFloat(money);
            groupedResults[crypto_code].totalCrypto -= parseFloat(crypto_amount);
          }
        }

        const analyzedResults = [];

        for (const cryptoCode in groupedResults) {
          const priceARS = await this.fetchPriceARS(cryptoCode);

          if (priceARS !== null) {
            const { totalMoney, totalCrypto } = groupedResults[cryptoCode];
            const currentCryptoValue = totalCrypto * priceARS;
            const result = currentCryptoValue - totalMoney;

            analyzedResults.push({
              crypto_code: cryptoCode,
              result: result,
            });
          }
        }

        this.results = analyzedResults;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
hr{
width: 95%;
}

table {
width: 45%;
}

td:first-child{
padding: 0.2rem 0rem 0.2rem 1rem;
}
</style>