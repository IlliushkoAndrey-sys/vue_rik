<script setup>
import { ref, onMounted } from 'vue'

const memeUrl = ref('')

onMounted(async () => {
  try {
    const res = await fetch('https://meme-api.com/gimme/meme')
    const data = await res.json()
    memeUrl.value = data.url || ''
  } catch (e) {
    console.error('Не вдалося завантажити мем:', e)
  }
})
</script>

<template>
<div class="container">
  <div class="not-found">
    <h1>Введеної сторінки не існує</h1>
    <p>Але тут є рандомний мем</p>
    <img v-if="memeUrl" :src="memeUrl" alt="Random Rocket Meme" />
    <p v-else>Завантаження...</p>
  </div>
</div>
</template>

<style scoped>
.not-found {
  align-items: center;
  text-align: center;
  margin-top: 40px;
}
.not-found>img {
  width: 100vh;
  height: 100%
}
</style>