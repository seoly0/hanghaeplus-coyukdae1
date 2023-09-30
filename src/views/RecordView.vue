<template>
  <div id="record-view">
    <div class="record-title__container">
      <h1 class="record-title">기록</h1>
    </div>
    <div class="record-table__container">
      <template v-if="recordList.length">
        <table class="record-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>생존</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(record, idx) in recordList" :key="idx">
              <tr>
                <td>{{ record.player }}</td>
                <td>{{ record.time }}</td>
                <!--              <td>{{ record.difficulty }}</td>-->
                <td>{{ record.recordAt }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </template>
      <template>
        <h3>기록 없음</h3>
      </template>
    </div>
    <div class="to-title-btn__container">
      <SButton :to="{ name: 'title' }">타이틀로</SButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import SButton from '@/components/ui/SButton.vue'
import { DifficultyType } from '@/types'

interface GameRecord {
  player: string
  time: number
  // difficulty: DifficultyType
  recordAt: string
}

// const recordList: Array<GameRecord> = JSON.parse(localStorage.getItem("record") ?? '[]')

const recordList: Array<GameRecord> = [
  {
    player: 'x mania',
    time: 999999,
    recordAt: '2023-10-01',
  },
  {
    player: 'coco',
    time: 321,
    recordAt: '2023-10-01',
  },
  {
    player: 'seoly0',
    time: 123,
    recordAt: '2023-10-01',
  },
  {
    player: 'yong-chan',
    time: 30,
    recordAt: '2023-10-01',
  },
  {
    player: 'a2ku',
    time: 1,
    recordAt: '2023-10-01',
  },
]
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
  padding: 5rem 0;
  font-size: 5rem;
  letter-spacing: 1rem;
}
.record-table__container {
}
.record-table__container .record-table {
}
.to-title-btn__container {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
