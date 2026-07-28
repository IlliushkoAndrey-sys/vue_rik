<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  root: {
    type: Object,
    default: null
  }
})

const rootEl = ref(null)
const isVisible = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      },
      {
        root: props.root || null,
        threshold: 0.1
      }
  )

  if (rootEl.value) observer.observe(rootEl.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div ref="rootEl">
    <slot v-if="isVisible" />
  </div>
</template>
