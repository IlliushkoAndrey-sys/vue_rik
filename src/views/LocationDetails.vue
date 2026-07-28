<template>
<div class="container">
  <div class="locations--details">
    <div v-if="location" class="details">
      <div class="imageAndButton">
        <img :src="residentImage" />
        <RouterLink
            :aria-label="`Повернутись`"
            :to="{
            path: `/locations` ,
            query: {page}
            }"
            class="backBtn">Back</RouterLink>
      </div>
      <h1>{{location.name}}</h1>

      <ul>
        <li><b>Location Type:</b> {{location.type}}</li>
        <li><b>Location Dimension:</b> {{location.dimension}}</li>
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

const page = computed( () => Number(route.query.page) || 1)

const loading = computed( () => store.getters['locations/getIsLoading'])

const location = computed( () =>
    store.state.locations.locations.get(Number(route.params.id))
)

const residentImage = computed(() => {
  if (!location.value?.residents?.length) {
    return '/public/rick.png'
  }

  const firstResidentId = Number(location.value.residents[0].split('/').pop())

  const image = store.getters['characters/getImageById'](firstResidentId)

  if (!image) {
    store.dispatch('characters/fetchCharacterById', firstResidentId)
  }

  return image || '/public/rick.png'
})

onMounted(() => {
  if(!location.value){
    store.dispatch('locations/fetchLocationById', route.params.id)
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
.locations--details{
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