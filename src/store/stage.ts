import { defineStore } from 'pinia'
import { DifficultyType } from '@/types'

interface GameState {
  difficulty: DifficultyType
}

const state: GameState = {
  difficulty: 'HARD',
}

export const useStageStore = defineStore('stage', {
  state: () => state,
  getters: {},
  actions: {},
})
