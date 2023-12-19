import axios from "axios";

const BASE_URI = import.meta.env.VITE_BACKEND;

const getCartItems = async () => {
  axios.defaults.withCredentials = true;
  const response = await axios.get(`${BASE_URI}/cart/items`);
  return response.data;
};

const addItem = async (data) => {
  axios.defaults.withCredentials = true;
  const response = await axios.post(`${BASE_URI}/cart/add`, data);
  return response.data;
};

const updateCart = async (data) => {
  axios.defaults.withCredentials = true;
  const response = await axios.put(`${BASE_URI}/cart/update`, data);
  return response.data;
};

const removeItem = async (id) => {
  axios.defaults.withCredentials = true;
  const response = await axios.delete(`${BASE_URI}/cart/remove/${id}`);
  return response.data;
};

const cartService = { getCartItems, addItem, updateCart, removeItem };

export default cartService;
