<template>
  <div class="vertical-menu">
    <div class="menu-header">
      <img src="./icons/logo-cryptosafe.svg" alt="Logo CryptoSaFe" class="menu-logo" title="CryptoSaFe"/>
      <p class="titles logo-crypto">Crypto</p><p class="titles logo-safe">SaFe</p>
    </div>
    <ul>
      <li :class="{ active: activeOption === 'inicio' }">
        <img src="./icons/home-icon.svg" alt="Icono de inicio" title="Inicio">
        <RouterLink to="/home" @click="setActiveOption('inicio')">Inicio</RouterLink>
      </li>
      <li :class="{ active: activeOption === 'compras' }">
        <img src="./icons/purchase-bag-icon.svg" alt="Icono de compras" title="Compras">
        <RouterLink to="/purchase" @click="setActiveOption('compras')">Compras</RouterLink>
      </li>
      <li :class="{ active: activeOption === 'ventas' }">
        <img src="./icons/tag-icon.svg" alt="Icono de ventas" title="Ventas">
        <RouterLink to="/sales" @click="setActiveOption('ventas')">Ventas</RouterLink>
      </li>
      <li :class="{ active: activeOption === 'movimientos' }">
        <img src="./icons/movements-icon.svg" alt="Icono de intercambio" title="Movimientos">
        <RouterLink to="/movements" @click="setActiveOption('movimientos')">Movimientos</RouterLink>
      </li>
      <li :class="{ active: activeOption === 'balance' }">
        <img src="./icons/chart-icon.svg" alt="Icono de estadísticas" title="Balance">
        <RouterLink to="/balance" @click="setActiveOption('balance')">Balance</RouterLink>
      </li>
      <li :class="{ active: activeOption === 'aprender' }">
        <img src="./icons/book-icon.svg" alt="Icono de libro" title="Aprender">
        <RouterLink to="/learn" @click="setActiveOption('aprender')">Aprender</RouterLink>
      </li>
      <li :class="{ active: activeOption === 'salir' } ">
        <RouterLink to="/" @click="clearActiveOption()" :style="'padding-right:10px'">Salir</RouterLink>
        <img src="./icons/left-icon.svg" alt="left icon" title="Salir">
      </li>
    </ul>
    <div class="menu-footer">
      <p class="username">{{ username }}</p>
      <img src="./icons/user-icon.svg" alt="user icon">
    </div>
  </div>
</template>

<script>
import { useActiveOptionStore } from '../stores/menuBar.js';
import { useAuthStore } from '../stores/login.js';

export default {
  setup() {
    const activeOptionStore = useActiveOptionStore();
    const activeOption = activeOptionStore.activeOption;
    const setActiveOption = activeOptionStore.setActiveOption;
    const clearActiveOption = activeOptionStore.clearActiveOption;
    const authStore = useAuthStore();

    return {
      activeOption,
      setActiveOption,
      clearActiveOption,
      username: authStore.id, 
    };
  },
};
</script>

<style>

li{
  display: flex;
  align-items: center;
}

.vertical-menu li img{
  margin: 0rem 2rem 0rem 1rem;
}

.menu-header{
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
  width: 260px;
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

.vertical-menu li:last-child img {
  margin: 0rem;
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