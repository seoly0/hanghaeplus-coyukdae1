import { Enemy } from './Enemy.ts'
import { Application, IDestroyOptions, Sprite, Texture } from 'pixi.js'
import { EnemyBullet, Player } from '@/components/game'
import { Vector, getUnitVector } from '@/libs/physics/vector.ts'
import { isInScreenX, isInScreenY } from '@/libs/physics'
import { DifficultyType } from '@/types'

const ENEMY_VELOCITY = 2
const ENEMY_COLOR = 0xfcb103

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

    // const triangle = new SimplePlane(Texture.WHITE, [
    //   new Point(-5, 2),
    //   new Point(5, 0),
    //   new Point(-5 -2),
    // ]);

    this._body = new Sprite(Texture.WHITE)
    this._body.tint = ENEMY_COLOR
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

    // set interval
    this.timerIntervalID = setInterval(() => {
      this.state.lifeTime--
      if (this.state.lifeTime <= 0) this.destroy()
    }, 1000)
    this.bulletIntervalID = setInterval(() => {
      const vector = getUnitVector(this, this.player)
      const point = { x: this.x, y: this.y }
      this.bulletList.push(new EnemyBullet(this.app.stage, point, vector))
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
    super.destroy(_options)
    this.app.ticker.remove(this.tick)
    clearInterval(this.bulletIntervalID)
    clearInterval(this.timerIntervalID)
  }
}
