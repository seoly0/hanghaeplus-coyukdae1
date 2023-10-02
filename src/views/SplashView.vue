<template>
  <div id="splash-view">
    <div class="logo__container">
      <template v-if="splash == 0">
        <img class="logo" :class="{ show: show }" :src="VueLOGOURI" />
        <img class="logo" :class="{ show: show }" :src="ViteLogoURI" />
      </template>
      <template v-else-if="splash == 1">
        <img class="logo" :class="{ show: show }" :src="PixiLogoURI" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import VueLOGOURI from '@/assets/logo/vue-logo.svg'
import ViteLogoURI from '@/assets/logo/vite-logo.svg'
import PixiLogoURI from '@/assets/logo/pixi-logo.svg'
import { chain } from '@/libs/timing/chain'

const router = useRouter()
const show = ref(false)
const splash = ref(-1)

onMounted(() => {
  chain()
    .do(() => {
      splash.value = 0
    })
    .wait(1000)
    .do(() => {
      show.value = true
    })
    .wait(2000)
    .do(() => {
      show.value = false
    })
    .wait(1000)
    .do(() => {
      splash.value = 1
    })
    .wait(1000)
    .do(() => {
      show.value = true
    })
    .wait(2000)
    .do(() => {
      show.value = false
    })
    .wait(2000)
    .do(() => {
      router.push({ name: 'title' })
    })
})
</script>

<style scoped>
#splash-view {
  width: 100%;
  height: 100%;
}

.logo {
  height: 320px;
  opacity: 0;
  transition: opacity 1s;
}

.logo.show {
  opacity: 1;
}

.logo__container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo__container > * {
  margin-right: 4rem;
}
.logo__container > *:last-child {
  margin-right: 0;
}
</style>
