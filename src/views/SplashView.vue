<template>
  <div id="splash-view">대충 스플래시화면</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

setTimeout(() => {
  router.push({ name: 'title' })
}, 2000)
</script>
