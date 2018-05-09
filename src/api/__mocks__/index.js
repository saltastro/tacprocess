const latestArguments = []

let isRejected = false

export const jsonClient = () => (
    {
      post: (url, data) => new Promise((resolve, reject) => {
        latestArguments.push({url, data})
        if (!isRejected) {
          resolve({url, data})
        }
        reject('Error Submitting')
        isRejected = false
        }),

      getLatestArguments: () => latestArguments,

      rejectNextPost: () => { isRejected = true }
    }
  )
