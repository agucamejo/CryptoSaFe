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
          <td>{{ formattedNumber(parseFloat(transaction.crypto_amount)) }}</td>
          <td><b>$</b> {{ formattedNumber(parseFloat(transaction.money)) }}</td>
          <td>
            <img src="./icons/read-icon.svg" alt="Icono de lectura" title="Ver detalles" @click="seeDetails(transaction)">
            <img src="./icons/edit-icon.svg" alt="Icono de edición" title="Editar" @click="editTransaction(transaction)">
            <img src="./icons/trash-bin-icon.svg" alt="Icono de eliminar" title="Eliminar" @click="deleteTransaction(transaction)">
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>No hay transacciones registradas para este usuario.</div>
    <div v-if="showDetailsModal" class="modal">
      <div class="modal-content">
        <h4>Ver Transacción</h4>
        <p>Fecha y Hora: {{ selectedTransaction.datetime }}</p>
        <p>Acción: {{ selectedTransaction.action.toUpperCase() }}</p>
        <p>Código de criptomoneda: {{ selectedTransaction.crypto_code.toUpperCase() }}</p>
        <p>Cantidad de criptomoneda: {{ formattedNumber(parseFloat(selectedTransaction.crypto_amount)) }}</p>
        <p>Monto en Pesos Argentinos: <b>$</b> {{ formattedNumber(parseFloat(selectedTransaction.money)) }}</p>

        <button @click="closeModal">Salir</button>
      </div>
    </div>
    
    <div v-if="editingTransaction" class="modal">
      <form @submit.prevent="saveEditedData" class="modal-content">
        <h4>Editar Transacción</h4>
        <label>Transacción:</label>
        <select v-model="editingTransaction.action">
          <option value="purchase">Compra</option>
          <option value="sales">Venta</option>
        </select> <br>

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
        </select><br>

        <label>Monto de criptomoneda:</label>
        <input type="number" v-model="editingTransaction.crypto_amount" step="0.01"/><br>

        <label>Valor en pesos:</label>
        <input type="number" v-model="editingTransaction.money" step="0.01"/>
        <button type="submit">Guardar Cambios</button>
        <button @click="closeModal">Salir</button>
      </form>
    </div>

    <div v-if="showConfirmationModal" class="modal">
      <div class="modal-content">
        <p>¿Estás seguro de que deseas eliminar esta transacción?</p>
        <button @click="confirmDelete">Eliminar</button>
        <button @click="showConfirmationModal = false">Cancelar</button>
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
import { getTransactionsByUserId, getTransactionDetails, deleteTransaction, updateTransaction } from '@/services/apiClient';
import { sendFormattedDate, getFormattedDate } from './methods/correctDate';
import { formattedNumber } from './methods/correctNumber';

export default {
  data() {
    return {
      transactions: [],
      userId: localStorage.getItem('id'),
      showDetailsModal: false,
      selectedTransaction: null,
      editingTransaction: null,
      showModal: false,
      showConfirmationModal: false,
      modalMessage: '',
      formattedNumber: formattedNumber,
    };
  },
  async mounted() {
    await this.fetchTransactionHistory();
  },
  methods: {
    async fetchTransactionHistory() {
      try {
        const response = await getTransactionsByUserId(this.userId);
        for (const obj of response.data) {
          const correctDateTime = getFormattedDate(new Date(obj.datetime));
          obj.datetime = correctDateTime;
        }
        this.transactions = response.data;
      } catch (error) {
        this.modalMessage = 'Ha ocurrido un error al cargar el historial de transacciones. Intentelo de nuevo más tarde';
        this.showModal = true;
      }
    },
    async seeDetails(transaction) {
      try {
        const response = await getTransactionDetails(transaction._id);
        this.selectedTransaction = response.data;
        const formattedDate = getFormattedDate(new Date(this.selectedTransaction.datetime));
        this.selectedTransaction.datetime = formattedDate;
        this.showDetailsModal = true;
      } catch (error) {
        this.modalMessage = 'Ha ocurrido un error al obtener los detalles de la transacción.';
        this.showModal = true;
      }
    },
    closeModal() {
      this.showDetailsModal = false;
      this.editingTransaction = null;
      this.selectedTransaction = null;
    },

    editTransaction(transaction) {
      this.editingTransaction = { ...transaction};
    },

    deleteTransaction(transaction) {
      this.showConfirmationModal = true;
      this.selectedTransactionToDelete = transaction;
    },
    async confirmDelete() {
      try {
        await deleteTransaction(this.selectedTransactionToDelete._id);
        const index = this.transactions.findIndex((item) => item._id === this.selectedTransactionToDelete._id);
        if (index !== -1) {
          this.transactions.splice(index, 1);
        }
        
        this.modalMessage = 'Transacción eliminada con éxito.';
        this.showModal = true;

        this.selectedTransactionToDelete = null;
        this.showConfirmationModal = false;
      } catch (error) {
        this.modalMessage = 'Ha ocurrido un error al eliminar la transacción.';
        this.showModal = true;

        this.selectedTransactionToDelete = null;
        this.showConfirmationModal = false;
      }
    },
    async saveEditedData() {
      try {
        const formattedDate = sendFormattedDate(new Date());
        this.editingTransaction.datetime = formattedDate;

        const updatedData = {
          action: this.editingTransaction.action,
          crypto_code: this.editingTransaction.crypto_code,
          crypto_amount: this.editingTransaction.crypto_amount,
          money: this.editingTransaction.money,
          datetime: this.editingTransaction.datetime,
          user_id: this.userId,
        };

        await updateTransaction(this.editingTransaction._id, updatedData);
        await this.fetchTransactionHistory();
        this.modalMessage = 'Los cambios se guardaron correctamente.';
        this.showModal = true;
        this.editingTransaction = null;
      } catch (error) {
        this.modalMessage = 'Ha ocurrido un error al guardar los cambios.';
        this.showModal = true;
      }
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
  width: 90%;
  margin-left: 1.5rem;
}

input{
  border-radius: 12px;
  border: 0.1rem solid #8f89f6;
  margin: 0.2rem 0.6rem;
  padding: 0.5rem;
}

select{
  margin: 0.2rem 0.6rem;
}

button{
  background: rgba(0, 10.20, 255, 0.27); 
  border-radius: 12px;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: 700;
  cursor: pointer;
  margin: 1rem 3.18rem 0rem 3.18rem;
}
</style>