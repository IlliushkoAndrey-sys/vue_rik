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
      />
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
          :name="char.name"
          :image="char.image"
          :species="char.species"
      />
    </div>

  </div>
  <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="changePage"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import CharacterCard from '../components/CharacterCard.vue'
import Pagination from '../components/Pagination.vue'

const store = useStore()

const characters = computed(() => store.getters['characters/getCharactersArray'])
const loading = computed(() => store.getters['characters/getIsLoading'])
const totalPages = computed(() => store.getters['characters/getTotalPages'])
const currentPage = computed(() => store.state.characters.currentPage)

// Пошуковий запит з debounce
const searchQuery = ref(store.state.characters.search)
let debounceTimer = null

watch(searchQuery, (val) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    store.commit('characters/setSearch', val.trim())
    store.commit('characters/setCurrentPage', 1)
    store.dispatch('characters/fetchCharacters')
  }, 500) // чекаємо 500ms після останнього введення
})

// Зміна сторінки
function changePage(page) {
  store.commit('characters/setCurrentPage', page)
  store.dispatch('characters/fetchCharacters')
}

// Fetch першої сторінки при завантаженні
store.dispatch('characters/fetchCharacters')
</script>

<style scoped>
.container {
  height: 720px;
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
</style>
