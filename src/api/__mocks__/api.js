export default {
  user: {
    login: credentials =>new Promise((resolve) => {
      resolve(credentials)
    }),

    switchUser: username =>new Promise((resolve) => {
      resolve(username)
    })
  }
}
