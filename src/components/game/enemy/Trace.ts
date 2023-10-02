import { Enemy } from './Enemy.ts'
import { Application, IDestroyOptions, Sprite, Texture } from 'pixi.js'
import { EnemyBullet, Player } from '@/components/game'
import { Vector, getRadian, getUnitVector } from '@/libs/physics/vector.ts'
import { isInScreenX, isInScreenY } from '@/libs/physics'
import { DifficultyType } from '@/types'
import SpriteURI from '@/assets/sprite/trace.png'

const ENEMY_VELOCITY = 2

/**
 * 플레이어 캐릭터를 향해 사격하는 적 유형
 */
export class Trace extends Enemy {
  private app: Application
  private player: Player
  private _body: Sprite
  private timerIntervalID: number
  private bulletIntervalID: number

  private vector: Vector = { x: 0, y: 0 }
  private bulletList: Array<EnemyBullet> = []
  private state = {
    hp: 5,
    lifeTime: 10,
    bulletCoolDown: 0,
  }

  constructor(app: Application, position: Vector, vector: Vector, difficulty: DifficultyType) {
    super()

    this.app = app
    this.player = app.stage.children.find(x => x instanceof Player) as Player
    this.app.stage.addChild(this)

    this.position.x = position.x
    this.position.y = position.y

    this._body = Sprite.from(SpriteURI)
    this._body.anchor.set(0.5, 0.5)
    this._body.position.x = 0
    this._body.position.y = 0
    this.addChild(this._body)

    this.setVector(vector)

    if (difficulty === 'EASY') {
      this.state.bulletCoolDown = 1500
    } else if (difficulty === 'NORMAL') {
      this.state.bulletCoolDown = 1000
    } else if (difficulty === 'HARD') {
      this.state.bulletCoolDown = 900
    }

    // TODO: Interval -> Pixi.js 의 api를 활용하도록 변경예정
    this.timerIntervalID = setInterval(() => {
      this.state.lifeTime--
      if (this.state.lifeTime <= 0) this.destroy()
    }, 1000)
    // 사격 방식 정의
    // 플레이어를 향해 발사
    this.bulletIntervalID = setInterval(() => {
      const vector = getUnitVector(this, this.player)
      const point = { x: this.x, y: this.y }
      this.bulletList.push(new EnemyBullet(this.app.stage, point, vector))
      this._body.rotation = getRadian(vector)
    }, this.state.bulletCoolDown)

    this.app.ticker.add(this.tick)
  }

  tick = () => {
    this.move()
  }

  hit() {
    this.state.hp--

    if (this.state.hp <= 0) {
      this.destroy()
    }
  }

  setVector(vector: Vector) {
    this.vector.x = vector.x
    this.vector.y = vector.y
  }

  move() {
    this.y += this.vector.y * ENEMY_VELOCITY
    this.x += this.vector.x * ENEMY_VELOCITY

    if (!isInScreenX(this.x)) {
      this.vector.x = -this.vector.x
    }
    if (!isInScreenY(this.y)) {
      this.vector.y = -this.vector.y
    }
  }

  destroy(_options?: IDestroyOptions | boolean) {
    clearInterval(this.bulletIntervalID)
    clearInterval(this.timerIntervalID)
    this.app.ticker.remove(this.tick)
    super.destroy(_options)
  }
}
