<template>
  <div id="record-view">
    <div class="record-title__container">
      <h1 class="record-title">기록</h1>
    </div>
    <div class="difficulty-btn__container">
      <SButton @click="setDifficulty('EASY')">EASY</SButton>
      <SButton @click="setDifficulty('NORMAL')">NORMAL</SButton>
      <SButton @click="setDifficulty('HARD')">HARD</SButton>
    </div>
    <div class="record-table__container">
      <div>
        <h3>{{ difficulty }}</h3>
      </div>
      <template v-if="recordList.length">
        <table class="record-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>이름</th>
              <th>생존</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(record, idx) in recordList" :key="idx">
              <tr>
                <td>{{ idx + 1 }}</td>
                <td>{{ record.player }}</td>
                <td>{{ record.time }}</td>
                <td>{{ record.recordAt }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </template>
      <template v-else>
        <div>
          <h3>기록 없음</h3>
        </div>
      </template>
    </div>
    <div class="to-title-btn__container">
      <SButton :to="{ name: 'title' }">타이틀로</SButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { SButton } from '@/components/ui'
import { DifficultyType } from '@/types'
import { GameRecord } from '@/types/stage'

const difficulty: Ref<DifficultyType> = ref('NORMAL')

const easyRecordList: Array<GameRecord> = JSON.parse(localStorage.getItem('easy_record') ?? '[]')
const normalRecordList: Array<GameRecord> = JSON.parse(localStorage.getItem('normal_record') ?? '[]')
const hardRecordList: Array<GameRecord> = JSON.parse(localStorage.getItem('hard_record') ?? '[]')

const recordList = computed(() => {
  return difficulty.value === 'EASY' ? easyRecordList : difficulty.value === 'NORMAL' ? normalRecordList : hardRecordList
})

const setDifficulty = (param: DifficultyType) => {
  difficulty.value = param
}
</script>

<style scoped>
#record-view {
  position: relative;
  width: 100%;
  height: 100%;
}
.record-title__container {
  text-align: center;
}
.record-title__container .record-title {
  margin: 0;
  padding: 2rem 0;
  font-size: 5rem;
  letter-spacing: 1rem;
}
.record-table__container {
  text-align: center;
}
.record-table__container .record-table {
  margin: 0 auto;
  border-collapse: collapse;
}
.record-table__container .record-table td {
  width: 8rem;
  padding: 0.1rem 1rem;
  line-height: 1.4;
  border: 1px solid white;
}

.record-table__container .record-table td:first-child {
  width: 4rem;
}
.to-title-btn__container {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.difficulty-btn__container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.difficulty-btn__container > * {
  margin-right: 2rem;
}
.difficulty-btn__container > *:last-child {
  margin-right: 0;
}
</style>
