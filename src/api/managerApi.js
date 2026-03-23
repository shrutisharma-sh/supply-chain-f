import axios from "./axios";

export const getPendingProducts = () => {
  return axios.get("/manager/pending-products");
};

export const approveProduct = (id) => {
  return axios.put(`/manager/supplier-products/${id}/approve`);
};

export const rejectProduct = (id) => {
  return axios.put(`/manager/supplier-products/${id}/reject`);
};