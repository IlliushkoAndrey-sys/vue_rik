<template>
  <div class="container">
  <div class="character--details">
  <div v-if="character" class="details">
    <div class="imageAndButton">
    <img :src="character.image" />
      <RouterLink
          :aria-label="`Повернутись`"
          :to="{
            path: '/characters',
            query: { page }
          }"
          class="backBtn"
      >Back</RouterLink>
      </div>
    <h1>{{ character.name }}</h1>

    <ul>
      <li><b>Status life:</b> {{ character.status }}</li>
      <li><b>Species:</b> {{ character.species }}</li>
      <li><b>Gender:</b> {{ character.gender }}</li>
      <li><b>Origin location:</b> {{ character.origin.name }}</li>
      <li><b>First location seen:</b> {{ character.location.name }}</li>
    </ul>
  </div>

  <div v-else-if="loading">Loading...</div>
  </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const page = computed(() => Number(route.query.page) || 1)


const loading = computed(() => store.getters['characters/getIsLoading'])

const character = computed(() =>
    store.state.characters.characters.get(Number(route.params.id))
)

onMounted(() => {
  if (!character.value) {
    store.dispatch('characters/fetchCharacterById', route.params.id)
  }
})
</script>

<style scoped>
.imageAndButton {
  display: flex;
  justify-content: space-between;
}
.backBtn {
  width: 120px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #ccc;
  text-decoration: none;
  text-align: center;
  align-content: center;
  color: #333;
}
.character--details{
  margin-top: 40px;
  padding: 10px 5px;
  border: 1px solid #ccc;
  border-radius: 12px;
}

.details>h1 {
  padding: 15px 0px;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
  margin-top: 5px;

}

</style>