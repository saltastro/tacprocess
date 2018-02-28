export const setStorage = (user) => {
  localStorage.tacPageJWT = user.token;
}

export const getStorage = () => {
  return localStorage.tacPageJWT;
}

export const removeStorage = () => {
  localStorage.removeItem("tacPageJWT");
}
