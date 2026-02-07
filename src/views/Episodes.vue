<script setup>
import {ref, computed, onMounted} from 'vue';
import {useStore} from 'vuex';
import SeasonCarousel from "@/components/SeasonCarousel.vue";


const store = useStore();
const searchQuery = ref('');




// Завантажуємо епізоди
onMounted(() => {
  store.dispatch('episodes/fetchAllEpisodes');
});

// loading зі стору
const loading = computed(() => store.state.episodes.loading);

// сезони зі стору (getter)
const seasons = computed(() => store.getters['episodes/seasons']);

// фільтрація епізодів у сезоні
const filterEpisodes = (episodes) => {
  if (!searchQuery.value) return episodes;
  return episodes.filter(ep =>
      ep.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};
</script>

<template>
    <div class="container">
      <div class="episodesPlusFinder">
        <h1>Episodes</h1>
        <div class="finder-inner">
          <input class="finder-input"
                 type="text"
                 placeholder="Enter Location"
                 v-model="searchQuery"
                 @input="onSearchInput"
          />
        </div>      </div>

      <div v-if="loading">Loading...</div>

      <section
          v-for="(episodes, season) in seasons"
          :key="season"
          class="season"
      >
        <template v-if="filterEpisodes(episodes).length">
          <h2>Season {{ season }}</h2>

          <!-- ✅ КОЖЕН СЕЗОН = СВОЯ КАРУСЕЛЬ -->
          <SeasonCarousel :episodes="filterEpisodes(episodes)" />
        </template>
      </section>
    </div>
  <div class="footer">

  </div>
</template>

<style scoped>
.container {
  min-height: 720px;
}

.episodesPlusFinder {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  align-items: center;
}

.finder-inner input {
  width: 300px;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #999;
}

.season>h2 {
  margin-top: 30px;
  margin-bottom: 15px;
}

.footer {
margin-top: 40px;
}

</style>
