<template>
  <div>
    <h2>Historial de Transacciones</h2>
    <table v-if="transactions.length > 0">
      <thead>
        <tr>
          <th>Fecha y Hora</th> 
          <th>Transacción</th>
          <th>Código de criptomoneda</th>
          <th>Cantidad de criptomoneda</th>
          <th>Monto en Pesos Argentinos</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction._id">
          <td>{{ transaction.datetime }}</td>
          <td>{{ transaction.action.toUpperCase() }}</td>
          <td>{{ transaction.crypto_code.toUpperCase() }}</td>
          <td>{{ transaction.crypto_amount }}</td>
          <td>{{ transaction.money }}</td>
          <td>
            <img src="./icons/read-icon.svg" alt="read icon" title="Ver detalles" @click="verDetalles(transaction)">
            <img src="./icons/edit-icon.svg" alt="edit icon" title="Editar" @click="editarTransaccion(transaction)">
            <img src="./icons/trash-bin-icon.svg" alt="trash bin icon" title="Eliminar" @click="eliminarTransaccion(transaction)">
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>No hay transacciones registradas para este usuario.</div>
    <div v-if="showDetailsModal" class="modal">
      <div class="modal-content">
        <!-- Contenido de los detalles de la transacción -->
        <p>Fecha y Hora: {{ selectedTransaction.datetime }}</p>
        <p>Acción: {{ selectedTransaction.action }}</p>
        <p>Código de criptomoneda: {{ selectedTransaction.crypto_code.toUpperCase() }}</p>
        <p>Cantidad de criptomoneda: {{ selectedTransaction.crypto_amount }}</p>
        <p>Monto en Pesos Argentinos: {{ selectedTransaction.money }}</p>

        <!-- Opción para salir del cuadro modal -->
        <button @click="closeDetailsModal">Salir</button>
      </div>
    </div>
    <div v-if="editingTransaction">
      <h3>Editar Transacción</h3>
      <form @submit.prevent="guardarEdicion">
        <!-- Campos del formulario para editar la transacción -->
        <!-- Otros campos de edición, por ejemplo: -->
        <label>Transacción:</label>
        <select v-model="editingTransaction.action">
          <option value="purchase">Compra</option>
          <option value="sales">Venta</option>
        </select>

        <label>Criptomoneda:</label>
        <select v-model="editingTransaction.crypto_code">
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



        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transactions: [],
      userId: localStorage.getItem('id'),
      showDetailsModal: false,
      selectedTransaction: null,
      editingTransaction: null,
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
    verDetalles(transaction) {
      // Realizar una solicitud GET para obtener detalles de la transacción
      const apiUrl = `https://laboratorio3-f36a.restdb.io/rest/transactions/${transaction._id}`;
      const apiKey = '60eb09146661365596af552f';

      axios
        .get(apiUrl, { headers: { 'x-apikey': apiKey } })
        .then(() => {
          this.selectedTransaction = transaction;
          this.showDetailsModal = true;
        })
        .catch((error) => {
          console.error(error);
          alert('Ha ocurrido un error al obtener los detalles de la transacción.');
        });
    },

    closeDetailsModal() {
      // Ocultar el cuadro modal y restablecer la transacción seleccionada
      this.showDetailsModal = false;
      this.selectedTransaction = null;
    },

    editarTransaccion(transaction) {
      this.editingTransaction = { ...transaction};
    },

    eliminarTransaccion(transaction) {
      // Realizar una solicitud DELETE para eliminar la transacción
      const apiUrl = `https://laboratorio3-f36a.restdb.io/rest/transactions/${transaction._id}`;
      const apiKey = '60eb09146661365596af552f';

      axios
        .delete(apiUrl, {headers: {'x-apikey': apiKey }})
        .then(() => {
          // Eliminar la transacción de la lista transactions
          const index = this.transactions.findIndex((item) => item._id === transaction._id);
          if (index !== -1) {
            this.transactions.splice(index, 1);
          }
          // Opcional: Puedes mostrar un mensaje de éxito o realizar otras acciones después de eliminar la transacción
          alert('Transacción eliminada exitosamente.');
        })
        .catch((error) => {
          console.error(error);
          alert('Ha ocurrido un error al eliminar la transacción.');
        });
    },
    guardarEdicion() {
      const apiUrl = `https://laboratorio3-f36a.restdb.io/rest/transactions/${this.editingTransaction._id}`;
      const apiKey = '60eb09146661365596af552f';

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const formattedDate = `${month}-${day}-${year}`;

      // Asignar la fecha formateada a la propiedad datetime del objeto editingTransaction
      this.editingTransaction.datetime = formattedDate;

      axios
        .patch(apiUrl, this.editingTransaction, { headers: { 'x-apikey': apiKey } })
        .then(() => {
          
          // Actualizar la lista de transacciones después de guardar los cambios
          this.fetchTransactionHistory();
          
          // Limpiar la transacción en edición después de guardar los cambios
          this.editingTransaction = null;
        })
        .catch((error) => {
          console.error(error);
          alert('Ha ocurrido un error al guardar los cambios.');
        });
    },
  },
};
</script>
<style scoped>

img{
  cursor: pointer;
  margin: 0.1rem;
}

table {
  width: 80%;
  margin: 1rem 0rem 0rem 2rem;
  border-collapse: collapse;
  background-color: #eee9e993;
  box-shadow: -1px 0px 25px 0px #133a4a69;
  border-radius: 12px;
  text-align: center;
}

td {
  padding: 3px;
  border-top: 2px solid #898787;
  border-right: 2px solid #898787;
}


td:last-child{
  border-right:  none;
}


th {
  background-color: #000000;
  padding: 3px;
  color: #f5f5f5;
  border: 2px solid rgb(0, 0, 0);
  border-top: none;
  border-right: 2px solid #898787;
  border-bottom: 2px solid #898787;
}

th:last-child{
  border-radius: 0px 12px 0px 0px;
  border-right: none;
}
th:first-child{
  border-radius: 12px 0px 0px 0px;
  border-left: none;
}
/* tr:hover {
  background-color: #1414148f;
} */

/* Estilos generales */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
</style>