<template>
  <div class="container">
  <div class="character--details">
  <div v-if="character" class="details">
    <div class="imageAndButton">
    <img :src="character.image" />
      <button
          :aria-label="`Повернутись`"
          @click="goBack"
          class="backBtn"
      >Back</button>
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
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
  const router = useRouter()

const goBack = () => {
  if (router.options.history.state.back) {
    router.back()
  } else {
    router.push('/characters')
  }
}

const loading = computed(() => store.getters['characters/getIsLoading'])

const character = computed(() =>
    store.state.characters.characters.get(Number(route.params.id))
)

onMounted(async () => {
  if (character.value) {
    return
  }

  try {
    const data = await store.dispatch('characters/fetchCharacterById', route.params.id)

    if (!data || !data.id) {
      router.replace('/404')
    }
  } catch (e) {
    router.replace('/404')
  }
})
</script>

<style scoped>
.imageAndButton {
  display: flex;
  justify-content: space-between;
}
.imageAndButton img {
  width: 270px;
  height: 270px;
}
.backBtn {
  width: 120px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #ccc;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  align-content: center;
  color: #333;
}
.backBtn:hover {
  background-color: #4CAF50;
  color: white;
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