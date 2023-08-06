<template>
  <div>
    <h2>Historial de Transacciones</h2>
    <table v-if="transactions.length > 0">
      <thead>
        <tr>
          <th>Fecha y Hora</th> 
          <th>Acción</th>
          <th>Código de criptomoneda</th>
          <th>Cantidad de criptomoneda</th>
          <th>Monto en Pesos Argentinos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction._id">
          <td>{{ transaction.datetime }}</td>
          <td>{{ transaction.action }}</td>
          <td>{{ transaction.crypto_code.toUpperCase() }}</td>
          <td>{{ transaction.crypto_amount }}</td>
          <td>{{ transaction.money }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>No hay transacciones registradas para este usuario.</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transactions: [],
      userId: localStorage.getItem('id'),
    };
  },
  mounted() {
    this.fetchTransactionHistory();
  },
  methods: {
    fetchTransactionHistory() {
      const apiUrl = `https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id": "${this.userId}"}`;
      const apiKey = '60eb09146661365596af552f';

      axios
        .get(apiUrl, { headers: { 'x-apikey': apiKey } })
        .then((response) => {
          this.transactions = response.data;
        })
        .catch((error) => {
          console.error(error);
          alert('Ha ocurrido un error al cargar el historial de transacciones.');
        });
    },
  },
};
</script>
<style scoped>

table {
  width: 50%;
  border-collapse: collapse;
}

td {
  padding: 3px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  padding: 3px;
  text-align: center;
  border: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}

</style>
