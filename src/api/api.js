import { jsonClient } from './'

export default {
  user: {
    login: credentials =>
      jsonClient()
        .post('token', { credentials })
        .then(res => res.data.user),

    switchUser: username =>
      jsonClient()
        .get(`token/${ username }`)
        .then(res => res.data.user)
  }
}
