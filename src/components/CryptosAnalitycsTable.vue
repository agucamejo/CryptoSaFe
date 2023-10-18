<template>
  <div>
    <select v-model="selectedCrypto" @change="fetchExchangeData">
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

    <h3>TABLA {{ selectedCrypto.toUpperCase() }}</h3>
    <div v-if="sortedExchangeData.length > 0">
      <table>
        <thead>
          <tr>
            <th>Exchange <button @click="toggleSorting('exchange')"><i :class="[ascendingOrder ? 'arrow-up' : 'arrow-down']"></i></button></th> 
            <th>Precio de compra <button @click="toggleSorting('ask')" class="arrow"><i :class="[ascendingOrder ? 'arrow-up' : 'arrow-down']"></i></button></th>
            <th>Precio final de compra * <button @click="toggleSorting('totalAsk')"><i :class="[ascendingOrder ? 'arrow-up' : 'arrow-down']"></i></button></th>
            <th>Precio de venta <button @click="toggleSorting('bid')" class="arrow"><i :class="[ascendingOrder ? 'arrow-up' : 'arrow-down']"></i></button></th>
            <th>Precio final de venta * <button @click="toggleSorting('totalBid')" class="arrow"><i :class="[ascendingOrder ? 'arrow-up' : 'arrow-down']"></i></button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exchangeInfo in sortedExchangeData" :key="exchangeInfo.exchange">
            <td>{{ exchangeInfo.exchange.toUpperCase() }}</td>
            <td><b>$</b> {{ formattedNumber(exchangeInfo.ask) }}</td>
            <td><b>$</b> {{ formattedNumber(exchangeInfo.totalAsk) }}</td>
            <td><b>$</b> {{ formattedNumber(exchangeInfo.bid) }}</td>
            <td><b>$</b> {{ formattedNumber(exchangeInfo.totalBid) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="sortedExchangeData.length > 0">*Los precios finales incluyen las comisiones de transferencia y trade, pero NO incluyen la comisión de retiro de la criptomoneda del exchange.</p>
    </div>
    <div v-else>Hubo un problema al cargar los datos. Por favor, inténtalo nuevamente más tarde.</div>
  </div>
</template>

<script>
import { formattedNumber } from './methods/correctNumber';

export default {
  data() {
    return {
      exchangeData: [], //Almacenará los datos obtenidos de la API.
      sortedExchangeData: [],//Almacenará los datos de intercambio ordenados.
      selectedCrypto: 'btc',
      sortingColumn: '', //Almacena la columna por la cual se ordena la tabla.
      ascendingOrder: true, //Determina si el orden es ascendente o descendente. 
      formattedNumber: formattedNumber,
    };
  },
  async mounted() {
    await this.fetchExchangeData();
  },
  watch: { //Se activan cuando cambian propiedades en los métodos y reorganizan los datos.
    exchangeData() {
      this.organizeExchangeData();
    },
    sortingColumn() {
      this.organizeExchangeData();
    },
    ascendingOrder() {
      this.organizeExchangeData();
    }
  },
  methods: {
    async fetchExchangeData() {
      try {
        const response = await fetch(`https://criptoya.com/api/${this.selectedCrypto}/ars/0.1`);
        const data = await response.json();

        const exchangeDataArray = [];
        for (const exchange in data) {
          const { ask, totalAsk, bid, totalBid } = data[exchange];
          const exchangeInfo = {
            exchange,
            ask,
            totalAsk,
            bid,
            totalBid
          };
          exchangeDataArray.push(exchangeInfo);
        }
        this.exchangeData = exchangeDataArray;
      } catch (error) {
        console.error(error);
      }
    },
    toggleSorting(column) { //Alterna la dirección de orden si se hace clic en la misma columna, o establece una nueva
      if (this.sortingColumn === column) {
        this.ascendingOrder = !this.ascendingOrder;
      } else {
        this.sortingColumn = column;
        this.ascendingOrder = true;
      }
    },
    organizeExchangeData() { //Ordena los datos en función de la columna y la dirección seleccionada
      const order = this.ascendingOrder ? 1 : -1;
      this.sortedExchangeData = [...this.exchangeData].sort((a, b) => {
        return this.sortingColumn === 'exchange'
          ? a.exchange.localeCompare(b.exchange) * order
          : this.sortingColumn === 'ask'
          ? (a.ask - b.ask) * order
          : this.sortingColumn === 'totalAsk'
          ? (a.totalAsk - b.totalAsk) * order
          : this.sortingColumn === 'bid'
          ? (a.bid - b.bid) * order
          : (a.totalBid - b.totalBid) * order;
      });
    },
  },
};
</script>

<style scoped>
button{
  background: #000000;
  color: #9b9bfc;
  border: none;
  cursor: pointer;
}

p{
  margin-top:1.5rem;
}

h3{
  margin: 1rem 0rem;
}

.arrow-up::after {
  content: '\2191';
}

.arrow-down::after {
  content: '\2193';
}

table {
  width: 85%;
}

td:first-child{
  padding: 0.2rem 0rem 0.2rem 1rem;
  text-align: left;
}
</style>