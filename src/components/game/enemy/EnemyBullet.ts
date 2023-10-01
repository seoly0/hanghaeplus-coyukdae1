import { Vector } from '@/libs/physics/vector'
import { Container, Sprite, Texture } from 'pixi.js'

const BULLET_VELOCITY = 2

/**
 * 적이 발사하는 총알
 */
export class EnemyBullet extends Container {
  private vector: Vector = { x: 0, y: 0 }
  private _body: Sprite

  constructor(scene: Container, point: Vector, vector: Vector) {
    super()

    scene.addChild(this)

    this.position.x = point.x
    this.position.y = point.y

    this.width = 10
    this.height = 10

    this._body = new Sprite(Texture.WHITE)
    this._body.width = 10
    this._body.height = 10
    this._body.anchor.set(0.5, 0.5)
    this._body.position.x = 0
    this._body.position.y = 0
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
