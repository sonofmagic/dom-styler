<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createDocumentElementStyler, createDomStyler } from '../..'
const dom1 = ref<HTMLElement>()
const manager = createDocumentElementStyler()
onMounted(() => {
  console.log(dom1.value, manager)
  const dom2 = createDomStyler(dom1.value as HTMLElement)
  manager.setVariables({
    'background-color': 'black'
  })
  dom2.setVariables([
    {
      color: {
        value: 'blue',
        priority: ''
      }
    }
  ])
  setTimeout(() => {
    manager.removeProperty('background-color')
  }, 2000)
})
</script>

<template>
  <div ref="dom1">123</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
