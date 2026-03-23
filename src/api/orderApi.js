import axios from "./axios";


export const placeOrder = (data) => {
  return axios.post("/user/orders", data);
};


export const getMyOrders = () => {
  return axios.get("/user/orders");
};


export const getSupplierOrders = (params) => {
  return axios.get("/supplier/orders", { params });
};


export const acceptOrder = (id) => {
  return axios.put(`/supplier/orders/${id}/accept`);
};

export const rejectOrder = (id) => {
  return axios.put(`/supplier/orders/${id}/reject`);
};

export const shipOrder = (id) => {
  return axios.put(`/supplier/orders/${id}/ship`);
};

export const deliverOrder = (id) => {
  return axios.put(`/supplier/orders/${id}/deliver`);
};