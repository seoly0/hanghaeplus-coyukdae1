<template>
  <div id="title-view">
    <div class="title-text__container">
      <h1 class="title-text">{{ titleText }}</h1>
    </div>
    <div class="title-button-group">
      <SButton :to="{ name: 'difficulty' }">게임시작</SButton>
      <SButton :to="{ name: 'record' }">기록</SButton>
      <SButton :to="{ name: 'settings' }">설정</SButton>
      <SButton :to="{ name: 'credit' }">만든이</SButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SButton } from '@/components/ui'
import { chain } from '@/libs/timing/chain'

const titleAssemble = ['ㅊ', '초', '총', '총ㅇ', '총아', '총알', '총알ㅍ', '총알피', '총알피ㅎ', '총알피하', '총알피하ㄱ', '총알피하기']

const titleText = ref('')

onMounted(() => {
  chain(titleAssemble)
    .do((payload: Array<string>, i: number) => {
      titleText.value = payload[i]
    })
    .wait(110)
    .repeat(titleAssemble.length)
})
</script>

<style scoped>
#title-view {
  position: relative;
  width: 100%;
  height: 100%;
}
.title-text__container {
  text-align: center;
}
.title-text__container .title-text {
  margin: 0;
  padding: 5rem 0;
  font-size: 8rem;
  letter-spacing: 1rem;
}
.title-button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title-button-group > * {
  margin-bottom: 1.2rem;
}
</style>
