<template>
  <div id="difficulty-view">
    <div class="difficulty-text__container">
      <h1 class="difficulty-text">난이도 선택</h1>
    </div>
    <div class="difficulty-button-group">
      <SButton @click="handleOnSelectDifficulty('EASY')">EASY</SButton>
      <SButton @click="handleOnSelectDifficulty('NORMAL')">NORMAL</SButton>
      <SButton @click="handleOnSelectDifficulty('HARD')">HARD</SButton>
    </div>
    <div class="to-title-btn__container">
      <SButton :to="{ name: 'title' }">타이틀로</SButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStageStore } from '@/store'
import { SButton } from '@/components/ui'
import { DifficultyType } from '@/types'

const store = useStageStore()
const router = useRouter()

const handleOnSelectDifficulty = (difficulty: DifficultyType) => {
  store.difficulty = difficulty

  router.replace({ name: 'stage' })
}
</script>

<style scoped>
#difficulty-view {
  position: relative;
  width: 100%;
  height: 100%;
}
.difficulty-text__container {
  text-align: center;
}
.difficulty-text__container .difficulty-text {
  margin: 0;
  padding: 5rem 0;
  font-size: 8rem;
  letter-spacing: 1rem;
}
.difficulty-button-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.difficulty-button-group > * {
  margin-right: 2rem;
}
.difficulty-button-group > *:last-child {
  margin-right: 0;
}
.to-title-btn__container {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
