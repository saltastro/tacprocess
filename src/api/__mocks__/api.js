export default {
  user: {
      login: credentials =>{
        return new Promise((resolve) => {
          resolve(credentials)
        })
      }
  }
}
