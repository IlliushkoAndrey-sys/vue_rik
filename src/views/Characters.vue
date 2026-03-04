<template>
  <div class="container">
    <div class="charactersPlusFinder">
    <h1>Characters</h1>

    <!-- Пошук -->
    <div class="finder-inner">
      <input class="finder-input"
          type="text"
          placeholder="Character Name"
          v-model="searchQuery"
          @input="onSearchInput"
      />
    </div>
    </div>

    <div class="animation-controls">
      <h3>Set animation for modal card</h3>
      <div class="button-group">
        <button
            :class="{ 'active-btn': transitionName === 'fade' }"
            @click="setAnimation('fade')"
        >Opacity</button>

        <button
            :class="{ 'active-btn': transitionName === 'slide-left' }"
            @click="setAnimation('slide-left')"
        >Left</button>

        <button
            :class="{ 'active-btn': transitionName === 'slide-right' }"
            @click="setAnimation('slide-right')"
        >Right</button>

        <button
            :class="{ 'active-btn': transitionName === 'zoom' }"
            @click="setAnimation('zoom')"
        >Zoom</button>
      </div>
    </div>

    <div v-if="loading" class="loader"></div>
    <div v-if="!loading && Array.isArray(characters) && characters.length === 0" class="characters_message">
      Нічого не знайдено
    </div>
    <div class="characters_inner">
      <CharacterCard
          v-for="char in characters"
          :key="char.id"
          :id="char.id"
          :name="char.name"
          :image="char.image"
          :species="char.species"
          :page="currentPage"

      />
    </div>

  </div>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <div v-if="Component" class="modal-overlay">
        <div class="modal-content">
          <component :is="Component" />
        </div>
      </div>
    </transition>
  </router-view>
  <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="changePage"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useStore } from 'vuex'
import CharacterCard from '../components/CharacterCard.vue'
import Pagination from '../components/Pagination.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const currentPage = ref(Number(route.query.page) ||1)
const searchQuery = ref(route.query.search ||'')

const characters = computed(() => store.getters['characters/getCharactersArray'])
const loading = computed(() => store.getters['characters/getIsLoading'])
const totalPages = computed(() => store.getters['characters/getTotalPages'])

const transitionName = ref('fade')

function setAnimation(type) {
  transitionName.value = type
}


// Пошуковий запит з debounce
let debounceTimer = null

function onSearchInput() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    currentPage.value = 1

    router.push({
      query: {
        page: 1,
        ...(searchQuery.value ? { search: searchQuery.value } : {})
      }
    })

    store.dispatch('characters/fetchCharacters', {
      page: 1,
      search: searchQuery.value
    })
  }, 500)
}

function changePage(page) {
  currentPage.value = page

  router.push({
    query: {
      page,
      ...(searchQuery.value ? { search: searchQuery.value } : {})
    }
  })

  store.dispatch('characters/fetchCharacters', {
    page,
    search: searchQuery.value
  })
}

// Fetch першої сторінки при завантаженні
onMounted(() => {
  store.dispatch('characters/fetchCharacters', {
    page: currentPage.value,
    search: searchQuery.value
  })
})

</script>

<style scoped>
.container {
  height: 820px;
}
.charactersPlusFinder {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
}
.characters_inner {
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  gap: 20px;
  margin-top: 20px;
}

.loader {
  text-align: center;
  font-size: 24px;
}

.characters_message {
  text-align: left;
  font-size: 20px;
  margin: 20px 0;
}

.finder-inner input {
  width: 300px;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #999;
}

.modal-overlay {
  margin-top:145px;
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;


  z-index: 1000;
}

.modal-content {
  background: #f5f6f7 ;
  padding: 20px;
  border-radius: 12px;
  width: 1410px;
  max-height: 90vh;
  overflow-y: auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active, .slide-left-leave-active {
  transition: all 0.5s ease-out;
}
.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.5s ease-out;
}
.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.zoom-enter-active, .zoom-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.zoom-enter-from, .zoom-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.animation-controls {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.button-group button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.button-group button:hover {
  background-color: #4CAF50;
  cursor: pointer;

}

.button-group button.active-btn {
  background-color: #4CAF50;
  color: white;
  border-color: #3eaf7c;
  box-shadow: 0 4px 6px rgba(66, 184, 131, 0.3);
}

.button-group button:hover:not(.active-btn) {
  background-color: #4CAF50;
  color: white;
  border-color: #bbb;
}

@media (max-width: 1024px) {
  .characters_inner {
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    gap: 20px;
    margin-top: 20px;
  }
  .container {
    padding: 10px;
    height: 1400px;
  }

}
@media (max-width: 500px) {

  .container {
    padding: 10px;
    height: 1800px;
  }
  .characters_inner {
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    gap: 20px;
    margin-top: 20px;
  }
  .charactersPlusFinder {
    display: flex;
    flex-direction: column;

  }
  h1 {
    padding-bottom: 10px;
  }
}
</style>
