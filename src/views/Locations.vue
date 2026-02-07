<script setup >
import {ref,computed,onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import LocationCard from '../components/LocationCard.vue'
import Pagination from '../components/Pagination.vue'

const store = useStore();
const router = useRouter();
const route = useRoute();

const currentPage = ref(Number(route.query.page) || 1)
const searchQuery = ref(route.query.search || '')

const locations = computed (() => store.getters['locations/getLocationsArray'])
const loading = computed(() => store.getters['locations/getIsLoading'])
const totalPages = computed( () => store.getters['locations/getTotalPages'])

console.log(locations)
let debounceTimer = null

function onSearchInput() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    currentPage.value = 1

    router.push({
      query: {
        page: 1,
        ...(searchQuery.value ? {search: searchQuery.value} : {})
      }
    })

    store.dispatch('locations/fetchLocations', {
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
      ...(searchQuery.value ? {search: searchQuery.value} : {})
    }
  })

  store.dispatch('locations/fetchLocations', {
    page,
    search: searchQuery.value
  })
}

onMounted(() => {
  store.dispatch('locations/fetchLocations', {
    page: currentPage.value,
    search: searchQuery.value
  })
})
</script>

<template>
  <div class="container">
    <div class="locationsPlusFinder">
      <h1>Locations</h1>

      <div class="finder-inner">
        <input class="finder-input"
               type="text"
               placeholder="Enter Location"
               v-model="searchQuery"
               @input="onSearchInput"
        />
      </div>
    </div>

    <div v-if="loading" class="loader"></div>
    <div v-if="!loading && Array.isArray(locations) && locations.length === 0" class="locations_message">Нічого не знайдено</div>
    <div class="locations_inner">
      <LocationCard
          v-for="location in locations"
          :key="location.id"
          :name="location.name"
          :residentsId="location.residents[0] ? Number(location.residents[0].split('/').pop()) : null"
          :type="location.type"
      />
    </div>

  </div>
  <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="changePage"
  />
</template>

<style scoped>
.container {
  height: 720px;
}
.locationsPlusFinder {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
}
.locations_inner {
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  gap: 20px;
  margin-top: 20px;
}

.loader {
  text-align: center;
  font-size: 24px;
}

.locations_message {
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