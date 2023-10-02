<template>
  <div id="guide-view">
    <div>
      <table class="guide-table">
        <tr>
          <td>
            <img :src="TraceSpriteURI" />
          </td>
          <td>
            <div class="text">
              <div>1스테이지 등장</div>
              <div>플레이어를 조준사격 합니다.</div>
              <div>스폰 10초 후 사라집니다.</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <img :src="SpreadGuideURI" />
          </td>
          <td>
            <div class="text">
              <div>2스테이지 등장</div>
              <div>방사형으로 사격 합니다.</div>
              <div>스폰 10초 후 사라집니다.</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <img :src="RampagepriteURI" />
          </td>
          <td>
            <div class="text">
              <div>3스테이지 등장</div>
              <div>빠르게 나선형으로 난사한 뒤 사라집니다.</div>
              <div>스폰 3초 후 사라집니다.</div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="guide-btn__container">
      <SButton :to="{ name: 'stage' }">시작하기</SButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SButton } from '@/components/ui'
import TraceSpriteURI from '@/assets/guide/trace.png'
import SpreadGuideURI from '@/assets/guide/spread.png'
import RampagepriteURI from '@/assets/guide/rampage.png'
</script>

<style scoped>
.guide-table {
  margin: 0 auto;
}

.guide-table td {
  vertical-align: top;
}

.guide-table td .text {
  padding: 0.5rem;
}

.guide-btn__container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
