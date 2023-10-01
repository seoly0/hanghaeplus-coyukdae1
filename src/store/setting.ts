import { defineStore } from 'pinia'
import { LanguageType, ResolutionRatioType, ResolutionType } from '@/types/setting.ts'

interface SettingState {
  resolution: ResolutionType
  resolutionRatio: ResolutionRatioType
  language: LanguageType
}

const state: SettingState = {
  resolution: [1280, 720],
  resolutionRatio: [16, 9],
  language: 'KOREAN',
}

export const useSettingStore = defineStore('setting', {
  state: () => state,
  getters: {},
  actions: {},
})
