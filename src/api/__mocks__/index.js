const latestArguments = []

let rejectNextPost = false

export const jsonClient = () => (
    {
      post: (url, data) => new Promise((resolve, reject) => {
        latestArguments.push({url, data})
        if (!rejectNextPost) {
          resolve({url, data})
        }
        reject('Error Submitting')
        rejectNextPost = false
        }),

      getLatestArguments: () => latestArguments,

      setOnceOfPromiseReject: (reject) => { rejectNextPost = reject }
    }
  )
