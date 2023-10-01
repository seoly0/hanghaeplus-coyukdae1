export class Vector {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

/**
 * 회전변환
 * @param vector 
 * @param degree 
 * @returns 
 */
export const rotate = (vector: Vector, degree: number): Vector => {
  const theta = (Math.PI * degree) / 180
  return {
    x: vector.x * Math.cos(theta) - vector.y * Math.sin(theta),
    y: vector.x * Math.sin(theta) + vector.y * Math.cos(theta),
  }
}

/**
 * N개의 방사형 벡터
 * @param number 
 * @param origin 
 * @returns 
 */
export const getNWayVectors = (number = 8, origin = 0): Array<Vector> => new Array(number).fill(null).map((x, i) => rotate({ x: 1, y: 0 }, (i * 360 + origin) / number))

/**
 * 랜덤 유닛벡터
 * @returns 
 */
export const getRandomUnitVector = (): Vector => {
  // -1 ~ 1
  const rx = Math.random() * 2 - 1
  // -1, 1
  const rd = Math.random() > 0.5 ? 1 : -1
  return {
    x: rx,
    y: (1 - Math.sqrt(rx * rx)) * rd,
  }
}

/**
 * 랜덤 포인트
 * @param xMax 
 * @param yMax 
 * @returns 
 */
export const getRandomVector = (xMax: number, yMax: number): Vector => {
  return {
    x: Math.floor(Math.random() * xMax),
    y: Math.floor(Math.random() * yMax),
  }
}

/**
 * 두 벡터의 차
 * @param v1 
 * @param v2 
 * @returns 
 */
export const getDistanceVector = (v1: Vector, v2: Vector): Vector => {
  return {
    x: v2.x - v1.x,
    y: v2.y - v1.y,
  }
}

/**
 * 두 벡터간 방향
 * @param v1 
 * @param v2 
 * @returns 
 */
export const getUnitVector = (v1: Vector, v2: Vector): Vector => {
  const v = getDistanceVector(v1, v2)
  const distance = Math.sqrt(v.x * v.x + v.y * v.y)
  return {
    x: v.x / distance,
    y: v.y / distance,
  }
}

/**
 * 벡터의 라디안 각도
 * @param vector 
 * @returns 
 */
export const getRadian = (vector: Vector) => {
  return Math.atan2(vector.y, vector.x)
}

/**
 * 벡터의 각도
 * @param vector 
 * @returns 
 */
export const getDegree = (vector: Vector) => {
  return (getRadian(vector) * 180) / Math.PI
}
