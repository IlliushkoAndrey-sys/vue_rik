<script setup >
import { ref, computed, watch } from 'vue';

const city = ref('Чернігів');
const adress = ref('Вулиця');
const inputValue = ref('')
const oldValue = ref('Старе значення')
const newValue = ref('Нове значення')

watch(inputValue, (newVal, oldVal) => {
  oldValue.value = oldVal
  newValue.value = newVal
});
let watchValue = computed(() => {
  return `було ${oldValue.value} стало ${newValue.value}`
})

let cityPlusCountry= computed(() => {
  return city.value + " ,Україна";
});
</script>

<template>
  <div class="container">
    <input v-bind:value="city" @input="city = $event.target.value" class="input" type="text" >
    <span>{{city}}</span>
    <span>{{cityPlusCountry}}</span>
    <input class="input" v-model.lazy="adress" type="text" placeholder="Введіть Вулицю">
    <span>{{adress+" ,"+cityPlusCountry}}</span>
    <input class="input" v-model.lazy="inputValue" type="text">
    <span>{{watchValue}}</span>

  </div>
</template>

<style scoped>
.input {
  margin-top: 15px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
}
span {
  display: block;
  margin-top: 15px;
}

</style>