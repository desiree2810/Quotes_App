const getToken = () => localStorage.getItem("token");
const getUserId = () => localStorage.getItem("userId");

export { getToken, getUserId };