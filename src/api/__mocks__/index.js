const latestArguments = []

let onceOfPromiseReject = () => false

export const jsonClient = () => (
    {
      post: (url, data) => new Promise((resolve, reject) => {
        latestArguments.push({url, data})
        if (!onceOfPromiseReject(data)) {
          resolve({url, data})
        }
        reject('Error Submitting')
        onceOfPromiseReject = () => false
        }),

      getLatestArguments: () => latestArguments,

      setOnceOfPromiseReject: (f) => { onceOfPromiseReject = f }
    }
  )
