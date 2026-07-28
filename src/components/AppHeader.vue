<template>
  <header>
    <div class="header">
      <div class="container">
        <div class="header_inner">
          <div class="header_logo">Rick and Morty</div>

          <div class="drop" :class="{ active: isOpen }">
            <button class="nav-btn" :class="{ active: isOpen }" @click="toggleMenu"></button>

            <nav class="nav">
              <RouterLink v-for="link in links" :key="link.path" :to="link.path" class="nav_link" @click="closeMenu">
                {{ link.title }}
              </RouterLink>
              <button v-if="isAuthenticated" class="logout" @click="handleLogout">Logout</button>

            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { logout, isAuthenticated } = useAuth()

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
const isOpen = ref(false);

const links = [
  { title: 'Characters', path: '/characters' },
  { title: 'Locations', path: '/locations' },
  { title: 'Episodes', path: '/episodes' },
];

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
  document.body.classList.remove('menu-open');
}


function handleEsc(e) {
  if (e.key === 'Escape') closeMenu();
}

onMounted(() => {
  document.addEventListener('keydown', handleEsc);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEsc);
});


</script>
<style>
.header {
  width: 100%;
  background-color: #203040;
  position: sticky;

  display: block;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  min-height: 140px;
}

.header_logo {
  font-size: 42px;
  font-weight: 700;
  color: #fff;
}

.header_inner {
  display: flex;
  justify-content: space-between;
  align-items: anchor-center;
  padding: 50px 0;

}



/*Navigation*/

.nav {
  display: flex;
  align-items: center;
  width: 100%;
  order: 2;
  font-size: 24px;

}

.nav-btn {
  display: none;
}

.nav-btn::before {
  content: "☰";
}

.nav-btn.active::before {
  content: "✕";
}



.nav_link {
  display: block;
  vertical-align: top;
  margin: 0 10px;
  color: white;
  text-decoration: none;
  position: relative;

  transition: color .2s linear;
}

.nav_link:after {
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  margin-top: 5px;

  opacity: 0;

  background-color: #4CAF50;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;

  transition: opacity .2s linear;

}



.nav_link:hover {
  color: #4CAF50;

}

.nav_link:hover:after,
.nav_link.active:after {
  opacity: 1;
}

.nav_link.active {
  color: #4CAF50;

}

.nav_link.router-link-active {
  color: #4CAF50;
}

.nav_link.router-link-active:after {
  opacity: 1;
}

.logout {
  width: 120px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #ccc;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  align-content: center;
  color: #333;
}

.logout:hover {
  background-color: #4CAF50;
  border: none;
  color: white;

}

@media (max-width: 1024px) {
  .header {
    padding: 10px;
  }
}
</style>