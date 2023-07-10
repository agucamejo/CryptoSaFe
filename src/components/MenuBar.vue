<template>
  <div class="vertical-menu">
    <div class="menu-header">
      <img src="./icons/logo-cryptosafe.svg" alt="Logo CryptoSaFe" class="menu-logo" />
      <p class="titulos" :style="'color:#F7931A'">Crypto</p><p class="titulos" :style="'color:#00146B'">SaFe</p>
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
        <img src="./icons/movements-icon.svg" alt="movements icon">
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
        <img src="./icons/info-icon.svg" alt="info icon">
        <RouterLink to="/help" @click="setActiveOption('ayuda')">Ayuda</RouterLink>
        <img src="./icons/arrow-right.svg" alt="arrow right icon">
      </li>
      <li :class="{ active: activeOption === 'salir' } ">
        <RouterLink to="/" @click="setActiveOption('salir')" :style="'padding-right:10px'">Salir</RouterLink>
        <img src="./icons/left-icon.svg" alt="left icon">
      </li>
    </ul>
    <div class="menu-footer">
      <p class="username">Nombre de Usuario</p>
      <img src="./icons/user-icon.svg" alt="user icon">
    </div>
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

li{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.menu-header{
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0rem 0rem 2rem 0rem;
  border-top-right-radius: 10px;
  text-shadow: rgba(0, 0, 0, 0.25) 0 2px ;
}

.vertical-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #f1f1f1;
  border-radius: 0px 10px 10px 0px;
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
  display: flex;
  justify-content: flex-end;
}

.vertical-menu a {
  text-decoration: none;
  color: #333; 
}

.vertical-menu .active {
  background-color: #ccc;
}

.menu-footer {
  font-weight: 500;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #aeadad;
  background-color: #ffd2e3;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  border-bottom-right-radius: 10px;
  
}

.username {
  font-weight:500;
}
</style>