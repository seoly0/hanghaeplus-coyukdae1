export interface Stage {
  playerMaxHealthPoint: number

  enemyMaxHealthPoint: number
  enemyLifeTime: number
  enemyMoveSpeed: number
  enemyBulletSpeed: number
}

export interface GameRecord {
  player: string
  time: number
  recordAt: string
}