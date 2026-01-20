<template>
  <div class="container">
    <h1>Characters</h1>

    <div class="characters_inner">
      <CharacterCard 
        v-for="(character, index) in characters" 
        :key="character.name + index" :name="character.name" :image="character.image" :species="character.species" />

    </div>
  </div>

</template>
<script setup>
import CharacterCard from "../components/CharacterCard.vue";

const characters = [
  { name: "Rick Sanchez", image: "public/rick.png", species: "Human" },
  { name: "Morty Smith", image: "public/morty.png", species: "Human" },
  { name: "Jerry Smith", image: "public/Jerry.png", species: "Human" }
];

</script>

<style>
.characters_inner {
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  gap: 30px;
}
</style>