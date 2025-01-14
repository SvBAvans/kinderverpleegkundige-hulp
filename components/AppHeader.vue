<script setup lang="ts">
const menuVisible = ref(false);
const { signOut } = useAuth();

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const route = useRoute();

const logout = () => {
  signOut();
  toggleMenu();
};

const { data: patients } = await useFetch("/api/patients");
</script>

<template>
  <div class="menu-container pb-3">
    <div class="header d-flex justify-content-between align-items-center px-3 py-2">
      <div class="d-flex align-items-center justify-content-center" @click="toggleMenu">
        <Icon name="charm:menu-hamburger" size="50px" class="menu-icon" />
      </div>

      <h1 class="text-center flex-grow-1 me-5" v-if="route.meta.title">{{ route.meta.title }}</h1>
    </div>

    <transition name="slide">
      <div v-if="menuVisible" class="fullscreen-menu">
        <ul class="menu-list px-4">
          <!-- <li class="menu-item py-3">Overzicht kamers</li> -->
          <!-- <li class="menu-item py-3"><NuxtLink to="/" @click="toggleMenu">Start dienst</NuxtLink></li> -->
          <li class="menu-item py-3"><NuxtLink :to="`/patients/${patients![0].id}`" @click="toggleMenu">Patient Details</NuxtLink></li>
          <li class="menu-item py-3"><NuxtLink :to="`/floormap`" @click="toggleMenu">Floormap</NuxtLink></li>
          <li class="menu-item py-3"><NuxtLink to="/overview" @click="toggleMenu">Overzicht</NuxtLink></li>
          <li class="menu-item py-3"><NuxtLink to="/intake" @click="toggleMenu">Intake</NuxtLink></li>
        </ul>

        <div class="logout-section">
          <button class="btn-logout btn btn-primary" @click="logout">Logout</button>
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
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
  color: white;
  text-align: center;
}

.header {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* Set a fixed height */
  background-color: #2c3e50;
  display: flex;
  align-items: center; /* Vertically center content */
}

.menu-icon {
  color: #ecf0f1;
}

.header .d-flex {
  height: 100%;
}

.header .d-flex .icon {
  font-size: 30px; /* Adjust icon size */
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

.menu-item a {
  text-decoration: none;
  color: white;
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
  border: none;
  color: white;
  padding: 12px 24px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
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
