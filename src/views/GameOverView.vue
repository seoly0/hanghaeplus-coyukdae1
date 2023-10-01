<template>
  <div id="gameover-view">
    <div class="title-text__container">
      <h1 class="title-text">Game Over</h1>
    </div>
    <div class="score__container">
      <div>생존: {{ stage.score }}</div>
    </div>
    <div>
      <template v-if="highScore">
        <div class="record__container">
          <template v-if="!doneRecord">
            <input class="record-input" v-model="name" />
            <SButton @click="recordScore">기록</SButton>
          </template>
          <template v-else>
            <SButton :to="{ name: 'record' }">기록보기</SButton>
          </template>
        </div>
      </template>
      <template v-else> 기록할 만한 점수는 아니네요. </template>
    </div>
    <div class="gameover-btn__container">
      <SButton :to="{ name: 'title' }">타이틀로</SButton>
      <SButton :to="{ name: 'stage' }">다시하기</SButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SButton } from '@/components/ui'
import { useStageStore } from '@/store'
import { GameRecord } from '@/types/stage'
import moment from 'moment'

const stage = useStageStore()

const name = ref('')
const highScore = ref(false)
const doneRecord = ref(false)

const key = `${stage.difficulty.toLocaleLowerCase()}_record`
const record = JSON.parse(localStorage.getItem(key) ?? '[]') as Array<GameRecord>

const recordScore = () => {
  record.push({
    player: name.value,
    time: stage.score,
    recordAt: moment().format('YYYY-MM-DD'),
  })

  record.sort((a, b) => b.time - a.time)
  record.splice(5)

  localStorage.setItem(key, JSON.stringify(record))
  doneRecord.value = true
}

onMounted(() => {
  highScore.value = record[record.length - 1].time < stage.score
})
</script>

<style scoped>
.title-text__container {
  text-align: center;
}
.title-text__container .title-text {
  margin: 0;
  padding-top: 4rem;
  padding-bottom: 3rem;
  font-size: 6rem;
  letter-spacing: 1rem;
}

.score__container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}

.record__container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
.record__container > * {
  margin-right: 2rem;
}
.record__container > *:last-child {
  margin-right: 0;
}
.record-input {
  display: inline-block;
  height: 4rem;
  width: 15rem;
  font-size: 2.5rem;
  text-align: center;
}

.gameover-btn__container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.gameover-btn__container > * {
  margin-right: 2rem;
}
.gameover-btn__container > *:last-child {
  margin-right: 0;
}
</style>
