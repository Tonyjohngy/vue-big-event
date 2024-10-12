import { defineStore } from 'pinia'
import { ref } from 'vue'

export const countStore = defineStore('count', () => {
  const count = ref(200)
  const add = () => {
    count.value++
  }
  return {
    count,
    add
  }
})
