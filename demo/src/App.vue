<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { nanoid } from 'nanoid'
import css from 'css'
import { parse, stringify } from 'postcss'
// @ts-ignore
import postcssJs from 'postcss-js'
import { createDocumentElementStyler, createDomStyler } from '../..'
const dom1 = ref<HTMLElement>()
// const manager = createDocumentElementStyler()

// const styleSheet = new StyleSheet()
// styleSheet.disabled = true
let styleSheetDom: HTMLStyleElement
let selector = nanoid()
const setBlue = () => {
  styleSheetDom.innerText = `.${selector} {color : blue;}`
}
const removeDom = () => {
  document.head.removeChild(styleSheetDom)
}
const observer = new MutationObserver((mutationsList, observer) => {
  console.log(mutationsList)
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((x) => {
        if (x instanceof HTMLStyleElement) {
          // x.media = 'abc'
        }
      })
      // mutation.removedNodes
    }
    // else if (mutation.type === 'attributes') {
    //   console.log('The ' + mutation.attributeName + ' attribute was modified.')
    // }
  }
})

onMounted(() => {
  observer.observe(document.head, {
    attributes: true,
    childList: true
    // subtree: true
  })
  const p = {
    color: 'pink',
    background: 'black'
  }
  // css-in-js-syntax
  dom1.value?.classList.add(selector)
  const innerText = `.${selector} {color : red;}`
  const css = parse(innerText)
  console.log(css)

  styleSheetDom = document.createElement('style')
  styleSheetDom.innerText = innerText
  document.head.appendChild(styleSheetDom)
})

onBeforeUnmount(() => {
  observer.disconnect()
})
</script>

<template>
  <div ref="dom1">123</div>
  <button @click="setBlue">blue</button>
  <button @click="removeDom">remove</button>
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
