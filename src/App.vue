<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
// import { RouterView, useRouter } from 'vue-router'
import { getScreenWidth, getWithFromResolutionText } from '@/libs/screen'
import { useSettingStore } from '@/store'

// const router = useRouter()
// router.replace('/')
const setting = useSettingStore()

const baseFontSize = 16
const setFontSize = () => {
  const ratio = parseFloat((getScreenWidth() / getWithFromResolutionText(setting.resolution)).toFixed(2))
  const cssRoot = document.querySelector(':root')
  cssRoot?.style.setProperty('font-size', `${baseFontSize * ratio}px`)
}

const observer = new ResizeObserver(entries => {
  setFontSize()
})

observer.observe(document.body)
</script>
