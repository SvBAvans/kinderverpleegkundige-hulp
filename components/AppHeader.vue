<script setup lang="ts">
const menuVisible = ref(false);
const { signOut } = useAuth();

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const logout = () => {
  signOut();
  toggleMenu();
};
</script>

<template>
  <div class="menu-container">
    <div class="header d-flex justify-content-start align-items-center px-3 py-2">
      <div class="d-flex align-items-center justify-content-center" @click="toggleMenu">
        <Icon name="charm:menu-hamburger" size="50px" />
      </div>
    </div>

    <transition name="slide">
      <div v-if="menuVisible" class="fullscreen-menu">
        <ul class="menu-list px-4">
          <li class="menu-item py-3">Overzicht kamers</li>
          <li class="menu-item py-3">Overzicht dienst</li>
          <li class="menu-item py-3">Settings</li>
          <li class="menu-item py-3">Hulp</li>
        </ul>

        <div class="logout-section">
          <button class="btn-logout" @click="logout">Logout</button>
        </div>

        <button class="btn-close-menu" @click="toggleMenu" aria-label="Close">&times;</button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.menu-container {
  width: 100%;
  /* height: 100vh; */
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.header {
  cursor: pointer;
}

.icon-circle {
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullscreen-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
  color: white;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.menu-item {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 15px;
  color: white;
  cursor: pointer;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.logout-section {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.btn-logout {
  background-color: #e74c3c;
  border: none;
  color: white;
  padding: 12px 24px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
}

.btn-logout:hover {
  background-color: #c0392b;
}

.btn-outline-light {
  border: 1px solid white;
  color: white;
}

.btn-outline-light:hover {
  background-color: white;
  color: #2c3e50;
}

.btn-close-menu {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
}

.btn-close-menu:hover {
  color: rgba(255, 255, 255, 0.7);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from {
  transform: translateY(-100%);
}
.slide-leave-to {
  transform: translateY(-100%);
}
</style>
