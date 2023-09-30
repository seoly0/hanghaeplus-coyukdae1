import { Trace, Spread, Rampage } from '@/components/game'
import { Application } from 'pixi.js'
import { getRandomUnitVector, getRandomVector } from '@/libs/physics/vector.ts'
import { DifficultyType } from '@/types'

const ONE_SECOND = 1000

export const run = (app: Application, difficulty: DifficultyType) => {
  let traceInterval = 0
  let spreadInterval = 0
  let rampageInterval = 0

  if (difficulty === 'EASY') {
    traceInterval = 5000
    spreadInterval = 8000
    rampageInterval = 15000
  } else if (difficulty === 'NORMAL') {
    traceInterval = 3000
    spreadInterval = 5000
    rampageInterval = 10000
  } else if (difficulty === 'HARD') {
    traceInterval = 2000
    spreadInterval = 4000
    rampageInterval = 8000
  }

  setInterval(() => {
    new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
    new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
    new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
  }, traceInterval)

  setInterval(() => {
    new Spread(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
    new Spread(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
  }, spreadInterval)

  setInterval(() => {
    new Rampage(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
  }, rampageInterval)
}
