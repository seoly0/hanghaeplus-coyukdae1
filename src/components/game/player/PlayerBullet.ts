import { Container, Sprite, Texture } from 'pixi.js'
import { Vector, getDegree, getRadian } from '@/libs/physics/vector.ts'

const BULLET_VELOCITY = 18

export class PlayerBullet extends Container {
  private vector: Vector = { x: 0, y: 0 }
  private _body: Sprite

  constructor(scene: Container, point: Vector, vector: Vector) {
    super()

    scene.addChild(this)

    this.position.x = point.x
    this.position.y = point.y

    this.width = 10
    this.height = 3

    this._body = new Sprite(Texture.WHITE)
    this._body.tint = 0x34eb7a
    this._body.width = 10
    this._body.height = 3
    this._body.position.x = 0
    this._body.position.y = 0

    this.rotation = getRadian(vector)

    this.addChild(this._body)
    this.setVector(vector)
  }

  setVector(vector: Vector) {
    this.vector.x = vector.x
    this.vector.y = vector.y
  }

  move() {
    this.y += this.vector.y * BULLET_VELOCITY
    this.x += this.vector.x * BULLET_VELOCITY
  }
}
