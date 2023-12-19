import axios from "axios";

const BASE_URI = import.meta.env.VITE_BACKEND;

const createProduct = async (data) => {
  axios.defaults.withCredentials = true;
  const response = await axios.post(`${BASE_URI}/product/create`, data);
  return response.data;
};

const getAllProducts = async () => {
  axios.defaults.withCredentials = true;
  const response = await axios.get(`${BASE_URI}/product/all`);
  return response.data;
};

const getProductDetails = async (id) => {
  axios.defaults.withCredentials = true;
  const response = await axios.get(`${BASE_URI}/product/${id}`);
  return response.data;
};

const productService = { createProduct, getAllProducts, getProductDetails };

export default productService;
