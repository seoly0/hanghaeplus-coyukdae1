const chain = (payload: any = null) => {
  return new Chain(payload)
}

/**
 * 실행 밎 대기
 */
class Chain {
  private queue: Array<() => Promise<void>> = []
  private done: Array<() => Promise<void>> = []
  private active = false
  private payload = null
  private stage = 0
  private last: Function | null = null

  constructor(payload = null) {
    this.payload = payload
    return this
  }

  do(cb: Function) {
    const promise = () =>
      new Promise<void>(resolve => {
        const ret = cb(this.payload, this.stage++)
        if (ret) this.payload = ret
        resolve()
      })
    if (this.active) {
      this.queue.push(promise)
    } else {
      this.run(promise)
    }
    return this
  }

  wait(interval: number) {
    const promise = () =>
      new Promise<void>(resolve =>
        setTimeout(function () {
          resolve()
        }, interval),
      )
    if (this.active) {
      this.queue.push(promise)
    } else {
      this.run(promise)
    }
    return this
  }

  private next() {
    if (this.queue.length > 0) {
      const task = this.queue.shift() as () => Promise<void>
      this.run(task)
    } else {
      if (this.last) this.last()
    }
  }

  private run(cb: () => Promise<void>) {
    this.active = true
    if (cb) {
      cb().then(() => {
        this.active = false
        this.done.push(cb)

        this.next()
      })
    }
  }

  repeat(count: number) {
    const promise = () =>
      new Promise<void>(resolve => {
        for (let i = 1; i < count; i++) {
          this.queue = this.done.concat(this.queue)
        }
        resolve()
      })
    if (this.active) {
      this.queue.push(promise)
    } else {
      this.run(promise)
    }
    return this
  }

  await() {
    return new Promise(resolve => {
      this.last = resolve
    })
  }
}

export { chain }
