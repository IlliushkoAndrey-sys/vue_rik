<script setup>
import dayjs from "dayjs";
import {computed} from 'vue'
import {useStore} from 'vuex'

const store = useStore()

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  charactersId: {
    type: Number,
    default: null    ,
  },
  air_date: {
    type: String,
    required: true,
  },
})

const characterImage = computed(() => {
  if(!props.charactersId) {
    return '/public/rick.png'
  }

  // const id = Number(props.residents[0].split('/').pop())

  const image = store.getters['characters/getImageById'](props.charactersId)

  if(!image) {
    store.dispatch('characters/fetchCharacterById', props.charactersId)
  }

  return image || '/public/rick.png'
})
</script>

<template>
  <div class="season_smallcard">
  <div class="smallcard_image">
    <img :src="characterImage" :alt="props.name">
  </div>
  <div class="smallcard_title">{{props.name}}</div>
    <div class="smallcard_text">
    {{ props.air_date ? dayjs(props.air_date).format('DD MMMM YYYY').toLowerCase() : 'невідомо' }}
  </div>

  </div>
</template>

<style scoped>
.season_smallcard {
  padding: 15px;
  border: 1px solid #999;
  border-radius: 12px;
  height: 323px;
  cursor: pointer;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  box-shadow-radius: 12px;
}

.smallcard_title {
  font-size: 16px;
  line-height: 1.1;
  height: 39px;
  padding-top: 5px;
}
.smallcard_image>img{
  width: 100%;
  object-fit: cover;

}

.smallcard_text {
  padding-top: 5px;
  font-size: 13px;
  color: #999;
}
</style>