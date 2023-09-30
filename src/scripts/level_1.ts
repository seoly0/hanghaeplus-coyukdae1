import { chain } from '@/libs/timing/chain.ts'
import { Trace } from '@/components/game'
import { Application } from 'pixi.js'
import { getRandomUnitVector, getRandomVector } from '@/libs/physics/vector.ts'
import { DifficultyType } from '@/types'

const ONE_SECOND = 1000

/**
 * 레벨당 60초
 * @param app - pixi js Application
 * @param difficulty {DifficultyType} - 난이도
 */
export const run = async (app: Application, difficulty: DifficultyType) => {
  const multiple = difficulty === 'HARD' ? 2 : 1

  await chain()
    .wait(3 * ONE_SECOND)
    .do(() => {
      for (let i = 0; i < multiple; i++) {
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
      }
    })
    .wait(3 * ONE_SECOND)
    .do(() => {
      if (difficulty !== 'EASY')
        for (let i = 0; i < multiple; i++) {
          new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
        }
    })
    .wait(3 * ONE_SECOND)
    .do(() => {
      for (let i = 0; i < multiple; i++) {
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
      }
    })
    .wait(3 * ONE_SECOND)
    .do(() => {
      for (let i = 0; i < multiple; i++) {
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
      }
    })
    .wait(10 * ONE_SECOND)
    .do(() => {
      for (let i = 0; i < multiple; i++) {
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
      }
    })
    .wait(3 * ONE_SECOND)
    .do(() => {
      if (difficulty !== 'EASY')
        for (let i = 0; i < multiple; i++) {
          new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
        }
    })
    .wait(3 * ONE_SECOND)
    .do(() => {
      for (let i = 0; i < multiple; i++) {
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
      }
    })
    .wait(3 * ONE_SECOND)
    .do(() => {
      for (let i = 0; i < multiple; i++) {
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
      }
    })
    .wait(10 * ONE_SECOND)
    .do(() => {
      for (let i = 0; i < multiple; i++) {
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
      }
    })
    .wait(3 * ONE_SECOND)
    .do(() => {
      if (difficulty !== 'EASY')
        for (let i = 0; i < multiple; i++) {
          new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
          new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
        }
    })
    .wait(3 * ONE_SECOND)
    .do(() => {
      for (let i = 0; i < multiple; i++) {
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
      }
    })
    .wait(3 * ONE_SECOND)
    .do(() => {
      for (let i = 0; i < multiple; i++) {
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
        new Trace(app, getRandomVector(1280, 720), getRandomUnitVector(), difficulty)
      }
    })
    .wait(10 * ONE_SECOND)
    .await()
}
