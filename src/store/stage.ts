import { defineStore } from 'pinia'
import { DifficultyType } from '@/types'

interface GameState {
  difficulty: DifficultyType
  score: number
}

const state: GameState = {
  difficulty: 'HARD',
  score: 0,
}

export const useStageStore = defineStore('stage', {
  state: () => state,
  getters: {},
  actions: {},
})
