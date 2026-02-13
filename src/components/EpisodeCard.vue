<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  charactersId: {
    type: Number,
    default: null,
  },
  air_date: {
    type: String,
    required: true,
  },
});

const characterImage = ref('/public/rick.png');

onMounted(async () => {
  if (!props.charactersId) return

  const character = await store.dispatch(
      'characters/fetchCharacterById',
      props.charactersId
  )

  characterImage.value = character?.image || '/rick.png'
});

</script>

<template>
  <div class="season_smallcard">
  <div class="smallcard_image">
    <img v-lazy="characterImage" :alt="props.name">
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

@media (max-width: 1024px ) {
  .season_smallcard {
    height: 100%;
  }
}
@media (max-width: 500px) {
  .season_smallcard {
    height: 100%;
  }
}

</style>