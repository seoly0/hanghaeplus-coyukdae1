<template>
  <div id="guide-view">
    <Carousel style="width: 60rem; margin: 0 auto">
      <Slide key="rule">
        <ol class="text">
          <li>적이 발사하는 총알을 피해 살아남는 것이 게임의 목적입니다.</li>
          <li>게임은 3개의 스테이지로 구성됩니다.</li>
          <li>각 스테이지는 60초로 구성되어있으며 시간동안 버티면 다음 스테이지로 넘어갑니다.</li>
          <li>적 유형은 총 3가지이며 스테이지가 올라갈 때마다 새로운 적 형태가 추가됩니다.</li>
          <li>3스테이지까지 클리어하면 무한모드가 활성화됩니다. 무한모드는 플레이어 캐릭터가 사망할때까지 끝나지 않습니다.</li>
        </ol>
      </Slide>
      <Slide key="player">
        <table class="guide-table">
          <tr>
            <td>
              <img :src="PlayerGuideURI" />
            </td>
            <td>
              <div class="text">
                <h3>플레이어</h3>
                <div>방향키를 사용하여 상하좌우로 움직일 수 있습니다.</div>
                <div>피격시 3초간 무적시간이 주어집니다.</div>
                <div>HP를 모두 소모하면 게임오버됩니다.</div>
              </div>
            </td>
          </tr>
        </table>
      </Slide>
      <Slide key="enemy">
        <table class="guide-table">
          <tr>
            <td>
              <img :src="TraceGuideURI" />
            </td>
            <td>
              <div class="text">
                <h3>1스테이지 등장</h3>
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
                <h3>2스테이지 등장</h3>
                <div>방사형으로 사격 합니다.</div>
                <div>스폰 10초 후 사라집니다.</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <img :src="RampageGuideURI" />
            </td>
            <td>
              <div class="text">
                <h3>3스테이지 등장</h3>
                <div>빠르게 나선형으로 난사한 뒤 사라집니다.</div>
                <div>스폰 3초 후 사라집니다.</div>
              </div>
            </td>
          </tr>
        </table>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
    <div class="guide-btn__container">
      <SButton :to="{ name: 'stage' }">시작하기</SButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SButton } from '@/components/ui'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import PlayerGuideURI from '@/assets/guide/player.png'
import TraceGuideURI from '@/assets/guide/trace.png'
import SpreadGuideURI from '@/assets/guide/spread.png'
import RampageGuideURI from '@/assets/guide/rampage.png'
</script>

<style>
svg.carousel__icon {
  filter: invert(100%);
}
</style>

<style scoped>
.guide-table {
  margin: 0 auto;
}

.guide-table td {
  vertical-align: top;
}

h3 {
  margin-top: 0;
}

.text {
  padding: 0.5rem;
  text-align: left;
}

.guide-btn__container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
