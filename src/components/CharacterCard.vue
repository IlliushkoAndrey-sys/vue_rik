<template>
  <RouterLink
    :aria-label="`Відкрити карточку персонажа ${props.name}`"
    :to="{
      path: `/characters/${props.id}`,
      query: { page: props.page }
    }"
    class="character_card"
  >

    <div class="character_image">
      <img :alt="props.name" :src="props.image">

    </div>
    <div class="character_name">{{props.name}}</div>
    <div class ="character_type">{{props.species}}</div>
  </RouterLink>
</template>

<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
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
  page: {
    type: Number,
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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  text-decoration: none;
  color: #333;
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