<script setup>
import {computed} from 'vue'
import {useStore} from 'vuex'

const store = useStore()

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  residentsId: {
    type: Number,
    default: null,
  },
  type: {
    type: String,
    required: true,
  },
})

const residentImage = computed(() => {
  if(!props.residentsId) {
    return '/public/rick.png'
  }


  const image = store.getters['characters/getImageById'](props.residentsId)

  if(!image) {
    store.dispatch('characters/fetchCharacterById', props.residentsId)
  }

  return image || '/public/rick.png'
  })
</script>

<template>
<div class="location_card">
  <div class="location_image">
    <img :src="residentImage" :alt="props.name">

  </div>
  <div class="location_name">{{props.name}}</div>
  <div class="location_type">{{props.type}}</div>
</div>
</template>

<style scoped>
.location_card {
  width: 100%;
  max-width: 260px;
  padding-top: 15px;
  padding-bottom: 15px;
  border: 1px solid #999;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4)
}

.location_card:hover {
  background: #4CAF50;
  color: white;
}
.location_name {
  text-align: center;
  padding-top: 10px;

}
.location_type {
  text-align: center;
  padding-top: 10px;

}

.location_image {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.location_image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>