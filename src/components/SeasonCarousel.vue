<script setup>
import EpisodeCard from '@/components/EpisodeCard.vue'
import useEmblaCarousel from 'embla-carousel-vue'
import { ref, onMounted,computed } from 'vue'

defineProps({
  episodes: {
    type: Array,
    required: true
  }
})

const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: false,
  align: 'start',
  containScroll: 'trimSnaps'
})

const canPrev = ref(false)
const canNext = ref(false)

const scrollPrev = () => {
  emblaApi.value?.scrollPrev()
}
const scrollNext = () => {
  emblaApi.value?.scrollNext()
}

const updateButtons = () => {
  if (!emblaApi.value) return
  canPrev.value = emblaApi.value.canScrollPrev()
  canNext.value = emblaApi.value.canScrollNext()
}

onMounted(() => {
  updateButtons()
  emblaApi.value?.on('select', updateButtons)
})
</script>


<template>
  <div class="embla">
    <div ref="emblaRef" class="embla__viewport">
      <div class="embla__container">
        <div
            v-for="episode in episodes"
            :key="episode.id"
            class="embla__slide"
        >
          <EpisodeCard
              :name="episode.name"
              :air_date="episode.air_date"
              :characters-id="
              episode.characters?.length ? Number(episode.characters[Math.floor((Math.random()+5)+Math.random())].split('/').pop()) : null
            "
          />
        </div>
      </div>
    </div>

    <button class="embla__prev" @click="scrollPrev" :disabled="!canPrev">‹</button>
    <button class="embla__next" @click="scrollNext" :disabled="!canNext">›</button>
  </div>
</template>

<style scoped>
.embla {
  position: relative;
}

.embla__viewport {
  overflow: hidden;
}

.embla__container {
  display: flex;
}

.embla__slide {
  flex: 0 0 auto;
  width: 284px;
  padding-right: 20px;
}
.embla__slide:last-child {
  padding-right: 0;
  width: 264px;
}

.embla__prev,
.embla__next {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  z-index: 2;
  border:none;
  color: #4CAF50;
  font-size: 30px;
  background: none;
  cursor: pointer;
}

.embla__prev {
  left: -40px;
  border-radius: 50%;

}
.embla__prev:hover {
}

.embla__prev:disabled {
  color: #999999;
  cursor: not-allowed;
}
.embla__next:disabled {
  color: #999999;
  cursor: not-allowed;

}

.embla__next {
  right: -40px;
  border-radius: 50%;
}
@media (max-width: 1024px) {
  .embla {
    position: relative;
  }

  .embla__viewport {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
  }

  .embla__slide {
    flex: 0 0 auto;
    width: 242px;
    padding-right: 20px;
  }
  .embla__slide:last-child {
    padding-right: 0;
    width: 222px;
  }
  .embla__prev {
    left: -25px;
    border-radius: 50%;

  }
  .embla__next {
    right: -25px;
    border-radius: 50%;
  }



}
@media (max-width: 500px) {
  .embla__slide {
    flex: 0 0 auto;
    width: 326px;
    padding-right: 20px;
  }
  .embla__slide:last-child {
    padding-right: 0;
    width: 306px;
  }
  .embla__prev {
    left: -25px;
    border-radius: 50%;

  }
  .embla__next {
    right: -25px;
    border-radius: 50%;
  }
}
</style>
