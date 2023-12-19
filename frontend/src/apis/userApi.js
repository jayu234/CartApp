import axios from "axios";

const BASE_URI = import.meta.env.VITE_BACKEND;

const login = async (data) => {
  axios.defaults.withCredentials = true;
  const response = await axios.post(`${BASE_URI}/user/login`, data);
  return response.data;
};

const logout = async () => {
  axios.defaults.withCredentials = true;
  const response = await axios.post(`${BASE_URI}/user/logout`);
  return response.data;
};

const signup = async (data) => {
  axios.defaults.withCredentials = true;
  const response = await axios.post(`${BASE_URI}/user/register`, data);
  return response.data;
};

const loadUser = async () => {
  axios.defaults.withCredentials = true;
  const response = await axios.get(`${BASE_URI}/user/profile`);
  return response.data;
};

const userService = { logout, login, signup, loadUser };

export default userService;
