<script >

export default {
  data() {
    return {
      city: 'Чернігів',
      adress: 'Вулиця'
    }
  },
  computed:{
    cityPlusCountry() {
      return this.city + " ,Україна";
    }
  }
}
</script>

<template>
  <div class="container">
    <input v-bind:value="city" @input="city = $event.target.value" class="input" type="text" >
    <span>{{city}}</span>
    <span>{{cityPlusCountry}}</span>
    <input class="input" v-model.lazy="adress" type="text" placeholder="Введіть Вулицю">
    <span>{{adress+" ,"+cityPlusCountry}}</span>

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