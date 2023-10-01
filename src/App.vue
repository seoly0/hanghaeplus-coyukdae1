<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { getScreenWidth, getScreenHeight } from '@/libs/screen'
import { useSettingStore } from '@/store'

const setting = useSettingStore()

const baseFontSize = 16
const setFontSize = () => {
  const width = getScreenWidth()
  const height = getScreenHeight()
  console.log(width, height)
  const ratio = parseFloat((getScreenWidth() / setting.resolution[0]).toFixed(2))
  const cssRoot = document.querySelector(':root')
  // @ts-ignore
  cssRoot?.style.setProperty('font-size', `${Math.floor(baseFontSize * ratio)}px`)
}

const observer = new ResizeObserver(entries => {
  setFontSize()
})

observer.observe(document.body)
</script>
