function createFetchWithTimeout(timeout = 1000) {
  return function (url: string, options: RequestInit) {
    const signalController = new AbortController()
    return new Promise((reslove, reject) => {
      fetch(url, {
        ...options,
        signal: signalController.signal
      }).then(reslove, reject)
      setTimeout(() => {
        reject(new Error('fetch timeout'))
        signalController.abort()
      }, timeout)
    })
  }
}

const request = createFetchWithTimeout(3000)
