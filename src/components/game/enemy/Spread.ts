import { Enemy } from './Enemy.ts'
import { Application, IDestroyOptions, Sprite, Texture } from 'pixi.js'
import { EnemyBullet, Player } from '@/components/game'
import { Vector, getNWayVectors } from '@/libs/physics/vector.ts'
import { isInScreenX, isInScreenY } from '@/libs/physics'
import { DifficultyType } from '@/types'
import SpriteURI from '@/assets/sprite/spread.png'

const ENEMY_VELOCITY = 1

/**
 * 여러 방향으로 사격하는 적 유형
 */
export class Spread extends Enemy {
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
    bulletWay: 0,
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
      this.state.bulletWay = 4
    } else if (difficulty === 'NORMAL') {
      this.state.bulletCoolDown = 1000
      this.state.bulletWay = 8
    } else if (difficulty === 'HARD') {
      this.state.bulletCoolDown = 900
      this.state.bulletWay = 10
    }

    this.timerIntervalID = setInterval(() => {
      this.state.lifeTime--
      if (this.state.lifeTime <= 0) this.destroy()
    }, 1000)
    this.bulletIntervalID = setInterval(() => {
      const vectorList = getNWayVectors(this.state.bulletWay)
      const point = { x: this.x, y: this.y }
      vectorList.forEach(vector => {
        this.bulletList.push(new EnemyBullet(this.app.stage, point, vector))
      })
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
    this.app.ticker.remove(this.tick)
    clearInterval(this.bulletIntervalID)
    clearInterval(this.timerIntervalID)
    super.destroy(_options)
  }
}
