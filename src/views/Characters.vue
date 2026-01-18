<template>
  <div class="container">
    <h1>Characters</h1>

    <div class="characters_inner">

    <div class="character_card" v-if="character">
      <div class="character_image">
        <img :src="character.image" alt="Morty Smith">

      </div>
      <div class="character_name">{{character.name}}</div>
      <div class ="character_type">{{character.species}}</div>
    </div>

  </div>
  </div>

</template>
<script setup>
import { ref, onMounted } from 'vue'

const character = ref(null)
const loading = ref(true)

async function fetchFirstCharacter() {
  const res = await fetch('https://rickandmortyapi.com/api/character/1')
  const data = await res.json()
  character.value = data
  loading.value = false
}

onMounted(() => {
  fetchFirstCharacter()
})

</script>

<style>
.characters_inner {
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  gap: 30px;
}

.character_card {
  width: 100%;
  max-width: 260px;
  padding-top: 15px;
  padding-bottom: 15px;
  border: 1px solid #999;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4)
}
.character_name {
  text-align: center;
  padding-top: 10px;

}
.character_type {
  text-align: center;
  padding-top: 10px;

}

.character_image {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.character_image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>