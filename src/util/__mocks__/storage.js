let mockedLocalStorage = {
  tacPageJWT: {
    user: ''
  }
}

export const setToken = (user) => {
  mockedLocalStorage.tacPageJWT = user.token
}

export const getToken = () => mockedLocalStorage.tacPageJWT


export const removeToken = () => {
  delete mockedLocalStorage.tacPageJWT
}