<template>
  <div class="view" ref="view">
    <div class="ui">
      <div class="hp">{{ ui.hp }}</div>
      <div class="time">time: {{ ui.time }}</div>
      <div class="debug">enemy: {{ ui.debug.enemy }}, bullet: {{ ui.debug.bullet }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Application } from 'pixi.js'
import { Player, Enemy, EnemyBullet } from '@/components/game'
import { getScreenCenter, isOutOfScreen, isSquareCollide } from '@/libs/physics'
import { useStageStore } from '@/store'
import levelList from '@/scripts'

const router = useRouter()
const stage = useStageStore()

const view: Ref<HTMLElement> = ref(null)
let app: Application = null
let player: Player = null

const ui = reactive({
  time: 0,
  hp: 0,

  debug: {
    enemy: 0,
    bullet: 0,
  },
})

let timeCountIntervalID = null
const timeCounter = () => {
  ui.time += 1
}

const init = () => {
  const width = view.value.clientWidth
  const resolution = width / 1280

  app = new Application({
    antialiasing: true,
    transparent: false,
    resolution: resolution,
    width: 1280,
    height: 720,
  })
  view.value.appendChild(app.view)

  player = new Player(app, getScreenCenter(1280, 720), stage.difficulty)

  clearInterval(timeCountIntervalID)
  timeCountIntervalID = setInterval(timeCounter, 1000)

  app.ticker.maxFPS = 120
  app.ticker.minFPS = 30
  app.ticker.speed = 100

  app.ticker.add(dt => {
    // 게임 종료 조건 체크
    if (player.state.hp <= 0) {
      end()
    }

    // 총알 움직임 처리
    const children = app.stage.children
    children
      .filter(x => x instanceof EnemyBullet)
      .forEach((bullet: EnemyBullet, idx) => {
        bullet.move()

        let remove = false
        if (isOutOfScreen(bullet)) {
          remove = true
        }

        if (isSquareCollide(player, bullet)) {
          remove = player.hit('ENEMY_BULLET')
        }

        if (remove) {
          bullet.destroy()
        }
      })

    // ui 업데이트
    ui.hp = player.state.hp

    // 디버깅용 ui 업데이트
    ui.debug.enemy = children.filter(x => x instanceof Enemy).length
    ui.debug.bullet = children.filter(x => x instanceof EnemyBullet).length
  })
}

const start = async () => {
  for (let i = 0; i < levelList.length; i++) {
    console.log(`${i + 1} 스테이지`)
    // TODO 레벨 UI 출력
    await levelList[i](app, stage.difficulty)
  }
  console.log('무한스테이지 진입')
}

const restart = () => {}

const stop = () => {
  app.ticker.stop()
}

const end = () => {
  stop()
  router.replace('/over')
}

onMounted(() => {
  init()
  start()
})

onUnmounted(() => {
  player.removeEvent()
  clearInterval(timeCountIntervalID)
})

// const handleUIKeyDownEvent = (evt: KeyboardEvent) => {
//   if (evt.key === 'Escape') console.log('ESC')
// }
// window.addEventListener('keydown', handleUIKeyDownEvent, false)
// window.removeEventListener('keydown', handleUIKeyDownEvent)
</script>
