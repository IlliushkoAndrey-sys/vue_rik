<script setup>
import {computed} from 'vue'

const props = defineProps({
  currentPage: Number,
  totalPages: Number
})

const emit = defineEmits(['update:page']);

const currentPage = computed({
  get: () => props.currentPage,
  set: (value) => {
    const page = Math.min(Math.max(value, 1), props.totalPages)
    emit('update:page', page)
  }
})

const inputPage = computed({
  get: () => currentPage.value,
  set: (value) => {
    currentPage.value = value
  }
})

const startPage = computed(() =>
  Math.max(currentPage.value -1, 2)
)

const endPage = computed(() =>
  Math.min(currentPage.value + 1, props.totalPages - 1)
)

const pages = computed(() => {
  const result = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    result.push(i);
  }
  return result;
})

function changePage(page) {
  currentPage.value = page;
}
function goToInputPage() {
  currentPage.value = inputPage.value
}

</script>

<template>
<div class="pagination">
  <button
    :disabled="currentPage === 1"
    @click="changePage(currentPage-1)"
  >
    Prev
  </button>

<button
  :class="{ active: currentPage === 1}"
  @click="changePage(1)"
>
  1
</button>

  <span v-if="startPage > 2">...</span>

  <button
    v-for="page in pages"
    :key="page"
    :class="{ active: currentPage=== page}"
    @click="changePage(page)"
  >
    {{ page }}
  </button>

  <span v-if="endPage < totalPages - 1">...</span>

  <button
    v-if="totalPages > 1"
    :class="{ active: currentPage === totalPages}"
    @click="changePage(totalPages)"
  >
    {{totalPages}}
  </button>

  <button
    :disabled="currentPage === totalPages"
    @click="changePage(currentPage + 1)"
  >
    Next
  </button>
<div class="">
  <input
    type="number"
    v-model.number="inputPage"
    @keydown.enter="goToInputPage"
    :min="1"
    :max="totalPages"
    placeholder="Page"
    />
  <button @click="goToInputPage">Go</button>
</div>
</div>
</template>

<style scoped>


.pagination {
  display: flex;
  justify-content: center;
  padding: 30px 0;
  text-align: center;
}

.pagination button {
  text-decoration: none;
  border: 1px solid #999;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0 2px;
  font-size: 24px;
  color: #999;
  cursor: pointer;
}

.pagination>span{
  
}

.pagination button:hover {
  background-color: #4CAF50;
  color: #fff;
}

.pagination button:disabled {
  cursor: default;
  pointer-events: none;
  opacity: 0.7;
}

input {
  color: #999;
  border: 1px solid #999;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0 2px;
  font-size: 24px;
}

.pagination_jump input {
  text-decoration: none;
  border: 1px solid #999;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0 2px;
  font-size: 24px;
  color: #999;
  outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none; /* Скрывает стрелки */
  margin: 0; /* Убирает отступ, который может появиться */
}

.pagination a {
  text-decoration: none;
  color: #333;
  border: 1px solid #999;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0 2px;

}
.pagination button.active {
  background-color: #4CAF50;
  color: #fff;
}

.pagination button:hover {
  background-color: #4CAF50;
  color: #fff;

}
</style>