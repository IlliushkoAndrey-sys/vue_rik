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
    <div class="not-foundAndButton">
      <h1>Введеної сторінки не існує</h1>
      <router-link to="/characters" class="backBtn">Back to Characters</router-link>
    </div>
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
  margin-top: 10px;
  width: 70vh;
  height: 100%
}
.not-foundAndButton {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.backBtn {
  text-decoration: none;
  align-content: center;
  padding: 2px 4px;
  border-radius: 6px;
  border: 1px solid #999999;
  color: #333;
}
</style>