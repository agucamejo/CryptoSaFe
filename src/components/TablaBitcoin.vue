<template>
  <div>
    <select v-model="tablaSeleccionada" @change="fetchData">
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
    <h3>Tabla {{ tablaSeleccionada.toUpperCase() }}</h3>
    <table>
      <thead>
        <tr>
          <th>Exchange <button @click="toggleOrden('exchange')"><i :class="[ordenAscendente ? 'arrow-up' : 'arrow-down']"></i></button></th> 
          <th>Precio final de compra <button @click="toggleOrden('totalAsk')"><i :class="[ordenAscendente ? 'arrow-up' : 'arrow-down']"></i></button></th>
          <th>Precio final de venta <button @click="toggleOrden('totalBid')" class="arrow"><i :class="[ordenAscendente ? 'arrow-up' : 'arrow-down']"></i></button></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="registro in registrosOrdenados" :key="registro.exchange">
          <td>{{ registro.exchange.toUpperCase() }}</td>
          <td>{{ registro.totalAsk }}</td>
          <td>{{ registro.totalBid }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registros: [],
      registrosOrdenados: [],
      tablaSeleccionada: 'btc',
      columnaOrdenamiento: '',
      ordenAscendente: true
    };
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    registros() {
      this.ordenarRegistros();
    },
    columnaOrdenamiento() {
      this.ordenarRegistros();
    },
    ordenAscendente() {
      this.ordenarRegistros();
    }
  },
  methods: {
    fetchData() {
      const url = `https://criptoya.com/api/${this.tablaSeleccionada}/ars/0.1`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const registrosArray = [];
          for (const exchange in data) {
            const registro = {
              exchange: exchange,
              ...data[exchange]
            };
            registrosArray.push(registro);
          }
          this.registros = registrosArray;
        })
        .catch(error => console.error(error));
    },
    toggleOrden(columna) {
      if (this.columnaOrdenamiento === columna) {
        this.ordenAscendente = !this.ordenAscendente;
      } else {
        this.columnaOrdenamiento = columna;
        this.ordenAscendente = true;
      }
    },
    ordenarRegistros() {
      const orden = this.ordenAscendente ? 1 : -1;
      this.registrosOrdenados = [...this.registros].sort((a, b) => {
        if (this.columnaOrdenamiento === 'exchange') {
          return a.exchange.localeCompare(b.exchange) * orden;
        } else if (this.columnaOrdenamiento === 'totalAsk') {
          return (a.totalAsk - b.totalAsk) * orden;
        } else if (this.columnaOrdenamiento === 'totalBid') {
          return (a.totalBid - b.totalBid) * orden;
        }
      });
    }
  }
};
</script>

<style scoped>
.arrow-up::after {
  content: '\2191'; /* Código unicode para la flecha hacia arriba */
}

.arrow-down::after {
  content: '\2193'; /* Código unicode para la flecha hacia abajo */
}

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

  