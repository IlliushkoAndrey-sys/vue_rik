<template>
  <div class="container">
    <h1>Characters</h1>

    <div class="characters_inner">
      <characterCard :character="characters[0]"/>

      <characterCard
        v-for="(character, index) in characters.slice(1)"
        :key="index"
        :character="character"
        />

  </div>
  </div>

</template>
<script setup>
import characterCard from "../components/characterCard.vue";

const characters = [
  {name:"Rick Sanchez", image:"public/rick.png", species:"Human"},
  {name:"Morty Smith", image:"public/morty.png", species:"Human"},
  {name:"Jerry Smith", image:"public/Jerry.png", species:"Human"}
];
</script>

<style>
.characters_inner {
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  gap: 30px;
}


</style>