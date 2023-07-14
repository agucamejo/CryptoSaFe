<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Precio en ARS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(registro, index) in registros" :key="index">
            <td>{{ registro.ask }}</td>
            <td>{{ registro.totalAsk }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        registros: []
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        fetch("https://criptoya.com/api/btc/ars/0.1")
          .then(response => response.json())
          .then(data => (this.registros = data))
          .catch(error => (console.error(error))
          );
      }
    }
  };
  </script>

<style scoped>

table {
  width: 75%;
  border-collapse: collapse;
}

th, td {
  padding: 3px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>

  