<template>
  <div class="container">
    <h1>Characters</h1>
    <div v-if="loading">Loading...</div>

    <div class="characters_inner">
      <CharacterCard 
        v-for="character in characters"
        :key="character.id" :name="character.name" :image="character.image" :species="character.species" />

    </div>
  </div>

</template>
<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import CharacterCard from "../components/CharacterCard.vue"

const store = useStore()

onMounted(() => {
  store.dispatch('fetchCharacters')
})

const characters = computed(() => store.getters.allCharacters)
const loading = computed(() => store.getters.isLoading)

</script>

<style>
.characters_inner {
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  gap: 30px;
}
</style>