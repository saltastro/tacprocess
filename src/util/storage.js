export const setStorage = (user) => {
	localStorage.tacPageJWT = user.token;
};

export const getStorage = () => localStorage.tacPageJWT;


export const removeStorage = () => {
	localStorage.removeItem("tacPageJWT");
};
