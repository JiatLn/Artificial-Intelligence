const broadcastChannel = new BroadcastChannel('channel_name')

function sendMessage<T>(data: T) {
  broadcastChannel.postMessage({
    ...data
  })
}

function listenMessage<T>(callback: (data: T) => any) {
  const handler = (e: MessageEvent<T>) => callback && callback(e.data)
  broadcastChannel.addEventListener('message', handler)
  return () => broadcastChannel.removeEventListener('message', handler)
}

interface Message {
  message: string
}


sendMessage<Message>({
  message: 'hello world'
})

listenMessage<Message>((data) => {
  console.log('data', data.message)
})
