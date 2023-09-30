import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'splash', component: () => import('@/views/SplashView.vue') },
  { path: '/title', name: 'title', component: () => import('@/views/TitleView.vue') },
  { path: '/difficulty', name: 'difficulty', component: () => import('@/views/SelectDifficultyView.vue') },
  { path: '/stage', name: 'stage', component: () => import('@/views/StageView.vue') },
  { path: '/over', name: 'over', component: () => import('@/views/GameOverView.vue') },
  { path: '/settings', name: 'settings', component: () => import('@/views/SettingView.vue') },
  { path: '/record', name: 'record', component: () => import('@/views/RecordView.vue') },
  { path: '/credit', name: 'credit', component: () => import('@/views/CreditView.vue') },
  { path: '/guide', name: 'guide', component: () => import('@/views/GuideView.vue') },
  { path: '/test', name: 'test', component: () => import('@/views/TestView.vue') },
]
