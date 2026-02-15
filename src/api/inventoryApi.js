import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getInventory = (token) =>
  axios.get(`${BASE_URL}/inventory`, { headers: { Authorization: `Bearer ${token}` } });

export const receiveGoods = (item, token) =>
  axios.post(`${BASE_URL}/inventory/receive`, item, { headers: { Authorization: `Bearer ${token}` } });

export const shipGoods = (item, token) =>
  axios.post(`${BASE_URL}/inventory/ship`, item, { headers: { Authorization: `Bearer ${token}` } });

export const getOrders = (token) =>
  axios.get(`${BASE_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } });

export const updateOrderStatus = (orderId, status, token) =>
  axios.post(`${BASE_URL}/orders/${orderId}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
