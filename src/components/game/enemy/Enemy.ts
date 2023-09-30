import { Container, IDestroyOptions } from 'pixi.js'

export abstract class Enemy extends Container {
  // private app = null
  // private player = null
  // private vector: Vector = { x: 0, y: 0 }
  // private bulletList = []

  protected constructor() {
    super()
  }

  abstract tick: () => void
  // abstract hit(): void
  abstract move(): void

  destroy(_options?: IDestroyOptions | boolean) {
    super.destroy(_options)
  }
}
