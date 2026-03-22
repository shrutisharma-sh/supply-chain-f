import axios from "./axios";

export const addProduct = (data) => {
  return axios.post("/supplier/products", data);
};

export const getMyProducts = () => {
  return axios.get("/supplier/my-products");
};

export const deleteProduct = (id) => {
  return axios.delete(`/supplier/products/${id}`);
};
export const updateProduct = (id, data) => {
  return axios.put(`/supplier/products/${id}`, data);
};