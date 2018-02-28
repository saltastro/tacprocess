export default {
  user: {
      login: credentials =>{
        return new Promise((resolve) => {
          resolve(credentials)
        })
      },

      switchUser: username =>{
        return new Promise((resolve) => {
          resolve(username)
        })
      }
  }
}
