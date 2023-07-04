<template>
  <div class="vertical-menu">
    <div class="menu-header">
      <img src="./icons/logo-cryptosafe.svg" alt="Logo CryptoSaFe" class="menu-logo" />
      <span :style="'color:#F7931A'">Crypto</span><span :style="'color:#00146B'">SaFe</span>
    </div>
    <ul>
      <li :class="{ active: activeOption === 'inicio' }">
        <img src="./icons/home-icon.svg" alt="home icon">
        <RouterLink to="/home" @click="setActiveOption('inicio')">Inicio</RouterLink>
        <img src="./icons/arrow-right.svg" alt="arrow right icon">
      </li>
      <li :class="{ active: activeOption === 'compras' }">
        <img src="./icons/shopping-bag-icon.svg" alt="shopping bag icon">
        <RouterLink to="/shopping" @click="setActiveOption('compras')">Compras</RouterLink>
        <img src="./icons/arrow-right.svg" alt="arrow right icon">
      </li>
      <li :class="{ active: activeOption === 'ventas' }">
        <img src="./icons/tag-icon.svg" alt="tag icon">
        <RouterLink to="/sells" @click="setActiveOption('ventas')">Ventas</RouterLink>
        <img src="./icons/arrow-right.svg" alt="arrow right icon">
      </li>
      <li :class="{ active: activeOption === 'movimientos' }">
        
        <RouterLink to="/movements" @click="setActiveOption('movimientos')">Movimientos</RouterLink>
        <img src="./icons/arrow-right.svg" alt="arrow right icon">
      </li>
      <li :class="{ active: activeOption === 'balance' }">
        <img src="./icons/chart-icon.svg" alt="chart icon">
        <RouterLink to="/balance" @click="setActiveOption('balance')">Balance</RouterLink>
        <img src="./icons/arrow-right.svg" alt="arrow right icon">
      </li>
      <li :class="{ active: activeOption === 'aprender' }">
        <img src="./icons/book-icon.svg" alt="book icon">
        <RouterLink to="/learn" @click="setActiveOption('aprender')">Aprender</RouterLink>
        <img src="./icons/arrow-right.svg" alt="arrow right icon">
      </li>
      <li :class="{ active: activeOption === 'ayuda' }">
        <RouterLink to="/help" @click="setActiveOption('ayuda')">Ayuda</RouterLink>
        <img src="./icons/arrow-right.svg" alt="arrow right icon">
      </li>
      <li :class="{ active: activeOption === 'salir' }">
        <RouterLink to="/" @click="setActiveOption('salir')">Salir</RouterLink>
        <img src="./icons/left-icon.svg" alt="left icon">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeOption: 'inicio', // Opción activa por defecto
    };
  },
  methods: {
    setActiveOption(option) {
      this.activeOption = option;
    },
  },
};
</script>

<style>
span{
  font-weight: 700;
  font-size: 1rem;
}
li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.menu-header{
  display: flex;
  align-items: center;
  justify-content: center
}

.vertical-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #f1f1f1;
}

.vertical-menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.vertical-menu li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.vertical-menu li:last-child {
  border-bottom: none;
}

.vertical-menu a {
  text-decoration: none;
  color: #333;
}

.vertical-menu .active {
  background-color: #ccc;
}

.menu-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  border-top: 1px solid #ddd;
  background-color: #f1f1f1;
  text-align: center;
}

.username {
  font-weight: bold;
}
</style>