<script setup>
import { ref, watch } from 'vue'

const search = ref('')
let timer = null

watch(search, (newVal) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    fakeRequest(newVal)
  }, 500)  // через 500мс викликати fakeRequest(newVal)
})

function fakeRequest(query) {
  console.log('Запит до API з:', query)
}
</script>

<template>
  <input v-model="search" placeholder="Пошук..." />
</template>