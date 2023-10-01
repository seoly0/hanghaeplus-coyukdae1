import { Container, IDestroyOptions } from 'pixi.js'

/**
 * 상속용 추상 클래스
 */
export abstract class Enemy extends Container {

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
