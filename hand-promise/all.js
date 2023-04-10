function promiseAll(promises) {
  // 异常处理
  if (typeof promises?.[Symbol.iterator] !== 'function') {
    throw new Error('param must be iterable')
  }
  // 保存结果
  let result = [];
  // 计数器：当前已处理的 promise 个数
  let cnt = 0;
  let size = promises.length;
  // all 方法返回一个 promise 对象
  return new Promise((reslove, reject) => {
    if (size === 0) {
      reslove([]);
    }
    for (let i = 0; i < size; i++) {
      Promise.resolve(promises[i])
        .then((val) => {
          result[i] = val;
          cnt++
          if (cnt === size) {
            reslove(result)
          }
        }).catch(err => {
          reject(err)
        })
    }
  })
}

const delay = (sec) => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove(sec)
    }, sec * 1000)
  })
}

const p1 = delay(1)
const p2 = delay(3)
const p3 = delay(2)

async function test() {
  const p = await promiseAll([p1, p2, p3])
  console.log('p', p)

  const pp = await promiseAll('hahah')
  console.log('pp', pp)

  try {
    const ppp = await promiseAll()
    console.log('ppp', ppp)
  } catch (error) {
    console.log('got error: ', error.message)
  }
}

test()
