import { Application, Container, IDestroyOptions, Sprite, Texture } from 'pixi.js'

import { chain } from '@/libs/timing/chain.ts'
import { isInScreenX, isInScreenY } from '@/libs/physics'
import { Vector } from '@/libs/physics/vector.ts'
import { DifficultyType } from '@/types'

const PLAYER_VELOCITY = 3
const PLAYER_NORMAL_COLOR = 0x00ff00
const PLAYER_HIT_COLOR = 0xff0000

const KEY_INPUT = {
  up: false,
  down: false,
  left: false,
  right: false,
  shot: false,
}

const handlePlayerActionKeyDownEvent = (evt: KeyboardEvent) => {
  if (evt.code === 'ArrowLeft') KEY_INPUT.left = true
  else if (evt.code === 'ArrowRight') KEY_INPUT.right = true
  else if (evt.code === 'ArrowUp') KEY_INPUT.up = true
  else if (evt.code === 'ArrowDown') KEY_INPUT.down = true
  else if (evt.code === 'Space') KEY_INPUT.shot = true
}
const handlePlayerActionKeyUpEvent = (evt: KeyboardEvent) => {
  if (evt.code === 'ArrowLeft') KEY_INPUT.left = false
  else if (evt.code === 'ArrowRight') KEY_INPUT.right = false
  else if (evt.code === 'ArrowUp') KEY_INPUT.up = false
  else if (evt.code === 'ArrowDown') KEY_INPUT.down = false
  else if (evt.code === 'Space') KEY_INPUT.shot = false
}

export class Player extends Container {
  private app: Application
  private _body: Sprite

  state = {
    hpMAX: 0,
    hp: 0,
    invincible: false,
    // bulletCoolDown: false,
    // bulletThrottle: 500,
    // bulletList: []
  }

  constructor(app: Application, position: Vector, difficulty: DifficultyType) {
    super()

    //
    this.app = app
    this.app.stage.addChild(this)

    this.position.x = position.x
    this.position.y = position.y

    this._body = new Sprite(Texture.WHITE)
    this._body.tint = PLAYER_NORMAL_COLOR
    this._body.anchor.set(0.5, 0.5)
    this._body.position.x = 0
    this._body.position.y = 0
    this.addChild(this._body)

    // 난이도에 따른 플레이어 스펙 설정
    if (difficulty === 'EASY') {
      this.state.hpMAX = 5
      this.state.hp = 5
    } else if (difficulty === 'NORMAL') {
      this.state.hpMAX = 4
      this.state.hp = 4
    } else if (difficulty === 'HARD') {
      this.state.hpMAX = 3
      this.state.hp = 3
    }

    // this.state.hp = 100000

    this.setEvent()
    this.app.ticker.add(this.tick)
  }

  tick = () => {
    this.move()
  }

  /**
   * 충돌 처리
   * @param target {} - 충돌 대상
   * @return {boolean} - true 피격, false 피격아님
   */
  hit(target: string) {
    // 피격 처리
    if (target === 'ENEMY_BULLET') {
      if (!this.state.invincible) {
        this.state.invincible = true
        this.state.hp--
        // 200 * 15 = 3000: 약 3초간 무적
        chain()
          .do(() => (this._body.tint = PLAYER_HIT_COLOR))
          .wait(100)
          .do(() => (this._body.tint = PLAYER_NORMAL_COLOR))
          .wait(100)
          .repeat(15)
          .do(() => (this.state.invincible = false))
        return true
      } else {
        return false
      }
    }
    return false
  }

  setEvent() {
    window.addEventListener('keydown', handlePlayerActionKeyDownEvent, false)
    window.addEventListener('keyup', handlePlayerActionKeyUpEvent, false)
  }

  removeEvent() {
    window.removeEventListener('keydown', handlePlayerActionKeyDownEvent)
    window.removeEventListener('keyup', handlePlayerActionKeyUpEvent)
  }

  move() {
    let vx = 0
    let vy = 0

    if (KEY_INPUT.left) vx -= 1
    if (KEY_INPUT.right) vx += 1
    if (KEY_INPUT.up) vy -= 1
    if (KEY_INPUT.down) vy += 1

    const x = this.x + vx * PLAYER_VELOCITY
    const y = this.y + vy * PLAYER_VELOCITY

    if (isInScreenX(x)) this.x = x
    if (isInScreenY(y)) this.y = y
  }

  destroy(_options?: IDestroyOptions | boolean) {
    super.destroy(_options)
    this.app.ticker.remove(this.tick)
  }
}

// import { getUnitVector } from '@/libs/physics/vector.ts'
// import { Enemy } from './enemy/Enemy.ts'
// import { PlayerBullet } from './playerBullet'
// import { isOutOfScreen, isSquareCollide } from '@/libs/physics'

// tick = () => {
//   TODO 슈팅게임을 하기엔 시간이 조금 모자라
//   const enemyList: Array<Enemy> = this.app.stage.children.filter(x => x instanceof Enemy)
//   if (KEY_INPUT.shot) {
//     const enemy = enemyList[0]
//     if (enemy && !this.state.bulletCoolDown) {
//       this.setThrottle()
//       const u = getUnitVector(this.position, enemy.position)
//       this.state.bulletList.push(new PlayerBullet(this.app.stage, this.position, u))
//     }
//   }
//
//   this.state.bulletList.forEach((bullet, idx) => {
//     bullet.move()
//
//     let remove = false
//     if (isOutOfScreen(bullet)) {
//       remove = true
//     }
//
//     enemyList.forEach((enemy) => {
//       if(isSquareCollide(bullet, enemy)) {
//         enemy.hit()
//         remove = true
//       }
//     })
//
//     if (remove) {
//       bullet.destroy()
//       this.state.bulletList.splice(idx, 1)
//     }
//   })
// }

// setThrottle = () => {
//   this.state.bulletCoolDown = true
//   setTimeout(() => {
//     this.state.bulletCoolDown = false
//   }, this.state.bulletThrottle)
// }
