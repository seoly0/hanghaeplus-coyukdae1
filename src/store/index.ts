import { createPinia } from 'pinia'
import { useStageStore } from './stage'
import { useSettingStore } from './setting'

export default createPinia()

export { useStageStore, useSettingStore }
