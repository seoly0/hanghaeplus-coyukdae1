<template>
  <div class="default-button">
    <img :src="BackgroundImgURI" alt="btn" />
    <button @click="handleOnClick">
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
import BackgroundImgURI from '@/assets/ui/btn-bg.svg'
import { useRouter, RouteLocationRaw } from 'vue-router'

interface Props {
  to?: RouteLocationRaw
}

const props = defineProps<Props>()
const router = useRouter()

const handleOnClick = (evt: Event) => {
  if (props.to) {
    router.replace(props.to)
  }
}
</script>

<style>
.default-button {
  display: inline-block;
  position: relative;
  filter: drop-shadow(0.3rem 0.3rem 0.3rem grey);
}

.default-button:hover {
}

.default-button button {
  display: block;
  cursor: pointer;
  background: none;
  border: none;
  text-align: center;
  width: 9.4rem;
  height: 4rem;
  color: white;
  font-weight: 600;
  font-size: 1.8rem;
}

.default-button > img {
  /* z-index: -1; */
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  pointer-events: none;
  fill: none;
  stroke: white;
}
</style>
