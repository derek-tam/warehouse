import axios from "axios";

const API_BASE = "http://localhost:8080/api/inventory";

export const getInventory = () => axios.get(API_BASE);

export const receiveGoods = (data) =>
  axios.post(`${API_BASE}/receive`, data);

export const shipGoods = (data) =>
  axios.post(`${API_BASE}/ship`, data);
