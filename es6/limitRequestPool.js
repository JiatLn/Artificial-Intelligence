async function asyncPool(limit = 2, tasks) {
  const promises = []
  const pool = new Set()
  for (let task of tasks) {
    const fn = async (item) => await item()
    const promise = fn(task)
    pool.add(promise)
    promises.push(promise)
    promise.finally(() => {
      pool.delete(promise)
    })
    if (pool.size >= limit) {
      await Promise.race(pool)
    }
  }
  return Promise.all(promises)
}

async function sleep(time, msg) {
  return new Promise((reslove) => {
    console.log('start', msg)
    setTimeout(() => {
      console.log('end', msg)
      reslove(msg)
    }, time * 1000)
  })
}

let p1 = () => sleep(3, '33333')
let p2 = () => sleep(4, '44444')
let p3 = () => sleep(2, '22222')



// asyncPool(2, [p1, p2, p3])
//   .then(() => {
//     console.log('end')
//   })

function AsyncPool(limit = 1) {
  this.limit = limit
  this.pool = new Set()
}

AsyncPool.prototype.add = async function (cb) {
  if (this.pool.size >= this.limit) {
    await Promise.race(this.pool)
    this.add(cb)
    return
  }
  let fn = async (fn) => await fn();
  let promise = fn(cb)
  this.pool.add(promise)
  promise.finally(() => this.pool.delete(promise))
}


function syncTask() {
  console.log('this is SyncTask start')
  console.log('this is SyncTask end')
}

function asyncTask() {
  console.log('asyncTask start')
  setTimeout(() => {
    console.log('asyncTask end')
  }, 2000)
}


function promiseTask() {
  console.log('promiseTask start')
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('promiseTask end')
    }, 1000)
  })
}

const pool = new AsyncPool(1)
pool.add(p1)
pool.add(p2)
pool.add(p3)
