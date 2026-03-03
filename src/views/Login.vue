<template>
  <div class="container">
    <h1>Login (Mock)</h1>
    <button @click="handleLogin">Login</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'

const router = useRouter()
const { login } = useAuth()

const handleLogin = async () => {
  try {
    await login()
    router.push('/characters') // після login переходимо на /characters
  } catch {
    alert('Login failed')
  }
}
</script>

<style scoped>
button {
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
button:hover {
  color: white;
  background-color: #4CAF50;
  border:none;

}
</style>