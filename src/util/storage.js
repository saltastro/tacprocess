export const setToken = (user) => {
  localStorage.tacPageJWT = user.token
}

export const getToken = () => localStorage.tacPageJWT

export const removeToken = () => {
  localStorage.removeItem('tacPageJWT')
}
