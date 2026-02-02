<template>
  <div class="character_card">
    <div class="character_image">
      <img :src="props.image" :alt="props.name">

    </div>
    <div class="character_name">{{props.name}}</div>
    <div class ="character_type">{{props.species}}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '/public/rick.png',
  },
  species: {
    type: String,
    required: true,
  },
})

</script>

<style scoped>
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

.character_card:hover {
  background: #4CAF50;
  color: white;
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