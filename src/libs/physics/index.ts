import { Container } from 'pixi.js'
import { Vector } from './vector'

export const isSquareCollide = (a: Container, b: Container) => {
  if (!a || !b) return false

  // Cond1 - RectA.Left > RectB.Right
  // Cond2 - RectA.Right < RectB.Left
  // Cond3 - RectA.Top < RectB.Bottom
  // Cond4 - RectA.Bottom > RectB.Top
  try {
    const a_l = a.x
    const a_r = a.x + a.width
    const a_t = a.y
    const a_b = a.y - a.height

    const b_l = b.x
    const b_r = b.x + b.width
    const b_t = b.y
    const b_b = b.y - b.height

    return !(a_l > b_r || a_r < b_l || a_t < b_b || a_b > b_t)
  } catch (e) {
    return false
  }
}

export const getScreenCenter = (width: number, height: number) => {
  return {
    x: width / 2,
    y: height / 2,
  }
}

export const isInScreenX = (x: number) => {
  return x > 0 && x < 1280
}

export const isInScreenY = (y: number) => {
  return y > 0 && y < 720
}

export const isOutOfScreen = (point: Vector) => {
  return !(point.x > 0 && point.x < 1280 && point.y > 0 && point.y < 720)
}
